import { betterAuth, Session, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db/client";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  advanced: { database: { generateId: false } },
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: true },

  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },

  callbacks: {
    async session({ session, user }: { session: Session; user: User | null }) {
      if (user?.role) {
        session.user.role = user.role;
      }
      return session;
    },
  },

  plugins: [nextCookies()],
});
