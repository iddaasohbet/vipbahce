"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Örnek haberler - Admin paneli yapıldığında dinamik olacak
const newsItems = [
  {
    id: 1,
    title: "Bioklimatik Pergola Sistemlerinde Yeni Teknolojiler",
    excerpt: "2024 yılında kış bahçesi sektöründe çığır açan yeni teknolojiler ve akıllı otomasyon sistemleri.",
    image: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg",
    category: "Teknoloji",
    date: "15 Ara",
  },
  {
    id: 2,
    title: "Kış Bahçesi Bakım Rehberi",
    excerpt: "Kış aylarında kış bahçenizin bakımı için uzman önerileri ve ipuçları.",
    image: "/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg",
    category: "Rehber",
    date: "10 Ara",
  },
  {
    id: 3,
    title: "Enerji Tasarruflu Cam Sistemleri",
    excerpt: "Isı yalıtımlı cam teknolojileri ile enerji maliyetlerinizi nasıl düşürebilirsiniz?",
    image: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg",
    category: "Ürünler",
    date: "5 Ara",
  },
];

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  // Touch/Swipe handling
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
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-teal-50/30 to-white py-24">
      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-teal-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">
              Güncel
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Bizden Haberler
          </h2>
          
          {/* Animated Lines */}
          <div className="relative mx-auto mt-6 mb-6 flex h-[3px] w-full max-w-md items-center justify-center gap-3">
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
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-700"
          >
            Tümünü Gör
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </motion.button>
        </motion.div>

        {/* News Cards */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8">
            {newsItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Category Badge */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-900 shadow-lg">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Read More - Appears on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-xl transition-transform group-hover:scale-110">
                      <ArrowUpRight className="h-5 w-5 text-gray-900" />
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{item.date}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span className="text-sm text-teal-600 font-medium">{item.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-teal-700 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden">
            <div 
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex"
              >
                {newsItems.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-2">
                    <div className="group cursor-pointer">
                      {/* Image Container */}
                      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute left-3 top-3">
                          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-lg">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <span className="text-xs text-gray-400">{item.date}</span>
                        
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows & Dots */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={goToPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-teal-50 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5 text-teal-600" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index 
                        ? 'w-6 bg-teal-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-teal-50 active:scale-95"
              >
                <ChevronRight className="h-5 w-5 text-teal-600" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
