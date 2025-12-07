"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  LogOut, 
  Shield, 
  Home, 
  LayoutDashboard, 
  Image as ImageIcon, 
  Mail, 
  Settings, 
  FileText, 
  Menu, 
  X,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MessageSquare,
  FolderOpen,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  Target,
  FileDown
} from "lucide-react";

interface Stats {
  totalProjects: number;
  totalMessages: number;
  newMessages: number;
  repliedMessages: number;
  archivedMessages: number;
  totalBlogPosts: number;
}

interface MonthlyData {
  month: string;
  messages: number;
  projects: number;
}

export default function AdminReports() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalMessages: 0,
    newMessages: 0,
    repliedMessages: 0,
    archivedMessages: 0,
    totalBlogPosts: 0,
  });
  const [dateRange, setDateRange] = useState("thisMonth");

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

  // Simüle edilmiş aylık veriler
  const monthlyData: MonthlyData[] = [
    { month: "Ocak", messages: 12, projects: 3 },
    { month: "Şubat", messages: 18, projects: 5 },
    { month: "Mart", messages: 24, projects: 4 },
    { month: "Nisan", messages: 15, projects: 6 },
    { month: "Mayıs", messages: 32, projects: 8 },
    { month: "Haziran", messages: 28, projects: 7 },
    { month: "Temmuz", messages: 35, projects: 9 },
    { month: "Ağustos", messages: 42, projects: 11 },
    { month: "Eylül", messages: 38, projects: 10 },
    { month: "Ekim", messages: 45, projects: 12 },
    { month: "Kasım", messages: 52, projects: 14 },
    { month: "Aralık", messages: 48, projects: 13 },
  ];

  useEffect(() => {
    checkAuth();
    loadStats();
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

  const loadStats = async () => {
    try {
      // Projeleri yükle
      const projectsRes = await fetch("/api/admin/projects");
      const projectsData = await projectsRes.json();
      
      // Mesajları yükle
      const messagesRes = await fetch("/api/admin/messages");
      const messagesData = await messagesRes.json();
      
      // Blog yazılarını yükle
      const blogRes = await fetch("/api/admin/blog");
      const blogData = await blogRes.json();

      const messages = messagesData.messages || [];
      
      setStats({
        totalProjects: projectsData.projects?.length || 0,
        totalMessages: messages.length,
        newMessages: messages.filter((m: any) => m.status === "new").length,
        repliedMessages: messages.filter((m: any) => m.status === "replied").length,
        archivedMessages: messages.filter((m: any) => m.status === "archived").length,
        totalBlogPosts: blogData.posts?.length || 0,
      });
    } catch (error) {
      console.error("Load stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMaxValue = (data: MonthlyData[], key: "messages" | "projects") => {
    return Math.max(...data.map(d => d[key]));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Toplam Proje",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+12%",
      positive: true,
    },
    {
      title: "Toplam Mesaj",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+8%",
      positive: true,
    },
    {
      title: "Yeni Mesaj",
      value: stats.newMessages,
      icon: Mail,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+23%",
      positive: true,
    },
    {
      title: "Blog Yazısı",
      value: stats.totalBlogPosts,
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+5%",
      positive: true,
    },
  ];

  const messageBreakdown = [
    { label: "Yeni", value: stats.newMessages, color: "bg-blue-500" },
    { label: "Yanıtlandı", value: stats.repliedMessages, color: "bg-green-500" },
    { label: "Arşivlendi", value: stats.archivedMessages, color: "bg-gray-400" },
  ];

  const totalMessageBreakdown = messageBreakdown.reduce((sum, item) => sum + item.value, 0);

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
                  <p className="text-xs text-gray-500">Raporlar ve Analitik</p>
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
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Raporlar ve Analitik</h2>
                <p className="text-gray-600 mt-1">Site performansı ve istatistikler</p>
              </div>
              <div className="flex gap-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="today">Bugün</option>
                  <option value="thisWeek">Bu Hafta</option>
                  <option value="thisMonth">Bu Ay</option>
                  <option value="thisYear">Bu Yıl</option>
                  <option value="allTime">Tüm Zamanlar</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Messages Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Aylık Mesaj Trendi</h3>
                    <p className="text-sm text-gray-500">Son 12 ay</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-teal-600" />
                  </div>
                </div>
                <div className="h-64 flex items-end gap-2">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg transition-all hover:from-teal-600 hover:to-teal-500"
                        style={{ height: `${(data.messages / getMaxValue(monthlyData, "messages")) * 100}%` }}
                        title={`${data.messages} mesaj`}
                      />
                      <span className="text-xs text-gray-500 truncate w-full text-center">{data.month.substring(0, 3)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Message Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Mesaj Durumu Dağılımı</h3>
                    <p className="text-sm text-gray-500">Toplam {stats.totalMessages} mesaj</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-teal-600" />
                  </div>
                </div>
                
                {/* Donut Chart Simulation */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {messageBreakdown.reduce((acc, item, index) => {
                        const percentage = totalMessageBreakdown > 0 ? (item.value / totalMessageBreakdown) * 100 : 0;
                        const prevPercentage = acc.offset;
                        const strokeDasharray = `${percentage} ${100 - percentage}`;
                        const colors = ["#3B82F6", "#22C55E", "#9CA3AF"];
                        
                        acc.elements.push(
                          <circle
                            key={item.label}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={colors[index]}
                            strokeWidth="20"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={-prevPercentage}
                            className="transition-all duration-500"
                          />
                        );
                        acc.offset += percentage;
                        return acc;
                      }, { elements: [] as React.ReactElement[], offset: 0 }).elements}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-gray-900">{stats.totalMessages}</span>
                        <p className="text-xs text-gray-500">Toplam</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  {messageBreakdown.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                        <span className="text-xs text-gray-500">
                          ({totalMessageBreakdown > 0 ? Math.round((item.value / totalMessageBreakdown) * 100) : 0}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Projects Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Aylık Proje Ekleme Trendi</h3>
                  <p className="text-sm text-gray-500">Son 12 ay</p>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-teal-600" />
                </div>
              </div>
              <div className="h-48 flex items-end gap-3">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full flex justify-center">
                      <div 
                        className="w-full max-w-[40px] bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all hover:from-purple-600 hover:to-purple-500"
                        style={{ height: `${(data.projects / getMaxValue(monthlyData, "projects")) * 150}px` }}
                        title={`${data.projects} proje`}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{data.month.substring(0, 3)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl shadow-lg p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8" />
                  <h3 className="text-lg font-semibold">En Yoğun Ay</h3>
                </div>
                <p className="text-3xl font-bold mb-2">Kasım</p>
                <p className="text-teal-100 text-sm">52 mesaj ile en yoğun ay</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8" />
                  <h3 className="text-lg font-semibold">Yanıt Oranı</h3>
                </div>
                <p className="text-3xl font-bold mb-2">
                  {stats.totalMessages > 0 ? Math.round((stats.repliedMessages / stats.totalMessages) * 100) : 0}%
                </p>
                <p className="text-blue-100 text-sm">Mesajların yanıtlanma oranı</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="h-8 w-8" />
                  <h3 className="text-lg font-semibold">Aktif İçerik</h3>
                </div>
                <p className="text-3xl font-bold mb-2">{stats.totalProjects + stats.totalBlogPosts}</p>
                <p className="text-purple-100 text-sm">Toplam proje ve blog yazısı</p>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

