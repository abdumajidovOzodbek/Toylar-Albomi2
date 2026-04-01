import { useState, useRef, useEffect } from "react";
import VideoModal from "./VideoModal";

interface Video {
  title: string;
  videoLink: string;
}

interface VideoGalleryProps {
  videos: Video[];
}

function useInView(threshold = 0.15) {
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

function VideoCard({ video, index, onClick }: { video: Video; index: number; onClick: () => void }) {
  const { ref, inView } = useInView();

  const icons = ["🎬", "🍚", "👑"];
  const icon = icons[index % icons.length];

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
      onClick={onClick}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
        style={{
          background: "linear-gradient(145deg, rgba(30,12,0,0.9) 0%, rgba(20,8,0,0.95) 100%)",
          border: "1px solid rgba(212,160,80,0.15)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingBottom: "56.25%", background: "linear-gradient(135deg, #1a0800 0%, #0d0400 100%)" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{
                background: "radial-gradient(circle, rgba(212,160,80,0.25) 0%, rgba(180,120,50,0.1) 100%)",
                border: "1px solid rgba(212,160,80,0.3)",
                boxShadow: "0 0 30px rgba(212,160,80,0.15)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="rgba(212,160,80,0.9)"
                className="ml-1 transition-all duration-300 group-hover:fill-amber-300"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-2xl">{icon}</span>
          </div>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "radial-gradient(ellipse at center, rgba(212,160,80,0.08) 0%, transparent 70%)" }}
          />
        </div>

        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <h3
              className="text-amber-100/90 text-base font-light tracking-wide group-hover:text-amber-200 transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {video.title}
            </h3>
            <p className="text-amber-400/40 text-xs mt-0.5 tracking-wider uppercase">Ko'rish uchun bosing</p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
            style={{ background: "rgba(212,160,80,0.2)", border: "1px solid rgba(212,160,80,0.3)" }}
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

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="videolar"
      className="py-24 sm:py-32 px-6"
      style={{ background: "linear-gradient(180deg, #0d0500 0%, #140800 50%, #0d0500 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
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
            <span className="text-amber-500/60 text-xs tracking-[0.5em] uppercase font-light">Xotiralar</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>
          <h2
            className="text-4xl sm:text-5xl text-amber-100/90 font-thin tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Videolar
          </h2>
          <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
