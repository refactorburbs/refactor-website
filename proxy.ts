
import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "@/lib/session";
import { cookies } from "next/headers";

export default async function proxy(req: NextRequest) {
  // const path = req.nextUrl.pathname;
  // const isProtectedRoute = path.startsWith("/admin");

  // if (!isProtectedRoute) {
  //   return NextResponse.next();
  // }

  // const cookieStore = await cookies();
  // const cookie = cookieStore.get("session")?.value;
  // const session = await decrypt(cookie);

  // if (isProtectedRoute && !session?.userId) {
  //   // This person is not authenticated!
  //   const response = NextResponse.redirect(new URL("/login", req.nextUrl));
  //   if (cookie) {
  //     response.cookies.delete("session");
  //   }
  //   return response;
  // }

  // // If user is authenticated and accessing protected route, refresh session
  // if (isProtectedRoute && session?.userId) {
  //   try {
  //     await updateSession()
  //   } catch (error) {
  //     console.log("Session refresh failed, redirecting... ", error);
  //     const response = NextResponse.redirect(new URL("/login", req.nextUrl))
  //     response.cookies.delete("session");
  //     return response
  //   }
  // }

  // return NextResponse.next();
  return
}

// Routes Middleware should run on
export const config = {
  // matcher: ["/admin/:path*", "/login", "/sign-up"]
}