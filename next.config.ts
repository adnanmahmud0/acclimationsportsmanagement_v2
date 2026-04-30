import type { NextConfig } from "next";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  // Required for Docker: produces a self-contained server bundle
  output: "standalone",
};

export default nextConfig;
