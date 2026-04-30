import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { generateOTP } from "@/lib/otp";
import { emailHelper } from "@/lib/email";
import { emailTemplate } from "@/lib/email-templates";
import { USER_ROLES } from "@/types/user";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists!" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password,
      role: USER_ROLES.USER,
      verified: false,
    });

    // Generate and send OTP
    const otp = generateOTP();
    const template = emailTemplate.createAccount({
      name: newUser.name,
      email: newUser.email,
      otp,
    });
    
    await emailHelper.sendEmail(template);

    // Save OTP to DB
    await User.findByIdAndUpdate(newUser._id, {
      authentication: {
        oneTimeCode: otp,
        expireAt: new Date(Date.now() + 3 * 60000), // 3 minutes
      },
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
