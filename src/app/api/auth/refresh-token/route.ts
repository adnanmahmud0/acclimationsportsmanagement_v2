import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtHelper } from "@/lib/jwt";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";
import { StatusCodes } from "http-status-codes";

export async function POST() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Refresh token missing" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwtHelper.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string);
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired refresh token" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Check if user still exists and is active
    const user = await User.findById(decoded.id);
    if (!user || user.status === "delete") {
      return NextResponse.json(
        { success: false, message: "User not authorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    // Create new access token
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

    const response = NextResponse.json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken,
      },
    });

    // Also update the accessToken cookie for middleware
    response.cookies.set("accessToken", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (error: unknown) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
