import { JobStatusCalculated } from "./types";

export function calculateJobStatus(
  startDate: string | Date,
  lastDate: string | Date
): JobStatusCalculated {
  const now = new Date();
  const start = new Date(startDate);
  const last = new Date(lastDate);

  // Normalize hours to compare calendar days accurately
  const endOfDay = new Date(last);
  endOfDay.setHours(23, 59, 59, 999);

  if (now < start) {
    return "UPCOMING";
  }

  if (now > endOfDay) {
    return "CLOSED";
  }

  const diffTime = endOfDay.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 3) {
    return "CLOSING SOON";
  }

  return "OPEN";
}

export function getDaysRemainingText(lastDate: string | Date, startDate?: string | Date): {
  text: string;
  badgeType: "urgent" | "warning" | "normal" | "closed" | "upcoming";
  days: number;
} {
  const now = new Date();
  const last = new Date(lastDate);
  const endOfDay = new Date(last);
  endOfDay.setHours(23, 59, 59, 999);

  if (startDate) {
    const start = new Date(startDate);
    if (now < start) {
      const diffStart = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        text: `Starts in ${diffStart} ${diffStart === 1 ? "day" : "days"}`,
        badgeType: "upcoming",
        days: diffStart,
      };
    }
  }

  if (now > endOfDay) {
    return { text: "Closed", badgeType: "closed", days: -1 };
  }

  const diffTime = endOfDay.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return { text: "CLOSING TODAY", badgeType: "urgent", days: diffDays };
  }

  if (diffDays <= 3) {
    return { text: `${diffDays} DAYS LEFT`, badgeType: "urgent", days: diffDays };
  }

  if (diffDays <= 7) {
    return { text: `${diffDays} DAYS LEFT`, badgeType: "warning", days: diffDays };
  }

  return { text: `${diffDays} days left`, badgeType: "normal", days: diffDays };
}

export function formatDateIndian(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "To be announced";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "To be announced";

  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function generateGoogleCalendarUrl(job: {
  post_name: string;
  organization_name: string;
  last_date: string | Date;
  application_url?: string;
  official_website?: string;
}): string {
  const last = new Date(job.last_date);
  // Set reminder event on the last date from 09:00 to 18:00
  const startIso = new Date(last.getFullYear(), last.getMonth(), last.getDate(), 9, 0, 0)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "");
  const endIso = new Date(last.getFullYear(), last.getMonth(), last.getDate(), 18, 0, 0)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "");

  const title = encodeURIComponent(`Last Date: ${job.post_name} (${job.organization_name})`);
  const details = encodeURIComponent(
    `Reminder: Today is the last date to apply for ${job.post_name} at ${job.organization_name}!\nApply Link: ${job.application_url || job.official_website || ""}`
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}`;
}

export function generateIcsData(job: {
  id: string;
  post_name: string;
  organization_name: string;
  last_date: string | Date;
  application_url?: string;
}): string {
  const last = new Date(job.last_date);
  const y = last.getFullYear();
  const m = String(last.getMonth() + 1).padStart(2, "0");
  const d = String(last.getDate()).padStart(2, "0");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GovSearch//Government Jobs Portal//EN",
    "BEGIN:VEVENT",
    `UID:${job.id}@govsearch.portal`,
    `DTSTAMP:${y}${m}${d}T090000Z`,
    `DTSTART:${y}${m}${d}T090000Z`,
    `DTEND:${y}${m}${d}T180000Z`,
    `SUMMARY:Last Date to Apply: ${job.post_name} - ${job.organization_name}`,
    `DESCRIPTION:Today is the last date to apply for ${job.post_name} at ${job.organization_name}. Apply here: ${job.application_url || ""}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT12H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: Last Date for ${job.post_name}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

