
export function TeddySVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="18" cy="22" r="10" fill="#d4a574" />
      <circle cx="18" cy="22" r="6"  fill="#c49060" />
      <circle cx="62" cy="22" r="10" fill="#d4a574" />
      <circle cx="62" cy="22" r="6"  fill="#c49060" />
      <circle cx="40" cy="30" r="22" fill="#d4a574" />
      <circle cx="33" cy="27" r="3.5" fill="#5a3a1a" />
      <circle cx="47" cy="27" r="3.5" fill="#5a3a1a" />
      <ellipse cx="40" cy="36" rx="7" ry="5" fill="#c49060" />
      <circle cx="40" cy="35" r="2.5" fill="#8b5e3c" />
      <circle cx="26" cy="34" r="5" fill="#e8a090" opacity="0.4" />
      <circle cx="54" cy="34" r="5" fill="#e8a090" opacity="0.4" />
      <ellipse cx="40" cy="65" rx="20" ry="18" fill="#d4a574" />
      <path d="M30 52 Q40 46 50 52 Q40 58 30 52Z" fill="white" opacity="0.9" />
      <circle cx="40" cy="52" r="3" fill="#f0e0d0" />
      <ellipse cx="18" cy="64" rx="9" ry="6" fill="#d4a574" transform="rotate(-20 18 64)" />
      <ellipse cx="62" cy="64" rx="9" ry="6" fill="#d4a574" transform="rotate(20 62 64)" />
    </svg>
  );
}