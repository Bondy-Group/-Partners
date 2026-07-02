/* global React, FadeIn, MEETINGS_HISTORY */

// ─────────────────────────────────────────────────────────────
// Pantalla · Reuniones — historial consolidado del programa.
// Fuente: MEETINGS_HISTORY (v2/meetings-data.jsx).
// Stats de participación + filtros + resumen liviano por reunión.
// ─────────────────────────────────────────────────────────────

const R_NAVY = '#1B2A4A';
const R_INK = '#0F1419';
const R_SLATE = '#475569';
const R_MUTE = '#94A3B8';
const R_LINE = '#E2E8F0';
const R_SURFACE = '#F8FAFC';

const R_PROJECTS = {
  'hub-brasil': { label: 'HUB Brasil', color: '#C832A0' },
  'alicia':     { label: 'Onboarding TOPS', color: '#2BD6C8' },
  'romy':       { label: 'Mobility', color: '#F59E0B' },
  'desempeno':  { label: 'Desempeño / GiseGPT', color: '#7C3AED' },
  'partners':   { label: 'Interna / Pablo', color: '#1B2A4A' },
};

const R_MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

function rFmtDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${R_MONTHS[m - 1]} ${String(y).slice(2)}`;
}
function rMonthKey(iso) { return iso.slice(0, 7); }
function rMonthLabel(key) {
  const [y, m] = key.split('-').map(Number);
  return `${R_MONTHS[m - 1]} ${String(y).slice(2)}`;
}

function RStat({ label, value, sub, color }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${R_LINE}`, borderRadius: 10, padding: '14px 16px', flex: 1, minWidth: 130 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: R_MUTE }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: color || R_INK, fontFamily: 'JetBrains Mono, monospace', marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: R_SLATE, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function RProjectPill({ p, small }) {
  const meta = R_PROJECTS[p] || R_PROJECTS.partners;
  return (
    <span style={{
      display: 'inline-block', padding: small ? '1px 8px' : '2px 10px', borderRadius: 999,
      fontSize: small ? 10 : 11, fontWeight: 600, whiteSpace: 'nowrap',
      background: `${meta.color}1A`, color: meta.color === '#1B2A4A' ? R_NAVY : meta.color,
      border: `1px solid ${meta.color}40`,
    }}>{meta.label}</span>
  );
}

function ReunionesView() {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const all = window.MEETINGS_HISTORY || [];

  const stats = React.useMemo(() => {
    const byProject = {}; const byMonth = {}; const byPerson = {}; const orgs = new Set();
    let withLink = 0;
    all.forEach((m) => {
      byProject[m.p] = (byProject[m.p] || 0) + 1;
      const mk = rMonthKey(m.f);
      byMonth[mk] = (byMonth[mk] || 0) + 1;
      if (m.link) withLink++;
      if (m.ext) orgs.add(m.ext);
      (m.who || []).forEach((w) => {
        if (w === 'Equipo +Partners' || w === 'Credicorp' || w === 'BCP') return;
        byPerson[w] = (byPerson[w] || 0) + 1;
      });
    });
    const months = Object.keys(byMonth).sort();
    const topPeople = Object.entries(byPerson).sort((a, b) => b[1] - a[1]).slice(0, 8);
    return { byProject, byMonth, months, topPeople, withLink, orgs: orgs.size, total: all.length };
  }, [all]);

  const filtered = all
    .filter((m) => filter === 'all' || m.p === filter)
    .filter((m) => {
      if (!search) return true;
      const hay = `${m.t} ${m.r || ''} ${(m.who || []).join(' ')} ${m.ext || ''}`.toLowerCase();
      return hay.includes(search.toLowerCase());
    })
    .slice()
    .sort((a, b) => (a.f < b.f ? 1 : -1));

  // agrupar por mes (desc)
  const groups = [];
  filtered.forEach((m) => {
    const mk = rMonthKey(m.f);
    const g = groups[groups.length - 1];
    if (g && g.key === mk) g.items.push(m);
    else groups.push({ key: mk, items: [m] });
  });

  const maxMonth = Math.max(1, ...stats.months.map((k) => stats.byMonth[k]));
  const maxPerson = Math.max(1, ...(stats.topPeople.map((e) => e[1])));

  return (
    <div data-app-scroll style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
    <div style={{ padding: '28px 32px', maxWidth: 1180, margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <FadeIn>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: R_INK }}>Reuniones del programa</h2>
            <div style={{ fontSize: 12, color: R_SLATE, marginTop: 4 }}>
              Historial consolidado dic-2025 → jul-2026 · resúmenes livianos · transcripts linkeados donde existen
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={80}>
        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <RStat label="Reuniones" value={stats.total} sub="documentadas en 8 meses" />
          <RStat label="Con transcript" value={`${Math.round((stats.withLink / Math.max(1, stats.total)) * 100)}%`} sub={`${stats.withLink} con link`} color="#C832A0" />
          <RStat label="Orgs externas" value={`+${stats.orgs}`} sub="benchmarks e intercambios" color="#2BD6C8" />
          <RStat label="Ritmo" value={(stats.total / 30).toFixed(1)} sub="reuniones por semana (prom.)" />
        </div>
      </FadeIn>

      {/* Charts */}
      <FadeIn delay={160}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12, marginTop: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${R_LINE}`, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: R_INK, marginBottom: 12 }}>Reuniones por mes</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 90 }}>
              {stats.months.map((k) => (
                <div key={k} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: R_SLATE }}>{stats.byMonth[k]}</div>
                  <div style={{ width: '70%', borderRadius: '4px 4px 0 0', background: R_NAVY, opacity: 0.85, height: `${(stats.byMonth[k] / maxMonth) * 60}px`, minHeight: 3 }} />
                  <div style={{ fontSize: 9, color: R_MUTE }}>{rMonthLabel(k)}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${R_LINE}`, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: R_INK, marginBottom: 12 }}>Participación (top asistentes)</div>
            {stats.topPeople.map(([name, n]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <div style={{ width: 110, fontSize: 11, color: R_SLATE, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                <div style={{ flex: 1, height: 8, background: R_SURFACE, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${(n / maxPerson) * 100}%`, height: '100%', background: '#2BD6C8' }} />
                </div>
                <div style={{ width: 26, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: R_SLATE, textAlign: 'right' }}>{n}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: `1px solid ${R_LINE}`, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: R_INK, marginBottom: 12 }}>Por frente</div>
            {Object.entries(R_PROJECTS).map(([id, meta]) => {
              const n = stats.byProject[id] || 0;
              const max = Math.max(1, ...Object.values(stats.byProject));
              return (
                <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 120, fontSize: 11, color: R_SLATE }}>{meta.label}</div>
                  <div style={{ flex: 1, height: 8, background: R_SURFACE, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${(n / max) * 100}%`, height: '100%', background: meta.color }} />
                  </div>
                  <div style={{ width: 26, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: R_SLATE, textAlign: 'right' }}>{n}</div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Filtros */}
      <FadeIn delay={240}>
        <div style={{ display: 'flex', gap: 8, marginTop: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          {[['all', 'Todas'], ...Object.entries(R_PROJECTS).map(([id, m]) => [id, m.label])].map(([id, label]) => (
            <button key={id} onClick={() => setFilter(id)} style={{
              padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: 'pointer',
              border: `1px solid ${filter === id ? R_NAVY : R_LINE}`,
              background: filter === id ? R_NAVY : '#fff',
              color: filter === id ? '#fff' : R_SLATE,
            }}>{label}{id !== 'all' ? ` · ${stats.byProject[id] || 0}` : ` · ${stats.total}`}</button>
          ))}
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar reunión, persona, empresa…"
            style={{ marginLeft: 'auto', padding: '6px 12px', borderRadius: 8, border: `1px solid ${R_LINE}`, fontSize: 12, minWidth: 220, outline: 'none' }} />
        </div>
      </FadeIn>

      {/* Lista agrupada por mes */}
      <div style={{ marginTop: 16 }}>
        {groups.map((g) => (
          <div key={g.key} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: R_MUTE, margin: '14px 0 8px 2px' }}>
              {rMonthLabel(g.key)} · {g.items.length} {g.items.length === 1 ? 'reunión' : 'reuniones'}
            </div>
            <div style={{ background: '#fff', border: `1px solid ${R_LINE}`, borderRadius: 10, overflow: 'hidden' }}>
              {g.items.map((m, i) => (
                <div key={`${m.f}-${i}`} style={{
                  display: 'flex', gap: 14, padding: '11px 16px', alignItems: 'flex-start',
                  borderTop: i === 0 ? 'none' : `1px solid ${R_SURFACE}`,
                }}>
                  <div style={{ width: 70, flexShrink: 0, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: R_SLATE, paddingTop: 2 }}>{rFmtDate(m.f)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: R_INK }}>{m.t}</span>
                      <RProjectPill p={m.p} small />
                      {m.ext && (
                        <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 8px', borderRadius: 999, background: R_SURFACE, border: `1px solid ${R_LINE}`, color: R_SLATE }}>
                          {m.ext}
                        </span>
                      )}
                      {m.link && (
                        <a href={m.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, fontWeight: 600, color: '#C832A0', textDecoration: 'none' }}>
                          transcript ↗
                        </a>
                      )}
                    </div>
                    {m.r && <div style={{ fontSize: 12, color: R_SLATE, marginTop: 3 }}>{m.r}</div>}
                    <div style={{ fontSize: 10.5, color: R_MUTE, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {(m.who || []).join(' · ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: R_MUTE, fontSize: 13 }}>Sin resultados para ese filtro.</div>
        )}
      </div>
    </div>
    </div>
  );
}

window.ReunionesView = ReunionesView;
