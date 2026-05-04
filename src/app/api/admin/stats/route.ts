import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import User from "@/models/user";
import { StatusCodes } from "http-status-codes";

import { USER_ROLES } from "@/types/user";

export async function GET() {
  try {
    await connectDB();

    const [totalPages, totalAdmins, lastEditedPages, allPages] = await Promise.all([
      Page.countDocuments(),
      User.countDocuments({ role: { $in: [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN] } }),
      Page.find().sort({ updatedAt: -1 }).limit(5).select("slug title updatedAt").lean(),
      Page.find().select("views").lean(),
    ]);

    const totalViews = allPages.reduce((acc, p) => acc + (p.views || 0), 0);

    return NextResponse.json({
      success: true,
      data: {
        totalPages,
        totalAdmins,
        lastEditedPages,
        totalViews,
      },
    });
  } catch (error: unknown) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
