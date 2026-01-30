import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function proxy(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/profile', '/admin'];
  const adminRoutes = ['/admin'];
  const authRoutes = ['/login', '/register'];

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !session?.user) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && session?.user) {
    const isAdmin = session.user.isAdmin;
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
