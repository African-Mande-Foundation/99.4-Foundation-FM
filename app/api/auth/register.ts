import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password, subscribeToNewsletter } = req.body;

  try {
    // Register user with Strapi
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
      return res.status(strapiRes.status).json({ message: data.error?.message || 'Registration failed' });
    }

    // Set HTTP-only, secure cookie
    res.setHeader('Set-Cookie', cookie.serialize('jwt', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }));

    // Handle newsletter signup if selected
    if (subscribeToNewsletter) {
      const newsletterRes = await fetch(`${process.env.STRAPI_URL}/api/newsletter-signups`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.jwt}`,
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
        // Note: We don't fail the registration if newsletter signup fails
      }
    }

    return res.status(200).json({ user: data.user });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}