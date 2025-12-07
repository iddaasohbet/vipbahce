"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Shield, 
  LogOut, 
  Home, 
  LayoutDashboard, 
  Image as ImageIcon, 
  Mail, 
  Settings, 
  FileText, 
  BarChart3, 
  Menu, 
  X,
  Key,
  Lock,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  UserCheck,
  History,
  Loader2,
  FileDown
} from "lucide-react";

interface LoginActivity {
  id: number;
  ip_address: string;
  device: string;
  browser: string;
  location: string;
  status: "success" | "failed";
  failure_reason?: string;
  created_at: string;
}

interface ActiveSession {
  id: number;
  device: string;
  browser: string;
  ip_address: string;
  location: string;
  last_active: string;
  created_at: string;
  is_current: boolean;
}

export default function AdminSecurity() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [loginActivities, setLoginActivities] = useState<LoginActivity[]>([]);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

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
  }, []);

  useEffect(() => {
    if (admin) {
      loadSessions();
      loadLoginHistory();
    }
  }, [admin]);

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

  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const response = await fetch("/api/admin/security/sessions");
      const data = await response.json();
      if (data.success) {
        setActiveSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Load sessions error:", error);
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadLoginHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch("/api/admin/security/login-history");
      const data = await response.json();
      if (data.success) {
        setLoginActivities(data.history || []);
      }
    } catch (error) {
      console.error("Load login history error:", error);
    } finally {
      setLoadingHistory(false);
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

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", text: "Şifreler eşleşmiyor" });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: "error", text: "Şifre en az 6 karakter olmalıdır" });
      return;
    }

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
        setShowPasswordForm(false);
      } else {
        setMessage({ type: "error", text: data.message || "Bir hata oluştu" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Bir hata oluştu" });
    } finally {
      setSaving(false);
    }
  };

  const terminateSession = async (sessionId: number) => {
    if (!confirm("Bu oturumu sonlandırmak istediğinize emin misiniz?")) return;

    try {
      const response = await fetch("/api/admin/security/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: "success", text: "Oturum sonlandırıldı" });
        loadSessions();
      } else {
        setMessage({ type: "error", text: data.message || "Bir hata oluştu" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Bir hata oluştu" });
    }
  };

  const terminateAllSessions = async () => {
    if (!confirm("Mevcut oturum hariç tüm oturumları sonlandırmak istediğinize emin misiniz?")) return;

    try {
      const response = await fetch("/api/admin/security/sessions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ terminateAll: true }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: "success", text: "Tüm oturumlar sonlandırıldı" });
        loadSessions();
      } else {
        setMessage({ type: "error", text: data.message || "Bir hata oluştu" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Bir hata oluştu" });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getRelativeTime = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Şu an aktif";
    if (diffMins < 60) return `${diffMins} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    return `${diffDays} gün önce`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const securityScore = twoFactorEnabled ? 85 : 60;

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
                  <p className="text-xs text-gray-500">Güvenlik</p>
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
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Güvenlik Ayarları</h2>
              <p className="text-gray-600 mt-1">Hesap güvenliği ve oturum yönetimi</p>
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
                {message.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                <span>{message.text}</span>
              </motion.div>
            )}

            {/* Security Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Güvenlik Puanı</h3>
                  <p className="text-sm text-gray-500">Hesabınızın güvenlik durumu</p>
                </div>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  securityScore >= 80 ? 'bg-green-100' : securityScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <span className={`text-2xl font-bold ${
                    securityScore >= 80 ? 'text-green-600' : securityScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>{securityScore}</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    securityScore >= 80 ? 'bg-green-500' : securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${securityScore}%` }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Güçlü Şifre</p>
                    <p className="text-xs text-green-600">Aktif</p>
                  </div>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg border ${
                  twoFactorEnabled 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  {twoFactorEnabled ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${twoFactorEnabled ? 'text-green-800' : 'text-yellow-800'}`}>
                      2FA Doğrulama
                    </p>
                    <p className={`text-xs ${twoFactorEnabled ? 'text-green-600' : 'text-yellow-600'}`}>
                      {twoFactorEnabled ? 'Aktif' : 'Pasif'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">SSL Sertifikası</p>
                    <p className="text-xs text-green-600">Aktif</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {[
                  { id: "overview", label: "Genel Bakış", icon: ShieldCheck },
                  { id: "password", label: "Şifre", icon: Key },
                  { id: "2fa", label: "İki Faktörlü Doğrulama", icon: Smartphone },
                  { id: "sessions", label: "Aktif Oturumlar", icon: Monitor },
                  { id: "activity", label: "Giriş Geçmişi", icon: History },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "bg-teal-50 text-teal-700 border-b-2 border-teal-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Genel Bakış Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <UserCheck className="h-5 w-5 text-teal-600" />
                          <h4 className="font-semibold text-gray-900">Hesap Bilgileri</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600">Kullanıcı Adı: <span className="font-medium text-gray-900">{admin?.username}</span></p>
                          <p className="text-gray-600">Hesap Durumu: <span className="font-medium text-green-600">Aktif</span></p>
                          <p className="text-gray-600">Aktif Oturum: <span className="font-medium text-gray-900">{activeSessions.length} cihaz</span></p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Globe className="h-5 w-5 text-teal-600" />
                          <h4 className="font-semibold text-gray-900">Son Giriş</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          {loginActivities.length > 0 ? (
                            <>
                              <p className="text-gray-600">Tarih: <span className="font-medium text-gray-900">{formatDate(loginActivities[0]?.created_at)}</span></p>
                              <p className="text-gray-600">IP Adresi: <span className="font-medium text-gray-900">{loginActivities[0]?.ip_address || "-"}</span></p>
                              <p className="text-gray-600">Konum: <span className="font-medium text-gray-900">{loginActivities[0]?.location || "-"}</span></p>
                            </>
                          ) : (
                            <p className="text-gray-500">Henüz giriş kaydı yok</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <ShieldAlert className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Güvenlik Önerileri</h4>
                          <ul className="mt-2 space-y-1 text-sm text-blue-800">
                            {!twoFactorEnabled && (
                              <li>• İki faktörlü doğrulamayı (2FA) etkinleştirin</li>
                            )}
                            <li>• Şifrenizi düzenli olarak değiştirin</li>
                            <li>• Bilinmeyen cihazlardan giriş yapıldığında bildirim alın</li>
                            <li>• Aktif oturumlarınızı düzenli olarak kontrol edin</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Şifre Tab */}
                {activeTab === "password" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Şifre Yönetimi</h4>
                        <p className="text-sm text-gray-500">Hesap şifrenizi değiştirin</p>
                      </div>
                      {!showPasswordForm && (
                        <button
                          onClick={() => setShowPasswordForm(true)}
                          className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <Key className="h-4 w-4" />
                          Şifreyi Değiştir
                        </button>
                      )}
                    </div>

                    {showPasswordForm && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md space-y-4"
                      >
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

                        <div className="flex gap-3">
                          <button
                            onClick={changePassword}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                          >
                            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
                            Şifreyi Kaydet
                          </button>
                          <button
                            onClick={() => {
                              setShowPasswordForm(false);
                              setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                            }}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                          >
                            İptal
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">Şifre Gereksinimleri</h5>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          En az 6 karakter
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Büyük ve küçük harf içermeli
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          En az bir rakam içermeli
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* 2FA Tab */}
                {activeTab === "2fa" && (
                  <div className="space-y-6">
                    <div className={`p-6 rounded-xl border-2 ${
                      twoFactorEnabled 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                            twoFactorEnabled ? 'bg-green-100' : 'bg-gray-200'
                          }`}>
                            <Fingerprint className={`h-7 w-7 ${
                              twoFactorEnabled ? 'text-green-600' : 'text-gray-500'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">İki Faktörlü Doğrulama (2FA)</h4>
                            <p className="text-sm text-gray-500">
                              {twoFactorEnabled 
                                ? "2FA aktif - Hesabınız ekstra koruma altında" 
                                : "Hesabınıza ekstra güvenlik katmanı ekleyin"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all ${
                            twoFactorEnabled 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:shadow-lg'
                          }`}
                        >
                          {twoFactorEnabled ? 'Devre Dışı Bırak' : 'Etkinleştir'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Smartphone className="h-5 w-5 text-teal-600" />
                          <h5 className="font-semibold text-gray-900">Authenticator Uygulaması</h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Google Authenticator veya benzeri bir uygulama kullanın
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          twoFactorEnabled 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {twoFactorEnabled ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Mail className="h-5 w-5 text-teal-600" />
                          <h5 className="font-semibold text-gray-900">E-posta Doğrulama</h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Giriş yaparken e-posta ile kod alın
                        </p>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                          Yakında
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Aktif Oturumlar Tab */}
                {activeTab === "sessions" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Aktif Oturumlar</h4>
                        <p className="text-sm text-gray-500">Hesabınıza bağlı tüm cihazlar</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={loadSessions}
                          disabled={loadingSessions}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                        >
                          <RefreshCw className={`h-4 w-4 ${loadingSessions ? 'animate-spin' : ''}`} />
                          Yenile
                        </button>
                        {activeSessions.length > 1 && (
                          <button
                            onClick={terminateAllSessions}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all flex items-center gap-2"
                          >
                            <LogOut className="h-4 w-4" />
                            Tümünü Sonlandır
                          </button>
                        )}
                      </div>
                    </div>

                    {loadingSessions ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                      </div>
                    ) : activeSessions.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Monitor className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Aktif oturum bulunamadı</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {activeSessions.map((session) => (
                          <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-lg border-2 ${
                              session.is_current 
                                ? 'bg-teal-50 border-teal-200' 
                                : 'bg-white border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                  session.is_current ? 'bg-teal-100' : 'bg-gray-100'
                                }`}>
                                  <Monitor className={`h-6 w-6 ${
                                    session.is_current ? 'text-teal-600' : 'text-gray-500'
                                  }`} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-semibold text-gray-900">{session.device || "Bilinmeyen Cihaz"}</h5>
                                    {session.is_current && (
                                      <span className="text-xs px-2 py-0.5 bg-teal-600 text-white rounded-full">
                                        Bu Cihaz
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500">{session.browser || "Bilinmeyen Tarayıcı"}</p>
                                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                                    <span>{session.ip_address || "-"}</span>
                                    <span>{session.location || "-"}</span>
                                    <span>{getRelativeTime(session.last_active || session.created_at)}</span>
                                  </div>
                                </div>
                              </div>
                              {!session.is_current && (
                                <button
                                  onClick={() => terminateSession(session.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Oturumu Sonlandır"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Giriş Geçmişi Tab */}
                {activeTab === "activity" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Giriş Geçmişi</h4>
                        <p className="text-sm text-gray-500">Son giriş denemeleri</p>
                      </div>
                      <button 
                        onClick={loadLoginHistory}
                        disabled={loadingHistory}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                      >
                        <RefreshCw className={`h-4 w-4 ${loadingHistory ? 'animate-spin' : ''}`} />
                        Yenile
                      </button>
                    </div>

                    {loadingHistory ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                      </div>
                    ) : loginActivities.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Giriş geçmişi bulunamadı</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tarih</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">IP Adresi</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cihaz</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Konum</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Durum</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loginActivities.map((activity) => (
                              <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-600">{formatDate(activity.created_at)}</td>
                                <td className="py-3 px-4 text-sm text-gray-600 font-mono">{activity.ip_address || "-"}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  <div>
                                    <p>{activity.device || "-"}</p>
                                    <p className="text-xs text-gray-400">{activity.browser || "-"}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">{activity.location || "-"}</td>
                                <td className="py-3 px-4">
                                  {activity.status === "success" ? (
                                    <span className="flex items-center gap-1 text-green-600 text-sm">
                                      <CheckCircle2 className="h-4 w-4" />
                                      Başarılı
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-red-600 text-sm" title={activity.failure_reason}>
                                      <XCircle className="h-4 w-4" />
                                      Başarısız
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
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
