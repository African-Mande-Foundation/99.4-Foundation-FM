import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.jwt) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await params;

  try {
    const strapiRes = await fetch(
      `${process.env.STRAPI_URL}/api/comments/${commentId}/own`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.jwt}`,
        },
      },
    );

    if (strapiRes.ok) {
      return NextResponse.json(
        { message: "Comment deleted successfully" },
        { status: 200 },
      );
    } else {
      const errorData = await strapiRes.json();
      return NextResponse.json(
        {
          message: errorData.message || "Failed to delete comment from Strapi",
        },
        { status: strapiRes.status },
      );
    }
  } catch (error) {
    console.error("Error deleting comment via proxy:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
