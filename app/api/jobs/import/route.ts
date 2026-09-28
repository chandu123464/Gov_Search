import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const jobs = Array.isArray(body) ? body : body.jobs;
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return NextResponse.json({ error: "Send a JSON array of jobs." }, { status: 400 });
    }

    let created = 0;
    let updated = 0;
    const errors: string[] = [];

    for (const item of jobs.slice(0, 200)) {
      try {
        if (!item.post_name || !item.organization_name || !item.qualification || !item.start_date || !item.last_date) {
          errors.push(`Skipped ${item.post_name || "unnamed"}: missing required fields`);
          continue;
        }
        let slug = (item.slug || `${item.post_name}-${item.organization_name}-${new Date().getFullYear()}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const payload = {
          post_name: String(item.post_name).trim(),
          organization_name: String(item.organization_name).trim(),
          department: item.department || "General Administration",
          government_field: item.government_field || "Other",
          government_level: item.government_level || "Central Government",
          state: item.state || "All India",
          qualification: String(item.qualification).trim(),
          qualification_level: item.qualification_level || "ANY GRADUATE",
          exact_qual_required: Boolean(item.exact_qual_required),
          number_of_posts: Number(item.number_of_posts || 1),
          salary_text: item.salary_text || "As per official norms",
          salary_min: item.salary_min ? Number(item.salary_min) : null,
          salary_max: item.salary_max ? Number(item.salary_max) : null,
          selection_process: item.selection_process || "Written Examination",
          start_date: new Date(item.start_date),
          last_date: new Date(item.last_date),
          exam_date: item.exam_date ? new Date(item.exam_date) : null,
          result_date: item.result_date ? new Date(item.result_date) : null,
          result_status: item.result_status || null,
          result_url: item.result_url || null,
          official_website: item.official_website || "https://india.gov.in",
          official_notification_url: item.official_notification_url || "",
          application_url: item.application_url || item.official_website || "",
          job_description: item.job_description || "Government recruitment notification.",
          eligibility: item.eligibility || "As per official rules.",
          required_documents: item.required_documents || "ID proof and certificates.",
          how_to_apply: item.how_to_apply || "Apply online on the official portal.",
          status: item.status || "PUBLISHED",
          is_published: true,
        };

        const existing = await prisma.governmentJob.findUnique({ where: { slug } });
        if (existing) {
          await prisma.governmentJob.update({ where: { slug }, data: payload });
          updated += 1;
        } else {
          await prisma.governmentJob.create({ data: { slug, ...payload } });
          created += 1;
        }
      } catch (err: any) {
        errors.push(`${item.post_name}: ${err.message}`);
      }
    }

    return NextResponse.json({ success: true, created, updated, errors });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Import failed" }, { status: 500 });
  }
}
