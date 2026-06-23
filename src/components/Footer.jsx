import { FacebookIcon, InstagramIcon, YouTubeIcon, ChevronIcon } from './Icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <span className="footer__roche">Roche</span>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="YouTube"><YouTubeIcon /></a>
          </div>
          <button className="footer__country">
            <span className="footer__flag" aria-hidden>🇬🇧</span>
            <span>UNITED KINGDOM</span>
            <ChevronIcon dir="down" size={14} color="#737373" />
          </button>
        </div>

        <nav className="footer__cols">
          <div className="footer__col">
            <h4>Global websites</h4>
            <a href="#">Roche</a>
            <a href="#">Roche Diabetes Care</a>
            <a href="#">Accu-Chek</a>
            <a href="#">All location</a>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <a href="#">T&Cs</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Sitemap</a>
          </div>
          <div className="footer__col">
            <h4>Useful links</h4>
            <a href="#">About</a>
            <a href="#">Contact us</a>
            <a href="#">Newsletter</a>
            <a href="#">Career</a>
          </div>
        </nav>
      </div>

      <div className="footer__divider" />
      <div className="footer__legal">
        <p>
          This website contains information on products which are targeted to a wide range of audiences
          and could contain product details or information otherwise not accessible or valid in your country.
          Please be aware that we do not take any responsibility for accessing such information which may not
          comply with any valid legal process, regulation, registration or usage in the country of your origin.
        </p>
        <p className="footer__copy">© 2025 Roche Diabetes Care Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}
