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

// Tüm mesajları getir
export async function GET(request: NextRequest) {
  let connection;
  
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";

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
      return NextResponse.json({
        success: true,
        messages: [],
        message: "Veritabanı bağlantı hatası",
      });
    }

    let query = "SELECT * FROM contact_messages";
    let params: any[] = [];

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
  } catch (error: any) {
    console.error("Get messages error:", error);
    if (connection) {
      try {
        await connection.end();
      } catch {}
    }
    return NextResponse.json({
      success: true,
      messages: [],
    });
  }
}

// Mesaj durumunu güncelle
export async function PUT(request: NextRequest) {
  let connection;
  
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "ID ve durum gereklidir" },
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
      "UPDATE contact_messages SET status = ? WHERE id = ?",
      [status, id]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: "Mesaj durumu güncellendi",
    });
  } catch (error: any) {
    console.error("Update message error:", error);
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

