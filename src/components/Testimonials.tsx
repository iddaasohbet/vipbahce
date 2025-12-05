"use client";

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ahmet",
    surname: "Yılmaz",
    rating: 5,
    comment: "Kış bahçemiz harika oldu! Profesyonel ekip, kaliteli malzeme ve zamanında teslimat. Kesinlikle tavsiye ediyorum.",
    location: "İstanbul",
    project: "Villa Kış Bahçesi",
  },
  {
    id: 2,
    name: "Fatma",
    surname: "Demir",
    rating: 5,
    comment: "Bioklimatik tavan sistemi beklentilerimin üzerinde çıktı. Yaz kış kullanabiliyoruz, çok memnunuz.",
    location: "Ankara",
    project: "Bioklimatik Sistem",
  },
  {
    id: 3,
    name: "Mehmet",
    surname: "Kaya",
    rating: 5,
    comment: "Fiyat performans açısından en iyi tercih. Montaj ekibi çok titiz çalıştı. Teşekkürler!",
    location: "İzmir",
    project: "Cam Balkon",
  },
  {
    id: 4,
    name: "Ayşe",
    surname: "Çelik",
    rating: 5,
    comment: "3 farklı firmadan teklif aldım, en profesyonel hizmeti buradan aldım. Sonuç muhteşem!",
    location: "Bursa",
    project: "Teras Kış Bahçesi",
  },
  {
    id: 5,
    name: "Mustafa",
    surname: "Öztürk",
    rating: 5,
    comment: "Güvenilir firma, söyledikleri her şeyi yaptılar. Kış bahçemiz evin en sevdiğimiz köşesi oldu.",
    location: "Antalya",
    project: "Panoramik Kış Bahçesi",
  },
  {
    id: 6,
    name: "Zeynep",
    surname: "Arslan",
    rating: 5,
    comment: "Tasarımdan montaja kadar her aşamada bilgilendirildik. Çok profesyonel bir süreçti.",
    location: "Konya",
    project: "Modern Kış Bahçesi",
  },
];

// Soyadını yıldızla gizle (örn: Yılmaz -> Y****)
const maskSurname = (surname: string) => {
  if (surname.length <= 1) return surname;
  return surname[0] + "****";
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

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
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
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

  const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative snake-border snake-delay-${(index % 6) + 1}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg shadow-gray-200/50 transition-all hover:shadow-xl">
      {/* Quote icon background */}
      <div className="absolute -right-4 -top-4 text-teal-100 transition-colors group-hover:text-teal-200">
        <Quote className="h-24 w-24" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Stars */}
        <div className="mb-4 flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Comment */}
        <p className="mb-6 text-gray-600 leading-relaxed">
          &ldquo;{testimonial.comment}&rdquo;
        </p>

        {/* Divider */}
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-lg font-bold text-white shadow-lg shadow-teal-500/30">
              {testimonial.name[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {testimonial.name} {maskSurname(testimonial.surname)}
              </p>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
          </div>
          
          {/* Project badge */}
          <div className="hidden sm:block">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              {testimonial.project}
            </span>
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-teal-50/30 to-white py-20">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30"
          >
            <Quote className="h-8 w-8 text-white" />
          </motion.div>
          
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Müşterilerimiz Ne Diyor?
          </h2>
          
          {/* Animated Lines */}
          <div className="relative mx-auto mb-6 flex h-[3px] w-full max-w-md items-center justify-center gap-3">
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
          
          <p className="mx-auto max-w-2xl text-gray-600">
            Yüzlerce mutlu müşterimizden bazıları
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div 
            ref={sliderRef}
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
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                  <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg shadow-gray-200/50 border-2 border-gray-100">
                    {/* Quote icon background */}
                    <div className="absolute -right-4 -top-4 text-teal-100">
                      <Quote className="h-20 w-20" />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      {/* Stars */}
                      <div className="mb-3 flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                        &ldquo;{testimonial.comment}&rdquo;
                      </p>

                      {/* Divider */}
                      <div className="mb-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-sm font-bold text-white">
                          {testimonial.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {testimonial.name} {maskSurname(testimonial.surname)}
                          </p>
                          <p className="text-xs text-gray-500">{testimonial.location} • {testimonial.project}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={goToPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-teal-50 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5 text-teal-600" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
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
    </section>
  );
}
