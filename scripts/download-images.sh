#!/usr/bin/env bash
# Descarga las imágenes de la web actual a static/assets/img (ejecutar ANTES de apagar el WordPress).
set -e
B="https://www.carlostg.com/wp-content/uploads"; D="$(dirname "$0")/../static/assets/img"; mkdir -p "$D"
get(){ echo "→ $2"; curl -fsSL "$B/$1" -o "$D/$2" || echo "  ⚠ no se pudo descargar $1"; }
echo "Las imágenes ya están incluidas en static/assets/img. No hace falta descargar nada."
#get 2025/02/LOGO-CARLOS.png logo.png
#get 2025/06/IMG_9995-1-scaled-e1750783399113.jpg hero.jpg
#get 2025/06/IMG_2399-1024x768.jpg dedicados.jpg
#get 2025/07/ADR.jpeg adr.jpeg
#get 2025/06/IMG_9995-scaled-e1765797136328-1024x900.jpg multimodal.jpg
#get "2025/12/Captura-de-pantalla-2025-12-15-a-las-12.11.35-e1765797161613-1024x922.png" multimodal-2.png
#get 2026/01/WhatsApp-Image-2026-01-28-at-19.16.40-1024x772.jpeg gv-1.jpeg
#get 2026/01/WhatsApp-Image-2026-01-30-at-14.31.00-e1769787110370-1024x762.jpeg gv-2.jpeg
#get 2025/06/IMG_1674-1024x768.jpg gv-3.jpg
#get 2025/07/carga-e1769787191632-1024x776.jpeg gv-4.jpeg
for n in 1 2 3 4; do get "2025/07/Mesa-de-trabajo-1_${n}-80-768x569.jpg" "nosotros-$n.jpg"; done
#get 2025/07/Mesa-de-trabajo-1-80-768x569.jpg nosotros-5.jpg
#get 2025/07/Mesa-de-trabajo-1_5-80-867x1024.jpg nosotros-6.jpg
#get 2026/08/Carlos-TG-Medio-Ambiente-1024x1024.jpeg medio-ambiente.jpg
#get 2025/02/Credito-y-caucion.jpg cert-credito.jpg
#get 2025/02/IFS_Logistics_small-1280x7201-1.jpg cert-ifs.jpg
#get 2025/02/TuV-scaled.jpg cert-tuv.jpg
#get 2025/06/IMG_6575-1-scaled-e1750869354476.jpg contacto.jpg
#get 2025/06/LIMSE8292-e1750926154688.jpg equipo.jpg
echo "Listo. Recomendado: pasar las fotos a WebP/AVIF (squoosh.app) y revisar el peso (<200 KB cada una)."
