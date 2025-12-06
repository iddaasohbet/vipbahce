"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Phone, Sparkles } from "lucide-react";

export default function Header() {
  const navItems = [
    { href: "/", label: 'Ana Sayfa' },
    { 
      href: "#hizmetler", 
      label: 'Hizmetler',
      dropdown: [
        { label: 'Kış Bahçesi', href: "/kis-bahcesi" },
        { label: 'Teras Kapama', href: "/teras-kapama" },
        { label: 'Otomatik Pergola', href: "/otomatik-pergola" },
        { label: 'Rolling Roof', href: "/rolling-roof" },
        { label: 'Bioklimatik', href: "/bioklimatik" },
        { label: 'Giyotin Cam', href: "/giyotin-cam" },
        { label: 'Sürgülü Cam', href: "/surgulu-cam" },
        { label: 'Katlanır Cam', href: "/katlanir-cam" },
        { label: 'Hebeshiebe', href: "/hebeshiebe" },
      ]
    },
    { href: "/hakkimizda", label: 'Hakkımızda' },
    { href: "/galeri", label: 'Galeri' },
    { href: "/teklif-al", label: 'İletişim' },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "py-2"
          : "py-4"
      }`}
    >
      {/* Background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/50" 
          : "bg-transparent"
      }`} />
      
      {/* Animated gradient line when scrolled */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-teal-500 to-transparent"
        />
      )}

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="group relative flex items-center gap-3"
          aria-label="Kış Bahçesi Ana Sayfa"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-xl blur-lg transition-opacity duration-300 ${
              scrolled ? "bg-teal-500/30 opacity-0 group-hover:opacity-100" : "bg-teal-500/20 opacity-100"
            }`} />
            
            <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
              scrolled 
                ? "bg-gradient-to-br from-teal-800 to-teal-900 shadow-lg shadow-teal-500/20" 
                : "bg-gradient-to-br from-teal-800 to-teal-900 shadow-xl shadow-teal-500/30"
            }`}>
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
              
              {/* Icon */}
              <svg 
                viewBox="0 0 40 40" 
                className="relative h-7 w-7"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="#ffffff" strokeWidth="2" fill="none"/>
                <path d="M13 18L20 13L27 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 18V26H26V18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="18" y1="18" x2="18" y2="26" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                <line x1="22" y1="18" x2="22" y2="26" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                <line x1="14" y1="22" x2="26" y2="22" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              </svg>
            </div>
          </motion.div>
          
          <div>
            <motion.span 
              className={`block text-base sm:text-xl font-bold tracking-tight transition-colors ${
                scrolled ? "text-gray-900" : "text-gray-900"
              } group-hover:text-teal-900`}
            >
              Kış Bahçesi
            </motion.span>
            <span className="block text-[8px] sm:text-[10px] uppercase tracking-widest font-semibold text-gray-900">
              Kış bahçesi fiyatları
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={`group relative flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  scrolled 
                    ? "text-gray-700 hover:text-teal-900" 
                    : "text-gray-700 hover:text-teal-900"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {item.dropdown && (
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                )}
                
                {/* Hover background */}
                <motion.span 
                  className="absolute inset-0 -z-10 rounded-full bg-teal-50"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>

              {/* Premium Dropdown */}
              {item.dropdown && (
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full mt-3 -translate-x-1/2"
                    >
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-white border-l border-t border-gray-200 rounded-tl-sm" />
                      
                      <div className="relative w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-5 py-3 border-b border-gray-100">
                          <p className="text-xs font-semibold text-teal-900 flex items-center gap-2">
                            <Sparkles className="h-3 w-3" />
                            Hizmetlerimiz
                          </p>
                        </div>
                        
                        <div className="p-2">
                          {item.dropdown.map((subItem, i) => (
                            <motion.a
                              key={subItem.href}
                              href={subItem.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm text-gray-700 transition-all hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50"
                            >
                              <span className="font-medium group-hover:text-teal-900">{subItem.label}</span>
                              <ArrowRight className="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-teal-800" />
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* WhatsApp number */}
          <a 
            href="https://wa.me/905333593466"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/30"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>0533 359 34 66</span>
          </a>
          
          {/* Main CTA */}
          <Link
            href="/teklif-al"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-800 to-teal-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all hover:shadow-xl hover:shadow-teal-500/30"
          >
            {/* Shimmer */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            
            <span className="relative flex items-center gap-2">
              Teklif Al
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button - Premium */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="relative flex h-12 w-12 items-center justify-center lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Background with gradient border */}
          <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
            scrolled 
              ? "bg-white shadow-lg border border-gray-200" 
              : "bg-gradient-to-br from-teal-500 to-teal-800 shadow-xl shadow-teal-500/30"
          }`}>
            {/* Inner glow */}
            <div className={`absolute inset-0 rounded-2xl transition-opacity ${
              scrolled ? "opacity-0" : "opacity-100 bg-gradient-to-tr from-white/20 via-transparent to-transparent"
            }`} />
          </div>
          
          {/* Animated lines */}
          <div className="relative z-10 flex h-5 w-6 flex-col items-center justify-center">
            <motion.span
              animate={{
                rotate: open ? 45 : 0,
                y: open ? 0 : -6,
                width: open ? 22 : 22,
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute h-[3px] rounded-full ${
                scrolled ? "bg-teal-800" : "bg-white"
              }`}
            />
            <motion.span
              animate={{
                opacity: open ? 0 : 1,
                scaleX: open ? 0 : 1,
                width: 16,
              }}
              transition={{ duration: 0.3 }}
              className={`absolute h-[3px] rounded-full ${
                scrolled ? "bg-teal-500" : "bg-white/80"
              }`}
            />
            <motion.span
              animate={{
                rotate: open ? -45 : 0,
                y: open ? 0 : 6,
                width: open ? 22 : 18,
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute h-[3px] rounded-full ${
                scrolled ? "bg-teal-800" : "bg-white"
              }`}
            />
          </div>
          
          {/* Pulse ring when not scrolled */}
          {!scrolled && !open && (
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-2xl bg-teal-400"
            />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-[9999] h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden"
            >
              {/* Top gradient */}
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500" />
              
              <div className="flex h-full flex-col p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-800 to-teal-900 shadow-lg shadow-teal-500/20">
                      <svg viewBox="0 0 40 40" className="h-6 w-6" fill="none">
                        <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="#fff" strokeWidth="2"/>
                        <path d="M13 18L20 13L27 18M14 18V26H26V18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-gray-900">Kış Bahçesi</span>
                      <span className="block text-[9px] uppercase tracking-widest font-semibold text-teal-800">Premium</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition-colors hover:bg-gray-200"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Phone CTA */}
                <a
                  href="tel:+905333593466"
                  className="mb-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 p-4 border border-teal-100"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-800 text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-teal-800 font-medium">Hemen Arayın</p>
                    <p className="text-lg font-bold text-gray-900">0533 359 34 66</p>
                  </div>
                </a>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col gap-1">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.label ? null : item.label)}
                            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-800 transition-all hover:bg-gray-50"
                          >
                            <span>{item.label}</span>
                            <motion.div animate={{ rotate: mobileDropdownOpen === item.label ? 180 : 0 }}>
                              <ChevronDown className={`h-4 w-4 ${mobileDropdownOpen === item.label ? 'text-teal-800' : 'text-gray-400'}`} />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {mobileDropdownOpen === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 border-l-2 border-teal-200 pl-4 py-2">
                                  {item.dropdown.map((subItem, idx) => (
                                    <motion.a
                                      key={subItem.href}
                                      href={subItem.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.03 }}
                                      className="block py-2.5 text-sm text-gray-600 hover:text-teal-900"
                                      onClick={() => { setOpen(false); setMobileDropdownOpen(null); }}
                                    >
                                      {subItem.label}
                                    </motion.a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-800 transition-all hover:bg-gray-50 hover:text-teal-900"
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom CTA */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link
                    href="/teklif-al"
                    className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-800 to-teal-900 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-teal-500/25"
                    onClick={() => setOpen(false)}
                  >
                    Ücretsiz Teklif Alın
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
