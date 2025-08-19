import { NextResponse } from "next/server";


type StrapiSong = {
  id: number;
  title: string;
  description: string;
  songs?: {
    url: string;
  };
};


export async function GET() {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/website-songs?populate=songs`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status}`);
    }

    const data = await res.json();

const songs = (data.data as StrapiSong[])
  .filter(item => item.songs?.url) 
  .map((item) => ({
    id: item.id,
    title: item.title,
    desc: item.description,
    url: item.songs!.url.startsWith("http")
      ? item.songs!.url
      : `${process.env.STRAPI_URL}${item.songs!.url}`,
  }));


    return NextResponse.json(songs);
  } catch (error) {
    console.error("Error fetching songs from Strapi:", error);
    return NextResponse.json({ error: "Failed to fetch songs" }, { status: 500 });
  }
}
