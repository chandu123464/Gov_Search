import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { notifyUser } from "@/lib/reminders";

export const dynamic = "force-dynamic";

export async function GET() {
  const { user, error } = await requireUser();
  if (error || !user) return error!;

  const applications = await prisma.examApplication.findMany({
    where: { userId: user.id },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ applications });
}

export async function POST(request: Request) {
  const { user, error } = await requireUser();
  if (error || !user) return error!;

  const body = await request.json();
  if (!body.examName || !body.organization) {
    return NextResponse.json({ error: "Exam name and organization are required." }, { status: 400 });
  }

  let jobId: string | null = null;
  if (body.jobId || body.slug) {
    const job = await prisma.governmentJob.findFirst({
      where: { OR: [{ id: body.jobId || "" }, { slug: body.slug || "" }] },
    });
    jobId = job?.id || null;
  }

  const application = await prisma.examApplication.create({
    data: {
      userId: user.id,
      jobId,
      examName: String(body.examName).trim(),
      organization: String(body.organization).trim(),
      registrationNo: body.registrationNo || null,
      status: body.status || "APPLIED",
      admitCardStatus: body.admitCardStatus || "PENDING",
      resultStatus: body.resultStatus || null,
      appliedAt: body.appliedAt ? new Date(body.appliedAt) : new Date(),
      examDate: body.examDate ? new Date(body.examDate) : null,
      feeAmount: body.feeAmount || null,
      notes: body.notes || null,
      officialUrl: body.officialUrl || null,
    },
  });

  await notifyUser(
    user.id,
    `Application saved: ${application.examName}`,
    "Track admit card and result status from My Applications.",
    "/dashboard?tab=my_applications",
    "success"
  );

  return NextResponse.json({ application }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { user, error } = await requireUser();
  if (error || !user) return error!;

  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "Application id is required." }, { status: 400 });

  const existing = await prisma.examApplication.findFirst({
    where: { id: body.id, userId: user.id },
  });
  if (!existing) return NextResponse.json({ error: "Application not found." }, { status: 404 });

  const application = await prisma.examApplication.update({
    where: { id: existing.id },
    data: {
      status: body.status ?? existing.status,
      admitCardStatus: body.admitCardStatus ?? existing.admitCardStatus,
      resultStatus: body.resultStatus !== undefined ? body.resultStatus : existing.resultStatus,
      registrationNo: body.registrationNo !== undefined ? body.registrationNo : existing.registrationNo,
      notes: body.notes !== undefined ? body.notes : existing.notes,
      officialUrl: body.officialUrl !== undefined ? body.officialUrl : existing.officialUrl,
      examDate: body.examDate ? new Date(body.examDate) : existing.examDate,
    },
  });

  return NextResponse.json({ application });
}

export async function DELETE(request: Request) {
  const { user, error } = await requireUser();
  if (error || !user) return error!;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const existing = await prisma.examApplication.findFirst({ where: { id, userId: user.id } });
  if (!existing) return NextResponse.json({ error: "Application not found." }, { status: 404 });
  await prisma.examApplication.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
