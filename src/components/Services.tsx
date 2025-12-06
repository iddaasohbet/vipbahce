"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Shield, CheckCircle2 } from "lucide-react";

// Malzeme kategorileri ve detayları
const materials = [
  {
    id: 1,
    src: "/images/projects/v1.jpeg",
    title: "Alüminyum Taşıyıcı Sistemler",
    subtitle: "Ana Konstrüksiyon",
    description: "6063-T6 alaşımlı, özel ekstrüzyon alüminyum profiller. Yüksek mukavemet, hafiflik ve korozyon direnci sağlar. Elektrostatik toz boya kaplama ile 25 yıl garanti.",
    specs: ["6063-T6 Alaşım", "RAL Renk Seçenekleri", "25 Yıl Garanti"],
    origin: "Türkiye",
    certificate: "TSE, CE"
  },
  {
    id: 2,
    src: "/images/projects/v2.jpeg",
    title: "Isıcamlı Cam Üniteler",
    subtitle: "Yalıtım Sistemleri",
    description: "4+16+4 mm temperli, ısı kontrollü cam üniteler. Argon gazlı, Low-E kaplamalı camlar ile maksimum enerji tasarrufu. Ses ve ısı yalıtımında üstün performans.",
    specs: ["4+16+4 mm Temperli", "Argon Gazlı", "Low-E Kaplama"],
    origin: "Türkiye",
    certificate: "TSE, CE, EN 1279"
  },
  {
    id: 3,
    src: "/images/projects/v3.jpeg",
    title: "Bioklimatik Tavan Lamelleri",
    subtitle: "Akıllı Güneş Kontrolü",
    description: "0-140° ayarlanabilir motorlu alüminyum lameller. Uzaktan kumanda ve akıllı ev entegrasyonu. Yağmur sensörü ile otomatik kapanma özelliği.",
    specs: ["0-140° Ayarlanabilir", "Motorlu Sistem", "Yağmur Sensörü"],
    origin: "İtalya",
    certificate: "CE, IP65"
  },
  {
    id: 4,
    src: "/images/projects/v4.jpeg",
    title: "Premium Sürgü Sistemleri",
    subtitle: "Hareket Mekanizmaları",
    description: "Alman mühendisliği hassas rulman sistemleri. Sessiz çalışma, kolay kullanım ve uzun ömür. 100.000 açılış kapanış garantisi.",
    specs: ["Alman Rulmanlar", "Sessiz Çalışma", "100.000 Döngü"],
    origin: "Almanya",
    certificate: "DIN, CE"
  },
  {
    id: 5,
    src: "/images/projects/v5.jpeg",
    title: "EPDM Sızdırmazlık Contaları",
    subtitle: "İzolasyon Elemanları",
    description: "Ozon ve UV dayanımlı premium EPDM contalar. -40°C ile +120°C arası çalışma sıcaklığı. Mükemmel su ve hava sızdırmazlığı.",
    specs: ["-40°C / +120°C", "UV Dayanımlı", "20 Yıl Ömür"],
    origin: "Almanya",
    certificate: "DIN 7863"
  },
  {
    id: 6,
    src: "/images/projects/v6.jpeg",
    title: "Elektrostatik Toz Boya",
    subtitle: "Yüzey Kaplama",
    description: "Qualicoat sertifikalı elektrostatik toz boya. 60-80 mikron kaplama kalınlığı. Solma, çizilme ve kimyasal maddelere karşı üstün direnç.",
    specs: ["60-80 Mikron", "Qualicoat Sertifika", "RAL Renk Kataloğu"],
    origin: "Türkiye",
    certificate: "Qualicoat, GSB"
  },
  {
    id: 7,
    src: "/images/projects/v7.jpeg",
    title: "A4 Paslanmaz Bağlantılar",
    subtitle: "Montaj Elemanları",
    description: "AISI 316 kalite deniz tipi paslanmaz çelik. Tuzlu ortam ve yüksek nem direnci. Vida, cıvata ve özel bağlantı elemanları.",
    specs: ["AISI 316 Kalite", "Deniz Tipi", "Paslanmaz"],
    origin: "İtalya",
    certificate: "ISO 3506"
  },
  {
    id: 8,
    src: "/images/projects/v8.jpeg",
    title: "Entegre LED Aydınlatma",
    subtitle: "Aydınlatma Sistemleri",
    description: "Profil içi gizli LED şerit aydınlatma. Dim edilebilir, RGB renk seçenekleri. Enerji tasarruflu, 50.000 saat ömür garantisi.",
    specs: ["Dim Edilebilir", "RGB Seçenekleri", "50.000 Saat"],
    origin: "Türkiye",
    certificate: "CE, RoHS"
  },
  {
    id: 9,
    src: "/images/projects/v9.jpeg",
    title: "Wacker Silikon Dolgu",
    subtitle: "Sızdırmazlık Malzemesi",
    description: "Alman Wacker marka premium silikon. UV stabilize, küf önleyici formül. Mükemmel yapışma ve esneklik, 25 yıl dayanım.",
    specs: ["UV Stabilize", "Küf Önleyici", "25 Yıl Dayanım"],
    origin: "Almanya",
    certificate: "ISO 11600"
  },
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

          {/* Materials Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedImage(material.id)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-teal-200"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={material.src}
                    alt={material.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  {/* Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg">
                      Detaylı İncele
                    </span>
                  </div>

                  {/* Origin Badge */}
                  <div className="absolute right-3 top-3">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-gray-700 shadow backdrop-blur-sm">
                      {material.origin}
                    </span>
                  </div>

                  {/* Number */}
                  <div className="absolute left-3 top-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white shadow-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-teal-600">
                    {material.subtitle}
                  </p>
                  <h4 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                    {material.title}
                  </h4>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {material.description}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2">
                    {material.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Certificate */}
                  <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
                    <Shield className="h-4 w-4 text-teal-600" />
                    <span className="text-xs text-gray-500">
                      Sertifika: <span className="font-medium text-gray-700">{material.certificate}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      {/* Bottom CTA */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Malzemelerimiz Hakkında Detaylı Bilgi Alın
            </h3>
            <p className="mb-6 text-gray-600">
              Teknik ekibimiz, projenizdeki malzeme seçimi konusunda size yardımcı olmaktan mutluluk duyar.
            </p>
            <a
              href="/teklif-al"
              className="inline-flex items-center justify-center rounded-full bg-teal-700 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-teal-800 hover:scale-105"
            >
              Ücretsiz Danışmanlık Alın
            </a>
          </motion.div>
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

            {/* Content - Full Image View */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[85vh] w-full max-w-5xl items-center justify-center"
            >
              {materials.find(m => m.id === selectedImage) && (
                <div className="relative h-full w-full">
                  <Image
                    src={materials.find(m => m.id === selectedImage)!.src}
                    alt={materials.find(m => m.id === selectedImage)!.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                  
                  {/* Info Overlay at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 md:p-8">
                    <div className="mx-auto max-w-3xl">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-teal-500 px-3 py-1 text-xs font-bold text-white">
                          {materials.find(m => m.id === selectedImage)!.origin}
                        </span>
                        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {materials.find(m => m.id === selectedImage)!.certificate}
                        </span>
                        {materials.find(m => m.id === selectedImage)!.specs.map((spec, i) => (
                          <span key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-teal-300">{materials.find(m => m.id === selectedImage)!.subtitle}</p>
                      <h3 className="text-xl font-bold text-white md:text-2xl">
                        {materials.find(m => m.id === selectedImage)!.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-300 md:text-base">
                        {materials.find(m => m.id === selectedImage)!.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-2 rounded-full bg-black/50 p-2 backdrop-blur-sm md:flex">
              {materials.map((material) => (
                <button
                  key={material.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(material.id);
                  }}
                  className={`h-10 w-10 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === material.id
                      ? 'border-teal-400 scale-110'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={material.src}
                    alt={material.title}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
