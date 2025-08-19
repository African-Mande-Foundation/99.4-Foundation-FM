"use client";

import { useEffect, useState } from "react";
import { getLiveShow } from "@/app/lib/liveNow";
import { schedule, Show } from "@/app/lib/schedule";
import { useCalendar } from "../lib/calendar";

const days: { label: string; value: "Mon-Fri" | "Sat" | "Sun" }[] = [
  { label: "Mon–Fri", value: "Mon-Fri" },
  { label: "Saturday", value: "Sat" },
  { label: "Sunday", value: "Sun" },
];

export default function LiveNow() {
  const [liveShow, setLiveShow] = useState<(Show & { progress: number }) | null>(null);
  const [selectedDay, setSelectedDay] = useState<"Mon-Fri" | "Sat" | "Sun">("Mon-Fri");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { downloadICSFeed, downloadShowReminder } = useCalendar();

  useEffect(() => {
    setLiveShow(getLiveShow());
    const timer = setInterval(() => setLiveShow(getLiveShow()), 60_000);
    return () => clearInterval(timer);
  }, []);

 const categories = [
  "All",
  ...Array.from(
    new Set(
      schedule
        .filter((s) => s.days.includes(selectedDay)) // only shows in current day
        .map((s) => s.genre)
    )
  ),
];

  const filteredShows = schedule.filter(
    (show) =>
      show.days.includes(selectedDay) &&
      (selectedCategory === "All" || show.genre === selectedCategory)
  );

  return (
    <div className="bg-white min-h-screen p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Live Banner */}
        {liveShow ? (
          <div className="p-6 rounded-lg bg-gradient-to-r from-[#03A0B4] to-indigo-700 text-white shadow-lg">
            <h2 className="text-sm uppercase tracking-wide">On Air Now</h2>
            <p className="text-2xl font-bold">{liveShow.title}</p>
            <p className="text-sm opacity-80">
              {liveShow.start} – {liveShow.end} (South Sudan Time)
            </p>
            <div className="mt-3 w-full bg-white/30 h-2 rounded-full overflow-hidden">
              <div
                className="h-2 bg-white transition-all duration-500"
                style={{ width: `${liveShow.progress}%` }}
              />
            </div>
            <p className="text-xs mt-1 opacity-80">
              {liveShow.progress.toFixed(0)}% through this show
            </p>
          </div>
        ) : (
          <div className="p-6 rounded-lg bg-purple-50 text-[#03A0B4] border border-purple-200">
            <h2 className="text-sm font-semibold">Nothing live right now</h2>
            <p className="text-sm">
              We'll light up this banner automatically when a show is on air for the selected day.
            </p>
          </div>
        )}

        {/* Day Tabs */}
        <div className="flex gap-3">
          {days.map((day) => (
            <button
              key={day.value}
              onClick={() => setSelectedDay(day.value)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedDay === day.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
<div className="flex flex-wrap gap-2">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-3 py-1 rounded-full text-sm border transition ${
        selectedCategory === cat
          ? "bg-[#03A0B4] text-white border-[#03A0B4]"
          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
      }`}
    >
      {cat}
    </button>
  ))}
</div>

        {/* Timeline */}
        <div>
          <h3 className="text-lg text-[#03A0B4] font-semibold mb-4">
            {days.find((d) => d.value === selectedDay)?.label} Timeline
          </h3>
          <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
            {filteredShows.map((show, i) => (
              <div
                key={i}
                className="relative bg-white p-4 rounded-lg shadow flex items-center justify-between"
              >
                {/* timeline dot */}
                <div className="absolute -left-[14px] top-6 w-3 h-3 bg-[#03A0B4] rounded-full border-2 border-white" />

                {/* content */}
                <div>
                  <p className="text-sm text-gray-500">
                    {show.start} – {show.end}
                  </p>
                  <p className="font-semibold text-gray-700">{show.title}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
                    {show.genre}
                  </span>
                </div>

                {/* set reminder */}
                <button className="ml-4 px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition" onClick={downloadICSFeed}>
                  Set Reminder →
                </button>
              </div>
            ))}
          </div>

          {filteredShows.length === 0 && (
            <p className="text-sm text-gray-500 mt-4">No shows scheduled for this filter.</p>
          )}
        </div>

        {/* Footer CTA */}
<section className="mt-10">
  <div className="border rounded-lg shadow bg-white">
    <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        <h3 className="text-xl text-[#03A0B4] font-semibold">
          Want this embedded on your homepage?
        </h3>
        <p className="text-gray-500">
          Use this Programme component as a section, or split the “On Air Now” banner for a hero area.
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={downloadICSFeed} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
          Get iCal Feed
        </button>

      </div>
    </div>
  </div>
</section>

      </div>
    </div>
  );
}
