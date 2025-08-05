import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { flattenStrapiResponse } from '@/app/lib/utils';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.jwt) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
  

    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/comments?sort=createdAt:desc&pagination[limit]=5&populate[user][populate][0]=photoUrl`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.jwt}`,
      },
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ message: data.error?.message || 'Failed to fetch recent comments' }, { status: strapiRes.status });
    }

    return NextResponse.json(flattenStrapiResponse(data.data), { status: 200 });
  } catch (error) {
    console.error('Recent comments fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
