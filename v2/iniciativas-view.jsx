/* global React, useTweaks, FadeIn, Stagger,
   IS_ADMIN, INITIATIVE_STATES, INITIATIVE_BLOCKS, BACKLOG_METRICS_DEFAULT,
   RESEARCH_COMPANIES, HOURS_BY_FRONT,
   loadBacklogOverrides, saveBacklogOverrides, lastSyncLabel, Avatar */

// ─────────────────────────────────────────────────────────────
// Pantalla 3 · Iniciativas — Backlog Credicorp
// Visible en la URL pública (Pablo, solo lectura). Edición inline
// de estados y métricas detrás del flag admin (?admin=<token>).
// Portado al sistema de tokens del design system (Inter / JetBrains
// Mono, paleta navy/teal/pink/amber/mute).
// ─────────────────────────────────────────────────────────────

const I_NAVY = '#1B2A4A';
const I_INK = '#0F1419';
const I_SLATE = '#475569';
const I_MUTE = '#94A3B8';
const I_LINE = '#E2E8F0';
const I_SURFACE = '#F8FAFC';

function IcoCheck({ s = 16, c = 'currentColor' }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke={c} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}
function IcoDot({ s = 16, c = 'currentColor' }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke={c} strokeWidth="1.75">
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  );
}

function StatePill({ state }) {
  const st = INITIATIVE_STATES[state] || INITIATIVE_STATES.planeo;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: st.color, color: st.ink,
      fontSize: 11, fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap',
    }}>
      {state === 'entregado'
        ? <IcoCheck s={13} c={st.ink} />
        : <IcoDot s={11} c={st.ink} />}
      {st.label}
    </span>
  );
}

function StateSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{
        appearance: 'none', WebkitAppearance: 'none',
        background: (INITIATIVE_STATES[value] || INITIATIVE_STATES.planeo).color,
        color: (INITIATIVE_STATES[value] || INITIATIVE_STATES.planeo).ink,
        border: 'none', borderRadius: 999, padding: '5px 12px',
        fontSize: 11, fontWeight: 600, cursor: 'pointer',
        fontFamily: 'inherit', outline: 'none',
      }}>
      {Object.keys(INITIATIVE_STATES).map((k) => (
        <option key={k} value={k} style={{ background: '#fff', color: I_INK }}>
          {INITIATIVE_STATES[k].label}
        </option>
      ))}
    </select>
  );
}

// ─── Métricas editables ────────────────────────────────────────
function MetricsRow({ metrics, setMetric, admin }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12,
    }}>
      {metrics.map((m) => (
        <div key={m.id} style={{
          background: '#fff', border: `1px solid ${I_LINE}`,
          borderRadius: 12, padding: '14px 16px',
        }}>
          <div style={{
            fontSize: 10, color: I_MUTE, fontWeight: 700,
            letterSpacing: 0.6, textTransform: 'uppercase', minHeight: 26,
          }}>{m.label}</div>
          {admin ? (
            <input
              value={m.value}
              onChange={(e) => setMetric(m.id, e.target.value)}
              style={{
                width: '100%', border: 'none', outline: 'none',
                background: 'transparent',
                fontSize: 26, fontWeight: 700, color: I_NAVY,
                letterSpacing: -0.6, marginTop: 6,
                fontFamily: '"JetBrains Mono", monospace',
                fontVariantNumeric: 'tabular-nums',
                borderBottom: `1px dashed ${I_LINE}`, paddingBottom: 2,
              }} />
          ) : (
            <div style={{
              fontSize: 26, fontWeight: 700, color: I_NAVY,
              letterSpacing: -0.6, marginTop: 6,
              fontFamily: '"JetBrains Mono", monospace',
              fontVariantNumeric: 'tabular-nums',
            }}>{m.value}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Distribución (barras horizontales) ────────────────────────
function StateBars({ counts, total }) {
  const order = ['entregado', 'in_progress', 'parcial', 'planeo'];
  return (
    <div style={{
      background: '#fff', border: `1px solid ${I_LINE}`,
      borderRadius: 12, padding: '18px 20px',
    }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: I_INK }}>
        Distribución del backlog
        <span style={{
          color: I_MUTE, fontWeight: 500, fontSize: 12,
          fontFamily: '"JetBrains Mono", monospace', marginLeft: 8,
        }}>{total} iniciativas mapeadas</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {order.map((k) => {
          const st = INITIATIVE_STATES[k];
          const n = counts[k] || 0;
          const pct = total ? Math.round((n / total) * 100) : 0;
          return (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                width: 92, fontSize: 12, color: I_SLATE, fontWeight: 600,
              }}>{st.label}</span>
              <div style={{
                flex: 1, height: 22, background: I_SURFACE,
                borderRadius: 6, overflow: 'hidden',
              }}>
                <div style={{
                  width: `${pct}%`, height: '100%', background: st.color,
                  transition: 'width .5s cubic-bezier(.2,0,0,1)',
                }} />
              </div>
              <span style={{
                width: 54, textAlign: 'right', fontSize: 12, color: I_INK,
                fontWeight: 700, fontFamily: '"JetBrains Mono", monospace',
                fontVariantNumeric: 'tabular-nums',
              }}>{n} · {pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Árbol por bloques ─────────────────────────────────────────
function BlockTree({ block, states, admin, onState }) {
  return (
    <div style={{
      background: '#fff', border: `1px solid ${I_LINE}`,
      borderRadius: 12, overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: `1px solid ${I_LINE}`,
        background: I_SURFACE,
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: I_INK }}>
          {block.title}
        </h3>
        <span style={{
          fontSize: 11, color: I_MUTE, fontWeight: 600,
          letterSpacing: 0.4,
        }}>{block.frame}</span>
      </div>
      <div>
        {block.items.map((it, i) => {
          const st = states[it.id] || it.state;
          return (
            <div key={it.id} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 18px',
              borderTop: i ? `1px solid ${I_LINE}` : 'none',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: I_INK }}>
                  {it.name}
                </div>
                {it.note && (
                  <div style={{ fontSize: 11.5, color: I_MUTE, marginTop: 3 }}>
                    {it.note}
                  </div>
                )}
              </div>
              {admin
                ? <StateSelect value={st} onChange={(v) => onState(it.id, v)} />
                : <StatePill state={st} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Research / benchmarks ─────────────────────────────────────
function ResearchRow() {
  return (
    <div style={{
      background: '#fff', border: `1px solid ${I_LINE}`,
      borderRadius: 12, padding: '18px 20px',
    }}>
      <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: I_INK }}>
        Research externo
      </h3>
      <p style={{ margin: '0 0 16px', fontSize: 12, color: I_MUTE }}>
        Empresas con las que se hizo benchmark para el engagement.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {RESEARCH_COMPANIES.map((c) => (
          <span key={c} style={{
            padding: '8px 14px', border: `1px solid ${I_LINE}`,
            borderRadius: 8, fontSize: 12.5, fontWeight: 600,
            color: I_SLATE, background: I_SURFACE, letterSpacing: 0.1,
          }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Horas por frente (solo admin) ─────────────────────────────
function HoursByFront() {
  const total = HOURS_BY_FRONT.reduce((a, b) => a + b.hours, 0);
  return (
    <div style={{
      background: I_NAVY, color: '#fff', borderRadius: 12, padding: '18px 20px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 14,
      }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Horas por frente</h3>
        <span style={{
          fontSize: 10, color: 'rgba(255,255,255,.5)', fontWeight: 600,
          letterSpacing: 0.6, textTransform: 'uppercase',
        }}>solo admin</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {HOURS_BY_FRONT.map((h) => (
          <div key={h.front} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 13,
          }}>
            <span style={{ color: 'rgba(255,255,255,.85)' }}>{h.front}</span>
            <span style={{
              fontWeight: 700, fontFamily: '"JetBrains Mono", monospace',
              fontVariantNumeric: 'tabular-nums',
            }}>{h.hours}h</span>
          </div>
        ))}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 13, paddingTop: 10, marginTop: 4,
          borderTop: '1px solid rgba(255,255,255,.14)',
        }}>
          <span style={{ fontWeight: 600 }}>Total</span>
          <span style={{
            fontWeight: 700, fontFamily: '"JetBrains Mono", monospace',
            color: '#2BD6C8',
          }}>~{total}h</span>
        </div>
      </div>
      <p style={{
        margin: '14px 0 0', fontSize: 11, color: 'rgba(255,255,255,.55)',
        lineHeight: 1.5,
      }}>
        Se vendieron 61h mensuales. El total en ~6 meses está en línea con lo comprometido.
      </p>
    </div>
  );
}

// ─── Vista principal ───────────────────────────────────────────
function IniciativasView() {
  const admin = !!IS_ADMIN;
  const seedOverrides = React.useMemo(loadBacklogOverrides, []);
  const [states, setStates] = React.useState(seedOverrides.states || {});
  const [metrics, setMetrics] = React.useState(() =>
    BACKLOG_METRICS_DEFAULT.map((m) => ({
      ...m,
      value: (seedOverrides.metrics && seedOverrides.metrics[m.id]) || m.value,
    }))
  );

  const persist = React.useCallback((nextStates, nextMetrics) => {
    const metricsMap = {};
    nextMetrics.forEach((m) => { metricsMap[m.id] = m.value; });
    saveBacklogOverrides({ states: nextStates, metrics: metricsMap });
  }, []);

  const onState = React.useCallback((id, v) => {
    setStates((prev) => {
      const next = { ...prev, [id]: v };
      setMetrics((m) => { persist(next, m); return m; });
      return next;
    });
  }, [persist]);

  const setMetric = React.useCallback((id, value) => {
    setMetrics((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, value } : m));
      setStates((s) => { persist(s, next); return s; });
      return next;
    });
  }, [persist]);

  // Conteos para la distribución
  const { counts, total } = React.useMemo(() => {
    const c = {};
    let t = 0;
    INITIATIVE_BLOCKS.forEach((b) => b.items.forEach((it) => {
      const s = states[it.id] || it.state;
      c[s] = (c[s] || 0) + 1;
      t += 1;
    }));
    return { counts: c, total: t };
  }, [states]);

  return (
    <>
      {/* Topbar */}
      <div style={{
        padding: '12px 28px', borderBottom: `1px solid ${I_LINE}`,
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: I_MUTE, fontWeight: 500 }}>+Partners</span>
          <span style={{ fontSize: 12, color: I_MUTE }}>/</span>
          <span style={{ fontSize: 12, color: I_MUTE, fontWeight: 500 }}>Credicorp</span>
          <span style={{ fontSize: 12, color: I_MUTE }}>/</span>
          <span style={{ fontSize: 13, color: I_INK, fontWeight: 600 }}>Iniciativas</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 10px', background: I_SURFACE, borderRadius: 6,
          fontSize: 12, color: I_SLATE, border: `1px solid ${I_LINE}`,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2BD6C8' }} />
          Sincronizado · {lastSyncLabel()}
        </div>
      </div>

      {/* Contenido */}
      <div style={{ overflow: 'auto', flex: 1, padding: '24px 28px 36px' }}>
        <FadeIn delay={0}>
          <div style={{ marginBottom: 6 }}>
            <h1 style={{
              margin: 0, fontSize: 28, fontWeight: 700, color: I_INK,
              letterSpacing: -0.6,
            }}>Iniciativas · Backlog Credicorp</h1>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: I_SLATE, maxWidth: 720 }}>
              Estado de avance del backlog de Credicorp, agrupado por los cuatro
              frentes del engagement.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={80} style={{ marginTop: 20 }}>
          <MetricsRow metrics={metrics} setMetric={setMetric} admin={admin} />
        </FadeIn>

        {!admin && (
          <div style={{
            marginTop: 12, fontSize: 12, color: I_MUTE,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <IcoDot s={12} c={I_MUTE} />
            Vista de solo lectura. Las métricas y estados se editan desde el panel del equipo.
          </div>
        )}
        {admin && (
          <div style={{
            marginTop: 12, fontSize: 12, color: I_MUTE,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <IcoDot s={12} c="#F59E0B" />
            Los cambios se guardan localmente en este navegador hasta sincronizar con el Sheet.
          </div>
        )}

        <FadeIn delay={160} style={{ marginTop: 20 }}>
          <StateBars counts={counts} total={total} />
        </FadeIn>

        <Stagger step={80} start={220} style={{
          marginTop: 20,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        }}>
          {INITIATIVE_BLOCKS.map((b) => (
            <BlockTree key={b.id} block={b} states={states}
              admin={admin} onState={onState} />
          ))}
        </Stagger>

        <FadeIn delay={520} style={{ marginTop: 20 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: admin ? '1.6fr 1fr' : '1fr', gap: 16,
          }}>
            <ResearchRow />
            {admin && <HoursByFront />}
          </div>
        </FadeIn>
      </div>
    </>
  );
}

window.IniciativasView = IniciativasView;
