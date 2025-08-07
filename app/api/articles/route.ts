import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/authOptions"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.jwt) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const strapiRes = await fetch(
      `${process.env.STRAPI_URL}/api/articles?populate[0]=author&populate[1]=category&populate[2]=cover&pagination[page]=1&pagination[pageSize]=4&sort[0]=publishedAt:desc`,
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
        { message: data.error?.message || 'Failed to fetch articles' },
        { status: strapiRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Article fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}