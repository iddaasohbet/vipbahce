"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Malzeme resimleri
const materials = [
  { id: 1, src: "/images/projects/v1.jpeg" },
  { id: 2, src: "/images/projects/v2.jpeg" },
  { id: 3, src: "/images/projects/v3.jpeg" },
  { id: 4, src: "/images/projects/v4.jpeg" },
  { id: 5, src: "/images/projects/v6.jpeg" },
  { id: 6, src: "/images/projects/v7.jpeg" },
  { id: 7, src: "/images/projects/v8.jpeg" },
  { id: 8, src: "/images/projects/v9.jpeg" },
];

export default function Services() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const currentIndex = selectedImage ? materials.findIndex(m => m.id === selectedImage) : -1;

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedImage(materials[currentIndex - 1].id);
    } else {
      setSelectedImage(materials[materials.length - 1].id);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < materials.length - 1) {
      setSelectedImage(materials[currentIndex + 1].id);
    } else {
      setSelectedImage(materials[0].id);
    }
  };

  return (
    <section id="malzemeler" className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d4c4a08_1px,transparent_1px),linear-gradient(to_bottom,#0d4c4a08_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full border border-teal-600/30 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700"
          >
            Premium Kalite
          </motion.span>
          
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Kullandığımız <span className="text-teal-700">Malzemeler</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Projelerimizde yalnızca uluslararası standartlara uygun, TSE ve CE belgeli malzemeler kullanıyoruz.
          </p>
        </motion.div>

        {/* Bento Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-5 h-[600px] lg:h-[700px]">
          {/* Large Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedImage(materials[0].id)}
            onMouseEnter={() => setHoveredId(materials[0].id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-3xl"
          >
            <Image
              src={materials[0].src}
              alt="Malzeme 1"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <motion.div
              initial={{ scale: 0 }}
              animate={hoveredId === materials[0].id ? { scale: 1 } : { scale: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-2xl backdrop-blur-sm">
                <ZoomIn className="h-7 w-7 text-teal-700" />
              </div>
            </motion.div>
            <div className="absolute inset-0 rounded-3xl border-2 border-white/0 transition-all duration-300 group-hover:border-teal-400/50" />
          </motion.div>

          {/* Top Right 2 */}
          {materials.slice(1, 3).map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              onClick={() => setSelectedImage(material.id)}
              onMouseEnter={() => setHoveredId(material.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl"
            >
              <Image
                src={material.src}
                alt={`Malzeme ${index + 2}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <motion.div
                initial={{ scale: 0 }}
                animate={hoveredId === material.id ? { scale: 1 } : { scale: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm">
                  <ZoomIn className="h-5 w-5 text-teal-700" />
                </div>
              </motion.div>
              <div className="absolute inset-0 rounded-3xl border-2 border-white/0 transition-all duration-300 group-hover:border-teal-400/50" />
            </motion.div>
          ))}

          {/* Bottom Right 2 */}
          {materials.slice(3, 5).map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
              onClick={() => setSelectedImage(material.id)}
              onMouseEnter={() => setHoveredId(material.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl"
            >
              <Image
                src={material.src}
                alt={`Malzeme ${index + 4}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <motion.div
                initial={{ scale: 0 }}
                animate={hoveredId === material.id ? { scale: 1 } : { scale: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm">
                  <ZoomIn className="h-5 w-5 text-teal-700" />
                </div>
              </motion.div>
              <div className="absolute inset-0 rounded-3xl border-2 border-white/0 transition-all duration-300 group-hover:border-teal-400/50" />
            </motion.div>
          ))}
        </div>

        {/* Second Row - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 md:gap-5 mt-4 md:mt-5 h-[250px] lg:h-[300px]">
          {materials.slice(5, 8).map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onClick={() => setSelectedImage(material.id)}
              onMouseEnter={() => setHoveredId(material.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl"
            >
              <Image
                src={material.src}
                alt={`Malzeme ${index + 6}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <motion.div
                initial={{ scale: 0 }}
                animate={hoveredId === material.id ? { scale: 1 } : { scale: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm">
                  <ZoomIn className="h-5 w-5 text-teal-700" />
                </div>
              </motion.div>
              <div className="absolute inset-0 rounded-3xl border-2 border-white/0 transition-all duration-300 group-hover:border-teal-400/50" />
            </motion.div>
          ))}
        </div>

        {/* Mobile Grid - Swipeable Cards */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {materials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedImage(material.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                  index === 0 ? 'col-span-2 h-48' : 'h-40'
                }`}
              >
                <Image
                  src={material.src}
                  alt={`Malzeme ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={index === 0 ? "100vw" : "50vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
                  <ZoomIn className="h-4 w-4 text-teal-700" />
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-white/0 transition-all group-active:border-teal-400/50" />
              </motion.div>
            ))}
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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
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

            {/* Previous Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-xl backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={2.5} />
            </motion.button>

            {/* Next Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-xl backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={2.5} />
            </motion.button>

            {/* Full Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[85vh] w-full max-w-5xl items-center justify-center"
            >
              {materials.find(m => m.id === selectedImage) && (
                <Image
                  src={materials.find(m => m.id === selectedImage)!.src}
                  alt="Malzeme"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </motion.div>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {materials.map((material) => (
                <button
                  key={material.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(material.id);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    selectedImage === material.id
                      ? 'w-6 bg-teal-400'
                      : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
