import { useRef, useEffect, useState } from "react";

interface FooterProps {
  coupleNames: string;
  weddingDate: string;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Footer({ coupleNames, weddingDate }: FooterProps) {
  const { ref, inView } = useInView(0.2);

  return (
    <footer
      className="py-20 px-6 text-center relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0300 0%, #050100 100%)",
        borderTop: "1px solid rgba(212,160,80,0.08)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(212,160,80,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="relative z-10 flex flex-col items-center gap-6"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-700/40" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(212,160,80,0.5)">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-700/40" />
        </div>

        <h3
          className="text-3xl sm:text-4xl text-amber-100/80 font-thin tracking-widest"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {coupleNames}
        </h3>

        <p
          className="text-amber-400/40 text-xs tracking-[0.4em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {weddingDate}
        </p>

        <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-amber-800/40 to-transparent" />

        <p
          className="text-amber-200/30 text-sm font-light tracking-wider italic"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Unutilmas xotiralar uchun mehr bilan yaratildi
        </p>

        <p className="text-amber-900/40 text-[11px] tracking-[0.2em] mt-2">
          Muhabbat bilan yaratildi &nbsp;·&nbsp; 22.11.2024
        </p>
      </div>
    </footer>
  );
}
