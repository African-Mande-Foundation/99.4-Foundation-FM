// schedule.ts
export interface Show {
  start: string; // "07:00"
  end: string;   // "09:00"
  title: string;
  genre: string;
  days: ("Mon-Fri" | "Sat" | "Sun")[];
}

export const schedule: Show[] = [
  // Monday – Friday
  { start: "07:00", end: "09:00", title: "Rush Hour", genre: "Music / Talk", days: ["Mon-Fri"] },
  { start: "09:00", end: "10:00", title: "The Morning Barbecue", genre: "Talk", days: ["Mon-Fri"] },
  { start: "10:00", end: "12:00", title: "Sports Bus", genre: "Sports", days: ["Mon-Fri"] },
  { start: "13:00", end: "14:00", title: "Afternoon Strain", genre: "Music", days: ["Mon-Fri"] },
  { start: "16:00", end: "17:00", title: "Evening Tone", genre: "Music", days: ["Mon-Fri"] },
  { start: "17:30", end: "18:00", title: "BBC Media Action (Haya fi Lulu Drama)", genre: "Drama", days: ["Mon-Fri"] },
  { start: "18:00", end: "18:30", title: "End of Day Program", genre: "Talk", days: ["Mon-Fri"] },
  { start: "18:30", end: "19:00", title: "South Sudan in Focus (VOA)", genre: "News", days: ["Mon-Fri"] },
  { start: "19:00", end: "19:30", title: "Our Health", genre: "Health", days: ["Mon-Fri"] },
  { start: "19:30", end: "20:00", title: "BBC Media Action (Sot bitanina)", genre: "Drama", days: ["Mon-Fri"] },

  // Saturday
  { start: "07:00", end: "09:00", title: "Weekend Xtra", genre: "Music", days: ["Sat"] },
  { start: "10:00", end: "12:00", title: "The Sutake Blow", genre: "Talk", days: ["Sat"] },
  { start: "13:00", end: "14:00", title: "Sports Bus", genre: "Sports", days: ["Sat"] },
  { start: "16:00", end: "17:00", title: "Education Program", genre: "Education", days: ["Sat"] },
  { start: "18:00", end: "19:00", title: "Our Culture", genre: "Culture", days: ["Sat"] },
  { start: "19:00", end: "20:00", title: "The Oldies", genre: "Music", days: ["Sat"] },

  // Sunday
  { start: "07:00", end: "09:00", title: "Sunday Glory", genre: "Religious", days: ["Sun"] },
  { start: "10:00", end: "12:00", title: "The Gospel Hit", genre: "Religious", days: ["Sun"] },
  { start: "13:00", end: "14:00", title: "Sports Bus", genre: "Sports", days: ["Sun"] },
  { start: "16:00", end: "17:00", title: "Voice of Our Kids", genre: "Kids", days: ["Sun"] },
  { start: "18:00", end: "19:00", title: "Law Above All", genre: "Talk", days: ["Sun"] },
];
