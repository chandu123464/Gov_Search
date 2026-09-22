import { prisma } from "./prisma";
import { getPrismaQualificationFilter } from "./qualification-matching";
import { calculateJobStatus } from "./date-utils";
import { JobFilterParams } from "./types";
import { Prisma } from "@prisma/client";

export async function getJobs(params: JobFilterParams) {
  const page = Number(params.page) || 1;
  const limit = Math.min(Math.max(Number(params.limit) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const whereConditions: Prisma.GovernmentJobWhereInput[] = [
    { status: { in: ["PUBLISHED", "OPEN"] } },
  ];

  // 1. Qualification Filter with intelligent hierarchy
  if (params.qualification && params.qualification.trim()) {
    const qualFilter = getPrismaQualificationFilter(params.qualification);
    whereConditions.push(qualFilter as Prisma.GovernmentJobWhereInput);
  }

  // 2. Government Field Filter
  if (params.field && params.field.trim()) {
    const fieldTerm = params.field.trim();
    whereConditions.push({
      government_field: { equals: fieldTerm },
    });
  }

  // 3. Government Level Filter
  if (params.government_level && params.government_level.trim()) {
    const levelTerm = params.government_level.trim();
    whereConditions.push({
      government_level: { contains: levelTerm },
    });
  }

  // 4. State Filter
  if (params.state && params.state.trim() && params.state !== "All India") {
    whereConditions.push({
      OR: [
        { state: { contains: params.state.trim() } },
        { state: "All India" },
      ],
    });
  }

  // 5. Global Search
  if (params.search && params.search.trim()) {
    const query = params.search.trim();
    whereConditions.push({
      OR: [
        { post_name: { contains: query } },
        { organization_name: { contains: query } },
        { department: { contains: query } },
        { qualification: { contains: query } },
        { government_field: { contains: query } },
        { state: { contains: query } },
        { job_description: { contains: query } },
      ],
    });
  }

  // Sorting
  let orderBy: Prisma.GovernmentJobOrderByWithRelationInput = { created_at: "desc" };
  if (params.sort === "last_date") {
    orderBy = { last_date: "asc" };
  } else if (params.sort === "salary_desc") {
    orderBy = { salary_max: "desc" };
  } else if (params.sort === "salary_asc") {
    orderBy = { salary_min: "asc" };
  } else if (params.sort === "vacancies_desc") {
    orderBy = { number_of_posts: "desc" };
  }

  const whereClause: Prisma.GovernmentJobWhereInput = {
    AND: whereConditions,
  };

  const [total, jobs] = await Promise.all([
    prisma.governmentJob.count({ where: whereClause }),
    prisma.governmentJob.findMany({
      where: whereClause,
      orderBy,
      skip,
      take: limit,
    }),
  ]);

  // Compute live calculated statuses
  const jobsWithCalculatedStatus = jobs.map((job) => ({
    ...job,
    calculatedStatus: calculateJobStatus(job.start_date, job.last_date),
  }));

  // Filter by status if requested
  let filteredJobs = jobsWithCalculatedStatus;
  if (params.status) {
    const s = params.status.toLowerCase();
    if (s === "open") {
      filteredJobs = jobsWithCalculatedStatus.filter(
        (j) => j.calculatedStatus === "OPEN" || j.calculatedStatus === "CLOSING SOON"
      );
    } else if (s === "closing_soon") {
      filteredJobs = jobsWithCalculatedStatus.filter((j) => j.calculatedStatus === "CLOSING SOON");
    } else if (s === "upcoming") {
      filteredJobs = jobsWithCalculatedStatus.filter((j) => j.calculatedStatus === "UPCOMING");
    } else if (s === "closed") {
      filteredJobs = jobsWithCalculatedStatus.filter((j) => j.calculatedStatus === "CLOSED");
    }
  }

  return {
    jobs: filteredJobs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getJobByIdOrSlug(idOrSlug: string) {
  const job = await prisma.governmentJob.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
  });

  if (!job) return null;

  return {
    ...job,
    calculatedStatus: calculateJobStatus(job.start_date, job.last_date),
  };
}

export async function getClosingSoonJobs(limit = 10) {
  const now = new Date();
  const futureThreshold = new Date();
  futureThreshold.setDate(now.getDate() + 7);

  const jobs = await prisma.governmentJob.findMany({
    where: {
      status: "PUBLISHED",
      last_date: {
        gte: now,
        lte: futureThreshold,
      },
    },
    orderBy: {
      last_date: "asc",
    },
    take: limit,
  });

  return jobs.map((job) => ({
    ...job,
    calculatedStatus: calculateJobStatus(job.start_date, job.last_date),
  }));
}

export async function getUpcomingJobs(limit = 10) {
  const now = new Date();

  const jobs = await prisma.governmentJob.findMany({
    where: {
      status: "PUBLISHED",
      start_date: {
        gt: now,
      },
    },
    orderBy: {
      start_date: "asc",
    },
    take: limit,
  });

  return jobs.map((job) => ({
    ...job,
    calculatedStatus: calculateJobStatus(job.start_date, job.last_date),
  }));
}

export async function getQualificationCounts() {
  const counts = await prisma.governmentJob.groupBy({
    by: ["qualification_level"],
    _count: {
      id: true,
    },
    where: {
      status: "PUBLISHED",
    },
  });

  const map: Record<string, number> = {};
  for (const c of counts) {
    map[c.qualification_level] = c._count.id;
  }
  return map;
}

