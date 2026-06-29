import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import { ChevronIcon } from './Icons';
import heroMain from '../assets/hero-main.jpg';
import iconContinuous from '../assets/1-continous.svg';
import iconAi from '../assets/2-ai.svg';
import iconDays from '../assets/3-14days.svg';
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

const ICON_MAP = { phone: iconContinuous, ai: iconAi, calendar: iconDays };
const AUTOPLAY_MS = 4500;

export default function Hero({ onCTA, onMenu, nav }) {
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
      <Header variant="white" onMenu={onMenu} nav={nav} />

      {/* Curved divider — Ellipse 95 (from the supplied curve.svg asset) */}
      <div className="hero__curve" aria-hidden>
        <svg viewBox="0 0 1440 88" preserveAspectRatio="none">
          <ellipse cx="720" cy="180" rx="1080" ry="180" fill="var(--ac-bg)" />
        </svg>
      </div>

      {/* Feature icons — straddle the curve, crossfade per slide */}
      <div className="hero__icons-layer" aria-hidden>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.key}
            className={`hero__icons ${i === active ? 'is-active' : ''}`}
            data-count={slide.icons.length}
          >
            {slide.icons.map((ic) => {
              const sz = slide.icons.length === 1 ? 96 : 60;
              return (
                <span className="hero__icon-badge" key={ic}>
                  <img src={ICON_MAP[ic]} alt="" width={sz} height={sz} />
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Text + controls + CTA, below the curve */}
      <div className="hero__content">
        <div className="hero__slides">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.key}
              className={`hero__slide ${i === active ? 'is-active' : ''}`}
              aria-hidden={i !== active}
            >
              <h1 className="hero__title">{slide.title}</h1>
              <p className="hero__body">{slide.body}</p>
            </div>
          ))}
        </div>

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
