import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";

// Admin kontrolü
async function checkAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (!session) {
    return null;
  }
  
  try {
    const admin = JSON.parse(session.value);
    return admin;
  } catch {
    return null;
  }
}

// Veritabanı bağlantısı oluştur
async function getConnection() {
  const dbConfig = {
    host: process.env.DB_HOST || "5.39.8.160",
    user: process.env.DB_USER || "vipkisba_vip",
    password: process.env.DB_PASSWORD || "Ciko5744**",
    database: process.env.DB_NAME || "vipkisba_bahce",
    connectTimeout: 10000,
    port: 3306,
  };
  return mysql.createConnection(dbConfig);
}

// Tüm blog yazılarını getir
export async function GET() {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const connection = await getConnection();
    
    try {
      const [rows] = await connection.query(
        "SELECT * FROM blog_posts ORDER BY created_at DESC"
      );
      
      await connection.end();
      
      return NextResponse.json({
        success: true,
        posts: Array.isArray(rows) ? rows : [],
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Get blog posts error:", error);
    return NextResponse.json({
      success: true,
      posts: [],
      message: "Veritabanı hatası",
    });
  }
}

// Yeni blog yazısı ekle
export async function POST(request: NextRequest) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, image_url, category, author, is_published, is_featured } = body;

    if (!title || !excerpt || !image_url) {
      return NextResponse.json(
        { success: false, message: "Başlık, özet ve resim URL'si gereklidir" },
        { status: 400 }
      );
    }

    const connection = await getConnection();
    
    try {
      await connection.query(
        "INSERT INTO blog_posts (title, excerpt, content, image_url, category, author, is_published, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          title,
          excerpt,
          content || null,
          image_url,
          category || null,
          author || null,
          is_published !== undefined ? is_published : 1,
          is_featured !== undefined ? is_featured : 0,
        ]
      );
      
      await connection.end();
      
      return NextResponse.json({
        success: true,
        message: "Blog yazısı başarıyla eklendi",
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Add blog post error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}
