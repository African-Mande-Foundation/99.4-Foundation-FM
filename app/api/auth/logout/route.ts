import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
 
  const res = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });


  res.headers.set('Set-Cookie', serialize('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), 
    path: '/',
  }));

  return res;
}