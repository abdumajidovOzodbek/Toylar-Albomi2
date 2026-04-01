import { useEffect, useCallback, useState } from "react";

interface Photo { image: string; }

interface ImageLightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({ photos, currentIndex, onClose, onPrev, onNext }: ImageLightboxProps) {
  const [animKey, setAnimKey] = useState(0);

  const go = useCallback((fn: () => void) => {
    setAnimKey(k => k + 1);
    fn();
  }, []);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape")      onClose();
    if (e.key === "ArrowLeft")   go(onPrev);
    if (e.key === "ArrowRight")  go(onNext);
  }, [onClose, onPrev, onNext, go]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const photo = photos[currentIndex];

  // Dot strip — show up to 9 dots around current index
  const total = photos.length;
  const DOTS = 9;
  const half = Math.floor(DOTS / 2);
  let start = Math.max(0, currentIndex - half);
  let end = Math.min(total - 1, start + DOTS - 1);
  if (end - start < DOTS - 1) start = Math.max(0, end - DOTS + 1);
  const dotIndices = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(3,1,0,0.98)", backdropFilter: "blur(28px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-5"
        style={{ borderBottom: "1px solid rgba(212,160,80,0.07)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-amber-500/60 font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.2rem" }}
          >
            {currentIndex + 1}
          </span>
          <span className="text-amber-800/40 text-sm">/</span>
          <span
            className="text-amber-800/50 font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}
          >
            {total}
          </span>
        </div>

        <button
          onClick={onClose}
          className="group flex items-center gap-2.5 px-5 py-2 rounded-full transition-all duration-200"
          style={{ border: "1px solid rgba(212,160,80,0.12)", background: "rgba(212,160,80,0.04)" }}
        >
          <span
            className="text-amber-400/55 group-hover:text-amber-200 transition-colors text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Yopish
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.5)" strokeWidth="1.5" className="group-hover:stroke-amber-200 transition-colors">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center relative px-4 sm:px-16 py-4 min-h-0">
        {/* Prev */}
        <button
          onClick={() => go(onPrev)}
          className="absolute left-4 sm:left-6 z-20 group"
        >
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: "rgba(15,6,0,0.8)",
              border: "1px solid rgba(212,160,80,0.2)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.75)" strokeWidth="1.5" className="group-hover:stroke-amber-300 transition-colors">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        </button>

        {/* Photo */}
        <div
          key={animKey}
          className="anim-scale-in h-full flex items-center justify-center"
          style={{ maxWidth: "calc(100% - 80px)" }}
        >
          <img
            src={photo.image}
            alt={`Rasm ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain select-none"
            style={{
              borderRadius: "14px",
              boxShadow: "0 30px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,160,80,0.1)",
            }}
            draggable={false}
          />
        </div>

        {/* Next */}
        <button
          onClick={() => go(onNext)}
          className="absolute right-4 sm:right-6 z-20 group"
        >
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: "rgba(15,6,0,0.8)",
              border: "1px solid rgba(212,160,80,0.2)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.75)" strokeWidth="1.5" className="group-hover:stroke-amber-300 transition-colors">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </button>
      </div>

      {/* Bottom nav */}
      <div
        className="flex-shrink-0 flex flex-col items-center gap-4 px-6 py-5"
        style={{ borderTop: "1px solid rgba(212,160,80,0.06)" }}
      >
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {start > 0 && <span className="text-amber-900/40 text-xs">·</span>}
          {dotIndices.map(i => (
            <div
              key={i}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width:  i === currentIndex ? "20px" : "6px",
                height: i === currentIndex ? "6px"  : "6px",
                background: i === currentIndex
                  ? "rgba(212,160,80,0.8)"
                  : "rgba(212,160,80,0.2)",
              }}
            />
          ))}
          {end < total - 1 && <span className="text-amber-900/40 text-xs">·</span>}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => go(onPrev)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-200 hover:border-amber-700/40 hover:text-amber-200"
            style={{
              border: "1px solid rgba(212,160,80,0.14)",
              color: "rgba(212,160,80,0.6)",
              background: "rgba(212,160,80,0.03)",
              fontSize: "10px",
              letterSpacing: "0.28em",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              textTransform: "uppercase",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Oldingisi
          </button>

          <div className="w-px h-4 bg-amber-900/30" />

          <button
            onClick={() => go(onNext)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-200 hover:border-amber-700/40 hover:text-amber-200"
            style={{
              border: "1px solid rgba(212,160,80,0.14)",
              color: "rgba(212,160,80,0.6)",
              background: "rgba(212,160,80,0.03)",
              fontSize: "10px",
              letterSpacing: "0.28em",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              textTransform: "uppercase",
            }}
          >
            Keyingisi
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
