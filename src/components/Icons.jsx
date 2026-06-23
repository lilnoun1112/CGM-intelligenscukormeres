/* Icon set — recreated as inline SVG to match the Figma vector shapes.
   Color is driven by `currentColor` / explicit strokes so they theme cleanly. */

const T = '#1a818d'; // teal/blue used by Accu-Chek line icons
const G = '#8eb927'; // green accent

export function PhoneGraphIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" aria-hidden>
      <rect x="22" y="8" width="28" height="56" rx="6" stroke={T} strokeWidth="3" />
      <line x1="31" y1="14" x2="41" y2="14" stroke={T} strokeWidth="3" strokeLinecap="round" />
      <path d="M27 46 L33 40 L38 44 L45 33" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="45" cy="33" r="2.4" fill={G} />
    </svg>
  );
}

export function AIIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" aria-hidden>
      <path d="M24 22 C20 22 17 25 17 29 C13 30 11 34 13 38 C11 42 14 47 18 47 C19 51 24 53 28 50"
        stroke={T} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M48 22 C52 22 55 25 55 29 C59 30 61 34 59 38 C61 42 58 47 54 47 C53 51 48 53 44 50"
        stroke={T} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="36" y="42" textAnchor="middle" fontFamily="Mulish, sans-serif" fontWeight="800" fontSize="20" fill={G}>AI</text>
      <circle cx="17" cy="29" r="2.6" fill={T} /><circle cx="55" cy="29" r="2.6" fill={T} />
      <circle cx="13" cy="38" r="2.6" fill={T} /><circle cx="59" cy="38" r="2.6" fill={T} />
    </svg>
  );
}

export function CalendarIcon({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" aria-hidden>
      <rect x="12" y="16" width="48" height="44" rx="6" stroke={T} strokeWidth="3" />
      <line x1="12" y1="28" x2="60" y2="28" stroke={T} strokeWidth="3" />
      <line x1="24" y1="10" x2="24" y2="20" stroke={T} strokeWidth="3" strokeLinecap="round" />
      <line x1="48" y1="10" x2="48" y2="20" stroke={T} strokeWidth="3" strokeLinecap="round" />
      <path d="M28 43 L34 49 L46 37" stroke={G} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function HamburgerIcon({ size = 28, color = '#0b393e' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden>
      <line x1="3" y1="8" x2="25" y2="8" stroke={color} strokeWidth="2.3" strokeLinecap="round" />
      <line x1="3" y1="14" x2="25" y2="14" stroke={color} strokeWidth="2.3" strokeLinecap="round" />
      <line x1="3" y1="20" x2="25" y2="20" stroke={color} strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronIcon({ size = 20, color = '#0b393e', dir = 'right' }) {
  const rot = { right: 0, left: 180, down: 90, up: -90 }[dir] || 0;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M7 4 L13 10 L7 16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function StarIcon({ size = 18, color = '#8eb927' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={color} aria-hidden>
      <path d="M9 1 L11.3 6.2 L17 6.8 L12.8 10.6 L14 16.2 L9 13.3 L4 16.2 L5.2 10.6 L1 6.8 L6.7 6.2 Z" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="10" fill={G} />
      <path d="M5.5 10.2 L8.5 13 L14.5 6.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 24, color = '#0b393e' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M14 8.5h2.5V5.2C16 5.1 14.8 5 13.6 5 11 5 9.3 6.6 9.3 9.4V12H6.5v3.4h2.8V24h3.4v-8.6h2.7l.5-3.4h-3.2V9.7c0-.9.3-1.2 1-1.2Z" />
    </svg>
  );
}
export function InstagramIcon({ size = 24, color = '#0b393e' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill={color} stroke="none" />
    </svg>
  );
}
export function YouTubeIcon({ size = 24, color = '#0b393e' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.4 12 31 31 0 0 0 22 8.2ZM10 15V9l5.2 3Z" />
    </svg>
  );
}
