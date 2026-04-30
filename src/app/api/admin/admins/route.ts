import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { verifyAuth } from "@/lib/auth-middleware";
import { USER_ROLES } from "@/types/user";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as JwtPayload;

    if (!userPayload || userPayload.role !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    // List all users with ADMIN role
    const admins = await User.find({ role: USER_ROLES.ADMIN }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: admins,
    });
  } catch (error: unknown) {
    console.error("List admins error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as JwtPayload;

    if (!userPayload || userPayload.role !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const newAdmin = await User.create({
      name,
      email,
      password,
      role: USER_ROLES.ADMIN,
      verified: true,
    });

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully",
      data: newAdmin,
    });
  } catch (error: unknown) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
