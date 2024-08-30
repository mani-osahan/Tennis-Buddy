import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";
  const userId = request.cookies.get("userId")?.value || "";
  // const userComplete = user.isProfileComplete
  const isProfileComplete =
    request.cookies.get("isProfileComplete")?.value === "true";

  const isPublicPath =
    path === "/login" || path === "/verifyemail" || path === "/dashboard";

  const isProfileSetupPath = path.startsWith(`/profile-setup/${userId}`);

  // if (path === "/login") {
  //   const response = NextResponse.next();
  //   response.cookies.delete("isProfileComplete");
  //   response.cookies.delete("userId");
  //   response.cookies.delete("token");

  //   return response;
  // }

  if (token && !isProfileComplete && !isProfileSetupPath) {
    return NextResponse.redirect(
      new URL(`/profile-setup/${userId}`, request.nextUrl)
    );
  }

  if (token && isProfileComplete && path === `/profile-setup/${userId}`) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile-setup/:id*", "/login", "/verifyemail", "/dashboard"],
};
