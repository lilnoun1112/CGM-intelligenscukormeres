import Logo from './Logo';
import { HamburgerIcon } from './Icons';
import './Header.css';

export default function Header({ variant = 'dark', onMenu }) {
  return (
    <header className={`site-header ${variant === 'white' ? 'site-header--white' : ''}`}>
      <div className="site-header__spacer" />
      <Logo variant={variant} height={48} />
      <button className="site-header__menu" aria-label="Menü megnyitása" onClick={onMenu}>
        <HamburgerIcon color={variant === 'white' ? '#ffffff' : '#0b393e'} />
      </button>
    </header>
  );
}
