"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Maximize2, Grid3X3, LayoutGrid, Camera, Film } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Proje görselleri
const projectImages = [
  { id: 1, src: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg", title: "Modern Kış Bahçesi", category: "kis-bahcesi" },
  { id: 2, src: "/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg", title: "Bioklimatik Sistem", category: "bioklimatik" },
  { id: 3, src: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg", title: "Panoramik Kış Bahçesi", category: "kis-bahcesi" },
  { id: 4, src: "/images/projects/23dd0ae8-c2ea-45ba-ad0e-272c0628a12d.jpg", title: "Cam Balkon", category: "cam-balkon" },
  { id: 5, src: "/images/projects/24929279-47c0-4aad-b65f-f7ba24e86f5d.jpg", title: "Villa Projesi", category: "kis-bahcesi" },
  { id: 6, src: "/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg", title: "Lüks Kış Bahçesi", category: "kis-bahcesi" },
  { id: 7, src: "/images/projects/54bf52db-878e-4d73-816a-61a561f97f15.jpg", title: "Minimal Tasarım", category: "bioklimatik" },
  { id: 8, src: "/images/projects/615a9bb3-45f2-42e9-9a4f-dae84b4f64de.jpg", title: "Bahçe Kış Bahçesi", category: "kis-bahcesi" },
  { id: 9, src: "/images/projects/6f262068-8523-46bb-8db4-89d9a2cfb385.jpg", title: "Teras Sistemi", category: "teras" },
  { id: 10, src: "/images/projects/72d1c386-41de-4199-8b88-d1e92457f134.jpg", title: "Premium Kış Bahçesi", category: "kis-bahcesi" },
  { id: 11, src: "/images/projects/7920ba6f-b67e-47a0-9b09-5760f7bd139d.jpg", title: "Modern Villa", category: "kis-bahcesi" },
  { id: 12, src: "/images/projects/7c30fee6-861f-4949-bd08-95dd9f9a16f2.jpg", title: "Cam Tavan Sistemi", category: "bioklimatik" },
  { id: 13, src: "/images/projects/86e1cccf-d01f-4c17-83a1-a89b14f60477.jpg", title: "Modern Tasarım", category: "kis-bahcesi" },
  { id: 14, src: "/images/projects/8e0ee8dd-3e22-4322-95c7-17a507f0ed28.jpg", title: "Lüks Villa", category: "kis-bahcesi" },
  { id: 15, src: "/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg", title: "Bioklimatik Tavan", category: "bioklimatik" },
  { id: 16, src: "/images/projects/9ece48f1-4fd1-4573-8fb0-2a8684db1be0.jpg", title: "Teras Kapatma", category: "teras" },
  { id: 17, src: "/images/projects/a2a54c7a-f684-47ad-861a-3b5c02a4fd94.jpg", title: "Panoramik Görünüm", category: "cam-balkon" },
  { id: 18, src: "/images/projects/a77c368b-8476-4a92-a01c-6c08f705b980.jpg", title: "Cam Sistem", category: "cam-balkon" },
  { id: 19, src: "/images/projects/c84d2298-dd03-4a2f-80ab-4224e9e1b272.jpg", title: "Premium Proje", category: "kis-bahcesi" },
  { id: 20, src: "/images/projects/cf3777cd-a53c-44d5-aa2b-f0562621a607.jpg", title: "Bahçe Entegrasyonu", category: "kis-bahcesi" },
  { id: 21, src: "/images/projects/df5971d9-c105-4b7e-bbe5-17f182ae8bc8.jpg", title: "Modern Çözüm", category: "bioklimatik" },
  { id: 22, src: "/images/projects/e327a0bb-698e-448b-94e1-126291cb38be.jpg", title: "Premium Sistem", category: "kis-bahcesi" },
  { id: 23, src: "/images/projects/e672ed00-ee93-49eb-8ff6-5f95772ae59e.jpg", title: "Teras Entegrasyonu", category: "teras" },
];

// Videolar
const projectVideos = [
  { id: 1, src: "/videos/WhatsApp Video 2025-12-05 at 19.18.36.mp4", title: "Kış Bahçesi Montajı", thumbnail: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg" },
  { id: 2, src: "/videos/WhatsApp Video 2025-12-05 at 19.19.07.mp4", title: "Bioklimatik Sistem", thumbnail: "/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg" },
  { id: 3, src: "/videos/WhatsApp Video 2025-12-05 at 19.23.52.mp4", title: "Proje Detayları", thumbnail: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg" },
  { id: 4, src: "/videos/WhatsApp Video 2025-12-05 at 19.24.49.mp4", title: "Montaj Süreci", thumbnail: "/images/projects/23dd0ae8-c2ea-45ba-ad0e-272c0628a12d.jpg" },
  { id: 5, src: "/videos/WhatsApp Video 2025-12-05 at 19.24.50.mp4", title: "Tamamlanmış Proje", thumbnail: "/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg" },
  { id: 6, src: "/videos/WhatsApp Video 2025-12-05 at 19.50.22.mp4", title: "Modern Tasarım", thumbnail: "/images/projects/54bf52db-878e-4d73-816a-61a561f97f15.jpg" },
  { id: 7, src: "/videos/WhatsApp Video 2025-12-05 at 19.52.01.mp4", title: "Villa Projesi", thumbnail: "/images/projects/615a9bb3-45f2-42e9-9a4f-dae84b4f64de.jpg" },
  { id: 8, src: "/videos/WhatsApp Video 2025-12-05 at 20.00.21.mp4", title: "Premium Kış Bahçesi", thumbnail: "/images/projects/6f262068-8523-46bb-8db4-89d9a2cfb385.jpg" },
];

const categories = [
  { id: "all", label: "Tümü" },
  { id: "kis-bahcesi", label: "Kış Bahçesi" },
  { id: "bioklimatik", label: "Bioklimatik" },
  { id: "cam-balkon", label: "Cam Balkon" },
  { id: "teras", label: "Teras" },
];

export default function Galeri() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [gridSize, setGridSize] = useState<"small" | "large">("large");
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const filteredImages = activeCategory === "all" 
    ? projectImages 
    : projectImages.filter(img => img.category === activeCategory);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === "Escape") setSelectedImage(null);
        if (e.key === "ArrowRight") {
          const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
          if (currentIndex < filteredImages.length - 1) {
            setSelectedImage(filteredImages[currentIndex + 1].id);
          }
        }
        if (e.key === "ArrowLeft") {
          const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
          if (currentIndex > 0) {
            setSelectedImage(filteredImages[currentIndex - 1].id);
          }
        }
      }
      if (selectedVideo !== null && e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedVideo, filteredImages]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null || selectedVideo !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedImage, selectedVideo]);

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    if (direction === "next" && currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1].id);
    }
    if (direction === "prev" && currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1].id);
    }
  };

  const currentImageIndex = selectedImage !== null 
    ? filteredImages.findIndex(img => img.id === selectedImage) 
    : -1;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d4c4a05_1px,transparent_1px),linear-gradient(to_bottom,#0d4c4a05_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>
          
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700"
              >
                <Camera className="h-4 w-4" />
                Projelerimiz
              </motion.span>
              
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Galeri
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Tamamladığımız projeleri inceleyin. Her biri özenle tasarlanmış ve 
                profesyonelce uygulanmış kış bahçesi sistemleri.
              </p>
            </motion.div>

          </div>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-[72px] z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex items-center justify-between py-4">
              {/* Tabs */}
              <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
                <button
                  onClick={() => setActiveTab("photos")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    activeTab === "photos"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Camera className="h-4 w-4" />
                  Fotoğraflar
                  <span className="ml-1 rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-700">
                    {projectImages.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("videos")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    activeTab === "videos"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Film className="h-4 w-4" />
                  Videolar
                  <span className="ml-1 rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-700">
                    {projectVideos.length}
                  </span>
                </button>
              </div>

              {/* Grid Toggle (only for photos) */}
              {activeTab === "photos" && (
                <div className="hidden items-center gap-2 md:flex">
                  <button
                    onClick={() => setGridSize("large")}
                    className={`rounded-lg p-2 transition-colors ${
                      gridSize === "large" ? "bg-teal-100 text-teal-700" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <LayoutGrid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setGridSize("small")}
                    className={`rounded-lg p-2 transition-colors ${
                      gridSize === "small" ? "bg-teal-100 text-teal-700" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Photos Section */}
        <AnimatePresence mode="wait">
          {activeTab === "photos" && (
            <motion.section
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-12"
            >
              <div className="mx-auto max-w-7xl px-4 md:px-6">
                {/* Category Filter */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 flex flex-wrap items-center justify-center gap-2"
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                        activeCategory === category.id
                          ? "bg-teal-600 text-white shadow-lg shadow-teal-600/25"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </motion.div>

                {/* Image Grid */}
                <motion.div
                  layout
                  className={`grid gap-4 ${
                    gridSize === "large"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                  }`}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredImages.map((image, index) => (
                      <motion.div
                        key={image.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedImage(image.id)}
                        className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-shadow hover:shadow-xl ${
                          gridSize === "large" ? "aspect-[4/3]" : "aspect-square"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes={gridSize === "large" ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        
                        {/* Info */}
                        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                          <h3 className="text-sm font-semibold text-white md:text-base">{image.title}</h3>
                          <p className="text-xs text-white/70">
                            {categories.find(c => c.id === image.category)?.label}
                          </p>
                        </div>

                        {/* Zoom Icon */}
                        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                          <Maximize2 className="h-5 w-5 text-gray-700" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* Videos Section */}
          {activeTab === "videos" && (
            <motion.section
              key="videos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-12"
            >
              <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {projectVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedVideo(video.id)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-shadow hover:shadow-xl"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform"
                          >
                            <Play className="h-7 w-7 text-teal-600 ml-1" fill="currentColor" />
                          </motion.div>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Image Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation */}
              {currentImageIndex > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
                  className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-8"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              {currentImageIndex < filteredImages.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
                  className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-8"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {/* Image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filteredImages.find(img => img.id === selectedImage)?.src || ""}
                  alt={filteredImages.find(img => img.id === selectedImage)?.title || ""}
                  width={1200}
                  height={800}
                  className="h-auto max-h-[85vh] w-auto object-contain"
                />
                
                {/* Image Info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {filteredImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                  <p className="text-white/70">
                    {currentImageIndex + 1} / {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Lightbox */}
        <AnimatePresence>
          {selectedVideo !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedVideo(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Video Player */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={projectVideos.find(v => v.id === selectedVideo)?.src}
                  controls
                  autoPlay
                  className="h-auto w-full"
                  playsInline
                />
                
                {/* Video Info */}
                <div className="bg-gray-900 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {projectVideos.find(v => v.id === selectedVideo)?.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Projenizi Hayata Geçirelim
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Siz de bu projeler gibi hayalinizdeki kış bahçesine sahip olabilirsiniz.
              Hemen bizimle iletişime geçin.
            </p>
            <a
              href="/teklif-al"
              className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-8 py-4 font-semibold text-white shadow-lg shadow-teal-600/25 transition-all hover:bg-teal-700 hover:shadow-xl"
            >
              Ücretsiz Teklif Alın
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

