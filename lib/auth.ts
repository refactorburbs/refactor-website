// Better Auth Instance creation and configuration. https://better-auth.com/docs/installation#create-a-better-auth-instance
// Uses our database to store user data (SQL based) https://www.prisma.io/docs/guides/authentication/better-auth/nextjs

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // baseURL: process.env.BETTER_AUTH_URL,
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   },
  // },
}); // @TODO comment the google provider back in when we get keys after setting up in Google Console (need Nate or Summer probably)
// https://better-auth.com/docs/authentication/google