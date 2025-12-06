"use client";

import { motion } from "framer-motion";
import { Clock, Sparkles, Rocket } from "lucide-react";

export default function ComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,184,166,0.15)_0%,_transparent_50%)]" />
      
      <motion.div
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        className="relative mx-4 max-w-2xl overflow-hidden rounded-3xl border-2 border-teal-500/30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 shadow-2xl md:p-12"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(20,184,166,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(20,184,166,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 100%, rgba(20,184,166,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 0%, rgba(20,184,166,0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(20,184,166,0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-full w-full"
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mb-6 flex justify-center"
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-teal-500/40 blur-2xl"
            />
            
            {/* Icon container */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/50">
              <Rocket className="h-10 w-10 text-white" />
            </div>
            
            {/* Orbiting sparkles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute inset-0"
            >
              <Sparkles className="absolute -bottom-2 -left-2 h-4 w-4 text-teal-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="relative space-y-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-sm font-medium text-teal-300"
          >
            <Clock className="h-4 w-4" />
            Yakında
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Çok Yakında
            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Buradayız!
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mx-auto max-w-md text-lg text-gray-300"
          >
            Modern kış bahçesi sistemlerimizle hayalinizdeki yaşam alanını oluşturuyoruz. 
            Çok yakında sizlerleyiz!
          </motion.p>

          {/* Animated line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mx-auto mt-8 h-1 w-32 origin-center rounded-full bg-gradient-to-r from-transparent via-teal-500 to-transparent"
          />

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="space-y-3 pt-6"
          >
            <p className="text-sm text-gray-400">Şimdiden iletişime geçebilirsiniz:</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+905333593466"
                className="group flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                0533 359 34 66
              </a>
              <a
                href="mailto:info@vipkisbahcesi.com"
                className="group flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-posta Gönder
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
            className="absolute h-1 w-1 rounded-full bg-teal-400"
            style={{
              left: `${10 + i * 12}%`,
              bottom: "10%",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

