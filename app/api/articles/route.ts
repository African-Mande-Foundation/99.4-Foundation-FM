import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const jwt = req.cookies.get('jwt')?.value;

  if (!jwt) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/articles?populate[0]=author&populate[1]=category&populate[2]=cover`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ message: data.error?.message || 'Failed to fetch articles' }, { status: strapiRes.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Article fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}