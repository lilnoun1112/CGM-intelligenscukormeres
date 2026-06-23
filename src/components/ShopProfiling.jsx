import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import { ChevronIcon } from './Icons';
import shopImg from '../assets/shop-profiling-img.jpg';
import './ShopProfiling.css';

const GOALS = [
  'Cukorkontroll 1-es típusú diabétesszel',
  'Cukorkontroll 2-es típusú diabétesszel',
  'Testsúly kontroll',
  'Sportteljesítmény növelése',
];

export default function ShopProfiling({ onMenu, nav }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const selectRef = useRef(null);

  // close the dropdown on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="shop">
      <Header variant="dark" onMenu={onMenu} nav={nav} />
      <div className="shop__pad" />

      <main className="shop__main">
        <div className="shop__image">
          <img src={shopImg} alt="" />
        </div>

        <h1 className="shop__title">Mi a célja a CGM-rendszer használatával</h1>
        <p className="shop__body">
          Lorem ipsum dolor sit amet consectetur. Aliquet fermentum hendrerit at bibendum faucibus sit.
        </p>

        <div className={`shop__select ${open ? 'is-open' : ''}`} ref={selectRef}>
          <button
            type="button"
            className="shop__select-trigger"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={selected ? 'shop__select-value' : 'shop__select-placeholder'}>
              {selected || 'Válasszon célt'}
            </span>
            <ChevronIcon dir={open ? 'up' : 'down'} color="#0b393e" />
          </button>

          {open && (
            <ul className="shop__select-menu" role="listbox">
              {GOALS.map((g) => (
                <li key={g} role="option" aria-selected={selected === g}>
                  <button
                    type="button"
                    className="shop__select-option"
                    onClick={() => { setSelected(g); setOpen(false); }}
                  >
                    {g}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Forwards to a third-party shop based on the chosen goal (not wired yet) */}
        <button type="button" className="btn btn-primary shop__cta">
          Megnézem az ajánlatokat
        </button>
      </main>
    </div>
  );
}
