import { useState, useRef, useEffect } from "react";
import VideoModal from "./VideoModal";

interface Video {
  title: string;
  videoLink: string;
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
          background: "linear-gradient(145deg, #180b00 0%, #0e0500 100%)",
          border: `1px solid ${hovered ? "rgba(212,160,80,0.4)" : "rgba(212,160,80,0.1)"}`,
          boxShadow: hovered
            ? "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,130,30,0.08)"
            : "0 6px 40px rgba(0,0,0,0.4)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Thumbnail area */}
        <div className="relative overflow-hidden" style={{ paddingBottom: "58%" }}>
          {/* Deep dark bg */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 70% at 50% 40%, #1e0c02 0%, #0a0400 100%)",
            }}
          />

          {/* Horizontal scan lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
            }}
          />

          {/* Roman numeral */}
          <div
            className="absolute top-4 left-5 transition-all duration-500"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: hovered ? "rgba(212,160,80,0.7)" : "rgba(212,160,80,0.3)",
            }}
          >
            {NUMERALS[index % NUMERALS.length]}
          </div>

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative flex items-center justify-center transition-all duration-500"
              style={{
                width: hovered ? "72px" : "62px",
                height: hovered ? "72px" : "62px",
                borderRadius: "50%",
                background: hovered
                  ? "radial-gradient(circle, rgba(212,160,80,0.3) 0%, rgba(180,120,40,0.15) 100%)"
                  : "radial-gradient(circle, rgba(212,160,80,0.18) 0%, rgba(180,120,40,0.08) 100%)",
                border: `1px solid ${hovered ? "rgba(212,160,80,0.6)" : "rgba(212,160,80,0.25)"}`,
                boxShadow: hovered ? "0 0 0 12px rgba(212,160,80,0.06), 0 0 50px rgba(212,130,30,0.15)" : "none",
              }}
            >
              <svg
                width="20" height="20" viewBox="0 0 24 24"
                fill={hovered ? "rgba(255,220,120,0.95)" : "rgba(212,160,80,0.75)"}
                style={{ marginLeft: "3px", transition: "all 0.3s ease" }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Bottom gradient on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: "linear-gradient(to top, rgba(10,4,0,0.8) 0%, transparent 60%)",
              opacity: hovered ? 1 : 0,
            }}
          />
        </div>

        {/* Card footer */}
        <div
          className="px-6 py-5 flex items-center gap-4"
          style={{ borderTop: "1px solid rgba(212,160,80,0.07)" }}
        >
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-light tracking-wide truncate transition-colors duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: hovered ? "rgba(255,235,180,0.95)" : "rgba(255,225,160,0.75)",
                fontSize: "1.1rem",
              }}
            >
              {video.title}
            </h3>
            <p
              className="text-[10px] tracking-[0.3em] uppercase mt-0.5 transition-colors duration-300"
              style={{ color: hovered ? "rgba(212,160,80,0.55)" : "rgba(212,160,80,0.3)" }}
            >
              Ko'rish uchun bosing
            </p>
          </div>
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400"
            style={{
              background: hovered ? "rgba(212,160,80,0.18)" : "rgba(212,160,80,0.06)",
              border: `1px solid ${hovered ? "rgba(212,160,80,0.4)" : "rgba(212,160,80,0.12)"}`,
              transform: hovered ? "translateX(0)" : "translateX(-4px)",
              opacity: hovered ? 1 : 0.4,
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
      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-amber-800/30" />

      <div className="max-w-5xl mx-auto">
        <SectionHeader label="Xotiralar" title="Videolar" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
