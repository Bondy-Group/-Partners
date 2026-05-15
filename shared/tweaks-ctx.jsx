/* global React */
// Production tweaks context — no starter scaffold dependency.
// Holds the design tweaks (density / accent / showAdmin) so all v2
// components share state. Defaults are the production recommendation
// from the design handoff: comfy density, pink accent, admin visible.

const TWEAK_DEFAULTS = {
  density: 'comfy',
  accent: 'pink',
  showAdmin: true,
  layout: 'grid',
};

const TweaksCtx = React.createContext({ t: TWEAK_DEFAULTS, setTweak: () => {} });

function TweaksProvider({ children }) {
  const [values, setValues] = React.useState(TWEAK_DEFAULTS);
  const setTweak = React.useCallback(
    (key, value) => setValues((prev) => ({ ...prev, [key]: value })),
    []
  );
  const ctx = React.useMemo(() => ({ t: values, setTweak }), [values, setTweak]);
  return <TweaksCtx.Provider value={ctx}>{children}</TweaksCtx.Provider>;
}

function useTweaks() {
  return React.useContext(TweaksCtx);
}

function accentColor(accent) {
  if (accent === 'teal') return '#2BD6C8';
  if (accent === 'navy') return '#1B2A4A';
  return '#C832A0';
}

function accentInk(accent) {
  if (accent === 'teal') return '#0F1419';
  return '#ffffff';
}

Object.assign(window, { TweaksCtx, TweaksProvider, useTweaks, accentColor, accentInk });
