import { NextResponse } from "next/server";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  profession: string;
};

export async function GET() {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/testimonials`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`, // remove if public
      },
      cache: "no-store", // Always fresh
    });

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status}`);
    }

    const data = await res.json();

    const testimonials: Testimonial[] = Array.isArray(data.data)
      ? data.data.map((item: Testimonial) => ({
          id: item.id,
          quote: item.quote,
          name: item.name,
          profession: item.profession,
        }))
      : [];

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
