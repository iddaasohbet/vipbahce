"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TeklifAl() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    projectType: "",
    area: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const projectTypes = [
    "Kış Bahçesi",
    "Bioklimatik Pergola",
    "Cam Balkon",
    "Teras Kapatma",
    "Diğer",
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-xl px-4 md:px-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 text-center"
              >
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Teklif Alın</h1>
                <p className="mt-3 text-gray-600">Bilgilerinizi doldurun, 24 saat içinde size ulaşalım.</p>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="rounded-2xl border-2 border-gray-300 p-8 md:p-10">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                            Ad Soyad *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            placeholder="Adınız ve soyadınız"
                          />
                        </div>

                        {/* Phone & Email */}
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                              Telefon *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                              placeholder="05XX XXX XX XX"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                              E-posta
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                              placeholder="ornek@email.com"
                            />
                          </div>
                        </div>

                        {/* City & Project Type */}
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">
                              Şehir *
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              required
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                              placeholder="İstanbul"
                            />
                          </div>
                          <div>
                            <label htmlFor="projectType" className="mb-2 block text-sm font-medium text-gray-700">
                              Proje Tipi *
                            </label>
                            <select
                              id="projectType"
                              name="projectType"
                              required
                              value={formData.projectType}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            >
                              <option value="">Seçiniz</option>
                              {projectTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Area */}
                        <div>
                          <label htmlFor="area" className="mb-2 block text-sm font-medium text-gray-700">
                            Tahmini Alan (m²)
                          </label>
                          <input
                            type="text"
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            placeholder="Örn: 20"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                            Mesajınız
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                            placeholder="Projeniz hakkında detay vermek isterseniz..."
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-teal-600/30 transition-all hover:shadow-xl hover:shadow-teal-600/40 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Gönderiliyor...
                              </>
                            ) : (
                              <>
                                Teklif İste
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </span>
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform group-hover:translate-x-full" style={{ transitionDuration: '1s' }} />
                        </button>
                      <p className="mt-5 text-center text-xs text-gray-500">
                        Bilgileriniz gizli tutulacak ve sadece teklif için kullanılacaktır.
                      </p>
                    </form>
                  ) : (
                    /* Success State */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                      >
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </motion.div>
                      <h3 className="mb-3 text-2xl font-bold text-gray-900">
                        Talebiniz Alındı!
                      </h3>
                      <p className="mb-6 text-gray-600">
                        En kısa sürede uzman ekibimiz sizinle iletişime geçecektir.
                      </p>
                      <a
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        Ana Sayfaya Dön
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

