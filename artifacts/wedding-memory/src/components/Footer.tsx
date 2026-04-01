import { useRef, useEffect, useState } from "react";

interface FooterProps {
  coupleNames: string;
  weddingDate: string;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function HeartSVG() {
  return (
    <svg width="22" height="20" viewBox="0 0 24 22" fill="none">
      <path
        d="M12 20.5C12 20.5 2 13.5 2 7C2 4.23858 4.23858 2 7 2C8.98438 2 10.7174 3.06621 11.6563 4.67407C11.8005 4.91821 12.1995 4.91821 12.3437 4.67407C13.2826 3.06621 15.0156 2 17 2C19.7614 2 22 4.23858 22 7C22 13.5 12 20.5 12 20.5Z"
        fill="rgba(212,130,50,0.5)"
        stroke="rgba(212,160,80,0.4)"
        strokeWidth="0.75"
      />
    </svg>
  );
}

function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-amber-800/35" />
      <svg width="72" height="16" viewBox="0 0 72 16" fill="none">
        <circle cx="36" cy="8" r="2.5" fill="rgba(212,160,80,0.55)" />
        <circle cx="36" cy="8" r="6" stroke="rgba(212,160,80,0.18)" strokeWidth="0.75" />
        <line x1="0"  y1="8" x2="26" y2="8" stroke="rgba(212,160,80,0.25)" strokeWidth="0.75" />
        <line x1="46" y1="8" x2="72" y2="8" stroke="rgba(212,160,80,0.25)" strokeWidth="0.75" />
        <circle cx="5"  cy="8" r="1.5" fill="rgba(212,160,80,0.18)" />
        <circle cx="67" cy="8" r="1.5" fill="rgba(212,160,80,0.18)" />
        <circle cx="14" cy="8" r="1"   fill="rgba(212,160,80,0.12)" />
        <circle cx="58" cy="8" r="1"   fill="rgba(212,160,80,0.12)" />
      </svg>
      <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-amber-800/35" />
    </div>
  );
}

export default function Footer({ coupleNames, weddingDate }: FooterProps) {
  const { ref, inView } = useInView(0.15);

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #060200 0%, #030100 100%)",
      }}
    >
      {/* Top edge gradient */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,160,80,0.15), transparent)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-amber-800/25 to-transparent" />

      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(180,100,20,0.05) 0%, transparent 70%)" }}
      />

      <div
        ref={ref}
        className="relative z-10 max-w-2xl mx-auto px-8 py-24 flex flex-col items-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Heart */}
        <div style={{ animation: "softPulse 3.5s ease-in-out infinite" }}>
          <HeartSVG />
        </div>

        <OrnamentDivider />

        {/* Couple names */}
        <h3
          className="text-center font-thin tracking-widest"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2rem,5vw,3.2rem)",
            color: "rgba(255,230,170,0.75)",
            lineHeight: 1.1,
            letterSpacing: "0.08em",
          }}
        >
          {coupleNames}
        </h3>

        {/* Date */}
        <p
          className="mt-5 text-[10px] tracking-[0.55em] uppercase"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "rgba(212,160,80,0.35)",
          }}
        >
          {weddingDate}
        </p>

        {/* Tagline */}
        <p
          className="mt-10 text-center font-light italic leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.05rem",
            color: "rgba(212,160,80,0.3)",
            maxWidth: "340px",
          }}
        >
          Unutilmas xotiralar uchun mehr bilan yaratildi
        </p>

        {/* Bottom rule */}
        <div className="mt-12 w-full flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-900/30" />
            <div className="w-1 h-1 rounded-full bg-amber-900/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-900/30" />
          </div>
          <p className="text-[10px] tracking-[0.25em]" style={{ color: "rgba(212,160,80,0.2)" }}>
            Muhabbat bilan yaratildi &nbsp;·&nbsp; 22.11.2024
          </p>
        </div>
      </div>
    </footer>
  );
}
