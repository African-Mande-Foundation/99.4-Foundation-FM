import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', cookie.serialize('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  }));

  return res.status(200).json({ message: 'Logged out successfully' });
}