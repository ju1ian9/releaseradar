"use client";
import React, { useMemo, useState } from "react";
import { MOCK_ARTISTS, MOCK_RELEASES, MOCK_UPCOMING } from "@/lib/mockData";
import { groupByDate, fmtDate } from "@/lib/utils";
import FollowedArtistsList from "./FollowedArtistsList";
import ReleasesPanel from "./ReleasesPanel";
import UpcomingPanel from "./UpcomingPanel";
import AuthStatus from "./AuthStatus";


export default function ReleaseRadarUI() {
  const [query, setQuery] = useState("");
  const [allArtists] = useState(MOCK_ARTISTS);
  const [followed, setFollowed] = useState(MOCK_ARTISTS.slice(0, 6));
  const [releases, setReleases] = useState(MOCK_RELEASES);

  const grouped = useMemo(() => groupByDate(releases), [releases]);
  const dateKeys = useMemo(
    () => Object.keys(grouped).sort((a, b) => (a > b ? -1 : 1)),
    [grouped]
  );

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return allArtists
      .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
  }, [query, allArtists]);

  function follow(artist) {
    if (followed.find((f) => f.id === artist.id)) return;
    setFollowed((f) => [artist, ...f]);
    setQuery("");
  }

  function unfollow(id) {
    setFollowed((f) => f.filter((x) => x.id !== id));
  }

  function refresh() {
    setReleases((r) => [...r]);
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200">
      <header className="px-6 py-5 border-b border-zinc-800 flex justify-between items-center">
        <div className="text-3xl font-semibold tracking-wide">Release Radar</div>
        <AuthStatus />
      </header>

      <main className="grid grid-cols-12 gap-6 p-6 max-w-7xl mx-auto">
        <FollowedArtistsList
          query={query}
          setQuery={setQuery}
          searchResults={searchResults}
          followed={followed}
          follow={follow}
          unfollow={unfollow}
        />
        <ReleasesPanel grouped={grouped} dateKeys={dateKeys} refresh={refresh} />
        <UpcomingPanel />
      </main>
    </div>
  );
}
