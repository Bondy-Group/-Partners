# Setup Google Sheets → Dashboard Credicorp

## Paso 1 — Crear el Sheet

1. Abrí https://sheets.google.com y creá un nuevo spreadsheet
2. Renombralo: **+Partners — Credicorp Master**
3. Creá estas 5 pestañas (sheets) con exactamente estos nombres:
   - `proyectos`
   - `reuniones`
   - `tareas`
   - `documentos`
   - `reuniones_futuras`

## Paso 2 — Compartir el Sheet

1. Click en "Compartir" (arriba a la derecha)
2. En "Acceso general" → seleccioná **"Cualquier persona con el enlace"** → **Lector**
3. Copiá el **Sheet ID** de la URL:
   `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`

## Paso 3 — API Key de Google

Pedile a tu admin de Google Workspace:
1. Ir a https://console.cloud.google.com
2. Crear proyecto o usar uno existente
3. Habilitar **Google Sheets API** y **Google Drive API**
4. Ir a "Credenciales" → "Crear credencial" → **Clave de API**
5. (Recomendado) Restringir la clave a "Google Sheets API" y al dominio de GitHub Pages
6. Pasarte la API Key

## Paso 4 — Configurar el dashboard

En el HTML del dashboard, reemplazá estas dos líneas en el bloque CONFIG:
```js
const SHEET_ID = 'TU_SHEET_ID_AQUI';
const API_KEY  = 'TU_API_KEY_AQUI';
```

## Paso 5 — Importar los datos base

Importá cada CSV de esta carpeta a su pestaña correspondiente:
- `proyectos.csv` → pestaña `proyectos`
- `reuniones.csv` → pestaña `reuniones`  
- `tareas.csv` → pestaña `tareas`
- `documentos.csv` → pestaña `documentos`
- `reuniones_futuras.csv` → pestaña `reuniones_futuras`

Para importar: Archivo → Importar → Subir → seleccioná el CSV → "Insertar en hoja actual"
