// app/lib/calendar.ts
import { schedule, Show } from "./schedule";
import { useToast } from "@/app/program/toast";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDate(d: Date) {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    "00Z"
  );
}

// 🔹 Generate a VEVENT block
function generateEvent(show: Show, day: string) {
  const now = new Date();

  // Expand Mon-Fri into actual days
  const days =
    day === "Mon-Fri" ? ["Mon", "Tue", "Wed", "Thu", "Fri"] : [day];

  return days
    .map((d) => {
      const eventDate = new Date(now);

      const dayMap: Record<string, number> = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
      };

      const targetDay = dayMap[d];
      const diff = (targetDay + 7 - eventDate.getDay()) % 7;
      eventDate.setDate(eventDate.getDate() + diff);

      const [sh, sm] = show.start.split(":").map(Number);
      const [eh, em] = show.end.split(":").map(Number);

      const startDate = new Date(eventDate);
      startDate.setHours(sh, sm, 0, 0);

      const endDate = new Date(eventDate);
      endDate.setHours(eh, em, 0, 0);

      return `
BEGIN:VEVENT
SUMMARY:${show.title}
DESCRIPTION:${show.genre} show on 99.4 Foundation FM
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
END:VEVENT`.trim();
    })
    .join("\n");
}

// 🔹 Full ICS feed
export function generateICSFeed() {
  const events = schedule
    .map((show) =>
      show.days.map((d) => generateEvent(show, d)).join("\n")
    )
    .join("\n");

  return `
BEGIN:VCALENDAR
VERSION:2.0
${events}
END:VCALENDAR
`.trim();
}

// 🔹 Single show reminder
export function generateShowICS(show: Show) {
  const events = show.days.map((d) => generateEvent(show, d)).join("\n");

  return `
BEGIN:VCALENDAR
VERSION:2.0
${events}
END:VCALENDAR
`.trim();
}

// 🔹 Download helper (shared)
function downloadICS(content: string, filename: string, showToast: (msg: string) => void) {
  const blob = new Blob([content], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);

  // Toast instead of alert
  showToast("✅ Calendar file downloaded. Open it to add to Outlook, Google, or Apple Calendar.");
}

export function useCalendar() {
  const { showToast } = useToast();

  return {
    downloadICSFeed: () =>
      downloadICS(generateICSFeed(), "foundationfm_schedule.ics", showToast),
    downloadShowReminder: (show: Show) =>
      downloadICS(generateShowICS(show), `${show.title}.ics`, showToast),
  };
}
// Public APIs
