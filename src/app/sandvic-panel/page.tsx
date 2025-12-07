"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, ChevronDown, Shield, Award, Sparkles, Leaf, Sun, Droplets, X, Square } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sandvicPanelProjects = [
  { 
    src: "/images/projects/Sandvicpanel.jpg", 
    title: "Modern Sandviç Panel",
    alt: "Modern tasarım sandviç panel projesi"
  },
  { 
    src: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg", 
    title: "Panoramik Sandviç Panel",
    alt: "Panoramik görünümlü sandviç panel"
  },
  { 
    src: "/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg", 
    title: "Villa Sandviç Panel",
    alt: "Villa için özel tasarım sandviç panel"
  },
];

const advantages = [
  {
    image: "/images/projects/Sandvicpanel.jpg",
    imageAlt: "Modern sandviç panel tasarımı",
    title: "Üstün İzolasyon Özelliği",
    content: "Sandviç panel sisteminiz, iç ve dış yüzeyler arasında mükemmel bir izolasyon sağlar. Poliüretan veya mineral yün dolgulu sandviç paneller sayesinde ısı ve ses yalıtımı maksimum seviyededir. Enerji tasarrufu sağlarken konforlu bir yaşam alanı yaratır. Sandviç panel modelleri arasından size en uygun olanını seçebilirsiniz.",
    keywords: ["sandviç panel", "sandviç panel modelleri"]
  },
  {
    image: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg",
    imageAlt: "Panoramik sandviç panel görünümü",
    title: "Hızlı Montaj ve Dayanıklılık",
    content: "Sandviç panel sisteminiz, hızlı montaj özelliği ile zamandan tasarruf sağlar. Hafif ama güçlü yapısı sayesinde uzun yıllar sorunsuz kullanım imkanı sunar. Paslanmaz çelik veya alüminyum dış yüzeyler sayesinde dış etkenlere karşı dayanıklıdır. Sandviç panel sistemleri ile güvenli ve kalıcı çözümler.",
    keywords: ["sandviç panel", "sandviç panel sistemleri"]
  },
  {
    image: "/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg",
    imageAlt: "Lüks sandviç panel iç mekan",
    title: "Modern ve Estetik Tasarım",
    content: "Sandviç panel sisteminiz, modern mimariye uyumlu, şık ve estetik bir görünüme sahip olur. Farklı renk ve dokularla istediğiniz görünümü elde edebilirsiniz. Profesyonel tasarım ekibimiz, projenizi baştan sona planlar ve size özel çözümler sunar. Sandviç panel firmaları arasında kaliteli hizmet sunuyoruz.",
    keywords: ["sandviç panel", "sandviç panel firmaları"]
  },
];

const faqData = [
  {
    question: "Sandviç panel fiyatları ne kadar?",
    answer: "Sandviç panel fiyatları, projenin büyüklüğüne, kullanılan malzemeye, panel kalınlığına ve özel tasarım gereksinimlerine göre değişiklik gösterir. Standart bir sandviç panel için fiyat aralığı 25.000 TL ile 120.000 TL arasında değişebilir. Detaylı fiyat teklifi için ücretsiz keşif hizmetimizden yararlanabilirsiniz.",
  },
  {
    question: "Sandviç panel montajı ne kadar sürer?",
    answer: "Montaj süresi, projenin büyüklüğüne ve karmaşıklığına bağlı olarak 3-7 gün arasında değişir. Sandviç panellerin hızlı montaj özelliği sayesinde standart bir proje genellikle 3-5 gün içinde tamamlanır.",
  },
  {
    question: "Sandviç panel hangi malzemelerden yapılır?",
    answer: "Sandviç panellerimiz, dış yüzeylerde paslanmaz çelik veya alüminyum, iç dolgu olarak poliüretan veya mineral yün kullanılarak üretilir. Tüm malzemelerimiz TSE ve CE belgeli, 25 yıl garanti kapsamındadır.",
  },
  {
    question: "Sandviç panel izolasyonlu mu?",
    answer: "Evet, tüm sandviç panel sistemlerimiz mükemmel ısı ve ses yalıtımı sağlar. Poliüretan veya mineral yün dolgulu paneller sayesinde enerji tasarrufu maksimum seviyededir.",
  },
];

export default function SandvicPanelPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openProjectModal = (index: number) => {
    setSelectedProject(index);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject !== null) {
        closeProjectModal();
      }
    };

    if (selectedProject !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Sandviç Panel Sistemleri",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sandviç Panel",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressCountry": "TR"
      },
      "telephone": "+905333593466"
    },
    "areaServed": {
      "@type": "City",
      "name": "İstanbul"
    },
    "description": "İstanbul'da profesyonel sandviç panel sistemleri. Modern tasarım, kaliteli malzeme, uzman montaj ekibi.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="bg-white">
        <Header />
        
        <main className="min-h-screen pt-24">
          <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 pt-8 pb-16 md:pt-16 md:pb-24">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d4c4a08_1px,transparent_1px),linear-gradient(to_bottom,#0d4c4a08_1px,transparent_1px)] bg-[size:64px_64px]" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-teal-200/30 to-cyan-300/20 blur-[120px]"
              />
            </div>

            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-6 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800"
                  >
                    Premium Sandviç Panel Sistemleri
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl leading-tight"
                  >
                    Hayalinizdeki{" "}
                    <span className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 bg-clip-text text-transparent">
                      Sandviç Panel
                    </span>{" "}
                    Burada
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl"
                  >
                    15+ yıllık tecrübemiz ve 2500+ tamamlanan projemizle, mekanınıza değer katacak modern sandviç panel sistemleri sunuyoruz. Profesyonel tasarım, kaliteli malzeme ve uzman montaj ekibimizle hayalinizdeki yaşam alanını gerçeğe dönüştürüyoruz.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      href="https://wa.me/905333593466?text=Sandviç%20panel%20hakkında%20bilgi%20almak%20istiyorum"
                      target="_blank"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-800 to-teal-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    >
                      <Phone className="h-5 w-5" />
                      Ücretsiz Keşif
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/teklif-al"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-teal-900 bg-white px-8 py-4 font-semibold text-teal-900 transition-all hover:bg-teal-50"
                    >
                      Teklif Alın
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src="/images/projects/Sandvicpanel.jpg"
                      alt="Modern Sandviç Panel"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <span className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
                  Özellikler
                </span>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Neden Sandviç Panel?
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                  Sandviç panel sisteminiz, mekanınıza değer katan ve yaşam kalitenizi artıran özel bir çözüm
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Shield, title: "Üstün İzolasyon", desc: "Mükemmel ısı ve ses yalıtımı" },
                  { icon: Square, title: "Hızlı Montaj", desc: "Zamandan tasarruf sağlar" },
                  { icon: Droplets, title: "Enerji Tasarrufu", desc: "Isı yalıtımlı sistemlerle tasarruf" },
                  { icon: Sparkles, title: "Dayanıklılık", desc: "Uzun yıllar sorunsuz kullanım" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-2xl bg-white p-6 transition-all border-2 border-gray-200 hover:border-teal-300"
                  >
                    <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-3 text-teal-900 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {advantages.map((advantage, index) => (
            <section
              key={advantage.title}
              className={`py-16 md:py-24 ${index % 2 === 0 ? "bg-white" : "bg-gradient-to-br from-gray-50 to-white"}`}
            >
              <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={index % 2 === 1 ? "lg:col-start-2" : ""}
                  >
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                      <Image
                        src={advantage.image}
                        alt={advantage.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={index % 2 === 1 ? "lg:col-start-1" : ""}
                  >
                    <div className="mb-4 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">
                      {index + 1}. Avantaj
                    </div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                      {advantage.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
                      {advantage.keywords ? advantage.content.split(new RegExp(`(${advantage.keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')).map((part, i) => {
                        const isKeyword = advantage.keywords?.some(k => part.toLowerCase() === k.toLowerCase());
                        return isKeyword ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>;
                      }) : advantage.content}
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          ))}

          <section className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 md:text-4xl">
                  Sandviç Panel: Modern Yapıların Vazgeçilmezi
                </h2>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    <strong>Sandviç panel</strong>, modern yapılarda üstün izolasyon ve hızlı montaj özellikleri ile tercih edilen özel tasarım yapı malzemeleridir. 
                    <strong> Sandviç panel fiyatları</strong>, projenin büyüklüğü, kullanılan malzeme ve panel kalınlığına göre değişiklik gösterir. 
                    Kaliteli bir <strong>sandviç panel sistemi</strong>, mekanınıza değer katar ve enerji tasarrufu sağlar.
                  </p>

                  <p>
                    <strong>Sandviç panel modelleri</strong> arasında poliüretan dolgulu, mineral yün dolgulu ve farklı dış yüzey kaplamalı modeller yer alır. 
                    Her model, farklı ihtiyaçlara ve zevklere hitap eder. <strong>Sandviç panel sistemleri</strong> ile modern ve dayanıklı yapılar inşa edebilirsiniz.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <span className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
                  Portföyümüz
                </span>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                  Tamamlanan Projelerimiz
                </h2>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sandvicPanelProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-3xl bg-gray-100 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                    onClick={() => openProjectModal(index)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.src}
                        alt={project.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <AnimatePresence>
            {selectedProject !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={closeProjectModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeProjectModal}
                    className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110"
                    aria-label="Kapat"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <div className="relative w-full h-[90vh] bg-gray-100">
                    <Image
                      src={sandvicPanelProjects[selectedProject].src}
                      alt={sandvicPanelProjects[selectedProject].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <section className="py-16 md:py-24 bg-gradient-to-b from-white via-teal-50/30 to-white">
            <div className="mx-auto max-w-4xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <span className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-800">
                  SSS
                </span>
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                  Sıkça Sorulan Sorular
                </h2>
              </motion.div>

              <div className="space-y-4">
                {faqData.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl border border-gray-100 hover:border-teal-200"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-6 py-5 text-left transition-colors hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-transparent md:px-8 md:py-6"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                              isOpen ? "bg-teal-900 text-white" : "bg-teal-100 text-teal-900 group-hover:bg-teal-200"
                            }`}>
                              <span className="text-sm font-bold">{index + 1}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 md:text-xl pr-8">
                              {faq.question}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className={`h-6 w-6 transition-colors ${isOpen ? "text-teal-900" : "text-teal-600"}`} />
                          </motion.div>
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 md:px-8 md:pb-6 ml-12">
                              <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent mb-5" />
                              <p className="text-gray-700 leading-relaxed md:text-lg">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="relative py-20 md:py-28 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Hayalinizdeki Yaşam Alanı
                </motion.div>
                <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  Hayalinizdeki Sandviç Panele{" "}
                  <span className="bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
                    Kavuşun
                  </span>
                </h2>
                <p className="mb-10 text-lg text-teal-100 md:text-xl max-w-2xl mx-auto">
                  Ücretsiz keşif ve fiyat teklifi için hemen bizimle iletişime geçin.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="https://wa.me/905333593466?text=Sandviç%20panel%20hakkında%20bilgi%20almak%20istiyorum"
                    target="_blank"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-teal-800 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <Phone className="h-5 w-5" />
                    Ücretsiz Keşif
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/teklif-al"
                    className="group inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/60"
                  >
                    Teklif Alın
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}



