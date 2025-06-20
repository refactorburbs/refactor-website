
import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "@/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/admin",
  "/admin/applications",
  "/admin/games",
  "/admin/games/add",
  "/admin/games/edit/*",
  "admin/jobs",
  "/admin/jobs/add",
  "/admin/jobs/edit/*",
]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    // This person is not authenticated!
    const response = NextResponse.redirect(new URL("/login", req.nextUrl));
    if (cookie) {
      response.cookies.delete("session");
    }
    return response;
  }

  // If user is authenticated and accessing protected route, refresh session
  if (isProtectedRoute && session?.userId) {
    try {
      await updateSession()
    } catch (error) {
      console.log("Session refresh failed, redirecting... ", error);
      const response = NextResponse.redirect(new URL("/login", req.nextUrl))
      response.cookies.delete("session");
      return response
    }
  }

  // Redirect to /admin if the user is authenticated and tries to access auth pages
  if (
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/admin") &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should run on
export const config = {
  matcher: ["/admin", "/login", "/sign-up"]
}