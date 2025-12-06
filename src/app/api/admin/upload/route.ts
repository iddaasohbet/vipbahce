import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile } from "fs/promises";
import { join } from "path";

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

export async function POST(request: NextRequest) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Yetkisiz erişim" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Dosya bulunamadı" },
        { status: 400 }
      );
    }

    // Dosya adını oluştur (timestamp ile benzersiz)
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = join(process.cwd(), "public", "images", "projects", fileName);

    // Dosyayı kaydet
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // URL'yi döndür
    const imageUrl = `/images/projects/${fileName}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      message: "Resim başarıyla yüklendi",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Yükleme hatası" },
      { status: 500 }
    );
  }
}

