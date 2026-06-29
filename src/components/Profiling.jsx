import { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Header';
import { ChevronIcon } from './Icons';
import bgImg from '../assets/profiling-flow-bg.jpg';
import card1 from '../assets/profiling-flow-card-1.jpg';
import card2 from '../assets/profiling-flow-card-2.jpg';
import card3 from '../assets/profiling-flow-card-3.jpg';
import './Profiling.css';

/* Intro / explainer panel content */
const INTRO_CARDS = [
  { img: card1, title: 'Iratkozz fel', body: 'Csak néhány adatot kérünk, hogy jobban megismerjünk, és megtudjuk, milyen tapasztalataid vannak a diabétesszel.' },
  { img: card2, title: 'Figyeld az e-mail fiókod', body: 'Szólunk, ha eljött az ingyenes próbalehetőség ideje – legyél a 15 leggyorsabban regisztráló között.' },
  { img: card3, title: 'Díjmentes konzultáció és próba', body: 'A regisztrálók értékes doktor24.hu oktatásban részesülnek és kipróbálhatják az új Accu-Chek SmartGuide CGM-szenzort.' },
];

/* Wizard steps. `title` is an array of [text, accent?] segments (accent = green).
   TODO: steps 3–7 awaiting their designs. */
const STEPS = [
  {
    id: 'newsletter',
    title: [['Iratkozz fel az '], ['Accu-Chek', true], [' vásárlói hírlevélre!']],
    body: 'Kérjük add meg az alábbi adatokat!',
    fields: [
      { name: 'vezeteknev', type: 'text', placeholder: 'Vezetéknév*' },
      { name: 'keresztnev', type: 'text', placeholder: 'Keresztnév*' },
      { name: 'email', type: 'email', placeholder: 'Email cím*' },
    ],
    consents: [
      [['Elolvastam és elfogadom az '], ['adatkezelési tájékoztatót', 'link'], ['.*']],
      [['Elolvastam és elfogadom a '], ['játékszabályzatot', 'link'], ['.*']],
    ],
  },
  {
    id: 'about',
    title: [['Néhány kérdés '], ['rólad', true]],
    body: 'Szeretnénk jobban megismerni. Kérjük válaszolj az alábbi kérdésekre!',
    fields: [
      { name: 'eletkor', type: 'text', placeholder: 'Életkor*' },
      { name: 'nem', type: 'select', placeholder: 'Nem*', options: ['Férfi', 'Nő', 'Egyéb'] },
      { name: 'lakohely', type: 'text', placeholder: 'Lakóhely*' },
      { name: 'foglalkozas', type: 'select', placeholder: 'Foglalkozás*', options: ['Diák', 'Aktív dolgozó', 'Nyugdíjas', 'Egyéb'] },
    ],
  },
];

const LAST = STEPS.length + 1; // index of the thank-you panel (0 = intro)

/* ---- URL <-> step-index helpers (query param ?step=) ---- */
function paramForIndex(i) {
  if (i <= 0) return 'intro';
  if (i >= LAST) return 'koszonjuk';
  return String(i);
}
function indexFromParam(value) {
  if (value === 'koszonjuk') return LAST;
  const n = Number(value);
  if (Number.isInteger(n) && n >= 1 && n <= STEPS.length) return n;
  return 0;
}

function Title({ parts }) {
  return (
    <h1 className="pf__title">
      {parts.map((seg, i) => (
        <span key={i} className={seg[1] ? 'pf__title-accent' : undefined}>{seg[0]}</span>
      ))}
    </h1>
  );
}

function Consent({ parts, checked, onToggle }) {
  return (
    <label className="pf__consent">
      <input type="checkbox" checked={checked} onChange={onToggle} />
      <span className="pf__check" aria-hidden>
        <svg viewBox="0 0 20 20" width="14" height="14"><path d="M4 10.5 L8.5 15 L16 5.5" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span className="pf__consent-text">
        {parts.map((seg, i) => (
          <span key={i} className={seg[1] === 'link' ? 'pf__link' : undefined}>{seg[0]}</span>
        ))}
      </span>
    </label>
  );
}

function Select({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);
  return (
    <div className={`pf__select ${open ? 'is-open' : ''}`} ref={ref}>
      <button type="button" className="pf__field pf__select-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className={value ? 'pf__select-value' : 'pf__placeholder'}>{value || placeholder}</span>
        <ChevronIcon dir={open ? 'up' : 'down'} color="#0b393e" />
      </button>
      {open && (
        <ul className="pf__select-menu" role="listbox">
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={value === opt}>
              <button type="button" className={`pf__select-option ${value === opt ? 'is-selected' : ''}`} onClick={() => { onChange(opt); setOpen(false); }}>{opt}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StepPanel({ step, values, setValue, consents, toggleConsent }) {
  return (
    <div className="pf__panel pf__panel--step">
      <div className="pf__step-inner">
        <Title parts={step.title} />
        <p className="pf__body">{step.body}</p>
        <div className="pf__fields">
          {step.fields.map((f) => (
            f.type === 'select' ? (
              <Select key={f.name} placeholder={f.placeholder} options={f.options}
                value={values[f.name] || ''} onChange={(v) => setValue(f.name, v)} />
            ) : (
              <input key={f.name} className="pf__field" type={f.type} placeholder={f.placeholder}
                value={values[f.name] || ''} onChange={(e) => setValue(f.name, e.target.value)} />
            )
          ))}
        </div>
        {step.consents && (
          <div className="pf__consents">
            {step.consents.map((parts, i) => (
              <Consent key={i} parts={parts} checked={!!consents[i]} onToggle={() => toggleConsent(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Profiling({ onMenu, nav, onShop }) {
  const [index, setIndex] = useState(() => indexFromParam(new URLSearchParams(window.location.search).get('step')));
  const [form, setForm] = useState({}); // field values keyed by step id + field name
  const [consents, setConsents] = useState({}); // keyed by step id -> { idx: bool }

  // Normalize the URL on mount; clear ?step on unmount (leaving the flow)
  useEffect(() => {
    const i = indexFromParam(new URLSearchParams(window.location.search).get('step'));
    window.history.replaceState({ step: i }, '', `?step=${paramForIndex(i)}`);
    const onPop = () => setIndex(indexFromParam(new URLSearchParams(window.location.search).get('step')));
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.history.replaceState({}, '', window.location.pathname);
    };
  }, []);

  const go = useCallback((next) => {
    const clamped = Math.max(0, Math.min(LAST, next));
    setIndex(clamped);
    window.history.pushState({ step: clamped }, '', `?step=${paramForIndex(clamped)}`);
  }, []);

  const setValue = (stepId) => (name, value) => setForm((f) => ({ ...f, [`${stepId}.${name}`]: value }));
  const toggleConsent = (stepId) => (i) => setConsents((c) => ({ ...c, [`${stepId}.${i}`]: !c[`${stepId}.${i}`] }));

  const isStep = index >= 1 && index <= STEPS.length;
  const stepNumber = index; // 1-based for the counter

  return (
    <div className="pf">
      <div className="pf__photo">
        <div className="pf__bg"><img src={bgImg} alt="" /></div>
        <div className="pf__scrim" />
        <Header variant="white" onMenu={onMenu} nav={nav} />

        <div className="pf__viewport">
          <div className="pf__track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {/* 0 — Intro */}
            <div className="pf__panel pf__panel--intro">
              <div className="pf__intro-inner">
                <h1 className="pf__title pf__title--center">
                  Iratkozz fel ingyenes CGM szenzor <span className="pf__title-accent">próbára!</span>
                </h1>
                <p className="pf__body pf__body--center">
                  Hiszünk vércukormérő eszközeinkben, ezért havonta egy rövid ideig a 15 leggyorsabb
                  jelentkezőnek lehetőséget biztosítunk arra, hogy 0 Ft-ért kipróbálhassa az új Accu-Chek
                  SmartGuide CGM-szenzort.
                </p>
                <div className="pf__cards">
                  {INTRO_CARDS.map((c) => (
                    <article className="pf__card" key={c.title}>
                      <div className="pf__card-img"><img src={c.img} alt="" /></div>
                      <div className="pf__card-body">
                        <h3>{c.title}</h3>
                        <p>{c.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* 1..N — Steps */}
            {STEPS.map((step) => (
              <StepPanel
                key={step.id}
                step={step}
                values={Object.fromEntries(step.fields.map((f) => [f.name, form[`${step.id}.${f.name}`]]))}
                setValue={setValue(step.id)}
                consents={(step.consents || []).map((_, i) => consents[`${step.id}.${i}`])}
                toggleConsent={toggleConsent(step.id)}
              />
            ))}

            {/* LAST — Thank you (placeholder until the design arrives) */}
            <div className="pf__panel pf__panel--thanks">
              <div className="pf__thanks-inner">
                <h1 className="pf__title pf__title--center">Köszönjük a <span className="pf__title-accent">jelentkezésed!</span></h1>
                <p className="pf__body pf__body--center">Hamarosan e-mailben értesítünk a következő lépésekről.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pf__curve" aria-hidden>
          <svg viewBox="0 0 1440 88" preserveAspectRatio="none">
            <ellipse cx="720" cy="180" rx="1080" ry="180" fill="var(--ac-bg)" />
          </svg>
        </div>
      </div>

      {/* Footer — swaps by panel */}
      <div className="pf__footer">
        {index === 0 && (
          <div className="pf__footer-bar">
            <button className="btn btn-outline" onClick={onShop}>Megvásárolom</button>
            <button className="btn btn-primary" onClick={() => go(1)}>Kipróbálom ingyen</button>
          </div>
        )}
        {isStep && (
          <div className="pf__footer-nav">
            <button className="btn btn-outline" onClick={() => go(index - 1)}>Vissza</button>
            <span className="pf__counter">{stepNumber}/{STEPS.length}</span>
            <button className="btn btn-primary" onClick={() => go(index + 1)}>Tovább</button>
          </div>
        )}
        {index === LAST && (
          <div className="pf__footer-nav pf__footer-nav--center">
            <button className="btn btn-primary" onClick={() => go(0)}>Vissza a kezdőlapra</button>
          </div>
        )}
      </div>
    </div>
  );
}
