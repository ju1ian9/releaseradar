"use client";
import React from "react";
import { fmtDate } from "@/lib/utils";

export default function ReleasesPanel({ grouped, dateKeys, refresh }) {
  return (
    <section className="col-span-6 bg-zinc-950/40 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="font-medium">Latest Releases</div>
        <button
          onClick={refresh}
          className="text-sm rounded-lg border border-zinc-700 px-3 py-1 hover:bg-zinc-800"
        >
          Refresh ↻
        </button>
      </div>

      <div>
        {dateKeys.map((date) => (
          <div key={date}>
            <div className="bg-zinc-800/50 px-4 py-2 text-sm font-medium">
              {fmtDate(date)}
            </div>
            <ul>
              {grouped[date].map((r) => (
                <li
                  key={r.id}
                  className="grid grid-cols-12 items-center gap-3 px-4 py-3 border-b border-zinc-800 hover:bg-zinc-900/60"
                >
                  <div className="col-span-1 h-7 w-7 rounded-sm bg-zinc-700" />
                  <div className="col-span-6 truncate">
                    <div className="font-medium truncate">{r.title}</div>
                    <div className="text-xs text-zinc-400 truncate">{r.artist}</div>
                  </div>
                  <div className="col-span-4 text-sm text-zinc-300 truncate">
                    {r.label}
                  </div>
                  <button className="col-span-1 text-xs rounded-md border border-zinc-700 px-2 py-1 hover:bg-zinc-800">
                    Play
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
