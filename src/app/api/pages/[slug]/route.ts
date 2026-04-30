import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { verifyAuth } from "@/lib/auth-middleware";
import { USER_ROLES } from "@/types/user";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;

    const page = await Page.findOne({ slug });

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error: unknown) {
    console.error("Fetch page error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const userPayload = (await verifyAuth(req)) as JwtPayload;
    const { slug } = await params;

    if (!userPayload || (userPayload.role !== USER_ROLES.SUPER_ADMIN && userPayload.role !== USER_ROLES.ADMIN)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: StatusCodes.FORBIDDEN }
      );
    }

    const data = await req.json();

    const page = await Page.findOneAndUpdate(
      { slug },
      { 
        $set: {
          title: data.title,
          content: data.content,
          seo: data.seo,
        } 
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Page updated successfully",
      data: page,
    });
  } catch (error: unknown) {
    console.error("Update page error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
