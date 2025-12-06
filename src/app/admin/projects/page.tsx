"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Edit2, Trash2, Image as ImageIcon, Upload, Loader2, Check, AlertCircle, LogOut, Shield, Home, LayoutDashboard, Mail, Settings, FileText, BarChart3, Menu } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  is_featured: number;
  is_active: number;
  created_at: string;
}

export default function AdminProjects() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    image_url: "",
  });

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: pathname === "/admin" },
    { icon: ImageIcon, label: "Projeler", href: "/admin/projects", active: pathname === "/admin/projects" },
    { icon: Mail, label: "İletişim Mesajları", href: "/admin/messages", active: pathname === "/admin/messages" },
    { icon: FileText, label: "İçerik Yönetimi", href: "/admin/content", active: pathname === "/admin/content" },
    { icon: BarChart3, label: "Raporlar", href: "/admin/reports", active: pathname === "/admin/reports" },
    { icon: Settings, label: "Ayarlar", href: "/admin/settings", active: pathname === "/admin/settings" },
  ];

  useEffect(() => {
    checkAuth();
    loadProjects();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/check");
      const data = await response.json();
      if (data.success) {
        setAdmin(data.admin);
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      router.push("/admin/login");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects || []);
        // Eğer mesaj varsa konsola yazdır (debug için)
        if (data.message) {
          console.log("API Message:", data.message);
        }
        if (data.error) {
          console.error("API Error:", data.error);
        }
      } else {
        console.error("Load projects failed:", data.message);
        alert(data.message || "Projeler yüklenirken bir hata oluştu");
      }
    } catch (error: any) {
      console.error("Load projects error:", error);
      alert("Projeler yüklenirken bir hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // FormData oluştur
      const formData = new FormData();
      formData.append("file", file);

      // API'ye yükle
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ image_url: data.url });
      } else {
        alert(data.message || "Resim yüklenirken bir hata oluştu");
      }
    } catch (error: any) {
      alert("Resim yüklenirken bir hata oluştu: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Base64 URL kontrolü
    if (formData.image_url && formData.image_url.startsWith('data:')) {
      alert("Lütfen resmi yükleyin veya geçerli bir dosya yolu girin (örn: /images/projects/resim.jpg)\n\nBase64 resimler desteklenmiyor.");
      return;
    }

    if (!formData.image_url || !formData.image_url.startsWith('/')) {
      alert("Lütfen geçerli bir resim yolu girin (örn: /images/projects/resim.jpg)");
      return;
    }

    setUploading(true);

    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : "/api/admin/projects";
      
      const method = editingProject ? "PUT" : "POST";

      // Sadece resim URL'si gönder
      const projectData = editingProject 
        ? { image_url: formData.image_url }
        : {
            image_url: formData.image_url,
          };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        setShowAddModal(false);
        setEditingProject(null);
        setFormData({ image_url: "" });
        loadProjects();
      } else {
        alert(data.message || "Bir hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;

    try {
      setUploading(true);
      console.log("Deleting project:", id);
      
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Delete response:", data);

      if (data.success) {
        alert("Proje başarıyla silindi");
        loadProjects();
      } else {
        alert(data.message || "Proje silinirken bir hata oluştu");
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      alert("Proje silinirken bir hata oluştu: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      image_url: project.image_url,
    });
    setShowAddModal(true);
  };

  const handleImportProjects = async () => {
    if (!confirm("Mevcut 23 projeyi veritabanına eklemek istediğinize emin misiniz?")) return;

    setUploading(true);
    
    const defaultProjects = [
      { title: "Modern Kış Bahçesi", image_url: "/images/projects/110810ab-64f2-4728-a238-2a003508a302.jpg", category: "Kış Bahçesi", description: null },
      { title: "Bioklimatik Sistem", image_url: "/images/projects/1cf74c9f-4258-4639-b8f8-028cfa3af530.jpg", category: "Bioklimatik", description: null },
      { title: "Panoramik Kış Bahçesi", image_url: "/images/projects/23423c76-bf9b-4e4d-9d1a-c6be73a68a50.jpg", category: "Kış Bahçesi", description: null },
      { title: "Cam Balkon", image_url: "/images/projects/23dd0ae8-c2ea-45ba-ad0e-272c0628a12d.jpg", category: "Cam Balkon", description: null },
      { title: "Villa Projesi", image_url: "/images/projects/24929279-47c0-4aad-b65f-f7ba24e86f5d.jpg", category: "Kış Bahçesi", description: null },
      { title: "Lüks Kış Bahçesi", image_url: "/images/projects/3ad4c9ba-779e-4b89-9442-42e1be96dfbf.jpg", category: "Kış Bahçesi", description: null },
      { title: "Minimal Tasarım", image_url: "/images/projects/54bf52db-878e-4d73-816a-61a561f97f15.jpg", category: "Bioklimatik", description: null },
      { title: "Bahçe Kış Bahçesi", image_url: "/images/projects/615a9bb3-45f2-42e9-9a4f-dae84b4f64de.jpg", category: "Kış Bahçesi", description: null },
      { title: "Teras Sistemi", image_url: "/images/projects/6f262068-8523-46bb-8db4-89d9a2cfb385.jpg", category: "Teras", description: null },
      { title: "Premium Kış Bahçesi", image_url: "/images/projects/72d1c386-41de-4199-8b88-d1e92457f134.jpg", category: "Kış Bahçesi", description: null },
      { title: "Modern Villa", image_url: "/images/projects/7920ba6f-b67e-47a0-9b09-5760f7bd139d.jpg", category: "Kış Bahçesi", description: null },
      { title: "Cam Tavan Sistemi", image_url: "/images/projects/7c30fee6-861f-4949-bd08-95dd9f9a16f2.jpg", category: "Bioklimatik", description: null },
      { title: "Modern Tasarım", image_url: "/images/projects/86e1cccf-d01f-4c17-83a1-a89b14f60477.jpg", category: "Kış Bahçesi", description: null },
      { title: "Lüks Villa", image_url: "/images/projects/8e0ee8dd-3e22-4322-95c7-17a507f0ed28.jpg", category: "Kış Bahçesi", description: null },
      { title: "Bioklimatik Tavan", image_url: "/images/projects/94ceb7d1-7e61-4612-bf9c-6a2623cd45fe.jpg", category: "Bioklimatik", description: null },
      { title: "Teras Kapatma", image_url: "/images/projects/9ece48f1-4fd1-4573-8fb0-2a8684db1be0.jpg", category: "Teras", description: null },
      { title: "Panoramik Görünüm", image_url: "/images/projects/a2a54c7a-f684-47ad-861a-3b5c02a4fd94.jpg", category: "Cam Balkon", description: null },
      { title: "Cam Sistem", image_url: "/images/projects/a77c368b-8476-4a92-a01c-6c08f705b980.jpg", category: "Cam Balkon", description: null },
      { title: "Premium Proje", image_url: "/images/projects/c84d2298-dd03-4a2f-80ab-4224e9e1b272.jpg", category: "Kış Bahçesi", description: null },
      { title: "Bahçe Entegrasyonu", image_url: "/images/projects/cf3777cd-a53c-44d5-aa2b-f0562621a607.jpg", category: "Kış Bahçesi", description: null },
      { title: "Modern Çözüm", image_url: "/images/projects/df5971d9-c105-4b7e-bbe5-17f182ae8bc8.jpg", category: "Bioklimatik", description: null },
      { title: "Premium Sistem", image_url: "/images/projects/e327a0bb-698e-448b-94e1-126291cb38be.jpg", category: "Kış Bahçesi", description: null },
      { title: "Teras Entegrasyonu", image_url: "/images/projects/e672ed00-ee93-49eb-8ff6-5f95772ae59e.jpg", category: "Teras", description: null },
    ];

    try {
      let successCount = 0;
      let errorCount = 0;

      for (const project of defaultProjects) {
        try {
          const response = await fetch("/api/admin/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
          });

          const data = await response.json();
          if (data.success) {
            successCount++;
          } else {
            errorCount++;
            console.error(`Failed to import: ${project.title}`, data.message);
          }
        } catch (error) {
          errorCount++;
          console.error(`Error importing: ${project.title}`, error);
        }
      }

      alert(`${successCount} proje başarıyla eklendi. ${errorCount > 0 ? `${errorCount} proje eklenirken hata oluştu.` : ''}`);
      loadProjects();
    } catch (error: any) {
      alert("Projeler yüklenirken bir hata oluştu: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-800 to-teal-900 flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-xs text-gray-500">Proje Yönetimi</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setEditingProject(null);
                setFormData({ image_url: "" });
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Yeni Proje Ekle</span>
            </button>
              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Ana Sayfa</span>
              </Link>
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white text-sm font-semibold">
                  {admin?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{admin?.username}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Menü</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? 'bg-gradient-to-r from-teal-50 to-teal-100 text-teal-900 font-semibold border border-teal-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${item.active ? 'text-teal-700' : 'text-gray-500'}`} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                <p className="text-xs font-semibold text-teal-900 mb-1">Sistem Durumu</p>
                <p className="text-xs text-teal-700">Tüm sistemler çalışıyor</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Debug:</strong> {projects.length} proje bulundu
            </p>
          </div>
        )}

        {/* Import Projects Button */}
        {projects.length === 0 && (
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 rounded-xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mevcut Projeleri Yükle</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sitedeki mevcut 23 projeyi veritabanına eklemek için aşağıdaki butona tıklayın.
                </p>
                <button
                  onClick={handleImportProjects}
                  disabled={uploading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Yükleniyor...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      Mevcut Projeleri Yükle (23 Proje)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz proje eklenmemiş</h3>
            <p className="text-gray-600 mb-6">İlk projenizi eklemek için yukarıdaki butona tıklayın</p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                <strong>Not:</strong> Eğer veritabanında proje varsa ama görünmüyorsa, tarayıcı konsolunu kontrol edin (F12).
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  {project.image_url && !project.image_url.startsWith('data:') ? (
                    <Image
                      src={project.image_url}
                      alt={project.title || "Proje"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        console.error("Project image error:", project.image_url);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-gray-400"><svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">Resim yok</p>
                        {project.image_url && project.image_url.startsWith('data:') && (
                          <p className="text-xs text-red-500 mt-1">Base64 URL - Lütfen düzenleyin</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project.id);
                        }}
                        disabled={uploading}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Projeyi Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {project.category && (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-teal-700 bg-teal-50 rounded">
                      {project.category}
                    </span>
                  )}
                  {project.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProject ? "Proje Düzenle" : "Yeni Proje Ekle"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProject(null);
                    setFormData({ image_url: "" });
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Proje Resmi *
                  </label>
                  {formData.image_url ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                      {formData.image_url.startsWith('/') ? (
                        <Image
                          src={formData.image_url}
                          alt="Preview"
                          fill
                          className="object-cover"
                          onError={(e) => {
                            console.error("Image load error:", formData.image_url);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : formData.image_url.startsWith('data:') ? (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                          <AlertCircle className="h-8 w-8 mb-2 text-yellow-500" />
                          <p className="text-sm text-center">Base64 resim algılandı</p>
                          <p className="text-xs text-center mt-1">Lütfen resmi yükleyin veya dosya yolunu girin</p>
                          <button
                            type="button"
                            onClick={() => setFormData({ image_url: "" })}
                            className="mt-2 px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Temizle
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <p className="text-sm">Resim yolu: {formData.image_url}</p>
                        </div>
                      )}
                      {!formData.image_url.startsWith('data:') && (
                        <button
                          type="button"
                          onClick={() => setFormData({ image_url: "" })}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 z-10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-semibold">Resim yüklemek için tıklayın</span>
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG veya WEBP</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                {/* Image URL (Manual) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Resim URL'si *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image_url}
                    onChange={(e) => setFormData({ image_url: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                    placeholder="/images/projects/proje-resmi.jpg"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Resim URL'sini girin (örn: /images/projects/proje-resmi.jpg)
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingProject(null);
                      setFormData({ image_url: "" });
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        <Check className="h-5 w-5" />
                        {editingProject ? "Güncelle" : "Kaydet"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

