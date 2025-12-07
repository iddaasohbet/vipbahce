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
  Plus,
  Trash2,
  Download,
  FileDown,
  User,
  Calendar,
  Hash,
  DollarSign,
  StickyNote,
  Loader2,
  Building2,
  Phone,
  Globe
} from "lucide-react";
import jsPDF from "jspdf";

interface TeklifItem {
  id: number;
  baslik: string;
  miktar: string;
  fiyat: string;
}

export default function AdminTeklif() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Form state
  const [musteriIsmi, setMusteriIsmi] = useState("");
  const [items, setItems] = useState<TeklifItem[]>([
    { id: 1, baslik: "", miktar: "", fiyat: "" }
  ]);
  const [not, setNot] = useState("");
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);

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

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: newId, baslik: "", miktar: "", fiyat: "" }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof TeklifItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/[^\d.-]/g, ''));
    if (isNaN(num)) return "";
    return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const fiyat = parseFloat(item.fiyat.replace(/[^\d.-]/g, '')) || 0;
      return total + fiyat;
    }, 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: { file: File; preview: string }[] = [];
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        newImages.push({ file, preview });
      }
    });

    setImages([...images, ...newImages]);
    e.target.value = ''; // Reset input
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const generatePDF = async () => {
    if (!musteriIsmi.trim()) {
      alert("Lütfen müşteri ismini girin");
      return;
    }

    setGenerating(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = 20;

      // Header - Logo alanı (yeşil bar)
      doc.setFillColor(13, 76, 74); // Teal rengi
      doc.rect(0, 0, pageWidth, 30, 'F');

      // Logo kutusu (küçük beyaz çerçeveli kare)
      const logoX = margin;
      const logoY = 8;
      const logoSize = 14;
      
      // Beyaz çerçeve
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(1);
      doc.roundedRect(logoX, logoY, logoSize, logoSize, 1.5, 1.5, 'S');
      
      // Ev ikonu - çatı (ufak)
      doc.setLineWidth(0.8);
      doc.line(logoX + 3, logoY + 7, logoX + 7, logoY + 4);
      doc.line(logoX + 7, logoY + 4, logoX + 11, logoY + 7);
      
      // Ev gövdesi
      doc.line(logoX + 3.5, logoY + 7, logoX + 3.5, logoY + 11);
      doc.line(logoX + 3.5, logoY + 11, logoX + 10.5, logoY + 11);
      doc.line(logoX + 10.5, logoY + 11, logoX + 10.5, logoY + 7);
      
      // Cam çizgileri
      doc.setLineWidth(0.4);
      doc.line(logoX + 5.5, logoY + 7, logoX + 5.5, logoY + 11);
      doc.line(logoX + 8.5, logoY + 7, logoX + 8.5, logoY + 11);
      doc.line(logoX + 3.5, logoY + 9, logoX + 10.5, logoY + 9);

      // Site adresi (logo yanında)
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("vipkisbahcesi.com", logoX + logoSize + 5, 17);
      
      // İletişim bilgileri (sağ tarafta)
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("support@vipkisbahcesi.com | +90 533 359 34 66", pageWidth - margin, 17, { align: 'right' });

      // Teklif No (header altında)
      const tarih = new Date();
      const teklifNo = `TKL-${tarih.getFullYear()}${String(tarih.getMonth() + 1).padStart(2, '0')}${String(tarih.getDate()).padStart(2, '0')}-${String(tarih.getHours()).padStart(2, '0')}${String(tarih.getMinutes()).padStart(2, '0')}`;
      
      yPos = 40;

      // TEKLİF başlığı ve Teklif No
      doc.setTextColor(13, 76, 74);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("TEKLIF", margin, yPos);
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`Teklif No: ${teklifNo}`, pageWidth - margin, yPos, { align: 'right' });

      yPos += 12;

      // Müşteri ve Tarih bilgileri
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 3, 3, 'F');

      doc.setTextColor(100, 100, 100);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Musteri:", margin + 5, yPos + 10);
      doc.text("Tarih:", pageWidth - margin - 50, yPos + 10);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(musteriIsmi, margin + 5, yPos + 18);
      
      const tarihStr = `${String(tarih.getDate()).padStart(2, '0')}.${String(tarih.getMonth() + 1).padStart(2, '0')}.${tarih.getFullYear()}`;
      doc.text(tarihStr, pageWidth - margin - 50, yPos + 18);

      yPos += 35;

      // Tablo başlıkları
      const col1X = margin;
      const col2X = pageWidth - margin - 70;
      const col3X = pageWidth - margin - 35;
      const colWidth1 = col2X - col1X - 5;
      const colWidth2 = 30;
      const colWidth3 = 35;

      doc.setFillColor(13, 76, 74);
      doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Hizmet / Urun", col1X + 3, yPos + 7);
      doc.text("Miktar", col2X + 3, yPos + 7);
      doc.text("Fiyat", col3X + 3, yPos + 7);

      yPos += 10;

      // Tablo satırları
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      
      items.forEach((item, index) => {
        const rowHeight = 10;
        
        // Alternatif satır rengi
        if (index % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(margin, yPos, pageWidth - 2 * margin, rowHeight, 'F');
        }

        // Satır çizgisi
        doc.setDrawColor(230, 230, 230);
        doc.line(margin, yPos + rowHeight, pageWidth - margin, yPos + rowHeight);

        doc.setFontSize(10);
        doc.text(item.baslik || "-", col1X + 3, yPos + 7);
        doc.text(item.miktar || "-", col2X + 3, yPos + 7);
        
        const fiyatText = item.fiyat ? `${formatCurrency(item.fiyat)} TL` : "-";
        doc.text(fiyatText, col3X + 3, yPos + 7);

        yPos += rowHeight;
      });

      // Toplam satırı
      yPos += 5;
      doc.setFillColor(13, 76, 74);
      doc.rect(col2X - 20, yPos, pageWidth - margin - col2X + 20, 12, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("TOPLAM:", col2X - 15, yPos + 8);
      doc.text(`${formatCurrency(calculateTotal().toString())} TL`, col3X + 3, yPos + 8);

      yPos += 25;

      // Not alanı
      if (not.trim()) {
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("NOT:", margin, yPos);
        
        yPos += 7;
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        
        // Not metnini satırlara böl
        const notLines = doc.splitTextToSize(not, pageWidth - 2 * margin);
        doc.text(notLines, margin, yPos);
        yPos += notLines.length * 5 + 10;
      }

      // Resimler
      if (images.length > 0) {
        // Yeni sayfaya geç gerekirse
        if (yPos > doc.internal.pageSize.getHeight() - 100) {
          doc.addPage();
          yPos = 20;
        }

        doc.setTextColor(100, 100, 100);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("EKLER:", margin, yPos);
        yPos += 10;

        const imgWidth = 80; // Resim genişliği
        const imgHeight = 60; // Resim yüksekliği
        const imagesPerRow = 2;
        const imgGap = 10;
        
        for (let i = 0; i < images.length; i++) {
          const row = Math.floor(i / imagesPerRow);
          const col = i % imagesPerRow;
          
          // Yeni sayfa gerekiyorsa
          if (yPos + imgHeight > doc.internal.pageSize.getHeight() - 30) {
            doc.addPage();
            yPos = 20;
          }

          const imgX = margin + col * (imgWidth + imgGap);
          const imgY = yPos;

          try {
            const base64 = await imageToBase64(images[i].file);
            doc.addImage(base64, 'JPEG', imgX, imgY, imgWidth, imgHeight);
          } catch (err) {
            console.error('Resim eklenemedi:', err);
          }

          // Her satırda son resimden sonra y pozisyonunu güncelle
          if (col === imagesPerRow - 1 || i === images.length - 1) {
            yPos += imgHeight + imgGap;
          }
        }
      }

      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 25;
      
      doc.setDrawColor(13, 76, 74);
      doc.setLineWidth(0.5);
      doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Bu teklif 7 gun gecerlidir. Fiyatlara KDV dahil degildir.", margin, footerY);
      doc.text("www.vipkisbahcesi.com | support@vipkisbahcesi.com | +90 533 359 34 66", pageWidth / 2, footerY + 5, { align: 'center' });

      // PDF'i kaydet
      const fileName = `teklif-${tarihStr.replace(/\./g, '-')}-${String(tarih.getHours()).padStart(2, '0')}${String(tarih.getMinutes()).padStart(2, '0')}${String(tarih.getSeconds()).padStart(2, '0')}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error("PDF oluşturma hatası:", error);
      alert("PDF oluşturulurken bir hata oluştu");
    } finally {
      setGenerating(false);
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
                  <FileDown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-xs text-gray-500">Teklif Oluştur</p>
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
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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
          <div className="p-6 lg:p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Teklif Oluştur</h2>
              <p className="text-gray-600 mt-1">Müşterileriniz için profesyonel teklif belgesi oluşturun</p>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Firma Bilgileri Preview */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-900 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">VIP Kış Bahçesi</h3>
                    <p className="text-teal-200 text-sm mt-1">www.vipkisbahcesi.com</p>
                    <p className="text-teal-200 text-sm">info@vipkisbahcesi.com | +90 533 359 34 66</p>
                  </div>
                  <div className="text-right">
                    <p className="text-teal-200 text-sm">Tarih</p>
                    <p className="font-semibold">
                      {new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Müşteri İsmi */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    Müşteri İsmi
                  </label>
                  <input
                    type="text"
                    value={musteriIsmi}
                    onChange={(e) => setMusteriIsmi(e.target.value)}
                    placeholder="Müşteri adı soyadı veya firma ismi"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                  />
                </div>

                {/* Hizmetler/Ürünler Tablosu */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FileText className="h-4 w-4" />
                      Hizmetler / Ürünler
                    </label>
                    <button
                      onClick={addItem}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      Yeni Ekle
                    </button>
                  </div>

                  {/* Tablo Başlıkları */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 mb-2 px-4">
                    <div className="col-span-6 text-sm font-semibold text-gray-600">Başlık</div>
                    <div className="col-span-2 text-sm font-semibold text-gray-600">Miktar</div>
                    <div className="col-span-3 text-sm font-semibold text-gray-600">Fiyat (TL)</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Tablo Satırları */}
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="md:col-span-6">
                          <label className="md:hidden text-xs font-medium text-gray-500 mb-1 block">Başlık</label>
                          <input
                            type="text"
                            value={item.baslik}
                            onChange={(e) => updateItem(item.id, 'baslik', e.target.value)}
                            placeholder="Hizmet veya ürün adı"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-teal-600 focus:ring-1 focus:ring-teal-100 outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="md:hidden text-xs font-medium text-gray-500 mb-1 block">Miktar</label>
                          <input
                            type="text"
                            value={item.miktar}
                            onChange={(e) => updateItem(item.id, 'miktar', e.target.value)}
                            placeholder="Adet"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-teal-600 focus:ring-1 focus:ring-teal-100 outline-none"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="md:hidden text-xs font-medium text-gray-500 mb-1 block">Fiyat (TL)</label>
                          <input
                            type="text"
                            value={item.fiyat}
                            onChange={(e) => updateItem(item.id, 'fiyat', e.target.value)}
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-teal-600 focus:ring-1 focus:ring-teal-100 outline-none"
                          />
                        </div>
                        <div className="md:col-span-1 flex items-end md:items-center justify-end">
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                            className={`p-2 rounded-lg transition-colors ${
                              items.length === 1 
                                ? 'text-gray-300 cursor-not-allowed' 
                                : 'text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Toplam */}
                  <div className="flex justify-end mt-4">
                    <div className="bg-teal-50 border border-teal-200 rounded-lg px-6 py-3">
                      <span className="text-sm text-teal-700 font-medium">Toplam: </span>
                      <span className="text-xl font-bold text-teal-800">
                        {formatCurrency(calculateTotal().toString())} TL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Not Alanı */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <StickyNote className="h-4 w-4" />
                    Not (Opsiyonel)
                  </label>
                  <textarea
                    value={not}
                    onChange={(e) => setNot(e.target.value)}
                    placeholder="Teklif ile ilgili notlarınız..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none resize-none transition-all"
                  />
                </div>

                {/* Resim Ekleme Alanı */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <ImageIcon className="h-4 w-4" />
                    Resimler (Opsiyonel)
                  </label>
                  
                  {/* Resim Yükleme */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <ImageIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        <span className="text-teal-600 font-medium">Resim seçin</span> veya sürükleyip bırakın
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (Maks. 5MB)</p>
                    </label>
                  </div>

                  {/* Seçilen Resimler */}
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img.preview}
                            alt={`Resim ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PDF Oluştur Butonu */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={generatePDF}
                    disabled={generating}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-semibold text-lg"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        PDF Oluşturuluyor...
                      </>
                    ) : (
                      <>
                        <Download className="h-6 w-6" />
                        PDF Oluştur ve İndir
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Bilgi Notu */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Not:</strong> Oluşturulan PDF belgesi otomatik olarak indirilecektir. Tarih ve teklif numarası otomatik olarak eklenir.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

