import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.jwt || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { content, articleId, userId, parentId } = await req.json();

  if (!content || !articleId || userId !== session.user.id) {
    return NextResponse.json(
      { message: "Invalid comment data" },
      { status: 400 },
    );
  }

  try {
    const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      body: JSON.stringify({
        data: {
          Content: content,
          article: articleId,
          user: session.user.id,
          parent: parentId || null,
        },
      }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      return NextResponse.json(
        { message: data.error?.message || "Failed to post comment" },
        { status: strapiRes.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Comment post error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
