import { useEffect, useRef } from "react";

interface HeroProps {
  coupleNames: string;
  weddingDate: string;
  location: string;
  heroTitle: string;
  heroSubtitle: string;
}

export default function Hero({ coupleNames, weddingDate, location, heroTitle, heroSubtitle }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(-50%, calc(-50% + ${y * 0.25}px))`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [first, ...rest] = coupleNames.split(" & ");
  const second = rest.join(" & ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse 120% 100% at 50% 0%, #211000 0%, #0e0500 45%, #070200 100%)" }}
    >
      {/* Ambient orb */}
      <div
        ref={orbRef}
        className="absolute pointer-events-none"
        style={{
          top: "42%", left: "50%",
          width: "900px", height: "600px",
          background: "radial-gradient(ellipse at center, rgba(200,130,40,0.11) 0%, rgba(160,90,20,0.05) 50%, transparent 75%)",
          transform: "translate(-50%,-50%)",
          filter: "blur(2px)",
        }}
      />

      {/* Fine grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,160,80,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,160,80,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <FloatingPetals />

      {/* Ring pulse behind title */}
      <div className="absolute left-1/2 top-[42%] pointer-events-none" style={{ transform: "translate(-50%,-50%)" }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: "480px", height: "480px",
              border: "1px solid rgba(212,160,80,0.06)",
              borderRadius: "50%",
              transform: "translate(-50%,-50%)",
              animation: `ringExpand ${4 + i * 2}s ease-out ${i * 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-28 max-w-5xl mx-auto w-full">

        {/* Location badge */}
        <div className="anim-hero-1 mb-10 flex items-center gap-5">
          <div
            className="anim-line h-px w-20 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-500/30"
            style={{ transformOrigin: "right" }}
          />
          <span
            className="text-amber-400/70 text-[10px] tracking-[0.55em] uppercase font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "0.55em" }}
          >
            {location}
          </span>
          <div
            className="anim-line h-px w-20 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-500/30"
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Names */}
        <div className="anim-hero-2 mb-2">
          <h1
            className="text-[clamp(3.5rem,12vw,9rem)] font-thin leading-none text-white"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              textShadow: "0 0 120px rgba(212,130,30,0.18), 0 2px 60px rgba(0,0,0,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            {first}
          </h1>
        </div>

        {/* Ampersand ornament */}
        <div className="anim-hero-3 my-1 flex items-center gap-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600/30" />
          <span
            className="text-[clamp(2rem,5vw,4rem)] text-amber-400/80 font-thin italic leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              animation: "softPulse 4s ease-in-out infinite",
            }}
          >
            &amp;
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600/30" />
        </div>

        <div className="anim-hero-4 mb-12">
          <h1
            className="text-[clamp(3.5rem,12vw,9rem)] font-thin leading-none text-white"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              textShadow: "0 0 120px rgba(212,130,30,0.18), 0 2px 60px rgba(0,0,0,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            {second}
          </h1>
        </div>

        {/* Ornamental divider */}
        <div className="anim-hero-5 flex items-center gap-4 mb-10">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-700/50" />
          <OrnamentSVG />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-700/50" />
        </div>

        {/* Subtitle block */}
        <div className="anim-hero-5 mb-12 space-y-3 max-w-xl">
          <p
            className="text-[clamp(1.5rem,4vw,2.4rem)] text-amber-100/85 font-light italic leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {heroTitle}
          </p>
          <p className="text-amber-200/45 text-sm tracking-wide font-light leading-relaxed">
            {heroSubtitle}
          </p>
          <p
            className="text-amber-500/50 text-[11px] tracking-[0.45em] uppercase pt-1"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {weddingDate}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="anim-hero-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("videolar")}
            className="btn-shimmer group relative px-10 py-4 rounded-full text-[11px] tracking-[0.35em] uppercase font-light text-amber-100 transition-all duration-500 overflow-hidden"
            style={{ border: "1px solid rgba(212,160,80,0.5)" }}
          >
            <span className="relative flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                <path d="M8 5v14l11-7z" />
              </svg>
              Videolarni ko'rish
            </span>
          </button>

          <button
            onClick={() => scrollTo("fotoalbom")}
            className="group relative px-10 py-4 rounded-full text-[11px] tracking-[0.35em] uppercase font-light text-white/65 transition-all duration-500 overflow-hidden hover:text-amber-100"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: "rgba(212,160,80,0.07)" }} />
            <span className="relative flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              Fotoalbomni ko'rish
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="bounce-slow absolute bottom-8 left-1/2 flex flex-col items-center gap-2">
        <span className="text-amber-500/25 text-[9px] tracking-[0.45em] uppercase" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          Pastga
        </span>
        <div className="w-px h-10 overflow-hidden relative">
          <div
            className="w-full bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"
            style={{ height: "200%", animation: "heroReveal 2s ease-in-out infinite alternate" }}
          />
        </div>
      </div>
    </section>
  );
}

function OrnamentSVG() {
  return (
    <svg width="56" height="14" viewBox="0 0 56 14" fill="none">
      <circle cx="28" cy="7" r="2" fill="rgba(212,160,80,0.7)" />
      <circle cx="28" cy="7" r="5" stroke="rgba(212,160,80,0.25)" strokeWidth="0.75" />
      <line x1="0" y1="7" x2="20" y2="7" stroke="rgba(212,160,80,0.35)" strokeWidth="0.75" />
      <line x1="36" y1="7" x2="56" y2="7" stroke="rgba(212,160,80,0.35)" strokeWidth="0.75" />
      <circle cx="4"  cy="7" r="1.5" fill="rgba(212,160,80,0.25)" />
      <circle cx="52" cy="7" r="1.5" fill="rgba(212,160,80,0.25)" />
    </svg>
  );
}

function FloatingPetals() {
  const petals = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left:     `${(i * 4.6 + 2) % 100}%`,
    delay:    `${(i * 0.6) % 9}s`,
    duration: `${12 + (i % 6) * 2.5}s`,
    size:     6 + (i % 5) * 3,
    opacity:  0.05 + (i % 6) * 0.025,
    rotate:   (i * 37) % 360,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal absolute top-[-40px]"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }}
        >
          <svg
            width={p.size} height={p.size * 1.6}
            viewBox="0 0 10 16"
            style={{ opacity: p.opacity, transform: `rotate(${p.rotate}deg)` }}
          >
            <ellipse cx="5" cy="8" rx="4" ry="7" fill="rgba(212,160,80,0.9)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
