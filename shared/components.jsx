/* global React */
// Shared atomic components: avatar, status pill, project detail modal.
// Each takes an `accent` prop so the Tweaks panel can swap pink/teal/navy
// without re-rendering call sites.

const STATUS_COLORS = {
  active:   { dot: '#2BD6C8', text: '#0F8E3F', bg: 'rgba(43, 214, 200, 0.12)', label: 'En curso' },
  risk:     { dot: '#F59E0B', text: '#B45309', bg: 'rgba(245, 158, 11, 0.14)', label: 'En riesgo' },
  blocked:  { dot: '#E11D48', text: '#BE123C', bg: 'rgba(225, 29, 72, 0.12)',  label: 'Bloqueado' },
  delivery: { dot: '#C832A0', text: '#9D1F7D', bg: 'rgba(200, 50, 160, 0.12)', label: 'Entregable' },
  standby:  { dot: '#94A3B8', text: '#475569', bg: 'rgba(148, 163, 184, 0.18)', label: 'Stand-by' },
};

function StatusDot({ status, size = 8 }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.standby;
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      background: c.dot, flexShrink: 0,
    }} />
  );
}

function StatusPill({ status, label, size = 'md' }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.standby;
  const pad = size === 'sm' ? '3px 8px' : '5px 10px';
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, borderRadius: 999, background: c.bg, color: c.text,
      fontSize: fs, fontWeight: 600, lineHeight: 1, letterSpacing: 0.1,
      whiteSpace: 'nowrap',
    }}>
      <StatusDot status={status} size={fs === 11 ? 6 : 7} />
      {label || c.label}
    </span>
  );
}

function Avatar({ initials, size = 32, bg = '#1B2A4A', fg = '#fff', ring }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: Math.round(size * 0.36), fontWeight: 600, letterSpacing: -0.2,
      flexShrink: 0,
      boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 ${2 + 2}px ${ring}` : 'none',
    }}>{initials}</div>
  );
}

function AvatarStack({ people, size = 28, max = 4 }) {
  const show = people.slice(0, max);
  const extra = people.length - show.length;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {show.map((p, i) => (
        <div key={p.initials + i} style={{ marginLeft: i ? -size / 3.5 : 0, boxShadow: '0 0 0 2px #fff', borderRadius: '50%' }}>
          <Avatar initials={p.initials} size={size} bg={p.bg || '#1B2A4A'} />
        </div>
      ))}
      {extra > 0 && (
        <div style={{ marginLeft: -size / 3.5, boxShadow: '0 0 0 2px #fff', borderRadius: '50%' }}>
          <Avatar initials={`+${extra}`} size={size} bg="#E2E8F0" fg="#475569" />
        </div>
      )}
    </div>
  );
}

// Person resolver: map initials → full team record (for modal etc.)
function findPerson(initials) {
  return (
    window.TEAM_PARTNERS.find((p) => p.initials === initials) ||
    window.TEAM_CREDICORP.find((p) => p.initials === initials) ||
    { initials, name: initials, role: '' }
  );
}

// ─────────────────────────────────────────────────────────────
// ProjectModal — opens *inside* the artboard (absolute positioned).
// Hands close back to caller. Used by all 3 directions; styling is
// consistent so it reads as the same product.
// ─────────────────────────────────────────────────────────────
function ProjectModal({ project: p, onClose, accent = '#C832A0' }) {
  if (!p) return null;
  const c = STATUS_COLORS[p.status] || STATUS_COLORS.standby;
  return (
    <div onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'rgba(15, 20, 25, 0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '40px 24px',
      }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 640, background: '#fff', borderRadius: 20,
          boxShadow: '0 24px 80px rgba(15, 20, 25, 0.28)',
          overflow: 'hidden',
        }}>
        {/* Header */}
        <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <StatusPill status={p.status} label={p.statusLabel} />
                <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                  {p.tag}
                </span>
              </div>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#0F1419', letterSpacing: -0.4, lineHeight: 1.15 }}>
                {p.title}
              </h2>
              <p style={{ margin: '6px 0 0', color: '#475569', fontSize: 14, lineHeight: 1.5 }}>{p.subtitle}</p>
            </div>
            <button onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: 8, border: 'none',
                background: '#F8FAFC', color: '#475569', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, lineHeight: 1, flexShrink: 0,
              }}>×</button>
          </div>

          {/* Meta strip */}
          <div style={{ display: 'flex', gap: 32, marginTop: 18, flexWrap: 'wrap' }}>
            <MetaItem k="Avance"      v={`${p.progress}%`} accent={accent} mono />
            {p.deadline    && <MetaItem k="Deadline"      v={p.deadline} />}
            {p.lastMeeting && <MetaItem k="Última reunión" v={`${p.lastMeeting}${p.lastWith ? ` · ${p.lastWith}` : ''}`} />}
            {p.lastActivity && <MetaItem k="Última actividad" v={p.lastActivity} />}
            {p.deliverables && <MetaItem k="Entregables" v={p.deliverables} />}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ padding: '0 32px', marginTop: -1, position: 'relative', top: -1 }}>
          <div style={{ height: 3, background: '#F1F5F9', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, right: `${100 - p.progress}%`, background: accent }} />
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 32px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div>
            <SectionLabel>Próximos pasos</SectionLabel>
            <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.nextSteps.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.5, color: '#0F1419' }}>
                  <span style={{ width: 18, flexShrink: 0, color: accent, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>Riesgos</SectionLabel>
            <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.risks.map((r, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.5, color: '#0F1419' }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#E11D48',
                    flexShrink: 0, marginTop: 7,
                  }} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 32px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <AvatarStack people={p.leads.map((i) => ({ initials: i }))} size={24} />
            <span style={{ fontSize: 12, color: '#475569' }}>
              {p.leads.map((i) => findPerson(i).name.split(' ')[0]).join(' · ')} desde +Partners
            </span>
          </div>
          <button style={{
            background: accent, color: '#fff', border: 'none', padding: '8px 14px',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            Abrir vista completa <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ k, v, accent, mono }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: accent || '#0F1419', fontFamily: mono ? 'JetBrains Mono, monospace' : 'inherit', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: 0.6, textTransform: 'uppercase' }}>
      {children}
    </div>
  );
}

// Mini progress bar component used across directions
function ProgressBar({ value, color = '#C832A0', height = 4, track = '#F1F5F9' }) {
  return (
    <div style={{ height, background: track, borderRadius: height, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', background: color }} />
    </div>
  );
}

// Filter chips for project status — shared by atrevida (and used as a tweak in others)
function StatusFilter({ value, onChange, accent = '#C832A0', compact = false }) {
  const opts = [
    { v: 'all',      label: 'Todos',       count: 4 },
    { v: 'risk',     label: 'En riesgo',   count: 1 },
    { v: 'active',   label: 'En curso',    count: 1 },
    { v: 'delivery', label: 'Entregables', count: 1 },
    { v: 'standby',  label: 'Stand-by',    count: 1 },
  ];
  return (
    <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: '#F1F5F9', borderRadius: 999 }}>
      {opts.map((o) => {
        const sel = o.v === value;
        return (
          <button key={o.v} onClick={() => onChange(o.v)}
            style={{
              border: 'none', background: sel ? '#fff' : 'transparent',
              padding: compact ? '5px 10px' : '6px 12px',
              borderRadius: 999, fontSize: 12, fontWeight: 600, color: sel ? '#0F1419' : '#475569',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
              boxShadow: sel ? '0 1px 2px rgba(15,20,25,0.08)' : 'none',
              transition: 'background .15s, color .15s',
              fontFamily: 'inherit',
            }}>
            {o.label}
            <span style={{ fontSize: 10, color: sel ? accent : '#94A3B8', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{o.count}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  STATUS_COLORS, StatusDot, StatusPill, Avatar, AvatarStack, findPerson,
  ProjectModal, ProgressBar, StatusFilter, SectionLabel, MetaItem,
});
