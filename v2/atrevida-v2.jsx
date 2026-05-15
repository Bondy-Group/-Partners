/* global React, PROJECTS, TEAM_PARTNERS, TEAM_CREDICORP, GANTT, WEEKS,
   useTweaks, accentColor, StatusPill, StatusDot, Avatar, AvatarStack,
   ProgressBar, StatusFilter, DetailView, FadeIn, Stagger */

// ─────────────────────────────────────────────────────────────
// DIRECCIÓN ② v2 — Atrevida · iteración
// Cambios desde v1:
//  · Hero menos alarmista — info-strip con la semana en curso, sin
//    "1 frente arde". Headline operativo.
//  · Buscador global persistente arriba.
//  · Filtros sticky encima de la tabla (visibles siempre).
//  · Click en fila → navega a la página de detalle del proyecto
//    (en el mismo artboard, con botón volver). No más slide-over.
//  · Animaciones de entrada con stagger.
// ─────────────────────────────────────────────────────────────

const V2_NAVY = '#1B2A4A';
const V2_NAVY_ALT = '#2A2560';
const V2_INK = '#0F1419';
const V2_SLATE = '#475569';
const V2_MUTE = '#94A3B8';
const V2_LINE = '#E2E8F0';
const V2_SURFACE = '#F8FAFC';

function AtrevidaV2({ initialPage = 'dashboard', onPageChange }) {
  const controlled = typeof onPageChange === 'function';
  const [internalPage, setInternalPage] = React.useState(initialPage);
  // When controlled, the URL/parent owns the page; internal state mirrors
  // initialPage so navigation initiated from inside still re-renders.
  React.useEffect(() => {
    if (controlled) setInternalPage(initialPage);
  }, [controlled, initialPage]);

  const page = internalPage;
  const setPage = React.useCallback((next) => {
    setInternalPage(next);
    if (controlled) onPageChange(next);
  }, [controlled, onPageChange]);

  return (
    <DashboardShell page={page} setPage={setPage}>
      {page === 'dashboard'
        ? <DashboardBody setPage={setPage} />
        : <DetailView projectId={page} embedded />}
    </DashboardShell>
  );
}

// Per-project preview wrapper — same shell, opens to a project page.
// Sidebar Frentes links still navigate (within the artboard) so the
// user can hop across projects without going through dashboard.
function ProjectPage({ projectId }) {
  const [page, setPage] = React.useState(projectId);
  return (
    <DashboardShell page={page} setPage={setPage}>
      {page === 'dashboard'
        ? <DashboardBody setPage={setPage} />
        : <DetailView projectId={page} embedded />}
    </DashboardShell>
  );
}

// ─── Shell: sidebar (always) + body ────────────────────────────
function DashboardShell({ page, setPage, children }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: V2_SURFACE, color: V2_INK,
      fontFamily: '"Inter", system-ui, sans-serif',
      display: 'grid', gridTemplateColumns: '220px 1fr',
      overflow: 'hidden', position: 'relative',
    }}>
      <V2Sidebar page={page} setPage={setPage} />
      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

// ─── Dashboard body (extracted) ────────────────────────────────
function DashboardBody({ setPage }) {
  const { t } = useTweaks();
  const accent = accentColor(t.accent);
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [sort, setSort] = React.useState('risk');
  const dense = t.density !== 'comfy';

  const filtered = PROJECTS
    .filter((p) => filter === 'all' || p.status === filter)
    .filter((p) => !search || (p.title + p.subtitle + p.streams + p.tag).toLowerCase().includes(search.toLowerCase()));

  return (
    <>
        {/* Topbar with search */}
        <V2Topbar search={search} setSearch={setSearch} accent={accent} />

        {/* Scrollable content */}
        <div style={{ overflow: 'auto', flex: 1, padding: '20px 28px 32px' }}>
          <FadeIn delay={0}>
            <V2InfoStrip accent={accent} />
          </FadeIn>

          {/* Stat row — 4 small, no alarmist big one */}
          <Stagger step={70} start={80} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
            <V2Stat label="Proyectos" value="4" trend="—"   sub="Activos" />
            <V2Stat label="En curso"  value="2" trend="+1" sub="vs marzo" tone="teal" />
            <V2Stat label="En riesgo" value="1" trend="="  sub="HUB Brasil — 13d" tone="warn" accent={accent} />
            <V2Stat label="Reuniones / sem" value="12" trend="+4" sub="esta semana" />
          </Stagger>

          {/* Gantt */}
          <FadeIn delay={400} style={{ marginTop: 20 }}>
            <V2Gantt accent={accent} />
          </FadeIn>

          {/* Frentes section — sticky filter bar */}
          <div style={{ marginTop: 24 }}>
            <FadeIn delay={520}>
              <V2FilterBar
                filter={filter} setFilter={setFilter}
                sort={sort} setSort={setSort}
                count={filtered.length} total={PROJECTS.length}
                accent={accent}
              />
            </FadeIn>

            <FadeIn delay={600}>
              <V2Table projects={filtered} onOpen={(p) => setPage(p.id)} accent={accent} dense={dense} />
            </FadeIn>
          </div>

          {/* Team + Admin */}
          <FadeIn delay={720} style={{ marginTop: 24 }}>
            <V2TeamAdmin showAdmin={t.showAdmin} accent={accent} />
          </FadeIn>
        </div>
    </>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────
function V2Sidebar({ page, setPage }) {
  return (
    <aside style={{
      background: V2_NAVY, color: '#fff', padding: '20px 16px',
      display: 'flex', flexDirection: 'column', gap: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px' }}>
        <img src="assets/logos/partners-wordmark.svg" alt="+Partners"
          style={{ height: 22, filter: 'brightness(0) invert(1)' }} />
      </div>

      <div>
        <V2SideLabel>Engagement</V2SideLabel>
        <V2SideItem l="Resumen"      sel={page === 'dashboard'} onClick={() => setPage && setPage('dashboard')} />
        <V2SideItem l="Frentes"      n="4"  onClick={() => setPage && setPage('dashboard')} />
        <V2SideItem l="Timeline" />
        <V2SideItem l="Reuniones"    n="12" />
        <V2SideItem l="Entregables"  n="7" />
        <V2SideItem l="Decisiones"   n="14" />
        <V2SideItem l="Riesgos"      n="4" />
      </div>

      <div>
        <V2SideLabel>Frentes</V2SideLabel>
        {PROJECTS.map((p) => {
          const sel = page === p.id;
          const short = p.title.split('—')[0].trim().split('/')[0].trim();
          return (
            <div key={p.id} onClick={() => setPage && setPage(p.id)}
              onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = 'rgba(255,255,255,.04)'; }}
              onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
                fontSize: 12,
                background: sel ? 'rgba(255,255,255,.10)' : 'transparent',
                color: sel ? '#fff' : 'rgba(255,255,255,.85)',
                fontWeight: sel ? 600 : 500,
                marginBottom: 1, transition: 'background .15s',
                position: 'relative',
              }}>
              {sel && (
                <span style={{
                  position: 'absolute', left: -16, top: 6, bottom: 6, width: 3,
                  background: '#fff', borderRadius: 2,
                }} />
              )}
              <StatusDot status={p.status} size={7} />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{short}</span>
              <span style={{ fontSize: 10, color: sel ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.4)', fontFamily: 'JetBrains Mono, monospace' }}>{p.progress}</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', padding: 12, background: 'rgba(255,255,255,.04)', borderRadius: 8 }}>
        <V2SideLabel>Cliente</V2SideLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <img src="assets/logos/credicorp.png" alt="Credicorp"
            style={{ height: 14, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginTop: 8, lineHeight: 1.4 }}>
          Sponsor: Pablo Silva<br />Inicio: ene 2026
        </div>
      </div>
    </aside>
  );
}

function V2SideLabel({ children }) {
  return (
    <div style={{ fontSize: 9, color: 'rgba(255,255,255,.45)', fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>
      {children}
    </div>
  );
}
function V2SideItem({ l, n, sel, onClick }) {
  const interactive = !!onClick;
  return (
    <div onClick={onClick}
      onMouseEnter={(e) => { if (!sel && interactive) e.currentTarget.style.background = 'rgba(255,255,255,.04)'; }}
      onMouseLeave={(e) => { if (!sel && interactive) e.currentTarget.style.background = 'transparent'; }}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 10px', borderRadius: 6, cursor: interactive ? 'pointer' : 'default',
        background: sel ? 'rgba(255,255,255,.10)' : 'transparent',
        fontSize: 13, fontWeight: sel ? 600 : 500,
        color: sel ? '#fff' : interactive ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.5)',
        marginBottom: 1, transition: 'background .15s',
      }}>
      <span>{l}</span>
      {n && <span style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', fontFamily: 'JetBrains Mono, monospace' }}>{n}</span>}
    </div>
  );
}

// ─── Topbar con buscador global ─────────────────────────────────
function V2Topbar({ search, setSearch, accent }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{
      padding: '12px 28px', borderBottom: `1px solid ${V2_LINE}`,
      background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(12px)',
      display: 'grid', gridTemplateColumns: '1fr minmax(320px, 480px) 1fr', alignItems: 'center', gap: 16,
    }}>
      {/* breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, color: V2_MUTE, fontWeight: 500 }}>+Partners</span>
        <span style={{ fontSize: 12, color: V2_MUTE }}>/</span>
        <span style={{ fontSize: 12, color: V2_MUTE, fontWeight: 500 }}>Credicorp</span>
        <span style={{ fontSize: 12, color: V2_MUTE }}>/</span>
        <span style={{ fontSize: 13, color: V2_INK, fontWeight: 600 }}>Resumen</span>
      </div>

      {/* search */}
      <div style={{
        position: 'relative',
        border: `1px solid ${focus ? accent : V2_LINE}`,
        background: '#fff', borderRadius: 10,
        boxShadow: focus ? `0 0 0 3px ${accent}22` : 'none',
        transition: 'all .15s',
      }}>
        <span style={{
          position: 'absolute', top: 9, left: 12, fontSize: 13, color: V2_MUTE,
          pointerEvents: 'none',
        }}>⌕</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Buscar frente, persona, decisión, transcript…"
          style={{
            width: '100%', border: 'none', background: 'transparent',
            padding: '8px 70px 8px 32px', fontSize: 13, color: V2_INK,
            fontFamily: 'inherit', outline: 'none',
          }}
        />
        <span style={{
          position: 'absolute', top: 8, right: 10,
          fontSize: 10, padding: '2px 6px', background: V2_SURFACE,
          color: V2_SLATE, fontFamily: 'JetBrains Mono, monospace',
          border: `1px solid ${V2_LINE}`, borderRadius: 4,
        }}>⌘ K</span>
      </div>

      {/* right side actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 10px', background: V2_SURFACE, borderRadius: 6,
          fontSize: 12, color: V2_SLATE, border: `1px solid ${V2_LINE}`,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2BD6C8' }} />
          Sincronizado · hace 4 min
        </div>
        <button style={{
          background: V2_NAVY, color: '#fff', border: 'none', padding: '7px 12px',
          borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>+</span>
          Reunión
        </button>
        <Avatar initials="MS" size={28} bg={V2_NAVY} />
      </div>
    </div>
  );
}

// ─── Info-strip · semana en curso (reemplaza el hero alarmista) ─
function V2InfoStrip({ accent }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28, alignItems: 'center',
      background: '#fff', border: `1px solid ${V2_LINE}`,
      borderRadius: 12, padding: '16px 22px',
    }}>
      <div>
        <div style={{ fontSize: 10, color: V2_MUTE, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>
          Semana del 14 de abril
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: V2_INK, letterSpacing: -0.3, marginTop: 4 }}>
          Movilidad entrega · ILP arranca · CNPJ a 13 días
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, paddingLeft: 28, borderLeft: `1px solid ${V2_LINE}` }}>
        <V2InfoCell n="12" l="reuniones" sub="6 +Partners · 6 mixtas" />
        <V2InfoCell n="3"  l="entregables" sub="próximos 7 días" />
        <V2InfoCell n="1"  l="hito crítico" sub="28 abr · CNPJ" accent={accent} warn />
      </div>
      <button style={{
        background: 'transparent', border: `1px solid ${V2_LINE}`,
        padding: '9px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
        color: V2_INK, cursor: 'pointer', fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        Ver agenda <span style={{ fontFamily: 'JetBrains Mono, monospace', color: V2_MUTE }}>→</span>
      </button>
    </div>
  );
}
function V2InfoCell({ n, l, sub, accent, warn }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
        <span style={{
          fontSize: 22, fontWeight: 700,
          color: warn ? accent : V2_INK,
          letterSpacing: -0.4, fontVariantNumeric: 'tabular-nums', lineHeight: 1,
        }}>{n}</span>
        <span style={{ fontSize: 13, color: V2_SLATE, fontWeight: 500 }}>{l}</span>
      </div>
      <div style={{ fontSize: 11, color: V2_MUTE, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

// ─── Stat card · small ──────────────────────────────────────────
function V2Stat({ label, value, trend, sub, tone, accent }) {
  const color = tone === 'warn' ? (accent || '#C832A0')
              : tone === 'teal' ? '#0F8E3F'
              : tone === 'red' ? '#E11D48'
              : V2_NAVY;
  return (
    <div style={{
      background: '#fff', border: `1px solid ${V2_LINE}`, borderRadius: 12, padding: '16px 18px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: V2_MUTE, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontSize: 10, color: V2_MUTE, fontFamily: 'JetBrains Mono, monospace' }}>{trend}</span>
      </div>
      <div style={{
        fontSize: 36, fontWeight: 700, marginTop: 4, lineHeight: 1, letterSpacing: -0.8,
        fontVariantNumeric: 'tabular-nums', color,
      }}>{value}</div>
      <div style={{ fontSize: 11, color: V2_SLATE, marginTop: 6 }}>{sub}</div>
    </div>
  );
}

// ─── Gantt (lifted from v1) ─────────────────────────────────────
function V2Gantt({ accent }) {
  const totalWeeks = WEEKS.length;
  return (
    <div style={{ background: '#fff', border: `1px solid ${V2_LINE}`, borderRadius: 12, padding: '18px 0 6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 20px 14px' }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: V2_INK }}>Timeline · 10 semanas</h3>
        <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
          {[
            ['Riesgo', accent], ['En curso', '#2BD6C8'], ['Entregable', V2_NAVY], ['Stand-by', V2_MUTE],
          ].map(([l, c]) => (
            <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: V2_SLATE }}>
              <span style={{ width: 10, height: 4, borderRadius: 2, background: c }} />{l}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(${totalWeeks}, 1fr)`, borderTop: `1px solid ${V2_LINE}`, borderBottom: `1px solid ${V2_LINE}` }}>
        <div style={{ padding: '8px 12px 8px 20px', fontSize: 10, color: V2_MUTE, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Frente</div>
        {WEEKS.map((w, i) => (
          <div key={w} style={{ padding: '8px 4px', fontSize: 10, color: V2_MUTE, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', borderLeft: i ? `1px solid ${V2_LINE}` : 'none', textAlign: 'center' }}>{w}</div>
        ))}
      </div>
      {GANTT.map((row, i) => {
        const c = row.status === 'risk' ? accent : row.status === 'active' ? '#2BD6C8' : row.status === 'delivery' ? V2_NAVY : V2_MUTE;
        return (
          <div key={row.id} style={{
            display: 'grid', gridTemplateColumns: `160px repeat(${totalWeeks}, 1fr)`,
            alignItems: 'center', borderBottom: i < GANTT.length - 1 ? `1px solid ${V2_LINE}` : 'none',
            height: 44, position: 'relative',
          }}>
            <div style={{ padding: '0 12px 0 20px', fontSize: 12, fontWeight: 600, color: V2_INK, display: 'flex', alignItems: 'center', gap: 8 }}>
              <StatusDot status={row.status} size={7} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.label}</span>
            </div>
            {WEEKS.map((_, w) => (
              <div key={w} style={{ borderLeft: w ? `1px solid ${V2_LINE}` : 'none', height: '100%' }} />
            ))}
            <div style={{
              position: 'absolute', top: 12, height: 20, borderRadius: 4,
              left: `calc(160px + (100% - 160px) * ${row.start} / ${totalWeeks})`,
              width: `calc((100% - 160px) * ${row.end - row.start + 1} / ${totalWeeks} - 4px)`,
              background: c, opacity: 0.9,
              display: 'flex', alignItems: 'center', padding: '0 8px',
              fontSize: 10, fontWeight: 600, color: row.status === 'active' ? V2_INK : '#fff',
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.2,
              animation: 'v2-fadeup .6s cubic-bezier(.2,.0,.0,1) backwards',
              animationDelay: `${500 + i * 80}ms`,
            }}>
              {row.label.split(' ')[0]}
            </div>
            {row.milestones.map((m, mi) => (
              <div key={mi} title={m.label} style={{
                position: 'absolute', top: 10,
                left: `calc(160px + (100% - 160px) * ${m.w} / ${totalWeeks} - 7px)`,
                width: 14, height: 14, background: '#fff',
                border: `2px solid ${V2_NAVY}`, transform: 'rotate(45deg)',
                zIndex: 2,
              }} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── Sticky filter bar ──────────────────────────────────────────
function V2FilterBar({ filter, setFilter, sort, setSort, count, total, accent }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 5,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
      padding: '14px 16px', background: '#fff',
      border: `1px solid ${V2_LINE}`, borderRadius: 12,
      boxShadow: '0 4px 12px rgba(15,20,25,0.04)',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: V2_INK, letterSpacing: -0.2 }}>
          Frentes <span style={{ color: V2_MUTE, fontWeight: 500, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{count}/{total}</span>
        </h3>
        <div style={{ height: 22, width: 1, background: V2_LINE }} />
        <StatusFilter value={filter} onChange={setFilter} accent={accent} compact />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, color: V2_MUTE, fontWeight: 500 }}>Ordenar por</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            style={{
              background: 'transparent', border: 'none', fontSize: 12, fontWeight: 600,
              color: V2_INK, cursor: 'pointer', fontFamily: 'inherit', outline: 'none',
            }}>
            <option value="risk">Riesgo</option>
            <option value="recent">Reciente</option>
            <option value="avance">Avance</option>
          </select>
        </div>
        <button style={{
          background: 'transparent', border: `1px solid ${V2_LINE}`,
          padding: '6px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
          color: V2_SLATE, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          ⤓ Exportar CSV
        </button>
      </div>
    </div>
  );
}

// ─── Table ──────────────────────────────────────────────────────
function V2Table({ projects, onOpen, accent, dense }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${V2_LINE}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '32px 1.6fr 110px 110px 1fr 100px 110px 32px',
        gap: 12, padding: '10px 16px',
        background: V2_SURFACE, borderBottom: `1px solid ${V2_LINE}`,
        fontSize: 10, color: V2_MUTE, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase',
      }}>
        <span />
        <span>Frente</span>
        <span>Estado</span>
        <span>Última</span>
        <span>Workstreams</span>
        <span style={{ textAlign: 'right' }}>Avance</span>
        <span>Lead</span>
        <span />
      </div>
      {projects.length === 0 && (
        <div style={{ padding: 36, textAlign: 'center', color: V2_MUTE, fontSize: 13 }}>
          Sin frentes con esos filtros.
        </div>
      )}
      {projects.map((p, i) => (
        <div key={p.id} onClick={() => onOpen(p)}
          className="v2-fade"
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1.6fr 110px 110px 1fr 100px 110px 32px',
            gap: 12, padding: dense ? '12px 16px' : '16px 16px',
            borderBottom: i < projects.length - 1 ? `1px solid ${V2_LINE}` : 'none',
            alignItems: 'center', cursor: 'pointer',
            transition: 'background .12s',
            animationDelay: `${600 + i * 70}ms`,
            opacity: 0,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = V2_SURFACE}
          onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StatusDot status={p.status} size={10} />
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: V2_INK, display: 'flex', alignItems: 'center', gap: 8 }}>
              {p.title}
              {p.status === 'risk' && (
                <span style={{ fontSize: 9, color: accent, fontWeight: 700, padding: '2px 5px', background: 'rgba(200,50,160,.10)', borderRadius: 3, letterSpacing: 0.4 }}>
                  URGENTE
                </span>
              )}
            </div>
            <div style={{ fontSize: 11.5, color: V2_MUTE, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.subtitle}
            </div>
          </div>
          <StatusPill status={p.status} label={p.statusLabel} size="sm" />
          <span style={{ fontSize: 11, color: V2_SLATE, fontFamily: 'JetBrains Mono, monospace' }}>
            {p.lastMeeting || p.lastActivity}
          </span>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {(p.streams || '').split(' · ').slice(0, 3).map((s) => (
              <span key={s} style={{
                padding: '2px 7px', background: V2_SURFACE, border: `1px solid ${V2_LINE}`,
                borderRadius: 999, fontSize: 10, color: V2_SLATE, fontWeight: 500, whiteSpace: 'nowrap',
              }}>{s}</span>
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            <ProgressBar value={p.progress} color={p.status === 'standby' ? V2_MUTE : accent} />
            <div style={{ fontSize: 10, color: V2_MUTE, fontFamily: 'JetBrains Mono, monospace', marginTop: 3 }}>
              {p.progress}%
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <AvatarStack people={p.leads.map((l) => ({ initials: l }))} size={22} max={3} />
          </div>
          <span style={{ fontSize: 16, color: V2_MUTE, textAlign: 'center' }}>→</span>
        </div>
      ))}
    </div>
  );
}

// ─── Team + Admin row ───────────────────────────────────────────
function V2TeamAdmin({ showAdmin, accent }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: showAdmin ? '1.4fr 1fr' : '1fr', gap: 16 }}>
      <div style={{ background: '#fff', border: `1px solid ${V2_LINE}`, borderRadius: 12, padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: V2_INK }}>Equipo · 5 +Partners · 7 contactos Credicorp</h3>
          <a style={{ fontSize: 12, color: V2_NAVY, fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}>Ver todos →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[...TEAM_PARTNERS.map((p) => ({ ...p, side: 'p' })), ...TEAM_CREDICORP.map((p) => ({ ...p, side: 'c' }))].map((p) => (
            <div key={p.initials + p.side} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', background: V2_SURFACE, borderRadius: 8,
              border: p.flag ? '1px solid #FECDD3' : '1px solid transparent',
              transition: 'background .15s, border-color .15s',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.background = V2_SURFACE}>
              <Avatar initials={p.initials} size={28}
                bg={p.side === 'p' ? V2_NAVY : p.flag ? '#FEE2E2' : '#fff'}
                fg={p.flag ? '#BE123C' : p.side === 'p' ? '#fff' : V2_NAVY} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: V2_INK, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}>
                  {p.name}
                  {p.isNew && <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent }} />}
                </div>
                <div style={{ fontSize: 10, color: V2_MUTE, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <span style={{ color: p.side === 'p' ? '#0F8E3F' : V2_MUTE, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                    {p.side === 'p' ? '+P' : 'CC'}
                  </span> · {p.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdmin && (
        <div style={{ background: V2_NAVY, color: '#fff', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Admin · Ingestar</h3>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase' }}>IA</span>
          </div>
          <textarea placeholder="Pega un transcript, notas, audio link…"
            style={{
              width: '100%', minHeight: 90, padding: 12, borderRadius: 8,
              background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
              color: '#fff', fontSize: 12, fontFamily: 'inherit', resize: 'none', outline: 'none',
            }} />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {['Alicia', 'Romy', 'HUB Brasil', 'Desempeño'].map((c) => (
              <span key={c} style={{
                padding: '4px 9px', background: 'rgba(255,255,255,.06)', borderRadius: 999,
                fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.7)',
              }}>{c}</span>
            ))}
          </div>
          <button style={{
            marginTop: 12, width: '100%', background: accent, color: '#fff', border: 'none',
            padding: '10px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Analizar y rutear ↗
          </button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { AtrevidaV2, ProjectPage });
