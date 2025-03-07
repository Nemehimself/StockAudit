import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const excludedPaths = [
    '/landing',
    '/campaign/signup',
    '/campaign/login',
    '/staff/signup',
  ];

  if (excludedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const isStaffCodeRoute = req.nextUrl.pathname.match(/^\/staff\/[^\/]+$/);
  if (isStaffCodeRoute) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/landing', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/staff')) {
    const token = req.cookies.get('staffToken')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/staff/login', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/campaign')) {
    const token = req.cookies.get('customerToken')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/campaign/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/staff/:path*', '/campaign/:path*'],
};
