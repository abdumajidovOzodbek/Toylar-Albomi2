import { useEffect, useRef } from "react";

interface HeroProps {
  coupleNames: string;
  weddingDate: string;
  location: string;
  heroTitle: string;
  heroSubtitle: string;
}

export default function Hero({ coupleNames, weddingDate, location, heroTitle, heroSubtitle }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      el.style.setProperty("--parallax-y", `${scrollY * 0.4}px`);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 30%, #1a0a00 60%, #0d0500 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,160,80,0.13) 0%, transparent 70%)",
          transform: "translateY(var(--parallax-y, 0))"
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a050' fill-opacity='0.15'%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <FloatingPetals />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-4xl mx-auto animate-fadeInUp">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
          <span
            className="text-amber-300/80 text-xs tracking-[0.4em] uppercase font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {location}
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-thin text-white mb-6 leading-tight tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: "0 2px 40px rgba(212,160,80,0.3)" }}
        >
          {coupleNames}
        </h1>

        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-amber-500/40" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-400/70">
            <path d="M12 2L13.09 8.26L19 7L15.45 11.82L21 14L15.45 16.18L19 21L13.09 15.74L12 22L10.91 15.74L5 21L8.55 16.18L3 14L8.55 11.82L5 7L10.91 8.26L12 2Z" fill="currentColor" />
          </svg>
          <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>

        <p
          className="text-3xl sm:text-4xl text-amber-200/90 font-light mb-4 italic"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {heroTitle}
        </p>

        <p className="text-amber-100/60 text-sm sm:text-base tracking-wide mb-3 font-light max-w-lg">
          {heroSubtitle}
        </p>

        <p
          className="text-amber-300/50 text-xs tracking-[0.35em] uppercase mb-14"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {weddingDate}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("videolar")}
            className="group relative px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-light text-amber-100 transition-all duration-500 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(212,160,80,0.25) 0%, rgba(180,120,50,0.15) 100%)",
              border: "1px solid rgba(212,160,80,0.4)",
              backdropFilter: "blur(10px)"
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Videolarni ko'rish</span>
          </button>
          <button
            onClick={() => scrollTo("fotoalbom")}
            className="group relative px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-light text-white/80 transition-all duration-500 overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)"
            }}
          >
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Fotoalbomni ko'rish</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-amber-400/30 text-[10px] tracking-[0.3em] uppercase">Pastga</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-amber-400/40">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

function FloatingPetals() {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 5.5 + 3) % 100}%`,
    delay: `${(i * 0.7) % 8}s`,
    duration: `${10 + (i % 5) * 2}s`,
    size: `${8 + (i % 4) * 4}px`,
    opacity: 0.08 + (i % 5) * 0.03,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-petal-fall"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="rgba(212,160,80,1)"
            style={{ opacity: p.opacity }}
          >
            <ellipse cx="12" cy="12" rx="5" ry="9" />
          </svg>
        </div>
      ))}
    </div>
  );
}
