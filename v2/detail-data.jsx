/* global React */
// Per-project content overlays for the detail page.
// Actualizado al 2-jul-2026 (status con Pablo Silva).

const DETAIL_DATA = {
  'hub-brasil': {
    countdown: { value: 91, unit: 'días', label: 'GO-LIVE · 1-oct-2026',
      caption: 'Hito temprano ~1-ago. La decisión de nómina en ≤2 semanas protege el testing de julio.' },
    timelineKind: 'daily',
    timeline: [
      { d: '30 jun', day: 'mar', items: [{ k: 'deliver', l: 'KYC TMF firmado — nómina en fase de contratación', who: 'LG' }] },
      { d: '1 jul',  day: 'mié', items: [{ k: 'deliver', l: 'Shortlist SST + guía de screening entregada a Lu', who: 'LP' }] },
      { d: '2 jul',  day: 'jue', items: [{ k: 'meeting', l: 'Status de proyectos con Pablo Silva', who: 'MS' }] },
      { d: 'sem 6 jul', day: '—', items: [{ k: 'task', l: 'Validar jurisdicción Madrid (Auxadi) con Legal' }, { k: 'task', l: 'Pedir propuestas SST: Care Plus · Mednet · SESI' }] },
      { d: '~15 jul', day: '—', items: [{ k: 'milestone', l: 'Decisión nómina Auxadi vs TMF', critical: true }] },
      { d: 'jul',    day: '—', items: [{ k: 'task', l: 'CNPJ activo → cuenta bancaria + contratos CLT' }, { k: 'task', l: 'Cierre plan médico Bradesco' }] },
      { d: '~1 ago', day: '—', items: [{ k: 'milestone', l: 'GO-LIVE hito temprano (buffer)' }] },
      { d: '1 oct',  day: '—', items: [{ k: 'milestone', l: 'GO-LIVE OBJETIVO', critical: true }] },
    ],
    workstreams: [
      { name: 'Nómina (BPO / folha)', progress: 75, status: 'active', lead: 'LP',
        next: 'Decisión Auxadi vs TMF · ≤2 semanas',
        tasks: [
          { done: true,  l: 'De 4 propuestas a 2 finalistas — matriz con datos reales' },
          { done: true,  l: 'TMF: KYC firmado 30-jun (≈USD 50k/año, ISO 27001, foro Brasil)' },
          { done: true,  l: 'Auxadi: propuesta viable (≈USD 21k/año, implementación 1 semana)' },
          { done: false, l: 'Validar jurisdicción Madrid (Auxadi) con Legal' },
          { done: false, l: 'Cerrar proveedor + diseño flujo de pagos · testing ago-sep' },
        ] },
      { name: 'Legal / CNPJ', progress: 90, status: 'active', lead: 'LG',
        next: 'Activación del CNPJ en días',
        tasks: [
          { done: true,  l: 'Apostillado resuelto — CNPJ destrabado' },
          { done: false, l: 'CNPJ activo → cuenta bancaria, contratos CLT, registros' },
          { done: false, l: 'Poderes societarios validados (Veirano)' },
        ] },
      { name: 'SST / Salud ocupacional', progress: 40, status: 'active', lead: 'LP',
        next: 'Propuestas a los 3 verificados',
        tasks: [
          { done: true,  l: 'Shortlist con credenciales verificadas + guía de screening (1-jul)' },
          { done: true,  l: 'Outreach: Neoformar y Salú (vía Koin) · consultas a Adidas, Clara y Stone' },
          { done: false, l: 'Propuestas: Care Plus · Grupo Mednet · SESI' },
          { done: false, l: 'Mini-matriz de evaluación (como la de nómina)' },
          { done: false, l: 'Exámenes admissionais listos ANTES del Go-Live · ruta crítica' },
        ] },
      { name: 'Change management', progress: 55, status: 'active', lead: 'MS',
        next: 'Comunicación adelantada + 1:1 TOPS',
        tasks: [
          { done: true,  l: 'Deck de status con matriz de riesgos' },
          { done: true,  l: 'Modelo de acompañamiento: 5 momentos del journey · 3 pilares' },
          { done: false, l: 'Handbook "qué cambia / qué no" + FAQ IA' },
          { done: false, l: 'Sesiones grupales de acompañamiento · ago-sep' },
        ] },
      { name: 'Beneficios y compensaciones', progress: 60, status: 'active', lead: 'PS',
        next: 'Cierre plan médico Bradesco',
        tasks: [
          { done: true,  l: 'Definición: mismo plan para todos + cobertura internacional para ciertos perfiles' },
          { done: false, l: 'Cierre Bradesco · jul' },
          { done: false, l: 'Beneficios 2026 + Flex Wallet · ago' },
          { done: false, l: 'Paquetes USD→BRL 4 TOPS · jul-ago' },
        ] },
    ],
    decisions: [
      { date: '2 jul', who: 'Pablo + Mara', tag: 'PRIORIDAD', title: 'Foco total Hub Brasil 2-3 semanas',
        body: 'Cerrar nómina (Auxadi vs TMF), screening SST, plan de change/comunicación y journey del colaborador. Los demás frentes quedan en mantenimiento activo.' },
      { date: '30 jun', who: 'LG + TMF', tag: 'NÓMINA', title: 'KYC TMF firmado',
        body: 'TMF entra en fase de contratación: contrato sobre la mesa (3 años + renovación auto, preaviso 6 meses, foro Barueri/SP). Campos de fees aún en blanco — montos vigentes = propuesta.' },
      { date: '25 jun', who: 'Lu (Lucila G.)', tag: 'SST', title: 'Nuevo frente: proveedores médicos / SST / ergonomía',
        body: 'Pedido directo de Lu. Shortlist con credenciales + guía de screening entregadas el 1-jul. Marco: PCMSO, PGR, NR-17, eSocial SST.' },
      { date: 'jun', who: 'Equipo', tag: 'ALCANCE', title: 'De benchmark a creación operativa del Hub',
        body: 'El alcance original era solo benchmark; terminó siendo la creación completa: legal, nómina, SST, change e IT. Roadmap con owners: Lu · Alicia · Pablo · cross.' },
    ],
    people: {
      partners: [
        { i: 'LP', n: 'Lucía Palomeque', r: 'Lead · Nómina + SST' },
        { i: 'MS', n: 'Mara Schmitman', r: 'Change Mgmt · coordinación' },
        { i: 'SM', n: 'Sasan Maniei', r: 'Change · plan de comunicación' },
        { i: 'JF', n: 'Juan Fornaguera', r: 'HR Tech · seguridad' },
      ],
      credicorp: [
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor · Beneficios y Compensaciones' },
        { i: 'LG', n: 'Lucila Guelfo', r: 'Owner: legal, compliance, SST, finanzas, gobierno' },
        { i: 'AR', n: 'Alicia Rivera', r: 'Owner: nómina y procesos operativos' },
      ],
    },
  },

  'alicia': {
    countdown: { value: 'sem', unit: '6 jul', label: 'Sesión de forms con Alicia',
      caption: 'Forms destrabado. Documentos guía ya en Drive; sesión de armado conjunto acordada.' },
    timelineKind: 'weekly',
    timeline: [
      { period: 'Esta semana',    items: ['Preparar sesión de armado del forms (documentos guía en Drive)', 'Consolidar aprendizajes del bench externo'] },
      { period: 'Sem 6 jul',      items: ['Sesión de armado conjunto del forms con Alicia', 'Follow-up People Ops Banco Galicia'] },
      { period: 'Jul-Ago',        items: ['Diseño del journey de onboarding ejecutivo con insights del bench', 'Cruce con onboarding de las 5 empresas del grupo relevadas'] },
      { period: 'Q1 2027',        items: ['Chat ILP GV — riel técnico de GiseGPT listo, arranque sin curva (depende IT)'] },
    ],
    workstreams: [
      { name: 'Onboarding ejecutivo TOPS', progress: 60, status: 'active', lead: 'JF',
        next: 'Sesión forms · sem 6 jul',
        tasks: [
          { done: true,  l: 'Relevamiento de 5 empresas del grupo' },
          { done: true,  l: 'Bench externo: Nubank (3-jun) · Banco Galicia (18-jun) · Santander (24-jun)' },
          { done: false, l: 'Armado conjunto del forms con Alicia' },
          { done: false, l: 'Diseño del journey de onboarding' },
        ] },
      { name: 'Chat ILP GV (iniciativa 28)', progress: 20, status: 'blocked', lead: 'JF',
        next: 'Depende del desbloqueo de IT / Copilot 365',
        tasks: [
          { done: true,  l: 'Riel técnico hecho (GiseGPT) — Alicia conoce el formato' },
          { done: false, l: 'Aprobación IT · Copilot 365' },
          { done: false, l: 'Arranque · target Q1 2027' },
        ] },
    ],
    decisions: [
      { date: 'jun', who: 'Alicia + equipo', tag: 'DESTRABE', title: 'Forms destrabado',
        body: 'Sesión de armado conjunto acordada para la semana del 6-jul. Documentos guía ya en Drive.' },
      { date: 'jun', who: 'Equipo', tag: 'BENCH', title: 'Bench externo de primer nivel cerrado',
        body: 'Nubank, Banco Galicia (con follow-up de People Ops) y Santander. Input directo para el diseño del journey.' },
      { date: '9 abr', who: 'Pablo', tag: 'ORIGEN', title: 'Iniciativa 35 activada',
        body: 'Estandarización del ingreso ejecutivo (onboarding) — activada por Pablo el 9-abr como frente nuevo del backlog.' },
    ],
    people: {
      partners: [
        { i: 'JF', n: 'Juan Fornaguera', r: 'Lead · Onboarding + ILP' },
        { i: 'MS', n: 'Mara Schmitman', r: 'Coordinación' },
      ],
      credicorp: [
        { i: 'AR', n: 'Alicia Rivera', r: 'Contraparte · HR Innovation Sprints' },
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor · activó el frente el 9-abr' },
      ],
    },
  },

  'romy': {
    countdown: { value: '26', unit: 'sep', label: 'Despliegue Mobility Experience',
      caption: 'Standby acordado con Romy. Entregables listos: diagnóstico + 2 manuales. Retomamos cuando lo pida.' },
    timelineKind: 'phases',
    timeline: [
      { period: 'Estado actual',   items: ['Standby ordenado a pedido de Romy', 'Entregables listos: diagnóstico + manual interno + manual del empleado', 'Benchmark con 5 referentes cerrado (Philips, MeLi, Accenture, Nubank, Boehringer)'] },
      { period: 'Para reactivar',  items: ['Pedido de Romy → desarrollo final del playbook', 'Despliegue Mobility Experience + capacitaciones · target 26-sep'] },
      { period: 'Bloqueado',       items: ['Agente Movilidad — pausado hasta desbloqueo de IT (Copilot)'] },
    ],
    workstreams: [
      { name: 'Entregables — diagnóstico + manuales', progress: 95, status: 'delivery', lead: 'LP',
        next: 'Desarrollo final en standby a pedido de Romy',
        tasks: [
          { done: true,  l: 'Benchmark Philips · MeLi · Accenture · Nubank · Boehringer' },
          { done: true,  l: 'Diagnóstico completo' },
          { done: true,  l: 'Manual interno + manual del empleado (prototipados)' },
          { done: false, l: 'Desarrollo final del playbook (cuando Romy lo pida)' },
        ] },
      { name: 'Mobility Experience + capacitaciones', progress: 50, status: 'standby', lead: 'LP',
        next: 'Despliegue y comunicación · 26-sep',
        tasks: [
          { done: true,  l: 'Material base construido con Romy' },
          { done: false, l: 'Despliegue del programa' },
          { done: false, l: 'Capacitaciones y homologación' },
        ] },
      { name: 'Agente Movilidad', progress: 10, status: 'blocked', lead: 'LP',
        next: 'Bloqueado · esperando IT (Copilot)',
        tasks: [
          { done: true,  l: 'Especificación funcional' },
          { done: false, l: 'Acceso a Copilot Studio (IT)' },
        ] },
    ],
    decisions: [
      { date: 'may-jun', who: 'Romy + LP', tag: 'STANDBY', title: 'Standby ordenado',
        body: 'Entregables terminados; el desarrollo final del playbook se retoma cuando Romy lo pida. Soporte disponible desde +Partners.' },
      { date: '9 abr', who: 'Lucía + Romy', tag: 'ENTREGABLE', title: 'Entregables van como diagnóstico, no propuesta',
        body: 'Presentar el diagnóstico primero; la propuesta concreta sale en una segunda sesión con liderazgo presente.' },
    ],
    people: {
      partners: [
        { i: 'LP', n: 'Lucía Palomeque', r: 'Lead · todo el frente' },
        { i: 'JM', n: 'Jorge Moreno', r: 'Soporte' },
      ],
      credicorp: [
        { i: 'RM', n: 'Romina Mitidieri', r: 'Contraparte · Global Mobility' },
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor' },
      ],
    },
  },

  'desempeno': {
    countdown: { value: '4', unit: 'meses', label: 'IT sin respuesta (desde marzo)',
      caption: 'GiseGPT construido y validado. Un mes de trabajo terminado espera la conversación interna que debe empujar Pablo.' },
    timelineKind: 'phases',
    timeline: [
      { period: 'Estado actual',  items: ['GiseGPT construido y validado con Gisselle', 'Documentado para IT', '3 mails de seguimiento sin respuesta · escalado a Pablo el 9-abr'] },
      { period: 'Para destrabar', items: ['Empuje de Pablo a IT (Ysela Santana / Antonio García)', 'Aprobación de Copilot 365'] },
      { period: 'Al destrabarse', items: ['Deploy inmediato de GiseGPT', 'Se desbloquean las iniciativas 24, 28, 37, 38, 39 y 40 del backlog', 'Agentes IA Ejecutivo y EdP escalables'] },
    ],
    workstreams: [
      { name: 'GiseGPT (bot de objetivos)', progress: 85, status: 'blocked', lead: 'JF',
        next: 'Espera aprobación IT · empuje de Pablo',
        tasks: [
          { done: true,  l: 'Construcción del bot' },
          { done: true,  l: 'Validación con Gisselle Ripamonti' },
          { done: true,  l: 'Documentación para IT' },
          { done: false, l: 'Aprobación IT / Copilot 365' },
          { done: false, l: 'Deploy' },
        ] },
    ],
    decisions: [
      { date: '9 abr', who: 'Mara + Pablo', tag: 'ESCALADO', title: 'Bloqueo IT escalado a Pablo',
        body: 'IT (Ysela Santana / Antonio García) sin respuesta desde marzo pese a 3 mails de seguimiento. La aprobación de Copilot 365 es la condición que más valor destraba del backlog.' },
    ],
    people: {
      partners: [
        { i: 'JF', n: 'Juan Fornaguera', r: 'Lead · GiseGPT' },
        { i: 'SM', n: 'Sasan Maniei', r: 'Innovación · IA' },
      ],
      credicorp: [
        { i: 'GR', n: 'Gisselle Ripamonti', r: 'Contraparte · Performance Management' },
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor · debe empujar a IT' },
        { i: 'IT', n: 'Ysela / Antonio G.', r: 'IT — sin respuesta desde marzo', flag: true },
      ],
    },
  },
};

window.DETAIL_DATA = DETAIL_DATA;
