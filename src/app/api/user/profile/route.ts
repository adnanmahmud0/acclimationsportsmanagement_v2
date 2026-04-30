import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { verifyAuth } from "@/lib/auth-middleware";
import { StatusCodes } from "http-status-codes";

export async function GET(req: Request) {
  try {
    await connectDB();
    const userPayload = await verifyAuth(req);

    if (!userPayload) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const user = await User.findById(userPayload.id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as any;

    if (!userPayload) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const data = await req.json();
    const user = await User.findById(userPayload.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }
    
    // Enforce role-based email change restriction
    if (data.email && data.email !== user.email) {
      if (user.role === "SUPER_ADMIN") {
        return NextResponse.json(
          { success: false, message: "Super Admin cannot change their email address" },
          { status: StatusCodes.FORBIDDEN }
        );
      }
      
      // Check if new email is already taken
      const emailExists = await User.findOne({ email: data.email });
      if (emailExists) {
        return NextResponse.json(
          { success: false, message: "Email already in use" },
          { status: StatusCodes.BAD_REQUEST }
        );
      }
    }

    // Prevent sensitive fields from being updated directly
    const allowedUpdates = ["name", "image"];
    if (user.role !== "SUPER_ADMIN") {
      allowedUpdates.push("email");
    }

    const filteredData: any = {};
    allowedUpdates.forEach(key => {
      if (data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      userPayload.id,
      { $set: filteredData },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
