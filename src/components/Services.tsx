"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Shield, Award, CheckCircle } from "lucide-react";

// Malzeme resimleri ve bilgileri
const materials = [
  { 
    id: 1, 
    src: "/images/projects/v1.jpeg",
    title: "Alüminyum Profil",
    description: "Isı yalıtımlı, elektrostatik boyalı"
  },
  { 
    id: 2, 
    src: "/images/projects/v2.jpeg",
    title: "Temperli Cam",
    description: "4+4 mm lamine güvenlik camı"
  },
  { 
    id: 3, 
    src: "/images/projects/v3.jpeg",
    title: "Polikarbon Panel",
    description: "UV korumalı, darbe dayanımlı"
  },
  { 
    id: 4, 
    src: "/images/projects/v6.jpeg",
    title: "Paslanmaz Aksesuar",
    description: "316L kalite, deniz ortamına uygun"
  },
  { 
    id: 5, 
    src: "/images/projects/v7.jpeg",
    title: "EPDM Conta",
    description: "Uzun ömürlü, hava-su sızdırmazlık"
  },
  { 
    id: 6, 
    src: "/images/projects/v8.jpeg",
    title: "Motor Sistemleri",
    description: "Alman mühendisliği, sessiz çalışma"
  },
  { 
    id: 7, 
    src: "/images/projects/v9.jpeg",
    title: "Montaj Elemanları",
    description: "A4 kalite paslanmaz çelik"
  },
  { 
    id: 8, 
    src: "/images/projects/af1.jpeg",
    title: "Premium Malzeme",
    description: "Yüksek kalite standartları"
  },
];

// Sertifikalar
const certifications = [
  { icon: Shield, label: "TSE Belgeli" },
  { icon: Award, label: "CE Sertifikalı" },
  { icon: CheckCircle, label: "ISO 9001" },
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
    <section id="malzemeler" className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 md:py-28">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d4c4a05_1px,transparent_1px),linear-gradient(to_bottom,#0d4c4a05_1px,transparent_1px)] bg-[size:80px_80px]" />
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
            className="mb-4 inline-block rounded-full border border-teal-800/30 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-900"
          >
            Premium Kalite
          </motion.span>
          
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Kullandığımız <span className="text-teal-900">Malzemeler</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Projelerimizde yalnızca uluslararası standartlara uygun, TSE ve CE belgeli malzemeler kullanıyoruz.
          </p>

          {/* Certifications - Desktop */}
          <div className="hidden md:flex items-center justify-center gap-8 mt-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-600"
              >
                <cert.icon className="h-5 w-5 text-teal-700" />
                <span className="text-sm font-medium">{cert.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop Grid - Eşit Boyutlu */}
        <div className="hidden md:block">
          {/* Ana Grid - 4 Sütun, 2 Satır */}
          <div className="grid grid-cols-4 gap-6 lg:gap-8">
            {materials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div
                  onClick={() => setSelectedImage(material.id)}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                >
                  <Image
                    src={material.src}
                    alt={material.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="25vw"
                  />

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>

                  {/* Corner Borders */}
                  <div className="absolute top-3 left-3 w-10 h-10 border-l-2 border-t-2 border-teal-500/60 rounded-tl-xl transition-all duration-300 group-hover:border-teal-400 group-hover:w-12 group-hover:h-12" />
                  <div className="absolute top-3 right-3 w-10 h-10 border-r-2 border-t-2 border-teal-500/60 rounded-tr-xl transition-all duration-300 group-hover:border-teal-400 group-hover:w-12 group-hover:h-12" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-l-2 border-b-2 border-teal-500/60 rounded-bl-xl transition-all duration-300 group-hover:border-teal-400 group-hover:w-12 group-hover:h-12" />
                  <div className="absolute bottom-3 right-3 w-10 h-10 border-r-2 border-b-2 border-teal-500/60 rounded-br-xl transition-all duration-300 group-hover:border-teal-400 group-hover:w-12 group-hover:h-12" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Alt Bilgi Bandı */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 grid grid-cols-3 gap-6 lg:gap-8"
          >
            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50">
                <Shield className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">10 Yıl Garanti</h4>
                <p className="text-sm text-gray-500">Tüm malzemelerde</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50">
                <Award className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Avrupa Standartları</h4>
                <p className="text-sm text-gray-500">CE & TSE sertifikalı</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50">
                <CheckCircle className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Kalite Kontrolü</h4>
                <p className="text-sm text-gray-500">Her projede test</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Grid - 2x2 Layout */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {materials.map((material, index) => (
              <div
                key={material.id}
                onClick={() => setSelectedImage(material.id)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-gray-100"
              >
                <Image
                  src={material.src}
                  alt={material.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="50vw"
                  priority
                  loading="eager"
                  fetchPriority="high"
                  quality={85}
                />
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
                  <ZoomIn className="h-4 w-4 text-teal-900" />
                </div>
                
                {/* Corner Borders - Mobile */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-teal-500/60 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-teal-500/60 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-teal-500/60 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-teal-500/60 rounded-br-lg" />
              </div>
            ))}
          </div>

          {/* Mobile Certifications */}
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            {certifications.map((cert) => (
              <div
                key={cert.label}
                className="flex items-center gap-1.5 text-gray-600 bg-white rounded-full px-3 py-1.5 shadow-sm"
              >
                <cert.icon className="h-4 w-4 text-teal-700" />
                <span className="text-xs font-medium">{cert.label}</span>
              </div>
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
              className="relative flex h-[85vh] w-full max-w-5xl flex-col items-center justify-center"
            >
              {materials.find(m => m.id === selectedImage) && (
                <>
                  <div className="relative w-full h-full">
                    <Image
                      src={materials.find(m => m.id === selectedImage)!.src}
                      alt={materials.find(m => m.id === selectedImage)!.title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {materials.find(m => m.id === selectedImage)!.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {materials.find(m => m.id === selectedImage)!.description}
                    </p>
                  </div>
                </>
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
