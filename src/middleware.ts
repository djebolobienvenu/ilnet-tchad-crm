// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token') || request.headers.get('authorization');
  const { pathname } = request.nextUrl;

  // Pages publiques (pas besoin d'être connecté)
  const publicPaths = ['/login', '/inscription', '/'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Si pas de token et pas sur une page publique → rediriger vers login
  if (!token && !isPublicPath && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si token et sur login → rediriger vers dashboard
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|logo).*)',
  ],
};