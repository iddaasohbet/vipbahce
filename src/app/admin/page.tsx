"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Shield, Users, FileText, Settings, Home } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-800 to-teal-900 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Yönetim Paneli</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">Hoş geldiniz, <strong>{admin?.username}</strong></span>
              <Link
                href="/"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Ana Sayfa"
              >
                <Home className="h-5 w-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Yönetim paneline hoş geldiniz</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Toplam Kullanıcı", value: "0", icon: Users, color: "blue" },
            { title: "Toplam Proje", value: "0", icon: FileText, color: "green" },
            { title: "Bekleyen İstekler", value: "0", icon: Settings, color: "yellow" },
            { title: "Aktif Oturumlar", value: "1", icon: Shield, color: "purple" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition-all text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Yeni Proje Ekle</h4>
              <p className="text-sm text-gray-600">Galeriye yeni proje ekleyin</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition-all text-left">
              <h4 className="font-semibold text-gray-900 mb-1">İletişim Mesajları</h4>
              <p className="text-sm text-gray-600">Gelen mesajları görüntüleyin</p>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition-all text-left">
              <h4 className="font-semibold text-gray-900 mb-1">Ayarlar</h4>
              <p className="text-sm text-gray-600">Site ayarlarını düzenleyin</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

