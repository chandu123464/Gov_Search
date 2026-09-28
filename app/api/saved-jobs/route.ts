import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { scheduleRemindersForSavedJob, notifyUser } from "@/lib/reminders";
import { calculateJobStatus } from "@/lib/date-utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user, error } = await requireUser();
  if (error || !user) return error!;

  const saved = await prisma.savedJob.findMany({
    where: { userId: user.id },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    jobs: saved.map((row) => ({
      ...row.job,
      calculatedStatus: calculateJobStatus(row.job.start_date, row.job.last_date),
      savedAt: row.createdAt,
    })),
    slugs: saved.map((row) => row.job.slug),
    ids: saved.map((row) => row.jobId),
  });
}

export async function POST(request: Request) {
  const { user, error } = await requireUser();
  if (error || !user) return error!;

  const body = await request.json().catch(() => ({}));
  const job = await prisma.governmentJob.findFirst({
    where: { OR: [{ id: body.jobId || "" }, { slug: body.slug || body.jobId || "" }] },
  });
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const existing = await prisma.savedJob.findUnique({
    where: { userId_jobId: { userId: user.id, jobId: job.id } },
  });

  if (existing) {
    await prisma.savedJob.delete({ where: { id: existing.id } });
    const remaining = await prisma.savedJob.findMany({ where: { userId: user.id }, include: { job: true } });
    await prisma.user.update({
      where: { id: user.id },
      data: { saved_jobs: JSON.stringify(remaining.map((r) => r.job.slug)) },
    });
    return NextResponse.json({ saved: false, slug: job.slug, ids: remaining.map((r) => r.jobId) });
  }

  await prisma.savedJob.create({ data: { userId: user.id, jobId: job.id } });
  await scheduleRemindersForSavedJob(user.id, job.id);
  await notifyUser(
    user.id,
    `Saved: ${job.post_name}`,
    `We will remind you before ${job.organization_name} closes applications.`,
    `/job/${job.slug}`,
    "success"
  );

  const remaining = await prisma.savedJob.findMany({ where: { userId: user.id }, include: { job: true } });
  await prisma.user.update({
    where: { id: user.id },
    data: { saved_jobs: JSON.stringify(remaining.map((r) => r.job.slug)) },
  });

  return NextResponse.json({ saved: true, slug: job.slug, ids: remaining.map((r) => r.jobId) });
}
