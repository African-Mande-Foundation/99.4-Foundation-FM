// liveNow.ts
import { schedule, Show } from "./schedule";

function getSouthSudanTime(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Juba" })
  );
}

function toMinutes(hm: string): number {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

export function getLiveShow(): (Show & { progress: number }) | null {
  const now = getSouthSudanTime();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const currentTime = now.toTimeString().slice(0, 5);

  const day = now.getDay(); // 0=Sun, 6=Sat
  const dayLabel = day === 6 ? "Sat" : day === 0 ? "Sun" : "Mon-Fri";

  const show = schedule.find((s) => {
    if (!s.days.includes(dayLabel)) return false;
    return currentTime >= s.start && currentTime < s.end;
  });

  if (!show) return null;

  const startM = toMinutes(show.start);
  const endM = toMinutes(show.end);
  const progress = Math.min(100, ((currentMinutes - startM) / (endM - startM)) * 100);

  return { ...show, progress };
}
