import { NextResponse } from "next/server";
import { getLiveSscStatus, sendAdmitCardEmailNotification } from "@/lib/ssc-service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const shouldSendEmail = Boolean(body?.sendEmail);

    const status = await getLiveSscStatus();

    let emailResult = null;
    if (shouldSendEmail) {
      emailResult = await sendAdmitCardEmailNotification(body?.recipientEmail);
    }

    return NextResponse.json({
      success: true,
      status,
      emailResult,
      refreshedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error in /api/ssc/sync:", error);
    return NextResponse.json(
      { error: "Failed to sync with SSC", details: error.message },
      { status: 500 }
    );
  }
}
