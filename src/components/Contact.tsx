"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    details: "+90 533 359 34 66",
    subtext: "Haftaiçi 09:00 - 18:00",
  },
  {
    icon: Mail,
    title: "E-posta",
    details: "info@vipkisbahcesi.com",
    subtext: "7/24 destek",
  },
  {
    icon: MapPin,
    title: "Adres",
    details: "İstanbul, Türkiye",
    subtext: "Ücretsiz keşif hizmeti",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    details: "Pazartesi - Cumartesi",
    subtext: "09:00 - 18:00",
  },
];

export default function Contact() {
  return (
    <section id="iletisim" className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e08_1px,transparent_1px),linear-gradient(to_bottom,#22c55e08_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
            İletişim
          </span>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Bizimle İletişime Geçin
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Ücretsiz keşif ve teklif için hemen iletişime geçin. Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <info.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {info.title}
                </h3>
                
                <p className="mb-1 font-medium text-gray-900">
                  {info.details}
                </p>
                
                <p className="text-sm text-gray-600">
                  {info.subtext}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl md:p-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Ücretsiz Teklif Alın
                </h3>
                <p className="mb-6 text-gray-600">
                  Formu doldurun, size en kısa sürede dönüş yapalım. Ücretsiz keşif ve detaylı fiyat teklifi için hemen başvurun.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                      <Phone className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Hızlı yanıt garantisi</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Ücretsiz keşif hizmeti</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                      <Mail className="h-4 w-4 text-green-600" />
                    </div>
                    <span>Detaylı fiyat teklifi</span>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Telefon"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-posta"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Mesajınız"
                    rows={4}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 font-semibold text-white shadow-lg shadow-green-600/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-green-600/50"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


