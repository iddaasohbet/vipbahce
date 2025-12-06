import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql, { Connection } from "mysql2/promise";

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

// Blog yazısı güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let connection: Connection | null = null;
  
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, content, image_url, category, author, is_published, is_featured } = body;

    if (!title || !excerpt || !image_url) {
      return NextResponse.json(
        { success: false, message: "Başlık, özet ve resim URL'si gereklidir" },
        { status: 400 }
      );
    }

    // Veritabanı bağlantısı
    const dbConfig = {
      host: process.env.DB_HOST || "5.39.8.160",
      user: process.env.DB_USER || "vipkisba_vip",
      password: process.env.DB_PASSWORD || "Ciko5744**",
      database: process.env.DB_NAME || "vipkisba_bahce",
      connectTimeout: 10000,
      port: 3306,
    };

    try {
      connection = await mysql.createConnection(dbConfig);
    } catch (dbError: any) {
      return NextResponse.json(
        { success: false, message: "Veritabanı bağlantı hatası" },
        { status: 500 }
      );
    }

    await connection.query(
      "UPDATE blog_posts SET title = ?, excerpt = ?, content = ?, image_url = ?, category = ?, author = ?, is_published = ?, is_featured = ? WHERE id = ?",
      [
        title,
        excerpt,
        content || null,
        image_url,
        category || null,
        author || null,
        is_published !== undefined ? is_published : 1,
        is_featured !== undefined ? is_featured : 0,
        id,
      ]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: "Blog yazısı başarıyla güncellendi",
    });
  } catch (error: any) {
    console.error("Update blog post error:", error);
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Blog yazısı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let connection: Connection | null = null;
  
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Veritabanı bağlantısı
    const dbConfig = {
      host: process.env.DB_HOST || "5.39.8.160",
      user: process.env.DB_USER || "vipkisba_vip",
      password: process.env.DB_PASSWORD || "Ciko5744**",
      database: process.env.DB_NAME || "vipkisba_bahce",
      connectTimeout: 10000,
      port: 3306,
    };

    try {
      connection = await mysql.createConnection(dbConfig);
    } catch (dbError: any) {
      return NextResponse.json(
        { success: false, message: "Veritabanı bağlantı hatası" },
        { status: 500 }
      );
    }

    await connection.query(
      "DELETE FROM blog_posts WHERE id = ?",
      [id]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: "Blog yazısı başarıyla silindi",
    });
  } catch (error: any) {
    console.error("Delete blog post error:", error);
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

