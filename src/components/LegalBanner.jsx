import './LegalBanner.css';

/* Mandatory pharma disclaimer — full-width band fixed at the very top of the
   site, sized to 10% of the viewport height. The text scales fluidly with the
   viewport width so it fills the band as effectively as possible. */
export default function LegalBanner() {
  return (
    <div className="legal-banner" role="note">
      <p className="legal-banner__text">
        A kockázatokról olvassa el a használati útmutatót, vagy kérdezze meg kezelőorvosát!
      </p>
    </div>
  );
}
