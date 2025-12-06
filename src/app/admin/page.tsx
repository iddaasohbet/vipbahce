"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Shield, Home, LayoutDashboard, Image as ImageIcon, Mail, Settings, FileText, BarChart3, Menu, X } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
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
    } finally {
      setLoading(false);
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

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
    { icon: ImageIcon, label: "Projeler", href: "/admin/projects" },
    { icon: Mail, label: "İletişim Mesajları", href: "/admin/messages" },
    { icon: FileText, label: "İçerik Yönetimi", href: "/admin/content" },
    { icon: BarChart3, label: "Raporlar", href: "/admin/reports" },
    { icon: Settings, label: "Ayarlar", href: "/admin/settings" },
  ];

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
                  <p className="text-xs text-gray-500">Yönetim Paneli</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
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
              {menuItems.map((item, index) => (
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
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Hoş Geldiniz, {admin?.username}
              </h2>
              <p className="text-gray-600">
                Yönetim paneline hoş geldiniz. Sistem yönetimi için menüden ilgili bölüme gidebilirsiniz.
              </p>
            </motion.div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: ImageIcon,
                  title: "Proje Yönetimi",
                  description: "Galeriye yeni proje ekleyin veya mevcut projeleri düzenleyin",
                  color: "from-blue-500 to-blue-600",
                  href: "/admin/projects",
                },
                {
                  icon: Mail,
                  title: "İletişim Mesajları",
                  description: "Gelen iletişim formu mesajlarını görüntüleyin ve yanıtlayın",
                  color: "from-green-500 to-green-600",
                  href: "/admin/messages",
                },
                {
                  icon: FileText,
                  title: "İçerik Yönetimi",
                  description: "Sayfa içeriklerini düzenleyin ve güncelleyin",
                  color: "from-purple-500 to-purple-600",
                  href: "/admin/content",
                },
                {
                  icon: BarChart3,
                  title: "Raporlar ve Analitik",
                  description: "Site istatistiklerini ve raporları görüntüleyin",
                  color: "from-orange-500 to-orange-600",
                  href: "/admin/reports",
                },
                {
                  icon: Settings,
                  title: "Sistem Ayarları",
                  description: "Genel sistem ayarlarını yapılandırın",
                  color: "from-gray-500 to-gray-600",
                  href: "/admin/settings",
                },
                {
                  icon: Shield,
                  title: "Güvenlik",
                  description: "Güvenlik ayarları ve kullanıcı yönetimi",
                  color: "from-red-500 to-red-600",
                  href: "/admin/security",
                },
              ].map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link
                    href={action.href}
                    className="block bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6 hover:shadow-lg hover:border-teal-300 transition-all h-full"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Sisteme giriş yapıldı</p>
                    <p className="text-xs text-gray-500">Az önce</p>
                  </div>
                </div>
                <div className="text-center py-8 text-gray-500 text-sm">
                  Henüz aktivite bulunmuyor
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

