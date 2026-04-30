import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";
import { jwtVerify } from "jose";

// We use 'jose' instead of 'jsonwebtoken' in Middleware because Middleware runs on Edge Runtime
// which doesn't support Node.js built-in modules like 'crypto' used by jsonwebtoken.
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Skip protection for the login page itself
    if (pathname === "/login") {
      return NextResponse.next();
    }

    // Check for access token in header or cookie
    // Since we are doing a client-side redirect in LoginForm, 
    // the token might be in localStorage (which Middleware can't see)
    // or in a cookie.
    
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Check if user has admin/super_admin role
      if (payload.role !== "ADMIN" && payload.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Middleware Auth Error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
