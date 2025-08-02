import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { identifier, password } = req.body;

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return res.status(strapiRes.status).json({ message: data.error?.message || 'Login failed' });
    }

    // Set HTTP-only, secure cookie
    res.setHeader('Set-Cookie', cookie.serialize('jwt', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }));

    return res.status(200).json({ user: data.user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}