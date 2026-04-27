 export function BalloonCluster() {
  return (
    <svg viewBox="0 0 340 270" fill="none" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 10px 30px rgba(127,179,211,0.25))" }}>
      <defs>
        <radialGradient id="bg1" cx="38%" cy="32%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.55"/><stop offset="100%" stopColor="#d4b896" stopOpacity="0.85"/></radialGradient>
        <radialGradient id="bg2" cx="38%" cy="32%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.55"/><stop offset="100%" stopColor="#a8c8e8" stopOpacity="0.85"/></radialGradient>
        <radialGradient id="bg3" cx="38%" cy="32%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.55"/><stop offset="100%" stopColor="#e8d5b7" stopOpacity="0.85"/></radialGradient>
        <radialGradient id="bg4" cx="38%" cy="32%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.55"/><stop offset="100%" stopColor="#b8d8f0" stopOpacity="0.92"/></radialGradient>
        <radialGradient id="bg5" cx="38%" cy="32%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.55"/><stop offset="100%" stopColor="#c8dff0" stopOpacity="0.75"/></radialGradient>
      </defs>
      {/* Back layer */}
      <ellipse cx="75"  cy="100" rx="36" ry="42" fill="url(#bg1)" />
      <ellipse cx="265" cy="100" rx="36" ry="42" fill="url(#bg2)" />
      <ellipse cx="45"  cy="72"  rx="28" ry="34" fill="url(#bg2)" opacity="0.8" />
      <ellipse cx="295" cy="72"  rx="28" ry="34" fill="url(#bg3)" opacity="0.8" />
      <ellipse cx="40"  cy="48"  rx="22" ry="26" fill="url(#bg5)" opacity="0.7" />
      <ellipse cx="300" cy="48"  rx="22" ry="26" fill="url(#bg1)" opacity="0.7" />
      {/* Mid layer */}
      <ellipse cx="112" cy="80"  rx="34" ry="40" fill="url(#bg3)" />
      <ellipse cx="228" cy="80"  rx="34" ry="40" fill="url(#bg4)" />
      <ellipse cx="100" cy="55"  rx="26" ry="30" fill="url(#bg2)" opacity="0.85" />
      <ellipse cx="240" cy="55"  rx="26" ry="30" fill="url(#bg1)" opacity="0.85" />
      {/* Front center - largest */}
      <ellipse cx="170" cy="55"  rx="40" ry="46" fill="url(#bg1)" />
      <ellipse cx="140" cy="50"  rx="33" ry="38" fill="url(#bg4)" />
      <ellipse cx="200" cy="50"  rx="33" ry="38" fill="url(#bg3)" />
      {/* Stars on balloons */}
      <text x="72"  y="108" fontSize="14" fill="#e8c96a" opacity="0.9" textAnchor="middle">★</text>
      <text x="264" y="108" fontSize="12" fill="#e8c96a" opacity="0.8" textAnchor="middle">★</text>
      <text x="44"  y="56"  fontSize="10" fill="#e8c96a" opacity="0.7" textAnchor="middle">✦</text>
      <text x="296" y="56"  fontSize="10" fill="#e8c96a" opacity="0.7" textAnchor="middle">✦</text>
      {/* Strings */}
      {[100,118,136,154,170,186,202,220,240].map((x, i) => (
        <line key={i} x1={x} y1={i%2===0?118:110} x2={x-6+i*2} y2={160}
          stroke="#c5a882" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      ))}
      {/* Basket */}
      <rect x="100" y="160" width="140" height="88" rx="14" fill="#c5a882" />
      <rect x="100" y="160" width="140" height="18" rx="9" fill="#b8956e" />
      {[120,140,160,180,200,220].map((x,i)=>(
        <line key={i} x1={x} y1="178" x2={x} y2="248" stroke="#a07a50" strokeWidth="1" opacity="0.35"/>
      ))}
      {[185,205,225].map((y,i)=>(
        <line key={i} x1="100" y1={y} x2="240" y2={y} stroke="#a07a50" strokeWidth="1" opacity="0.35"/>
      ))}
      {[116,132,148,164,180,196,212,228].map((x,i)=>(
        <line key={i} x1={x} y1="248" x2={x} y2="264" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
      ))}
      {/* Teddy */}
      <circle cx="150" cy="174" r="10" fill="#d4a574"/><circle cx="150" cy="174" r="6" fill="#c49060"/>
      <circle cx="190" cy="174" r="10" fill="#d4a574"/><circle cx="190" cy="174" r="6" fill="#c49060"/>
      <circle cx="170" cy="183" r="20" fill="#d4a574"/>
      <circle cx="163" cy="180" r="3" fill="#5a3a1a"/><circle cx="177" cy="180" r="3" fill="#5a3a1a"/>
      <ellipse cx="170" cy="188" rx="6" ry="4" fill="#c49060"/>
      <circle cx="170" cy="187" r="2" fill="#8b5e3c"/>
      <circle cx="155" cy="187" r="5" fill="#e8a090" opacity="0.4"/>
      <circle cx="185" cy="187" r="5" fill="#e8a090" opacity="0.4"/>
      <path d="M158 200 Q170 193 182 200 Q170 207 158 200Z" fill="white" opacity="0.9"/>
      <ellipse cx="170" cy="222" rx="24" ry="14" fill="#d4a574" opacity="0.8"/>
      <ellipse cx="140" cy="214" rx="12" ry="7" fill="#d4a574" transform="rotate(-35 140 214)"/>
      <ellipse cx="200" cy="214" rx="12" ry="7" fill="#d4a574" transform="rotate(35 200 214)"/>
    </svg>
  );
}