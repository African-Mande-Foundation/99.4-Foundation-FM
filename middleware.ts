import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get('jwt')?.value;

  if (req.nextUrl.pathname.startsWith('/news')) {
    if (!jwt) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      
      const res = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/news/:path*'],
};