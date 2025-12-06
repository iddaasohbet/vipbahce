"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function ContactSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Body scroll lock when panel is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* Premium Floating Side Tab */}
      <motion.button
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 z-[100] -translate-y-1/2 hidden md:flex"
      >
        <div className="group relative">
          {/* Glow behind tab */}
          <div className="absolute -inset-2 rounded-l-2xl bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60" />
          
          <motion.div
            whileHover={{ x: -8, scale: 1.02 }}
            className="relative flex h-36 w-12 cursor-pointer flex-col items-center justify-center gap-3 rounded-l-2xl bg-gradient-to-b from-teal-700 via-teal-800 to-teal-700 shadow-2xl shadow-teal-900/50 transition-all"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 overflow-hidden rounded-l-2xl">
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </div>
            
            {/* Glass overlay */}
            <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-b from-white/20 to-transparent" />
            
            {/* Icon with glow */}
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-white/30 blur-md" />
              <MessageCircle className="relative h-6 w-6 text-white drop-shadow-lg" />
            </div>
            
            {/* Text */}
            <span className="relative text-[11px] font-bold uppercase tracking-widest text-white [writing-mode:vertical-lr] rotate-180 drop-shadow-lg">
              İletişim
            </span>

            {/* Premium pulse indicator */}
            <span className="absolute -left-1.5 top-4 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50"></span>
            </span>
          </motion.div>
        </div>
      </motion.button>

      {/* Premium Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
              style={{ touchAction: 'none' }}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[9999] w-full max-w-sm overflow-hidden bg-gradient-to-b from-slate-50 to-white shadow-2xl"
              style={{ touchAction: 'none', overscrollBehavior: 'contain' }}
            >
              {/* Decorative background elements */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-100 opacity-50 blur-3xl" />
              <div className="absolute -left-20 top-40 h-32 w-32 rounded-full bg-cyan-100 opacity-50 blur-3xl" />
              
              {/* Premium Header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-teal-800 px-5 py-6">
                {/* Animated gradient overlay */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-teal-800/0 via-cyan-400/20 to-teal-800/0 bg-[length:200%_100%]"
                />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [-20, -60],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeOut",
                      }}
                      className="absolute h-1 w-1 rounded-full bg-white/40"
                      style={{ left: `${20 + i * 15}%`, bottom: 0 }}
                    />
                  ))}
                </div>

                {/* Close Button - Premium */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative flex items-center gap-4">
                  {/* Animated icon container */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 animate-pulse rounded-2xl bg-white/30 blur-lg" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                      <MessageCircle className="h-7 w-7 text-white" />
                      <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-yellow-300" />
                    </div>
                  </motion.div>
                  
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl font-bold text-white"
                    >
                      Bize Ulaşın
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xs text-white/70"
                    >
                      7/24 yanınızdayız
                    </motion.p>
                  </div>
                </div>
                
                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-5">
                {/* Quick Contact - Premium Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-5 grid grid-cols-3 gap-3"
                >
                  {/* Phone */}
                  <motion.a
                    href="tel:+905333593466"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 p-4 shadow-lg shadow-teal-100 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-teal-800 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-teal-800 text-white shadow-lg shadow-teal-700/30 group-hover:from-white group-hover:to-white group-hover:text-teal-800">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span className="relative text-xs font-semibold text-teal-700 group-hover:text-white">Ara</span>
                  </motion.a>

                  {/* WhatsApp */}
                  <motion.a
                    href="https://wa.me/905333593466"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 shadow-lg shadow-emerald-100 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 group-hover:from-white group-hover:to-white group-hover:text-emerald-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <span className="relative text-xs font-semibold text-emerald-700 group-hover:text-white">WhatsApp</span>
                  </motion.a>

                  {/* Email */}
                  <motion.a
                    href="mailto:info@vipkisbahcesi.com"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 shadow-lg shadow-blue-100 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 group-hover:from-white group-hover:to-white group-hover:text-blue-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="relative text-xs font-semibold text-blue-700 group-hover:text-white">E-posta</span>
                  </motion.a>
                </motion.div>

                {/* Premium Phone Display */}
                <motion.a
                  href="tel:+905333593466"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative mb-5 block overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-4 shadow-xl"
                >
                  {/* Shimmer */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 3,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                  
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Hemen Arayın</p>
                      <p className="text-lg font-bold text-white">+90 533 359 34 66</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg shadow-teal-700/50">
                      <Phone className="h-5 w-5" />
                    </div>
                  </div>
                </motion.a>

                {/* Premium Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  {formSubmitted ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="relative mb-4"
                      >
                        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50">
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                      <h3 className="font-bold text-gray-900">Mesajınız Alındı!</h3>
                      <p className="mt-1 text-xs text-gray-500">En kısa sürede dönüş yapacağız.</p>
                    </motion.div>
                  ) : (
                    <>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Adınız Soyadınız"
                          required
                          className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-700/10"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="Telefon Numaranız"
                          required
                          className="w-full rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-700/10"
                        />
                      </div>
                      <div className="relative">
                        <textarea
                          placeholder="Mesajınız..."
                          rows={3}
                          required
                          className="w-full resize-none rounded-xl border-2 border-gray-100 bg-gray-50/50 px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-700/10"
                        ></textarea>
                      </div>
                      
                      {/* Premium Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-800 to-teal-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/30 transition-all hover:shadow-xl hover:shadow-teal-700/40"
                      >
                        {/* Button shimmer */}
                        <motion.div
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 1,
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                        
                        <span className="relative flex items-center justify-center gap-2">
                          Mesaj Gönder
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </motion.button>
                    </>
                  )}
                </motion.form>
              </div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-700 via-cyan-400 to-teal-700" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
