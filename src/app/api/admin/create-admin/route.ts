import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { verifyAuth } from "@/lib/auth-middleware";
import { USER_ROLES } from "@/types/user";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
  try {
    await connectDB();
    const userPayload = await verifyAuth(req);

    // Only SUPER_ADMIN can create ADMIN accounts
    if (!userPayload || userPayload.role !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Only Super Admins can perform this action." },
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

    // Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Create Admin user
    const newAdmin = await User.create({
      name,
      email,
      password,
      role: USER_ROLES.ADMIN,
      verified: true, // Auto-verify accounts created by Super Admin
    });

    return NextResponse.json({
      success: true,
      message: "Admin account created successfully",
      data: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error: unknown) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
