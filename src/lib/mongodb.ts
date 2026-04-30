import mongoose from "mongoose";
import { seedSuperAdmin } from "./seed";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Build the database name based on environment as per previous backend logic
    const env = process.env.NODE_ENV || 'development';
    const dbName =
      env === 'production'
        ? 'acclimation-sports-management'
        : 'acclimation-sports-management-dev';

    const urlWithDb = DATABASE_URL!.replace(
      /(\.mongodb\.net\/)[^?]*(\?|$)/,
      `$1${dbName}$2`,
    );

    console.log(`Connecting to MongoDB: ${dbName}`);

    cached.promise = mongoose.connect(urlWithDb, opts).then(async (mongoose) => {
      await seedSuperAdmin();
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
