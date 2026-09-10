# Lista de verificación de publicación — portfolio-web

Documento operativo para el momento de publicar. Reglas del cambio
`portfolio-web` (propuesta, diseño y especificaciones del 2026-09-10).

## Comandos de verificación (en orden)

```bash
npm run build          # astro build + escaneo de privacidad (falla con datos prohibidos)
npm run check:publish  # escaneo de privacidad + marcadores TODO-URL (bloquea si quedan)
```

`npm run build` solo es apto para desarrollo. **Publicar exige `npm run check:publish`
en verde** sobre la construcción vigente (`dist/`).

## URLs confirmadas (procedencia)

Confirmadas por la propietaria del sitio el **2026-09-10**; son las únicas URLs
de perfil publicables:

| Canal | URL |
|---|---|
| Correo institucional (único canal de contacto) | `mailto:aroperol@unal.edu.co` |
| GitHub | `https://github.com/andrearopero` |
| LinkedIn | `https://www.linkedin.com/in/andrea-ropero-lozano-a9a823207/` |

Cualquier enlace nuevo debe confirmarse con la propietaria **antes** de
publicarse. Un enlace sin confirmar se deja como marcador `TODO-URL-<NOMBRE>`
en el código fuente — nunca se inventa ni se adivina una URL.

## Reglas de privacidad (bloqueantes)

- Nunca publicar el teléfono, el bloque de referencias (docente, teléfono y
  correo) ni el correo personal. El escaneo de privacidad bloquea la
  publicación si aparecen en `dist/`.
- El CV (`HDV_AndreaRopero.pdf`) no se publica ni se enlaza: contiene teléfono
  y referencias. No existe ningún control de descarga en el sitio.
- La Maestría se publica exactamente como "Maestría en Automatización
  Industrial — En curso", sin institución ni fechas. El esquema de contenido
  rechaza la construcción con esos datos.
- Canal de contacto único: el correo institucional. Sin teléfono, sin
  dirección postal, sin correo personal.

## Política de marcadores de contenido

- `TODO-URL-*` en el código fuente bloquea `npm run check:publish` hasta
  resolverse. Es la señal de "enlace pendiente de confirmar".
- Agregar un proyecto o una entrada de formación = un archivo `.md` nuevo en
  `src/content/projects/` o `src/content/education/`, sin editar componentes.

## Verificación manual antes de publicar

- [ ] 320 px: sin desbordamiento horizontal, secciones legibles, objetivos táctiles activos
- [ ] Conmutador de tema: cambia claro/oscuro y persiste tras recargar
- [ ] `prefers-reduced-motion`: sin animaciones, todo el contenido visible
- [ ] Sin JavaScript: todo el contenido visible (sin estados ocultos)
- [ ] Navegación por anclas funcional en los seis enlaces del pie
- [ ] Contraste AA (≥ 4.5:1) en ambos temas (ver valores finales en `src/styles/global.css`)
