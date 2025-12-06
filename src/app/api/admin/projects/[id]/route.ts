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

// Proje sil
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
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "vipkisba_vip",
        password: process.env.DB_PASSWORD || "Ciko5744**",
        database: process.env.DB_NAME || "vipkisba_bahce",
        connectTimeout: 5000,
      });
    } catch (dbError: any) {
      return NextResponse.json(
        { success: false, message: "Veritabanı bağlantı hatası" },
        { status: 500 }
      );
    }

    await connection.query(
      "UPDATE projects SET is_active = 0 WHERE id = ?",
      [id]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla silindi",
    });
  } catch (error: any) {
    console.error("Delete project error:", error);
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

// Proje güncelle
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
    const { image_url } = body;

    if (!image_url) {
      return NextResponse.json(
        { success: false, message: "Resim URL'si gereklidir" },
        { status: 400 }
      );
    }

    // Veritabanı bağlantısı
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "vipkisba_vip",
        password: process.env.DB_PASSWORD || "Ciko5744**",
        database: process.env.DB_NAME || "vipkisba_bahce",
        connectTimeout: 5000,
      });
    } catch (dbError: any) {
      return NextResponse.json(
        { success: false, message: "Veritabanı bağlantı hatası" },
        { status: 500 }
      );
    }

    // Sadece resim URL'sini güncelle, diğer alanları koru
    await connection.query(
      "UPDATE projects SET image_url = ? WHERE id = ?",
      [image_url, id]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: "Proje başarıyla güncellendi",
    });
  } catch (error: any) {
    console.error("Update project error:", error);
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

