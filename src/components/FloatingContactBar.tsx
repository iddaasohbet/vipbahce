"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Instagram, Mail, X, Sparkles, Headset } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingContactBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contacts = [
    {
      name: "Ara",
      icon: Phone,
      href: "tel:+905333593466",
      bgColor: "from-teal-700 to-teal-800",
      shadowColor: "shadow-teal-700/40",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/905333593466",
      bgColor: "from-green-500 to-green-600",
      shadowColor: "shadow-green-500/40",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
      bgColor: "from-purple-500 via-pink-500 to-orange-400",
      shadowColor: "shadow-pink-500/40",
    },
    {
      name: "Mail",
      icon: Mail,
      href: "mailto:info@vipkisbahcesi.com",
      bgColor: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/40",
    },
  ];

  if (!isMobile) return null;

  return (
    <>
      {/* Floating Action Button - Collapsed State */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setIsExpanded(true)}
            className="fixed bottom-6 right-4 z-50 md:hidden"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(20, 184, 166, 0.4)",
                  "0 0 0 15px rgba(20, 184, 166, 0)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-700 to-teal-800 shadow-xl shadow-teal-700/30"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
              
              <Headset className="h-7 w-7 text-white" strokeWidth={2.5} />
              
              {/* Badge */}
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg">
                <Sparkles className="h-3 w-3" />
              </span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Contact Bar */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Contact Bar */}
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            >
              <div className="relative overflow-hidden rounded-t-[32px] bg-white shadow-2xl">
                {/* Top gradient line */}
                <div className="h-1 w-full bg-gradient-to-r from-teal-700 via-cyan-400 to-teal-700" />
                
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="h-1 w-12 rounded-full bg-gray-300" />
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Title */}
                <div className="px-6 pb-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900">Hızlı İletişim</h3>
                  <p className="text-xs text-gray-500">7/24 Ulaşabilirsiniz</p>
                </div>

                {/* Contact Buttons Grid */}
                <div className="grid grid-cols-4 gap-3 px-4 pb-6">
                  {contacts.map((contact, index) => (
                    <motion.a
                      key={contact.name}
                      href={contact.href}
                      target={contact.name === "Ara" || contact.name === "Mail" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      initial={{ scale: 0, y: 30 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 300
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="group flex flex-col items-center gap-2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${contact.bgColor} shadow-lg ${contact.shadowColor} transition-all`}
                      >
                        {/* Shine */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
                        <contact.icon className="relative h-6 w-6 text-white" strokeWidth={2} />
                      </motion.div>
                      <span className="text-[11px] font-semibold text-gray-700">{contact.name}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Main CTA Button */}
                <div className="px-4 pb-8">
                  <motion.a
                    href="tel:+905333593466"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-800 to-teal-700 px-6 py-4 shadow-xl shadow-teal-700/30"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                    
                    <Phone className="h-5 w-5 text-white" />
                    <span className="text-base font-bold text-white">Hemen Ara</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                      Ücretsiz
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
