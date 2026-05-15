/* global React */
// Tiny fade-in-with-stagger wrapper for v2 animations.
// Sections animate up + fade on mount; nested staggers compose via `delay`.

const _animCss = `
@keyframes v2-fadeup {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.v2-fade {
  opacity: 0;
  animation: v2-fadeup .55s cubic-bezier(.2,.0,.0,1) forwards;
}
.v2-slideover {
  animation: v2-slidein .35s cubic-bezier(.2,.0,.0,1) forwards;
}
@keyframes v2-slidein {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
.v2-scrim {
  animation: v2-fadein .25s ease-out forwards;
  opacity: 0;
}
@keyframes v2-fadein {
  to { opacity: 1; }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('v2-anim-css')) {
  const s = document.createElement('style');
  s.id = 'v2-anim-css';
  s.textContent = _animCss;
  document.head.appendChild(s);
}

function FadeIn({ delay = 0, children, as: As = 'div', style, ...rest }) {
  return (
    <As className="v2-fade" style={{ animationDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </As>
  );
}

// Stagger children automatically — each gets +step delay over the previous.
function Stagger({ step = 60, start = 0, children, as: As = 'div', style, ...rest }) {
  return (
    <As style={style} {...rest}>
      {React.Children.map(children, (c, i) =>
        c ? <FadeIn delay={start + i * step}>{c}</FadeIn> : null
      )}
    </As>
  );
}

window.FadeIn = FadeIn;
window.Stagger = Stagger;
