"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Columns, 
  Droplet, 
  Layers, 
  Shield, 
  Package, 
  Lightbulb,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const brands = [
  { 
    name: "Alüminyum Taşıyıcı Ayaklar", 
    icon: Columns,
    description: "Dayanıklı ve güvenilir yapısal destek",
    origin: "Premium"
  },
  { 
    name: "Alüminyum Su Oluğu", 
    icon: Droplet,
    description: "Dere sistemi ile su yönetimi",
    origin: "Kaliteli"
  },
  { 
    name: "Alüminyum Tavan Profilleri", 
    icon: Layers,
    description: "Tavan taşıyıcı profil sistemleri",
    origin: "Profesyonel"
  },
  { 
    name: "Sızdırmazlık Contası", 
    icon: Shield,
    description: "Mükemmel izolasyon ve sızdırmazlık",
    origin: "Garantili"
  },
  { 
    name: "Wacker Silikon", 
    icon: Package,
    description: "Alman kalitesi premium silikon",
    origin: "Almanya"
  },
  { 
    name: "Şerit LED Aydınlatma", 
    icon: Lightbulb,
    description: "Dimer ile ayarlanabilir aydınlatma",
    origin: "Modern"
  },
];

// Proje resimleri
const projectImages = [
  { id: 1, src: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg", title: "Modern Kış Bahçesi", category: "Villa" },
  { id: 2, src: "/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg", title: "Bioklimatik Sistem", category: "Daire" },
  { id: 3, src: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg", title: "Panoramik Kış Bahçesi", category: "Villa" },
  { id: 4, src: "/images/projects/23dd0ae8-c2ea-45ba-ad0e-272c0628a12d.jpg", title: "Cam Balkon", category: "Daire" },
  { id: 5, src: "/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg", title: "Lüks Kış Bahçesi", category: "Villa" },
  { id: 6, src: "/images/projects/54bf52db-878e-4d73-816a-61a561f97f15.jpg", title: "Minimal Tasarım", category: "Daire" },
  { id: 7, src: "/images/projects/615a9bb3-45f2-42e9-9a4f-dae84b4f64de.jpg", title: "Bahçe Kış Bahçesi", category: "Villa" },
  { id: 8, src: "/images/projects/6f262068-8523-46bb-8db4-89d9a2cfb385.jpg", title: "Teras Sistemi", category: "Daire" },
  { id: 9, src: "/images/projects/72d1c386-41de-4199-8b88-d1e92457f134.jpg", title: "Premium Kış Bahçesi", category: "Villa" },
  { id: 10, src: "/images/projects/86e1cccf-d01f-4c17-83a1-a89b14f60477.jpg", title: "Modern Tasarım", category: "Daire" },
  { id: 11, src: "/images/projects/8e0ee8dd-3e22-4322-95c7-17a507f0ed28.jpg", title: "Lüks Villa", category: "Villa" },
  { id: 12, src: "/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg", title: "Bioklimatik Tavan", category: "Daire" },
  { id: 13, src: "/images/projects/a2a54c7a-f684-47ad-861a-3b5c02a4fd94.jpg", title: "Panoramik Görünüm", category: "Villa" },
  { id: 14, src: "/images/projects/a77c368b-8476-4a92-a01c-6c08f705b980.jpg", title: "Cam Sistem", category: "Daire" },
  { id: 15, src: "/images/projects/cf3777cd-a53c-44d5-aa2b-f0562621a607.jpg", title: "Bahçe Entegrasyonu", category: "Villa" },
  { id: 16, src: "/images/projects/df5971d9-c105-4b7e-bbe5-17f182ae8bc8.jpg", title: "Modern Çözüm", category: "Daire" },
  { id: 17, src: "/images/projects/e327a0bb-698e-448b-94e1-126291cb38be.jpg", title: "Premium Sistem", category: "Villa" },
  { id: 18, src: "/images/projects/e672ed00-ee93-49eb-8ff6-5f95772ae59e.jpg", title: "Teras Entegrasyonu", category: "Daire" },
];

export default function BrandsShowcase() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const currentIndex = selectedImage ? projectImages.findIndex(img => img.id === selectedImage) : -1;
  
  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedImage(projectImages[currentIndex - 1].id);
    } else {
      setSelectedImage(projectImages[projectImages.length - 1].id);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < projectImages.length - 1) {
      setSelectedImage(projectImages[currentIndex + 1].id);
    } else {
      setSelectedImage(projectImages[0].id);
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-white py-20" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Dünya Standardında Ürünler
          </h2>
          {/* Animated Lines */}
          <div className="relative mx-auto mb-6 flex h-[3px] w-full max-w-xl items-center justify-center gap-3">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "45%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-transparent via-teal-600 to-teal-600"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className="h-2 w-2 rounded-full bg-teal-600"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "45%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-l from-transparent via-teal-600 to-teal-600"
            />
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Uluslararası tanınmış markalar ve en kaliteli malzemelerle çalışıyoruz
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={`group relative snake-border snake-delay-${index + 1}`}
            >
              <div className="relative h-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-xl">
                {/* Top Icon */}
                <div className="mb-6 flex items-center justify-between">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <brand.icon className="h-12 w-12 text-teal-600" strokeWidth={1.5} />
                  </motion.div>
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {brand.origin}
                  </span>
                </div>

                {/* Brand Info */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-teal-600">
                    {brand.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {brand.description}
                  </p>
                </div>

                {/* Hover corner accent */}
                <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden rounded-bl-[100px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-br from-teal-100 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Images Sliders - Premium Design */}
        <div className="mt-20 space-y-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Projelerimizden Görüntüler
            </h3>
            {/* Animated Lines */}
            <div className="relative mx-auto mb-2 flex h-[3px] w-full max-w-lg items-center justify-center gap-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "45%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-transparent via-[#0d4c4a] to-[#115e59]"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.5 }}
                className="h-2 w-2 rounded-full bg-[#0d4c4a]"
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "45%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-l from-transparent via-[#0d4c4a] to-[#115e59]"
              />
            </div>
          </motion.div>

          {/* Premium Slider Container */}
          <div className="relative">
            {/* Left Fade Gradient */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
            {/* Right Fade Gradient */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />

            {/* Top Slider - Moving Right */}
            <div className="relative mb-6">
              <motion.div
                animate={{
                  x: [0, -2560],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35,
                    ease: "linear",
                  },
                }}
                className="flex gap-5"
              >
                {[...Array(3)].map((_, groupIndex) => (
                  <div key={groupIndex} className="flex gap-5 shrink-0">
                    {projectImages.map((image, index) => (
                      <motion.div
                        key={`${groupIndex}-${index}`}
                        whileHover={{ 
                          scale: 1.08,
                          rotateY: 5,
                          z: 50,
                        }}
                        onClick={() => setSelectedImage(image.id)}
                        className="group relative h-72 w-[420px] shrink-0 cursor-pointer overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20"
                        style={{ perspective: "1000px" }}
                      >
                        {/* Image */}
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 420px"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" suppressHydrationWarning />
                        
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" suppressHydrationWarning />
                        
                        {/* Border Glow on Hover */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-teal-400/0 transition-all duration-500 group-hover:border-teal-400/50 group-hover:shadow-[inset_0_0_30px_rgba(20,184,166,0.2)]" suppressHydrationWarning />
                        
                        {/* View Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100"
                          >
                            <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </motion.div>
                        </div>
                        
                        {/* Number Badge */}
                        <div className="absolute left-4 top-4">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-teal-700 shadow-lg backdrop-blur-sm">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Slider - Moving Left */}
            <div className="relative">
              <motion.div
                animate={{
                  x: [-2560, 0],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35,
                    ease: "linear",
                  },
                }}
                className="flex gap-5"
              >
                {[...Array(3)].map((_, groupIndex) => (
                  <div key={groupIndex} className="flex gap-5 shrink-0">
                    {projectImages.slice().reverse().map((image, index) => (
                      <motion.div
                        key={`${groupIndex}-${index}`}
                        whileHover={{ 
                          scale: 1.08,
                          rotateY: -5,
                          z: 50,
                        }}
                        onClick={() => setSelectedImage(image.id)}
                        className="group relative h-72 w-[420px] shrink-0 cursor-pointer overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20"
                        style={{ perspective: "1000px" }}
                      >
                        {/* Image */}
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 420px"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" suppressHydrationWarning />
                        
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        
                        {/* Border Glow on Hover */}
                        <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/0 transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[inset_0_0_30px_rgba(6,182,212,0.2)]" />
                        
                        {/* View Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100"
                          >
                            <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </motion.div>
                        </div>
                        
                        {/* Number Badge */}
                        <div className="absolute right-4 top-4">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-cyan-700 shadow-lg backdrop-blur-sm">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Previous Button - Desktop Only */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-xl backdrop-blur-sm transition-all hover:bg-white hover:scale-110 md:flex"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
            </motion.button>

            {/* Next Button - Desktop Only */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-xl backdrop-blur-sm transition-all hover:bg-white hover:scale-110 md:flex"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={2.5} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-full w-full overflow-hidden"
            >
              {projectImages.find(img => img.id === selectedImage) && (
                <div className="relative h-full w-full">
                  <Image
                    src={projectImages.find(img => img.id === selectedImage)!.src}
                    alt={projectImages.find(img => img.id === selectedImage)!.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

