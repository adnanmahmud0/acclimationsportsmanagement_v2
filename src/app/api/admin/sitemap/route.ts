import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { verifyAuth } from "@/lib/auth-middleware";
import { USER_ROLES } from "@/types/user";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as JwtPayload;

    if (!userPayload || (userPayload.role !== USER_ROLES.SUPER_ADMIN && userPayload.role !== USER_ROLES.ADMIN)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    const pages = await Page.find({}, { slug: 1, title: 1, seo: 1 }).sort({ slug: 1 });

    return NextResponse.json({
      success: true,
      data: pages,
    });
  } catch (error: unknown) {
    console.error("Fetch sitemap pages error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
