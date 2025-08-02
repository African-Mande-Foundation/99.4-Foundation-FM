import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  const jwt = req.cookies.get('jwt')?.value;
  if (!jwt) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { content, articleId, parentId, userId } = await req.json();

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: {
          Content: content,
          article: articleId,
          user: userId,
          parent: parentId || null,
        },
      }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json({ message: data.error?.message || 'Failed to post comment' }, { status: strapiRes.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Comment post error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}