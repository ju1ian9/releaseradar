"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function FollowedArtistsList({
  query,
  setQuery,
  followed,
  follow,
  unfollow,
}) {

  const [searchResults, setSearchResults] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    if (!session?.accessToken) return;

    const fetchArtists = async () => {
      try {
        const res = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query
          )}&type=artist&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        const data = await res.json();
        setSearchResults(data.artists?.items || []);
      } catch (err) {
        console.error("Spotify search error:", err);
      }
    };

    // debounce: wait 300ms after typing
    const timeout = setTimeout(fetchArtists, 300);
    return () => clearTimeout(timeout);
  }, [query, session?.accessToken]);


  return (
    <aside className="col-span-3 bg-zinc-950/40 border border-zinc-800 rounded-2xl p-4">
      <div className="text-lg font-medium mb-4">Followed Artists</div>

      <div className="relative mb-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artists…"
          className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-600"
        />
        {!!query && (
          <div className="absolute left-0 right-0 top-11 z-10 rounded-xl border border-zinc-800 bg-zinc-900/95 shadow-lg">
            {searchResults.length === 0 ? (
              <div className="px-3 py-2 text-sm text-zinc-400">No results</div>
            ) : (
              searchResults.map((a) => (
                <button
                  key={a.id}
                  onClick={() => follow(a)}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-800/60"
                >
                  + Follow {a.name}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <ul className="space-y-2 max-h-[60vh] overflow-auto pr-1">
        {followed.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-zinc-700" />
              <span className="truncate">{a.name}</span>
            </div>
            <button
              onClick={() => unfollow(a.id)}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              Unfollow
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}