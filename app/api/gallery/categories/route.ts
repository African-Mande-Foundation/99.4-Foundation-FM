import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/media-gallery-categories?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      cache: "no-store"
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch  {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
