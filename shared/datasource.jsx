/* global React */
// ─────────────────────────────────────────────────────────────
// datasource — capa única de datos + configuración del dashboard.
// Cargar DESPUÉS de shared/data.jsx y shared/components.jsx, ANTES
// de los archivos v2/ y app.jsx.
//
// Responsabilidades:
//  · Role gating por URL (?admin=<token>)
//  · Semanas del Gantt calculadas dinámicamente desde new Date()
//  · Backlog de iniciativas (estados editables, persistidos local)
//  · Métricas del backlog (editables)
//  · Config de Google Sheet (lectura) + endpoint Apps Script Calendar
//  · Helpers: relative time del último sync, export CSV
// ─────────────────────────────────────────────────────────────

// ===== Role gating =======================================================
// Modelo del brief: NO es seguridad real, es un gate por URL param.
// Para rotar el token: cambiar ADMIN_TOKEN acá y avisar al equipo.
// La URL pública (la que ve Pablo) NO lleva ?admin → modo lectura.
const ADMIN_TOKEN = 'pp-credicorp-2026';

function readIsAdmin() {
  try {
    const qs = new URLSearchParams(window.location.search);
    return qs.get('admin') === ADMIN_TOKEN;
  } catch (e) {
    return false;
  }
}
const IS_ADMIN = readIsAdmin();

// URL pública limpia (sin ?admin) — usada por "Compartir con Pablo".
function publicUrl(hash) {
  const u = new URL(window.location.href);
  u.search = '';
  if (hash != null) u.hash = hash;
  return u.toString();
}

// ===== Gantt dinámico ====================================================
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function startOfWeek(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const day = x.getDay(); // 0 dom … 1 lun
  const diff = (day === 0 ? -6 : 1) - day; // mover a lunes
  x.setDate(x.getDate() + diff);
  return x;
}

// Devuelve { weeks:[{label,date,isCurrent}], currentIndex, totalWeeks }
// La semana 0 es SIEMPRE la semana en curso (índice 0 de los offsets
// que usa GANTT en shared/data.jsx). currentIndex = 0.
function computeGanttWeeks(total = 10) {
  const monday = startOfWeek(new Date());
  const weeks = [];
  for (let i = 0; i < total; i++) {
    const dt = new Date(monday);
    dt.setDate(monday.getDate() + i * 7);
    weeks.push({
      label: `${MONTHS_ES[dt.getMonth()]} ${dt.getDate()}`,
      date: dt,
      isCurrent: i === 0,
    });
  }
  return { weeks, currentIndex: 0, totalWeeks: total };
}

// Fecha (aprox) del milestone en la semana w → para marcar pasados.
function milestoneDate(weekOffset) {
  const monday = startOfWeek(new Date());
  const dt = new Date(monday);
  dt.setDate(monday.getDate() + weekOffset * 7 + 6); // fin de esa semana
  return dt;
}
function isMilestonePast(weekOffset) {
  return milestoneDate(weekOffset).getTime() < Date.now();
}

// ===== Sincronización (timestamp real) ===================================
// El brief pide "Sincronizado · hace Xmin" con el timestamp REAL del
// último fetch. En cliente estático sin live-fetch todavía configurado,
// el timestamp real es el momento en que cargó la data (page load).
const __DATA_LOADED_AT = Date.now();
function lastSyncLabel() {
  const mins = Math.max(0, Math.round((Date.now() - __DATA_LOADED_AT) / 60000));
  if (mins < 1) return 'recién';
  if (mins === 1) return 'hace 1 min';
  if (mins < 60) return `hace ${mins} min`;
  const h = Math.round(mins / 60);
  return h === 1 ? 'hace 1 h' : `hace ${h} h`;
}

// ===== Config Google Sheet + Calendar ====================================
// Acción de Mara (ver sheets/README_SETUP.md). Mientras estén vacíos, el
// dashboard usa el seed data del repo y lo marca honestamente.
const SHEETS_CONFIG = {
  SHEET_ID: '1vtB5WLMJLjMOIXaeze_OMZbXjva1rfhDHyZhvFPxxYo', // Master
  API_KEY: '', // ← pegar la API Key cuando exista (README_SETUP paso 3-4)
};
// URL del Web App de Apps Script (Calendar). Pegar cuando Mara lo publique.
const CALENDAR_ENDPOINT = ''; // ej: https://script.google.com/macros/s/XXX/exec

// Conteo de reuniones de la semana. Si el endpoint está configurado lo
// consulta; si no, devuelve el fallback del seed (dato real al 15/5).
const CALENDAR_FALLBACK = { count: 6, source: 'seed' };
function fetchCalendarCount() {
  if (!CALENDAR_ENDPOINT) return Promise.resolve(CALENDAR_FALLBACK);
  return fetch(CALENDAR_ENDPOINT)
    .then((r) => r.json())
    .then((d) => ({ count: d.count, events: d.events || [], source: 'calendar' }))
    .catch(() => CALENDAR_FALLBACK);
}

// ===== Backlog de iniciativas ============================================
// Estados: entregado | in_progress | parcial | planeo
// Estado real acordado 15/5 (los faltantes hasta 42 se completan desde
// la vista — editables en modo admin, persistidos en localStorage).
const INITIATIVE_STATES = {
  entregado:   { label: 'Entregado',    color: '#2BD6C8', ink: '#0F1419' },
  in_progress: { label: 'En curso',     color: '#1B2A4A', ink: '#FFFFFF' },
  parcial:     { label: 'Parcial',      color: '#F59E0B', ink: '#0F1419' },
  planeo:      { label: 'En plan',      color: '#94A3B8', ink: '#FFFFFF' },
};

const INITIATIVE_BLOCKS = [
  {
    id: 'b1',
    title: 'Talento y movilidad',
    frame: 'Movilidad internacional LATAM',
    items: [
      { id: 'b1-1', name: 'Creación Hub Brasil + benchmark', state: 'entregado' },
      { id: 'b1-2', name: 'Propuesta de valor competitiva', state: 'entregado' },
      { id: 'b1-3', name: 'Políticas de movilidad internacional', state: 'entregado' },
      { id: 'b1-4', name: 'Playbook de movilidad internacional', state: 'entregado' },
      { id: 'b1-5', name: 'Modelo de postventa', state: 'parcial', note: 'Plan armado, no implementado' },
      { id: 'b1-6', name: 'Conectar movilidad con desarrollo de carrera', state: 'parcial' },
      { id: 'b1-7', name: 'Pasar nómina Colombia/Chile de TRI a local', state: 'planeo' },
      { id: 'b1-8', name: 'Global Talent Cloud', state: 'planeo' },
      { id: 'b1-9', name: 'NextGen Mobility (TBD)', state: 'planeo' },
    ],
  },
  {
    id: 'b2',
    title: 'Productividad y desempeño',
    frame: 'Productividad y alto desempeño',
    items: [
      { id: 'b2-1', name: 'Alineamiento estratégico / cascadeo de objetivos', state: 'entregado', note: 'Fue el benchmark' },
      { id: 'b2-2', name: 'Bot establecimiento de objetivos (GiseGPT)', state: 'in_progress', note: 'Construido, bloqueado por IT' },
      { id: 'b2-3', name: 'Diagnóstico desempeño segmento colaborador', state: 'parcial' },
      { id: 'b2-4', name: 'Implementación modelo Krealo', state: 'parcial', note: 'Solo relevamiento de criterios' },
      { id: 'b2-5', name: 'Implementación modelo Yape', state: 'parcial', note: 'Solo relevamiento de criterios' },
      { id: 'b2-6', name: 'Ejecución estrategia segmento colaborador', state: 'planeo' },
      { id: 'b2-7', name: 'Nuevo modelo desempeño prestadoras de salud', state: 'planeo' },
      { id: 'b2-8', name: 'Optimización escalas', state: 'planeo' },
      { id: 'b2-9', name: 'Lineamientos T2B', state: 'planeo' },
      { id: 'b2-10', name: 'Gestión de consecuencias playbook', state: 'planeo' },
      { id: 'b2-11', name: 'Lead 360 TOPS', state: 'planeo' },
    ],
  },
  {
    id: 'b3',
    title: 'Referencia e innovación',
    frame: 'Productividad y alto desempeño',
    items: [
      { id: 'b3-1', name: 'Chat ILP GV', state: 'in_progress', note: 'Propuesta entregada, hold por IT' },
      { id: 'b3-2', name: 'Dashboard KPIs Mobility', state: 'in_progress', note: 'Modelos relevados en benchmarks' },
    ],
  },
  {
    id: 'b4',
    title: 'Gestión ejecutiva',
    frame: 'Arquitectura de onboarding ejecutivo',
    items: [
      { id: 'b4-1', name: 'Onboarding ejecutivo (Alicia)', state: 'in_progress', note: 'Dedicación full, entrevistas esta semana' },
      { id: 'b4-2', name: 'Agente IA Ejecutivo', state: 'in_progress', note: 'Propuesta realizada, hold por IT' },
    ],
  },
];

// Métricas editables — valores iniciales del brief (15/5).
const BACKLOG_METRICS_DEFAULT = [
  { id: 'pct',        label: '% del backlog abordado', value: '25%' },
  { id: 'realizadas', label: 'Iniciativas realizadas', value: '13' },
  { id: 'benchmarks', label: 'Benchmarks realizados', value: '12' },
  { id: 'extras',     label: 'Pedidos extra', value: '4' },
  { id: 'horas',      label: 'Horas trabajadas', value: '360' },
  { id: 'horas_bench',label: 'Horas de benchmarks', value: '80' },
];

// Empresas de research externo (benchmark). No hay assets de logo en el
// repo para estas → se renderizan como wordmarks monocromáticos.
const RESEARCH_COMPANIES = [
  'Philips', 'Mercado Libre', 'Accenture', 'Boehringer Ingelheim',
  'Nubank', 'Stone', 'C6 Bank', 'Naranja X / Acelera',
  'Banco Galicia', 'Human', 'Adidas', 'SulAmérica',
];

// Horas por frente — solo admin (brief).
const HOURS_BY_FRONT = [
  { front: 'HUB Brasil', hours: 140 },
  { front: 'Mobility', hours: 110 },
  { front: 'GiseGPT / Desempeño', hours: 65 },
  { front: 'Onboarding TOPS', hours: 35 },
];

// ===== Persistencia local del backlog ====================================
// El brief acepta localStorage como fallback (con nota visible) hasta
// que la escritura al Sheet esté resuelta.
const LS_KEY = 'pp_credicorp_backlog_v1';

function loadBacklogOverrides() {
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { states: {}, metrics: {} };
  } catch (e) {
    return { states: {}, metrics: {} };
  }
}
function saveBacklogOverrides(data) {
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

// ===== Decisiones agregadas localmente (Nueva decisión) ==================
const LS_DECISIONS = 'pp_credicorp_decisions_v1';
function loadLocalDecisions(projectId) {
  try {
    const raw = window.localStorage.getItem(LS_DECISIONS);
    const all = raw ? JSON.parse(raw) : {};
    return all[projectId] || [];
  } catch (e) {
    return [];
  }
}
function addLocalDecision(projectId, decision) {
  try {
    const raw = window.localStorage.getItem(LS_DECISIONS);
    const all = raw ? JSON.parse(raw) : {};
    all[projectId] = [{ ...decision, local: true }, ...(all[projectId] || [])];
    window.localStorage.setItem(LS_DECISIONS, JSON.stringify(all));
    return true;
  } catch (e) {
    return false;
  }
}

// ===== Export CSV ========================================================
function downloadCSV(filename, rows) {
  const esc = (v) => {
    const s = String(v == null ? '' : v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = rows.map((r) => r.map(esc).join(',')).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

Object.assign(window, {
  IS_ADMIN, ADMIN_TOKEN, publicUrl,
  computeGanttWeeks, isMilestonePast, lastSyncLabel,
  SHEETS_CONFIG, CALENDAR_ENDPOINT, fetchCalendarCount,
  INITIATIVE_STATES, INITIATIVE_BLOCKS, BACKLOG_METRICS_DEFAULT,
  RESEARCH_COMPANIES, HOURS_BY_FRONT,
  loadBacklogOverrides, saveBacklogOverrides,
  loadLocalDecisions, addLocalDecision,
  downloadCSV,
});
