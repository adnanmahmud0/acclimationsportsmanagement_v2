import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Media } from "@/models/media";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    await connectDB();
    const result = await Media.findOneAndDelete({ filename });

    if (!result) {
      return NextResponse.json({ success: false, message: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete file" }, { status: 500 });
  }
}
