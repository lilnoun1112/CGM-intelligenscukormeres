import logoDark from '../assets/intelligenscukormeres_logo.svg';
import logoWhite from '../assets/intelligenscukormeres_logo-white.svg';

/* Two ready-made variants supplied as separate SVGs:
   - dark: blue/dark wordmark for light backgrounds (info page header)
   - white: white wordmark for the hero photo header */
export default function Logo({ variant = 'dark', height = 48 }) {
  return (
    <img
      src={variant === 'white' ? logoWhite : logoDark}
      alt="Intelligens Cukormérés — Powered by Roche"
      style={{ height, width: 'auto', display: 'block' }}
    />
  );
}
