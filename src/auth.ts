import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';
import GitHub from 'next-auth/providers/github';
import GitLab from 'next-auth/providers/gitlab';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { oauthLogin, verifyLogin } from '@/lib/queries/auth';
import type { User as AppUser } from '@/types';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      image?: string | null;
      provider?: 'passwordless' | 'google' | 'github' | 'discord' | 'gitlab';
      providerId?: string | null;
      emailVerified?: boolean;
      active: boolean;
      isAdmin?: boolean;
    };
    backendToken?: string;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    image?: string | null;
    provider?: 'passwordless' | 'google' | 'github' | 'discord' | 'gitlab';
    providerId?: string | null;
    emailVerified?: boolean;
    active: boolean;
    isAdmin?: boolean;
    backendToken?: string;
  }
}

interface ExtendedJWT {
  provider?: 'passwordless' | 'google' | 'github' | 'discord' | 'gitlab';
  username?: string;
  emailVerified?: boolean;
  sub?: string;
  active?: boolean;
  isAdmin?: boolean;
  backendToken?: string;
}

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GitLab({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
    }),

    Credentials({
      id: 'passwordless',
      name: 'email',
      credentials: {
        identifier: { label: 'username or email', type: 'text' },
        code: { label: 'code', type: 'text' },
      },
      async authorize(credentials) {
        const { identifier, code } = credentials as {
          identifier: string;
          code: string;
        };

        try {
          const response = await verifyLogin(identifier, code);

          if (response?.user && response?.access_token) {
            return {
              id: response.user.id,
              username: response.user.username,
              email: response.user.email,
              image: response.user.image,
              provider: 'passwordless',
              emailVerified: response.user.emailVerified,
              active: response.user.active,
              backendToken: response.access_token,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== 'passwordless') {
        try {
          const response = await oauthLogin({
            provider: account?.provider as 'google' | 'github' | 'discord' | 'gitlab',
            providerId: account?.providerAccountId ?? user.id,
            email: user.email,
            name: profile?.name ?? user.name,
            image: user.image,
          });

          if (response?.user && response?.access_token) {
            user.id = response.user.id;
            user.username = response.user.username;
            user.email = response.user.email;
            user.image = response.user.image;
            user.provider = response.user.provider;
            user.emailVerified = response.user.emailVerified;
            user.active = response.user.active;
            user.isAdmin = response.user.isAdmin;
            user.backendToken = response.access_token;

            return true;
          }

          return false;
        } catch (error) {
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.username = user.username;
        token.provider = user.provider;
        token.emailVerified = user.emailVerified;
        token.active = user.active;
        token.isAdmin = user.isAdmin;
        token.backendToken = user.backendToken;
      }

      return token;
    },
    async session({ session, token }) {
      const extendedToken = token as ExtendedJWT;

      if (session.user) {
        session.user.id = extendedToken.sub ?? '';
        session.user.username = extendedToken.username ?? '';
        session.user.email = session.user.email ?? '';
        session.user.provider = extendedToken.provider;
        session.user.active = extendedToken.active ?? false;
        session.user.isAdmin = extendedToken.isAdmin;
      }

      session.backendToken = extendedToken.backendToken;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
