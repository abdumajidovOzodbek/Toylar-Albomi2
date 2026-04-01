import { useEffect } from "react";

interface VideoModalProps {
  videoLink: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ videoLink, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ background: "rgba(5, 2, 0, 0.95)", backdropFilter: "blur(16px)" }}
    >
      <div className="relative w-full max-w-4xl animate-scaleIn">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            border: "1px solid rgba(212,160,80,0.2)",
            background: "rgba(20, 8, 0, 0.8)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/30">
            <h3
              className="text-amber-200/80 text-sm tracking-widest uppercase font-light"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="group flex items-center gap-2 text-amber-400/60 hover:text-amber-300 transition-colors duration-200 text-xs tracking-[0.2em] uppercase"
            >
              <span>Yopish</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
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
