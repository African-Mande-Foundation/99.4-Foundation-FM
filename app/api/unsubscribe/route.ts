import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, token } = await req.json();

  if (!email || !token) {
    return NextResponse.json(
      { message: "Email and token are required." },
      { status: 400 },
    );
  }

  try {
    const strapiUrl = process.env.STRAPI_URL;

    // Forward to Strapi's unsubscribe endpoint
    const res = await fetch(
      `${strapiUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`,
      { method: "GET" },
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error proxying unsubscribe:", err);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
