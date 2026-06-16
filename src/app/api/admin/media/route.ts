import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Media } from "@/models/media";

export async function GET() {
  try {
    await connectDB();
    const images = await Media.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Media fetch error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch media" }, { status: 500 });
  }
}
