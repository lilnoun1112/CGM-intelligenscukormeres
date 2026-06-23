import { useState, useRef, useEffect } from 'react';
import Hero from './components/Hero';
import Info from './components/Info';
import './App.css';

export default function App() {
  // "hero" = fullscreen carousel intro, "info" = the long scrolling page
  const [view, setView] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [fading, setFading] = useState(false);
  const infoRef = useRef(null);

  const goToInfo = () => {
    setFading(true);
    setTimeout(() => {
      setView('info');
      setFading(false);
      window.scrollTo(0, 0);
    }, 500);
  };

  const goToHero = () => {
    setMenuOpen(false);
    setView('hero');
    window.scrollTo(0, 0);
  };

  // lock body scroll while on hero (it's a fixed fullscreen experience)
  useEffect(() => {
    document.body.style.overflow = view === 'hero' ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [view]);

  // Shared nav config — used by the desktop header (inline) and the
  // mobile slide-out menu so the two never drift apart.
  const navLinks = [
    { label: 'Kezdőlap', onClick: goToHero },
    { label: 'Kinek ajánljuk?', onClick: goToInfo },
    { label: 'Felhasználók visszajelzései', onClick: () => {} },
    { label: 'Adatkezelési', onClick: () => {} },
    { label: 'GYIK', onClick: () => {} },
  ];
  const navCtas = {
    primary: { label: 'Kipróbálom ingyen', onClick: goToInfo },
    secondary: { label: 'Vásárlás', onClick: () => {} },
  };
  const nav = { links: navLinks, ctas: navCtas };

  const onMenu = () => setMenuOpen(true);
  // run a nav action and close the slide-out menu (mobile)
  const runFromMenu = (fn) => { setMenuOpen(false); fn(); };

  return (
    <div className="app">
      <div className={`view-fade ${fading ? 'is-fading' : ''}`}>
        {view === 'hero'
          ? <Hero onCTA={goToInfo} onMenu={onMenu} nav={nav} />
          : <Info onMenu={onMenu} nav={nav} onSeeTestimonials={() => {}} />}
      </div>

      {/* Sticky bottom CTA bar — Info screen only, not the Hero */}
      {view === 'info' && (
        <div className="cta-bar">
          <div className="cta-bar__inner">
            <button className="btn btn-outline">Megvásárolom</button>
            <button className="btn btn-primary">Kipróbálom ingyen</button>
          </div>
        </div>
      )}

      {/* Slide-out menu (mobile) */}
      <div className={`menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="menu__panel">
          <button className="menu__close" onClick={() => setMenuOpen(false)} aria-label="Bezárás">✕</button>
          <nav className="menu__nav">
            {navLinks.map((l) => (
              <a href="#" key={l.label} onClick={(e) => { e.preventDefault(); runFromMenu(l.onClick); }}>{l.label}</a>
            ))}
          </nav>
          <div className="menu__cta">
            <button className="btn btn-primary" onClick={() => runFromMenu(navCtas.primary.onClick)}>{navCtas.primary.label}</button>
            <button className="btn btn-outline" onClick={() => runFromMenu(navCtas.secondary.onClick)}>{navCtas.secondary.label}</button>
          </div>
        </div>
        <div className="menu__backdrop" onClick={() => setMenuOpen(false)} />
      </div>
    </div>
  );
}
