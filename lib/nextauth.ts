import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { prisma } from './prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string;
      email?: string;
      image?: string;
      id?: string;
      isAdmin?: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isAdmin: boolean;
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid Credentials');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('Invalid Credentials');
        }

        const isCorrectPassword = await bcryptjs.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid Credentials');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isAdmin: token.isAdmin,
        },
      };
    },
    async jwt({ token }) {
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      token.id = token.sub!;
      token.isAdmin = user?.isAdmin!;
      return {
        ...token,
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
