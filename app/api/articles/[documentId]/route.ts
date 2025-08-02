import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: NextRequest, { params }: { params: { documentId: string } }) {
  const { documentId } = params;
  const session = await getServerSession(authOptions);

  if (!session || !session.jwt) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const strapiRes = await fetch(
      `${process.env.STRAPI_URL}/api/articles?filters[documentId][$eq]=${documentId}&populate[comments][populate][0]=replies&populate[comments][populate][1]=profile&populate[comments][populate][2]=parent&populate[comments][populate][3]=replies.profile&populate[cover]=true&populate[author]=true&populate[category]=true`,
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
        { message: data.error?.message || 'Failed to fetch article' },
        { status: strapiRes.status }
      );
    }

    if (!data.data || data.data.length === 0) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(data.data[0]); // Return the first (and only) article
  } catch (error) {
    console.error('Single article fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
