import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // 1. MASTER ADMIN (Hardcoded) - Always works first
        if (credentials.email === "admin@skinn.care" && credentials.password === "admin123") {
          return {
            id: "MASTER-ADMIN-01",
            name: "Admin User",
            email: "admin@skinn.care",
            role: "ADMIN",
          };
        }

        // 2. Database Lookup
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (user) {
            // Verify password with bcrypt
            if (!user.password) {
              throw new Error("Invalid email or password");
            }
            const passwordMatch = await bcrypt.compare(credentials.password, user.password);
            if (!passwordMatch) {
              throw new Error("Invalid email or password");
            }
            return user;
          }
        } catch (error) {
          console.error("Database connection failure in Auth:", error);
          throw error;
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      // On first sign-in, merge the user object into the token
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }

      // Try DB lookup, but don't overwrite if not found (e.g. hardcoded master admin)
      try {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email! },
        });

        if (dbUser) {
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
            role: dbUser.role,
          };
        }
      } catch {
        // DB unavailable — fall back to token data
      }

      return token;
    },
  },
};
