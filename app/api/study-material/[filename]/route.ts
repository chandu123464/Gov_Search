import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import path from "path";
import fs from "fs";
import { verifySessionToken } from "@/lib/auth";
import { STUDY_MATERIALS } from "@/lib/study-materials";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const requestedParam = decodeURIComponent(params.filename || "").trim();

    // 1. Authentication Check
    const cookieStore = cookies();
    const token = cookieStore.get("fja_session")?.value;
    const authHeader = request.headers.get("authorization");
    const candidateHeader = request.headers.get("x-candidate-session");
    const { searchParams } = new URL(request.url);
    const authQuery = searchParams.get("token") || searchParams.get("candidate");

    let isAuthenticated = false;

    if (token) {
      const userId = verifySessionToken(token);
      if (userId) isAuthenticated = true;
    }

    if (!isAuthenticated && authHeader && authHeader.startsWith("Bearer ")) {
      isAuthenticated = true;
    }

    if (!isAuthenticated && (candidateHeader || authQuery)) {
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { 
          error: "Access Denied. You must be logged in to view or download candidate study materials.",
          authenticated: false,
          redirect: "/login"
        },
        { status: 401 }
      );
    }

    // 2. Validate requested file against allowed inventory (Prevents path traversal)
    const matchedItem = STUDY_MATERIALS.find(
      (m) => 
        m.id.toLowerCase() === requestedParam.toLowerCase() ||
        m.filename.toLowerCase() === requestedParam.toLowerCase() ||
        encodeURIComponent(m.filename).toLowerCase() === requestedParam.toLowerCase()
    );

    if (!matchedItem) {
      return NextResponse.json(
        { error: "Study material not found." },
        { status: 404 }
      );
    }

    const pdfDirectory = path.join(process.cwd(), "PDF");
    const filePath = path.join(pdfDirectory, matchedItem.filename);

    if (!fs.existsSync(filePath)) {
      console.error("PDF file not found on disk:", filePath);
      return NextResponse.json(
        { error: "Requested PDF file is not available on the server." },
        { status: 404 }
      );
    }

    const stat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    const isDownload = searchParams.get("download") === "true";
    const dispositionType = isDownload ? "attachment" : "inline";
    const cleanFilename = matchedItem.filename.replace(/[^a-zA-Z0-9._-]/g, "_");

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": stat.size.toString(),
        "Content-Disposition": `${dispositionType}; filename="${cleanFilename}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Error streaming PDF file:", err);
    return NextResponse.json(
      { error: "Failed to stream PDF file." },
      { status: 500 }
    );
  }
}
