/* global React, useTweaks, accentColor, StatusPill, StatusDot, Avatar,
   AvatarStack, ProgressBar, findPerson, PROJECTS, DETAIL_DATA, FadeIn */

// ─────────────────────────────────────────────────────────────
// Página de detalle por proyecto · FULL SCREEN
// Parámetros:
//   projectId — uno de hub-brasil | alicia | romy | desempeno
//   onBack    — handler para volver al dashboard (si está montado
//               dentro del flujo interactivo). Si no hay onBack la
//               vista funciona como "página standalone" en su
//               propio artboard.
// ─────────────────────────────────────────────────────────────

const D_INK = '#0F1419';
const D_NAVY = '#1B2A4A';
const D_NAVY_ALT = '#2A2560';
const D_SLATE = '#475569';
const D_MUTE = '#94A3B8';
const D_LINE = '#E2E8F0';
const D_SURFACE = '#F8FAFC';

const STATUS_HERO_COLOR = {
  risk:     '#C832A0',
  active:   '#2BD6C8',
  delivery: '#2BD6C8',
  blocked:  '#FF6B8A',
  standby:  '#94A3B8',
};

function DetailView({ projectId = 'hub-brasil', onBack, embedded = false }) {
  const { t } = useTweaks();
  const accent = accentColor(t.accent);
  const p = PROJECTS.find((x) => x.id === projectId);
  const data = DETAIL_DATA[projectId];
  if (!p || !data) return <div style={{ padding: 32 }}>Proyecto no encontrado</div>;

  const heroColor = STATUS_HERO_COLOR[p.status] || accent;

  // When embedded inside a DashboardShell, we render fragment style
  // (topbar + scrollable body). Standalone use wraps in the outer
  // container so the artboard still has a full chrome.
  const body = (
    <>
      {/* ─── Topbar ─── */}
      <div style={{
        padding: '12px 32px', borderBottom: `1px solid ${D_LINE}`,
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {onBack ? (
            <button onClick={onBack} style={{
              background: D_SURFACE, border: `1px solid ${D_LINE}`,
              padding: '6px 12px 6px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600,
              color: D_INK, cursor: 'pointer', fontFamily: 'inherit',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              transition: 'background .15s, border-color .15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = D_INK; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = D_SURFACE; e.currentTarget.style.borderColor = D_LINE; }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>←</span>
              Dashboard
            </button>
          ) : (
            <img src="assets/logos/partners-wordmark.svg" alt="+Partners" style={{ height: 20 }} />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: D_MUTE }}>
            <span>+Partners</span><span>/</span><span>Credicorp</span><span>/</span>
            <span>Frentes</span><span>/</span>
            <span style={{ color: D_INK, fontWeight: 600 }}>{p.title}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            background: 'transparent', border: `1px solid ${D_LINE}`,
            padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
            color: D_SLATE, cursor: 'pointer', fontFamily: 'inherit',
          }}>Compartir con Pablo</button>
          <button style={{
            background: D_NAVY, color: '#fff', border: 'none',
            padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>+ Nueva decisión</button>
          <Avatar initials="MS" size={28} bg={D_NAVY} />
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* ─── Hero ─── */}
        <FadeIn delay={0}>
          <section style={{
            background: `linear-gradient(135deg, ${D_NAVY} 0%, ${D_NAVY_ALT} 100%)`,
            color: '#fff', padding: '36px 32px 32px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div aria-hidden style={{
              position: 'absolute', right: -30, bottom: -80, fontSize: 320,
              fontWeight: 800, color: 'rgba(255,255,255,0.045)',
              letterSpacing: -14, lineHeight: 0.8, pointerEvents: 'none',
              fontFamily: '"Inter", system-ui, sans-serif',
            }}>{String(data.countdown.value)}{typeof data.countdown.value === 'number' ? 'd' : ''}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, position: 'relative' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <span style={{
                    fontSize: 11, padding: '5px 10px',
                    background: p.status === 'risk' ? 'rgba(200,50,160,.18)'
                              : p.status === 'blocked' ? 'rgba(225,29,72,.18)'
                              : p.status === 'standby' ? 'rgba(148,163,184,.18)'
                              : 'rgba(43,214,200,.18)',
                    color: heroColor,
                    fontWeight: 700, letterSpacing: 0.4, borderRadius: 4,
                  }}>● {p.statusLabel.toUpperCase()}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                    {p.phase} {p.intensity && `· ${p.intensity}`}
                  </span>
                </div>
                <h1 style={{
                  margin: 0, fontSize: 56, fontWeight: 800, letterSpacing: -1.6,
                  lineHeight: 1, color: '#fff',
                }}>
                  {p.title}
                </h1>
                <p style={{
                  margin: '14px 0 0', fontSize: 16, lineHeight: 1.55,
                  color: 'rgba(255,255,255,.75)', maxWidth: 580,
                }}>
                  {p.subtitle}
                </p>

                <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap' }}>
                  <DMeta k="Sponsor" v="Pablo Silva" />
                  <DMeta k="Lead +Partners" v={p.leads.map((i) => findPerson(i).name.split(' ')[0]).join(' + ')} />
                  <DMeta k="Última actividad" v={`${p.lastMeeting || p.lastActivity}${p.lastWith ? ` · ${p.lastWith}` : ''}`} />
                  <DMeta k="Workstreams" v={`${data.workstreams.length} activos`} />
                </div>
              </div>

              {/* Countdown / status panel */}
              <div style={{
                background: 'rgba(255,255,255,.06)', border: '1.5px solid rgba(255,255,255,.12)',
                padding: 24, borderRadius: 12,
              }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>
                  {p.status === 'standby' ? 'Sin movimiento' : p.status === 'blocked' ? 'Bloqueado hace' : 'Próximo hito'}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{
                    fontSize: 88, fontWeight: 800, color: heroColor, letterSpacing: -3, lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums', fontFamily: 'JetBrains Mono, monospace',
                  }}>{data.countdown.value}</span>
                  <span style={{ fontSize: 18, color: 'rgba(255,255,255,.7)', fontWeight: 500 }}>{data.countdown.unit}</span>
                </div>
                <div style={{ fontSize: 14, color: '#fff', marginTop: 8, fontWeight: 600 }}>
                  {data.countdown.label}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 4, lineHeight: 1.5 }}>
                  {data.countdown.caption}
                </div>

                <div style={{ marginTop: 18 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', marginBottom: 6,
                    fontSize: 10, color: 'rgba(255,255,255,.55)', fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase',
                  }}>
                    <span>Avance del frente</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#fff' }}>{p.progress}%</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,.12)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${p.progress}%`, height: '100%', background: heroColor }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        <div style={{ padding: '32px 32px 56px' }}>
          {/* Timeline — daily / weekly / phases */}
          <FadeIn delay={120}>
            <DSection
              label="Timeline"
              title={data.timelineKind === 'daily' ? `Próximos ${data.timeline.length} días · día a día`
                   : data.timelineKind === 'weekly' ? 'Plan por semanas / meses'
                   : 'Fases y estado'}
            >
              {data.timelineKind === 'daily'
                ? <DDailyTimeline timeline={data.timeline} accent={accent} />
                : <DPeriodTimeline timeline={data.timeline} accent={accent} kind={data.timelineKind} />}
            </DSection>
          </FadeIn>

          {/* Workstreams */}
          <FadeIn delay={220}>
            <DSection label="Workstreams" title={data.workstreams.length === 1 ? '1 frente' : `${data.workstreams.length} frentes paralelos`}>
              <DWorkstreams workstreams={data.workstreams} accent={accent} />
            </DSection>
          </FadeIn>

          {/* Decisions + Risks two col */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginTop: 28 }}>
            <FadeIn delay={300}>
              <DSection label="Decisions log" title="Lo que ya decidimos" tight>
                <DDecisions decisions={data.decisions} accent={accent} />
              </DSection>
            </FadeIn>
            <FadeIn delay={380}>
              <DSection label="Risk register" title="Lo que nos puede pasar" tight>
                <DRisks risks={p.risks} />
              </DSection>
            </FadeIn>
          </div>

          {/* People */}
          <FadeIn delay={460}>
            <DSection label="Personas" title="Quién hace qué">
              <DPeople people={data.people} />
            </DSection>
          </FadeIn>
        </div>
      </div>
    </>
  );

  if (embedded) return body;

  return (
    <div style={{
      width: '100%', height: '100%', background: D_SURFACE, color: D_INK,
      fontFamily: '"Inter", system-ui, sans-serif',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      {body}
    </div>
  );
}

function DMeta({ k, v }) {
  return (
    <div>
      <div style={{ fontSize: 9, color: 'rgba(255,255,255,.5)', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{v}</div>
    </div>
  );
}

function DSection({ label, title, children, tight }) {
  return (
    <section style={{ marginTop: tight ? 0 : 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 10, color: D_MUTE, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' }}>
          §  {label}
        </span>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: D_INK, letterSpacing: -0.3 }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

// ─── Daily timeline (HUB Brasil) ────────────────────────────────
function DDailyTimeline({ timeline, accent }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${D_LINE}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex' }}>
        {timeline.map((d, i) => {
          const isCrit = d.items.some((x) => x.critical);
          return (
            <div key={d.d} style={{
              flex: 1, minWidth: 0, padding: '16px 14px',
              borderRight: i < timeline.length - 1 ? `1px solid ${D_LINE}` : 'none',
              background: isCrit ? 'rgba(200,50,160,.05)' : '#fff',
            }}>
              <div style={{ fontSize: 9, color: D_MUTE, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>{d.day}</div>
              <div style={{
                fontSize: 16, fontWeight: 700, color: isCrit ? accent : D_INK,
                fontFamily: 'JetBrains Mono, monospace', marginTop: 2, marginBottom: 14,
                letterSpacing: -0.3,
              }}>{d.d}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {d.items.map((it, ii) => (
                  <div key={ii} style={{
                    display: 'flex', gap: 8, fontSize: 11.5, lineHeight: 1.4,
                    color: it.critical ? accent : D_INK,
                    fontWeight: it.critical ? 700 : 500,
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: it.k === 'milestone' ? 0 : '50%',
                      background: it.k === 'meeting' ? D_NAVY
                                : it.k === 'deliver' ? '#2BD6C8'
                                : it.k === 'milestone' ? accent
                                : D_MUTE,
                      transform: it.k === 'milestone' ? 'rotate(45deg)' : 'none',
                      marginTop: 5, flexShrink: 0,
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <div>{it.l}</div>
                      {it.who && <div style={{ fontSize: 10, color: D_MUTE, marginTop: 2 }}>{it.who}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Weekly / phases timeline ───────────────────────────────────
function DPeriodTimeline({ timeline, accent, kind }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${D_LINE}`, borderRadius: 12, padding: '8px 0' }}>
      {timeline.map((row, i) => {
        const isBlocked = row.period.toLowerCase().includes('bloqu');
        return (
          <div key={row.period} style={{
            display: 'grid', gridTemplateColumns: '180px 1fr',
            gap: 24, alignItems: 'flex-start',
            padding: '16px 24px',
            borderBottom: i < timeline.length - 1 ? `1px solid ${D_LINE}` : 'none',
          }}>
            <div>
              <div style={{
                fontSize: 13, fontWeight: 700,
                color: isBlocked ? '#BE123C' : i === 0 ? accent : D_INK,
                fontFamily: 'JetBrains Mono, monospace', letterSpacing: -0.2,
              }}>
                {row.period}
              </div>
              {i === 0 && !isBlocked && (
                <div style={{ fontSize: 10, color: D_MUTE, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 3 }}>
                  AHORA
                </div>
              )}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {row.items.map((it, ii) => (
                <li key={ii} style={{
                  display: 'flex', gap: 10, fontSize: 13, color: isBlocked ? D_SLATE : D_INK, lineHeight: 1.5,
                  textDecoration: isBlocked ? 'line-through' : 'none',
                  opacity: isBlocked ? 0.6 : 1,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: isBlocked ? D_MUTE : i === 0 ? accent : D_NAVY,
                    marginTop: 7, flexShrink: 0,
                  }} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// ─── Workstreams ────────────────────────────────────────────────
function DWorkstreams({ workstreams, accent }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: workstreams.length === 1 ? '1fr' : workstreams.length === 2 ? '1fr 1fr' : 'repeat(3, 1fr)',
      gap: 14,
    }}>
      {workstreams.map((w) => {
        const color = w.status === 'risk' ? accent
                    : w.status === 'active' || w.status === 'delivery' ? '#2BD6C8'
                    : w.status === 'blocked' ? '#E11D48'
                    : D_MUTE;
        return (
          <div key={w.name} style={{
            background: '#fff', border: `1px solid ${D_LINE}`, borderRadius: 12, padding: '18px 20px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* status rail */}
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: color }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: D_INK, letterSpacing: -0.2 }}>{w.name}</div>
                <div style={{ fontSize: 11, color: D_SLATE, marginTop: 3 }}>Lead: {findPerson(w.lead).name.split(' ')[0]}</div>
              </div>
              <span style={{
                fontSize: 18, fontWeight: 700, color, fontFamily: 'JetBrains Mono, monospace',
                fontVariantNumeric: 'tabular-nums',
              }}>{w.progress}%</span>
            </div>
            <ProgressBar value={w.progress} color={color} />
            <div style={{
              fontSize: 11, color: D_SLATE, marginTop: 14, padding: '8px 10px',
              background: D_SURFACE, borderRadius: 6,
            }}>
              <span style={{ fontWeight: 600, color: D_INK }}>Próximo: </span>{w.next}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0' }}>
              {w.tasks.map((tk, i) => (
                <li key={i} style={{
                  display: 'flex', gap: 8, padding: '6px 0',
                  fontSize: 12, lineHeight: 1.4,
                  color: tk.done ? D_MUTE : D_INK,
                  textDecoration: tk.done ? 'line-through' : 'none',
                }}>
                  <span style={{
                    width: 14, height: 14, borderRadius: 3,
                    border: `1.5px solid ${tk.done ? color : D_LINE}`,
                    background: tk.done ? color : 'transparent', flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 9, fontWeight: 800, marginTop: 2,
                  }}>{tk.done ? '✓' : ''}</span>
                  <span style={{ flex: 1 }}>{tk.l}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// ─── Decisions ──────────────────────────────────────────────────
function DDecisions({ decisions, accent }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${D_LINE}`, borderRadius: 12 }}>
      {decisions.map((d, i) => (
        <div key={i} style={{
          padding: '14px 20px',
          borderBottom: i < decisions.length - 1 ? `1px solid ${D_LINE}` : 'none',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: accent, fontWeight: 700 }}>{d.date}</span>
                <span style={{
                  fontSize: 9, color: D_MUTE, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase',
                  padding: '2px 6px', background: D_SURFACE, borderRadius: 4,
                }}>{d.tag}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: D_INK, marginTop: 4 }}>{d.title}</div>
              <div style={{ fontSize: 12, color: D_SLATE, lineHeight: 1.5, marginTop: 4 }}>{d.body}</div>
            </div>
            <span style={{ fontSize: 11, color: D_MUTE, whiteSpace: 'nowrap' }}>{d.who}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Risks ──────────────────────────────────────────────────────
function DRisks({ risks }) {
  const severity = ['CRÍTICO', 'ALTO', 'MEDIO'];
  return (
    <div style={{ background: '#fff', border: `1px solid ${D_LINE}`, borderRadius: 12, overflow: 'hidden' }}>
      {risks.map((r, i) => (
        <div key={i} style={{
          padding: '14px 20px',
          borderBottom: i < risks.length - 1 ? `1px solid ${D_LINE}` : 'none',
          display: 'grid', gridTemplateColumns: '64px 1fr', gap: 14, alignItems: 'flex-start',
        }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: i === 0 ? '#BE123C' : i === 1 ? '#B45309' : D_SLATE,
            letterSpacing: 0.5, padding: '3px 7px',
            background: i === 0 ? '#FEE2E2' : i === 1 ? '#FEF3C7' : D_SURFACE,
            borderRadius: 4, textAlign: 'center', alignSelf: 'flex-start', marginTop: 2,
          }}>{severity[Math.min(i, 2)]}</span>
          <div style={{ fontSize: 13, color: D_INK, lineHeight: 1.5 }}>{r}</div>
        </div>
      ))}
    </div>
  );
}

// ─── People ─────────────────────────────────────────────────────
function DPeople({ people }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <DRoster title="+Partners" subtitle={`${people.partners.length} ${people.partners.length === 1 ? 'persona' : 'personas'} asignadas`} people={people.partners} side="p" />
      <DRoster title="Credicorp" subtitle={`${people.credicorp.length} contraparte${people.credicorp.length === 1 ? '' : 's'}`} people={people.credicorp} side="c" />
    </div>
  );
}

function DRoster({ title, subtitle, people, side }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${D_LINE}`, borderRadius: 12, padding: '18px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: D_INK }}>{title}</h3>
        <span style={{ fontSize: 11, color: D_MUTE }}>{subtitle}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {people.map((p, i) => (
          <div key={p.i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0', borderTop: i ? `1px solid ${D_LINE}` : 'none',
          }}>
            <Avatar initials={p.i} size={32}
              bg={p.flag ? '#FEE2E2' : side === 'p' ? D_NAVY : '#fff'}
              fg={p.flag ? '#BE123C' : side === 'p' ? '#fff' : D_NAVY} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: D_INK, display: 'flex', alignItems: 'center', gap: 8 }}>
                {p.n}
                {p.isNew && <span style={{ fontSize: 9, color: '#C832A0', fontWeight: 700, letterSpacing: 0.4, padding: '2px 5px', border: '1px solid #C832A0', borderRadius: 3 }}>NUEVA</span>}
                {p.flag && <span style={{ fontSize: 9, color: '#BE123C', fontWeight: 700, letterSpacing: 0.4, padding: '2px 5px', background: '#FEE2E2', borderRadius: 3 }}>SIN RESPUESTA</span>}
              </div>
              <div style={{ fontSize: 11.5, color: D_SLATE, marginTop: 2 }}>{p.r}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.DetailView = DetailView;
