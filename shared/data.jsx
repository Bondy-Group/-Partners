/* global React */
// Shared engagement data — single source for the 3 design directions.
// Actualizado al 2-jul-2026 (reunión de status con Pablo Silva).

const PROJECTS = [
  {
    id: 'hub-brasil',
    title: 'HUB Brasil / EVP',
    subtitle: 'Creación operativa del Hub São Paulo — Go-Live 1-oct-2026',
    status: 'active',
    statusLabel: 'Fase final',
    intensity: 'alta intensidad',
    deadline: 'Go-Live 1-oct (hito temprano ~1-ago)',
    daysToDeadline: 91,
    lastMeeting: '24 jun 2026',
    lastWith: 'LG',
    owner: 'LP',
    leads: ['LP', 'JF'],
    progress: 52,
    phase: 'Fase final · 95 actividades (19 ✓ · 46 en curso · 30 pend.)',
    streams: 'Nómina · Legal/CNPJ · SST · Change Mgmt · Beneficios',
    tag: 'FASE FINAL',
    accent: 'pink',
    nextSteps: [
      'Decisión de nómina Auxadi vs TMF en ≤2 semanas — protege el testing de julio. TMF con KYC firmado (30-jun); validación jurisdicción Madrid (Auxadi) con Legal en curso',
      'SST: pedir propuestas a los 3 verificados (Care Plus, Grupo Mednet, SESI) — shortlist + guía de screening entregadas el 1-jul',
      'CNPJ activándose en días → habilita cuenta bancaria, contratos CLT y registros',
      'Change: comunicación adelantada + 1:1 TOPS, handbook "qué cambia / qué no" y journey del colaborador',
      'Cerrar plan médico Bradesco (beneficios) — mismo plan para todos',
    ],
    risks: [
      '5 stoppers activos, todos con mitigación (CNPJ, cuenta banco, gobierno, pago nómina, SIGA)',
      'Auxadi: jurisdicción Madrid = riesgo legal a validar; TMF 2,4x más caro pero ISO 27001 y foro Brasil',
      'Exámenes admissionais (SST) deben estar listos ANTES del Go-Live — ruta crítica',
    ],
  },
  {
    id: 'alicia',
    title: 'Alicia — Onboarding TOPS',
    subtitle: 'Onboarding ejecutivo · bench externo + forms · 5 empresas del grupo',
    status: 'active',
    statusLabel: 'En ejecución',
    intensity: 'media',
    lastMeeting: '24 jun 2026',
    lastWith: 'Santander',
    owner: 'JF',
    leads: ['JF', 'MS'],
    progress: 60,
    priority: 'Forms + journey de onboarding',
    phase: 'En ejecución · bench externo cerrado',
    streams: 'Onboarding ejecutivo · Bench externo · HR Tech',
    tag: 'EN EJECUCIÓN',
    accent: 'teal',
    nextSteps: [
      'Forms destrabado: sesión de armado conjunto con Alicia — semana del 6-jul (documentos guía ya en Drive)',
      'Consolidar aprendizajes del bench externo: Nubank (3-jun), Banco Galicia (18-jun), Santander (24-jun)',
      'Follow-up con People Ops de Banco Galicia',
    ],
    risks: [
      'Chat ILP GV (target Q1 2027) depende del desbloqueo de IT / Copilot 365',
    ],
  },
  {
    id: 'romy',
    title: 'Romy — Mobility 360',
    subtitle: 'Programa de movilidad internacional LATAM',
    status: 'standby',
    statusLabel: 'Standby acordado',
    intensity: 'baja',
    lastMeeting: '21 may 2026',
    owner: 'LP',
    leads: ['LP'],
    progress: 90,
    deliverables: 'Diagnóstico + 2 manuales (interno + empleado)',
    phase: 'Entregables listos · standby a pedido de Romy',
    streams: 'Movilidad LATAM · Playbooks · Mobility Experience',
    tag: 'STANDBY',
    accent: 'teal',
    nextSteps: [
      'Retomar desarrollo final del playbook cuando Romy lo pida',
      'Despliegue Mobility Experience + capacitaciones — target 26-sep',
      'Soporte puntual al frente desde el equipo',
    ],
    risks: [
      'Agente Movilidad sigue bloqueado por IT (dependencia Copilot)',
    ],
  },
  {
    id: 'desempeno',
    title: 'Desempeño / GiseGPT',
    subtitle: 'GiseGPT + Copilot Studio (GCG GPT) · Performance y OKRs',
    status: 'blocked',
    statusLabel: 'Bloqueado por IT',
    lastActivity: 'escalado 9 abr 2026',
    owner: 'JF',
    leads: ['JF', 'SM'],
    progress: 80,
    phase: 'Construido y validado · espera aprobación IT',
    streams: 'GiseGPT · Copilot 365 · Performance',
    tag: 'BLOQUEADO',
    accent: 'mute',
    nextSteps: [
      'Necesita empuje de Pablo: IT (Ysela Santana / Antonio García) sin respuesta desde marzo pese a 3 mails de seguimiento',
      'Al destrabarse: deploy inmediato — un mes de trabajo terminado espera esa conversación',
      'La aprobación de IT desbloquea las iniciativas 24, 28, 37, 38, 39 y 40 del backlog',
    ],
    risks: [
      'IT sin respuesta desde marzo — escalado el 9-abr sin resultado',
    ],
  },
];

const TEAM_PARTNERS = [
  { initials: 'MS', name: 'Mara Schmitman', role: 'Coordinación · HR Strategy · Change' },
  { initials: 'LP', name: 'Lucía Palomeque', role: 'Hub Brasil · Nómina · Movilidad' },
  { initials: 'JF', name: 'Juan Fornaguera', role: 'Socio · HR Tech · GiseGPT' },
  { initials: 'SM', name: 'Sasan Maniei', role: 'Socio · Innovación · IA · Change' },
  { initials: 'JM', name: 'Jorge Moreno', role: 'Socio · Estrategia · GRC' },
];

const TEAM_CREDICORP = [
  { initials: 'PS', name: 'Pablo Silva', role: 'Sponsor · Beneficios y Compensaciones' },
  { initials: 'LG', name: 'Lucila Guelfo', role: 'Hub Brasil · Legal, Compliance, SST, Gobierno' },
  { initials: 'AR', name: 'Alicia Rivera', role: 'Onboarding TOPS · Nómina y procesos Hub' },
  { initials: 'GR', name: 'Gisselle Ripamonti', role: 'Performance · GiseGPT' },
  { initials: 'RM', name: 'Romina Mitidieri', role: 'Global Mobility (standby)' },
  { initials: 'IT', name: 'Ysela / Antonio G.', role: 'IT — sin respuesta desde marzo', flag: true },
];

// Timeline events — últimas semanas + próximos hitos (al 2-jul)
const TIMELINE = [
  { date: '18 jun', label: 'Bench onboarding · Banco Galicia',  kind: 'benchmark',   project: 'alicia' },
  { date: '22 jun', label: 'Plan de Change con Pablo y LG',     kind: 'meeting',     project: 'hub-brasil' },
  { date: '24 jun', label: 'Bench onboarding · Santander',      kind: 'benchmark',   project: 'alicia' },
  { date: '30 jun', label: 'KYC TMF firmado — nómina',          kind: 'deliverable', project: 'hub-brasil' },
  { date: '1 jul',  label: 'Shortlist SST + guía de screening', kind: 'deliverable', project: 'hub-brasil' },
  { date: '2 jul',  label: 'Status de proyectos con Pablo',     kind: 'meeting',     project: 'hub-brasil' },
  { date: 'sem 6 jul', label: 'Sesión forms con Alicia',        kind: 'meeting',     project: 'alicia' },
  { date: '~15 jul', label: 'Decisión nómina Auxadi vs TMF',    kind: 'deadline',    project: 'hub-brasil', critical: true },
  { date: '~1 ago', label: 'Go-Live · hito temprano',           kind: 'deadline',    project: 'hub-brasil' },
  { date: '1 oct',  label: 'GO-LIVE Hub Brasil',                kind: 'deadline',    project: 'hub-brasil', critical: true },
];

// Gantt rows — start week / end week (0-indexed from "this week")
const GANTT = [
  { id: 'hub-brasil', label: 'HUB Brasil / EVP', start: 0,  end: 9,  status: 'active',  milestones: [{ w: 2, label: 'Nómina' }, { w: 4, label: '★ 1-ago' }] },
  { id: 'alicia',     label: 'Alicia · Onboarding TOPS', start: 0, end: 9, status: 'active', milestones: [{ w: 1, label: 'Forms' }] },
  { id: 'romy',       label: 'Romy · Mobility 360', start: 0, end: 9,  status: 'standby', milestones: [] },
  { id: 'desempeno',  label: 'Desempeño / GiseGPT', start: 0, end: 9,  status: 'blocked', milestones: [] },
];

const WEEKS = ['Jun 29', 'Jul 6', 'Jul 13', 'Jul 20', 'Jul 27', 'Ago 3', 'Ago 10', 'Ago 17', 'Ago 24', 'Ago 31'];

window.PROJECTS = PROJECTS;
window.TEAM_PARTNERS = TEAM_PARTNERS;
window.TEAM_CREDICORP = TEAM_CREDICORP;
window.TIMELINE = TIMELINE;
window.GANTT = GANTT;
window.WEEKS = WEEKS;
