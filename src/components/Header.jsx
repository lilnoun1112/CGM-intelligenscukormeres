import Logo from './Logo';
import { HamburgerIcon } from './Icons';
import './Header.css';

export default function Header({ variant = 'dark', onMenu, nav }) {
  const links = nav?.links ?? [];
  const ctas = nav?.ctas;
  return (
    <header className={`site-header ${variant === 'white' ? 'site-header--white' : ''}`}>
      <div className="site-header__spacer" />
      <Logo variant={variant} height={48} />

      {/* Desktop inline nav */}
      <nav className="site-nav">
        {links.map((l) => (
          <a
            href="#"
            key={l.label}
            className="site-nav__link"
            onClick={(e) => { e.preventDefault(); l.onClick?.(); }}
          >
            {l.label}
          </a>
        ))}
      </nav>
      {ctas && (
        <div className="site-header__ctas">
          <button className="btn btn-outline" onClick={ctas.secondary.onClick}>{ctas.secondary.label}</button>
          <button className="btn btn-primary" onClick={ctas.primary.onClick}>{ctas.primary.label}</button>
        </div>
      )}

      {/* Mobile hamburger */}
      <button className="site-header__menu" aria-label="Menü megnyitása" onClick={onMenu}>
        <HamburgerIcon color={variant === 'white' ? '#ffffff' : '#0b393e'} />
      </button>
    </header>
  );
}
