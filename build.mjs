// Generador estático sin dependencias. Uso: node build.mjs  ->  carpeta dist/
import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE = 'https://www.carlostg.com';
const NAME = 'Carlos Transportes Generales';
const SK = process.env.TURNSTILE_SITEKEY || '';
const TODAY = new Date().toISOString().slice(0, 10);
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
    slug: 'camiones-dedicados', nav: 'Camiones Dedicados', title: 'Camiones dedicados', h1: 'Camiones dedicados',
    lead: 'En ciertos sectores, la logística no admite márgenes de error. Se requiere disponibilidad total, máxima puntualidad y un control preciso en cada etapa. Para estos casos, nuestro servicio de camiones dedicados es la opción ideal.',
    h2: 'Transporte en camiones dedicados',
    card: 'Montamos servicios acordes a tus necesidades de transporte y logística, poniendo especial atención en las especificaciones necesarias que cada cliente requiere con el fin de ofrecer la máxima disponibilidad, puntualidad y calidad, con seguimiento personalizado y atención al detalle.',
    body: ['El servicio de camiones dedicados está pensado para aquellas empresas que necesitan una solución exclusiva, personalizada y constante.', 'Ponemos a tu disposición vehículos asignados, adaptados a tus requerimientos técnicos, operativos y de horario. Esto permite un control total sobre la logística, mayor trazabilidad, tiempos de tránsito más predecibles y la posibilidad de establecer rutas fijas o variables según tu actividad.', 'Nos encargamos de estudiar cada caso en detalle, diseñando una solución que se alinee con tus flujos logísticos y objetivos de negocio.', 'Además, ofrecemos seguimiento personalizado, disponibilidad continua y atención prioritaria, garantizando que tu mercancía viaje siempre bajo los estándares más exigentes de puntualidad, seguridad y calidad.'],
    imgs: ['dedicados.jpg'], thumb: 'dedicados.jpg', alt: 'Camión dedicado de Carlos Transportes Generales',
    desc: 'En Carlos Transportes Generales ofrecemos servicios de transporte de camiones dedicados según tus necesidades y preferencias.',
    ptitle: 'Camiones dedicados para transporte de mercancías',
  },
  {
    slug: 'transporte-adr', nav: 'Transporte ADR', title: 'Transporte ADR', h1: 'Transporte ADR',
    lead: 'Este tipo de transporte exige una operativa altamente controlada, equipos especializados y un cumplimiento riguroso de la normativa vigente. En Carlos Transportes Generales, lo sabemos bien.',
    h2: 'Transporte ADR (mercancías peligrosas)',
    card: 'Disponemos de vehículos y equipos preparados para el transporte de mercancías peligrosas (ADR) en toda la Comunidad Europea. Cumplimos con todos los requisitos legales y el rigor que este tipo de carga requiere.',
    body: ['Contamos con una flota de vehículos y equipamiento homologado para el transporte ADR en toda la Comunidad Europea, así como con conductores certificados y formados específicamente para este tipo de operativas.', 'Cada envío se gestiona bajo estrictos protocolos de seguridad y conforme a la legislación aplicable, garantizando el manejo adecuado de sustancias clasificadas como peligrosas.', 'Además, ofrecemos asesoramiento personalizado para ayudarte a planificar tus envíos ADR de forma eficiente y sin complicaciones, cumpliendo con todos los requisitos legales y técnicos.'],
    imgs: ['adr.jpeg'], thumb: 'adr.jpeg', alt: 'Transporte ADR de mercancías peligrosas',
    desc: 'En Carlos Transportes Generales ofrecemos servicios de transporte ADR o de mercancías peligrosas adaptados a tus necesidades.',
    ptitle: 'Transporte ADR de mercancías peligrosas en Europa',
  },
  {
    slug: 'transporte-multimodal', nav: 'Transporte Multimodal', title: 'Transporte Multimodal', h1: 'Transporte Multimodal',
    lead: 'En un entorno logístico cada vez más exigente, la flexibilidad y la optimización de rutas son clave para mantenerse competitivo. Por eso, apostamos por el transporte multimodal: una solución que integra distintos medios de transporte para ofrecer mayor eficiencia, alcance y seguridad.',
    h2: 'Transporte Multimodal',
    card: 'Gracias a nuestros acuerdos con empresas líderes en Europa, ofrecemos un servicio de transporte multimodal que permite combinar distintos medios para maximizar la eficiencia logística y llegar a cualquier destino con rapidez y seguridad.',
    body: ['Gracias a nuestros acuerdos estratégicos con empresas líderes en el ámbito logístico europeo, ofrecemos un servicio multimodal que combina diferentes medios de transporte.', 'Este modelo permite diseñar rutas más rápidas, reducir los tiempos de tránsito y optimizar costes, sin comprometer la seguridad ni la trazabilidad de la mercancía.', 'Ya sea para transporte nacional o internacional, nuestro enfoque multimodal te garantiza acceso a una red sólida y eficiente, pensada para responder a cualquier necesidad logística con garantías.'],
    imgs: ['multimodal.jpg'], thumb: 'multimodal.jpg', alt: 'Servicios de transporte multimodal de Carlos TG',
    desc: 'En Carlos Transportes Generales ofrecemos servicios de transporte multimodal según tus necesidades y preferencias.',
    ptitle: 'Transporte multimodal nacional e internacional',
  },
  {
    slug: 'camiones-gran-volumen', nav: 'Camiones Gran Volumen', title: 'Carga General de Gran Volumen', h1: 'Camiones de Carga General de Gran Volumen',
    lead: 'Para mover grandes volúmenes, hace falta una logística precisa, recursos adecuados y un compromiso firme con los plazos y la seguridad. En Carlos Transportes Generales, ponemos todo esto a tu alcance.',
    h2: 'Transporte en camiones de carga de gran volumen',
    card: 'Contamos con soluciones logísticas para cargas no perecederas de gran volumen, con cobertura europea. Disponemos de la infraestructura y los recursos necesarios para adaptarnos a todo tipo de mercancías, siempre con los más altos estándares de calidad.',
    body: ['Ofrecemos un servicio especializado en cargas generales de gran volumen, con cobertura en toda la Unión Europea.', 'Disponemos de vehículos adaptados, personal cualificado y una infraestructura logística diseñada para gestionar grandes cantidades de mercancía de forma eficiente, segura y puntual.', 'Trabajamos con todo tipo de productos no perecederos y nos adaptamos a las particularidades de cada cliente, garantizando siempre un transporte limpio, ordenado y conforme a las normativas vigentes.', 'Tanto si necesitas envíos puntuales como una operativa regular, nuestro equipo está preparado para responder con soluciones flexibles, escalables y orientadas a resultados.'],
    imgs: ['gv-1.jpeg', 'gv-2.jpeg', 'gv-3.jpg', 'gv-4.jpeg'], thumb: 'gv-4.jpeg', alt: 'Camión de carga general de gran volumen',
    desc: 'En Carlos Transportes Generales ofrecemos servicios de transporte en camiones de carga general de gran volumen.',
    ptitle: 'Camiones de carga general de gran volumen en Europa',
  },
];
const PROVS = [['02', 'Albacete'], ['03', 'Alicante'], ['04', 'Almería'], ['08', 'Barcelona'], ['28', 'Madrid'], ['29', 'Málaga'], ['30', 'Murcia'], ['41', 'Sevilla'], ['46', 'Valencia'], ['47', 'Valladolid'], ['48', 'Bizkaia'], ['50', 'Zaragoza']];

/* ───────── Componentes ───────── */
const picture = (f, alt, cls = '', lazy = true) => `<img class="${cls}" src="${img(f)}" alt="${alt}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;

const nav = (cur) => `
<header class="head">
  <div class="wrap head-in">
    <a class="logo" href="/" aria-label="${NAME} – Inicio"><img src="${img('logo.png')}" alt="${NAME}" width="180" height="48"></a>
    <button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><span></span></button>
    <nav id="menu" class="menu" aria-label="Principal">
      <a href="/"${cur === '/' ? ' aria-current="page"' : ''}>Inicio</a>
      <div class="has-sub"><a href="/servicios/"${cur.startsWith('/servicios') || SERV.some((s) => cur === '/' + s.slug + '/') ? ' aria-current="page"' : ''}>Servicios</a>
        <div class="sub">${SERV.map((s) => `<a href="/${s.slug}/">${s.nav}</a>`).join('')}</div></div>
      <a href="/sobre-nosotros/"${cur === '/sobre-nosotros/' ? ' aria-current="page"' : ''}>Sobre Nosotros</a>
      <a href="/contacto/"${cur === '/contacto/' ? ' aria-current="page"' : ''}>Contacto</a>
    </nav>
    <div class="head-act">
      <button class="btn-ico" data-search-open aria-label="Buscar en la web"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
      <a class="btn btn-line" href="/unete-a-nuestro-equipo/">Únete a nuestro equipo</a>
    </div>
  </div>
</header>`;

const road = () => `
<div class="road" data-fuel>
  <div class="wrap road-in">
    <span class="road-t">Carburante hoy</span>
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
  <button class="btn" type="submit">Enviar</button>
  <p class="form-msg" role="status" aria-live="polite"></p>
</form>`;

const cta = () => `<section class="cta"><div class="wrap cta-in"><div><h2>Cuéntanos qué necesitas</h2><p>Ya sea un servicio puntual o un contrato a largo plazo, te ofrecemos respuestas rápidas, trato directo y soluciones a medida.</p></div><a class="btn btn-or" href="/contacto/">Contacto</a></div></section>`;

const others = (cur) => `<section class="sec alt"><div class="wrap"><h2>Otros servicios</h2><div class="cards">${SERV.filter((s) => s.slug !== cur).map((s) => `<article class="card"><a href="/${s.slug}/" tabindex="-1" aria-hidden="true">${picture(s.thumb, s.alt, 'card-img')}</a><div class="card-b"><h3><a href="/${s.slug}/">${s.title}</a></h3><p>${s.card}</p><a class="more" href="/${s.slug}/">Más información</a></div></article>`).join('')}</div></div></section>`;

const quote = (svc) => `<section class="sec"><div class="wrap narrow"><h2>${svc ? 'Solicita presupuesto' : 'Rellena el formulario'}</h2><p class="sub-t">Si tienes dudas, necesitas un presupuesto o buscas una solución logística específica, estamos aquí para ayudarte. Llámanos al <a href="tel:${tel(C.t1)}">${C.t1}</a> o rellena el siguiente formulario y nos pondremos en contacto contigo:</p>${form('contacto', svc)}</div></section>`;

const crumbs = (items) => `<nav class="crumbs wrap" aria-label="Migas de pan">${items.map(([n, u], i) => (i < items.length - 1 ? `<a href="${u}">${n}</a><span aria-hidden="true">/</span>` : `<span aria-current="page">${n}</span>`)).join('')}</nav>`;
const crumbLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) });

const footer = () => `
<footer class="foot">
  <div class="wrap foot-grid">
    <div><img src="${img('logo.png')}" alt="${NAME}" width="170" height="45" loading="lazy" class="foot-logo"><p>Empresa especializada en el transporte de mercancías por carretera y soluciones logísticas personalizadas a nivel europeo.</p>
      <div class="certs"><img src="${img('cert-credito.jpg')}" alt="Crédito y Caución" loading="lazy"><img src="${img('cert-ifs.jpg')}" alt="IFS Logistics" loading="lazy"><img src="${img('cert-tuv.jpg')}" alt="TÜV" loading="lazy"></div></div>
    <div><h3>Enlaces de interés</h3><ul><li><a href="/">Inicio</a></li><li><a href="/servicios/">Servicios</a></li>${SERV.map((s) => `<li class="sub-li"><a href="/${s.slug}/">${s.nav}</a></li>`).join('')}<li><a href="/sobre-nosotros/">Sobre Nosotros</a></li><li><a href="/contacto/">Contacto</a></li><li><a href="/unete-a-nuestro-equipo/">Únete a nuestro equipo</a></li></ul></div>
    <div><h3>Contacto</h3><ul><li><a href="tel:${tel(C.t1)}">${C.t1}</a></li><li><a href="tel:${tel(C.t2)}">${C.t2}</a></li><li><a href="mailto:${C.m1}">${C.m1}</a></li><li><a href="mailto:${C.m2}">${C.m2}</a></li></ul>
      <address>${C.addr}</address>
      <ul class="legal"><li><a href="/politica-de-privacidad/">Política de Privacidad</a></li><li><a href="/politica-de-cookies/">Política de Cookies</a></li><li><a href="/aviso-legal/">Aviso legal</a></li></ul></div>
  </div>
  <div class="wrap foot-end"><span>© ${new Date().getFullYear()} ${NAME}. Todos los derechos reservados.</span><span>Diseño original: Arthellín S.L.</span></div>
</footer>
<a class="wa" href="https://wa.me/34${tel(C.t1)}?text=Hola%2C%20quisiera%20información%20sobre%20vuestros%20servicios%20de%20transporte" aria-label="Escríbenos por WhatsApp" rel="noopener" target="_blank"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 0 1-13.2 8L3 21l1.1-4.6A9 9 0 1 1 21 12Z"/><path d="M9 9c.5 2.500 2.500 4.500 6 6l1.300-1.500-2-1-1 .8c-.8-.4-1.600-1.200-2-2l.8-1-1-2L9 9Z"/></svg></a>
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
<meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.desc}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}${img(p.og || 'hero.jpg')}">
<meta name="twitter:card" content="summary_large_image">
${SK ? `<meta name="turnstile-sitekey" content="${SK}">` : ''}
<link rel="stylesheet" href="/assets/css/styles.css?v=${TODAY}">
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#content">Ir al contenido</a>
${road()}
${nav(p.path)}
<main id="content">
${p.crumbs ? crumbs(p.crumbs) : ''}
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

// Inicio
pages.push({
  path: '/', og: 'hero.jpg', keywords: 'inicio transporte carretera europa 25 años logística',
  title: 'Transporte de mercancías por carretera en Europa | Carlos Transportes Generales',
  desc: 'Servicios de transporte fiables, seguros y personalizados en toda Europa. Más de 25 años ofreciendo soluciones logísticas.', ld: [org, siteLd],
  body: `
<section class="hero"><div class="wrap hero-in">
  <div class="hero-t"><h1>Servicios de transporte personalizados, seguros y eficientes</h1><p>Transporte de confianza con más de 25 años de experiencia, desde Hellín (Albacete) a toda Europa.</p>
    <div class="hero-act"><a class="btn btn-or" href="/contacto/">Solicitar presupuesto</a><a class="btn btn-line btn-w" href="/servicios/">Nuestros servicios</a></div></div>
  ${picture('hero.jpg', 'Camión de Carlos Transportes Generales en carretera', 'hero-img', false)}
</div></section>
<section class="sec"><div class="wrap two"><div><h2>Transporte de confianza con más de 25 años de experiencia</h2></div><div class="prose">
<p>En Carlos Transportes Generales, contamos con más de dos décadas construyendo relaciones sólidas y ofreciendo servicios de transporte diseñados para responder con precisión a las necesidades de cada cliente. Nuestra prioridad es garantizar soluciones flexibles, fiables y adaptadas que aporten valor tanto a ti como a tu negocio.</p>
<p>Gracias a nuestra especialización en el transporte de carga general y cargas de gran volumen, nos hemos posicionado como un referente en el sector, tanto a nivel nacional como internacional. Firmas de reconocido prestigio confían en nosotros desde hace años, lo que avala nuestro compromiso constante con la calidad, la exclusividad y un servicio personalizado que marca la diferencia.</p>
<p><strong>En Carlos Transportes Generales, no solo movemos mercancías: movemos confianza, seguridad y experiencia.</strong></p></div></div></section>
<section class="sec alt"><div class="wrap"><h2>Nuestros Servicios de Transporte</h2>
<ul class="svc-list">
<li><a href="/camiones-dedicados/"><b>Camiones dedicados</b>, adaptados a cada necesidad específica.</a></li>
<li><a href="/transporte-adr/"><b>Transporte ADR</b> (mercancías peligrosas) con cobertura en toda la Comunidad Europea.</a></li>
<li><a href="/transporte-multimodal/"><b>Multimodal internacional</b>, gracias a nuestras alianzas con operadores líderes en Europa.</a></li>
<li><a href="/camiones-gran-volumen/"><b>Carga general de gran volumen</b>, para todo tipo de mercancía no perecedera.</a></li></ul>
<a class="btn" href="/servicios/">Más información</a>
<div class="strip">${[1, 2, 3, 4, 5].map((n) => `<a href="/servicios/">${picture('nosotros-' + n + '.jpg', 'Servicios de transporte Carlos TG')}</a>`).join('')}</div></div></section>
<section class="sec" id="carburante"><div class="wrap"><h2>Precio del carburante</h2><p class="sub-t">Precios medios y estación más barata de la provincia, con datos oficiales del Ministerio para la Transición Ecológica actualizados cada día.</p>
<div class="fuel-card" data-fuel-card><p class="muted">Cargando precios…</p></div></div></section>
<section class="sec alt"><div class="wrap two"><div><h2>Comprometidos contigo</h2></div><div class="prose">
<p>Nuestra trayectoria está respaldada por relaciones duraderas con nuestros clientes que valoran mucho más que un servicio de transporte: la confianza, la seriedad y la tranquilidad de contar con un medio que responde.</p>
<p>A lo largo de más de 25 años, hemos demostrado que un transporte eficaz empieza por una relación sólida basada en la confianza y la atención al detalle.</p>
<p>Descubre por qué cada vez más empresas apuestan por nosotros como su aliado logístico de referencia.</p><a class="btn" href="/sobre-nosotros/">¡Conócenos!</a></div></div></section>
<section class="sec"><div class="wrap two rev">${picture('medio-ambiente.jpg', 'Carlos TG y el medio ambiente', 'rounded')}<div><h2>Nuestro Compromiso con el Medio Ambiente</h2></div></div></section>
${cta()}`,
});

// Servicios (índice)
pages.push({
  path: '/servicios/', og: 'dedicados.jpg', crumbs: [['Inicio', '/'], ['Servicios', '/servicios/']], keywords: 'servicios transporte logística camiones dedicados ADR multimodal gran volumen',
  title: 'Servicios de transporte y logística | Carlos Transportes Generales',
  desc: 'Servicios profesionales de transporte y logística. Soluciones seguras, puntuales y a medida en todo el territorio nacional e internacional.',
  ld: [{ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: SERV.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/${s.slug}/`, name: s.title })) }],
  body: `<section class="sec"><div class="wrap narrow"><h1>Nuestros Servicios de Transporte</h1><div class="prose">
<p>Ofrecemos servicios de transporte y logística que combinan eficiencia, flexibilidad y un alto estándar de calidad. Nuestra experiencia nos permite diseñar operativas a medida para cada cliente, optimizando recursos y garantizando un servicio seguro, puntual y ajustado a tus necesidades reales.</p>
<p>Cada cliente cuenta con soluciones personalizadas, pensadas para asegurar el cumplimiento de plazos, el cuidado de la mercancía y el respeto por todas las normativas vigentes, tanto en el ámbito nacional como internacional.</p>
<p>En Carlos Transportes Generales, ponemos a tu disposición una red de soluciones diseñadas para optimizar tus procesos logísticos y convertirnos en tu proveedor de transporte de referencia.</p></div></div></section>
${SERV.map((s, i) => `<section class="sec ${i % 2 ? '' : 'alt'}"><div class="wrap two ${i % 2 ? 'rev' : ''}"><div><h2>${s.title}</h2><p>${s.card}</p><a class="btn" href="/${s.slug}/">Más información</a></div>${picture(s.thumb, s.alt, 'rounded')}</div></section>`).join('')}
${quote('')}`,
});

// Páginas de servicio
for (const s of SERV)
  pages.push({
    path: `/${s.slug}/`, og: s.thumb, crumbs: [['Inicio', '/'], ['Servicios', '/servicios/'], [s.title, `/${s.slug}/`]], keywords: s.title + ' ' + s.h2,
    title: `${s.ptitle} | Carlos Transportes Generales`, desc: s.desc,
    ld: [{ '@context': 'https://schema.org', '@type': 'Service', name: s.ptitle, serviceType: s.title, description: s.desc, areaServed: 'Europa', provider: { '@id': SITE + '/#empresa' }, url: `${SITE}/${s.slug}/` }],
    body: `<section class="sec"><div class="wrap narrow"><h1>${s.h1}</h1><p class="lead">${s.lead}</p></div></section>
<section class="sec alt"><div class="wrap two"><div class="prose"><h2>${s.h2}</h2>${s.body.map((t) => `<p>${t}</p>`).join('')}</div><div class="gal g${s.imgs.length}">${s.imgs.map((f) => picture(f, s.alt, 'rounded')).join('')}</div></div></section>
${others(s.slug)}${quote(s.title)}`,
  });

// Sobre nosotros
pages.push({
  path: '/sobre-nosotros/', og: 'nosotros-1.jpg', crumbs: [['Inicio', '/'], ['Sobre Nosotros', '/sobre-nosotros/']], keywords: 'quiénes somos empresa experiencia exclusividad calidad',
  title: 'Sobre nosotros: empresa de transporte de confianza | Carlos Transportes Generales',
  desc: 'Somos una empresa de transporte comprometida con la calidad, la confianza y el servicio personalizado de cada cliente.',
  body: `<section class="sec"><div class="wrap two"><div class="prose"><p class="kicker">Tu empresa de transporte de confianza</p><h1>¿Quiénes somos?</h1>
<p>Hace más de 25 años comenzamos este camino con una idea clara y un propósito firme: ofrecer, como empresa de transporte, un servicio en el que la profesionalidad, el compromiso y la atención al detalle fueran los pilares que marcaran la diferencia. Desde el primer día, entendimos que no se trata solo de mover mercancías, sino de construir relaciones sólidas y duraderas basadas en la confianza mutua y el respeto hacia nuestros clientes.</p>
<p>Con el tiempo, esta filosofía se convirtió en nuestra mayor fortaleza y nos llevó a especializarnos en un trabajo que requiere precisión, experiencia y una responsabilidad absoluta. Nos enfocamos en transportar camiones dedicados y cargas de gran volumen, tareas que exigen una logística rigurosa en cada etapa del proceso.</p>
<p>Hoy, después de más de dos décadas, seguimos siendo la empresa de transporte en la que confían grandes marcas. Porque en Carlos Transportes Generales, cada trayecto es mucho más que un servicio: es un compromiso con la excelencia, la seguridad y la tranquilidad de quienes confían en nosotros para mover su negocio hacia adelante.</p></div>
<div class="gal g4">${[1, 2, 3, 4].map((n) => picture('nosotros-' + n + '.jpg', 'Carlos Transportes Generales', 'rounded')).join('')}</div></div></section>
<section class="sec alt"><div class="wrap"><div class="values">
<div><h2>Experiencia</h2><p>Más de dos décadas enfrentando con éxito los retos del sector logístico.</p></div>
<div><h2>Exclusividad</h2><p>Diseñamos cada operativa pensando únicamente en las necesidades de cada cliente.</p></div>
<div><h2>Calidad</h2><p>Equipos formados, vehículos adecuados y un compromiso total con la seguridad y el cumplimiento.</p></div></div></div></section>
<section class="sec"><div class="wrap two rev">${picture('nosotros-6.jpg', 'Equipo de Carlos Transportes Generales', 'rounded')}<div class="prose"><h2>¿Hablamos?</h2>
<p>En Carlos Transportes Generales creemos en el valor de las relaciones a largo plazo, construidas sobre la base del compromiso, la calidad y la confianza mutua. Para nosotros, cada cliente es un socio con el que trabajamos codo con codo para superar sus expectativas.</p>
<p>Si buscas una empresa de transporte que se implique de verdad, estamos listos para escucharte y ofrecerte una solución que se ajuste perfectamente a lo que necesitas.</p>
<p>No importa la complejidad o la urgencia del servicio. Contacta con nosotros y descubre cómo podemos ayudarte.</p><a class="btn" href="/contacto/">Contacto</a></div></div></section>`,
});

// Contacto
pages.push({
  path: '/contacto/', og: 'contacto.jpg', crumbs: [['Inicio', '/'], ['Contacto', '/contacto/']], keywords: 'contacto teléfono email dirección Hellín presupuesto',
  title: 'Contacto y presupuesto de transporte | Carlos Transportes Generales',
  desc: '¿Necesitas contactar una empresa de transporte? En Carlos Transportes Generales estamos disponibles para resolver tus dudas y solicitudes.',
  ld: [{ '@context': 'https://schema.org', '@type': 'ContactPage', url: SITE + '/contacto/', mainEntity: { '@id': SITE + '/#empresa' } }],
  body: `<section class="sec"><div class="wrap two"><div class="prose"><h1>¿Necesitas una solución de transporte? Ponte en contacto con nosotros</h1>
<p>En Carlos Transportes Generales te ofrecemos atención personalizada, respuestas claras y experiencia comprobada.</p><p>Si tienes dudas, necesitas un presupuesto o buscas una solución logística específica, estamos aquí para ayudarte.</p>
<ul class="contact-l"><li><a href="tel:${tel(C.t1)}">${C.t1}</a></li><li><a href="tel:${tel(C.t2)}">${C.t2}</a></li><li><a href="mailto:${C.m1}">${C.m1}</a></li><li><a href="mailto:${C.m2}">${C.m2}</a></li><li>${C.addr}</li></ul></div>${form('contacto')}</div></section>
<section class="sec alt"><div class="wrap"><div class="map" data-map="${C.map}"><button class="btn" type="button" data-map-load>Cargar mapa de Google</button><p>Al cargar el mapa aceptas las cookies de Google Maps. <a href="https://www.google.com/maps/search/?api=1&query=Calle+Doctor+Tabera+y+Araoz+21+Hellín" rel="noopener" target="_blank">Abrir en Google Maps</a></p></div></div></section>`,
});

// Únete
pages.push({
  path: '/unete-a-nuestro-equipo/', og: 'equipo.jpg', crumbs: [['Inicio', '/'], ['Únete a nuestro equipo', '/unete-a-nuestro-equipo/']], keywords: 'trabajo empleo conductor C+E CAP ADR tarjeta conductor',
  title: 'Trabaja con nosotros: empleo de conductor | Carlos Transportes Generales',
  desc: '¿Buscas trabajo en una empresa de transporte? En Carlos Transportes Generales te ofrecemos la oportunidad de crecer profesionalmente.',
  ld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Únete a nuestro equipo', url: SITE + '/unete-a-nuestro-equipo/' }],
  body: `<section class="sec"><div class="wrap two"><div class="prose"><h1>¿Te gustaría trabajar con nosotros?</h1>
<p>Si buscas trabajo en una empresa de transporte y quieres desarrollarte profesionalmente en el sector, en Carlos Transportes Generales te damos la oportunidad.</p>
<p>Buscamos personas comprometidas, con ganas de aprender y formar parte de un equipo que se toma en serio lo que hace. Desde el primer día, trabajarás con un compañero con experiencia que será tu apoyo y guía y te ayudará a conocer cómo trabajamos y qué valoramos y llegar a ser un profesional de confianza.</p>
<p>En Carlos Transportes Generales podrás recibir toda la formación complementaria que desees aumentando así tu cualificación personal al nivel que te propongas. Esto es posible gracias a la importancia que damos al departamento de recursos humanos que nos confiere como empresa un plus de estabilidad y calidad.</p>
<h2>Documentación a aportar</h2><ul class="check"><li>Permiso de conducir C+E</li><li>CAP</li><li>Tarjeta del conductor</li><li>DNI o NIE</li><li>ADR Básico</li><li>Currículum Vitae</li></ul>
<p>Si estás interesado, ponte en contacto con nuestra empresa a través del correo electrónico <a href="mailto:${C.m2}">${C.m2}</a>. O si lo prefieres, rellena el siguiente formulario:</p></div>${form('empleo', '', false)}</div></section>`,
});

// Legales (textos base: revisar con el cliente / asesor legal)
const legal = (path, title, h, body) => pages.push({ path, title: `${title} | ${NAME}`, desc: `${title} de ${NAME}.`, noindex: true, crumbs: [['Inicio', '/'], [title, path]], keywords: title, body: `<section class="sec"><div class="wrap narrow prose"><h1>${h}</h1>${body}</div></section>` });
legal('/aviso-legal/', 'Aviso legal', 'Aviso legal', `<p>En cumplimiento de la Ley 34/2002 (LSSI-CE) se informa de los datos del titular de este sitio web:</p><ul><li><b>Denominación:</b> ${NAME} [RAZÓN SOCIAL COMPLETA]</li><li><b>CIF:</b> [COMPLETAR]</li><li><b>Domicilio:</b> ${C.addr}</li><li><b>Correo:</b> <a href="mailto:${C.m1}">${C.m1}</a></li><li><b>Teléfono:</b> ${C.t1}</li><li><b>Inscripción registral:</b> [COMPLETAR]</li></ul><h2>Propiedad intelectual</h2><p>Los contenidos, textos, imágenes y diseño de esta web son propiedad del titular o de terceros que han autorizado su uso. Queda prohibida su reproducción sin autorización.</p><h2>Responsabilidad</h2><p>El titular no se hace responsable del uso indebido de la información publicada ni de los enlaces a sitios de terceros. Los precios de carburante mostrados proceden de datos abiertos del Ministerio para la Transición Ecológica y tienen carácter meramente informativo.</p>`);
legal('/politica-de-privacidad/', 'Política de privacidad', 'Política de privacidad', `<p><b>Responsable:</b> ${NAME} [RAZÓN SOCIAL, CIF]. ${C.addr}. <a href="mailto:${C.m1}">${C.m1}</a>.</p><p><b>Finalidad:</b> atender las consultas, solicitudes de presupuesto y candidaturas enviadas mediante los formularios de esta web.</p><p><b>Base jurídica:</b> consentimiento del interesado (art. 6.1.a RGPD) y aplicación de medidas precontractuales a petición suya.</p><p><b>Destinatarios:</b> no se cederán datos a terceros salvo obligación legal. Los mensajes se gestionan mediante proveedores de infraestructura (Cloudflare, servicio de envío de correo) que actúan como encargados del tratamiento.</p><p><b>Conservación:</b> durante el tiempo necesario para atender la solicitud y los plazos legales aplicables.</p><p><b>Derechos:</b> acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href="mailto:${C.m1}">${C.m1}</a>. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>`);
legal('/politica-de-cookies/', 'Política de cookies', 'Política de cookies', `<p>Esta web <b>no utiliza cookies de seguimiento ni publicitarias</b>. Solo se emplean recursos técnicos necesarios para su funcionamiento.</p><h2>Contenido de terceros</h2><p>El mapa de Google Maps de la página de contacto <b>solo se carga si pulsas «Cargar mapa»</b>. En ese momento Google puede instalar cookies propias, sujetas a su <a href="https://policies.google.com/technologies/cookies?hl=es" rel="noopener">política de cookies</a>. La protección anti-spam de los formularios (Cloudflare Turnstile) y las estadísticas (Cloudflare Web Analytics, sin cookies) no identifican personalmente al usuario.</p><h2>Cómo gestionarlas</h2><p>Puedes borrar o bloquear las cookies desde la configuración de tu navegador (Chrome, Firefox, Edge o Safari). Para dudas: <a href="mailto:${C.m1}">${C.m1}</a>.</p>`);

/* ───────── Salida ───────── */
rmSync('dist', { recursive: true, force: true });
cpSync('static', 'dist', { recursive: true });
const out = (f, c) => { mkdirSync(dirname(join('dist', f)), { recursive: true }); writeFileSync(join('dist', f), c); };
for (const p of pages) out(p.path === '/' ? 'index.html' : p.path.slice(1) + 'index.html', layout(p));

out('404.html', layout({ path: '/404/', title: `Página no encontrada | ${NAME}`, desc: 'La página que buscas no existe.', noindex: true, body: `<section class="sec"><div class="wrap narrow"><h1>No encontramos esa página</h1><p class="lead">Puede que el enlace haya cambiado. Prueba con el buscador o vuelve al inicio.</p><p><a class="btn" href="/">Volver al inicio</a> <button class="btn btn-line" data-search-open>Buscar</button></p></div></section>` }));

const idx = pages.filter((p) => !p.noindex).map((p) => ({ t: p.title.split(' | ')[0], u: p.path, d: p.desc, k: p.keywords || '' }));
out('assets/search.json', JSON.stringify(idx));
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${TODAY}</lastmod><changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${p.path === '/' ? '1.0' : p.path.split('/').length > 3 ? '0.8' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`);
out('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
out('site.webmanifest', JSON.stringify({ name: NAME, short_name: 'Carlos TG', lang: 'es', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#272e82', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }] }));
out('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#272e82"/><path d="M42 22a14 14 0 1 0 0 20" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><rect x="14" y="48" width="36" height="4" rx="2" fill="#e8710a"/></svg>`);
out('.well-known/security.txt', `Contact: mailto:${C.m1}\nExpires: 2027-12-31T00:00:00.000Z\nPreferred-Languages: es\nCanonical: ${SITE}/.well-known/security.txt\n`);
out('_headers', `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-src https://maps.google.com https://www.google.com https://challenges.cloudflare.com; connect-src 'self' https://cloudflareinsights.com; base-uri 'self'; form-action 'self'; object-src 'none'
/assets/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
/assets/img/*
  Cache-Control: public, max-age=2592000
`);
console.log(`✔ ${pages.length + 1} páginas generadas en dist/`);
