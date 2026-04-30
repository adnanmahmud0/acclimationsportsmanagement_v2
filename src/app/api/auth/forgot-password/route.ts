import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { generateOTP } from "@/lib/otp";
import { emailHelper } from "@/lib/email";
import { emailTemplate } from "@/lib/email-templates";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist!" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Send reset email
    const otp = generateOTP();
    const template = emailTemplate.resetPassword({
      email: user.email,
      otp,
    });
    
    await emailHelper.sendEmail(template);

    // Save OTP to DB
    await User.findByIdAndUpdate(user._id, {
      authentication: {
        oneTimeCode: otp,
        expireAt: new Date(Date.now() + 3 * 60000), // 3 minutes
        isResetPassword: false
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset code sent to your email.",
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
