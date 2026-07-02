/* global React, ReactDOM, TweaksProvider, AtrevidaV2 */
// Production entry — renders the AtrevidaV2 dashboard full-screen.
// Hash routing: `#/` (or empty) → dashboard, `#/frente/<id>` → detail page.
// The internal page state inside AtrevidaV2 also reflects to the URL hash.

const VALID_PAGES = new Set(['dashboard', 'iniciativas', 'reuniones', 'hub-brasil', 'alicia', 'romy', 'desempeno']);

function pageFromHash() {
  const h = (window.location.hash || '').replace(/^#\/?/, '');
  if (!h || h === 'dashboard') return 'dashboard';
  const seg = h.split('/').filter(Boolean);
  // accept #/frente/<id>, #/<id> and #/iniciativas
  const id = seg[0] === 'frente' ? seg[1] : seg[0];
  return VALID_PAGES.has(id) ? id : 'dashboard';
}

function hashFromPage(page) {
  if (page === 'dashboard') return '#/';
  if (page === 'iniciativas') return '#/iniciativas';
  if (page === 'reuniones') return '#/reuniones';
  return `#/frente/${page}`;
}

function RoutedAtrevida() {
  const [page, setPageState] = React.useState(pageFromHash());

  // Sync hash → state
  React.useEffect(() => {
    const onHash = () => setPageState(pageFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Sync state → hash (without firing hashchange loop)
  const setPage = React.useCallback((next) => {
    setPageState(next);
    const target = hashFromPage(next);
    if (window.location.hash !== target) {
      window.history.pushState(null, '', target);
    }
    // scroll to top on page change
    const scroller = document.querySelector('[data-app-scroll]');
    if (scroller) scroller.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  // AtrevidaV2 is fully controlled via initialPage + onPageChange when
  // onPageChange is provided (it mirrors initialPage to its internal state).
  return (
    <AtrevidaV2
      initialPage={page}
      onPageChange={setPage}
    />
  );
}

function App() {
  return (
    <TweaksProvider>
      <RoutedAtrevida />
    </TweaksProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
