import { NextResponse } from "next/server";

type PodcastEntry = {
  id: number;
  title: string;
  thumbnailurl: string;
  youtubeurl: string;
};

export async function GET() {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/podcasts?pagination[limit]=100`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`, 
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status}`);
    }

    const data = await res.json();

    const podcasts = Array.isArray(data.data)
      ? data.data.map((item: PodcastEntry) => ({
          id: item.id,
          title: item.title,
          thumbnailUrl: item.thumbnailurl,
          youtubeUrl: item.youtubeurl,
        }))
      : [];

    return NextResponse.json(podcasts);
  } catch (error) {
    console.error("Error fetching podcasts from Strapi:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}
