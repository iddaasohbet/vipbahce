"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
    <section id="malzemeler" className="relative overflow-hidden bg-gray-50 py-20 md:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d4c4a08_1px,transparent_1px),linear-gradient(to_bottom,#0d4c4a08_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Kullandığımız <span className="text-teal-700">Malzemeler</span>
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
            Projelerimizde yalnızca uluslararası standartlara uygun, TSE ve CE belgeli, 
            garantili malzemeler kullanıyoruz.
          </p>
        </motion.div>

        {/* Materials Grid - Only Images */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {materials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedImage(material.id)}
              className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={material.src}
                  alt={`Malzeme ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-teal-900/0 transition-all duration-300 group-hover:bg-teal-900/20" />
                
                {/* Zoom Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
                    <svg className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
              {materials.map((material, index) => (
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
