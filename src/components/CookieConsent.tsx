"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Wait a bit for page to load, then check localStorage
    const timer = setTimeout(() => {
      try {
        const cookieConsent = localStorage.getItem("cookieConsent");
        // Show banner if no consent has been given
        if (!cookieConsent) {
          setIsVisible(true);
        }
      } catch (error) {
        // If localStorage fails, show anyway
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
    } catch (error) {
      // Ignore localStorage errors
    }
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem("cookieConsent", "rejected");
    } catch (error) {
      // Ignore localStorage errors
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999]"
        >
          <div className="mx-auto max-w-7xl px-4 pb-6 md:px-6 md:pb-8">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              {/* Content */}
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:gap-6 md:p-8">
                {/* Left side - Icon and Text */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-100">
                    <Cookie className="h-5 w-5 text-teal-700" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                      Bu web sitesi, size en iyi deneyimi sunmak için çerezler kullanır. 
                      Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz. 
                      Detaylı bilgi için{" "}
                      <Link 
                        href="/gizlilik" 
                        className="font-semibold text-teal-700 underline-offset-2 hover:underline"
                      >
                        Gizlilik Politikamızı
                      </Link>{" "}
                      inceleyebilirsiniz.
                    </p>
                  </div>
                </div>

                {/* Right side - Buttons */}
                <div className="flex shrink-0 gap-3">
                  <button
                    onClick={handleReject}
                    className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                  >
                    Reddet
                  </button>
                  <button
                    onClick={handleAccept}
                    className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-teal-800 active:scale-95"
                  >
                    Kabul Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

