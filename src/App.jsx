import { useState, useRef, useEffect } from 'react';
import Hero from './components/Hero';
import Info from './components/Info';
import ShopProfiling from './components/ShopProfiling';
import Testimonials from './components/Testimonials';
import Profiling from './components/Profiling';
import './App.css';

export default function App() {
  // "hero" = fullscreen carousel intro, "info" = the long scrolling page,
  // "shop" = shop-profiling entry, "testimonials" = reviews page,
  // "trial" = the free-trial profiling flow (intro + 7-step wizard)
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

  const goToShop = () => {
    setMenuOpen(false);
    setView('shop');
    window.scrollTo(0, 0);
  };

  const goToTestimonials = () => {
    setMenuOpen(false);
    setView('testimonials');
    window.scrollTo(0, 0);
  };

  const goToTrial = () => {
    setMenuOpen(false);
    setView('trial');
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
    { label: 'Kinek ajánljuk?', onClick: goToInfo },
    { label: 'Felhasználók visszajelzései', onClick: goToTestimonials },
    { label: 'Adatkezelési', onClick: () => {} },
    { label: 'GYIK', onClick: () => {} },
  ];
  const navCtas = {
    primary: { label: 'Kipróbálom ingyen', onClick: goToTrial },
    secondary: { label: 'Vásárlás', onClick: goToShop },
  };
  const nav = { links: navLinks, ctas: navCtas, onLogo: goToHero };

  const onMenu = () => setMenuOpen(true);
  // run a nav action and close the slide-out menu (mobile)
  const runFromMenu = (fn) => { setMenuOpen(false); fn(); };

  const renderView = () => {
    if (view === 'hero') return <Hero onCTA={goToInfo} onMenu={onMenu} nav={nav} />;
    if (view === 'shop') return <ShopProfiling onMenu={onMenu} nav={nav} />;
    if (view === 'testimonials') return <Testimonials onMenu={onMenu} nav={nav} />;
    if (view === 'trial') return <Profiling onMenu={onMenu} nav={nav} onShop={goToShop} onHome={goToHero} />;
    return <Info onMenu={onMenu} nav={nav} onSeeTestimonials={goToTestimonials} />;
  };

  return (
    <div className="app">
      <div className={`view-fade ${fading ? 'is-fading' : ''}`}>
        {renderView()}
      </div>

      {/* Sticky bottom CTA bar — content pages (Info, Testimonials) */}
      {(view === 'info' || view === 'testimonials') && (
        <div className="cta-bar">
          <div className="cta-bar__inner">
            <button className="btn btn-outline" onClick={goToShop}>Megvásárolom</button>
            <button className="btn btn-primary" onClick={goToTrial}>Kipróbálom ingyen</button>
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
