import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
// import { getCookieValue } from './services/getCookieValue';

export default function middleware(req: NextRequest) {
  const excludedPaths = [
    '/landing',
    '/campaign/signup',
    '/campaign/login',
    '/staff/login',
  ];

  if (excludedPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // if (req.nextUrl.pathname.startsWith('/campaign')) {
  //   const isStaticCampaignRoute = [
  //     '/campaign/redeem-points',
  //     '/campaign/earn-points',
  //   ].includes(req.nextUrl.pathname);

  //   if (isStaticCampaignRoute) {
  //     const token =
  //       req.cookies.get('customerToken')?.value ||
  //       getCookieValue('customerToken');
  //     if (!token) {
  //       return NextResponse.redirect(new URL('/campaign/login', req.url));
  //     }
  //   }
  // }

  // if (req.nextUrl.pathname.startsWith('/staff')) {
  //   const isStaticCampaignRoute = ['/staff/points', '/staff/reward'].includes(
  //     req.nextUrl.pathname
  //   );

  //   if (isStaticCampaignRoute) {
  //     const token =
  //       getCookieValue('staffToken') || req.cookies.get('staffToken')?.value;
  //     console.log(token);
  //     if (!token) {
  //       return NextResponse.redirect(new URL('/staff/login', req.url));
  //     }
  //   }
  // }

  const isStaffCodeRoute = req.nextUrl.pathname.match(/^\/staff\/[^\/]+$/);
  if (isStaffCodeRoute) {
    return NextResponse.next();
  }

  const isCampaignCodeRoute =
    req.nextUrl.pathname.match(/^\/campaign\/[^\/]+$/);
  if (isCampaignCodeRoute) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/landing', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/staff/:path*', '/campaign/:path*'],
};
