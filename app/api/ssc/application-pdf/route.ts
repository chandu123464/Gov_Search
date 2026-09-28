import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isDownload = searchParams.get("download") === "true";

    const filePath = path.join(process.cwd(), "ExamApplication", "application.pdf");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Application form PDF not found." },
        { status: 404 }
      );
    }

    const stat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    const dispositionType = isDownload ? "attachment" : "inline";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": stat.size.toString(),
        "Content-Disposition": `${dispositionType}; filename="SSC_CPO_Application_10011969007.pdf"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err: any) {
    console.error("Error streaming application PDF:", err);
    return NextResponse.json(
      { error: "Failed to stream application PDF." },
      { status: 500 }
    );
  }
}
