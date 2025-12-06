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
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "vipkisba_vip",
    password: process.env.DB_PASSWORD || "Ciko5744**",
    database: process.env.DB_NAME || "vipkisba_bahce",
    connectTimeout: 5000,
  });
}

// Proje sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    
    const connection = await getConnection();
    
    try {
      await connection.query(
        "UPDATE projects SET is_active = 0 WHERE id = ?",
        [id]
      );
      
      await connection.end();
      
      return NextResponse.json({
        success: true,
        message: "Proje başarıyla silindi",
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}

// Proje güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { image_url } = body;

    if (!image_url) {
      return NextResponse.json(
        { success: false, message: "Resim URL'si gereklidir" },
        { status: 400 }
      );
    }

    const connection = await getConnection();
    
    try {
      await connection.query(
        "UPDATE projects SET image_url = ? WHERE id = ?",
        [image_url, id]
      );
      
      await connection.end();
      
      return NextResponse.json({
        success: true,
        message: "Proje başarıyla güncellendi",
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Update project error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}
