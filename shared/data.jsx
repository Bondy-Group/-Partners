/* global React */
// Shared engagement data — single source for the 3 design directions.
// Actualizado al 16-sep-2026 (víspera/día del check-in con Pablo Silva · 12:00 ART).
// Fuentes: índices KB jul y ago-sep 2026, doc "Estado Credicorp — LIVE" (15/09), Sheet historial de reuniones.

const PROJECTS = [
  {
    id: 'desempeno',
    title: 'Desempeño / NineBox',
    subtitle: 'Modelo Qué × Cómo + Nine Box para ~900 mandos medios · Leadership Index',
    status: 'active',
    statusLabel: 'Frente principal',
    intensity: 'alta intensidad',
    deadline: 'Comité VAP/BAP · sep-26',
    lastMeeting: '14 sep 2026',
    lastWith: 'Santander',
    owner: 'MS',
    leads: ['MS', 'JF'],
    progress: 55,
    phase: 'Research + 4 benchmarks cerrados · metodología Fase 2 sin validar',
    streams: 'Nine Box · Qué vs Cómo · Benchmarks · Leadership Index · GiseGPT (bloq.)',
    tag: 'PRINCIPAL',
    accent: 'pink',
    nextSteps: [
      'Resúmenes escritos de los 4 benchs (Philips · Adidas · Visa · Santander) + cuadro comparativo — Vania pidió el de Visa el 14/09',
      'Validar con Vania el doc Fase2_Metodologia_NineBox (bloques A potencial · B calibración · C piloto · D 360/bono · E herramienta)',
      'Retomar workshop semanal con el equipo de Vania (vencido) y capacitación NineBox de 3 sesiones',
      'Cronograma cliente: sep aprobación Comité VAP/BAP → oct-nov capacitación → ene-feb 2027 lanzamiento NineBox',
      'Cola de benchs: Cargill · Red Hat · BBVA (Disney y PedidosYa sin respuesta)',
    ],
    risks: [
      'Definiciones internas del cliente (ago-26) vencidas; el comité de septiembre define si el calendario aguanta',
      'Credicorp corporativiza y pasa de 5 a 3 niveles (dicho en sala 14/09) — sin documento formal todavía',
      'GiseGPT / Copilot Studio sigue bloqueado por IT desde marzo: usar Visa + Santander como caso o proponer cierre',
    ],
  },
  {
    id: 'hub-brasil',
    title: 'HUB Brasil / EVP',
    subtitle: 'Formalización CLT del equipo Yape en São Paulo (Finnova) — lanzamiento oct/nov-2026',
    status: 'risk',
    statusLabel: 'En rojo',
    intensity: 'baja (cliente)',
    deadline: 'Lanzamiento pospuesto a oct/nov',
    lastMeeting: '1 sep 2026',
    lastWith: 'LG (1:1)',
    owner: 'LP',
    leads: ['LP', 'SM'],
    progress: 60,
    phase: 'Pospuesto · nómina TMF elegida · dependencia crítica de TI',
    streams: 'Nómina TMF · Legal/CNPJ · Cuenta bancaria · Change · Handbook',
    tag: 'EN ROJO',
    accent: 'pink',
    nextSteps: [
      'Sesión de documentación con Lucila (plan de continuidad) — pendiente de agendar; si sale, pedir reunión con Alicia',
      'Cuenta bancaria Finnova: Sasan tiene a Banco do Rendimento apalabrado (28/08), esperando respuesta de Lu',
      'Handbook: Lucila sigue sobre la versión de mayo; mail a Pablo del 14/08 sin respuesta',
      'Reencuadrar el frente con Pablo el 16/09: qué queda en manos de +Partners hasta el lanzamiento',
    ],
    risks: [
      'Posible salida de Lucila → riesgo de continuidad del frente',
      'TI sigue siendo el bloqueo crítico (matrículas, correos, accesos) y puede correr el lanzamiento un mes más',
      'Status del 24/08 sin grabación · sin reunión con el cliente desde el 1/09',
    ],
  },
  {
    id: 'alicia',
    title: 'Alicia — Onboarding TOP / Tu Recibo',
    subtitle: 'Onboarding ejecutivo estandarizado (Capa 1 corporativa) · forms en piloto · Tu Recibo (Mandú)',
    status: 'risk',
    statusLabel: 'Sin respuesta',
    intensity: 'baja (cliente)',
    lastMeeting: '3 sep 2026',
    lastWith: 'Mandú (capacitación)',
    owner: 'JF',
    leads: ['JF', 'MS'],
    progress: 70,
    priority: 'Status con Alicia, César y Gaby',
    phase: 'Forms listo en pruebas · árbol documental avanzado · status sin fecha',
    streams: 'Onboarding TOP · Forms · Árbol documental · Tu Recibo · HCM',
    tag: 'EN ROJO',
    accent: 'teal',
    nextSteps: [
      'Llamada de status con Alicia, César y Gaby — pedida por Juan el 3/09, sin fecha al 15/09',
      'Tu Recibo: revisar licencia (USD 400 + IGV · 400 usuarios) y respaldo legal de firma electrónica MINTRA recibidos el 24/08',
      'Backtesting del forms con novedades de 2 meses → piloto con 3-4 TOPs / key users',
      'Validar documentación Capa 2 por empresa vía mail/encuesta',
    ],
    risks: [
      'El grupo no toma decisiones: Alicia delegó; César y Gabriela se pisan',
      'Lo que se construya debe ser migrable al HCM (Oracle/PeopleSoft, estimado 2027 Q3)',
    ],
  },
  {
    id: 'romy',
    title: 'Romy — Mobility 360',
    subtitle: 'Programa de movilidad internacional LATAM · entregables listos',
    status: 'standby',
    statusLabel: 'Dormido desde mayo',
    intensity: 'nula',
    lastMeeting: '21 may 2026',
    lastWith: 'RM',
    owner: 'LP',
    leads: ['LP'],
    progress: 90,
    deliverables: 'Diagnóstico + 2 manuales + criterios v2 + business case',
    phase: 'Sin actividad del cliente desde mayo · propuesta de reencuadre',
    streams: 'Movilidad LATAM · Playbooks · Mobile Talent Pool',
    tag: 'DORMIDO',
    accent: 'teal',
    nextSteps: [
      'Propuesta para el 16/09: absorber Movilidad dentro del diseño NineBox (Visa, Adidas y Santander conectan desempeño/potencial con movilidad)',
      'Mobile Talent Pool sigue esperando el OK de Ross para el contacto con Talent Development',
      'Los benchmarks de movilidad (8 referencias) alimentan la Biblioteca de Benchmarks',
    ],
    risks: [
      'Sin señal del cliente en 4 meses: sostenerlo como frente independiente no se justifica',
      'Agente Movilidad depende de Copilot (IT) — mismo bloqueo que GiseGPT',
    ],
  },
];

const TEAM_PARTNERS = [
  { initials: 'MS', name: 'Mara Schmitman', role: 'Coordinación · Desempeño/NineBox · Change' },
  { initials: 'LP', name: 'Lucía Palomeque', role: 'Hub Brasil · Nómina · Movilidad' },
  { initials: 'JF', name: 'Juan Fornaguera', role: 'Socio · Onboarding TOP · HR Tech' },
  { initials: 'SM', name: 'Sasan Maniei', role: 'Socio · Innovación · IA · Biblioteca de Benchmarks' },
  { initials: 'JM', name: 'Jorge Moreno', role: 'Socio · Estrategia · relación con Pablo' },
];

const TEAM_CREDICORP = [
  { initials: 'PS', name: 'Pablo Silva', role: 'Sponsor · check-in 16-sep' },
  { initials: 'VG', name: 'Vania Guerrero', role: 'Desempeño Corporativo (BCP) · NineBox' },
  { initials: 'GR', name: 'Gisselle Ripamonti', role: 'Performance · Leadership Index' },
  { initials: 'LG', name: 'Lucila Guelfo', role: 'Hub Brasil · posible salida' },
  { initials: 'AR', name: 'Alicia Rivera', role: 'Onboarding TOP · César Chung y Gabriela Aguilar (BCP)' },
  { initials: 'RM', name: 'Romina Mitidieri', role: 'Global Mobility (sin actividad desde mayo)' },
  { initials: 'IT', name: 'Ysela / Antonio G.', role: 'IT — sin respuesta desde marzo', flag: true },
];

// Timeline events — últimas semanas + próximos hitos (al 16-sep)
const TIMELINE = [
  { date: '26 ago', label: 'Bench desempeño · Philips',              kind: 'benchmark',   project: 'desempeno' },
  { date: '27 ago', label: 'Programa IA para líderes enviado a Pablo', kind: 'deliverable', project: 'desempeno' },
  { date: '3 sep',  label: 'Tu Recibo · capacitación (Mandú)',        kind: 'meeting',     project: 'alicia' },
  { date: '4 sep',  label: 'Bench desempeño · Adidas',               kind: 'benchmark',   project: 'desempeno' },
  { date: '10 sep', label: 'Bench desempeño · Visa',                 kind: 'benchmark',   project: 'desempeno' },
  { date: '14 sep', label: 'Bench desempeño · Santander',            kind: 'benchmark',   project: 'desempeno' },
  { date: '15 sep', label: 'Biblioteca de Benchmarks (v1)',          kind: 'deliverable', project: 'desempeno' },
  { date: '16 sep', label: 'Check-in con Pablo · 12:00',             kind: 'meeting',     project: 'desempeno', critical: true },
  { date: 'sep',    label: 'Comité VAP/BAP · aprobación NineBox',    kind: 'deadline',    project: 'desempeno', critical: true },
  { date: 'oct/nov', label: 'Lanzamiento Hub Brasil (pospuesto)',    kind: 'deadline',    project: 'hub-brasil' },
];

// Gantt rows — start week / end week (0-indexed from "this week")
const GANTT = [
  { id: 'desempeno',  label: 'Desempeño / NineBox', start: 0, end: 9, status: 'active',  milestones: [{ w: 0, label: 'Pablo' }, { w: 2, label: 'Comité' }, { w: 6, label: 'Capacitación' }] },
  { id: 'hub-brasil', label: 'HUB Brasil / EVP',    start: 0, end: 9, status: 'risk',    milestones: [{ w: 3, label: 'Lanzamiento?' }] },
  { id: 'alicia',     label: 'Alicia · Onboarding TOP', start: 0, end: 9, status: 'risk', milestones: [{ w: 1, label: 'Status' }] },
  { id: 'romy',       label: 'Romy · Mobility 360', start: 0, end: 9, status: 'standby', milestones: [] },
];

const WEEKS = ['Sep 14', 'Sep 21', 'Sep 28', 'Oct 5', 'Oct 12', 'Oct 19', 'Oct 26', 'Nov 2', 'Nov 9', 'Nov 16'];

window.PROJECTS = PROJECTS;
window.TEAM_PARTNERS = TEAM_PARTNERS;
window.TEAM_CREDICORP = TEAM_CREDICORP;
window.TIMELINE = TIMELINE;
window.GANTT = GANTT;
window.WEEKS = WEEKS;
