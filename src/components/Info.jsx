import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { CheckCircleIcon, StarIcon } from './Icons';
import { TABS, PREDICTION_CARDS } from './infoData';

import illustrationDiabetes from '../assets/illustration-diabetes.jpg';
import appCard1 from '../assets/app-card-img-1.png';
import appCard2 from '../assets/app-card-img-2.png';
import appCard3 from '../assets/app-card-img-3.png';
import cgmSet from '../assets/CGM-set.png';
import testimonialGuy from '../assets/testimonial-guy.png';

import './Info.css';

const APP_CARD_IMGS = [appCard1, appCard2, appCard3];

export default function Info({ onMenu, onSeeTestimonials }) {
  const [tab, setTab] = useState(0);
  const activeTab = TABS[tab];

  return (
    <div className="info">
      <Header variant="dark" onMenu={onMenu} />
      <div className="info__header-pad" />

      {/* 1. Kinek ajánljuk? — tabbed checklist + image */}
      <section className="info__section">
        <div className="section-head">
          <h2>Kinek ajánljuk?</h2>
          <p>Válaszd ki az alábbi lehetőségek közül, hogy pontosan milyen élethelyzetben használnád az intelligens cukormérést:</p>
        </div>

        <div className="info__tabs" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={i === tab}
              className={`info__tab ${i === tab ? 'is-active' : ''}`}
              onClick={() => setTab(i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="info__segment">
          <ul className="info__checklist" key={activeTab.key}>
            {activeTab.items.map((item) => (
              <li key={item.heading} className="info__check-item">
                <div className="info__check-head">
                  <CheckCircleIcon />
                  <span>{item.heading}</span>
                </div>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="info__segment-img">
            <img src={illustrationDiabetes} alt="Intelligens cukormérés használat közben" />
          </div>
        </div>
      </section>

      {/* 2. Applikáció és következtetések — prediction cards */}
      <section className="info__section">
        <div className="section-head">
          <h2>Applikáció és következtetések</h2>
          <p>Az applikáció átlátható formában mutathatja meg glükózadataidat, hogy könnyebben felismerd a trendeket és összefüggéseket.</p>
        </div>
        <div className="info__cards">
          {PREDICTION_CARDS.map((card, i) => (
            <article className="pcard" key={card.title}>
              <div className="pcard__img-wrap">
                <img src={APP_CARD_IMGS[i]} alt="" />
              </div>
              <div className="pcard__body">
                <span className="pcard__eyebrow">{card.eyebrow}</span>
                <h3 className="pcard__title">{card.title}</h3>
                <p className="pcard__text">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Miből áll a CGM-rendszer? — sensor + app explainer */}
      <section className="info__section">
        <div className="section-head">
          <h2>Miből áll a CGM-rendszer?</h2>
          <p>Ismerd meg közelebbről a terméket.</p>
        </div>
        <div className="info__product">
          <div className="info__product-img">
            <img src={cgmSet} alt="Accu-Chek SmartGuide szenzor és mySugr applikáció" />
          </div>
          <div className="info__product-text">
            <div className="info__product-block">
              <h3><span className="dot" />Accu-Chek SmartGuide szenzor</h3>
              <p>Viseld kényelmes, vízálló CGM-szenzorunkat a felkarodon akár 14 napon át, és kövesd valós időben a pontos glükózértékeidet. A szenzor automatikusan méri a glükózszintedet, így nem kell a napi ujjbegyes mérések miatt aggódnod. Az eszköz előkalibrált, ezért a bemelegedési idő után a CGM-értékeket a terápiás döntéseidhez is használhatod.</p>
            </div>
            <div className="info__product-block">
              <h3><span className="dot" />mySugr applikáció</h3>
              <p>A mySugr applikáció összekapcsolódik a szenzoroddal, így követheted a glükózszintedet, valamint rögzítheted az inzulinbeadásokat, a szénhidrátbevitelt és a napi tevékenységeidet is.</p>
              <p>Magabiztosabb lehetsz, ha tudod, hol tartanak a glükózértékeid, és jobban megértheted, hogyan hat rájuk az életmódod és a terápiád.</p>
              <p>Előrejelző funkcióink megbecsülik a következő 2 órában várható glükózértékeidet, és értesítést küldhetnek, ha 30 percen belül vagy az éjszaka során alacsony glükózszint kockázata merül fel, hogy időben felkészülhess a változásokra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Felhasználók visszajelzései — testimonial preview */}
      <section className="info__section">
        <div className="section-head">
          <h2>Felhasználók visszajelzései</h2>
          <p>Ismerd meg közelebbről a terméket.</p>
        </div>
        <div className="info__cards">
          {[0, 1, 2].map((i) => (
            <article className="tcard" key={i}>
              <div className="tcard__photo">
                <img src={testimonialGuy} alt="" />
                <div className="tcard__overlay">
                  <div className="tcard__stars">
                    {Array.from({ length: 5 }).map((_, s) => <StarIcon key={s} />)}
                  </div>
                  <span className="tcard__name">Kovács András</span>
                  <span className="tcard__role">Lorem Ipsum</span>
                </div>
              </div>
              <p className="tcard__quote">Lorem ipsum dolor sit amet consectetur. Ac malesuada aliquam curabitur amet.</p>
            </article>
          ))}
        </div>
        <button className="btn btn-outline" onClick={onSeeTestimonials}>Megnézem az összeset</button>
      </section>

      {/* 5. Support CTA card */}
      <section className="info__section info__section--support">
        <div className="support-card">
          <h3>Segítségre van szüksége termékeinkkel kapcsolatban?</h3>
          <p>A GYIK-tól a termékkézikönyvekig, fedezze fel online támogatási forrásainkat, hogy mindig megtalálja a szükséges információkat, amikor csak szüksége van rájuk.</p>
          <button className="btn btn-outline">Terméktámogatás</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
