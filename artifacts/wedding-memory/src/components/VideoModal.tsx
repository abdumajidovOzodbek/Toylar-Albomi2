import { useEffect } from "react";

interface VideoModalProps {
  videoLink: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ videoLink, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ background: "rgba(4,1,0,0.97)", backdropFilter: "blur(24px)" }}
    >
      <div
        className="anim-scale-in relative w-full max-w-4xl"
        style={{ filter: "drop-shadow(0 40px 120px rgba(0,0,0,0.9))" }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute -inset-px rounded-3xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(212,160,80,0.25) 0%, rgba(212,160,80,0.05) 40%, rgba(212,160,80,0.15) 100%)",
          }}
        />

        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(12,5,0,0.95)",
            border: "1px solid rgba(212,160,80,0.18)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-7 py-5"
            style={{
              background: "linear-gradient(to right, rgba(212,160,80,0.04) 0%, transparent 100%)",
              borderBottom: "1px solid rgba(212,160,80,0.08)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(212,160,80,0.15)", border: "1px solid rgba(212,160,80,0.3)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(212,160,80,0.8)">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h3
                className="text-amber-200/75 font-light tracking-widest uppercase"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.8rem", letterSpacing: "0.3em" }}
              >
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="group flex items-center gap-2.5 transition-all duration-200 px-4 py-2 rounded-full hover:bg-amber-900/20"
              style={{ border: "1px solid rgba(212,160,80,0.1)" }}
            >
              <span
                className="text-amber-400/55 group-hover:text-amber-300 transition-colors text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Yopish
              </span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.5)" strokeWidth="1.5" className="group-hover:stroke-amber-300 transition-all">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Video */}
          <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={videoLink}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title={title}
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
