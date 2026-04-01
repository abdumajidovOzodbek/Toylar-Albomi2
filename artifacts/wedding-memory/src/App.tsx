import weddingData from "./weddingData.js";
import Hero from "./components/Hero";
import VideoGallery from "./components/VideoGallery";
import PhotoGallery from "./components/PhotoGallery";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "#0d0500" }}>
      <Hero
        coupleNames={weddingData.coupleNames}
        weddingDate={weddingData.weddingDate}
        location={weddingData.location}
        heroTitle={weddingData.heroTitle}
        heroSubtitle={weddingData.heroSubtitle}
      />
      <VideoGallery videos={weddingData.galleryVideos} />
      <PhotoGallery photos={weddingData.photoAlbum} />
      <Footer
        coupleNames={weddingData.coupleNames}
        weddingDate={weddingData.weddingDate}
      />
    </div>
  );
}
