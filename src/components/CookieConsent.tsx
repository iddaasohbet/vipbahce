"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check localStorage immediately - no delay
    try {
      const cookieConsent = localStorage.getItem("cookieConsent");
      if (!cookieConsent) {
        setIsVisible(true);
      }
    } catch (error) {
      setIsVisible(true);
    }
  }, []);

  if (!mounted) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
    } catch (error) {
      // Ignore
    }
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem("cookieConsent", "rejected");
    } catch (error) {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
          style={{ maxHeight: '20vh' }}
          suppressHydrationWarning
        >
          <div className="mx-auto max-w-7xl px-3 py-2 md:px-6 md:py-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-700 leading-snug">
                  Bu site çerez kullanır.{" "}
                  <Link 
                    href="/gizlilik" 
                    className="font-medium text-teal-700 hover:underline underline-offset-2"
                  >
                    Gizlilik Politikası
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleReject}
                  className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reddet
                </button>
                <button
                  onClick={handleAccept}
                  className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors"
                >
                  Kabul Et
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

