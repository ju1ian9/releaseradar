"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (session) {
    // Print credentials, token, and user info
    console.log('Session:', session);
    if (session.accessToken) console.log('Access Token:', session.accessToken);
    if (session.refreshToken) console.log('Refresh Token:', session.refreshToken);
    if (session.user) console.log('User Info:', session.user);
  }

  if (status === "loading") {
    return <p className="text-zinc-400">Loading...</p>;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("spotify")}
        className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
      >
        Sign in with Spotify
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span>Welcome back, {session.user?.name || "Spotify User"}!</span>
      <button
        onClick={() => signOut()}
        className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
      >
        Sign out
      </button>
    </div>
  );
}
