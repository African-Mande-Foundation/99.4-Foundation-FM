import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {

  const { username, email, password, subscribeToNewsletter } = await req.json();

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
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

