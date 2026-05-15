/* global React */
// Per-project content overlays for the detail page.
// Each project gets its own workstreams, decisions, day-by-day plan
// (where applicable), and risk register. The DetailView component
// reads this map and falls back gracefully for sparse projects.

const DETAIL_DATA = {
  'hub-brasil': {
    countdown: { value: 13, unit: 'días', label: 'CNPJ activo · 28 abr',
      caption: 'Bloqueante para todo lo demás. Si se mueve, la nómina junio también se mueve.' },
    timelineKind: 'daily',
    timeline: [
      { d: '15 abr', day: 'mar', items: [{ k: 'meeting', l: 'Call con Auxadi (BPO) · 14h', who: 'LP' }, { k: 'task', l: 'Pedir referencias a Stone' }] },
      { d: '16 abr', day: 'mié', items: [{ k: 'task', l: 'Brief de seguridad para LG' }] },
      { d: '17 abr', day: 'jue', items: [{ k: 'meeting', l: 'Sync interno +Partners · CNPJ', who: 'LP, JF, MS' }] },
      { d: '18 abr', day: 'vie', items: [{ k: 'deliver', l: 'Comparativa BPO v1 (Auxadi/Stone/Koin/ADP)', who: 'LP' }] },
      { d: '22 abr', day: 'mar', items: [{ k: 'meeting', l: 'Change Mgmt con Pablo Silva', who: 'LP, MS' }, { k: 'task', l: 'Confirmar BPO finalista' }] },
      { d: '24 abr', day: 'jue', items: [{ k: 'meeting', l: 'Revisión ciberseguridad Credicorp', who: 'JF' }] },
      { d: '25 abr', day: 'vie', items: [{ k: 'task', l: 'Firmar contrato BPO' }] },
      { d: '28 abr', day: 'lun', items: [{ k: 'milestone', l: 'CNPJ activo · GO/NO-GO nómina junio', critical: true }] },
    ],
    workstreams: [
      { name: 'BPO de nómina', progress: 35, status: 'risk', lead: 'LP',
        next: 'Comparativa final viernes 18',
        tasks: [
          { done: true,  l: 'Mapeo de proveedores (Auxadi · Stone · Koin · ADP)' },
          { done: true,  l: 'Brief inicial enviado a 4 candidatos' },
          { done: false, l: 'Comparativa v1 — costos + ≤40d implementación' },
          { done: false, l: 'Brief ciberseguridad para Credicorp IT' },
          { done: false, l: 'Firma contrato — antes del 25 abr' },
        ] },
      { name: 'CNPJ + estructura legal', progress: 70, status: 'active', lead: 'LP',
        next: 'Confirmación tributaria São Paulo',
        tasks: [
          { done: true,  l: 'Razón social definida' },
          { done: true,  l: 'Capital social aportado' },
          { done: true,  l: 'Asesores tributarios contratados' },
          { done: false, l: 'CNPJ emitido · 28 abr target' },
        ] },
      { name: 'Change management', progress: 20, status: 'standby', lead: 'MS',
        next: 'Sesión con Pablo Silva 22 abr',
        tasks: [
          { done: true,  l: 'Mapeo de stakeholders Credicorp' },
          { done: false, l: 'Diagnóstico de cultura HUB Brasil' },
          { done: false, l: 'Plan de comunicación interna' },
          { done: false, l: 'Onboarding playbook · 30→200' },
        ] },
    ],
    decisions: [
      { date: '13 abr', who: 'LG + LP', tag: 'PROCESO', title: 'BPO de nómina ≠ software de LG',
        body: 'LG provee software de HR; la nómina es contrato separado. Evaluar 4 proveedores. Aprobación requiere Finanzas + Ciberseguridad de Credicorp.' },
      { date: '9 abr',  who: 'Pablo + Mara', tag: 'DEADLINE', title: 'Ventana de 40 días',
        body: 'Si CNPJ no sale 28 abr → la primera nómina junio se mueve. No es negociable con el cliente; el deadline es Credicorp.' },
      { date: '22 mar', who: 'Lucía P.', tag: 'ESTRUCTURA', title: 'CNPJ se queda con +Partners',
        body: 'No tercerizar la apertura. Asesores tributarios São Paulo contratados directamente por +Partners.' },
      { date: '14 mar', who: 'Sasan + Jorge', tag: 'PLAN', title: 'Hub arranca con 30 personas',
        body: 'Target final 200, pero plan en fases. Q2: 30. Q3: 80. Q4: 150. 2027: 200.' },
    ],
    people: {
      partners: [
        { i: 'LP', n: 'Lucía Palomeque', r: 'Lead · BPO + CNPJ' },
        { i: 'JF', n: 'Juan Fornaguera', r: 'HR Tech · Ciberseguridad' },
        { i: 'MS', n: 'Mara Schmitman', r: 'Change Mgmt' },
      ],
      credicorp: [
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor · Director HR' },
        { i: 'LG', n: 'Lucila Guelfo', r: 'Hub Brasil · Change Mgmt', isNew: true },
        { i: 'GR', n: 'Gisselle Ripamonti', r: 'HR Tech · Copilot' },
        { i: 'CL', n: 'Cindy & Liz', r: 'Bienestar · Hub Brasil' },
      ],
    },
  },

  'alicia': {
    countdown: { value: 'Q1', unit: '2027', label: 'Agente ILP en producción',
      caption: 'Target 300 TOPs cubiertos. Depende de autorizaciones de seguridad — workstream 1 hoy.' },
    timelineKind: 'weekly',
    timeline: [
      { period: 'Esta semana',     items: ['Arranque con Alicia post regreso (13 abr)', 'Definir scope del agente ILP/LTI'] },
      { period: 'Próximas 2 sem',  items: ['Revisión de onboarding actual', 'Pedir autorizaciones de seguridad — IT', 'Identificar dueño técnico del agente'] },
      { period: 'May 2026',        items: ['Prototipo del agente — flujo conversacional', 'Test con cohorte de 10 TOPs', 'Decisión: build interno vs vendor'] },
      { period: 'Q3 2026',         items: ['Piloto con 50 TOPs', 'Integración con HRIS', 'Plan de rollout 300 TOPs'] },
      { period: 'Q1 2027',         items: ['Agente ILP en producción · target 300 TOPs', 'Onboarding digital v1 live'] },
    ],
    workstreams: [
      { name: 'Agente ILP / LTI', progress: 25, status: 'active', lead: 'JF',
        next: 'Brief de scope · viernes 18',
        tasks: [
          { done: true,  l: 'Workshop discovery con Alicia' },
          { done: false, l: 'Brief de scope técnico' },
          { done: false, l: 'Solicitud de autorización seguridad' },
          { done: false, l: 'Prototipo conversacional' },
        ] },
      { name: 'Onboarding digital', progress: 50, status: 'active', lead: 'MS',
        next: 'Revisión con Alicia post-regreso',
        tasks: [
          { done: true,  l: 'Mapeo de proceso actual' },
          { done: true,  l: 'Identificación de pain points' },
          { done: false, l: 'Propuesta de flujo digital' },
          { done: false, l: 'Definir métricas de éxito' },
        ] },
      { name: 'HR Tech stack', progress: 60, status: 'active', lead: 'JF',
        next: 'Auditoría completa este mes',
        tasks: [
          { done: true,  l: 'Inventario de sistemas actuales' },
          { done: true,  l: 'Identificación de duplicaciones' },
          { done: false, l: 'Roadmap de consolidación' },
        ] },
    ],
    decisions: [
      { date: '13 abr', who: 'Alicia + Mara', tag: 'PIVOT', title: 'Bono España descartado',
        body: 'Solo 3 tops — no justifica el caso. Pivotar a ILP/LTI con target 300 TOPs Q1 2027.' },
      { date: '9 abr', who: 'Pablo + Juan', tag: 'PROCESO', title: 'Agente ILP es P1',
        body: 'El onboarding queda en P2 hasta tener el agente más definido. Mantener cadencia semanal con Alicia.' },
      { date: '14 mar', who: 'Alicia', tag: 'SCOPE', title: 'Foco en TOPs, no toda HR Tech',
        body: 'Acotar a procesos de TOPs (compensación, evaluación). Resto de procesos en parking lot.' },
    ],
    people: {
      partners: [
        { i: 'JF', n: 'Juan Fornaguera', r: 'Lead · HR Tech · Agente ILP' },
        { i: 'MS', n: 'Mara Schmitman', r: 'Onboarding · coordinación' },
        { i: 'SM', n: 'Sasan Maniei', r: 'Innovación IA' },
      ],
      credicorp: [
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor · Director HR' },
        { i: 'AL', n: 'Alicia Buleje', r: 'Contraparte · Ops HR · regresó 13 abr', isNew: true },
        { i: 'GR', n: 'Gisselle Ripamonti', r: 'HR Tech · GiseGPT' },
      ],
    },
  },

  'romy': {
    countdown: { value: 6, unit: 'mayo', label: 'Presentación a liderazgo',
      caption: 'Entregables ya están listos: diagnóstico HTML + 2 playbooks. Falta la sesión de presentación.' },
    timelineKind: 'weekly',
    timeline: [
      { period: 'Esta semana',     items: ['Confirmar agenda con Romy', 'Preparar deck de presentación', 'Imprimir copia física de los playbooks'] },
      { period: 'Próximas 2 sem',  items: ['Presentar a Romy + liderazgo (Pablo, etc.)', 'Recoger feedback inicial', 'Plan de socialización con HR business partners'] },
      { period: 'Mayo / Junio',    items: ['Pilotos: 2-3 traslados LATAM con el nuevo modelo', 'Ajustes basados en feedback piloto'] },
      { period: 'Bloqueado',       items: ['Agente Movilidad — pausado hasta desbloqueo de GISE GPT (IT)'] },
    ],
    workstreams: [
      { name: 'Entregables — diagnóstico + playbooks', progress: 95, status: 'delivery', lead: 'LP',
        next: 'Presentación a liderazgo · 6 may',
        tasks: [
          { done: true,  l: 'Benchmark Philips · MeLi · Accenture · Boehringer' },
          { done: true,  l: 'Diagnóstico HTML interactivo' },
          { done: true,  l: 'Playbook 1: Movilidad regional' },
          { done: true,  l: 'Playbook 2: Talent mobility executive' },
          { done: false, l: 'Versión printable / hand-off' },
        ] },
      { name: 'Modelo LATAM', progress: 70, status: 'active', lead: 'LP',
        next: 'Sesión con equipo Talento',
        tasks: [
          { done: true,  l: 'Mapeo de procesos actuales' },
          { done: true,  l: 'Diseño de modelo target' },
          { done: false, l: 'Validación con HR LATAM' },
          { done: false, l: 'Pilotos en 2 países' },
        ] },
      { name: 'Agente Movilidad', progress: 10, status: 'blocked', lead: 'LP',
        next: 'Bloqueado · esperando IT (Copilot)',
        tasks: [
          { done: true,  l: 'Especificación funcional' },
          { done: false, l: 'Acceso a Copilot Studio (IT)' },
          { done: false, l: 'Integración con GISE GPT' },
        ] },
    ],
    decisions: [
      { date: '9 abr', who: 'Lucía + Romy', tag: 'ENTREGABLE', title: 'Entregables van como diagnóstico, no propuesta',
        body: 'Presentar el diagnóstico primero. La propuesta concreta sale en una segunda sesión con Romy y liderazgo presente.' },
      { date: '28 mar', who: 'Lucía + Juan', tag: 'BLOQUEO', title: 'Agente Movilidad en pausa',
        body: 'IT (Antonio G., Ysela Santana) sin responder hace 5+ semanas. Agente bloqueado por dependencia de Copilot Studio. Escalar a Pablo si sigue 2 semanas más.' },
      { date: '14 feb', who: 'Romy + Lucía', tag: 'SCOPE', title: 'Solo movilidad LATAM, no global',
        body: 'Empezar por Chile, Colombia, Argentina. Foco regional antes de escalar.' },
    ],
    people: {
      partners: [
        { i: 'LP', n: 'Lucía Palomeque', r: 'Lead · todo el frente' },
        { i: 'JF', n: 'Juan Fornaguera', r: 'Agente · bloqueado' },
      ],
      credicorp: [
        { i: 'RM', n: 'Romina Mitidieri', r: 'Contraparte · HR Movilidad' },
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor (a presentar 6 may)' },
        { i: 'IT', n: 'Ysela / Antonio G.', r: 'IT — sin respuesta desde 5 mar', flag: true },
      ],
    },
  },

  'desempeno': {
    countdown: { value: '4+', unit: 'meses', label: 'Sin reuniones',
      caption: 'Última actividad dic 2025. El frente está dormido sin culpa nuestra — falta confirmar alcance con Credicorp.' },
    timelineKind: 'phases',
    timeline: [
      { period: 'Estado actual',  items: ['Sin reuniones desde dic 2025', 'Sin contraparte clara identificada', 'Sin scope confirmado'] },
      { period: 'Para despertar', items: ['Pablo Silva debe nombrar dueño del frente', 'Definir si va con compensación o aparte', 'Reservar slot para arranque'] },
      { period: 'Hipótesis de scope', items: ['Performance management — modelo de evaluación', 'Feedback continuo · OKRs alineados', 'Conexión con compensación variable', 'Upskilling para transformación digital'] },
    ],
    workstreams: [
      { name: 'Despertar el frente', progress: 5, status: 'standby', lead: 'JM',
        next: 'Conversación con Pablo · pendiente',
        tasks: [
          { done: true,  l: 'Diagnóstico inicial (dic 2025)' },
          { done: false, l: 'Confirmar alcance con Credicorp' },
          { done: false, l: 'Identificar dueño del frente' },
          { done: false, l: 'Definir relación con compensación' },
        ] },
    ],
    decisions: [
      { date: 'dic 2025', who: 'Jorge M. + Pablo', tag: 'PAUSA', title: 'Frente entra en stand-by',
        body: 'Sin recursos asignados para iniciar el workstream. +Partners no fuerza la agenda — espera definición desde Credicorp.' },
      { date: 'nov 2025', who: 'Jorge M.', tag: 'SCOPE', title: 'Diagnóstico inicial entregado',
        body: 'Mapeo del proceso actual de evaluación + hipótesis de modelo target. Pendiente de validación.' },
    ],
    people: {
      partners: [
        { i: 'JM', n: 'Jorge Moreno', r: 'Lead · Estrategia · GRC' },
      ],
      credicorp: [
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor · debe nombrar dueño' },
      ],
    },
  },
};

window.DETAIL_DATA = DETAIL_DATA;
