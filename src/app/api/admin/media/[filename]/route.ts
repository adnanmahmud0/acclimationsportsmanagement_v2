import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    try {
      await unlink(filePath);
      return NextResponse.json({ success: true, message: "File deleted successfully" });
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
        return NextResponse.json({ success: false, message: "File not found" }, { status: 404 });
      }
      throw err;
    }
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete file" }, { status: 500 });
  }
}
