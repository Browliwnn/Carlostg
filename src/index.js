// Worker: solo gestiona /api/*. El resto lo sirve Cloudflare Assets (carpeta dist).
const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });

const PRODUCTS = {
  gasoleoA: 'Precio Gasoleo A',
  gasoleoPremium: 'Precio Gasoleo Premium',
  gasolina95: 'Precio Gasolina 95 E5',
  gasolina98: 'Precio Gasolina 98 E5',
};
const num = (v) => (v ? parseFloat(String(v).replace(',', '.')) : NaN);

// Precios oficiales: Ministerio para la Transición Ecológica (datos abiertos, se actualizan a diario)
async function fuel(url, ctx) {
  const prov = (url.searchParams.get('prov') || '02').padStart(2, '0');
  if (!/^\d{2}$/.test(prov)) return json({ error: 'Provincia no válida' }, 400);
  const cache = caches.default;
  const key = new Request(`https://cache.local/fuel/${prov}`);
  const hit = await cache.match(key);
  if (hit) return hit;

  const src = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${prov}`;
  const r = await fetch(src, { headers: { accept: 'application/json', 'user-agent': 'carlostg.com' } });
  if (!r.ok) return json({ error: 'Servicio de precios no disponible' }, 502);
  const data = await r.json();
  const list = data.ListaEESSPrecio || [];
  const productos = {};
  for (const [k, field] of Object.entries(PRODUCTS)) {
    const rows = list.map((e) => ({ e, p: num(e[field]) })).filter((x) => !isNaN(x.p));
    if (!rows.length) continue;
    rows.sort((a, b) => a.p - b.p);
    const avg = rows.reduce((s, x) => s + x.p, 0) / rows.length;
    const c = rows[0];
    productos[k] = {
      media: +avg.toFixed(3),
      minimo: { precio: c.p, rotulo: c.e['Rótulo'], municipio: c.e['Municipio'], direccion: c.e['Dirección'] },
      maximo: rows[rows.length - 1].p,
      estaciones: rows.length,
    };
  }
  const res = json(
    { fecha: data.Fecha, provincia: list[0]?.Provincia || null, productos, fuente: 'Ministerio para la Transición Ecológica y el Reto Demográfico' },
    200,
    { 'cache-control': 'public, max-age=1800' }
  );
  ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

const esc = (s) => String(s ?? '').replace(/[<>]/g, '').trim();

async function contact(request, env) {
  const origin = request.headers.get('origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',');
  if (origin && !allowed.includes(origin) && !origin.endsWith('.workers.dev')) return json({ error: 'Origen no permitido' }, 403);

  let b;
  try { b = await request.json(); } catch { return json({ error: 'Datos no válidos' }, 400); }
  if (b.web) return json({ ok: true }); // honeypot: los bots rellenan este campo

  const f = { tipo: b.tipo === 'empleo' ? 'empleo' : 'contacto', nombre: esc(b.nombre), email: esc(b.email), telefono: esc(b.telefono), mensaje: esc(b.mensaje), servicio: esc(b.servicio), origen: esc(b.origen), destino: esc(b.destino) };
  if (f.nombre.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email) || f.mensaje.length < 5 || !b.acepto)
    return json({ error: 'Revisa los campos obligatorios' }, 422);
  if (f.mensaje.length > 4000) return json({ error: 'Mensaje demasiado largo' }, 422);

  if (env.TURNSTILE_SECRET) {
    const t = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: b.token || '', remoteip: request.headers.get('cf-connecting-ip') || '' }),
    }).then((r) => r.json()).catch(() => ({}));
    if (!t.success) return json({ error: 'No hemos podido verificar que eres una persona. Inténtalo de nuevo.' }, 400);
  }
  if (!env.RESEND_API_KEY) return json({ error: 'El envío no está configurado todavía. Escríbenos por correo o teléfono.' }, 503);

  const to = (f.tipo === 'empleo' ? env.MAIL_TO_EMPLEO : env.MAIL_TO_CONTACTO).split(',').map((x) => x.trim());
  const lines = [`Nombre: ${f.nombre}`, `Email: ${f.email}`, `Teléfono: ${f.telefono || '-'}`];
  if (f.servicio) lines.push(`Servicio: ${f.servicio}`);
  if (f.origen || f.destino) lines.push(`Ruta: ${f.origen || '?'} → ${f.destino || '?'}`);
  lines.push('', f.mensaje);

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.MAIL_FROM, to, reply_to: f.email, subject: f.tipo === 'empleo' ? `Candidatura web: ${f.nombre}` : `Consulta web: ${f.nombre}`, text: lines.join('\n') }),
  });
  if (!r.ok) return json({ error: 'No se pudo enviar el mensaje. Inténtalo más tarde.' }, 502);
  return json({ ok: true });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/fuel' && request.method === 'GET') return fuel(url, ctx);
    if (url.pathname === '/api/contact' && request.method === 'POST') return contact(request, env);
    if (url.pathname.startsWith('/api/')) return json({ error: 'No encontrado' }, 404);
    return env.ASSETS.fetch(request);
  },
};
