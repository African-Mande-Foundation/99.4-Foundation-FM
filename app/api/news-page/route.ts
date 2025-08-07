
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/authOptions"
import { flattenStrapiResponse } from '@/app/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.jwt) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.jwt}`,
    };

    try {
        const [articlesRes, categoriesRes, authorsRes, commentsRes] = await Promise.all([
            fetch(`${process.env.STRAPI_URL}/api/articles?populate[author][populate]=avatar&populate[category]=true&populate[cover]=true&pagination[page]=1&pagination[pageSize]=4&sort[0]=publishedAt:desc`, { headers }),
            fetch(`${process.env.STRAPI_URL}/api/categories?populate=cover`, { headers }),
            fetch(`${process.env.STRAPI_URL}/api/authors?populate=avatar`, { headers }),
            fetch(`${process.env.STRAPI_URL}/api/comments?sort=createdAt:desc&pagination[limit]=5&populate[user]=true`, { headers })

        ]);


        const [articles, categories, authors, comments] = await Promise.all([
            articlesRes.json(),
            categoriesRes.json(),
            authorsRes.json(),
            commentsRes.json(),
        ]);

        return NextResponse.json({
            articles: flattenStrapiResponse(articles.data),
            categories: flattenStrapiResponse(categories.data),
            authors: flattenStrapiResponse(authors.data),
            recentComments: flattenStrapiResponse(comments.data),
        });
    } catch (error) {
        console.error('Error fetching combined news page data:', error);
        return NextResponse.json({ message: 'Failed to load data' }, { status: 500 });
    }
}
