(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const eur = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + ' €/l';

  /* Menú móvil */
  const burger = $('.burger'), menu = $('#menu');
  burger?.addEventListener('click', () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });

  /* Precio del carburante (Worker /api/fuel, datos del Ministerio, caché 30 min) */
  const sel = $('[data-fuel-prov]'), card = $('[data-fuel-card]');
  const NAMES = { gasoleoA: 'Gasóleo A', gasoleoPremium: 'Gasóleo Premium', gasolina95: 'Gasolina 95 E5', gasolina98: 'Gasolina 98 E5' };
  async function loadFuel(prov) {
    try {
      const d = await (await fetch('/api/fuel?prov=' + prov)).json();
      if (!d.productos) throw 0;
      for (const k of ['gasoleoA', 'gasolina95']) { const el = $(`[data-f="${k}"]`); if (el && d.productos[k]) el.textContent = eur(d.productos[k].media); }
      if (card) card.innerHTML = Object.entries(NAMES).filter(([k]) => d.productos[k]).map(([k, n]) => { const p = d.productos[k], m = p.minimo; return `<div class="fuel-i"><h3>${n}</h3><div class="pr">${eur(p.media)}</div><small>Media en ${d.provincia ? d.provincia.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase()) : 'la provincia'} (${p.estaciones} estaciones)<br>Más barata: <b>${eur(m.precio)}</b> · ${m.rotulo}, ${m.municipio}</small></div>`; }).join('') + `<p class="fuel-src">Actualizado: ${d.fecha || 's/d'}. Fuente: ${d.fuente}. Precios orientativos.</p>`;
    } catch { $$('[data-f]').forEach((e) => (e.textContent = 'no disponible')); if (card) card.innerHTML = '<p class="muted">No se pueden mostrar los precios ahora mismo. Inténtalo más tarde.</p>'; }
  }
  if (sel) {
    let saved = null; try { saved = localStorage.getItem('prov'); } catch {}
    if (saved && [...sel.options].some((o) => o.value === saved)) sel.value = saved;
    sel.addEventListener('change', () => { try { localStorage.setItem('prov', sel.value); } catch {} loadFuel(sel.value); });
    loadFuel(sel.value);
  }

  /* Buscador (índice generado en el build: /assets/search.json). Atajos: Ctrl/⌘+K y "/" */
  const box = $('[data-search]'), inp = $('[data-search-input]'), res = $('[data-search-res]');
  let idx = null, last = null;
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const open = async (q = '') => {
    last = document.activeElement; box.hidden = false; inp.value = q; inp.focus();
    if (!idx) idx = await (await fetch('/assets/search.json')).json();
    render();
  };
  const close = () => { box.hidden = true; last?.focus?.(); };
  function render() {
    const terms = norm(inp.value).split(/\s+/).filter(Boolean);
    const list = idx.map((p) => { const h = norm(p.t + ' ' + p.d + ' ' + p.k); const t = norm(p.t); return { p, s: terms.every((w) => h.includes(w)) ? terms.reduce((a, w) => a + (t.includes(w) ? 3 : 1), 0) : 0 }; }).filter((x) => !terms.length || x.s).sort((a, b) => b.s - a.s);
    res.innerHTML = list.length ? list.map(({ p }) => `<li><a href="${p.u}"><b>${p.t}</b><small>${p.d}</small></a></li>`).join('') : '<li class="none">Sin resultados. Prueba con «ADR», «multimodal» o «contacto».</li>';
  }
  $$('[data-search-open]').forEach((b) => b.addEventListener('click', () => open()));
  $('[data-search-close]')?.addEventListener('click', close);
  inp?.addEventListener('input', render);
  box?.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !box.hidden) close();
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))) { e.preventDefault(); open(); }
  });
  const q = new URLSearchParams(location.search).get('q'); if (q) open(q);

  /* Mapa: solo se carga con clic (evita cookies de Google sin consentimiento) */
  const map = $('[data-map]');
  map?.querySelector('[data-map-load]')?.addEventListener('click', () => { map.innerHTML = `<iframe title="Mapa de Carlos Transportes Generales en Hellín" src="${map.dataset.map}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`; });

  /* Formularios -> /api/contact */
  const sk = $('meta[name="turnstile-sitekey"]');
  if (sk && $('.cf-turnstile')) { const s = document.createElement('script'); s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'; s.async = true; document.head.append(s); }
  $$('[data-form]').forEach((f) => f.addEventListener('submit', async (e) => {
    e.preventDefault(); const msg = $('.form-msg', f), btn = $('button[type=submit]', f);
    if (!f.checkValidity()) { msg.className = 'form-msg err'; msg.textContent = 'Revisa los campos obligatorios y acepta la política de privacidad.'; f.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(f)); data.acepto = f.acepto.checked; data.token = data['cf-turnstile-response'] || '';
    btn.disabled = true; msg.className = 'form-msg'; msg.textContent = 'Enviando…';
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) }), j = await r.json();
      if (!r.ok) throw new Error(j.error);
      f.reset(); msg.className = 'form-msg ok'; msg.textContent = 'Mensaje enviado. Te responderemos lo antes posible.';
    } catch (err) { msg.className = 'form-msg err'; msg.textContent = err.message || 'No se pudo enviar. Llámanos al 619 02 09 72.'; }
    btn.disabled = false; window.turnstile?.reset();
  }));
})();
