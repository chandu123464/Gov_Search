import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isDownload = searchParams.get("download") === "true";

    const admitCardDir = path.join(process.cwd(), "AdmitCard");
    const admitCardPath = path.join(admitCardDir, "admit_card_10011969007.pdf");

    if (fs.existsSync(admitCardPath)) {
      const stat = fs.statSync(admitCardPath);
      const fileBuffer = fs.readFileSync(admitCardPath);
      const dispositionType = isDownload ? "attachment" : "inline";

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Length": stat.size.toString(),
          "Content-Disposition": `${dispositionType}; filename="SSC_CPO_Admit_Card_10011969007.pdf"`,
          "Cache-Control": "private, max-age=3600",
        },
      });
    }

    return NextResponse.json(
      {
        released: false,
        message: "Still Admit Card is not released.",
        registrationNo: "10011969007",
        examName: "SI/CPO Exam 2026",
        details: "Admit cards are issued by Staff Selection Commission 3 to 7 days before the Computer Based Examination.",
      },
      { status: 404 }
    );
  } catch (err: any) {
    console.error("Error handling admit card PDF:", err);
    return NextResponse.json(
      { error: "Failed to process admit card." },
      { status: 500 }
    );
  }
}
