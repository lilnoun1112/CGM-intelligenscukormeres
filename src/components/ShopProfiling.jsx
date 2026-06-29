import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import { ChevronIcon } from './Icons';
import bgImg from '../assets/profiling-flow-bg.jpg';
import doktor24 from '../assets/doktor24.jpg';
import './ShopProfiling.css';

const GOALS = [
  'Cukorkontroll 1-es típusú diabétesszel',
  'Cukorkontroll 2-es típusú diabétesszel',
  'Testsúly kontroll',
  'Sportteljesítmény növelése',
];

/* Each goal forwards to a partner shop (forwarding not wired yet). We only
   have one partner asset for now, so every goal resolves to Doktor24. */
const PARTNER = {
  name: 'Doktor24',
  logo: doktor24,
  description: 'Lorem ipsum dolor sit amet consectetur. Aliquet fermentum hendrerit at bibendum faucibus sit.',
};

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
      <div className="shop__bg">
        <img src={bgImg} alt="" />
      </div>
      <div className="shop__scrim" />
      <Header variant="white" onMenu={onMenu} nav={nav} />

      <div className="shop__content">
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

        {/* Once a goal is picked, reveal the partner the user will be forwarded to */}
        {selected && (
          <div className="shop__result">
            <div className="shop__result-logo">
              <img src={PARTNER.logo} alt={PARTNER.name} />
            </div>
            <div className="shop__result-body">
              <h2 className="shop__result-name">{PARTNER.name}</h2>
              <p className="shop__result-desc">{PARTNER.description}</p>
              {/* Forwards to the third-party shop (not wired yet) */}
              <button type="button" className="btn btn-primary shop__result-cta">
                Megnézem az ajánlatokat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
