import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
// import { getCookieValue } from './services/getCookieValue';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/auditcalculator' || pathname === '/auditpricing') {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/stockaudit', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auditcalculator', '/auditpricing'],
};
