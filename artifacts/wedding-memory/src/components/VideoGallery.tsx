import { useState, useRef, useEffect } from "react";
import VideoModal from "./VideoModal";

interface Video {
  title: string;
  videoLink: string;
  thumbnail: string;
}

interface VideoGalleryProps {
  videos: Video[];
}

function useInView(threshold = 0.12) {
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

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

function VideoCard({ video, index, onClick }: { video: Video; index: number; onClick: () => void }) {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.18}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.18}s`,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-3xl overflow-hidden transition-all duration-700"
        style={{
          border: `1px solid ${hovered ? "rgba(212,160,80,0.45)" : "rgba(212,160,80,0.1)"}`,
          boxShadow: hovered
            ? "0 28px 90px rgba(0,0,0,0.65), 0 0 50px rgba(212,130,30,0.1)"
            : "0 6px 40px rgba(0,0,0,0.45)",
          transform: hovered ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
        }}
      >
        {/* Thumbnail area */}
        <div className="relative overflow-hidden" style={{ paddingBottom: "58%" }}>

          {/* Real thumbnail image */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
          />

          {/* Permanent dark gradient at bottom so title is readable */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(5,2,0,0.85) 0%, rgba(5,2,0,0.25) 45%, transparent 75%)",
            }}
          />

          {/* Hover full darkening overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{
              background: "rgba(5,2,0,0.35)",
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Roman numeral */}
          <div
            className="absolute top-4 left-5 transition-all duration-400"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: hovered ? "rgba(212,160,80,0.85)" : "rgba(212,160,80,0.5)",
              textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            }}
          >
            {NUMERALS[index % NUMERALS.length]}
          </div>

          {/* Centered play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative flex items-center justify-center transition-all duration-500"
              style={{
                width: hovered ? "76px" : "60px",
                height: hovered ? "76px" : "60px",
                borderRadius: "50%",
                background: hovered
                  ? "rgba(10,4,0,0.72)"
                  : "rgba(10,4,0,0.55)",
                border: `1.5px solid ${hovered ? "rgba(212,160,80,0.8)" : "rgba(212,160,80,0.45)"}`,
                boxShadow: hovered
                  ? "0 0 0 14px rgba(212,160,80,0.07), 0 0 60px rgba(212,130,30,0.2)"
                  : "0 0 0 0px rgba(212,160,80,0)",
                backdropFilter: "blur(6px)",
              }}
            >
              <svg
                width="20" height="20" viewBox="0 0 24 24"
                fill={hovered ? "rgba(255,225,140,0.95)" : "rgba(212,160,80,0.85)"}
                style={{ marginLeft: "3px", transition: "all 0.3s ease" }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Scan-line texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px)",
            }}
          />
        </div>

        {/* Card footer */}
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{
            background: "linear-gradient(to right, rgba(20,8,0,0.95) 0%, rgba(14,5,0,0.98) 100%)",
            borderTop: "1px solid rgba(212,160,80,0.08)",
          }}
        >
          <div className="flex-1 min-w-0">
            <h3
              className="font-light tracking-wide truncate transition-colors duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.1rem",
                color: hovered ? "rgba(255,235,180,0.95)" : "rgba(255,218,150,0.75)",
              }}
            >
              {video.title}
            </h3>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mt-0.5 transition-colors duration-300"
              style={{ color: hovered ? "rgba(212,160,80,0.6)" : "rgba(212,160,80,0.3)" }}
            >
              Ko'rish uchun bosing
            </p>
          </div>

          {/* Arrow icon */}
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400"
            style={{
              background: hovered ? "rgba(212,160,80,0.18)" : "rgba(212,160,80,0.06)",
              border: `1px solid ${hovered ? "rgba(212,160,80,0.45)" : "rgba(212,160,80,0.12)"}`,
              transform: hovered ? "translateX(0)" : "translateX(-3px)",
              opacity: hovered ? 1 : 0.5,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.9)" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
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
    </div>
  );
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <section
      id="videolar"
      className="relative py-28 sm:py-36 px-6"
      style={{
        background: "linear-gradient(180deg, #080300 0%, #0f0600 40%, #0c0400 70%, #080300 100%)",
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-amber-800/30" />

      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Xotiralar" title="Videolar" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {videos.map((video, i) => (
            <VideoCard
              key={i}
              video={video}
              index={i}
              onClick={() => setActiveVideo(video)}
            />
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          videoLink={activeVideo.videoLink}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
