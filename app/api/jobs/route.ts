import { NextRequest, NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs-service";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const qualification = searchParams.get("qualification") || undefined;
    const field = searchParams.get("field") || undefined;
    const government_level = searchParams.get("government_level") || undefined;
    const state = searchParams.get("state") || undefined;
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = (searchParams.get("sort") as any) || undefined;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const result = await getJobs({
      qualification,
      field,
      government_level,
      state,
      status,
      search,
      sort,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API /api/jobs GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Data Validation
    if (!body.post_name?.trim()) {
      return NextResponse.json({ error: "Post name is required" }, { status: 400 });
    }
    if (!body.organization_name?.trim()) {
      return NextResponse.json({ error: "Organization name is required" }, { status: 400 });
    }
    if (!body.qualification?.trim()) {
      return NextResponse.json({ error: "Qualification is required" }, { status: 400 });
    }
    if (isNaN(Number(body.number_of_posts)) || Number(body.number_of_posts) < 0) {
      return NextResponse.json({ error: "Number of posts must be a valid non-negative number" }, { status: 400 });
    }
    if (!body.start_date || !body.last_date) {
      return NextResponse.json({ error: "Start date and Last date are required" }, { status: 400 });
    }

    const startDate = new Date(body.start_date);
    const lastDate = new Date(body.last_date);

    if (isNaN(startDate.getTime()) || isNaN(lastDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format provided" }, { status: 400 });
    }
    if (lastDate < startDate) {
      return NextResponse.json({ error: "Last date cannot be earlier than start date" }, { status: 400 });
    }

    // Auto slug generation if missing
    let slug = body.slug?.trim();
    if (!slug) {
      slug = `${body.post_name}-${body.organization_name}-${new Date().getFullYear()}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Ensure slug uniqueness
    const existing = await prisma.governmentJob.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newJob = await prisma.governmentJob.create({
      data: {
        slug,
        post_name: body.post_name.trim(),
        organization_name: body.organization_name.trim(),
        department: body.department?.trim() || "General Administration",
        government_field: body.government_field || "Other",
        government_level: body.government_level || "Central Government",
        state: body.state?.trim() || "All India",
        qualification: body.qualification.trim(),
        qualification_level: body.qualification_level || "ANY GRADUATE",
        specific_discipline: body.specific_discipline || null,
        exact_qual_required: Boolean(body.exact_qual_required),
        number_of_posts: Number(body.number_of_posts),
        salary_min: body.salary_min ? Number(body.salary_min) : null,
        salary_max: body.salary_max ? Number(body.salary_max) : null,
        salary_text: body.salary_text?.trim() || "As per official norms",
        age_min: body.age_min ? Number(body.age_min) : 18,
        age_max: body.age_max ? Number(body.age_max) : 35,
        age_relaxation: body.age_relaxation || null,
        selection_process: body.selection_process?.trim() || "Written Examination / Interview",
        application_fee_sc_st: body.application_fee_sc_st || "₹0/-",
        application_fee_obc: body.application_fee_obc || "₹100/-",
        application_fee_general: body.application_fee_general || "₹100/-",
        application_fee_other: body.application_fee_other || null,
        notification_date: body.notification_date ? new Date(body.notification_date) : null,
        start_date: startDate,
        last_date: lastDate,
        exam_date: body.exam_date ? new Date(body.exam_date) : null,
        admit_card_date: body.admit_card_date ? new Date(body.admit_card_date) : null,
        result_date: body.result_date ? new Date(body.result_date) : null,
        official_website: body.official_website?.trim() || "https://india.gov.in",
        official_notification_url: body.official_notification_url?.trim() || "",
        application_url: body.application_url?.trim() || body.official_website?.trim() || "",
        job_description: body.job_description?.trim() || "Government recruitment notification.",
        eligibility: body.eligibility?.trim() || "As per official rules.",
        required_documents: body.required_documents?.trim() || "ID proof, qualification certificates, photo, signature.",
        how_to_apply: body.how_to_apply?.trim() || "Apply online through the official portal.",
        status: body.status || "PUBLISHED",
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error: any) {
    console.error("API /api/jobs POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to create job" }, { status: 500 });
  }
}

