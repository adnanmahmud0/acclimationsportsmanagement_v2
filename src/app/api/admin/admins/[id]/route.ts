import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { verifyAuth } from "@/lib/auth-middleware";
import { USER_ROLES } from "@/types/user";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as JwtPayload;
    const { id } = await params;

    if (!userPayload || userPayload.role !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    const data = await req.json();
    
    // Only allow updating certain fields
    const filteredData = {
      name: data.name,
      email: data.email,
    };

    const updatedAdmin = await User.findOneAndUpdate(
      { _id: id, role: USER_ROLES.ADMIN },
      { $set: filteredData },
      { new: true }
    );

    if (!updatedAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (error: unknown) {
    console.error("Update admin error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as JwtPayload;
    const { id } = await params;

    if (!userPayload || userPayload.role !== USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    const deletedAdmin = await User.findOneAndDelete({ 
      _id: id, 
      role: USER_ROLES.ADMIN 
    });

    if (!deletedAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Delete admin error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
