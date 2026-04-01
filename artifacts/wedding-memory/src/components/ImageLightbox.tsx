import { useEffect, useCallback } from "react";

interface Photo {
  image: string;
}

interface ImageLightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({ photos, currentIndex, onClose, onPrev, onNext }: ImageLightboxProps) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const photo = photos[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(3, 1, 0, 0.97)", backdropFilter: "blur(20px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative flex flex-col items-center w-full h-full p-4 sm:p-8">
        <div className="flex items-center justify-between w-full max-w-5xl mb-4">
          <span className="text-amber-400/50 text-xs tracking-widest">
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-amber-400/60 hover:text-amber-300 transition-colors duration-200 text-xs tracking-[0.2em] uppercase"
          >
            <span>Yopish</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1 flex items-center justify-center w-full max-w-5xl">
          <button
            onClick={onPrev}
            className="absolute left-0 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(20,8,0,0.8)",
              border: "1px solid rgba(212,160,80,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.8)" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            key={currentIndex}
            className="animate-scaleIn max-h-[calc(100vh-160px)] flex items-center justify-center px-16"
          >
            <img
              src={photo.image}
              alt={`Rasm ${currentIndex + 1}`}
              className="max-h-[calc(100vh-160px)] max-w-full object-contain rounded-xl shadow-2xl"
              style={{
                boxShadow: "0 20px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,160,80,0.1)",
              }}
            />
          </div>

          <button
            onClick={onNext}
            className="absolute right-0 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(20,8,0,0.8)",
              border: "1px solid rgba(212,160,80,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.8)" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.2em] uppercase text-amber-400/70 hover:text-amber-300 transition-colors duration-200"
            style={{ border: "1px solid rgba(212,160,80,0.15)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Oldingisi
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.2em] uppercase text-amber-400/70 hover:text-amber-300 transition-colors duration-200"
            style={{ border: "1px solid rgba(212,160,80,0.15)" }}
          >
            Keyingisi
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
