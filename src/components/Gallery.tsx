"use client";

import { motion } from "framer-motion";

const galleryImages = [
  {
    title: "Modern Kış Bahçesi",
    category: "Villa",
  },
  {
    title: "Bioklimatik Sistem",
    category: "Daire",
  },
  {
    title: "Panoramik Kış Bahçesi",
    category: "Villa",
  },
  {
    title: "Cam Balkon Sistemi",
    category: "Daire",
  },
  {
    title: "Lüks Kış Bahçesi",
    category: "Villa",
  },
  {
    title: "Minimal Tasarım",
    category: "Daire",
  },
];

export default function Gallery() {
  return (
    <section id="galeri" className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
            Projelerimiz
          </span>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Gerçekleştirdiğimiz Projeler
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Binlerce mutlu müşteriyle oluşturduğumuz modern kış bahçesi ve bioklimatik sistemler.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg transition-all hover:shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mb-3 inline-block rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-green-700 shadow-sm">
                    {image.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {image.title}
                  </h3>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            * Görsel temsilidir. Gerçek proje fotoğrafları eklenecektir.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


