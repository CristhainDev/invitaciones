export function Balloon3D({
    color,
    size,
    shadow = false,
}: {
    color: string;
    size: number;
    shadow?: boolean;
}) {
    /*
      IMPORTANTE:
      Quitamos `size` del id porque cambia entre server/client
      y provoca hydration mismatch en Next.js
    */
    const id = `grad-${color.replace("#", "")}`;

    return (
        <svg
            width={size}
            height={Math.round(size * 1.45)}
            viewBox="0 0 70 100"
            fill="none"
            style={{
                filter: shadow
                    ? "drop-shadow(0 8px 18px rgba(0,0,0,0.22))"
                    : "drop-shadow(0 3px 6px rgba(0,0,0,0.10))",
            }}
        >
            <defs>
                <radialGradient id={id} cx="38%" cy="35%" r="62%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.55" />
                    <stop offset="45%" stopColor={color} stopOpacity="1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.7" />
                </radialGradient>
            </defs>

            {/* Main balloon */}
            <ellipse
                cx="35"
                cy="36"
                rx="30"
                ry="34"
                fill={`url(#${id})`}
            />

            {/* Rim */}
            <ellipse
                cx="35"
                cy="70"
                rx="6"
                ry="4"
                fill={color}
                opacity="0.8"
            />

            {/* Knot */}
            <ellipse
                cx="35"
                cy="74"
                rx="3.5"
                ry="3"
                fill={color}
            />

            {/* String */}
            <path
                d="M35 77 Q30 85 35 100"
                stroke={color}
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
            />

            {/* Highlight */}
            <ellipse
                cx="25"
                cy="22"
                rx="9"
                ry="11"
                fill="white"
                opacity="0.32"
            />

            <ellipse
                cx="20"
                cy="18"
                rx="4"
                ry="5"
                fill="white"
                opacity="0.18"
            />
        </svg>
    );
}