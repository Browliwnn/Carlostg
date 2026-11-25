// Generador estático sin dependencias. Uso: node build.mjs  ->  carpeta dist/
import { mkdirSync, writeFileSync, rmSync, cpSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE = 'https://www.carlostg.com';
const NAME = 'Carlos Transportes Generales';
const SK = process.env.TURNSTILE_SITEKEY || '';
const TODAY = new Date().toISOString().slice(0, 10);
const M = JSON.parse(readFileSync('static/assets/img/manifest.json', 'utf8'));
const img = (f) => `/assets/img/${f}`;
const C = {
  t1: '619 02 09 72', t2: '678 68 17 16',
  m1: 'carlos.sanchez@carlostg.com', m2: 'alejandro.sanchez@carlostg.com',
  addr: 'C/ Doctor Tabera y Araoz, 21 (bajo), Hellín (Albacete)',
  map: 'https://maps.google.com/maps?q=Calle%20doctor%20tabera%20y%20araoz%2C%2021%20bajo%20Hell%C3%ADn&t=m&z=15&output=embed&iwloc=near',
};
const tel = (t) => t.replace(/\s/g, '');

/* ───────── Contenido (copiado de la web actual) ───────── */
const SERV = [
  {
    slug: 'camiones-dedicados', nav: 'Camiones Dedicados', title: 'Camiones dedicados', h1: 'Camiones dedicados', n: '01', sh: 'Adaptados a cada necesidad específica.',
    short: '<b>Camiones dedicados</b>, adaptados a cada necesidad específica.',
    lead: 'En ciertos sectores, la logística no admite márgenes de error. Se requiere disponibilidad total, máxima puntualidad y un control preciso en cada etapa. Para estos casos, nuestro servicio de camiones dedicados es la opción ideal.',
    h2: 'Transporte en camiones dedicados',
    card: 'Montamos servicios acordes a tus necesidades de transporte y logística, poniendo especial atención en las especificaciones necesarias que cada cliente requiere con el fin de ofrecer la máxima disponibilidad, puntualidad y calidad, con seguimiento personalizado y atención al detalle.',
    body: ['El servicio de camiones dedicados está pensado para aquellas empresas que necesitan una solución exclusiva, personalizada y constante.', 'Ponemos a tu disposición vehículos asignados, adaptados a tus requerimientos técnicos, operativos y de horario. Esto permite un control total sobre la logística, mayor trazabilidad, tiempos de tránsito más predecibles y la posibilidad de establecer rutas fijas o variables según tu actividad.', 'Nos encargamos de estudiar cada caso en detalle, diseñando una solución que se alinee con tus flujos logísticos y objetivos de negocio.', 'Además, ofrecemos seguimiento personalizado, disponibilidad continua y atención prioritaria, garantizando que tu mercancía viaje siempre bajo los estándares más exigentes de puntualidad, seguridad y calidad.'],
    thumb: 'vidal-azul', hd: 'vidal-azul', gal: ['scania-dia', 'lavado', 'scania-noche'], alt: 'Camión dedicado de Carlos Transportes Generales',
    desc: 'En Carlos Transportes Generales ofrecemos servicios de transporte de camiones dedicados según tus necesidades y preferencias.',
    ptitle: 'Camiones dedicados para transporte de mercancías',
  },
  {
    slug: 'transporte-adr', nav: 'Transporte ADR', title: 'Transporte ADR', h1: 'Transporte ADR', n: '02', sh: 'Mercancías peligrosas con cobertura en toda la Comunidad Europea.',
    short: '<b>Transporte ADR</b> (mercancías peligrosas) con cobertura en toda la Comunidad Europea.',
    lead: 'Este tipo de transporte exige una operativa altamente controlada, equipos especializados y un cumplimiento riguroso de la normativa vigente. En Carlos Transportes Generales, lo sabemos bien.',
    h2: 'Transporte ADR (mercancías peligrosas)',
    card: 'Disponemos de vehículos y equipos preparados para el transporte de mercancías peligrosas (ADR) en toda la Comunidad Europea. Cumplimos con todos los requisitos legales y el rigor que este tipo de carga requiere.',
    body: ['Contamos con una flota de vehículos y equipamiento homologado para el transporte ADR en toda la Comunidad Europea, así como con conductores certificados y formados específicamente para este tipo de operativas.', 'Cada envío se gestiona bajo estrictos protocolos de seguridad y conforme a la legislación aplicable, garantizando el manejo adecuado de sustancias clasificadas como peligrosas.', 'Además, ofrecemos asesoramiento personalizado para ayudarte a planificar tus envíos ADR de forma eficiente y sin complicaciones, cumpliendo con todos los requisitos legales y técnicos.'],
    thumb: 'adr', hd: 'adr', gal: ['scania-dia', 'lavado', 'scania-noche'], alt: 'Transporte ADR de mercancías peligrosas',
    desc: 'En Carlos Transportes Generales ofrecemos servicios de transporte ADR o de mercancías peligrosas adaptados a tus necesidades.',
    ptitle: 'Transporte ADR de mercancías peligrosas en Europa',
  },
  {
    slug: 'transporte-multimodal', nav: 'Transporte Multimodal', title: 'Transporte Multimodal', h1: 'Transporte Multimodal', n: '03', sh: 'Internacional, gracias a nuestras alianzas con operadores líderes en Europa.',
    short: '<b>Multimodal internacional</b>, gracias a nuestras alianzas con operadores líderes en Europa.',
    lead: 'En un entorno logístico cada vez más exigente, la flexibilidad y la optimización de rutas son clave para mantenerse competitivo. Por eso, apostamos por el transporte multimodal: una solución que integra distintos medios de transporte para ofrecer mayor eficiencia, alcance y seguridad.',
    h2: 'Transporte Multimodal',
    card: 'Gracias a nuestros acuerdos con empresas líderes en Europa, ofrecemos un servicio de transporte multimodal que permite combinar distintos medios para maximizar la eficiencia logística y llegar a cualquier destino con rapidez y seguridad.',
    body: ['Gracias a nuestros acuerdos estratégicos con empresas líderes en el ámbito logístico europeo, ofrecemos un servicio multimodal que combina diferentes medios de transporte.', 'Este modelo permite diseñar rutas más rápidas, reducir los tiempos de tránsito y optimizar costes, sin comprometer la seguridad ni la trazabilidad de la mercancía.', 'Ya sea para transporte nacional o internacional, nuestro enfoque multimodal te garantiza acceso a una red sólida y eficiente, pensada para responder a cualquier necesidad logística con garantías.'],
    thumb: 'estadio', hd: 'estadio', gal: ['scania-dia', 'vidal-azul', 'lavado'], alt: 'Servicios de transporte multimodal de Carlos TG',
    desc: 'En Carlos Transportes Generales ofrecemos servicios de transporte multimodal según tus necesidades y preferencias.',
    ptitle: 'Transporte multimodal nacional e internacional',
  },
  {
    slug: 'camiones-gran-volumen', nav: 'Camiones Gran Volumen', title: 'Carga General de Gran Volumen', h1: 'Camiones de Carga General de Gran Volumen', n: '04', sh: 'Para todo tipo de mercancía no perecedera.',
    short: '<b>Carga general de gran volumen</b>, para todo tipo de mercancía no perecedera.',
    lead: 'Para mover grandes volúmenes, hace falta una logística precisa, recursos adecuados y un compromiso firme con los plazos y la seguridad. En Carlos Transportes Generales, ponemos todo esto a tu alcance.',
    h2: 'Transporte en camiones de carga de gran volumen',
    card: 'Contamos con soluciones logísticas para cargas no perecederas de gran volumen, con cobertura europea. Disponemos de la infraestructura y los recursos necesarios para adaptarnos a todo tipo de mercancías, siempre con los más altos estándares de calidad.',
    body: ['Ofrecemos un servicio especializado en cargas generales de gran volumen, con cobertura en toda la Unión Europea.', 'Disponemos de vehículos adaptados, personal cualificado y una infraestructura logística diseñada para gestionar grandes cantidades de mercancía de forma eficiente, segura y puntual.', 'Trabajamos con todo tipo de productos no perecederos y nos adaptamos a las particularidades de cada cliente, garantizando siempre un transporte limpio, ordenado y conforme a las normativas vigentes.', 'Tanto si necesitas envíos puntuales como una operativa regular, nuestro equipo está preparado para responder con soluciones flexibles, escalables y orientadas a resultados.'],
    thumb: 'acero', hd: 'vidal-cielo', gal: ['acero', 'scania-dia', 'scania-noche'], alt: 'Camión de carga general de gran volumen',
    desc: 'En Carlos Transportes Generales ofrecemos servicios de transporte en camiones de carga general de gran volumen.',
    ptitle: 'Camiones de carga general de gran volumen en Europa',
  },
];
const PROVS = [['02', 'Albacete'], ['03', 'Alicante'], ['04', 'Almería'], ['08', 'Barcelona'], ['28', 'Madrid'], ['29', 'Málaga'], ['30', 'Murcia'], ['41', 'Sevilla'], ['46', 'Valencia'], ['47', 'Valladolid'], ['48', 'Bizkaia'], ['50', 'Zaragoza']];

/* ───────── Componentes ───────── */
const pic = (n, alt, cls = '', eager = false, sizes = '(min-width:960px) 50vw, 100vw') => {
  const [w, h] = M[n];
  const ss = w > 800 ? ` srcset="${img(n + '-800.jpg')} 800w, ${img(n + '.jpg')} ${w}w" sizes="${sizes}"` : '';
  return `<img class="${cls}" src="${img(n + '.jpg')}"${ss} width="${w}" height="${h}" alt="${alt}"${eager ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"'}>`;
};
const ico = (n, c = '') => `<svg class="ico ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const rv = (d = 0, v = '') => `class="rv ${v}" style="--d:${d}"`;
const words = (t) => t.split(' ').map((w, i) => `<span class="hw"><span style="--i:${i}">${w}</span></span>`).join(' ');

const SPRITE = `<svg class="sprite" aria-hidden="true" focusable="false"><defs>
<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6l8-3Z"/><path d="M12 8v4M12 15.500v.01"/></symbol>
<symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="9" r="5"/><path d="m8.500 13.500-1.500 7 5-3 5 3-1.500-7"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.500"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.500" r="1.800"/><circle cx="17" cy="17.500" r="1.800"/></symbol>
<symbol id="i-route" viewBox="0 0 24 24"><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/></symbol>
<symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-5 6-7 10-9"/></symbol>
<symbol id="i-fuel" viewBox="0 0 24 24"><path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M4 21h12M15 9h2a2 2 0 0 1 2 2v5a1.500 1.500 0 0 0 3 0V8l-3-3M8 8h4"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3 2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9Z"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4.500 4.500L19 7"/></symbol>
<symbol id="i-up" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></symbol>
</defs></svg>`;

const nav = (cur) => `
<header class="head">
  <div class="wrap head-in">
    <a class="logo" href="/" aria-label="${NAME} – Inicio"><img src="${img('logo.png')}" alt="${NAME}" width="180" height="48"></a>
    <button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><i></i><i></i><i></i></button>
    <nav id="menu" class="menu" aria-label="Principal">
      <a href="/"${cur === '/' ? ' aria-current="page"' : ''}>Inicio</a>
      <div class="has-sub"><a href="/servicios/"${cur.startsWith('/servicios') || SERV.some((s) => cur === '/' + s.slug + '/') ? ' aria-current="page"' : ''}>Servicios</a>
        <div class="sub">${SERV.map((s) => `<a href="/${s.slug}/">${s.nav}</a>`).join('')}</div></div>
      <a href="/sobre-nosotros/"${cur === '/sobre-nosotros/' ? ' aria-current="page"' : ''}>Sobre Nosotros</a>
      <a href="/contacto/"${cur === '/contacto/' ? ' aria-current="page"' : ''}>Contacto</a>
      <a class="mob-only" href="/unete-a-nuestro-equipo/">Únete a nuestro equipo</a>
    </nav>
    <div class="head-act">
      <button class="btn-ico" data-search-open aria-label="Buscar en la web"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.500-3.500"/></svg></button>
      <a class="btn btn-line" href="/unete-a-nuestro-equipo/">Únete a nuestro equipo</a>
    </div>
  </div>
</header>`;

const road = () => `
<div class="road" data-fuel>
  <div class="wrap road-in">
    <span class="road-t">${ico('fuel')} Carburante hoy</span>
    <label class="sr" for="prov">Provincia</label>
    <select id="prov" data-fuel-prov>${PROVS.map(([v, n]) => `<option value="${v}">${n}</option>`).join('')}</select>
    <span class="road-p">Gasóleo A <b data-f="gasoleoA">–</b></span>
    <span class="road-p">Gasolina 95 <b data-f="gasolina95">–</b></span>
    <a class="road-more" href="/#carburante">Ver detalle</a>
  </div>
</div>`;

const form = (kind = 'contacto', svc = '', extra = true) => `
<form class="form" data-form="${kind}" novalidate>
  <input type="hidden" name="tipo" value="${kind}">
  <div class="hp" aria-hidden="true"><label>Web <input name="web" tabindex="-1" autocomplete="off"></label></div>
  <div class="grid2">
    <label>Nombre <input name="nombre" required autocomplete="name"></label>
    <label>Correo electrónico <input name="email" type="email" required autocomplete="email"></label>
    <label>Teléfono <input name="telefono" type="tel" autocomplete="tel"></label>
    ${extra ? `<label>Servicio <select name="servicio"><option value="">Selecciona…</option>${SERV.map((s) => `<option${s.title === svc ? ' selected' : ''}>${s.title}</option>`).join('')}<option>Otro</option></select></label>
    <label>Origen <input name="origen" placeholder="Ciudad o país"></label>
    <label>Destino <input name="destino" placeholder="Ciudad o país"></label>` : ''}
  </div>
  <label>Mensaje <textarea name="mensaje" rows="5" required></textarea></label>
  <label class="chk"><input type="checkbox" name="acepto" required> He leído y acepto la <a href="/politica-de-privacidad/">política de privacidad</a>.</label>
  ${SK ? `<div class="cf-turnstile" data-sitekey="${SK}"></div>` : ''}
  <button class="btn btn-lg" type="submit">Enviar mensaje ${ico('arrow')}</button>
  <p class="form-msg" role="status" aria-live="polite"></p>
</form>`;

const cta = () => `<section class="cta"><div class="wrap cta-in"><div ${rv()}><p class="eyebrow eb-w">Hablemos</p><h2>Cuéntanos qué necesitas</h2><p>Ya sea un servicio puntual o un contrato a largo plazo, te ofrecemos respuestas rápidas, trato directo y soluciones a medida.</p></div><div class="cta-act" ${rv(2)}><a class="btn btn-wh btn-lg" href="/contacto/">Contacto ${ico('arrow')}</a><a class="cta-tel" href="tel:${tel(C.t1)}">${ico('phone')} ${C.t1}</a></div></div></section>`;

const scard = (s, i = 0) => `<article class="scard rv" style="--d:${i}"><a class="scard-img" href="/${s.slug}/" tabindex="-1" aria-hidden="true">${pic(s.thumb, s.alt, '', false, '(min-width:960px) 25vw, 100vw')}<span class="scard-n">${s.n}</span></a><div class="scard-b"><h3><a href="/${s.slug}/">${s.title}</a></h3><p>${s.card}</p><a class="more" href="/${s.slug}/">Más información ${ico('arrow')}</a></div></article>`;
const others = (cur) => `<section class="sec alt"><div class="wrap"><p class="eyebrow">Descubre más</p><h2 ${rv()}>Otros servicios</h2><div class="cards3">${SERV.filter((s) => s.slug !== cur).map(scard).join('')}</div></div></section>`;

const quote = (svc) => `<section class="sec" id="presupuesto"><div class="wrap two-f"><div ${rv()}><p class="eyebrow">${svc ? 'Presupuesto' : 'Escríbenos'}</p><h2>${svc ? 'Solicita presupuesto' : 'Rellena el formulario'}</h2><p class="sub-t">Si tienes dudas, necesitas un presupuesto o buscas una solución logística específica, estamos aquí para ayudarte. Llámanos al <a href="tel:${tel(C.t1)}">${C.t1}</a> o rellena el siguiente formulario y nos pondremos en contacto contigo.</p><ul class="mini-c"><li>${ico('phone')}<a href="tel:${tel(C.t1)}">${C.t1}</a></li><li>${ico('mail')}<a href="mailto:${C.m1}">${C.m1}</a></li><li>${ico('pin')}${C.addr}</li></ul></div><div class="fcard" ${rv(1)}>${form('contacto', svc)}</div></div></section>`;

const crumbs = (items, cls = '') => `<nav class="crumbs ${cls}" aria-label="Migas de pan">${items.map(([n, u], i) => (i < items.length - 1 ? `<a href="${u}">${n}</a><span aria-hidden="true">/</span>` : `<span aria-current="page">${n}</span>`)).join('')}</nav>`;
const crumbLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) });

// Cabecera de página: panel azul + foto con corte diagonal
const phead = ({ crumbs: cr, h1, lead, img: im, alt, act }) => `
<section class="phead"><div class="phead-t"><div class="phead-in">${crumbs(cr, 'cr-w')}<h1 class="hrise">${words(h1)}</h1>${lead ? `<p class="lead lead-w rv" style="--d:3">${lead}</p>` : ''}${act || ''}</div></div><div class="phead-img">${pic(im, alt, '', true, '(min-width:960px) 45vw, 100vw')}</div></section>`;

const footer = () => `
<footer class="foot">
  <div class="wrap foot-grid">
    <div><img src="${img('logo.png')}" alt="${NAME}" width="170" height="45" loading="lazy" class="foot-logo"><p>Empresa especializada en el transporte de mercancías por carretera y soluciones logísticas personalizadas a nivel europeo.</p>
      <div class="certs"><img src="${img('cert-credito.jpg')}" alt="Crédito y Caución" loading="lazy"><img src="${img('cert-ifs.jpg')}" alt="IFS Logistics" loading="lazy"><img src="${img('cert-tuv.jpg')}" alt="TÜV ISO 9001:2015" loading="lazy"></div></div>
    <div><h3>Enlaces de interés</h3><ul><li><a href="/">Inicio</a></li><li><a href="/servicios/">Servicios</a></li>${SERV.map((s) => `<li class="sub-li"><a href="/${s.slug}/">${s.nav}</a></li>`).join('')}<li><a href="/sobre-nosotros/">Sobre Nosotros</a></li><li><a href="/contacto/">Contacto</a></li><li><a href="/unete-a-nuestro-equipo/">Únete a nuestro equipo</a></li></ul></div>
    <div><h3>Contacto</h3><ul class="fc"><li>${ico('phone')}<a href="tel:${tel(C.t1)}">${C.t1}</a></li><li>${ico('phone')}<a href="tel:${tel(C.t2)}">${C.t2}</a></li><li>${ico('mail')}<a href="mailto:${C.m1}">${C.m1}</a></li><li>${ico('mail')}<a href="mailto:${C.m2}">${C.m2}</a></li><li>${ico('pin')}<address>${C.addr}</address></li></ul>
      <ul class="legal"><li><a href="/politica-de-privacidad/">Política de Privacidad</a></li><li><a href="/politica-de-cookies/">Política de Cookies</a></li><li><a href="/aviso-legal/">Aviso legal</a></li></ul></div>
  </div>
  <div class="wrap foot-end"><span>© ${new Date().getFullYear()} ${NAME}. Todos los derechos reservados.</span><a href="#top" class="totop">Volver arriba ${ico('up')}</a></div>
</footer>
<a class="wa" href="https://wa.me/34${tel(C.t1)}?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20de%20transporte" aria-label="Escríbenos por WhatsApp" rel="noopener" target="_blank"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 0 1-13.200 8L3 21l1.100-4.600A9 9 0 1 1 21 12Z"/><path d="M9 9c.5 2.500 2.500 4.500 6 6l1.300-1.500-2-1-1 .8c-.8-.4-1.600-1.200-2-2l.8-1-1-2L9 9Z"/></svg></a>
<div class="search" data-search hidden role="dialog" aria-modal="true" aria-label="Buscador">
  <div class="search-box"><div class="search-bar"><input type="search" placeholder="Buscar servicios, páginas…" aria-label="Buscar" data-search-input autocomplete="off"><button class="btn-ico" data-search-close aria-label="Cerrar">✕</button></div><ul class="search-res" data-search-res></ul></div>
</div>`;

const layout = (p) => {
  const url = SITE + p.path;
  const ld = [p.ld, p.crumbs && crumbLd(p.crumbs)].flat().filter(Boolean);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#272e82">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:type" content="${p.path === '/' ? 'website' : 'article'}"><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.desc}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}${img((p.og || 'hero') + '.jpg')}">
<meta name="twitter:card" content="summary_large_image">
${SK ? `<meta name="turnstile-sitekey" content="${SK}">` : ''}
<link rel="preload" href="/assets/fonts/bitter.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="/assets/fonts/dmsans.woff" as="font" type="font/woff" crossorigin>
<script src="/assets/js/boot.js"></script>
<link rel="stylesheet" href="/assets/css/styles.css?v=${TODAY}">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body id="top">
${SPRITE}
<div class="prog" aria-hidden="true"></div>
<a class="skip" href="#content">Ir al contenido</a>
${road()}
${nav(p.path)}
<main id="content">
${p.body}
</main>
${footer()}
<script src="/assets/js/app.js?v=${TODAY}" defer></script>
</body>
</html>`;
};

/* ───────── Páginas ───────── */
const pages = [];
const org = {
  '@context': 'https://schema.org', '@type': ['LocalBusiness', 'MovingCompany'], '@id': SITE + '/#empresa', name: NAME, url: SITE + '/',
  logo: SITE + img('logo.png'), image: SITE + img('hero.jpg'), telephone: '+34' + tel(C.t1), email: C.m1,
  description: 'Empresa especializada en el transporte de mercancías por carretera y soluciones logísticas personalizadas a nivel europeo.',
  address: { '@type': 'PostalAddress', streetAddress: 'C/ Doctor Tabera y Araoz, 21 (bajo)', addressLocality: 'Hellín', addressRegion: 'Albacete', addressCountry: 'ES' },
  geo: { '@type': 'GeoCoordinates', latitude: 38.5106, longitude: -1.7005 }, areaServed: 'Europa',
  contactPoint: [{ '@type': 'ContactPoint', telephone: '+34' + tel(C.t1), email: C.m1, contactType: 'customer service', availableLanguage: 'es' }, { '@type': 'ContactPoint', telephone: '+34' + tel(C.t2), email: C.m2, contactType: 'sales', availableLanguage: 'es' }],
};
const siteLd = { '@context': 'https://schema.org', '@type': 'WebSite', url: SITE + '/', name: NAME, inLanguage: 'es-ES', potentialAction: { '@type': 'SearchAction', target: SITE + '/?q={search_term_string}', 'query-input': 'required name=search_term_string' } };

// ── Inicio
pages.push({
  path: '/', og: 'hero', keywords: 'inicio transporte carretera europa 25 años logística',
  title: 'Transporte de mercancías por carretera en Europa | Carlos Transportes Generales',
  desc: 'Servicios de transporte fiables, seguros y personalizados en toda Europa. Más de 25 años ofreciendo soluciones logísticas.', ld: [org, siteLd],
  body: `
<section class="hero">
  ${pic('hero', 'Camión de Carlos Transportes Generales en carretera al atardecer', 'hero-img', true, '100vw')}
  <div class="wrap hero-in"><div class="hero-t">
    <p class="eyebrow eb-w rv" style="--d:0">Transporte de mercancías por carretera · Europa</p>
    <h1 class="hrise">${words('Servicios de transporte personalizados, seguros y eficientes')}</h1>
    <p class="hero-p rv" style="--d:4">Transporte de confianza con más de 25 años de experiencia, desde Hellín (Albacete) a toda Europa.</p>
    <div class="hero-act rv" style="--d:5"><a class="btn btn-wh btn-lg" href="/contacto/">Solicitar presupuesto ${ico('arrow')}</a><a class="btn btn-line btn-w btn-lg" href="/servicios/">Nuestros servicios</a></div></div></div>
</section>
<div class="wrap trust"><ul>
  <li class="rv" style="--d:0">${ico('clock')}<div><b><span data-count="25">25</span>+ años</b><small>de experiencia en el sector</small></div></li>
  <li class="rv" style="--d:1">${ico('globe')}<div><b>Cobertura europea</b><small>nacional e internacional</small></div></li>
  <li class="rv" style="--d:2">${ico('shield')}<div><b>Transporte ADR</b><small>mercancías peligrosas</small></div></li>
  <li class="rv" style="--d:3">${ico('award')}<div><b>ISO 9001 · IFS</b><small>calidad certificada</small></div></li>
</ul></div>

<section class="sec"><div class="wrap two">
  <div class="collage rv rv-l"><div class="c1">${pic('scania-dia', 'Camión Scania de Carlos Transportes Generales', '', false, '(min-width:960px) 30vw, 70vw')}</div><div class="c2">${pic('vidal-cielo', 'Camiones de carga general', '', false, '(min-width:960px) 25vw, 50vw')}</div><div class="badge"><b data-count="25">25</b><span>años<br>de experiencia</span></div></div>
  <div class="prose"><p class="eyebrow rv">Quiénes somos</p><h2 ${rv(1)}>Transporte de confianza con más de 25 años de experiencia</h2>
<p ${rv(2)}>En Carlos Transportes Generales, contamos con más de dos décadas construyendo relaciones sólidas y ofreciendo servicios de transporte diseñados para responder con precisión a las necesidades de cada cliente. Nuestra prioridad es garantizar soluciones flexibles, fiables y adaptadas que aporten valor tanto a ti como a tu negocio.</p>
<p ${rv(3)}>Gracias a nuestra especialización en el transporte de carga general y cargas de gran volumen, nos hemos posicionado como un referente en el sector, tanto a nivel nacional como internacional. Firmas de reconocido prestigio confían en nosotros desde hace años, lo que avala nuestro compromiso constante con la calidad, la exclusividad y un servicio personalizado que marca la diferencia.</p>
<p class="pull rv" style="--d:4"><strong>En Carlos Transportes Generales, no solo movemos mercancías: movemos confianza, seguridad y experiencia.</strong></p></div>
</div></section>

<section class="sec alt"><div class="wrap"><div class="sec-h"><div><p class="eyebrow rv">Qué hacemos</p><h2 ${rv(1)}>Nuestros Servicios de Transporte</h2></div><a class="btn btn-line rv" style="--d:2" href="/servicios/">Más información ${ico('arrow')}</a></div>
<div class="cards4">${SERV.map((s, i) => `<article class="scard rv" style="--d:${i}"><a class="scard-img" href="/${s.slug}/" tabindex="-1" aria-hidden="true">${pic(s.thumb, s.alt, '', false, '(min-width:960px) 25vw, 100vw')}<span class="scard-n">${s.n}</span></a><div class="scard-b"><h3><a href="/${s.slug}/">${s.title}</a></h3><p>${s.sh}</p><a class="more" href="/${s.slug}/">Ver servicio ${ico('arrow')}</a></div></article>`).join('')}</div></div></section>

<section class="sec sec-dark" id="carburante"><div class="wrap"><div class="sec-h"><div><p class="eyebrow eb-w rv">En directo</p><h2 ${rv(1)}>Precio del carburante</h2><p class="sub-t sub-w rv" style="--d:2">Precios medios y estación más barata de la provincia, con datos oficiales del Ministerio para la Transición Ecológica actualizados cada día.</p></div></div>
<div class="fuel-card rv" style="--d:2" data-fuel-card><p class="muted">Cargando precios…</p></div></div></section>

<section class="band" style="background-image:url(${img('scania-noche.jpg')})"><div class="wrap band-in"><div class="band-t"><p class="eyebrow eb-w rv">Nuestra trayectoria</p><h2 ${rv(1)}>Comprometidos contigo</h2>
<p ${rv(2)}>Nuestra trayectoria está respaldada por relaciones duraderas con nuestros clientes que valoran mucho más que un servicio de transporte: la confianza, la seriedad y la tranquilidad de contar con un medio que responde.</p>
<p ${rv(3)}>A lo largo de más de 25 años, hemos demostrado que un transporte eficaz empieza por una relación sólida basada en la confianza y la atención al detalle.</p>
<p ${rv(4)}>Descubre por qué cada vez más empresas apuestan por nosotros como su aliado logístico de referencia.</p><a class="btn btn-wh btn-lg rv" style="--d:5" href="/sobre-nosotros/">¡Conócenos! ${ico('arrow')}</a></div></div></section>

<section class="sec"><div class="wrap"><div class="center"><p class="eyebrow rv">Garantías</p><h2 ${rv(1)}>Calidad y confianza certificadas</h2></div>
<div class="certs-row"><figure class="rv" style="--d:1"><img src="${img('cert-credito.jpg')}" alt="Empresa asegurada – Crédito y Caución" loading="lazy"></figure><figure class="rv" style="--d:2"><img src="${img('cert-ifs.jpg')}" alt="IFS Logistics" loading="lazy"></figure><figure class="rv" style="--d:3"><img src="${img('cert-tuv.jpg')}" alt="TÜV Saarland – ISO 9001:2015" loading="lazy"></figure></div></div></section>

<section class="sec alt"><div class="wrap two rev">${pic('lavado', 'Camión de Carlos Transportes Generales en instalación de lavado', 'rounded rv rv-l', false, '(min-width:960px) 50vw, 100vw')}<div><p class="eyebrow rv">Sostenibilidad</p><h2 ${rv(1)}>Nuestro Compromiso con el Medio Ambiente</h2><p ${rv(2)}>Cuidamos nuestra flota y nuestra actividad con el entorno en mente, para que cada trayecto sea responsable con el medio ambiente.</p><a class="btn btn-line rv" style="--d:3" href="/contacto/">Contacto ${ico('arrow')}</a></div></div></section>
${cta()}`,
});

// ── Servicios (índice)
pages.push({
  path: '/servicios/', og: 'estadio', crumbs: [['Inicio', '/'], ['Servicios', '/servicios/']], keywords: 'servicios transporte logística camiones dedicados ADR multimodal gran volumen',
  title: 'Servicios de transporte y logística | Carlos Transportes Generales',
  desc: 'Servicios profesionales de transporte y logística. Soluciones seguras, puntuales y a medida en todo el territorio nacional e internacional.',
  ld: [{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: SERV.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/${s.slug}/`, name: s.title })) }],
  body: `${phead({ crumbs: [['Inicio', '/'], ['Servicios', '/servicios/']], h1: 'Nuestros Servicios de Transporte', lead: 'Soluciones de transporte y logística que combinan eficiencia, flexibilidad y un alto estándar de calidad.', img: 'estadio', alt: 'Camión de Carlos Transportes Generales' })}
<section class="sec"><div class="wrap narrow prose"><p ${rv()}>Ofrecemos servicios de transporte y logística que combinan eficiencia, flexibilidad y un alto estándar de calidad. Nuestra experiencia nos permite diseñar operativas a medida para cada cliente, optimizando recursos y garantizando un servicio seguro, puntual y ajustado a tus necesidades reales.</p>
<p ${rv(1)}>Cada cliente cuenta con soluciones personalizadas, pensadas para asegurar el cumplimiento de plazos, el cuidado de la mercancía y el respeto por todas las normativas vigentes, tanto en el ámbito nacional como internacional.</p>
<p ${rv(2)}>En Carlos Transportes Generales, ponemos a tu disposición una red de soluciones diseñadas para optimizar tus procesos logísticos y convertirnos en tu proveedor de transporte de referencia.</p></div></section>
${SERV.map((s, i) => `<section class="sec ${i % 2 ? '' : 'alt'}"><div class="wrap two ${i % 2 ? 'rev' : ''} srow"><div><p class="eyebrow rv">Servicio ${s.n}</p><h2 ${rv(1)}>${s.title}</h2><p ${rv(2)}>${s.card}</p><a class="btn rv" style="--d:3" href="/${s.slug}/">Más información ${ico('arrow')}</a></div><div class="frame rv ${i % 2 ? 'rv-l' : 'rv-r'}">${pic(s.thumb, s.alt, 'rounded', false)}</div></div></section>`).join('')}
${quote('')}`,
});

// ── Páginas de servicio
for (const s of SERV)
  pages.push({
    path: `/${s.slug}/`, og: s.hd, crumbs: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.title, `/${s.slug}/`]], keywords: s.title + ' ' + s.h2,
    title: `${s.ptitle} | Carlos Transportes Generales`, desc: s.desc,
    ld: [{ '@context': 'https://schema.org', '@type': 'Service', name: s.ptitle, serviceType: s.title, description: s.desc, areaServed: 'Europa', provider: { '@id': SITE + '/#empresa' }, url: `${SITE}/${s.slug}/` }],
    body: `${phead({ crumbs: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.title, `/${s.slug}/`]], h1: s.h1, lead: s.lead, img: s.hd, alt: s.alt, act: `<div class="hero-act rv" style="--d:4"><a class="btn btn-wh" href="#presupuesto">Solicitar presupuesto ${ico('arrow')}</a><a class="btn btn-line btn-w" href="tel:${tel(C.t1)}">${C.t1}</a></div>` })}
<section class="sec"><div class="wrap two-s"><div class="prose"><p class="eyebrow rv">Servicio ${s.n}</p><h2 ${rv(1)}>${s.h2}</h2>${s.body.map((t, i) => `<p ${rv(i + 2)}>${t}</p>`).join('')}</div>
<aside class="aside rv rv-r"><h3>¿Hablamos de tu envío?</h3><p>Cuéntanos qué necesitas y te respondemos con una propuesta a medida.</p><ul class="mini-c"><li>${ico('phone')}<a href="tel:${tel(C.t1)}">${C.t1}</a></li><li>${ico('mail')}<a href="mailto:${C.m1}">${C.m1}</a></li></ul><a class="btn btn-wh" href="#presupuesto">Pedir presupuesto ${ico('arrow')}</a></aside></div></section>
<section class="sec alt"><div class="wrap"><p class="eyebrow rv">Nuestra flota</p><h2 ${rv(1)}>Camiones y equipos a tu servicio</h2><div class="gal3">${s.gal.map((g, i) => `<div class="gi rv" style="--d:${i}">${pic(g, 'Flota de Carlos Transportes Generales', '', false, '(min-width:960px) 33vw, 100vw')}</div>`).join('')}</div></div></section>
${others(s.slug)}${quote(s.title)}`,
  });

// ── Sobre nosotros
pages.push({
  path: '/sobre-nosotros/', og: 'scania-dia', crumbs: [['Inicio', '/'], ['Sobre Nosotros', '/sobre-nosotros/']], keywords: 'quiénes somos empresa experiencia exclusividad calidad',
  title: 'Sobre nosotros: empresa de transporte de confianza | Carlos Transportes Generales',
  desc: 'Somos una empresa de transporte comprometida con la calidad, la confianza y el servicio personalizado de cada cliente.',
  body: `${phead({ crumbs: [['Inicio', '/'], ['Sobre Nosotros', '/sobre-nosotros/']], h1: 'Tu empresa de transporte de confianza', lead: 'Más de 25 años moviendo mercancías y construyendo relaciones duraderas.', img: 'scania-dia', alt: 'Camión Scania de Carlos Transportes Generales' })}
<section class="sec"><div class="wrap two"><div class="prose"><p class="eyebrow rv">Nuestra historia</p><h2 ${rv(1)}>¿Quiénes somos?</h2>
<p ${rv(2)}>Hace más de 25 años comenzamos este camino con una idea clara y un propósito firme: ofrecer, como empresa de transporte, un servicio en el que la profesionalidad, el compromiso y la atención al detalle fueran los pilares que marcaran la diferencia. Desde el primer día, entendimos que no se trata solo de mover mercancías, sino de construir relaciones sólidas y duraderas basadas en la confianza mutua y el respeto hacia nuestros clientes.</p>
<p ${rv(3)}>Con el tiempo, esta filosofía se convirtió en nuestra mayor fortaleza y nos llevó a especializarnos en un trabajo que requiere precisión, experiencia y una responsabilidad absoluta. Nos enfocamos en transportar camiones dedicados y cargas de gran volumen, tareas que exigen una logística rigurosa en cada etapa del proceso.</p>
<p ${rv(4)}>Hoy, después de más de dos décadas, seguimos siendo la empresa de transporte en la que confían grandes marcas. Porque en Carlos Transportes Generales, cada trayecto es mucho más que un servicio: es un compromiso con la excelencia, la seguridad y la tranquilidad de quienes confían en nosotros para mover su negocio hacia adelante.</p></div>
<div class="mosaic"><div class="rv rv-z" style="--d:0">${pic('lavado', 'Flota de Carlos TG', 'rounded')}</div><div class="rv rv-z" style="--d:1">${pic('vidal-azul', 'Camiones de carga general', 'rounded')}</div><div class="rv rv-z" style="--d:2">${pic('daf-noche', 'Camión DAF de noche', 'rounded')}</div><div class="rv rv-z" style="--d:3">${pic('acero', 'Carga asegurada en camión', 'rounded')}</div></div></div></section>
<section class="sec alt"><div class="wrap"><div class="center"><p class="eyebrow rv">Nuestros valores</p><h2 ${rv(1)}>Lo que nos define</h2></div><div class="values">
<div class="val rv" style="--d:0">${ico('clock', 'ico-l')}<h3>Experiencia</h3><p>Más de dos décadas enfrentando con éxito los retos del sector logístico.</p></div>
<div class="val rv" style="--d:1">${ico('star', 'ico-l')}<h3>Exclusividad</h3><p>Diseñamos cada operativa pensando únicamente en las necesidades de cada cliente.</p></div>
<div class="val rv" style="--d:2">${ico('award', 'ico-l')}<h3>Calidad</h3><p>Equipos formados, vehículos adecuados y un compromiso total con la seguridad y el cumplimiento.</p></div></div></div></section>
<section class="band" style="background-image:url(${img('scania-noche.jpg')})"><div class="wrap band-in"><div class="band-t"><p class="eyebrow eb-w rv">Contacto</p><h2 ${rv(1)}>¿Hablamos?</h2>
<p ${rv(2)}>En Carlos Transportes Generales creemos en el valor de las relaciones a largo plazo, construidas sobre la base del compromiso, la calidad y la confianza mutua. Para nosotros, cada cliente es un socio con el que trabajamos codo con codo para superar sus expectativas.</p>
<p ${rv(3)}>Si buscas una empresa de transporte que se implique de verdad, estamos listos para escucharte y ofrecerte una solución que se ajuste perfectamente a lo que necesitas.</p>
<p ${rv(4)}>No importa la complejidad o la urgencia del servicio. Contacta con nosotros y descubre cómo podemos ayudarte.</p><a class="btn btn-wh btn-lg rv" style="--d:5" href="/contacto/">Contacto ${ico('arrow')}</a></div></div></section>`,
});

// ── Contacto
pages.push({
  path: '/contacto/', og: 'scania-noche', crumbs: [['Inicio', '/'], ['Contacto', '/contacto/']], keywords: 'contacto teléfono email dirección Hellín presupuesto',
  title: 'Contacto y presupuesto de transporte | Carlos Transportes Generales',
  desc: '¿Necesitas contactar una empresa de transporte? En Carlos Transportes Generales estamos disponibles para resolver tus dudas y solicitudes.',
  ld: [{ '@context': 'https://schema.org', '@type': 'ContactPage', url: SITE + '/contacto/', mainEntity: { '@id': SITE + '/#empresa' } }],
  body: `${phead({ crumbs: [['Inicio', '/'], ['Contacto', '/contacto/']], h1: '¿Necesitas una solución de transporte? Ponte en contacto con nosotros', lead: 'En Carlos Transportes Generales te ofrecemos atención personalizada, respuestas claras y experiencia comprobada.', img: 'scania-noche', alt: 'Camión Scania de Carlos Transportes Generales' })}
<section class="sec"><div class="wrap two-f"><div class="cinfo rv rv-l"><h2>Estamos aquí para ayudarte</h2><p>Si tienes dudas, necesitas un presupuesto o buscas una solución logística específica, estamos aquí para ayudarte.</p>
<ul><li>${ico('phone')}<div><small>Teléfono</small><a href="tel:${tel(C.t1)}">${C.t1}</a><a href="tel:${tel(C.t2)}">${C.t2}</a></div></li><li>${ico('mail')}<div><small>Correo electrónico</small><a href="mailto:${C.m1}">${C.m1}</a><a href="mailto:${C.m2}">${C.m2}</a></div></li><li>${ico('pin')}<div><small>Dirección</small><span>${C.addr}</span></div></li></ul></div>
<div class="fcard rv rv-r">${form('contacto')}</div></div></section>
<section class="sec alt"><div class="wrap"><div class="map" data-map="${C.map}"><button class="btn" type="button" data-map-load>${ico('pin')} Cargar mapa de Google</button><p>Al cargar el mapa aceptas las cookies de Google Maps. <a href="https://www.google.com/maps/search/?api=1&query=Calle+Doctor+Tabera+y+Araoz+21+Hellín" rel="noopener" target="_blank">Abrir en Google Maps</a></p></div></div></section>`,
});

// ── Únete
pages.push({
  path: '/unete-a-nuestro-equipo/', og: 'daf-noche', crumbs: [['Inicio', '/'], ['Únete a nuestro equipo', '/unete-a-nuestro-equipo/']], keywords: 'trabajo empleo conductor C+E CAP ADR tarjeta conductor',
  title: 'Trabaja con nosotros: empleo de conductor | Carlos Transportes Generales',
  desc: '¿Buscas trabajo en una empresa de transporte? En Carlos Transportes Generales te ofrecemos la oportunidad de crecer profesionalmente.',
  ld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Únete a nuestro equipo', url: SITE + '/unete-a-nuestro-equipo/' }],
  body: `${phead({ crumbs: [['Inicio', '/'], ['Únete a nuestro equipo', '/unete-a-nuestro-equipo/']], h1: '¿Te gustaría trabajar con nosotros?', lead: 'Si buscas trabajo en una empresa de transporte y quieres desarrollarte profesionalmente en el sector, en Carlos Transportes Generales te damos la oportunidad.', img: 'daf-noche', alt: 'Camión DAF de Carlos Transportes Generales de noche' })}
<section class="sec"><div class="wrap two-f"><div class="prose">
<p ${rv()}>Buscamos personas comprometidas, con ganas de aprender y formar parte de un equipo que se toma en serio lo que hace. Desde el primer día, trabajarás con un compañero con experiencia que será tu apoyo y guía y te ayudará a conocer cómo trabajamos y qué valoramos y llegar a ser un profesional de confianza.</p>
<p ${rv(1)}>En Carlos Transportes Generales podrás recibir toda la formación complementaria que desees aumentando así tu cualificación personal al nivel que te propongas. Esto es posible gracias a la importancia que damos al departamento de recursos humanos que nos confiere como empresa un plus de estabilidad y calidad.</p>
<h2 ${rv(2)}>Documentación a aportar</h2><ul class="check rv" style="--d:3">${['Permiso de conducir C+E', 'CAP', 'Tarjeta del conductor', 'DNI o NIE', 'ADR Básico', 'Currículum Vitae'].map((x) => `<li>${x}</li>`).join('')}</ul>
<p ${rv(4)}>Si estás interesado, ponte en contacto con nuestra empresa a través del correo electrónico <a href="mailto:${C.m2}">${C.m2}</a>. O si lo prefieres, rellena el siguiente formulario:</p></div><div class="fcard rv rv-r">${form('empleo', '', false)}</div></div></section>`,
});

// ── Legales (textos base: revisar con el cliente / asesor legal)
const legal = (path, title, body) => pages.push({ path, title: `${title} | ${NAME}`, desc: `${title} de ${NAME}.`, noindex: true, crumbs: [['Inicio', '/'], [title, path]], keywords: title, body: `<section class="sec"><div class="wrap narrow prose">${crumbs([['Inicio', '/'], [title, path]])}<h1>${title}</h1>${body}</div></section>` });
legal('/aviso-legal/', 'Aviso legal', `<p>En cumplimiento de la Ley 34/2002 (LSSI-CE) se informa de los datos del titular de este sitio web:</p><ul><li><b>Denominación:</b> ${NAME} [RAZÓN SOCIAL COMPLETA]</li><li><b>CIF:</b> [COMPLETAR]</li><li><b>Domicilio:</b> ${C.addr}</li><li><b>Correo:</b> <a href="mailto:${C.m1}">${C.m1}</a></li><li><b>Teléfono:</b> ${C.t1}</li><li><b>Inscripción registral:</b> [COMPLETAR]</li></ul><h2>Propiedad intelectual</h2><p>Los contenidos, textos, imágenes y diseño de esta web son propiedad del titular o de terceros que han autorizado su uso. Queda prohibida su reproducción sin autorización.</p><h2>Responsabilidad</h2><p>El titular no se hace responsable del uso indebido de la información publicada ni de los enlaces a sitios de terceros. Los precios de carburante mostrados proceden de datos abiertos del Ministerio para la Transición Ecológica y tienen carácter meramente informativo.</p>`);
legal('/politica-de-privacidad/', 'Política de privacidad', `<p><b>Responsable:</b> ${NAME} [RAZÓN SOCIAL, CIF]. ${C.addr}. <a href="mailto:${C.m1}">${C.m1}</a>.</p><p><b>Finalidad:</b> atender las consultas, solicitudes de presupuesto y candidaturas enviadas mediante los formularios de esta web.</p><p><b>Base jurídica:</b> consentimiento del interesado (art. 6.1.a RGPD) y aplicación de medidas precontractuales a petición suya.</p><p><b>Destinatarios:</b> no se cederán datos a terceros salvo obligación legal. Los mensajes se gestionan mediante proveedores de infraestructura (Cloudflare, servicio de envío de correo) que actúan como encargados del tratamiento.</p><p><b>Conservación:</b> durante el tiempo necesario para atender la solicitud y los plazos legales aplicables.</p><p><b>Derechos:</b> acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href="mailto:${C.m1}">${C.m1}</a>. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>`);
legal('/politica-de-cookies/', 'Política de cookies', `<p>Esta web <b>no utiliza cookies de seguimiento ni publicitarias</b>. Solo se emplean recursos técnicos necesarios para su funcionamiento.</p><h2>Contenido de terceros</h2><p>El mapa de Google Maps de la página de contacto <b>solo se carga si pulsas «Cargar mapa»</b>. En ese momento Google puede instalar cookies propias, sujetas a su <a href="https://policies.google.com/technologies/cookies?hl=es" rel="noopener">política de cookies</a>. La protección anti-spam de los formularios (Cloudflare Turnstile) y las estadísticas (Cloudflare Web Analytics, sin cookies) no identifican personalmente al usuario.</p><h2>Cómo gestionarlas</h2><p>Puedes borrar o bloquear las cookies desde la configuración de tu navegador (Chrome, Firefox, Edge o Safari). Para dudas: <a href="mailto:${C.m1}">${C.m1}</a>.</p>`);

/* ───────── Salida ───────── */
rmSync('dist', { recursive: true, force: true });
cpSync('static', 'dist', { recursive: true });
const out = (f, c) => { mkdirSync(dirname(join('dist', f)), { recursive: true }); writeFileSync(join('dist', f), c); };
for (const p of pages) out(p.path === '/' ? 'index.html' : p.path.slice(1) + 'index.html', layout(p));

out('404.html', layout({ path: '/404/', title: `Página no encontrada | ${NAME}`, desc: 'La página que buscas no existe.', noindex: true, body: `<section class="sec"><div class="wrap narrow"><p class="eyebrow">Error 404</p><h1>No encontramos esa página</h1><p class="lead">Puede que el enlace haya cambiado. Prueba con el buscador o vuelve al inicio.</p><p><a class="btn" href="/">Volver al inicio</a> <button class="btn btn-line" data-search-open>Buscar</button></p></div></section>` }));

const idx = pages.filter((p) => !p.noindex).map((p) => ({ t: p.title.split(' | ')[0], u: p.path, d: p.desc, k: p.keywords || '' }));
out('assets/search.json', JSON.stringify(idx));
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${TODAY}</lastmod><changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${p.path === '/' ? '1.0' : p.path.split('/').length > 3 ? '0.8' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`);
out('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
out('site.webmanifest', JSON.stringify({ name: NAME, short_name: 'Carlos TG', lang: 'es', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#272e82', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }] }));
out('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#272e82"/><path d="M42 22a14 14 0 1 0 0 20" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><rect x="14" y="48" width="36" height="4" rx="2" fill="#a9bde8"/></svg>`);
out('.well-known/security.txt', `Contact: mailto:${C.m1}\nExpires: 2027-12-31T00:00:00.000Z\nPreferred-Languages: es\nCanonical: ${SITE}/.well-known/security.txt\n`);
out('_headers', `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src https://maps.google.com https://www.google.com https://challenges.cloudflare.com; connect-src 'self' https://cloudflareinsights.com; base-uri 'self'; form-action 'self'; object-src 'none'
/assets/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
/assets/img/*
  Cache-Control: public, max-age=2592000
/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`);
console.log(`✔ ${pages.length + 1} páginas generadas en dist/`);
