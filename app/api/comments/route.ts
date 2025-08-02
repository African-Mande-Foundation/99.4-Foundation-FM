import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const jwt = req.cookies['jwt'];
  if (!jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { content, articleId, parentId, userId } = req.body;

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
      return res.status(strapiRes.status).json({ message: data.error?.message || 'Failed to post comment' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Comment post error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}