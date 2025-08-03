import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    jwt?: string;
    id?: string;
    name?: string | null;
    email?: string | null;
    photoUrl?: string | null;
  }
  interface Session {
    jwt?: string;
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      photoUrl?: string | null;
    };
  }
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error('Email/username and password are required');
        }

        try {
          const strapiRes = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identifier: credentials.identifier,
              password: credentials.password,
            }),
          });

          if (!strapiRes.ok) {
            const errorData = await strapiRes.json();
            throw new Error(errorData.error?.message || 'Login failed');
          }

          const data = await strapiRes.json();
          return {
            id: data.user.id.toString(),
            name: data.user.username,
            email: data.user.email,
            photoUrl: data.user.photoUrl?.url || data.user.photoUrl || null,
            jwt: data.jwt,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.photoUrl = user.photoUrl;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.jwt) {
        session.jwt = token.jwt as string;
        session.user = {
          id: token.id as string,
          name: token.name || null,
          email: token.email || null,
          photoUrl: typeof token.photoUrl === 'string' ? token.photoUrl : null,
        };
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};
