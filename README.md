# +Partners × Credicorp — Dashboard

Dashboard de seguimiento del engagement +Partners × Credicorp.

- **Live:** https://bondy-group.github.io/-Partners/
- **Stack:** GitHub Pages estático · React + Babel standalone (sin build) · fetch client-side
- **Datos:** Google Sheet público (lector) + API Key · Calendar vía Apps Script Web App
- **Roles:** gating por URL param `?admin=<token>` — no es login real

## Pantallas

- **Resumen** (`#/`) — info strip de la semana en curso (dinámica), stat cards, Gantt dinámico de 10 semanas, tabla de frentes, equipo.
- **Iniciativas** (`#/iniciativas`) — backlog de Credicorp por bloques, métricas editables, distribución, research externo. Visible para Pablo (solo lectura); edición detrás de admin.
- **Detalle de frente** (`#/frente/<id>`) — `hub-brasil` · `alicia` · `romy` · `desempeno`. Botón "Compartir con Pablo" (genera URL pública limpia) y "Nueva decisión".

## Control de acceso

| | Admin (`?admin=<token>`) | Vista Pablo (URL pública) |
|---|---|---|
| Editar estados/métricas de iniciativas | sí | no (solo lectura) |
| Flag "SIN RESPUESTA" en equipo | sí | no |
| Horas por frente | sí | no |
| Panel admin (ingesta) | sí | no |
| Todo el resto | sí | sí |

**Rotar el token admin:** editar `ADMIN_TOKEN` en `shared/datasource.jsx`, commitear, push a `main`. La URL que se le pasa a Pablo NO debe llevar `?admin`. El botón "Compartir con Pablo" ya genera la URL limpia automáticamente.

## Conectar el Google Sheet (acción de Mara)

Seguir `sheets/README_SETUP.md`. Cuando tengas la API Key, pegarla en `shared/datasource.jsx`:

```js
const SHEETS_CONFIG = {
  SHEET_ID: '1vtB5WLMJLjMOIXaeze_OMZbXjva1rfhDHyZhvFPxxYo',
  API_KEY: 'AIza...'   // pegar aca
};
```

Mientras `API_KEY` esté vacío, el dashboard usa el seed data del repo y lo indica honestamente (no inventa números).

## Conectar el Calendar (acción de Mara)

El conteo "reuniones esta semana" sale de un Apps Script. Setup completo en el header de `sheets/calendar-apps-script.gs`. Resumen: crear el script en script.google.com, publicarlo como Web App, pegar la URL en `shared/datasource.jsx` → `const CALENDAR_ENDPOINT = '...'`. Sin endpoint, usa el fallback del seed.

## Agregar / editar iniciativas del backlog

El backlog vive en `shared/datasource.jsx` → `INITIATIVE_BLOCKS`. Cada item:

```js
{ id: 'b1-10', name: 'Nombre de la iniciativa', state: 'planeo', note: 'opcional' }
```

Estados válidos: `entregado` · `in_progress` · `parcial` · `planeo`.

Los cambios de estado/métricas hechos desde la UI (modo admin) se guardan en `localStorage` de ese navegador (con aviso visible) hasta que se resuelva la escritura al Sheet. Para que un cambio sea permanente y lo vean todos, editar `INITIATIVE_BLOCKS` / `BACKLOG_METRICS_DEFAULT` en el código y pushear.

## Deploy

GitHub Pages sirve desde `main`. Push a `main` → live en ~1 min. No hay build step.

---
*Uso interno — +Partners*
