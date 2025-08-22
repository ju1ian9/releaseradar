"use client";
import React from "react";
import { MOCK_UPCOMING } from "@/lib/mockData";
import { fmtDate } from "@/lib/utils";

export default function UpcomingPanel() {
  return (
    <aside className="col-span-3 bg-zinc-950/40 border border-zinc-800 rounded-2xl p-4">
      <div className="text-lg font-medium mb-3">Upcoming Releases</div>
      <ul className="space-y-2">
        {MOCK_UPCOMING.map((u) => (
          <li
            key={u.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2"
          >
            <div className="text-sm font-medium truncate">{u.title}</div>
            <div className="text-xs text-zinc-400 truncate">{u.artist}</div>
            <div className="text-xs text-zinc-500">{fmtDate(u.date)}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
