# Ecosistema Web – Grupo Automat (opciones de diseño)

Tres opciones visuales en **HTML, CSS y JS** para que el cliente elija la línea estética. Contenido de ejemplo con **Fluviomat** (celeste); la misma estructura sirve para Grupo Automat y el resto de empresas.

## Cómo ver las opciones

1. Abrí `index.html` en la raíz del proyecto en el navegador (doble clic o “Abrir con”).
2. Desde ahí entrá a cada opción:
   - **Opción 1 – ADM Design** → `opcion-1-adm/index.html`
   - **Opción 2 – Integrated Biosciences** → `opcion-2-integrated/index.html`
   - **Opción 3 – Nesma & Partners** → `opcion-3-nesma/index.html`

Si abrís directamente una carpeta `opcion-*`, las imágenes y el CSS base se cargan con rutas relativas (`../Logos/`, `../Fluviomat/Imagenes/`, `../OC/`, `../css/base.css`), así que conviene abrir siempre desde la **raíz** del proyecto (donde está este README y `index.html`).

## Estructura del proyecto

```
JULI/
├── index.html          ← Página de entrada (enlaces a las 3 opciones)
├── README.md
├── css/
│   └── base.css        ← Montserrat, variables, grilla, botón/card base
├── Logos/              ← Logos Grupo, Fluviomat, OCME, Construmat, Automat Saneamiento (.png y B.png)
├── Fluviomat/
│   ├── Imagenes/
│   └── Videos/
├── OC/                 ← Imágenes OCME
├── opcion-1-adm/
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── opcion-2-integrated/
│   ├── index.html
│   ├── styles.css
│   └── main.js
└── opcion-3-nesma/
    ├── index.html
    ├── styles.css
    └── main.js
```

## Resumen de cada opción

| Opción | Referencia | Estilo |
|--------|------------|--------|
| **1 – ADM** | [admdesign.com.sg](https://www.admdesign.com.sg/) | Corporativo, fondos claros, hero tipo “Transform a Space”, secciones Quiénes Somos, Valores (con números), Servicios numerados 01–04, cards de proyectos, Equipamiento en galería, footer estándar. |
| **2 – Integrated** | [integratedbiosciences.com](https://integratedbiosciences.com/) | Hero oscuro con titular grande, tipografía bold, secciones numeradas 01. / 02. / 03., bloques minimal, cards en sección clara, Equipamiento en grid de fotos, footer compacto. |
| **3 – Nesma** | [nesmapartners.com](https://www.nesmapartners.com/en) | Hero con líneas tipo “We Power / The Future”, “Somos Fluviomat”, bloque de cifras grandes (50+ años, 230+ proyectos, etc.), “Nuestro negocio” en 3 columnas, grid de Proyectos, Equipamiento, CTA y footer. |

En las tres se usa **Montserrat**, la misma escala tipográfica, grilla y espaciado del brief. El color de acento es celeste/azul para Fluviomat; para otras empresas solo hay que cambiar las variables `--accent` en cada `styles.css`.

## Tecnologías

- HTML5
- CSS3 (variables, Grid, Flexbox)
- JavaScript vanilla (scroll suave, header con scroll en opción 2)

Sin frameworks ni build. Podés servir la carpeta con cualquier servidor local (Live Server, `python -m http.server`, etc.) si querés evitar restricciones de `file://`.
# automat
