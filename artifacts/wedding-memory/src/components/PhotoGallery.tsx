import { useState, useRef, useEffect } from "react";
import ImageLightbox from "./ImageLightbox";

interface Photo {
  image: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

function useInView(threshold = 0.05) {
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

function PhotoCard({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  const { ref, inView } = useInView(0.04);
  const [hovered, setHovered] = useState(false);
  const delay = (index % 6) * 0.07;

  return (
    <div
      ref={ref}
      className="group cursor-pointer relative overflow-hidden"
      style={{
        borderRadius: "16px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,160,80,0.3)"
          : "0 4px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,160,80,0.05)",
        transform2: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={photo.image}
        alt={`To'y rasmi ${index + 1}`}
        className="w-full h-full object-cover block"
        loading="lazy"
        style={{
          transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          display: "block",
        }}
      />

      {/* Dark vignette on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(8,3,0,0.85) 0%, rgba(8,3,0,0.2) 40%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Hover overlay content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-end pb-5 pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "rgba(20,8,0,0.75)",
            border: "1px solid rgba(212,160,80,0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.9)" strokeWidth="1.8">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          <span
            className="text-amber-200/90 text-[10px] tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Ko'rish
          </span>
        </div>
      </div>

      {/* Golden border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: hovered ? "inset 0 0 0 1px rgba(212,160,80,0.35)" : "none",
          transition: "box-shadow 0.4s ease",
        }}
      />
    </div>
  );
}

function SectionHeader({ label, title, count }: { label: string; title: string; count: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className="text-center mb-20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="flex items-center justify-center gap-5 mb-5">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-700/50" />
        <span
          className="text-amber-600/55 text-[10px] tracking-[0.55em] uppercase font-light"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {label}
        </span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-700/50" />
      </div>
      <h2
        className="text-[clamp(2.5rem,6vw,4rem)] font-thin tracking-wide"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          color: "rgba(255,235,180,0.88)",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <div className="mt-5 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-amber-800/40" />
        <div className="w-1 h-1 rounded-full bg-amber-600/50" />
        <div className="h-px w-8 bg-amber-800/40" />
      </div>
      <p
        className="mt-6 text-amber-600/35 text-sm tracking-[0.25em]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {count} ta betakror lahza
      </p>
    </div>
  );
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const handleNext = () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));

  return (
    <section
      id="fotoalbom"
      className="relative py-28 sm:py-36 px-5 sm:px-8"
      style={{
        background: "linear-gradient(180deg, #080300 0%, #0b0400 50%, #060200 100%)",
      }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-amber-800/25" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader label="Lahzalar" title="Fotoalbom" count={photos.length} />

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 sm:gap-4" style={{ columnFill: "balance" }}>
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
