export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  photoUrl: string | null;
}

export interface Reaction {
  count: number;
  user_ids: string[];
}

export interface ParentComment {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Content: string;
  likes: Reaction | null;
  dislikes: Reaction | null;
}

export interface Comment {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Content: string;
  likes: Reaction | null;
  dislikes: Reaction | null;
  replies: Comment[];
  user: User;
  parent: ParentComment | null;
  repliesCount: number;
}

export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Cover {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar: Cover;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  cover: Cover;
}

export interface ArticleData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  excerpt: string | null;
  type: string | null;
  comments: Comment[];
  cover: Cover;
  author: Author;
  category: Category;
}

export interface ApiResponse {
  data: ArticleData;
  meta: {};
}


export type Article = ArticleData;
export type RecentComment = Comment;
