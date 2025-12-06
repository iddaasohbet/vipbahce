"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Unsplash kış bahçesi görselleri
const heroImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80", // Modern sunroom
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80", // Glass house
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80", // Conservatory
  "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&q=80", // Modern glass room
];

// Mobile slider proje görselleri - BrandsShowcase ile aynı resimler
const projectImages = [
  { id: 1, src: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg", title: "Modern Kış Bahçesi" },
  { id: 2, src: "/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg", title: "Bioklimatik Sistem" },
  { id: 3, src: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg", title: "Panoramik Kış Bahçesi" },
  { id: 4, src: "/images/projects/23dd0ae8-c2ea-45ba-ad0e-272c0628a12d.jpg", title: "Cam Balkon" },
  { id: 5, src: "/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg", title: "Lüks Kış Bahçesi" },
  { id: 6, src: "/images/projects/54bf52db-878e-4d73-816a-61a561f97f15.jpg", title: "Minimal Tasarım" },
  { id: 7, src: "/images/projects/615a9bb3-45f2-42e9-9a4f-dae84b4f64de.jpg", title: "Bahçe Kış Bahçesi" },
  { id: 8, src: "/images/projects/6f262068-8523-46bb-8db4-89d9a2cfb385.jpg", title: "Teras Sistemi" },
  { id: 9, src: "/images/projects/72d1c386-41de-4199-8b88-d1e92457f134.jpg", title: "Premium Kış Bahçesi" },
  { id: 10, src: "/images/projects/86e1cccf-d01f-4c17-83a1-a89b14f60477.jpg", title: "Modern Tasarım" },
  { id: 11, src: "/images/projects/8e0ee8dd-3e22-4322-95c7-17a507f0ed28.jpg", title: "Lüks Villa" },
  { id: 12, src: "/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg", title: "Bioklimatik Tavan" },
  { id: 13, src: "/images/projects/a2a54c7a-f684-47ad-861a-3b5c02a4fd94.jpg", title: "Panoramik Görünüm" },
  { id: 14, src: "/images/projects/a77c368b-8476-4a92-a01c-6c08f705b980.jpg", title: "Cam Sistem" },
  { id: 15, src: "/images/projects/cf3777cd-a53c-44d5-aa2b-f0562621a607.jpg", title: "Bahçe Entegrasyonu" },
  { id: 16, src: "/images/projects/df5971d9-c105-4b7e-bbe5-17f182ae8bc8.jpg", title: "Modern Çözüm" },
  { id: 17, src: "/images/projects/e327a0bb-698e-448b-94e1-126291cb38be.jpg", title: "Premium Sistem" },
  { id: 18, src: "/images/projects/e672ed00-ee93-49eb-8ff6-5f95772ae59e.jpg", title: "Teras Entegrasyonu" },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <section
      id="anasayfa"
      className="relative isolate overflow-hidden bg-white pt-24 md:pt-4 pb-6 md:min-h-[70vh]"
    >
      {/* Background Images Slider */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Kış Bahçesi"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/55 to-teal-50/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-100/20 via-transparent to-transparent" />
        {!shouldReduceMotion && !isMobile && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-teal-200/40 to-cyan-300/30 blur-[120px] will-change-transform"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-l from-cyan-200/30 to-teal-300/20 blur-[120px] will-change-transform"
            />
          </>
        )}
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0d4c4a08_1px,transparent_1px),linear-gradient(to_bottom,#0d4c4a08_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="mx-auto flex md:min-h-[70vh] max-w-7xl flex-col items-center justify-start md:justify-center px-4 md:px-6 pt-8 pb-4 md:py-12 text-center">
        {isMobile ? (
          <h1 className="mb-4 max-w-5xl text-3xl leading-tight tracking-tight text-gray-900 md:text-7xl lg:text-8xl">
            <span className="font-normal">Hayalinizdeki</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 bg-clip-text text-transparent font-semibold italic">
                Kış Bahçesi
              </span>
            </span>{" "}
            <span className="font-normal">Burada</span>
          </h1>
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 max-w-5xl text-5xl leading-[1.1] tracking-tight text-gray-900 md:text-7xl lg:text-8xl"
          >
            <span className="font-normal">Hayalinizdeki</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 bg-clip-text text-transparent font-semibold italic">
                Kış Bahçesi
              </span>
              {!shouldReduceMotion && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 h-1 w-full origin-left bg-gradient-to-r from-teal-700 to-transparent"
                />
              )}
            </span>{" "}
            <span className="font-normal">Burada</span>
          </motion.h1>
        )}

        {isMobile ? (
          <p className="mb-8 max-w-3xl text-lg font-bold leading-relaxed text-gray-900 px-4 drop-shadow-sm">
            Modern tasarım, kaliteli malzeme ve uzman ekip ile{" "}
            <span className="text-teal-700">
              bioklimatik kış bahçesi
            </span>{" "}
            sistemleri. Evinize değer katın, yaşam alanınızı genişletin.
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 max-w-3xl text-xl font-bold leading-relaxed text-gray-900 md:text-2xl drop-shadow-sm"
          >
            Modern tasarım, kaliteli malzeme ve uzman ekip ile{" "}
            <span className="text-teal-700">
              bioklimatik kış bahçesi
            </span>{" "}
            sistemleri. Evinize değer katın, yaşam alanınızı genişletin.
          </motion.p>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full md:w-auto px-6 md:px-0">
          <Link
            href="/teklif-al"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-700 to-teal-800 px-5 md:px-8 py-2.5 md:py-4 text-sm md:text-base font-semibold text-white shadow-lg shadow-teal-700/40 transition-all hover:scale-105 hover:shadow-xl hover:shadow-teal-700/60 min-h-[44px] md:min-h-[48px] flex items-center justify-center w-[240px] md:w-auto"
            aria-label="Ücretsiz teklif almak için tıklayın"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Ücretsiz Teklif Alın
              <ArrowRight className="h-4 md:h-5 w-4 md:w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="#galeri"
            className="group rounded-full border-2 border-teal-700 bg-white px-5 md:px-8 py-2.5 md:py-4 text-sm md:text-base font-semibold text-teal-700 transition-all hover:bg-teal-50 min-h-[44px] md:min-h-[48px] flex items-center justify-center w-[240px] md:w-auto"
            aria-label="Projelerimizi incelemek için tıklayın"
          >
            <span className="flex items-center gap-1.5">
              Projelerimizi İnceleyin
              <ArrowRight className="h-4 md:h-5 w-4 md:w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>

        {!shouldReduceMotion && !isMobile && (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[10%] top-[20%] h-32 w-32 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-transparent backdrop-blur-sm will-change-transform"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute right-[15%] top-[30%] h-24 w-24 rounded-full border border-teal-200 bg-gradient-to-br from-teal-50 to-transparent backdrop-blur-sm will-change-transform"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-[20%] left-[20%] h-20 w-20 rounded-xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-transparent backdrop-blur-sm will-change-transform"
            />
          </div>
        )}

        {/* Mobile Image Slider at bottom */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 w-full"
          >
            <div className="overflow-hidden">
              <motion.div
                animate={{
                  x: [0, -1280],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
                className="flex gap-3 px-3"
              >
                {[...Array(3)].map((_, groupIndex) => (
                  <div key={groupIndex} className="flex gap-3 shrink-0">
                    {projectImages.map((image, index) => (
                      <div
                        key={`${groupIndex}-${index}`}
                        className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl shadow-lg border-2 border-white/80 backdrop-blur-sm"
                      >
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Desktop Keşfet button */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
          >
            {!shouldReduceMotion ? (
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-teal-600/30" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-700 bg-white shadow-lg">
                    <svg className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-teal-800">Keşfet</span>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-700 bg-white shadow-lg">
                  <svg className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-teal-800">Keşfet</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

    </section>
  );
}

