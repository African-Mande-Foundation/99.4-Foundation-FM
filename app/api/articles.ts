import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.cookies['jwt'];

  if (!jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
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
      return res.status(strapiRes.status).json({ message: data.error?.message || 'Failed to fetch articles' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Article fetch error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}