import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { processDueReminders } from "@/lib/reminders";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user, error } = await requireUser();
  if (error || !user) return error!;

  await processDueReminders().catch(() => undefined);

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
  });
  const unread = notifications.filter((n) => !n.read).length;
  return NextResponse.json({ notifications, unread });
}

export async function PATCH(request: Request) {
  const { user, error } = await requireUser();
  if (error || !user) return error!;
  const body = await request.json().catch(() => ({}));

  if (body.all) {
    await prisma.notification.updateMany({
      where: { userId: user.id, read: false },
      data: { read: true },
    });
  } else if (body.id) {
    await prisma.notification.updateMany({
      where: { id: body.id, userId: user.id },
      data: { read: true },
    });
  }

  return NextResponse.json({ success: true });
}
