"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, LogOut, Shield, Home, LayoutDashboard, Image as ImageIcon, Settings, FileText, BarChart3, Menu, X, CheckCircle2, Clock, Archive, Trash2, Eye, EyeOff } from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  subject: string | null;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
}

export default function AdminMessages() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

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
    loadMessages();
  }, [filterStatus]);

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

  const loadMessages = async () => {
    try {
      const url = filterStatus === "all" 
        ? "/api/admin/messages" 
        : `/api/admin/messages?status=${filterStatus}`;
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Load messages error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: number, status: string) => {
    try {
      const response = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();
      if (data.success) {
        loadMessages();
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status: status as any });
        }
      }
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  const handleDelete = async (id: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        loadMessages();
      } else {
        alert(data.message || "Mesaj silinirken bir hata oluştu");
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      alert("Mesaj silinirken bir hata oluştu: " + error.message);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "read":
        return <Eye className="h-4 w-4 text-gray-500" />;
      case "replied":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "archived":
        return <Archive className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "read":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "replied":
        return "bg-green-100 text-green-700 border-green-200";
      case "archived":
        return "bg-gray-50 text-gray-500 border-gray-100";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredMessages = messages;
  const newMessagesCount = messages.filter(m => m.status === "new").length;

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
                  <p className="text-xs text-gray-500">İletişim Mesajları</p>
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
                  {item.label === "İletişim Mesajları" && newMessagesCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {newMessagesCount}
                    </span>
                  )}
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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">İletişim Mesajları</h2>
                <p className="text-gray-600 mt-1">Toplam {messages.length} mesaj</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {[
                { id: "all", label: "Tümü", count: messages.length },
                { id: "new", label: "Yeni", count: messages.filter(m => m.status === "new").length },
                { id: "read", label: "Okundu", count: messages.filter(m => m.status === "read").length },
                { id: "replied", label: "Yanıtlandı", count: messages.filter(m => m.status === "replied").length },
                { id: "archived", label: "Arşiv", count: messages.filter(m => m.status === "archived").length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    filterStatus === tab.id
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      filterStatus === tab.id ? "bg-white/20" : "bg-gray-100"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Messages List */}
            {filteredMessages.length === 0 ? (
              <div className="text-center py-16">
                <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz mesaj yok</h3>
                <p className="text-gray-600">Gelen mesajlar burada görünecek</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                            {getStatusIcon(message.status)}
                            <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(message.status)}`}>
                              {message.status === "new" ? "Yeni" : 
                               message.status === "read" ? "Okundu" :
                               message.status === "replied" ? "Yanıtlandı" : "Arşiv"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {message.subject || "Teklif Talebi"}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            {message.phone && <span>📞 {message.phone}</span>}
                            {message.email && <span>✉️ {message.email}</span>}
                            <span>🕒 {new Date(message.created_at).toLocaleDateString("tr-TR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}</span>
                          </div>
                          {message.message && (
                            <p className="text-sm text-gray-700 mt-2 line-clamp-2">{message.message}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          {message.status === "new" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateMessageStatus(message.id, "read");
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Okundu olarak işaretle"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                          {message.status !== "replied" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateMessageStatus(message.id, "replied");
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Yanıtlandı olarak işaretle"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                          )}
                          {message.status !== "archived" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateMessageStatus(message.id, "archived");
                              }}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              title="Arşivle"
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={(e) => handleDelete(message.id, e)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Mesajı Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedMessage(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Mesaj Detayı</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Ad Soyad</label>
                <p className="text-gray-900">{selectedMessage.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Telefon</label>
                  <p className="text-gray-900">{selectedMessage.phone || "Belirtilmemiş"}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">E-posta</label>
                  <p className="text-gray-900">{selectedMessage.email || "Belirtilmemiş"}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Konu</label>
                <p className="text-gray-900">{selectedMessage.subject || "Teklif Talebi"}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Mesaj</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Tarih</label>
                <p className="text-gray-900">
                  {new Date(selectedMessage.created_at).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <div className="flex-1 flex gap-2">
                  {selectedMessage.status === "new" && (
                    <button
                      onClick={() => {
                        updateMessageStatus(selectedMessage.id, "read");
                        setSelectedMessage({ ...selectedMessage, status: "read" });
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Okundu Olarak İşaretle
                    </button>
                  )}
                  {selectedMessage.status !== "replied" && (
                    <button
                      onClick={() => {
                        updateMessageStatus(selectedMessage.id, "replied");
                        setSelectedMessage({ ...selectedMessage, status: "replied" });
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Yanıtlandı Olarak İşaretle
                    </button>
                  )}
                  {selectedMessage.status !== "archived" && (
                    <button
                      onClick={() => {
                        updateMessageStatus(selectedMessage.id, "archived");
                        setSelectedMessage({ ...selectedMessage, status: "archived" });
                      }}
                      className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Arşivle
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleDelete(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Sil
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

