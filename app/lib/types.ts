export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
  author?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  category?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  cover?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    url: string;
  };
  comments?: Comment[];
}

export interface Comment {
  id: number;
  documentId: string;
  Content: string;
  createdAt: string;
  profile?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
    photoUrl?: string;
  };
  replies?: {
    data: Comment[];
  };
  parent?: {
    id: number;
    documentId: string;
    Content: string;
  };
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export interface RecentComment {
  id: number;
  documentId: string;
  Content: string;
  createdAt: string;
  profile?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
    photoUrl?: string;
  };
}
