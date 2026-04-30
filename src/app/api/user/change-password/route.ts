import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { verifyAuth } from "@/lib/auth-middleware";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as any;

    if (!userPayload) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const { oldPassword, newPassword, confirmPassword } = await req.json();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "New passwords do not match" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const user = await User.findById(userPayload.id).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    // Check old password
    const isMatch = await User.isMatchPassword(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect old password" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error: any) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
