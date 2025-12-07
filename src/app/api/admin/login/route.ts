import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import mysql from "mysql2/promise";
import crypto from "crypto";

// User-Agent'dan cihaz ve tarayıcı bilgisi çıkar
function parseUserAgent(userAgent: string) {
  let device = "Bilinmeyen Cihaz";
  let browser = "Bilinmeyen Tarayıcı";

  // Cihaz tespiti
  if (userAgent.includes("iPhone")) {
    device = "iPhone";
  } else if (userAgent.includes("iPad")) {
    device = "iPad";
  } else if (userAgent.includes("Android")) {
    if (userAgent.includes("Mobile")) {
      device = "Android Telefon";
    } else {
      device = "Android Tablet";
    }
  } else if (userAgent.includes("Macintosh")) {
    device = "Mac";
  } else if (userAgent.includes("Windows")) {
    device = "Windows PC";
  } else if (userAgent.includes("Linux")) {
    device = "Linux PC";
  }

  // Tarayıcı tespiti
  if (userAgent.includes("Edg/")) {
    browser = "Microsoft Edge";
  } else if (userAgent.includes("Chrome/")) {
    const match = userAgent.match(/Chrome\/(\d+)/);
    browser = match ? `Chrome ${match[1]}` : "Chrome";
  } else if (userAgent.includes("Firefox/")) {
    const match = userAgent.match(/Firefox\/(\d+)/);
    browser = match ? `Firefox ${match[1]}` : "Firefox";
  } else if (userAgent.includes("Safari/") && !userAgent.includes("Chrome")) {
    const match = userAgent.match(/Version\/(\d+)/);
    browser = match ? `Safari ${match[1]}` : "Safari";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR/")) {
    browser = "Opera";
  }

  return { device, browser };
}

// IP adresinden lokasyon bilgisi al (basit versiyon)
async function getLocationFromIP(ip: string): Promise<string> {
  try {
    // Localhost veya private IP'ler için
    if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
      return "Yerel Ağ";
    }
    
    // Gerçek IP için ücretsiz API kullan
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=city,country`, {
      signal: AbortSignal.timeout(3000)
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.city && data.country) {
        return `${data.city}, ${data.country === "Turkey" ? "TR" : data.country}`;
      }
    }
  } catch (error) {
    console.error("Location lookup error:", error);
  }
  
  return "Bilinmeyen Konum";
}

export async function POST(request: NextRequest) {
  let connection;
  
  // Request bilgilerini al
  const userAgent = request.headers.get("user-agent") || "";
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0] || realIp || "Bilinmeyen";
  
  const { device, browser } = parseUserAgent(userAgent);
  
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Kullanıcı adı ve şifre gereklidir!" },
        { status: 400 }
      );
    }

    // Veritabanı bağlantısı
    let useDatabase = true;
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || "5.39.8.160",
        user: process.env.DB_USER || "vipkisba_vip",
        password: process.env.DB_PASSWORD || "Ciko5744**",
        database: process.env.DB_NAME || "vipkisba_bahce",
        connectTimeout: 5000,
      });
      
      await connection.ping();
    } catch (dbError: any) {
      console.error("Database connection error:", dbError);
      useDatabase = false;
      connection = null;
    }

    if (!useDatabase || !connection) {
      return NextResponse.json(
        { success: false, message: "Veritabanı bağlantısı kurulamadı!" },
        { status: 500 }
      );
    }

    // Lokasyon bilgisi al
    const location = await getLocationFromIP(ip);

    try {
      const [rows] = await connection.query(
        "SELECT id, username, email, full_name FROM admin_users WHERE username = ? AND password = ? AND is_active = 1",
        [username, password]
      );

      if (Array.isArray(rows) && rows.length > 0) {
        const admin = rows[0] as any;
        
        // Benzersiz session token oluştur
        const sessionToken = crypto.randomUUID();
        
        // Session cookie oluştur
        const sessionData = JSON.stringify({
          id: admin.id,
          username: admin.username,
          loginTime: Date.now(),
          token: sessionToken
        });
        
        const cookieStore = await cookies();
        cookieStore.set("admin_session", sessionData, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });

        // Veritabanına session kaydet
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 gün
        await connection.query(
          `INSERT INTO admin_sessions 
           (admin_id, session_token, ip_address, device, browser, location, user_agent, is_current, expires_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)`,
          [admin.id, sessionToken, ip, device, browser, location, userAgent, expiresAt]
        );

        // Login history'e başarılı giriş kaydet
        await connection.query(
          `INSERT INTO admin_login_history 
           (admin_id, username, ip_address, device, browser, location, user_agent, status) 
           VALUES (?, ?, ?, ?, ?, ?, ?, 'success')`,
          [admin.id, username, ip, device, browser, location, userAgent]
        );

        // Son giriş zamanını güncelle
        await connection.query(
          "UPDATE admin_users SET last_login = NOW() WHERE id = ?",
          [admin.id]
        );

        return NextResponse.json({ 
          success: true, 
          message: "Giriş başarılı" 
        });
      } else {
        // Login history'e başarısız giriş kaydet
        await connection.query(
          `INSERT INTO admin_login_history 
           (admin_id, username, ip_address, device, browser, location, user_agent, status, failure_reason) 
           VALUES (NULL, ?, ?, ?, ?, ?, ?, 'failed', 'Geçersiz kullanıcı adı veya şifre')`,
          [username, ip, device, browser, location, userAgent]
        );

        return NextResponse.json(
          { success: false, message: "Kullanıcı adı veya şifre hatalı!" },
          { status: 401 }
        );
      }
    } catch (queryError: any) {
      console.error("Query error:", queryError);
      return NextResponse.json(
        { success: false, message: `Sorgu hatası: ${queryError.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: `Giriş hatası: ${error.message}` },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error("Connection close error:", closeError);
      }
    }
  }
}
