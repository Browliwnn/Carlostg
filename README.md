# Carlos Transportes Generales – web (Cloudflare Workers)

Sitio estático generado con `build.mjs` (sin dependencias) + Worker de Cloudflare para `/api/fuel` (precio del carburante) y `/api/contact` (formularios).

## 1. Imágenes
Ya están incluidas en `static/assets/img` (tus fotos en dos tamaños, logo transparente y certificaciones). Para cambiar una foto, sustituye `nombre.jpg` y `nombre-800.jpg` (versión de 800 px) y actualiza `manifest.json` con su ancho y alto. Las tipografías (Bitter y DM Sans, licencia OFL) están en `static/assets/fonts`, sin depender de Google.

```bash
npm install
```

## 2. Probar en local
```bash
npm run dev           # http://localhost:8787
```

## 3. GitHub
```bash
git init && git add . && git commit -m "Web Carlos TG"
git branch -M main && git remote add origin git@github.com:TU-USUARIO/carlostg-web.git && git push -u origin main
```

## 4. Cloudflare (Workers Builds = despliegue automático con cada push)
1. Cloudflare → **Workers & Pages → Create → Import a repository** → elige el repo.
2. Build command: `npm run build` · Deploy command: `npx wrangler deploy`.
3. El dominio `carlostg.com` debe estar como zona en Cloudflare (cambiar nameservers en el registrador).
   `wrangler.jsonc` ya declara `www.carlostg.com` y `carlostg.com` como *Custom Domains*; se crean al desplegar.
4. **Redirección apex → www**: Rules → Redirect Rules → host `carlostg.com` → `https://www.carlostg.com${uri}` (301).
5. **Redirecciones SEO**: las URLs antiguas se mantienen idénticas (`/servicios/`, `/camiones-dedicados/`, …), no hay que redirigir nada.

## 5. Formularios (correo)
- Crea cuenta en **Resend** (resend.com), verifica el dominio `carlostg.com` y crea una API key.
- Worker → Settings → Variables and Secrets → añade el secreto `RESEND_API_KEY`.
- Ajusta `MAIL_FROM` / `MAIL_TO_*` en `wrangler.jsonc`.
- Anti-spam: crea un widget **Turnstile**; añade el secreto `TURNSTILE_SECRET` al Worker y la variable de *build* `TURNSTILE_SITEKEY` (Settings → Build → Variables).

## 6. Después de publicar
- Google Search Console: añadir propiedad `https://www.carlostg.com`, enviar `/sitemap.xml`.
- Cloudflare → Web Analytics (sin cookies, no requiere banner).
- Completar CIF/razón social en `/aviso-legal/` y `/politica-de-privacidad/` (marcados `[COMPLETAR]`) en `build.mjs`.
- Colores de marca: variables CSS al inicio de `static/assets/css/styles.css`.
