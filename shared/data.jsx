/* global React */
// Shared engagement data — single source for the 3 design directions.

const PROJECTS = [
  {
    id: 'hub-brasil',
    title: 'HUB Brasil / EVP',
    subtitle: 'Hub tecnológico São Paulo — 30→200 empleados',
    status: 'risk',
    statusLabel: 'En riesgo',
    intensity: 'alta intensidad',
    deadline: '1ra nómina junio 2026',
    daysToDeadline: 32,
    lastMeeting: '13 abr 2026',
    lastWith: 'LG',
    owner: 'LP',
    leads: ['LP', 'JF'],
    progress: 65,
    phase: 'Activo · alta intensidad',
    streams: 'BPO nómina · Change Mgmt · Ciberseguridad',
    tag: 'BENCHMARK',
    accent: 'pink',
    nextSteps: [
      'LG conecta con Yusara (BPO partners) — 2-3 recomendaciones',
      'Reunión Change Management con Pablo Silva',
      'Call con Auxadi 14 abr + seguimiento Stone, Koin, ADP',
      'Evaluar BPOs: implementación ≤40 días + ciberseguridad',
    ],
    risks: [
      'Ventana crítica: CNPJ fin abr → nómina junio = ~40 días',
      'LG solo provee software; BPO de nómina es contrato separado',
      'Aprobación requiere Finanzas + Ciberseguridad de Credicorp',
    ],
  },
  {
    id: 'alicia',
    title: 'Alicia — Ops/HR Tech',
    subtitle: 'Digitalización y automatización de procesos HR',
    status: 'active',
    statusLabel: 'En curso',
    intensity: 'media',
    lastMeeting: '9 abr 2026',
    lastWith: 'Pablo',
    owner: 'JF',
    leads: ['JF', 'MS'],
    progress: 45,
    priority: 'ILP + Onboarding',
    phase: 'En diagnóstico',
    streams: 'Agente ILP · Onboarding · HR Tech',
    tag: 'DIAGNÓSTICO',
    accent: 'teal',
    nextSteps: [
      'Arranque con Alicia — regresó el 13 abr',
      'P1: Abrir workstream agente ILP/LTI (300 TOPs, target Q1 2027)',
      'P2: Revisión de onboarding con Alicia post 13 abr',
    ],
    risks: [
      'Agente ILP requiere autorizaciones de seguridad',
      'Bono España descartado — solo 3 tops',
    ],
  },
  {
    id: 'romy',
    title: 'Romy — Movilidad',
    subtitle: 'Programa de movilidad internacional LATAM',
    status: 'delivery',
    statusLabel: 'Entregables listos',
    intensity: 'baja',
    lastMeeting: '9 abr 2026',
    owner: 'LP',
    leads: ['LP'],
    progress: 70,
    deliverables: 'Diagnóstico HTML + 2 playbooks',
    phase: 'Entregable pendiente',
    streams: 'Movilidad LATAM · Benchmarks · Playbooks',
    tag: 'ENTREGABLE',
    accent: 'teal',
    nextSteps: [
      'Presentar entregables a Romy y liderazgo',
      'Agente Movilidad en pausa hasta desbloqueo de GISE GPT',
      'Seguir presionando coordinación con equipo Talento',
    ],
    risks: [
      'Agente Movilidad bloqueado por IT (dependencia Copilot)',
      'Sin reuniones nuevas con Talento',
    ],
  },
  {
    id: 'desempeno',
    title: 'Desempeño',
    subtitle: 'Performance, feedback y OKRs',
    status: 'standby',
    statusLabel: 'Stand-by',
    lastActivity: 'dic 2025',
    owner: 'JM',
    leads: ['JM'],
    progress: 15,
    phase: 'Diagnóstico inicial',
    streams: 'Performance · OKRs · Compensación',
    tag: 'DORMIDO',
    accent: 'mute',
    nextSteps: [
      'Confirmar alcance con Credicorp — sin avances en 4+ meses',
      'Mapear proceso actual de evaluación',
      'Identificar conexión con compensación',
    ],
    risks: [
      'Sin reuniones desde dic 2025 — proyecto dormido',
    ],
  },
];

const TEAM_PARTNERS = [
  { initials: 'MS', name: 'Mara Schmitman', role: 'Coordinación · HR Strategy' },
  { initials: 'LP', name: 'Lucía Palomeque', role: 'Benchmark · EVP · Movilidad' },
  { initials: 'JF', name: 'Juan Fornaguera', role: 'Socio · HR Tech · Copilot' },
  { initials: 'SM', name: 'Sasan Maniei', role: 'Socio · Innovación · IA' },
  { initials: 'JM', name: 'Jorge Moreno', role: 'Socio · Estrategia · GRC' },
];

const TEAM_CREDICORP = [
  { initials: 'PS', name: 'Pablo Silva', role: 'Sponsor · Director HR' },
  { initials: 'RM', name: 'Romina Mitidieri', role: 'HR · Movilidad' },
  { initials: 'LG', name: 'Lucila Guelfo', role: 'Hub Brasil · Change Mgmt', isNew: true },
  { initials: 'GR', name: 'Gisselle Ripamonti', role: 'HR Tech · GiseGPT · Copilot' },
  { initials: 'CL', name: 'Cindy & Liz', role: 'Bienestar · Hub Brasil' },
  { initials: 'JG', name: 'José Gomer', role: 'Jefe de Tecnología · Copilot' },
  { initials: 'IT', name: 'Ysela / Antonio G.', role: 'IT — sin respuesta desde 5 mar', flag: true },
];

// Timeline events — last 2 weeks + upcoming 4
const TIMELINE = [
  { date: '9 abr',  label: 'Reunión Alicia + Pablo',        kind: 'meeting',   project: 'alicia' },
  { date: '9 abr',  label: 'Entrega diagnóstico Movilidad',  kind: 'deliverable', project: 'romy' },
  { date: '13 abr', label: 'Reunión LG · Hub Brasil',       kind: 'meeting',   project: 'hub-brasil' },
  { date: '14 abr', label: 'Call Auxadi (BPO)',             kind: 'meeting',   project: 'hub-brasil' },
  { date: '22 abr', label: 'Benchmark São Paulo · review',   kind: 'benchmark', project: 'hub-brasil' },
  { date: '28 abr', label: 'CNPJ Hub Brasil — deadline',    kind: 'deadline',  project: 'hub-brasil', critical: true },
  { date: '6 may',  label: 'Presentación Movilidad → Romy', kind: 'deliverable', project: 'romy' },
  { date: '14 may', label: 'Change Mgmt · Pablo Silva',     kind: 'meeting',   project: 'hub-brasil' },
  { date: '1 jun',  label: '1ra nómina Brasil',             kind: 'deadline',  project: 'hub-brasil', critical: true },
];

// Gantt rows — start week / end week (0-indexed from "this week")
const GANTT = [
  { id: 'hub-brasil', label: 'HUB Brasil / EVP', start: 0,  end: 7,  status: 'risk',     milestones: [{ w: 2, label: 'CNPJ' }, { w: 7, label: 'Nómina' }] },
  { id: 'alicia',     label: 'Alicia · Ops/HR Tech', start: 1, end: 9, status: 'active', milestones: [{ w: 4, label: 'ILP kickoff' }] },
  { id: 'romy',       label: 'Romy · Movilidad', start: 0, end: 4,    status: 'delivery', milestones: [{ w: 1, label: 'Entrega' }] },
  { id: 'desempeno',  label: 'Desempeño',     start: 5, end: 9,       status: 'standby',  milestones: [] },
];

const WEEKS = ['Abr 14', 'Abr 21', 'Abr 28', 'May 5', 'May 12', 'May 19', 'May 26', 'Jun 2', 'Jun 9', 'Jun 16'];

window.PROJECTS = PROJECTS;
window.TEAM_PARTNERS = TEAM_PARTNERS;
window.TEAM_CREDICORP = TEAM_CREDICORP;
window.TIMELINE = TIMELINE;
window.GANTT = GANTT;
window.WEEKS = WEEKS;
