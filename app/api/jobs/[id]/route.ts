import { NextRequest, NextResponse } from "next/server";
import { getJobByIdOrSlug } from "@/lib/jobs-service";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await getJobByIdOrSlug(params.id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to retrieve job" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const existing = await prisma.governmentJob.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
    });

    if (!existing) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Validation if dates updated
    const startDate = body.start_date ? new Date(body.start_date) : existing.start_date;
    const lastDate = body.last_date ? new Date(body.last_date) : existing.last_date;

    if (lastDate < startDate) {
      return NextResponse.json({ error: "Last date cannot be earlier than start date" }, { status: 400 });
    }

    const updatedJob = await prisma.governmentJob.update({
      where: { id: existing.id },
      data: {
        post_name: body.post_name ?? existing.post_name,
        organization_name: body.organization_name ?? existing.organization_name,
        department: body.department ?? existing.department,
        government_field: body.government_field ?? existing.government_field,
        government_level: body.government_level ?? existing.government_level,
        state: body.state ?? existing.state,
        qualification: body.qualification ?? existing.qualification,
        qualification_level: body.qualification_level ?? existing.qualification_level,
        specific_discipline: body.specific_discipline !== undefined ? body.specific_discipline : existing.specific_discipline,
        exact_qual_required: body.exact_qual_required !== undefined ? Boolean(body.exact_qual_required) : existing.exact_qual_required,
        number_of_posts: body.number_of_posts ? Number(body.number_of_posts) : existing.number_of_posts,
        salary_min: body.salary_min !== undefined ? (body.salary_min ? Number(body.salary_min) : null) : existing.salary_min,
        salary_max: body.salary_max !== undefined ? (body.salary_max ? Number(body.salary_max) : null) : existing.salary_max,
        salary_text: body.salary_text ?? existing.salary_text,
        age_min: body.age_min !== undefined ? Number(body.age_min) : existing.age_min,
        age_max: body.age_max !== undefined ? Number(body.age_max) : existing.age_max,
        age_relaxation: body.age_relaxation !== undefined ? body.age_relaxation : existing.age_relaxation,
        selection_process: body.selection_process ?? existing.selection_process,
        application_fee_sc_st: body.application_fee_sc_st ?? existing.application_fee_sc_st,
        application_fee_obc: body.application_fee_obc ?? existing.application_fee_obc,
        application_fee_general: body.application_fee_general ?? existing.application_fee_general,
        application_fee_other: body.application_fee_other !== undefined ? body.application_fee_other : existing.application_fee_other,
        start_date: startDate,
        last_date: lastDate,
        exam_date: body.exam_date ? new Date(body.exam_date) : existing.exam_date,
        admit_card_date: body.admit_card_date ? new Date(body.admit_card_date) : existing.admit_card_date,
        result_date: body.result_date ? new Date(body.result_date) : existing.result_date,
        official_website: body.official_website ?? existing.official_website,
        official_notification_url: body.official_notification_url ?? existing.official_notification_url,
        application_url: body.application_url ?? existing.application_url,
        job_description: body.job_description ?? existing.job_description,
        eligibility: body.eligibility ?? existing.eligibility,
        required_documents: body.required_documents ?? existing.required_documents,
        how_to_apply: body.how_to_apply !== undefined ? body.how_to_apply : existing.how_to_apply,
        status: body.status ?? existing.status,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existing = await prisma.governmentJob.findFirst({
      where: { OR: [{ id: params.id }, { slug: params.id }] },
    });

    if (!existing) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await prisma.governmentJob.delete({ where: { id: existing.id } });
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete job" }, { status: 500 });
  }
}

