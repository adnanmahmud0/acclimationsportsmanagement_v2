import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    
    // Get list of databases
    const admin = mongoose.connection.db!.admin();
    const result = await admin.listDatabases();
    const databases = result.databases.map((db: { name: string }) => db.name);

    return NextResponse.json({
      status: "connected",
      message: "Successfully connected to MongoDB",
      host: mongoose.connection.host,
      currentDatabase: mongoose.connection.name,
      allDatabases: databases,
    });
  } catch (error: unknown) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to MongoDB",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
