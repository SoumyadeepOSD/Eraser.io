import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = getKindeServerSession();
  const authenticated = await session.isAuthenticated();

  if (!authenticated) {
    const loginUrl = new URL('/api/auth/login', request.url);
    loginUrl.searchParams.set('post_login_redirect_url', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard', '/workspace/:path*'], // Protect both /dashboard and /workspace
};
