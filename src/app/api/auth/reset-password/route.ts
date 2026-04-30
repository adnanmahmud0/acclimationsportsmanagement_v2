import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import ResetToken from "@/models/reset-token";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { token, newPassword, confirmPassword } = await req.json();

    if (!token || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match!" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Check token
    const isExistToken = await ResetToken.findOne({ token });
    if (!isExistToken) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Check expiry
    if (new Date() > isExistToken.expireAt) {
      return NextResponse.json(
        { success: false, message: "Token has expired" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Update user password
    const user = await User.findById(isExistToken.user).select("+authentication");
    if (!user || !user.authentication?.isResetPassword) {
      return NextResponse.json(
        { success: false, message: "You don't have permission to reset password" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // In Next.js, the 'pre-save' hook in the model will handle hashing if we save the document,
    // but here we are often using findOneAndUpdate or similar. 
    // Let's use document.save() to be sure the hashing triggers correctly.
    user.password = newPassword;
    user.authentication.isResetPassword = false;
    await user.save();

    // Clean up token
    await ResetToken.deleteOne({ _id: isExistToken._id });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully. You can now login with your new password.",
    });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
