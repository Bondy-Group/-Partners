/* global React, FadeIn, MEETINGS_HISTORY */

// ─────────────────────────────────────────────────────────────
// Pantalla · Reuniones — rediseño 2a (handoff jul-2026).
// KPIs + 3 gráficos + maestro–detalle con minuta y acuerdos.
// Fuente de datos: MEETINGS_HISTORY (v2/meetings-data.jsx).
// ─────────────────────────────────────────────────────────────

const R_INK = '#0F1419';
const R_SLATE = '#475569';
const R_MUTE = '#94A3B8';
const R_LINE = '#E2E8F0';
const R_SURFACE = '#F8FAFC';
const R_NAVY = '#1B2A4A';
const R_PINK = '#C832A0';

const R_CARD = {
  background: '#fff', border: `1px solid ${R_LINE}`, borderRadius: 16,
  boxShadow: '0 1px 2px rgba(15,20,25,0.06)', padding: '22px 24px',
};

// frente: id de proyecto → label + tints (pill) + color de gráfico
const R_FRENTES = {
  'hub-brasil': { label: 'HUB Brasil',          bg: '#FBEAF5', fg: '#C832A0', chart: '#C832A0' },
  'alicia':     { label: 'Onboarding TOPS',     bg: '#E4FAF7', fg: '#0E7C72', chart: '#14B8A6' },
  'romy':       { label: 'Mobility',            bg: '#FEF3E2', fg: '#B45309', chart: '#F59E0B' },
  'desempeno':  { label: 'Desempeño / GiseGPT', bg: '#EEECFA', fg: '#4A3F9A', chart: '#4A3F9A' },
  'partners':   { label: 'Interna / Pablo',     bg: '#EDF1F7', fg: '#1B2A4A', chart: '#1B2A4A' },
};

const R_STATUS = {
  hecha:    { bg: '#E4FAF7', fg: '#0E7C72', dot: '#14B8A6', label: 'Hecha' },
  agendada: { bg: '#EDF1F7', fg: '#475569', dot: '#94A3B8', label: 'Agendada' },
  cancelada:{ bg: '#FEECF0', fg: '#E11D48', dot: '#E11D48', label: 'Cancelada' },
};

const R_MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const R_DAYS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];

function rDateShort(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${R_MONTHS[m - 1]} ${String(y).slice(2)}`;
}
function rDateLong(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const wd = R_DAYS[new Date(y, m - 1, d).getDay()];
  return `${wd} ${d} ${R_MONTHS[m - 1].toLowerCase()} ${y}`;
}
function rAvatarColor(name) {
  const palette = [['#FBEAF5','#C832A0'],['#E4FAF7','#0E7C72'],['#EDF1F7','#1B2A4A'],['#EEECFA','#4A3F9A'],['#FEF3E2','#B45309']];
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}
function rInitials(name) {
  const p = name.trim().split(/\s+/);
  return (p[0][0] + (p[1] ? p[1][0] : '')).toUpperCase();
}

function REyebrow({ children, style }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: R_MUTE, ...style }}>
      {children}
    </div>
  );
}

function RPill({ bg, fg, dot, children, big }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: big ? 13 : 12, fontWeight: 600, color: fg, background: bg,
      padding: big ? '4px 11px' : '3px 9px', borderRadius: 9999, whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: big ? 7 : 6, height: big ? 7 : 6, borderRadius: 9999, background: dot, display: 'inline-block' }} />}
      {children}
    </span>
  );
}

function RIcoSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={R_MUTE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ReunionesView() {
  const raw = window.MEETINGS_HISTORY || [];

  // Enriquecer + ordenar (desc por fecha)
  const meetings = React.useMemo(() => {
    return raw.map((m, i) => {
      const fr = R_FRENTES[m.p] || R_FRENTES.partners;
      const st = R_STATUS[m.s || 'hecha'] || R_STATUS.hecha;
      const actions = m.a || [];
      const openCount = actions.filter(a => !a.done).length;
      const who = (m.who || []);
      return {
        id: `${m.f}-${i}`, f: m.f, title: m.t, frente: fr, status: st,
        org: m.ext || null, link: m.link || null,
        who, notes: m.r ? [m.r] : [], actions, openCount,
      };
    }).sort((a, b) => (a.f < b.f ? 1 : -1));
  }, [raw]);

  const [selectedId, setSelectedId] = React.useState(meetings.length ? meetings[0].id : null);
  const [search, setSearch] = React.useState('');

  const filtered = meetings.filter((m) => {
    if (!search) return true;
    const hay = `${m.title} ${m.notes.join(' ')} ${m.who.join(' ')} ${m.org || ''} ${m.frente.label}`.toLowerCase();
    return hay.includes(search.toLowerCase());
  });

  const selected = filtered.find(m => m.id === selectedId) || filtered[0] || meetings[0];

  // Agregados
  const stats = React.useMemo(() => {
    const byMonth = {}; const byPerson = {}; const byFrente = {}; const orgs = new Set();
    let withLink = 0;
    meetings.forEach((m) => {
      const mk = m.f.slice(0, 7);
      byMonth[mk] = (byMonth[mk] || 0) + 1;
      byFrente[m.frente.label] = (byFrente[m.frente.label] || 0) + 1;
      if (m.link) withLink++;
      if (m.org) orgs.add(m.org);
      m.who.forEach((w) => {
        if (w === 'Equipo +Partners' || w === 'Credicorp' || w === 'BCP') return;
        byPerson[w] = (byPerson[w] || 0) + 1;
      });
    });
    const months = Object.keys(byMonth).sort();
    const topPeople = Object.entries(byPerson).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const frentes = Object.entries(R_FRENTES).map(([id, f]) => ({ ...f, value: byFrente[f.label] || 0 }))
      .sort((a, b) => b.value - a.value);
    return { byMonth, months, topPeople, frentes, withLink, orgs: orgs.size, total: meetings.length };
  }, [meetings]);

  const maxMonth = Math.max(1, ...stats.months.map(k => stats.byMonth[k]));
  const maxPerson = Math.max(1, ...stats.topPeople.map(e => e[1]));
  const maxFrente = Math.max(1, ...stats.frentes.map(f => f.value));

  const kpis = [
    { label: 'Reuniones', value: String(stats.total), sub: 'documentadas en 8 meses', color: R_INK },
    { label: 'Con transcript', value: `${Math.round((stats.withLink / Math.max(1, stats.total)) * 100)}%`, sub: `${stats.withLink} con link`, color: R_PINK },
    { label: 'Orgs externas', value: `+${stats.orgs}`, sub: 'benchmarks e intercambios', color: '#0E7C72' },
    { label: 'Ritmo', value: (stats.total / 30).toFixed(1), sub: 'reuniones por semana (prom.)', color: R_NAVY },
  ];

  return (
    <div data-app-scroll style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
      <div style={{ padding: '28px 32px 40px', maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>

        {/* Encabezado */}
        <FadeIn>
          <div>
            <h2 style={{ margin: 0, fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', color: R_INK }}>Reuniones del programa</h2>
            <div style={{ fontSize: 16, color: R_SLATE, marginTop: 4 }}>Historial consolidado dic-2025 → jul-2026</div>
          </div>
        </FadeIn>

        {/* KPIs */}
        <FadeIn delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {kpis.map((s) => (
              <div key={s.label} style={{ ...R_CARD, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <REyebrow>{s.label}</REyebrow>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 38, fontWeight: 600, lineHeight: 1, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 14, color: R_SLATE }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Gráficos */}
        <FadeIn delay={160}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            <div style={R_CARD}>
              <div style={{ fontSize: 15, fontWeight: 600, color: R_INK, marginBottom: 20 }}>Reuniones por mes</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, height: 150 }}>
                {stats.months.map((k) => {
                  const [y, m] = k.split('-').map(Number);
                  return (
                    <div key={k} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: R_SLATE }}>{stats.byMonth[k]}</div>
                      <div style={{ width: '100%', height: `${(stats.byMonth[k] / maxMonth) * 100}%`, background: R_NAVY, borderRadius: '5px 5px 0 0', minHeight: 3 }} />
                      <div style={{ fontSize: 10, color: R_MUTE, letterSpacing: '0.02em' }}>{R_MONTHS[m - 1]} {String(y).slice(2)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={R_CARD}>
              <div style={{ fontSize: 15, fontWeight: 600, color: R_INK, marginBottom: 18 }}>Participación (top asistentes)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {stats.topPeople.map(([name, n]) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 96, fontSize: 13, color: '#334155', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                    <div style={{ flex: 1, height: 10, background: '#F1F5F9', borderRadius: 9999, overflow: 'hidden' }}>
                      <div style={{ width: `${(n / maxPerson) * 100}%`, height: '100%', background: '#2BD6C8', borderRadius: 9999 }} />
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: R_SLATE, width: 26, textAlign: 'right', flexShrink: 0 }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={R_CARD}>
              <div style={{ fontSize: 15, fontWeight: 600, color: R_INK, marginBottom: 18 }}>Por frente</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {stats.frentes.map((f) => (
                  <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#334155' }}>{f.label}</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: R_SLATE }}>{f.value}</span>
                    </div>
                    <div style={{ height: 10, background: '#F1F5F9', borderRadius: 9999, overflow: 'hidden' }}>
                      <div style={{ width: `${(f.value / maxFrente) * 100}%`, height: '100%', background: f.chart, borderRadius: 9999 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Maestro–detalle */}
        <FadeIn delay={240}>
          <div style={{
            display: 'grid', gridTemplateColumns: '440px 1fr', background: '#fff',
            border: `1px solid ${R_LINE}`, borderRadius: 16,
            boxShadow: '0 12px 32px rgba(27,42,74,0.10)', overflow: 'hidden', height: 720,
          }}>
            {/* Lista */}
            <div style={{ borderRight: `1px solid ${R_LINE}`, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ padding: '20px 22px 14px', borderBottom: `1px solid ${R_LINE}` }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: R_INK }}>Reuniones</div>
                <div style={{ fontSize: 13, color: R_MUTE, marginTop: 2 }}>{filtered.length} documentadas · dic 25 → jul 26</div>
                <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, background: R_SURFACE, border: `1px solid ${R_LINE}`, borderRadius: 10, padding: '9px 12px' }}>
                  <RIcoSearch />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar reunión, persona, empresa…"
                    style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: R_INK, fontFamily: 'inherit' }} />
                </div>
              </div>
              <div style={{ overflow: 'auto', flex: 1, minHeight: 0 }}>
                {filtered.map((m) => {
                  const isSel = selected && m.id === selected.id;
                  return (
                    <div key={m.id} onClick={() => setSelectedId(m.id)}
                      onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = R_SURFACE; }}
                      onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = 'transparent'; }}
                      style={{
                        padding: '16px 22px', borderBottom: '1px solid #EEF1F5',
                        borderLeft: isSel ? `3px solid ${R_PINK}` : '3px solid transparent',
                        background: isSel ? '#fff' : 'transparent',
                        boxShadow: isSel ? 'inset 0 0 0 1px #F1E3EC' : 'none',
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8,
                        transition: 'background 150ms cubic-bezier(.2,0,0,1)',
                      }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: R_MUTE }}>{rDateShort(m.f)}</span>
                        <RPill bg={m.status.bg} fg={m.status.fg} dot={m.status.dot}>{m.status.label}</RPill>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: R_INK, lineHeight: 1.35 }}>{m.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <RPill bg={m.frente.bg} fg={m.frente.fg}>{m.frente.label}</RPill>
                        <span style={{ fontSize: 12, color: R_MUTE }}>· {m.who.length} asist.</span>
                        {m.openCount > 0 && <RPill bg="#FEF3E2" fg="#B45309">{m.openCount} pendientes</RPill>}
                      </div>
                    </div>
                  );
                })}
                {filtered.length === 0 && (
                  <div style={{ padding: 32, textAlign: 'center', color: R_MUTE, fontSize: 14 }}>Sin resultados.</div>
                )}
              </div>
            </div>

            {/* Detalle */}
            {selected ? (
              <div style={{ overflow: 'auto', minHeight: 0, padding: '32px 36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <RPill big bg={selected.frente.bg} fg={selected.frente.fg}>{selected.frente.label}</RPill>
                  <RPill big bg={selected.status.bg} fg={selected.status.fg} dot={selected.status.dot}>{selected.status.label}</RPill>
                  {selected.org && <RPill big bg={R_SURFACE} fg={R_SLATE}>{selected.org}</RPill>}
                </div>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: R_INK, lineHeight: 1.2 }}>{selected.title}</h2>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: R_SLATE, marginTop: 8 }}>
                  {rDateLong(selected.f)}
                  {selected.link && (
                    <a href={selected.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 12, fontSize: 13, fontWeight: 600, color: R_PINK, textDecoration: 'none' }}>
                      transcript ↗
                    </a>
                  )}
                </div>

                <div style={{ marginTop: 28 }}>
                  <REyebrow style={{ marginBottom: 12 }}>Asistentes</REyebrow>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {selected.who.map((n) => {
                      const [bg, fg] = rAvatarColor(n);
                      return (
                        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, background: R_SURFACE, border: `1px solid ${R_LINE}`, borderRadius: 9999, padding: '5px 12px 5px 5px' }}>
                          <span style={{ width: 26, height: 26, borderRadius: 9999, background: bg, color: fg, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{rInitials(n)}</span>
                          <span style={{ fontSize: 14, color: R_INK }}>{n}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginTop: 30 }}>
                  <REyebrow style={{ marginBottom: 12 }}>Minuta</REyebrow>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {selected.notes.map((n, i) => (
                      <li key={i} style={{ display: 'flex', gap: 12, fontSize: 16, lineHeight: 1.6, color: '#334155' }}>
                        <span style={{ color: R_PINK, fontWeight: 700, flexShrink: 0 }}>—</span><span>{n}</span>
                      </li>
                    ))}
                    {selected.notes.length === 0 && (
                      <li style={{ fontSize: 14, color: R_MUTE, fontStyle: 'italic' }}>Sin minuta registrada.</li>
                    )}
                  </ul>
                </div>

                <div style={{ marginTop: 30, background: R_SURFACE, border: `1px solid ${R_LINE}`, borderRadius: 16, padding: '22px 24px' }}>
                  <REyebrow style={{ marginBottom: 14 }}>Acuerdos y pendientes</REyebrow>
                  {selected.actions.length > 0 ? (
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {selected.actions.map((a, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          <span style={{
                            width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                            border: `2px solid ${a.done ? '#14B8A6' : '#CBD5E1'}`,
                            background: a.done ? '#14B8A6' : '#FFFFFF',
                            color: '#fff', fontSize: 12, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>{a.done ? '✓' : ''}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 15, lineHeight: 1.4, color: a.done ? R_MUTE : '#334155', textDecoration: a.done ? 'line-through' : 'none' }}>{a.text}</div>
                            <div style={{ fontSize: 13, color: R_MUTE, marginTop: 3 }}>Responsable: {a.owner}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ fontSize: 14, color: R_MUTE, fontStyle: 'italic' }}>Sin acuerdos registrados.</div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: R_MUTE, fontSize: 14 }}>Seleccioná una reunión.</div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

window.ReunionesView = ReunionesView;
