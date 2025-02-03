/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();

        if (credentials === null) return null;

        const user = await UserModel.findOne({ email: credentials.email });

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (isMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/register",
    error: "/signin",
  },
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      const { pathname } = request.nextUrl;

      if (protectedPaths.some((path) => path.test(pathname))) return !!auth;
      return true;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      }

      if (trigger === "update" && session) {
        token.user = {
          _id: token.user?._id ?? "",
          isAdmin: token.user?.isAdmin ?? false,
          email: session.user?.email ?? "",
          name: session.user?.name ?? "",
        };
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token && token.user) {
        session.user = {
          ...token.user,
          name: token.user.name || "",
        };
      }

      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
