import { NextResponse, type NextRequest } from "next/server";

/**
 * Optional password gate for a publicly reachable demo (HTTP Basic auth, any user name).
 * Enabled by setting DEMO_PASSWORD. Not a replacement for Microsoft Entra ID sign-in.
 */
export const config = {
  matcher: ["/((?!api/health|_next/static|_next/image|favicon.ico).*)"],
};

export function proxy(request: NextRequest) {
  const expected = process.env.DEMO_PASSWORD;
  if (!expected) return NextResponse.next();

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    if (decoded.slice(decoded.indexOf(":") + 1) === expected) return NextResponse.next();
  }

  return new NextResponse("Wymagane hasło dostępu do wersji demonstracyjnej.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="SEKA Recruitment (demo)", charset="UTF-8"' },
  });
}
