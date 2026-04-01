import { useState, useRef, useEffect } from "react";
import ImageLightbox from "./ImageLightbox";

interface Photo {
  image: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

function useInView(threshold = 0.1) {
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

function PhotoCard({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  const { ref, inView } = useInView(0.05);
  const stagger = (index % 8) * 0.06;

  return (
    <div
      ref={ref}
      className="group cursor-pointer relative overflow-hidden rounded-xl"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
        transition: `opacity 0.6s ease ${stagger}s, transform 0.6s ease ${stagger}s`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        aspectRatio: index % 5 === 0 ? "4/5" : index % 7 === 0 ? "3/4" : "2/3",
      }}
      onClick={onClick}
    >
      <img
        src={photo.image}
        alt={`To'y rasmi ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-4"
        style={{
          background: "linear-gradient(to top, rgba(10,4,0,0.8) 0%, rgba(20,8,0,0.3) 50%, transparent 100%)",
        }}
      >
        <div className="flex items-center gap-2 text-amber-300/90 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-xs tracking-wider">Ko'rish</span>
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(212,160,80,0.3)" }}
      />
    </div>
  );
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, inView } = useInView(0.1);

  const handlePrev = () => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  };
  const handleNext = () => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
  };

  return (
    <section
      id="fotoalbom"
      className="py-24 sm:py-32 px-6"
      style={{ background: "linear-gradient(180deg, #0d0500 0%, #100600 50%, #0a0300 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-600/50" />
            <span className="text-amber-500/60 text-xs tracking-[0.5em] uppercase font-light">Lahzalar</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>
          <h2
            className="text-4xl sm:text-5xl text-amber-100/90 font-thin tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Fotoalbom
          </h2>
          <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
          <p className="mt-6 text-amber-300/40 text-sm tracking-wide">
            {photos.length} ta betakror lahza
          </p>
        </div>

        <div
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4"
          style={{ columnFill: "balance" }}
        >
          {photos.map((photo, i) => (
            <div key={i} className="break-inside-avoid mb-3 sm:mb-4">
              <PhotoCard photo={photo} index={i} onClick={() => setLightboxIndex(i)} />
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
