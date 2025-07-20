import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb"; // your MongoDB connection

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.name = profile.name;
        token.picture = profile.avatar_url;
        token.username = profile.login; // GitHub username
        token.email = profile.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            name: token.name,
            email: token.email,
            image: token.picture,
            username: token.username, // Ensure this comes through
          },
        };
      }
      return session;
    },
  },
};
