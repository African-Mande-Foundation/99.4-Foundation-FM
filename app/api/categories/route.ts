import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jwt = req.cookies['jwt'];

  if (!jwt) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/categories`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return res.status(strapiRes.status).json({ message: data.error?.message || 'Failed to fetch categories' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Category fetch error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}