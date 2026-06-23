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

  return (
    <div className="app">
      <div className={`view-fade ${fading ? 'is-fading' : ''}`}>
        {view === 'hero'
          ? <Hero onCTA={goToInfo} onMenu={() => setMenuOpen(true)} />
          : <Info onMenu={() => setMenuOpen(true)} onSeeTestimonials={() => {}} />}
      </div>

      {/* Slide-out menu */}
      <div className={`menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="menu__panel">
          <button className="menu__close" onClick={() => setMenuOpen(false)} aria-label="Bezárás">✕</button>
          <nav className="menu__nav">
            <a href="#" onClick={goToHero}>Kezdőlap</a>
            <a href="#" onClick={() => { setMenuOpen(false); goToInfo(); }}>Kinek ajánljuk?</a>
            <a href="#">Felhasználók visszajelzései</a>
            <a href="#">Adatkezelési</a>
            <a href="#">GYIK</a>
          </nav>
          <div className="menu__cta">
            <button className="btn btn-primary" onClick={() => { setMenuOpen(false); goToInfo(); }}>Érdekel</button>
            <button className="btn btn-outline">Vásárlás</button>
          </div>
        </div>
        <div className="menu__backdrop" onClick={() => setMenuOpen(false)} />
      </div>
    </div>
  );
}
