async function testEndpoints() {
  const baseUrl = "http://localhost:3000";
  console.log("Testing Live HTTP Endpoints on " + baseUrl + "...\n");

  const endpoints = [
    { url: "/", name: "Homepage" },
    { url: "/government-jobs", name: "Government Jobs Listing" },
    { url: "/government-jobs/10th", name: "10th Pass SEO Page" },
    { url: "/government-jobs/12th/ssc", name: "12th SSC Combined SEO Page" },
    { url: "/job/indian-postal-gds-recruitment-2026", name: "Job Detail (Indian Postal GDS)" },
    { url: "/job/ssc-chsl-recruitment-2026", name: "Job Detail (SSC CHSL)" },
    { url: "/last-date-reminder", name: "Last Date Reminder Page" },
    { url: "/upcoming-jobs", name: "Upcoming Jobs Page" },
    { url: "/admin", name: "Admin Job Management Page" },
    { url: "/api/jobs", name: "API: Get Jobs" },
    { url: "/api/jobs/search?q=SSC", name: "API: Search SSC" },
    { url: "/api/jobs/qualification/12TH", name: "API: Qualification 12TH" },
    { url: "/api/jobs/field/Railway", name: "API: Field Railway" },
    { url: "/api/jobs/government-level/Central%20Government", name: "API: Level Central Gov" },
    { url: "/results", name: "Results Page" },
    { url: "/exam-calendar", name: "Exam Calendar Page" },
    { url: "/syllabus", name: "Syllabus Page" },
    { url: "/blog", name: "Blog Page" },
    { url: "/about", name: "About Page" },
    { url: "/api/jobs/filter?qualification=12th&field=SSC&government_level=Central%20Government", name: "API: 4-Step Filter" },
  ];

  let passed = 0;
  let failed = 0;

  for (const ep of endpoints) {
    try {
      const res = await fetch(baseUrl + ep.url);
      if (res.ok) {
        console.log(`✅ [${res.status}] ${ep.name} (${ep.url})`);
        passed++;
      } else {
        console.error(`❌ [${res.status}] ${ep.name} (${ep.url})`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ ERROR connecting to ${ep.url}:`, err.message);
      failed++;
    }
  }

  console.log(`\nHTTP TEST RESULT: ${passed} PASSED, ${failed} FAILED`);
  process.exit(failed > 0 ? 1 : 0);
}

testEndpoints();

