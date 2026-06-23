import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import { PhoneGraphIcon, AIIcon, CalendarIcon, ChevronIcon } from './Icons';
import heroMain from '../assets/hero-main.jpg';
import './Hero.css';

/* Verified from the reference video + Figma slide-1 context.
   Slide 1 shows all three icons; slides 2–4 show one each. */
const SLIDES = [
  {
    key: 'intro',
    icons: ['phone', 'ai', 'calendar'],
    title: 'Intelligens cukormérés',
    body: 'Intelligens előrejelzéseink lehetővé teszik, hogy megelőző intézkedéseket tegyél, és nagyobb nyugalommal folytathasd napi rutinodat.',
  },
  {
    key: 'continuous',
    icons: ['phone'],
    title: 'Folyamatos cukorszintmérés',
    body: 'A folyamatos glükózmonitorozás valós idejű adatokat adhat, így könnyebben követheted, merre tartanak az értékeid a nap során.',
  },
  {
    key: 'ai',
    icons: ['ai'],
    title: 'AI predikció',
    body: 'Az AI-alapú előrejelzések segíthetnek időben felismerni a lehetséges glükózszint-változásokat, hogy felkészültebben reagálhass.',
  },
  {
    key: 'sensor',
    icons: ['calendar'],
    title: '14 napos szenzorélettartam',
    body: 'Az akár 14 napig viselhető szenzor kényelmesebb követést biztosíthat, így ritkábban kell cserével megszakítanod a rutinodat.',
  },
];

const ICON_MAP = { phone: PhoneGraphIcon, ai: AIIcon, calendar: CalendarIcon };
const AUTOPLAY_MS = 4500;

export default function Hero({ onCTA, onMenu }) {
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  const go = useCallback((i) => setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  // autoplay (paused on hover / reduced-motion handled via CSS only for fades)
  useEffect(() => {
    timer.current = setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer.current);
  }, [active, go]);

  const pause = () => clearTimeout(timer.current);

  return (
    <section className="hero" onMouseEnter={pause} aria-roledescription="carousel">
      <div className="hero__bg">
        <img src={heroMain} alt="" />
      </div>
      <div className="hero__scrim" />
      <Header variant="white" onMenu={onMenu} />

      {/* Curved white divider — the design's signature shape */}
      <svg className="hero__curve" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden>
        <path d="M0,120 C360,0 1080,0 1440,120 L1440,220 L0,220 Z" fill="var(--ac-bg)" />
      </svg>

      <div className="hero__content">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.key}
            className={`hero__slide ${i === active ? 'is-active' : ''}`}
            aria-hidden={i !== active}
          >
            <div className="hero__icons" data-count={slide.icons.length}>
              {slide.icons.map((ic) => {
                const Ic = ICON_MAP[ic];
                return (
                  <span className="hero__icon-badge" key={ic}>
                    <Ic size={slide.icons.length === 1 ? 96 : 60} />
                  </span>
                );
              })}
            </div>
            <h1 className="hero__title">{slide.title}</h1>
            <p className="hero__body">{slide.body}</p>
          </div>
        ))}

        <div className="hero__controls">
          <button className="hero__arrow" onClick={() => { pause(); prev(); }} aria-label="Előző">
            <ChevronIcon dir="left" color="#0b393e" />
          </button>
          <div className="hero__dots" role="tablist">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                className={`hero__dot ${i === active ? 'is-active' : ''}`}
                onClick={() => { pause(); go(i); }}
                aria-label={`${i + 1}. dia`}
                aria-selected={i === active}
                role="tab"
              />
            ))}
          </div>
          <button className="hero__arrow" onClick={() => { pause(); next(); }} aria-label="Következő">
            <ChevronIcon dir="right" color="#0b393e" />
          </button>
        </div>

        <button className="btn btn-primary hero__cta" onClick={onCTA}>Érdekel</button>
      </div>
    </section>
  );
}
