import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { jwtHelper } from "@/lib/jwt";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Find user and include password (which is excluded by default)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User doesn't exist!" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Check if verified
    if (!user.verified) {
      return NextResponse.json(
        { success: false, message: "Please verify your account first" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Check status
    if (user.status === "delete") {
      return NextResponse.json(
        { success: false, message: "Your account has been deactivated" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Check password
    const isMatch = await User.isMatchPassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Password is incorrect!" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Create tokens
    const jwtPayload = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    const accessToken = jwtHelper.createToken(
      jwtPayload,
      process.env.JWT_SECRET as string,
      process.env.JWT_EXPIRE_IN || "1d"
    );

    const refreshToken = jwtHelper.createToken(
      jwtPayload,
      process.env.JWT_REFRESH_SECRET as string,
      process.env.JWT_REFRESH_EXPIRE_IN || "7d"
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
      },
    });

    // Set tokens in cookies for middleware
    response.cookies.set("accessToken", accessToken, {
      httpOnly: false, // Set to false so client can read it if needed, but middleware can always see it
      secure: false, // Changed to false for local testing over http/ip
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Changed to false for local testing
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
