# Reentry - Control de Flota

App web para administrar renta diaria de vehiculos, ingresos, gastos, deudas, conductores, documentacion y reportes usando Google Sheets como base de datos.

## Abrir localmente

Abre `index.html` en el navegador o sirve la carpeta con cualquier servidor local.

## Conectar Google Sheets como backend

1. Abre el libro de Google Sheets.
2. Ve a `Extensiones > Apps Script`.
3. Pega el contenido de `apps-script/Code.gs`.
4. Pulsa `Implementar > Nueva implementacion`.
5. Tipo: `Aplicacion web`.
6. Ejecutar como: `Yo`.
7. Quien tiene acceso: `Cualquier usuario con el enlace`.
8. Copia la URL de la aplicacion web.
9. Si cambia la URL, actualiza `DEFAULT_API_ENDPOINT` en `index.html`.

La app lee y escribe por medio de Apps Script en estas hojas del libro: `Configuracion`, `Vehiculos`, `Conductores`, `Ingresos`, `Gastos`, `Deudas`, `Abonos` y `Documentos`.

## Publicar demo en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a https://vercel.com y crea un proyecto nuevo.
3. Importa el repositorio.
4. Framework preset: `Other`.
5. Build command: dejar vacio.
6. Output directory: dejar vacio.
7. Deploy.

## Nota

La URL actual de Apps Script queda fija en `index.html`, por eso la app publicada en Vercel no depende de la configuracion local del navegador.
