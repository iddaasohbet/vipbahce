"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Settings, LogOut, Shield, Home, LayoutDashboard, Image as ImageIcon, 
  Mail, FileText, BarChart3, Menu, X, Save, Loader2, Check, Phone, 
  MapPin, Globe, Lock, Facebook, Instagram, Twitter, Youtube, Linkedin,
  MessageCircle, Building, Clock, FileDown
} from "lucide-react";

interface SettingItem {
  value: string;
  type: string;
  label: string;
}

interface SettingsData {
  contact?: Record<string, SettingItem>;
  social?: Record<string, SettingItem>;
  general?: Record<string, SettingItem>;
}

export default function AdminSettings() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form verileri
  const [contactForm, setContactForm] = useState({
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
  });

  const [socialForm, setSocialForm] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    whatsapp: "",
  });

  const [generalForm, setGeneralForm] = useState({
    site_title: "",
    site_description: "",
    working_hours: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: pathname === "/admin" },
    { icon: ImageIcon, label: "Projeler", href: "/admin/projects", active: pathname === "/admin/projects" },
    { icon: Mail, label: "İletişim Mesajları", href: "/admin/messages", active: pathname === "/admin/messages" },
    { icon: FileText, label: "İçerik Yönetimi", href: "/admin/content", active: pathname === "/admin/content" },
    { icon: BarChart3, label: "Raporlar", href: "/admin/reports", active: pathname === "/admin/reports" },
    { icon: Settings, label: "Ayarlar", href: "/admin/settings", active: pathname === "/admin/settings" },
    { icon: Shield, label: "Güvenlik", href: "/admin/security", active: pathname === "/admin/security" },
    { icon: FileDown, label: "Teklif Oluştur", href: "/admin/teklif", active: pathname === "/admin/teklif" },
  ];

  useEffect(() => {
    checkAuth();
    loadSettings();
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

  const loadSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      const data = await response.json();
      
      if (data.success && data.settings) {
        // Contact ayarları
        if (data.settings.contact) {
          setContactForm({
            phone: data.settings.contact.phone?.value || "",
            email: data.settings.contact.email?.value || "",
            address: data.settings.contact.address?.value || "",
            city: data.settings.contact.city?.value || "",
            district: data.settings.contact.district?.value || "",
          });
        }
        
        // Social ayarları
        if (data.settings.social) {
          setSocialForm({
            facebook: data.settings.social.facebook?.value || "",
            instagram: data.settings.social.instagram?.value || "",
            twitter: data.settings.social.twitter?.value || "",
            youtube: data.settings.social.youtube?.value || "",
            linkedin: data.settings.social.linkedin?.value || "",
            whatsapp: data.settings.social.whatsapp?.value || "",
          });
        }
        
        // General ayarları
        if (data.settings.general) {
          setGeneralForm({
            site_title: data.settings.general.site_title?.value || "",
            site_description: data.settings.general.site_description?.value || "",
            working_hours: data.settings.general.working_hours?.value || "",
          });
        }
      }
    } catch (error) {
      console.error("Load settings error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (settings: Record<string, string>) => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Ayarlar başarıyla kaydedildi" });
      } else {
        setMessage({ type: "error", text: data.message || "Bir hata oluştu" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Bir hata oluştu" });
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/settings/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Şifre başarıyla değiştirildi" });
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setMessage({ type: "error", text: data.message || "Bir hata oluştu" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Bir hata oluştu" });
    } finally {
      setSaving(false);
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
                  <p className="text-xs text-gray-500">Ayarlar</p>
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
          <div className="h-full flex flex-col pt-16 lg:pt-0">
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
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Site Ayarları</h2>
              <p className="text-gray-600 mt-1">Footer, iletişim ve sosyal medya ayarlarını yönetin</p>
            </div>

            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  message.type === "success" 
                    ? "bg-green-50 text-green-800 border border-green-200" 
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                <Check className="h-5 w-5" />
                <span>{message.text}</span>
              </motion.div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "contact"
                      ? "bg-teal-50 text-teal-700 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Phone className="h-4 w-4 inline mr-2" />
                  İletişim Bilgileri
                </button>
                <button
                  onClick={() => setActiveTab("social")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "social"
                      ? "bg-teal-50 text-teal-700 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Globe className="h-4 w-4 inline mr-2" />
                  Sosyal Medya
                </button>
                <button
                  onClick={() => setActiveTab("general")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "general"
                      ? "bg-teal-50 text-teal-700 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="h-4 w-4 inline mr-2" />
                  Genel Ayarlar
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "password"
                      ? "bg-teal-50 text-teal-700 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Lock className="h-4 w-4 inline mr-2" />
                  Şifre Değiştir
                </button>
              </div>

              <div className="p-6">
                {/* İletişim Bilgileri Tab */}
                {activeTab === "contact" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Telefon Numarası
                        </label>
                        <input
                          type="text"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="+90 555 123 4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="h-4 w-4 inline mr-2" />
                          E-posta Adresi
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="info@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Building className="h-4 w-4 inline mr-2" />
                          İl
                        </label>
                        <input
                          type="text"
                          value={contactForm.city}
                          onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="İstanbul"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MapPin className="h-4 w-4 inline mr-2" />
                          İlçe
                        </label>
                        <input
                          type="text"
                          value={contactForm.district}
                          onChange={(e) => setContactForm({ ...contactForm, district: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="Sarıyer"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Adres
                      </label>
                      <textarea
                        value={contactForm.address}
                        onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none resize-none"
                        placeholder="Tam adres"
                      />
                    </div>
                    <button
                      onClick={() => saveSettings(contactForm)}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                      Kaydet
                    </button>
                  </div>
                )}

                {/* Sosyal Medya Tab */}
                {activeTab === "social" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Facebook className="h-4 w-4 inline mr-2" />
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={socialForm.facebook}
                          onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="https://facebook.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Instagram className="h-4 w-4 inline mr-2" />
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={socialForm.instagram}
                          onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Twitter className="h-4 w-4 inline mr-2" />
                          Twitter / X
                        </label>
                        <input
                          type="url"
                          value={socialForm.twitter}
                          onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="https://twitter.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Youtube className="h-4 w-4 inline mr-2" />
                          YouTube
                        </label>
                        <input
                          type="url"
                          value={socialForm.youtube}
                          onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="https://youtube.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Linkedin className="h-4 w-4 inline mr-2" />
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={socialForm.linkedin}
                          onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="https://linkedin.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <MessageCircle className="h-4 w-4 inline mr-2" />
                          WhatsApp
                        </label>
                        <input
                          type="text"
                          value={socialForm.whatsapp}
                          onChange={(e) => setSocialForm({ ...socialForm, whatsapp: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                          placeholder="+905551234567"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => saveSettings(socialForm)}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                      Kaydet
                    </button>
                  </div>
                )}

                {/* Genel Ayarlar Tab */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Globe className="h-4 w-4 inline mr-2" />
                        Site Başlığı
                      </label>
                      <input
                        type="text"
                        value={generalForm.site_title}
                        onChange={(e) => setGeneralForm({ ...generalForm, site_title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                        placeholder="Site başlığı"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FileText className="h-4 w-4 inline mr-2" />
                        Site Açıklaması
                      </label>
                      <textarea
                        value={generalForm.site_description}
                        onChange={(e) => setGeneralForm({ ...generalForm, site_description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none resize-none"
                        placeholder="Site açıklaması"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Çalışma Saatleri
                      </label>
                      <input
                        type="text"
                        value={generalForm.working_hours}
                        onChange={(e) => setGeneralForm({ ...generalForm, working_hours: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                        placeholder="Pazartesi - Cumartesi: 09:00 - 18:00"
                      />
                    </div>
                    <button
                      onClick={() => saveSettings(generalForm)}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-800 to-teal-900 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                      Kaydet
                    </button>
                  </div>
                )}

                {/* Şifre Değiştir Tab */}
                {activeTab === "password" && (
                  <div className="space-y-6 max-w-md">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Dikkat:</strong> Şifrenizi değiştirdikten sonra yeniden giriş yapmanız gerekecektir.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mevcut Şifre
                      </label>
                      <input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Yeni Şifre
                      </label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Yeni Şifre (Tekrar)
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                    <button
                      onClick={changePassword}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
                      Şifreyi Değiştir
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}




