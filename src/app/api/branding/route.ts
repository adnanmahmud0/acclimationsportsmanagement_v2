import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Branding from "@/models/branding";
import { verifyAuth } from "@/lib/auth-middleware";
import { USER_ROLES } from "@/types/user";
import { StatusCodes } from "http-status-codes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    let branding = await Branding.findOne();
    
    if (!branding) {
      branding = await Branding.create({});
    }

    return NextResponse.json({
      success: true,
      data: branding,
    });
  } catch (error: unknown) {
    console.error("Fetch branding error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const userPayload = await verifyAuth(req);

    if (!userPayload || (userPayload.role !== USER_ROLES.SUPER_ADMIN && userPayload.role !== USER_ROLES.ADMIN)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    const data = await req.json();
    
    const branding = await Branding.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Branding updated successfully",
      data: branding,
    });
  } catch (error: unknown) {
    console.error("Update branding error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
