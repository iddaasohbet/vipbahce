"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Parçacık komponenti
const Particle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: number; y: number; size: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      x: x,
      y: y,
    }}
    transition={{
      duration: duration,
      delay: delay,
      ease: "easeOut",
    }}
    className="absolute rounded-full bg-white"
    style={{ width: size, height: size }}
  />
);

// Yıldız parçacığı
const StarParticle = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.5, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2,
      delay: delay,
      ease: "easeInOut",
    }}
    className="absolute"
    style={{ left: x, top: y }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="opacity-60">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  </motion.div>
);

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
    
    // Parçacıkları göster
    const particleTimer = setTimeout(() => setShowParticles(true), 800);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(particleTimer);
    };
  }, [onComplete]);

  if (!isMounted) return null;

  // Rastgele parçacıklar oluştur
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: 1 + Math.random() * 0.8,
    duration: 1.5 + Math.random() * 1,
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 400,
    size: 2 + Math.random() * 4,
  }));

  const starPositions = [
    { x: "15%", y: "20%", delay: 1.2 },
    { x: "85%", y: "25%", delay: 1.4 },
    { x: "10%", y: "70%", delay: 1.6 },
    { x: "90%", y: "75%", delay: 1.8 },
    { x: "25%", y: "85%", delay: 2.0 },
    { x: "75%", y: "15%", delay: 2.2 },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated gradient background - Dark Teal */}
          <motion.div
            animate={{
              background: [
                "linear-gradient(135deg, #115e59 0%, #134e4a 25%, #0c4a4a 50%, #115e59 75%, #134e4a 100%)",
                "linear-gradient(135deg, #134e4a 0%, #0c4a4a 25%, #115e59 50%, #134e4a 75%, #0c4a4a 100%)",
                "linear-gradient(135deg, #115e59 0%, #134e4a 25%, #0c4a4a 50%, #115e59 75%, #134e4a 100%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
          />

          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(17,94,89,0.4)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(19,78,74,0.4)_0%,_transparent_50%)]" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Floating orbs */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-cyan-400/30 to-teal-600/20 blur-[80px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.35, 0.15],
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-emerald-400/25 to-teal-700/15 blur-[100px]"
          />

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 2 + ring * 0.5, 3 + ring * 0.5],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.8 + ring * 0.3,
                  ease: "easeOut",
                }}
                className="absolute h-32 w-32 rounded-full border-2 border-white/30"
              />
            ))}
          </div>

          {/* Star particles */}
          {starPositions.map((star, i) => (
            <StarParticle key={i} delay={star.delay} x={star.x} y={star.y} />
          ))}

          {/* Center particles explosion */}
          {showParticles && (
            <div className="absolute inset-0 flex items-center justify-center">
              {particles.map((p) => (
                <Particle key={p.id} {...p} />
              ))}
            </div>
          )}

          {/* Main Logo Container */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.3,
            }}
            className="relative z-10 mb-8"
          >
            {/* Glow rings */}
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
              className="absolute -inset-4 rounded-3xl bg-white/20 blur-xl"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -inset-8 rounded-3xl bg-cyan-400/20 blur-2xl"
            />

            {/* Logo badge */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 40px rgba(20, 184, 166, 0.4), 0 0 80px rgba(20, 184, 166, 0.2)",
                  "0 0 60px rgba(20, 184, 166, 0.6), 0 0 120px rgba(20, 184, 166, 0.3)",
                  "0 0 40px rgba(20, 184, 166, 0.4), 0 0 80px rgba(20, 184, 166, 0.2)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-2xl"
            >

              {/* Icon */}
              <svg
                viewBox="0 0 40 40"
                className="relative h-16 w-16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M20 4L34 12V28L20 36L6 28V12L20 4Z"
                  stroke="#115e59"
                  strokeWidth="2.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                />
                <motion.path
                  d="M13 18L20 13L27 18"
                  stroke="#115e59"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                />
                <motion.path
                  d="M14 18V26H26V18"
                  stroke="#115e59"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                />
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  <line x1="18" y1="18" x2="18" y2="26" stroke="#0f766e" strokeWidth="1.5" />
                  <line x1="22" y1="18" x2="22" y2="26" stroke="#0f766e" strokeWidth="1.5" />
                  <line x1="14" y1="22" x2="26" y2="22" stroke="#0f766e" strokeWidth="1.5" />
                </motion.g>
              </svg>
            </motion.div>
          </motion.div>

          {/* Brand Name with character animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="relative z-10 text-center"
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="text-4xl font-bold tracking-tight text-white md:text-5xl"
              >
                {"Kış Bahçesi".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + i * 0.05, duration: 0.3 }}
                    className="inline-block"
                    style={{ marginRight: char === " " ? "0.3em" : "0" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
              className="mx-auto mt-3 h-0.5 w-32 origin-center bg-gradient-to-r from-transparent via-white to-transparent"
            />

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1, delay: 2.2 }}
              className="mt-4 text-sm uppercase text-white/70"
            >
              Premium Sistemler
            </motion.p>
          </motion.div>

          {/* Loading indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-16 flex flex-col items-center gap-4"
          >
            {/* Animated dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  className="h-2 w-2 rounded-full bg-white"
                />
              ))}
            </div>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: -50 }}
            animate={{ opacity: 0.5, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute left-8 top-8"
          >
            <div className="h-20 w-20 border-l-2 border-t-2 border-white/20 rounded-tl-3xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 0.5, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-8 right-8"
          >
            <div className="h-20 w-20 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
