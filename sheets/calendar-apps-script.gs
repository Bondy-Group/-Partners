/**
 * +Partners × Credicorp — Calendar bridge
 * ---------------------------------------------------------------
 * Cliente estático no puede hacer OAuth de Google en el browser.
 * Este Apps Script corre como Web App con la cuenta de Mara
 * (mara@maspartners.com.ar) y devuelve el conteo de reuniones
 * "Credicorp" de la semana en curso como JSON.
 *
 * SETUP (acción de Mara, una sola vez):
 *  1. Ir a https://script.google.com  →  Nuevo proyecto
 *  2. Pegar TODO este archivo, guardar (nombre: "Credicorp Calendar")
 *  3. Implementar → Nueva implementación → Tipo: Aplicación web
 *       - Ejecutar como:  Yo (mara@maspartners.com.ar)
 *       - Quién tiene acceso:  Cualquier persona
 *  4. Autorizar permisos de Calendar cuando lo pida
 *  5. Copiar la URL  https://script.google.com/macros/s/XXXX/exec
 *  6. Pegarla en shared/datasource.jsx → const CALENDAR_ENDPOINT = '...'
 *
 * Probar: abrir la URL en el browser → debe devolver JSON
 *   { "count": 5, "events": [ { "title": "...", "start": "..." } ] }
 */

// Palabra clave para filtrar eventos del engagement.
var MATCH = 'credicorp';

function doGet() {
  var out;
  try {
    out = buildPayload();
  } catch (err) {
    out = { count: 0, events: [], error: String(err) };
  }
  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildPayload() {
  var now = new Date();

  // Lunes 00:00 de la semana en curso
  var day = now.getDay();                 // 0 dom … 6 sáb
  var diffToMonday = (day === 0 ? -6 : 1) - day;
  var start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + diffToMonday);

  // Domingo 23:59 de la misma semana
  var end = new Date(start);
  end.setDate(start.getDate() + 7);

  var cal = CalendarApp.getDefaultCalendar();
  var events = cal.getEvents(start, end);

  var matched = events
    .filter(function (e) {
      var hay = ((e.getTitle() || '') + ' ' + (e.getDescription() || '')).toLowerCase();
      return hay.indexOf(MATCH) !== -1;
    })
    .map(function (e) {
      return {
        title: e.getTitle(),
        start: e.getStartTime().toISOString(),
        end: e.getEndTime().toISOString()
      };
    });

  return { count: matched.length, events: matched, week_start: start.toISOString() };
}
