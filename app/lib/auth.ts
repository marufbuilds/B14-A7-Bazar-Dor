 import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  process.env.MONGODB_CONNECTION_STRING!
);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },

    google: {
      clientId: process.env.BETTER_AUTH_GOGGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOGGLE_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(client.db(), {
    client,
  }),
});