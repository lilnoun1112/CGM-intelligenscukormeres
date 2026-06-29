import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { StarIcon } from './Icons';
import testimonialGuy from '../assets/testimonial-guy.png';
import './Testimonials.css';

const TABS = [
  { key: 'all', label: 'Összes' },
  { key: 'diabetesz', label: 'Diabétesz' },
  { key: 'teljesitmeny', label: 'Teljesítmény' },
  { key: 'eletmod', label: 'Életmód' },
];

/* Realistic placeholder testimonials — 3 per category. `size` drives the
   masonry stagger (photo height). */
const TESTIMONIALS = [
  {
    name: 'Kovács András', role: '1-es típusú diabétesz', category: 'diabetesz', size: 'tall',
    quote: 'Mióta a SmartGuide szenzort hordom, sokkal nyugodtabban alszom. Az éjszakai előrejelzés már többször figyelmeztetett, mielőtt baj lett volna.',
  },
  {
    name: 'Tóth Eszter', role: '2-es típusú diabétesz', category: 'diabetesz', size: 'med',
    quote: 'Végre nem kell naponta többször ujjbegyből vért vennem. A mySugr appban azonnal látom, hogyan hat egy-egy étkezés a cukorszintemre.',
  },
  {
    name: 'Nagy Gábor', role: 'Élsportoló', category: 'teljesitmeny', size: 'med',
    quote: 'Edzés közben valós időben követem a glükózszintemet, így pontosan tudom, mikor kell frissítenem. Sokat javult a teljesítményem.',
  },
  {
    name: 'Szabó Réka', role: 'Amatőr futó', category: 'teljesitmeny', size: 'tall',
    quote: 'A félmaratonra készülve aranyat ér, hogy látom a trendeket. A 2 órás előrejelzés segít elkerülni, hogy a táv felénél lefulladjak.',
  },
  {
    name: 'Horváth Júlia', role: 'Egészségtudatos életmód', category: 'eletmod', size: 'short',
    quote: 'Nem vagyok cukorbeteg, de jobban meg akartam érteni a testem. Meglepő volt látni, mennyire megdobja a cukrom egy késő esti nasi.',
  },
  {
    name: 'Kiss Anna', role: 'Gesztációs diabétesz', category: 'diabetesz', size: 'short',
    quote: 'A várandósságom alatt óriási biztonságot adott. Az orvosom is örült, hogy ennyi pontos adatot tudtam vinni a kontrollokra.',
  },
  {
    name: 'Balogh Márton', role: 'Triatlonista', category: 'teljesitmeny', size: 'short',
    quote: 'Mindhárom sportághoz használom. A folyamatos mérés nélkül ma már el sem tudnám képzelni a felkészülést.',
  },
  {
    name: 'Varga Péter', role: 'Tudatos étkező', category: 'eletmod', size: 'tall',
    quote: 'Az appnak köszönhetően teljesen átalakult a reggelim. Most már tudom, melyik étel tart ki sokáig, és melyik után esem össze két órán belül.',
  },
  {
    name: 'Fekete Dóra', role: 'Aktív édesanya', category: 'eletmod', size: 'med',
    quote: 'Két gyerek mellett nincs időm bonyolult méricskélésre. A szenzort felteszem, és két hétig nem kell vele foglalkoznom.',
  },
];

export default function Testimonials({ onMenu, nav }) {
  const [tab, setTab] = useState('all');
  const visible = tab === 'all' ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.category === tab);

  return (
    <div className="testimonials">
      <Header variant="dark" onMenu={onMenu} nav={nav} />
      <div className="testimonials__pad" />

      <header className="testimonials__head">
        <h1>Felhasználók visszajelzései</h1>
        <p>Ismerd meg közelebbről a terméket.</p>
      </header>

      <div className="testimonials__tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className={`testimonials__tab ${tab === t.key ? 'is-active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="testimonials__grid" key={tab}>
        {visible.map((t) => (
          <article className="tg-card" key={t.name}>
            <div className="tg-card__photo" data-size={t.size}>
              <img src={testimonialGuy} alt="" />
              <div className="tg-card__overlay">
                <div className="tg-card__stars">
                  {Array.from({ length: 5 }).map((_, s) => <StarIcon key={s} color="#26becf" />)}
                </div>
                <span className="tg-card__name">{t.name}</span>
                <span className="tg-card__role">{t.role}</span>
              </div>
            </div>
            <p className="tg-card__quote">{t.quote}</p>
          </article>
        ))}
      </div>

      <Footer />
    </div>
  );
}
