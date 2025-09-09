import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// verify jwt
const secretJWT = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
const allowRole = ["admin_global", "admin_local", "seller"];
const verifyToken = async (token: string) => {
  try {
    const secret = await jwtVerify(String(token), secretJWT);
    return secret;
  } catch (error) {
    console.error("JWT verify error:", error);
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  console.log("Cookies in middleware:", request.cookies.getAll());

  const token = request.cookies.get("access_token")?.value || "";

  const verifyTokenResult: any = await verifyToken(String(token));
  if (!verifyTokenResult) {
    if (pathname.startsWith("/thong-tin-tai-khoan")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const role = verifyTokenResult?.payload?.role;
  const userId = verifyTokenResult?.payload?.userId;

  // user đã login thì chặn vào /tai-khoan
  if (userId && pathname.startsWith("/tai-khoan")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // role cho /trung-tam-dieu-khien
  console.log(pathname);
  if (pathname.startsWith("/trung-tam-dieu-khien")) {
    if (!role || !allowRole.includes(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const sellerAllowPaths = [
      "/trung-tam-dieu-khien/bang-dieu-khien",
      "/trung-tam-dieu-khien/san-pham",
      "/trung-tam-dieu-khien/don-hang",
    ];

    if (
      role === "seller" &&
      !sellerAllowPaths?.some((p) => pathname.startsWith(p))
    ) {
      return NextResponse.redirect(
        new URL("/trung-tam-dieu-khien/bang-dieu-khien/tong-quan", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tai-khoan",
    "/thong-tin-tai-khoan",
    "/trung-tam-dieu-khien/:path*",
  ],
};
