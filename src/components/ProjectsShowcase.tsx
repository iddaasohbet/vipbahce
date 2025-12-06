"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
}

// Fallback projeler (veritabanı yoksa)
const fallbackProjects = [
  { id: 1, title: "Modern Kış Bahçesi", image_url: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg", category: "Kış Bahçesi", description: null },
  { id: 2, title: "Bioklimatik Sistem", image_url: "/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg", category: "Bioklimatik", description: null },
  { id: 3, title: "Panoramik Kış Bahçesi", image_url: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg", category: "Kış Bahçesi", description: null },
  { id: 4, title: "Cam Balkon", image_url: "/images/projects/23dd0ae8-c2ea-45ba-ad0e-272c0628a12d.jpg", category: "Cam Balkon", description: null },
  { id: 5, title: "Villa Projesi", image_url: "/images/projects/24929279-47c0-4aad-b65f-f7ba24e86f5d.jpg", category: "Kış Bahçesi", description: null },
  { id: 6, title: "Lüks Kış Bahçesi", image_url: "/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg", category: "Kış Bahçesi", description: null },
  { id: 7, title: "Minimal Tasarım", image_url: "/images/projects/54bf52db-878e-4d73-816a-61a561f97f15.jpg", category: "Bioklimatik", description: null },
  { id: 8, title: "Bahçe Kış Bahçesi", image_url: "/images/projects/615a9bb3-45f2-42e9-9a4f-dae84b4f64de.jpg", category: "Kış Bahçesi", description: null },
  { id: 9, title: "Teras Sistemi", image_url: "/images/projects/6f262068-8523-46bb-8db4-89d9a2cfb385.jpg", category: "Teras", description: null },
  { id: 10, title: "Premium Kış Bahçesi", image_url: "/images/projects/72d1c386-41de-4199-8b88-d1e92457f134.jpg", category: "Kış Bahçesi", description: null },
];

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      if (data.success && data.projects && data.projects.length > 0) {
        // Base64 URL'leri filtrele, sadece geçerli dosya yollarını kullan
        const validProjects = data.projects.filter((p: Project) => 
          p.image_url && 
          p.image_url.startsWith('/') && 
          !p.image_url.startsWith('data:')
        );
        
        if (validProjects.length > 0) {
          setProjects(validProjects);
        } else {
          // Eğer geçerli proje yoksa fallback kullan
          setProjects(fallbackProjects);
        }
      } else {
        // API'den proje gelmezse fallback kullan
        setProjects(fallbackProjects);
      }
    } catch (error) {
      console.error("Load projects error:", error);
      // Hata durumunda fallback kullan
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  // Slider için projeleri ikiye böl (üst ve alt için)
  const topRowProjects = projects.slice(0, Math.ceil(projects.length / 2));
  const bottomRowProjects = projects.slice(Math.ceil(projects.length / 2));

  const openProjectModal = (id: number) => {
    setSelectedProject(id);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section id="projeler" className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full border border-teal-800/30 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-900"
          >
            Portföyümüz
          </motion.span>
          
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Tamamlanan <span className="text-teal-900">Projelerimiz</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            15+ yıllık tecrübemizle tamamladığımız başarılı projelerden örnekler
          </p>
        </motion.div>

        {/* Top Slider - Sağdan Sola */}
        <div className="mb-8 overflow-hidden">
          <div className="relative">
            <div className="flex gap-6 animate-slide-left" style={{ width: 'fit-content' }}>
              {/* İki kez tekrarla smooth infinite scroll için */}
              {topRowProjects.length > 0 ? (
                [...topRowProjects, ...topRowProjects].map((project, index) => (
                  <div
                    key={`top-${project.id}-${index}`}
                    className="group relative flex-shrink-0 w-80 h-64 overflow-hidden rounded-3xl bg-gray-100 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                    onClick={() => openProjectModal(project.id)}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        {project.category && (
                          <div className="mb-2 inline-block rounded-full bg-teal-500 px-3 py-1 text-xs font-medium text-white">
                            {project.category}
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-teal-500/0 group-hover:border-teal-500/50 rounded-3xl transition-all duration-300" />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">Proje bulunamadı</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Slider - Soldan Sağa */}
        <div className="overflow-hidden">
          <div className="relative">
            <div className="flex gap-6 animate-slide-right" style={{ width: 'fit-content' }}>
              {/* İki kez tekrarla smooth infinite scroll için */}
              {bottomRowProjects.length > 0 ? (
                [...bottomRowProjects, ...bottomRowProjects].map((project, index) => (
                  <div
                    key={`bottom-${project.id}-${index}`}
                    className="group relative flex-shrink-0 w-80 h-64 overflow-hidden rounded-3xl bg-gray-100 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                    onClick={() => openProjectModal(project.id)}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        {project.category && (
                          <div className="mb-2 inline-block rounded-full bg-teal-500 px-3 py-1 text-xs font-medium text-white">
                            {project.category}
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-teal-500/0 group-hover:border-teal-500/50 rounded-3xl transition-all duration-300" />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">Proje bulunamadı</div>
              )}
            </div>
          </div>
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/galeri"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-800 to-teal-900 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Tüm Projeleri İnceleyin
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all hover:bg-white hover:scale-110"
                aria-label="Kapat"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Image */}
              <div className="relative w-full h-[90vh] bg-gray-100">
                {projects.find(p => p.id === selectedProject) && (
                  <Image
                    src={projects.find(p => p.id === selectedProject)!.image_url}
                    alt={projects.find(p => p.id === selectedProject)!.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

