import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';


export async function POST(req: NextRequest) {
  
  const { identifier, password } = await req.json();

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ message: data.error?.message || 'Login failed' }, { status: strapiRes.status });
    }

    const res = NextResponse.json({ user: data.user }, { status: 200 });


    res.headers.set('Set-Cookie', serialize('jwt', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }));

    return res;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}