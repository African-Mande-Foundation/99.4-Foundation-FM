import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, email, password, subscribeToNewsletter } = await req.json();
  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "Username, email, and password are required" },
      { status: 400 },
    );
  }

  const photoUrl =
    "https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fuser.png?alt=media&token=23522495-7f95-41c4-a0df-d53d2584741e";

  try {
    const strapiRes = await fetch(
      `${process.env.STRAPI_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, photoUrl }),
      },
    );

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json(
        { message: data.error?.message || "Registration failed" },
        { status: strapiRes.status },
      );
    }

    if (subscribeToNewsletter) {
      const newsletterRes = await fetch(
        `${process.env.STRAPI_URL}/api/newsletter-signups`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.jwt}`,
          },
          body: JSON.stringify({
            data: {
              email,
              SubscribedAt: new Date().toISOString(),
              user: data.user.id,
            },
          }),
        },
      );

      if (!newsletterRes.ok) {
        const newsletterData = await newsletterRes.json();
        console.error(
          "Newsletter signup failed:",
          newsletterData.error?.message,
        );
      }
    }

    return NextResponse.json({ user: data.user }, { status: 200 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
