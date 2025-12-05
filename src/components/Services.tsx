"use client";

import { motion } from "framer-motion";
import { Home, Grid3X3, Package, Wind, Settings } from "lucide-react";

// TL Icon Component
const TLIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <text x="4" y="18" fontSize="16" fontWeight="bold" fill="currentColor" stroke="none">₺</text>
  </svg>
);

const services = [
  {
    icon: Home,
    title: "Kış Bahçesi",
    description: "Modern ve estetik tasarımlarla, yaşam alanınızı genişletin. Dört mevsim konfor.",
  },
  {
    icon: TLIcon,
    title: "Kış Bahçesi Fiyatları",
    description: "Bütçenize uygun, rekabetçi fiyatlarla kaliteli hizmet. Ücretsiz keşif ve teklif.",
  },
  {
    icon: Grid3X3,
    title: "Kış Bahçesi Modelleri",
    description: "Farklı model ve tasarım seçenekleri ile size özel çözümler.",
  },
  {
    icon: Package,
    title: "Model Fiyatları",
    description: "Şeffaf fiyatlandırma, detaylı model karşılaştırması ve danışmanlık.",
  },
  {
    icon: Wind,
    title: "Bioklimatik Sistemler",
    description: "Akıllı havalandırma ve ısı kontrol sistemleri ile doğayla uyumlu yaşam.",
  },
  {
    icon: Settings,
    title: "Montaj & Bakım",
    description: "Profesyonel montaj hizmeti ve uzun ömürlü garanti. Periyodik bakım.",
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="relative overflow-hidden border-b border-gray-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Size Özel Çözümler
          </h2>
          {/* Animated Lines - Coming from both sides */}
          <div className="relative mx-auto mb-6 flex h-[3px] w-full max-w-xl items-center justify-center gap-3">
            {/* Left Line - Coming from left */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "45%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-transparent via-[#0d4c4a] to-[#115e59]"
            />
            {/* Center Dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className="h-2 w-2 rounded-full bg-[#0d4c4a]"
            />
            {/* Right Line - Coming from right */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "45%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-l from-transparent via-[#0d4c4a] to-[#115e59]"
            />
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Modern tasarım ve kaliteli malzemelerle, hayalinizdeki kış bahçesini gerçeğe dönüştürüyoruz.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
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
                <div className="mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="h-12 w-12 text-teal-600" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Service Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-teal-600">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </div>

                {/* Bottom indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 group-hover:w-full"
                />

                {/* Hover corner accent */}
                <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden rounded-bl-[100px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-br from-teal-100 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

