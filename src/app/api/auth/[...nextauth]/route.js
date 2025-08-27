import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(process.cwd(), "ca.pem")).toString(),
  },
});

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email user-follow-read",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
        console.log("User signing in:", user);
        console.log("Profile info:", profile);
        console.log("Account info:", account);
        console.log("pooling")
        console.log("DATABASE_URL:", process.env.DATABASE_URL);
        const client = await pool.connect();
        console.log("pooled")
        try {
          // Insert or update the user
          await client.query(
            `
            INSERT INTO users (username, email, spotify_id, image_url, first_login, most_recent_login)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            ON CONFLICT (email)
            DO UPDATE SET most_recent_login = NOW()
            `,
            [user.name || profile.display_name, user.email, user.id, user.image]
          );
        } finally {
          client.release();
        }
        return true; // allow sign in
      },
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
        }
        return token;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        return session;
      },
    },
});

export { handler as GET, handler as POST };
