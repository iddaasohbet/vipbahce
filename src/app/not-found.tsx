"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute h-1 w-1 rounded-full bg-white"
          />
        ))}
        
        {/* Glowing orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -left-20 top-1/4 h-60 w-60 rounded-full bg-teal-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 px-6 text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative mb-8"
        >
          {/* Glow behind number */}
          <div className="absolute inset-0 text-[180px] font-black text-teal-400/20 blur-2xl md:text-[250px]">
            404
          </div>
          <h1 className="relative text-[150px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-teal-200 md:text-[200px]">
            404
          </h1>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm"
        >
          <Search className="h-10 w-10 text-white" />
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 text-3xl font-bold text-white md:text-4xl"
        >
          Sayfa Bulunamadı
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mb-10 max-w-md text-lg text-teal-100/70"
        >
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-semibold text-teal-700 shadow-xl shadow-black/20 transition-all"
            >
              {/* Shimmer */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100 to-transparent skew-x-12"
              />
              <Home className="relative h-5 w-5" />
              <span className="relative">Ana Sayfaya Dön</span>
            </motion.button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
            Geri Git
          </button>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <svg 
            viewBox="0 0 32 32" 
            className="h-8 w-8 text-white/50"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 16L16 4L28 16H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <rect x="4" y="16" width="24" height="12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <line x1="10" y1="16" x2="10" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="16" y1="16" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="22" y1="16" x2="22" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="4" y1="22" x2="28" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-bold text-white/50">Kış Bahçesi</span>
        </motion.div>
      </div>
    </div>
  );
}

