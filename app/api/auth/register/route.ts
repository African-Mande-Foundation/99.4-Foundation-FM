import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {

  const { username, email, password, subscribeToNewsletter } = await req.json();
  if (!username || !email || !password) {
    return NextResponse.json({ message: 'Username, email, and password are required' }, { status: 400 });
  }

  const photoUrl = "https://images.unsplash.com/photo-1466112928291-0903b80a9466?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, photoUrl}),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      
      return NextResponse.json({ message: data.error?.message || 'Registration failed' }, { status: strapiRes.status });
    }

    
    const jwt = data.jwt;

    
    const res = NextResponse.json({ user: data.user }, { status: 200 });

    res.headers.set('Set-Cookie', serialize('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }));

    
    if (subscribeToNewsletter) {
      const newsletterRes = await fetch(`${process.env.STRAPI_URL}/api/newsletter-signups`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            email,
            SubscribedAt: new Date().toISOString(),
            user: data.user.id,
          },
        }),
      });

      if (!newsletterRes.ok) {
        const newsletterData = await newsletterRes.json();
        console.error('Newsletter signup failed:', newsletterData.error?.message);
      }
    }

   
    return res;

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

