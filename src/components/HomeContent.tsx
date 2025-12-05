"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandsShowcase from "@/components/BrandsShowcase";
import Services from "@/components/Services";
import VideoGallery from "@/components/VideoGallery";
import Testimonials from "@/components/Testimonials";
import NewsSection from "@/components/NewsSection";
import SEOArticle from "@/components/SEOArticle";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import ComingSoon from "@/components/ComingSoon"; // Geçici - kaldırmak için bu satırı sil

export default function HomeContent() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      
      {/* YAKINDA GELİYORUZ OVERLAY - Kaldırmak için bu satırı ve aşağıdaki <ComingSoon /> satırını sil */}
      <ComingSoon />
      
      <div className={`bg-white ${showSplash ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Header />
        <main>
          <Hero />
          <BrandsShowcase />
          <Services />
          <VideoGallery />
          <Testimonials />
          <NewsSection />
          <SEOArticle />
        </main>
        <Footer />
      </div>
    </>
  );
}

