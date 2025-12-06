"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  { 
    name: "Kış Bahçesi", 
    href: "/kis-bahcesi",
    image: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg"
  },
  { 
    name: "Teras Kapama", 
    href: "/teras-kapama",
    image: "/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg"
  },
  { 
    name: "Otomatik Pergola", 
    href: "/otomatik-pergola",
    image: "/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg"
  },
  { 
    name: "Rolling Roof", 
    href: "/rolling-roof",
    image: "/images/projects/e672ed00-ee93-49eb-8ff6-5f95772ae59e.jpg"
  },
  { 
    name: "Bioklimatik", 
    href: "/bioklimatik",
    image: "/images/projects/a2a54c7a-f684-47ad-861a-3b5c02a4fd94.jpg"
  },
  { 
    name: "Giyotin Cam", 
    href: "/giyotin-cam",
    image: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg"
  },
];

export default function BrandsShowcase() {

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
              className="h-full rounded-full bg-gradient-to-r from-transparent via-teal-800 to-teal-800"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className="h-2 w-2 rounded-full bg-teal-800"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "45%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-l from-transparent via-teal-800 to-teal-800"
            />
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Premium kalitede hizmetlerimizle yaşam alanlarınızı dönüştürün
          </p>
        </motion.div>

        {/* Grid - Tüm Ekranlar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
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
              className="group relative"
            >
              <Link href={service.href}>
                <div className="relative h-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-white transition-all duration-300 hover:border-teal-300 hover:shadow-xl active:border-teal-300">
                  {/* Image */}
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    
                    {/* Title - Centered on Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg transition-all group-hover:scale-105 text-center px-2">
                        {service.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

