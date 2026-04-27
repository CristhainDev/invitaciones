/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { Balloon3D } from "@/components/invitations/Balloon3D";
import { BalloonCluster } from "@/components/invitations/BalloonCluster";
import { TeddySVG } from "@/components/invitations/TeddySVG";
import { useState, useEffect } from "react";
import { MapPinIcon, CheckIcon } from "@heroicons/react/24/solid";
import { RSVPForm } from "@/components/invitations/RSVPForm";
import { SuccessMessage } from "@/components/invitations/SuccessMessage";
import { supabase } from "@/lib/supabase";

/* ══════════════════════════════════════════════
   BALLOON DATA — fixed positions for 3 layers
══════════════════════════════════════════════ */
// Layer BACK (z=1, behind card, small, blurred)
const BACK_BALLOONS = [
  { color: "#a8c8e8", size: 48, x: "5%", y: "18%", dur: 7, delay: 0, drift: 15, rot: 6 },
  { color: "#d4b896", size: 42, x: "88%", y: "12%", dur: 8, delay: 1.5, drift: -12, rot: -5 },
  { color: "#b8d8f0", size: 36, x: "12%", y: "55%", dur: 9, delay: 3, drift: 18, rot: 8 },
  { color: "#e8d5b7", size: 44, x: "80%", y: "48%", dur: 7, delay: 0.8, drift: -20, rot: -7 },
  { color: "#c8dff0", size: 32, x: "50%", y: "8%", dur: 10, delay: 2, drift: 10, rot: 4 },
  { color: "#f5d0c8", size: 38, x: "70%", y: "70%", dur: 8, delay: 4, drift: -15, rot: -6 },
  { color: "#d4b896", size: 30, x: "25%", y: "75%", dur: 11, delay: 1, drift: 12, rot: 5 },
  { color: "#a8c8e8", size: 50, x: "92%", y: "82%", dur: 7, delay: 2.5, drift: -18, rot: -8 },
];

// Layer FRONT (z=10, in front of card, large, shadow, semi-transparent)
const FRONT_BALLOONS = [
  { color: "#a8c8e8", size: 90, x: "-6%", yOffset: "15%", dur: 6, delay: 0, drift: 12, rot: 5, opacity: 0.82 },
  { color: "#d4b896", size: 110, x: "88%", yOffset: "22%", dur: 7, delay: 1, drift: -14, rot: -6, opacity: 0.78 },
  { color: "#e8d5b7", size: 75, x: "-4%", yOffset: "62%", dur: 8, delay: 2.5, drift: 16, rot: 7, opacity: 0.75 },
  { color: "#b8d8f0", size: 95, x: "84%", yOffset: "58%", dur: 6, delay: 0.5, drift: -10, rot: -5, opacity: 0.80 },
  { color: "#f5d0c8", size: 70, x: "42%", yOffset: "88%", dur: 9, delay: 3, drift: 8, rot: 4, opacity: 0.70 },
  { color: "#c8dff0", size: 85, x: "18%", yOffset: "92%", dur: 7, delay: 1.8, drift: 14, rot: 6, opacity: 0.72 },
];

type RisingBalloon = {
  color: string;
  size: number;
  left: number;
  dur: number;
  delay: number;
  drift: number;
};

type StarParticle = {
  top: number;
  left: number;
  size: number;
  color: string;
  dur: number;
  delay: number;
  sym: string;
  layer: number;
};

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function BabyShowerPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);

  const [ready, setReady] = useState(false);
  const [risingBalloons, setRisingBalloons] = useState<RisingBalloon[]>([]);
  const [stars, setStars] = useState<StarParticle[]>([]);

  const BCOLORS = ["#a8c8e8", "#b8d8f0", "#d4b896", "#e8d5b7", "#c8dff0", "#e0ccb0", "#f5d0c8", "#b0ccdc"];
  const SCOLORS = ["#e8c96a", "#a8c8e8", "#d4b896", "#f0b8c8", "#c8b8e8"];

  useEffect(() => {
    const generatedBalloons = Array.from({ length: 14 }, (_, i) => ({
      color: BCOLORS[i % BCOLORS.length],
      size: 22 + Math.floor(Math.random() * 22),
      left: Math.floor(Math.random() * 94),
      dur: 12 + Math.floor(Math.random() * 14),
      delay: Math.floor(Math.random() * 22),
      drift:
        (Math.random() > 0.5 ? 1 : -1) *
        (20 + Math.floor(Math.random() * 50)),
    }));

    const generatedStars = Array.from({ length: 28 }, (_, i) => ({
      top: Math.floor(Math.random() * 90),
      left: Math.floor(Math.random() * 97),
      size: 8 + Math.floor(Math.random() * 18),
      color: SCOLORS[i % SCOLORS.length],
      dur: 2.5 + Math.random() * 4,
      delay: Math.random() * 5,
      sym: ["★", "✦", "✧", "⭐"][i % 4],
      layer: i % 3,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRisingBalloons(generatedBalloons);
    setStars(generatedStars);
    setReady(true);
  }, []);


  // handleSubmit completo recomendado

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    const { error } = await supabase
      .from("guests")
      .insert([
        {
          name: name.trim(),
          attending: attending,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Ocurrió un error al confirmar asistencia");
      return;
    }

    await fetch("/api/send-rsvp-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guestName: name.trim(),
        attending: attending,
      }),
    });

    setSubmitted(true);
  };


  const openMaps = () => {
    const destination = "25.6501455,-100.1912025";

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const url = isIOS
      ? `http://maps.apple.com/?q=${destination}`
      : `https://www.google.com/maps?q=${destination}`;

    window.open(url, "_blank");
  };


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Lato', sans-serif;
          background: linear-gradient(150deg, #dff0fc 0%, #fdf6ee 50%, #ede8f5 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── keyframes ── */
        @keyframes floatBob {
          0%,100% { transform: translateY(0px) rotate(var(--rot-start, -2deg)); }
          50%      { transform: translateY(var(--bob, -18px)) rotate(var(--rot-end, 2deg)); }
        }
        @keyframes riseUp {
          0%   { transform: translateX(0) translateY(0); opacity: 0; }
          8%   { opacity: 0.6; }
          92%  { opacity: 0.4; }
          100% { transform: translateX(var(--drift)) translateY(-115vh); opacity: 0; }
        }
        @keyframes clusterFloat {
          0%,100% { transform: translateY(0px) rotate(-1.5deg); }
          50%      { transform: translateY(-16px) rotate(1.5deg); }
        }
        @keyframes starPulse {
          0%,100% { transform: scale(0.8) rotate(0deg);   opacity: 0.22; }
          50%      { transform: scale(1.4) rotate(28deg);  opacity: 0.9; }
        }
        @keyframes bearSway {
          0%,100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%        { left:-100%; }
          55%,100%  { left:200%; }
        }
        @keyframes nameGlow {
          from { text-shadow:0 2px 10px rgba(74,138,181,0.15); }
          to   { text-shadow:0 2px 30px rgba(74,138,181,0.50), 0 0 60px rgba(127,179,211,0.2); }
        }
        @keyframes popIn {
          from { opacity:0; transform:scale(0.82); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes orbMove {
          0%,100% { transform:translate(0,0) scale(1); }
          50%      { transform:translate(28px,18px) scale(1.06); }
        }

        /* ── page scaffold ── */
        .bs-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 16px 64px;
          overflow-x: hidden;
          /* perspective for 3D layering */
          perspective: 900px;
        }

        /* ── background orbs ── */
        .bs-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(72px);
          pointer-events: none;
          animation: orbMove 18s ease-in-out infinite;
          z-index: 0;
        }

        /* ── rising ambient balloons (z=1, behind everything) ── */
        .amb-balloon {
          position: fixed;
          bottom: -80px;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
          animation: riseUp linear infinite;
        }

        /* ── fixed background balloons (z=2) ── */
        .back-balloon {
          position: fixed;
          pointer-events: none;
          z-index: 2;
          filter: blur(1.5px);
          animation: floatBob ease-in-out infinite;
        }

        /* ── star particles ── */
        .star-p {
          position: fixed;
          pointer-events: none;
          animation: starPulse ease-in-out infinite;
          line-height: 1;
        }

        /* ── FRONT balloons (z=20, over card) ── */
        .front-balloon {
          position: fixed;
          pointer-events: none;
          z-index: 20;
          animation: floatBob ease-in-out infinite;
          /* each has its own var */
        }

        /* ── hero cluster ── */
        .hero-cluster {
          position: relative;
          z-index: 5;
          width: 260px;
          height: 210px;
          animation: clusterFloat 5s ease-in-out infinite;
          margin-top: 28px;
          flex-shrink: 0;
        }
        @media (min-width: 480px) { .hero-cluster { width:310px; height:250px; } }
        @media (min-width: 768px) { .hero-cluster { width:360px; height:290px; } }

        /* ── card (z=10, between back and front balloons) ── */
        .bs-card {
          position: relative;
          z-index: 10;
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 28px;
          box-shadow:
            0 20px 80px rgba(127,179,211,0.18),
            0 8px 30px rgba(150,120,80,0.10),
            0 2px 8px rgba(0,0,0,0.04);
          width: 100%;
          max-width: 420px;
          padding: 32px 24px 40px;
          margin-top: -18px;
          overflow: hidden;
          animation: fadeUp 0.9s ease both;
        }
        @media (min-width: 480px) { .bs-card { padding:36px 32px 44px; border-radius:32px; max-width:460px; } }
        @media (min-width: 768px) { .bs-card { padding:48px 48px 54px; border-radius:36px; max-width:540px; } }

        .bs-card::before {
          content:'';
          position:absolute; top:0; left:-100%;
          width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.36),transparent);
          animation: shimmer 7s ease-in-out infinite;
          pointer-events:none;
        }

        /* ── typography ── */
        .t-script { font-family:'Dancing Script',cursive; }
        .t-serif  { font-family:'Playfair Display',serif; }
        .t-sans   { font-family:'Lato',sans-serif; }
        .t-label  {
          font-family:'Lato',sans-serif;
          font-weight:900; font-size:9px;
          letter-spacing:0.2em; text-transform:uppercase;
          color:#9a8a72;
        }

        /* ── tagline ── */
        .tagline-row {
          display:flex; justify-content:space-between;
          align-items:center; margin-bottom:6px;
        }
        .tagline-script {
          font-family:'Dancing Script',cursive;
          font-size:clamp(22px,6vw,28px);
          color:#7fb3d3; line-height:1; display:block;
        }

        /* ── BABY big ── */
        .baby-big {
          font-family:'Playfair Display',serif;
          font-weight:700;
          font-size:clamp(70px,22vw,104px);
          color:#b8d8f0;
          letter-spacing:6px; line-height:0.88;
          text-align:center;
          text-shadow:0 4px 24px rgba(127,179,211,0.22);
        }

        /* ── divider ── */
        .divider { display:flex; align-items:center; gap:8px; margin:12px 0; }
        .divider-line { flex:1; height:1px; background:linear-gradient(to right,transparent,#c5a882,transparent); }

        /* ── name ── */
        .baby-name {
          font-family:'Dancing Script',cursive;
          font-size:clamp(34px,10vw,46px);
          color:#4a8ab5; text-align:center;
          line-height:1.2;
          animation:nameGlow 3s ease-in-out infinite alternate;
        }

        /* ── event row ── */
        .event-row {
          display:flex; align-items:center; justify-content:center;
          padding:18px 0;
          border-top:1px solid rgba(197,168,130,0.3);
          border-bottom:1px solid rgba(197,168,130,0.3);
        }
        .event-col { flex:1; text-align:center; }
        .event-num {
          font-family:'Playfair Display',serif; font-weight:700;
          font-size:clamp(36px,10vw,50px); color:#7fb3d3; line-height:1;
        }
        .event-time {
          font-family:'Playfair Display',serif; font-weight:700;
          font-size:clamp(30px,9vw,44px); color:#7fb3d3; line-height:1;
        }
        .event-place {
          font-family:'Lato',sans-serif; font-weight:700;
          font-size:clamp(9px,2.2vw,11px);
          letter-spacing:0.1em; text-transform:uppercase;
          color:#4a8ab5; line-height:1.7;
        }
        .event-vdiv {
          width:1px; height:60px; flex-shrink:0; margin:0 6px;
          background:linear-gradient(to bottom,transparent,#c5a882,transparent);
        }

        /* ── buttons ── */
        .btn-wrap { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
        .btn-primary {
          background:linear-gradient(135deg,#7fb3d3,#4a8ab5);
          color:white; border:none; border-radius:50px;
          padding:13px 22px;
          font-family:'Lato',sans-serif; font-weight:700; font-size:13px;
          letter-spacing:0.05em; cursor:pointer;
          box-shadow:0 6px 22px rgba(74,138,181,0.32);
          transition:transform .2s,box-shadow .2s;
          -webkit-tap-highlight-color:transparent;
          touch-action:manipulation;
        }
        .btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(74,138,181,0.42); }
        .btn-secondary {
          background:transparent; color:#7fb3d3;
          border:2px solid #b8d8f0; border-radius:50px;
          padding:11px 22px;
          font-family:'Lato',sans-serif; font-weight:700; font-size:13px;
          cursor:pointer; transition:all .2s;
          -webkit-tap-highlight-color:transparent;
          touch-action:manipulation;
        }
        .btn-secondary:hover { background:rgba(127,179,211,0.10); transform:translateY(-2px); }

        /* ── form ── */
        .form-box {
          background:rgba(184,216,240,0.12);
          border:1px solid rgba(184,216,240,0.48);
          border-radius:20px; padding:22px 18px;
          animation:popIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .form-label {
          display:block; font-family:'Lato',sans-serif; font-weight:900;
          font-size:9px; letter-spacing:0.18em; text-transform:uppercase;
          color:#9a8a72; margin-bottom:5px;
        }
        .form-input, .form-select {
          width:100%; font-family:'Lato',sans-serif; font-size:14px;
          background:rgba(255,255,255,0.88);
          border:1.5px solid rgba(197,168,130,0.4);
          border-radius:12px; padding:11px 14px; color:#3a2e1e;
          outline:none; transition:border-color .2s,box-shadow .2s;
          -webkit-appearance:none; appearance:none;
        }
        .form-input:focus, .form-select:focus {
          border-color:#7fb3d3; box-shadow:0 0 0 3px rgba(127,179,211,0.15);
        }

        /* ── success ── */
        .success-box {
          background:rgba(184,216,240,0.16);
          border:1px solid rgba(127,179,211,0.42);
          border-radius:20px; padding:22px 18px; text-align:center;
          animation:popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        /* ── emoji float ── */
        .emoji-float { display:inline-block; animation:clusterFloat ease-in-out infinite; }

        /* ── ghost bears ── */
        .ghost-bear {
          position:fixed; pointer-events:none; z-index:2; opacity:0.06;
          animation:bearSway ease-in-out infinite alternate;
        }
      `}</style>

      {/* ══ BACKGROUND LAYER (z=0–2) ══════════════════════ */}

      {/* Gradient orbs */}
      <div className="bs-orb" style={{ width: 420, height: 420, background: "radial-gradient(circle,#b8d8f0,transparent)", top: -120, left: -120, opacity: 0.28 }} />
      <div className="bs-orb" style={{ width: 360, height: 360, background: "radial-gradient(circle,#f5e6d0,transparent)", bottom: 0, right: -100, opacity: 0.22, animationDelay: "4s" }} />
      <div className="bs-orb" style={{ width: 280, height: 280, background: "radial-gradient(circle,#e0d0f0,transparent)", top: "40%", left: "55%", opacity: 0.18, animationDelay: "8s" }} />

      {/* Ghost bears */}
      <div className="ghost-bear" style={{ right: "3%", bottom: "14%", animationDuration: "3.8s" }}><TeddySVG size={44} /></div>
      <div className="ghost-bear" style={{ right: "30%", bottom: "6%", animationDuration: "4.5s", animationDelay: "1s" }}><TeddySVG size={30} /></div>
      <div className="ghost-bear" style={{ left: "2%", bottom: "20%", animationDuration: "5s", animationDelay: "2s" }}><TeddySVG size={36} /></div>

      {/* BACK fixed balloons (z=2, blurred, small) */}
      {BACK_BALLOONS.map((b, i) => (
        <div
          key={`back-${i}`}
          className="back-balloon"
          style={{
            left: b.x, top: b.y,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            ["--rot-start" as string]: `${-b.rot}deg`,
            ["--rot-end" as string]: `${b.rot}deg`,
            ["--bob" as string]: "-14px",
          }}
        >
          <Balloon3D color={b.color} size={b.size} />
        </div>
      ))}

      {/* Rising ambient balloons */}
      {ready && risingBalloons.map((b, i) => (
        <div
          key={`rise-${i}`}
          className="amb-balloon"
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            ["--drift" as string]: `${b.drift}px`,
          }}
        >
          <Balloon3D color={b.color} size={b.size} />
        </div>
      ))}

      {/* Stars — back layer (z=2) */}
      {ready && stars
        .filter((s) => s.layer === 0)
        .map((s, i) => (
          <div
            key={`sb-${i}`}
            className="star-p"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              fontSize: s.size,
              color: s.color,
              zIndex: 2,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.sym}
          </div>
        ))}

      {/* ══ CARD LAYER (z=10) — rendered inside bs-page below ══ */}

      {/* Stars — mid layer (z=12, above card) */}
      {stars
        .filter((s) => s.layer === 1)
        .map((s, i) => (
          <div
            key={`sm-${i}`}
            className="star-p"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              fontSize: s.size,
              color: s.color,
              zIndex: 12,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.sym}
          </div>
        ))}

      {/* FRONT balloons (z=20, large, over card) */}
      {FRONT_BALLOONS.map((b, i) => (
        <div
          key={`front-${i}`}
          className="front-balloon"
          style={{
            left: b.x,
            top: b.yOffset,
            opacity: b.opacity,
            animationDuration: `${b.dur}s`,
            animationDelay: `${i * 0.7}s`,
            ["--rot-start" as string]: `${-b.rot}deg`,
            ["--rot-end" as string]: `${b.rot}deg`,
            ["--bob" as string]: "-22px",
          }}
        >
          <Balloon3D color={b.color} size={b.size} shadow />
        </div>
      ))}

      {/* Stars — front layer (z=22) */}
      {stars
        .filter((s) => s.layer === 2)
        .map((s, i) => (
          <div
            key={`sf-${i}`}
            className="star-p"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              fontSize: s.size + 4,
              color: s.color,
              zIndex: 22,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.sym}
          </div>
        ))}

      {/* ══ PAGE CONTENT ══════════════════════════════════ */}
      <div className="bs-page">

        {/* Hero balloon cluster */}
        <div className="hero-cluster">
          <BalloonCluster />
        </div>

        {/* ── CARD ─────────────────────────────────────── */}
        <div className="bs-card">

          {/* Tagline */}
          <div className="tagline-row">
            <div style={{ textAlign: "center" }}>
              <span className="t-label">ESTAMOS</span>
              <span className="tagline-script">dulce</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              {(["#e8c96a", "#a8c8e8", "#e8c96a"] as const).map((c, i) => (
                <span key={i} style={{
                  fontSize: i === 1 ? 18 : 11, color: c, display: "block",
                  animation: `starPulse ${2 + i}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.4}s`
                }}>★</span>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <span className="t-label">EN LA</span>
              <span className="tagline-script">espera</span>
            </div>
          </div>

          {/* BABY */}
          <div className="baby-big">BABY</div>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span style={{ fontSize: 13, color: "#e8c96a" }}>★</span>

            <span style={{ fontSize: 13, color: "#e8c96a" }}>★</span>
            <div className="divider-line" />
          </div>

          {/* Invite text */}
          <p className="t-label" style={{ textAlign: "center", color: "#4a8ab5", letterSpacing: "0.12em", marginBottom: 4 }}>
            NALLELY &amp; RODRIGO TE INVITAN A CELEBRAR SU
          </p>
          <p className="t-serif" style={{ textAlign: "center", fontSize: 14, color: "#6b5a42", marginBottom: 8 }}>
            Baby Shower en honor a:
          </p>
          <h1 className="baby-name" style={{ marginBottom: 14 }}>Noah Zareth</h1>
          <p className="t-sans" style={{ textAlign: "center", fontSize: 13, color: "#9a8a72", lineHeight: 1.75, maxWidth: 300, margin: "0 auto 22px", fontWeight: "bold" }}>
            Pronto llegará nuestro bebé, por eso queremos compartir contigo esta fecha tan especial.
          </p>

          {/* Event details */}
          <div className="event-row" style={{ marginBottom: 20 }}>
            <div className="event-col">
              <p className="t-label">JUEVES</p>
              <p className="event-num">07</p>
              <p className="t-label">MAYO</p>
            </div>
            <div className="event-vdiv" />
            <div className="event-col">
              <p className="event-place">SALÓN<br />Marie<br /> EVENTOS</p>
            </div>
            <div className="event-vdiv" />
            <div className="event-col">
              <p className="t-label">A LA</p>
              <p className="event-time">1:00</p>
              <p className="t-label">P.M.</p>
            </div>
          </div>


          {/* Mini bears row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 20, opacity: 0.82 }}>
            {([36, 44, 36] as const).map((sz, i) => (
              <div key={i} style={{ animation: `bearSway ${3.5 + i * 0.8}s ease-in-out infinite alternate`, animationDelay: `${i * 0.6}s` }}>
                <TeddySVG size={sz} />
              </div>
            ))}
          </div>

          {/* CTA */}
          {!submitted && (
            <div className="btn-wrap" style={{ marginBottom: 18 }}>
              <a
                href="https://www.google.com/maps/place/Marie+Eventos/@25.6501859,-100.1942782,16.8z/data=!4m14!1m7!3m6!1s0x8662c111125293af:0x63b3393f35f87ca6!2sMarie+Eventos!8m2!3d25.6501455!4d-100.1912025!16s%2Fg%2F11wxhnqfbg!3m5!1s0x8662c111125293af:0x63b3393f35f87ca6!8m2!3d25.6501455!4d-100.1912025!16s%2Fg%2F11wxhnqfbg?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  minWidth: "170px",
                }}
              >
                <MapPinIcon
                  style={{
                    width: "18px",
                    height: "18px",
                    flexShrink: 0,
                  }}
                />
                <span>Ubicación</span>
              </a>

              <button
                onClick={openMaps}
                className="btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  minWidth: "170px",
                }}
              >
                <MapPinIcon
                  style={{
                    width: "18px",
                    height: "18px",
                    flexShrink: 0,
                  }}
                />
                <span>Ubicación</span>
              </button>

              <button
                className="btn-primary"
                onClick={() => setShowForm((v) => !v)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  minWidth: "220px",
                }}
              >
                <CheckIcon
                  style={{
                    width: "18px",
                    height: "18px",
                    flexShrink: 0,
                  }}
                />
                <span>Confirmar asistencia</span>
              </button>
            </div>
          )}

          {/* Form */}
          {showForm && !submitted && (
            <RSVPForm
              name={name}
              attending={attending}
              setAttending={setAttending}
              setName={setName}
              handleSubmit={handleSubmit}
            />
          )}

          {submitted && (
            <SuccessMessage
              attending={attending}
              name={name}
            />
          )}

          {/* Closing */}
          <div className="divider">
            <div className="divider-line" />
            <span style={{ fontSize: 13, color: "#e8c96a" }}>✦</span>
            <div className="divider-line" />
          </div>
          <p className="t-script" style={{ fontFamily: "'Dancing Script',cursive", fontSize: "clamp(28px,8vw,36px)", color: "#7fb3d3", textAlign: "center", marginTop: 12 }}>
            ¡Te esperamos!
          </p>

        </div>

        <div style={{ height: 64 }} />
      </div>
    </>
  );
}