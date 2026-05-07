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
interface GlobalMongoose {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const globalWithMongoose = global as unknown as GlobalMongoose;

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached && cached.conn) {
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Use a consistent database name across environments
    // You can also add DB_NAME=... to your .env to override this
    const dbName = process.env.DB_NAME || 'acclimation-sports-management';

    const urlWithDb = DATABASE_URL!.replace(
      /(\.mongodb\.net\/)[^?]*(\?|$)/,
      `$1${dbName}$2`,
    );

    console.log(`Connecting to MongoDB: ${dbName}`);

    cached.promise = mongoose.connect(urlWithDb, opts).then(async (mongooseInstance) => {
      await seedSuperAdmin();
      return mongooseInstance;
    });
  }

  try {
    if (cached) {
      cached.conn = await cached.promise;
    }
  } catch (e) {
    if (cached) {
      cached.promise = null;
    }
    throw e;
  }

  return cached?.conn;
}

export default connectDB;
