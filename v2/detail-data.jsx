/* global React */
// Per-project content overlays for the detail page.
// Actualizado al 16-sep-2026 (check-in con Pablo Silva).

const DETAIL_DATA = {
  'desempeno': {
    countdown: { value: '4', unit: 'benchs', label: 'Serie de benchmarks cerrada · Philips, Adidas, Visa, Santander',
      caption: 'Cronograma cliente: Comité VAP/BAP en septiembre → capacitación oct-nov → lanzamiento NineBox ene-feb 2027 (~900 mandos medios).' },
    timelineKind: 'daily',
    timeline: [
      { d: '3 ago',  day: 'lun', items: [{ k: 'deliver', l: 'Research Nine Box enviado a Pablo', who: 'MS' }] },
      { d: '7 ago',  day: 'vie', items: [{ k: 'meeting', l: 'Benchmark de Desempeño y Potencial con Vania, Gisselle y Pablo' }, { k: 'deliver', l: 'Research "qué vs. cómo"', who: 'MS' }] },
      { d: '18 ago', day: 'mar', items: [{ k: 'deliver', l: 'Mini market research NineBox a Vania', who: 'MS' }] },
      { d: '24 ago', day: 'lun', items: [{ k: 'deliver', l: 'Doc de trabajo Fase2_Metodologia_NineBox (bloques A–E, sin validar)', who: 'MS' }] },
      { d: '26 ago', day: 'mié', items: [{ k: 'meeting', l: 'Bench Philips — María Pía Logiovane' }] },
      { d: '27 ago', day: 'jue', items: [{ k: 'deliver', l: 'Programa_IA_para_Lideres_Credicorp enviado a Pablo (sin respuesta formal)', who: 'MS' }] },
      { d: '4 sep',  day: 'vie', items: [{ k: 'meeting', l: 'Bench Adidas — Silene Rodrigues' }] },
      { d: '10 sep', day: 'jue', items: [{ k: 'meeting', l: 'Bench Visa — Catalina Rueda' }] },
      { d: '14 sep', day: 'lun', items: [{ k: 'meeting', l: 'Bench Santander — Jaime Alija, Cristina Masgordoa, Valeria Heide (con Vania)' }] },
      { d: '16 sep', day: 'mié', items: [{ k: 'milestone', l: 'Check-in con Pablo · 12:00 ART', critical: true }] },
      { d: 'sep',    day: '—',   items: [{ k: 'milestone', l: 'Comité VAP/BAP — aprobación del modelo', critical: true }] },
      { d: 'oct-nov', day: '—',  items: [{ k: 'task', l: 'Capacitación (propuesta +Partners: 3 sesiones NineBox para el equipo de Vania)' }] },
      { d: 'ene-feb 27', day: '—', items: [{ k: 'milestone', l: 'Lanzamiento NineBox · ~900 mandos medios' }] },
    ],
    workstreams: [
      { name: 'Nine Box · modelo Qué × Cómo', progress: 55, status: 'active', lead: 'MS',
        next: 'Validar Fase 2 con Vania · workshop semanal',
        tasks: [
          { done: true,  l: 'Research Nine Box + research "qué vs. cómo" (ago)' },
          { done: true,  l: 'Guía consolidada de preguntas de bench (14/08)' },
          { done: true,  l: 'Doc Fase2_Metodologia_NineBox — A potencial · B calibración · C piloto · D 360/bono · E herramienta' },
          { done: false, l: 'Validación de la metodología con Vania (workshop semanal vencido)' },
          { done: false, l: 'Definir con Vania: 5→3 niveles, potencial dentro de la evaluación anual, herramienta de RR.HH.' },
        ] },
      { name: 'Serie de benchmarks', progress: 80, status: 'active', lead: 'JF',
        next: 'Resúmenes escritos + cuadro comparativo de 4',
        tasks: [
          { done: true,  l: 'Philips (26/08): Qué y Cómo separados → matriz; calibración solo sobre discrepancias' },
          { done: true,  l: 'Adidas (04/09): On Track / Off Track; desempeño desacoplado del bono' },
          { done: true,  l: 'Visa (10/09): Qué 50% / Cómo 50%; marco 3A confidencial; agentes Copilot' },
          { done: true,  l: 'Santander (14/09): OKRs 100% + Cómo y Riesgo ±0,25; escala 4→3; potencial dentro de la evaluación' },
          { done: false, l: 'Resúmenes escritos (Vania pidió el de Visa) + cuadro comparativo' },
          { done: false, l: 'Cola: Cargill · Red Hat · BBVA — Disney y PedidosYa sin respuesta' },
        ] },
      { name: 'GiseGPT / Copilot Studio', progress: 85, status: 'blocked', lead: 'JF',
        next: 'Decidir el 16/09: caso Visa+Santander o cierre',
        tasks: [
          { done: true,  l: 'Bot construido, validado con Gisselle y documentado para IT' },
          { done: false, l: 'Aprobación IT / Copilot 365 — sin respuesta desde marzo' },
          { done: false, l: 'Si no se destraba en septiembre: proponer cierre del frente' },
        ] },
    ],
    decisions: [
      { date: '14 sep', who: 'Credicorp (en sala)', tag: 'DATO', title: 'Credicorp corporativiza el modelo y pasa de 5 a 3 niveles',
        body: '~45k personas, 14 empresas. Quiere explorar integrar el potencial dentro de la evaluación anual (como Santander). Sin documento formal todavía.' },
      { date: '24 ago', who: '+Partners', tag: 'PROPUESTA', title: 'Capacitación NineBox de 3 sesiones para el equipo de Vania',
        body: 'Grupo de WhatsApp con Pablo; credenciales BCP para abrir el bench con Disney.' },
      { date: '23 jul', who: 'Pablo + equipo', tag: 'ORIGEN', title: 'Retomar el Nine Box + Leadership Index',
        body: 'Lib 360 perdió objetividad (impacta el bono). Vania lidera desempeño de Middle Management; Gisselle el Leadership Index. Market research + benchmark en agosto.' },
    ],
    people: {
      partners: [
        { i: 'MS', n: 'Mara Schmitman', r: 'Lead · research y metodología' },
        { i: 'JF', n: 'Juan Fornaguera', r: 'Benchmarks · GiseGPT' },
        { i: 'SM', n: 'Sasan Maniei', r: 'Biblioteca de Benchmarks · IA' },
      ],
      credicorp: [
        { i: 'VG', n: 'Vania Guerrero', r: 'Desempeño Corporativo (BCP) · Middle Management' },
        { i: 'GR', n: 'Gisselle Ripamonti', r: 'Leadership Index' },
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor' },
        { i: 'IT', n: 'Ysela / Antonio G.', r: 'IT — bloquea GiseGPT', flag: true },
      ],
    },
  },

  'hub-brasil': {
    countdown: { value: 'oct', unit: '/ nov', label: 'Lanzamiento pospuesto (era 1-oct)',
      caption: 'Nómina: TMF Group elegido. TI sigue siendo el bloqueo crítico. Continuidad del frente en riesgo por posible salida de Lucila.' },
    timelineKind: 'daily',
    timeline: [
      { d: '13 jul', day: 'lun', items: [{ k: 'meeting', l: 'Presentación PPT change mgmt con Lu y Pablo', who: 'MS' }] },
      { d: '17 jul', day: 'vie', items: [{ k: 'meeting', l: 'Pre-vacaciones de Lucila: estado y dependencias' }] },
      { d: '7 ago',  day: 'vie', items: [{ k: 'meeting', l: 'Status Hub Brasil — lanzamiento pospuesto a oct/nov; requisitos cuenta bancaria Finnova' }] },
      { d: '14 ago', day: 'vie', items: [{ k: 'task', l: 'Mail a Pablo por el handbook — sin respuesta' }] },
      { d: '24 ago', day: 'lun', items: [{ k: 'meeting', l: 'Status Hub Brasil (Teams, sin grabación — confirmar asistencia)' }] },
      { d: '28 ago', day: 'jue', items: [{ k: 'task', l: 'Banco do Rendimento apalabrado por Sasan — esperando a Lu', who: 'SM' }] },
      { d: '1 sep',  day: 'lun', items: [{ k: 'meeting', l: 'Reu Mara & Lu (1:1)', who: 'MS' }] },
      { d: 'sep',    day: '—',   items: [{ k: 'task', l: 'Sesión de documentación / plan de continuidad con Lucila' }] },
      { d: 'oct/nov', day: '—',  items: [{ k: 'milestone', l: 'Lanzamiento Hub Brasil', critical: true }] },
    ],
    workstreams: [
      { name: 'Nómina (TMF Group)', progress: 70, status: 'active', lead: 'LP',
        next: 'Implementación 60-90 días · demo y ficha técnica para ciberseguridad',
        tasks: [
          { done: true,  l: 'Proveedor elegido: TMF Group (jul) — Auxadi y Grant Thornton descartados' },
          { done: false, l: 'Ficha técnica + validación de ciberseguridad' },
          { done: false, l: 'Diseño del flujo de pagos y testing' },
        ] },
      { name: 'Legal / CNPJ / cuenta bancaria', progress: 75, status: 'risk', lead: 'LG',
        next: 'Cuenta Finnova — Banco do Rendimento',
        tasks: [
          { done: true,  l: 'CNPJ destrabado' },
          { done: true,  l: 'Requisitos de apertura de cuenta compartidos por Lucila (07/08)' },
          { done: false, l: 'Respuesta de Lu a Banco do Rendimento' },
          { done: false, l: 'Poderes societarios validados' },
        ] },
      { name: 'TI (Credicorp)', progress: 20, status: 'blocked', lead: 'PS',
        next: 'Escalar con Pablo',
        tasks: [
          { done: false, l: 'Matrículas, migración de correos y accesos — PM de TI sin transparentar datos' },
          { done: false, l: 'Sin TI no se puede contratar/cesar en Perú ni migrar' },
        ] },
      { name: 'Change management + handbook', progress: 60, status: 'standby', lead: 'MS',
        next: 'Depende del handbook de Lucila y del calendario nuevo',
        tasks: [
          { done: true,  l: 'Plan de comunicación en dos carriles (TOPS y colaboradores Yape) presentado 13/07' },
          { done: true,  l: 'Esqueleto del handbook + dos versiones de speech (durante vacaciones de Lucila)' },
          { done: false, l: 'Handbook: Lucila sigue sobre la versión de mayo' },
          { done: false, l: 'Kick-off presencial de colaboradores (media mañana) — sin fecha' },
        ] },
    ],
    decisions: [
      { date: '1 sep', who: '+Partners', tag: 'CONTINUIDAD', title: 'Plan de continuidad ante posible salida de Lucila',
        body: 'Sesión de documentación con ella pendiente de agendar. Si sale, pedir reunión con Alicia para redefinir el frente.' },
      { date: '7 ago', who: 'Lucila', tag: 'CALENDARIO', title: 'Lanzamiento pospuesto a oct/nov',
        body: 'Era 1-sep (TI apuntaba a 1-oct). Se comparten requisitos para apertura de cuenta bancaria de Finnova.' },
      { date: 'jul', who: 'Credicorp', tag: 'NÓMINA', title: 'TMF Group elegido como proveedor de nómina',
        body: 'Implementación 60-90 días (no 15). Ciberseguridad no arranca la validación sin demo y ficha técnica.' },
      { date: '13 jul', who: 'Pablo + Lu', tag: 'CHANGE', title: 'Dos carriles de comunicación y métricas simplificadas',
        body: 'Mostrar 3 métricas principales (no el 27%); desglosar las no iniciadas por área. Mensaje clave: André Resende como apoderado / Gerente General.' },
    ],
    people: {
      partners: [
        { i: 'LP', n: 'Lucía Palomeque', r: 'Lead · nómina + cuenta' },
        { i: 'SM', n: 'Sasan Maniei', r: 'Banco · change' },
        { i: 'MS', n: 'Mara Schmitman', r: 'Change · 1:1 con Lu' },
      ],
      credicorp: [
        { i: 'LG', n: 'Lucila Guelfo', r: 'Owner · posible salida' },
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor' },
        { i: 'AR', n: 'Alicia Rivera', r: 'Nómina y procesos' },
      ],
    },
  },

  'alicia': {
    countdown: { value: '13', unit: 'días', label: 'Sin fecha de status con Alicia',
      caption: 'Juan pidió la llamada el 3/09 (Alicia, César y Gaby). Forms listo en pruebas desde el 4/08; Tu Recibo con licencia y respaldo legal sin revisar.' },
    timelineKind: 'weekly',
    timeline: [
      { period: 'Jul',          items: ['To-Be de 7 etapas + Capa 1/Capa 2 (8/07)', 'Sesión MS Forms (24/07) y prueba piloto (27/07)', 'Árbol de decisión + árbol documental (César)'] },
      { period: 'Ago',          items: ['Forms de activación listo, en pruebas (4/08, César)', 'Reunión BUK — módulo onboarding (3/08)', 'Demo Tu Recibo con Mandú (18/08) · licencia y respaldo MINTRA recibidos (24/08)'] },
      { period: 'Sep',          items: ['Capacitación Tu Recibo con Gabriela Aguilar (3/09, asistencia sin confirmar)', 'Pedido de status con Alicia, César y Gaby (3/09) — sin fecha'] },
      { period: 'Próximo',      items: ['Backtesting del forms (2 meses de novedades) → piloto 3-4 TOPs', 'Validar Capa 2 por empresa', 'Alcance internacional a fase posterior (con Mobility)'] },
    ],
    workstreams: [
      { name: 'Forms + árbol documental', progress: 80, status: 'active', lead: 'JF',
        next: 'Piloto con 3-4 TOPs',
        tasks: [
          { done: true,  l: 'Dos forms (selección + compensaciones confidencial) que notifican a Alicia' },
          { done: true,  l: 'Árbol de decisión de proceso + árbol documental (Corporate Must / Gate / Confidencial)' },
          { done: true,  l: 'Formulario de activación listo, en pruebas (4/08)' },
          { done: false, l: 'Backtesting + piloto' },
        ] },
      { name: 'Tu Recibo (Mandú by Visma)', progress: 50, status: 'risk', lead: 'JF',
        next: 'Revisar licencia y respaldo legal',
        tasks: [
          { done: true,  l: 'Demo con Gustavo Miranda (18/08)' },
          { done: true,  l: 'Licencia USD 400 + IGV (400 usuarios) y respaldo MINTRA recibidos (24/08)' },
          { done: false, l: 'Revisión interna de licencia y firma electrónica' },
          { done: false, l: 'Capacitación 3/09 — confirmar quién asistió' },
        ] },
      { name: 'Gobierno del frente', progress: 30, status: 'blocked', lead: 'MS',
        next: 'Status con Alicia, César y Gaby',
        tasks: [
          { done: false, l: 'Fecha para la llamada de status (pedida 3/09)' },
          { done: false, l: 'Sign-off de Alicia al roadmap de 4 fases (frenar scope creep)' },
        ] },
    ],
    decisions: [
      { date: '3 sep', who: 'Juan', tag: 'STATUS', title: 'Pedido de llamada de status con Alicia, César y Gaby',
        body: 'Sin fecha al 15/09. Sin ella no hay validación del forms ni decisión sobre Tu Recibo.' },
      { date: 'jul', who: 'Equipo + BCP', tag: 'ALCANCE', title: 'No comprar software: MVP con Office, migrable al HCM',
        body: 'Capa 1 corporativa obligatoria + Capa 2 local por empresa. KPI estrella: time-to-productivity (30/60/90).' },
      { date: '9 abr', who: 'Pablo', tag: 'ORIGEN', title: 'Iniciativa 35 activada',
        body: 'Estandarización del ingreso ejecutivo (onboarding) — frente nuevo del backlog.' },
    ],
    people: {
      partners: [
        { i: 'JF', n: 'Juan Fornaguera', r: 'Lead · forms + Tu Recibo' },
        { i: 'MS', n: 'Mara Schmitman', r: 'Coordinación' },
      ],
      credicorp: [
        { i: 'AR', n: 'Alicia Rivera', r: 'Contraparte · delegó' },
        { i: 'CC', n: 'César Chung', r: 'BCP · forms y árbol documental' },
        { i: 'GA', n: 'Gabriela Aguilar', r: 'BCP · Tu Recibo' },
      ],
    },
  },

  'romy': {
    countdown: { value: '4', unit: 'meses', label: 'Sin actividad del cliente (desde mayo)',
      caption: 'Entregables listos. Propuesta para el 16/09: absorber Movilidad dentro del diseño NineBox en lugar de sostenerlo como frente aparte.' },
    timelineKind: 'phases',
    timeline: [
      { period: 'Estado actual',   items: ['Dormido desde el 21/05 — Romy no volvió a convocar', 'Entregables: diagnóstico, manual interno, manual del empleado, criterios de elegibilidad v2, business case', 'Benchmarks: Philips, Nubank, MeLi, Accenture, Boehringer, Natura, Telefónica, Mercer 2025'] },
      { period: 'Propuesta 16/09', items: ['Absorber Movilidad en el diseño NineBox (Visa, Adidas y Santander conectan desempeño/potencial con movilidad)', 'Mobile Talent Pool: esperar OK de Ross para Talent Development'] },
      { period: 'Bloqueado',       items: ['Agente Movilidad — pausado hasta desbloqueo de IT (Copilot)'] },
    ],
    workstreams: [
      { name: 'Entregables — diagnóstico + manuales', progress: 95, status: 'delivery', lead: 'LP',
        next: 'Desarrollo final en standby',
        tasks: [
          { done: true,  l: 'Benchmark 8 referencias' },
          { done: true,  l: 'Diagnóstico + manuales + criterios v2 + business case' },
          { done: false, l: 'Desarrollo final del playbook (cuando Romy lo pida)' },
        ] },
      { name: 'Mobile Talent Pool', progress: 30, status: 'standby', lead: 'LP',
        next: 'OK de Ross para cross-área',
        tasks: [
          { done: true,  l: 'Iniciativa esbozada' },
          { done: false, l: 'Luz verde de Ross para contactar a Talent Development' },
        ] },
      { name: 'Agente Movilidad', progress: 10, status: 'blocked', lead: 'LP',
        next: 'Esperando IT (Copilot)',
        tasks: [
          { done: true,  l: 'Especificación funcional' },
          { done: false, l: 'Acceso a Copilot Studio (IT)' },
        ] },
    ],
    decisions: [
      { date: '15 sep', who: '+Partners', tag: 'REENCUADRE', title: 'Proponer a Pablo absorber Movilidad en NineBox',
        body: 'Los tres benchs de desempeño conectan potencial y movilidad. Sostenerlo como frente independiente no se justifica sin señal del cliente.' },
      { date: 'may', who: 'Romy + LP', tag: 'STANDBY', title: 'Standby a pedido de Romy',
        body: 'Entregables terminados; el desarrollo final se retoma cuando lo pida. No volvió a convocar.' },
    ],
    people: {
      partners: [
        { i: 'LP', n: 'Lucía Palomeque', r: 'Lead' },
        { i: 'JM', n: 'Jorge Moreno', r: 'Soporte' },
      ],
      credicorp: [
        { i: 'RM', n: 'Romina Mitidieri', r: 'Contraparte · Global Mobility' },
        { i: 'PS', n: 'Pablo Silva', r: 'Sponsor' },
      ],
    },
  },
};

window.DETAIL_DATA = DETAIL_DATA;
