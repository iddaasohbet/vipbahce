"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandsShowcase from "@/components/BrandsShowcase";
import Services from "@/components/Services";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import VideoGallery from "@/components/VideoGallery";
import Testimonials from "@/components/Testimonials";
import NewsSection from "@/components/NewsSection";
import SEOArticle from "@/components/SEOArticle";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

export default function HomeContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white">
        <Header />
        <main>
          <Hero />
          <BrandsShowcase />
          <Services />
          <ProjectsShowcase />
          <VideoGallery />
          <Testimonials />
          <NewsSection />
          <SEOArticle />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      
      <div className={`bg-white ${showSplash ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Header />
        <main>
          <Hero />
          <BrandsShowcase />
          <Services />
          <ProjectsShowcase />
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

