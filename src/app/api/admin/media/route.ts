import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Check if directory exists
    try {
      await stat(uploadDir);
    } catch {
      return NextResponse.json({ success: true, images: [] });
    }

    const files = await readdir(uploadDir);
    
    const images = await Promise.all(
      files
        .filter(file => !file.startsWith('.')) // Ignore hidden files
        .map(async (filename) => {
          const filePath = path.join(uploadDir, filename);
          const fileStat = await stat(filePath);
          
          return {
            filename,
            url: `/api/uploads/${filename}`,
            size: fileStat.size,
            createdAt: fileStat.birthtime,
          };
        })
    );

    // Sort by newest first
    images.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Media fetch error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch media" }, { status: 500 });
  }
}
