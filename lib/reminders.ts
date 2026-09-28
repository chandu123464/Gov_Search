import { prisma } from "./prisma";
import { sendEmail, sendWhatsApp, reminderEmailHtml, getAppBaseUrl } from "./alerts";
import { formatDateIndian } from "./date-utils";

const DEFAULT_WINDOWS = [7, 3, 1];

export async function scheduleRemindersForSavedJob(userId: string, jobId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const channels: string[] = ["inapp"];
  if (user.email_alerts) channels.push("email");
  if (user.whatsapp_alerts && user.mobile) channels.push("whatsapp");

  for (const daysBefore of DEFAULT_WINDOWS) {
    for (const channel of channels) {
      await prisma.reminder.upsert({
        where: {
          userId_jobId_channel_daysBefore: { userId, jobId, channel, daysBefore },
        },
        update: {},
        create: { userId, jobId, channel, daysBefore },
      });
    }
  }
}

export async function processDueReminders() {
  const now = new Date();
  const pending = await prisma.reminder.findMany({
    where: { sent: false },
    include: { user: true, job: true },
    take: 50,
  });

  let sent = 0;
  for (const reminder of pending) {
    const last = new Date(reminder.job.last_date);
    last.setHours(23, 59, 59, 999);
    const diffDays = Math.ceil((last.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      await prisma.reminder.update({ where: { id: reminder.id }, data: { sent: true, sentAt: now } });
      continue;
    }
    if (diffDays > reminder.daysBefore) continue;

    const jobUrl = `${getAppBaseUrl()}/job/${reminder.job.slug}`;
    const lastDate = formatDateIndian(reminder.job.last_date);
    const title = `${reminder.job.post_name} closes in ${diffDays} day(s)`;
    const message = `${reminder.job.organization_name} · last date ${lastDate}`;

    if (reminder.channel === "inapp") {
      await prisma.notification.create({
        data: {
          userId: reminder.userId,
          title,
          message,
          type: diffDays <= 1 ? "warning" : "info",
          link: `/job/${reminder.job.slug}`,
        },
      });
    } else if (reminder.channel === "email" && reminder.user.email_alerts) {
      await sendEmail({
        to: reminder.user.email,
        subject: `GovSearch: ${title}`,
        text: `Dear ${reminder.user.full_name},\n\n${message}\nApply: ${jobUrl}`,
        html: reminderEmailHtml({
          name: reminder.user.full_name,
          postName: reminder.job.post_name,
          organization: reminder.job.organization_name,
          lastDate,
          daysLeft: diffDays,
          jobUrl,
        }),
      });
    } else if (reminder.channel === "whatsapp" && reminder.user.whatsapp_alerts && reminder.user.mobile) {
      await sendWhatsApp({
        to: reminder.user.mobile,
        message: `GovSearch alert: ${title}. ${message}. ${jobUrl}`,
      });
    }

    await prisma.reminder.update({
      where: { id: reminder.id },
      data: { sent: true, sentAt: now },
    });
    sent += 1;
  }

  return { processed: pending.length, sent };
}

export async function notifyUser(userId: string, title: string, message: string, link?: string, type = "info") {
  return prisma.notification.create({
    data: { userId, title, message, link, type },
  });
}
