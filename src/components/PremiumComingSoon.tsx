"use client";

import { motion } from "framer-motion";
import { Calendar, Mail, Phone } from "lucide-react";

export default function PremiumComingSoon() {
  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Blurred Background - Shows actual site behind */}
      <div className="absolute inset-0 backdrop-blur-[20px] bg-black/40" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-transparent to-cyan-900/30" />
      
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(20,184,166,0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(6,182,212,0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(20,184,166,0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(20,184,166,0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative flex h-full items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          {/* Glass Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
            {/* Shimmer Effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />

            <div className="relative p-8 md:p-12">
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 flex justify-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-5 py-2 backdrop-blur-sm">
                  <Calendar className="h-4 w-4 text-teal-300" />
                  <span className="text-sm font-semibold text-teal-100">Çok Yakında</span>
                </div>
              </motion.div>

              {/* Main Logo/Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="mb-8 flex justify-center"
              >
                <div className="relative">
                  {/* Glow rings */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-teal-400/30 blur-2xl"
                  />
                  
                  {/* Icon */}
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm">
                    <svg viewBox="0 0 40 40" className="h-14 w-14" fill="none">
                      <motion.path
                        d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
                        stroke="url(#gradient)"
                        strokeWidth="2.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.6 }}
                      />
                      <motion.path
                        d="M13 18L20 13L27 18M14 18V26H26V18"
                        stroke="url(#gradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                          <stop offset="0%" stopColor="#14B8A6" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-4 text-center"
              >
                <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  Kış Bahçesi
                </h1>
                <div className="mb-4 flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ scaleX: [0, 1] }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-px w-12 bg-gradient-to-r from-transparent to-teal-400"
                  />
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal-300">
                    Premium Sistemler
                  </p>
                  <motion.div
                    animate={{ scaleX: [0, 1] }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-px w-12 bg-gradient-to-l from-transparent to-teal-400"
                  />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mb-8 text-center text-lg text-white/80 md:text-xl"
              >
                Hayalinizdeki modern yaşam alanları için hazırlıklar devam ediyor.
                <br />
                <span className="font-semibold text-white">Çok yakında sizlerleyiz!</span>
              </motion.p>

              {/* Countdown or Progress Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mb-8"
              >
                <div className="mx-auto max-w-xs">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                    />
                  </div>
                  <p className="mt-2 text-center text-sm text-white/60">Hazırlık %75</p>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="space-y-3 border-t border-white/10 pt-8"
              >
                <p className="text-center text-sm font-medium text-white/70">
                  Şimdiden bizimle iletişime geçebilirsiniz
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="tel:+905333593466"
                    className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:border-teal-400/50 hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4 text-teal-300" />
                    <span className="text-sm font-medium text-white">0533 359 34 66</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:support@kisbahcesi.com"
                    className="group flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/10"
                  >
                    <Mail className="h-4 w-4 text-cyan-300" />
                    <span className="text-sm font-medium text-white">E-posta</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Floating Particles */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -100 - Math.random() * 50],
                      x: [0, (Math.random() - 0.5) * 50],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="absolute rounded-full bg-teal-400/30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: "0%",
                      width: 2 + Math.random() * 4,
                      height: 2 + Math.random() * 4,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 text-center text-sm text-white/50"
          >
            © 2025 Kış Bahçesi Premium Sistemler
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

