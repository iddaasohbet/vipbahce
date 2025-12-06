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
    host: process.env.DB_HOST || "5.39.8.160",
    user: process.env.DB_USER || "vipkisba_vip",
    password: process.env.DB_PASSWORD || "Ciko5744**",
    database: process.env.DB_NAME || "vipkisba_bahce",
    connectTimeout: 10000,
    port: 3306,
  });
}

// Tüm mesajları getir
export async function GET(request: NextRequest) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";

    const connection = await getConnection();
    
    try {
      let query = "SELECT * FROM contact_messages";
      const params: string[] = [];

      if (status !== "all") {
        query += " WHERE status = ?";
        params.push(status);
      }

      query += " ORDER BY created_at DESC";

      const [rows] = await connection.query(query, params);
      await connection.end();

      return NextResponse.json({
        success: true,
        messages: Array.isArray(rows) ? rows : [],
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Get messages error:", error);
    return NextResponse.json({
      success: true,
      messages: [],
    });
  }
}

// Mesaj durumunu güncelle
export async function PUT(request: NextRequest) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Yetkisiz erişim" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID ve durum gereklidir" },
        { status: 400 }
      );
    }

    const connection = await getConnection();
    
    try {
      await connection.query(
        "UPDATE contact_messages SET status = ? WHERE id = ?",
        [status, id]
      );
      await connection.end();

      return NextResponse.json({
        success: true,
        message: "Mesaj durumu güncellendi",
      });
    } catch (queryError) {
      await connection.end();
      throw queryError;
    }
  } catch (error: any) {
    console.error("Update message error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}
