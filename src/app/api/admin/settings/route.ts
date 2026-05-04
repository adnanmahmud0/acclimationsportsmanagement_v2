import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Setting from "@/models/setting";
import { verifyAuth } from "@/lib/auth-middleware";
import { USER_ROLES } from "@/types/user";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

export async function GET() {
  try {
    await connectDB();
    const settings = await Setting.find({});
    
    // Convert to a key-value object
    const settingsObject = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({
      success: true,
      data: settingsObject,
    });
  } catch (error: unknown) {
    console.error("Fetch settings error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as JwtPayload;

    if (!userPayload || (userPayload.role !== USER_ROLES.SUPER_ADMIN && userPayload.role !== USER_ROLES.ADMIN)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    const { key, value } = await req.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, message: "Key and value are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const setting = await Setting.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Setting updated successfully",
      data: setting,
    });
  } catch (error: unknown) {
    console.error("Update setting error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
