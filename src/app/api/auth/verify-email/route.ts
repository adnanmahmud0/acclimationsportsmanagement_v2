import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import ResetToken from "@/models/reset-token";
import { cryptoToken } from "@/lib/otp";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, oneTimeCode } = await req.json();

    if (!email || !oneTimeCode) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const user = await User.findOne({ email }).select("+authentication");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist!" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    if (user.authentication?.oneTimeCode !== Number(oneTimeCode)) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP provided" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const now = new Date();
    if (now > user.authentication.expireAt) {
      return NextResponse.json(
        { success: false, message: "OTP has expired. Please try again." },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    let message = "Email verified successfully. You can now login.";
    let data = null;

    if (!user.verified) {
      // First time verification
      await User.findByIdAndUpdate(user._id, {
        verified: true,
        authentication: {
          oneTimeCode: null,
          expireAt: null,
          isResetPassword: false,
        },
      });
    } else {
      // Password reset flow
      await User.findByIdAndUpdate(user._id, {
        authentication: {
          isResetPassword: true,
          oneTimeCode: null,
          expireAt: null,
        },
      });

      const token = cryptoToken();
      await ResetToken.create({
        user: user._id,
        token,
        expireAt: new Date(Date.now() + 5 * 60000), // 5 minutes
      });

      message = "Verification Successful: Use this token to reset your password";
      data = token;
    }

    return NextResponse.json({
      success: true,
      message,
      data,
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
