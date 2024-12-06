/** Two linked rounded rectangles on the raspberry tile. */
export function LogoMark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--brand)" />
      <rect x="6.5" y="11" width="12" height="10" rx="5" fill="none" stroke="#fff" strokeWidth="2.6" />
      <rect x="13.5" y="11" width="12" height="10" rx="5" fill="none" stroke="#fff" strokeOpacity=".62" strokeWidth="2.6" />
    </svg>
  );
}
