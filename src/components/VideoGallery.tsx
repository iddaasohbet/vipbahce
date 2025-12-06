"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const videos = [
  { id: 1, src: "/videos/WhatsApp Video 2025-12-05 at 19.18.36.mp4", title: "Lüks Villa Projesi" },
  { id: 2, src: "/videos/WhatsApp Video 2025-12-05 at 19.19.07.mp4", title: "Modern Kış Bahçesi" },
  { id: 3, src: "/videos/WhatsApp Video 2025-12-05 at 19.23.52.mp4", title: "Bioklimatik Tavan" },
  { id: 4, src: "/videos/WhatsApp Video 2025-12-05 at 19.24.49.mp4", title: "Teras Projesi" },
  { id: 5, src: "/videos/WhatsApp Video 2025-12-05 at 19.24.50.mp4", title: "Panoramik Cam" },
  { id: 6, src: "/videos/WhatsApp Video 2025-12-05 at 19.50.22.mp4", title: "Premium Villa" },
  { id: 7, src: "/videos/WhatsApp Video 2025-12-05 at 19.52.01.mp4", title: "Özel Tasarım" },
  { id: 8, src: "/videos/WhatsApp Video 2025-12-05 at 20.00.21.mp4", title: "Butik Proje" },
];

// Watermark Component
const Watermark = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
    <div className="flex flex-col items-center gap-1.5 opacity-60">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600/80 to-teal-700/80 shadow-xl backdrop-blur-md border border-white/20">
        <svg 
          viewBox="0 0 40 40" 
          className="h-7 w-7"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="#ffffff" strokeWidth="2" fill="none"/>
          <path d="M13 18L20 13L27 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 18V26H26V18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="18" y1="18" x2="18" y2="26" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
          <line x1="22" y1="18" x2="22" y2="26" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
          <line x1="14" y1="22" x2="26" y2="22" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="text-xs font-bold text-white drop-shadow-lg tracking-wider">vipkisbahcesi</span>
    </div>
  </div>
);

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  // Touch handling for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < videos.length - 1) {
        setActiveIndex(prev => prev + 1);
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
  };

  // Auto-play video when it becomes active on mobile
  useEffect(() => {
    const video = videoRefs.current[videos[activeIndex].id];
    if (video) {
      video.play().catch(() => {});
    }
    // Pause others
    Object.entries(videoRefs.current).forEach(([key, v]) => {
      if (v && parseInt(key) !== videos[activeIndex].id) {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [activeIndex]);

  // Modal video control
  useEffect(() => {
    if (selectedVideo !== null && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {});
    }
  }, [selectedVideo]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedVideo !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedVideo]);

  const handleVideoClick = (id: number) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        // Pause all others first
        Object.entries(videoRefs.current).forEach(([key, v]) => {
          if (v && parseInt(key) !== id) {
            v.pause();
            setIsPlaying(prev => ({ ...prev, [parseInt(key)]: false }));
          }
        });
        video.play();
        setIsPlaying(prev => ({ ...prev, [id]: true }));
      } else {
        video.pause();
        setIsPlaying(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  const openModal = (id: number) => {
    setSelectedVideo(id);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (selectedVideo === null) return;
    const currentIndex = videos.findIndex(v => v.id === selectedVideo);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedVideo(videos[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < videos.length - 1) {
      setSelectedVideo(videos[currentIndex + 1].id);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-16 md:py-24">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:40px_40px]" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-teal-700/20 to-cyan-500/20 blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-purple-500/20 to-teal-700/20 blur-3xl" 
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
              Projelerimizden Videolar
            </h2>

            {/* Animated decorative line */}
            <div className="relative mx-auto mb-6 flex h-1 w-full max-w-sm items-center justify-center gap-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-transparent via-teal-600 to-teal-700"
              />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                className="h-3 w-3 rounded-full bg-teal-600 shadow-lg shadow-teal-600/50"
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-l from-transparent via-teal-600 to-teal-700"
              />
            </div>

            <p className="mx-auto max-w-2xl text-gray-400 text-lg">
              Tamamladığımız projeleri videolarla keşfedin
            </p>
          </motion.div>

          {/* Desktop Layout - Bento Box Style */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-4 auto-rows-[200px]">
              {/* Video 1 - Large Spotlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="col-span-2 row-span-2"
              >
                <div 
                  className="group relative h-full cursor-pointer overflow-hidden rounded-3xl bg-gray-800 shadow-2xl ring-1 ring-white/10"
                  onClick={() => openModal(videos[0].id)}
                >
                  <video
                    ref={(el) => { videoRefs.current[videos[0].id] = el; }}
                    src={videos[0].src}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    playsInline
                    loop
                    muted
                    autoPlay
                  />
                  
                  <Watermark />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl group-hover:bg-teal-700/80 transition-all duration-500"
                    >
                      <Play className="h-10 w-10 text-white ml-1" fill="white" />
                    </motion.div>
                  </div>


                  <div className="absolute top-3 left-3 w-10 h-10 border-l-2 border-t-2 border-teal-600/50 rounded-tl-xl" />
                  <div className="absolute top-3 right-3 w-10 h-10 border-r-2 border-t-2 border-teal-600/50 rounded-tr-xl" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-l-2 border-b-2 border-teal-600/50 rounded-bl-xl" />
                  <div className="absolute bottom-3 right-3 w-10 h-10 border-r-2 border-b-2 border-teal-600/50 rounded-br-xl" />
                </div>
              </motion.div>

              {/* Video 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="col-span-1 row-span-1"
              >
                <div 
                  className="group relative h-full cursor-pointer overflow-hidden rounded-2xl bg-gray-800 shadow-xl ring-1 ring-white/10"
                  onClick={() => openModal(videos[1].id)}
                >
                  <video
                    ref={(el) => { videoRefs.current[videos[1].id] = el; }}
                    src={videos[1].src}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    playsInline
                    loop
                    muted
                  />
                  <Watermark />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700/90 backdrop-blur-sm shadow-xl">
                      <Play className="h-6 w-6 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Video 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-1 row-span-2"
              >
                <div 
                  className="group relative h-full cursor-pointer overflow-hidden rounded-2xl bg-gray-800 shadow-xl ring-1 ring-white/10"
                  onClick={() => openModal(videos[2].id)}
                >
                  <video
                    ref={(el) => { videoRefs.current[videos[2].id] = el; }}
                    src={videos[2].src}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    playsInline
                    loop
                    muted
                  />
                  <Watermark />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-700/90 backdrop-blur-sm shadow-xl">
                      <Play className="h-7 w-7 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Video 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="col-span-1 row-span-1"
              >
                <div 
                  className="group relative h-full cursor-pointer overflow-hidden rounded-2xl bg-gray-800 shadow-xl ring-1 ring-white/10"
                  onClick={() => openModal(videos[3].id)}
                >
                  <video
                    ref={(el) => { videoRefs.current[videos[3].id] = el; }}
                    src={videos[3].src}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    playsInline
                    loop
                    muted
                  />
                  <Watermark />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700/90 backdrop-blur-sm shadow-xl">
                      <Play className="h-6 w-6 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Video 5 - Geniş */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="col-span-2 row-span-1"
              >
                <div 
                  className="group relative h-full cursor-pointer overflow-hidden rounded-2xl bg-gray-800 shadow-xl ring-1 ring-white/10"
                  onClick={() => openModal(videos[4].id)}
                >
                  <video
                    ref={(el) => { videoRefs.current[videos[4].id] = el; }}
                    src={videos[4].src}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    playsInline
                    loop
                    muted
                  />
                  <Watermark />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-700/90 backdrop-blur-sm shadow-xl">
                      <Play className="h-7 w-7 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Video 6 - Geniş */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="col-span-2 row-span-1"
              >
                <div 
                  className="group relative h-full cursor-pointer overflow-hidden rounded-2xl bg-gray-800 shadow-xl ring-1 ring-white/10"
                  onClick={() => openModal(videos[5].id)}
                >
                  <video
                    ref={(el) => { videoRefs.current[videos[5].id] = el; }}
                    src={videos[5].src}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    playsInline
                    loop
                    muted
                  />
                  <Watermark />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-700/90 backdrop-blur-sm shadow-xl">
                      <Play className="h-7 w-7 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout - TikTok/Reels Style */}
          <div className="md:hidden">
            <div 
              ref={mobileSliderRef}
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Main Video Container */}
              <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl" style={{ height: '70vh' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <video
                      ref={(el) => { videoRefs.current[videos[activeIndex].id] = el; }}
                      src={videos[activeIndex].src}
                      className="h-full w-full object-cover"
                      playsInline
                      loop
                      muted={isMuted}
                      autoPlay
                      onClick={() => openModal(videos[activeIndex].id)}
                    />
                    
                    <Watermark />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Video Counter */}
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-700/90 text-white text-xs font-semibold backdrop-blur-sm">
                    {activeIndex + 1} / {videos.length}
                  </span>
                </div>

                {/* Side Controls */}
                <div className="absolute right-4 bottom-32 flex flex-col gap-4 z-20">
                  {/* Mute Toggle */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/20"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </motion.button>

                  {/* Expand */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openModal(videos[activeIndex].id)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700/90 backdrop-blur-sm text-white shadow-lg shadow-teal-700/30"
                  >
                    <Play className="h-6 w-6 ml-0.5" fill="white" />
                  </motion.button>
                </div>

                {/* Navigation Arrows */}
                {activeIndex > 0 && (
                  <button
                    onClick={() => setActiveIndex(prev => prev - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white z-20"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}
                {activeIndex < videos.length - 1 && (
                  <button
                    onClick={() => setActiveIndex(prev => prev + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white z-20"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* Dot Navigation */}
              <div className="mt-6 flex justify-center gap-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? 'w-8 bg-teal-600' 
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeModal}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Navigation */}
            {videos.findIndex(v => v.id === selectedVideo) > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => { e.stopPropagation(); navigateModal('prev'); }}
                className="absolute left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </motion.button>
            )}
            {videos.findIndex(v => v.id === selectedVideo) < videos.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => { e.stopPropagation(); navigateModal('next'); }}
                className="absolute right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </motion.button>
            )}

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-gray-900 shadow-2xl ring-1 ring-white/20">
                <video
                  ref={modalVideoRef}
                  src={videos.find(v => v.id === selectedVideo)?.src}
                  className="h-full w-full object-cover"
                  playsInline
                  loop
                  controls
                  autoPlay
                />
                
                <Watermark />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
