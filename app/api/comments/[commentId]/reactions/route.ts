import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session?.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await params;

  const { reactionType } = await req.json(); // 'like', 'dislike', or null

  
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/comment-reactions/toggle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
        body: JSON.stringify({
          commentId,
          type: reactionType,
        }),
      },
    );

    let data;
    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      console.error("Non-JSON response from Strapi:", text);
      return NextResponse.json({ message: text }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Reaction API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
