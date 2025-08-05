import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session || !session.jwt || !session.user?.id || !session.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const photoUrl = session.user.image

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/users/${session.user.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.jwt}`,
      },
      body: JSON.stringify({ photoUrl }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ message: data.error?.message || 'Failed to update user profile pic' }, { status: strapiRes.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
