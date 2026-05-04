import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ success: false }, { status: 400 });

    await connectDB();
    console.log(`[TRACKING] Page view registered for: ${slug}`);
    await Page.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 }, $setOnInsert: { title: slug.charAt(0).toUpperCase() + slug.slice(1) } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("View tracking error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
