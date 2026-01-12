import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Redirect employees to employee portal
    if (token?.role === "EMPLOYEE" && path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/employee/dashboard", req.url))
    }

    // Redirect non-employees away from employee portal
    if (token?.role !== "EMPLOYEE" && path.startsWith("/employee")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        // Public routes
        if (
          path === "/" ||
          path === "/login" ||
          path === "/register" ||
          path === "/calculator" ||
          path.startsWith("/api/auth")
        ) {
          return true
        }

        // Protected routes require authentication
        if (path.startsWith("/dashboard") || path.startsWith("/employee")) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employee/:path*",
    "/api/payroll/:path*",
    "/api/payslips/:path*",
  ],
}
