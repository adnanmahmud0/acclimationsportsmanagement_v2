import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Media } from "@/models/media";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    const imgbbFormData = new URLSearchParams();
    imgbbFormData.append("image", base64Image);

    const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=2972898062782b58a0741b9b6cecd0aa`, {
      method: 'POST',
      body: imgbbFormData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const imgbbResult = await imgbbResponse.json();

    if (!imgbbResult.success) {
      return NextResponse.json({ success: false, message: "ImgBB upload failed" }, { status: 500 });
    }

    const url = imgbbResult.data.url;
    const size = imgbbResult.data.size;
    const filename = `${Date.now()}-${file.name.replaceAll(" ", "-")}`;

    await connectDB();
    const media = await Media.create({
      filename,
      url,
      size
    });

    return NextResponse.json({ 
      success: true, 
      url: media.url 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
