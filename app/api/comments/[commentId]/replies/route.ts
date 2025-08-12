import { flattenStrapiResponse } from '@/app/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.jwt) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  
  const { commentId } = await params;

  try {
    const strapiRes = await fetch(
      `${process.env.STRAPI_URL}/api/comments?filters[parent][id][$eq]=${commentId}&sort=createdAt:asc&populate=user`,

      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.jwt}`,
        },
      }
    );

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json(
        { message: data.error?.message || 'Failed to fetch replies' },
        { status: strapiRes.status }
      );
    }

    const flattenedReplies = flattenStrapiResponse(data.data);

    return NextResponse.json(flattenedReplies);
  } catch (error) {
    console.error('Replies fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
