import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRandomToken } from "@/lib/auth";
import { sendEmail, getAppBaseUrl } from "@/lib/alerts";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email).trim().toLowerCase() },
    });

    // Always return success so this endpoint cannot be used to probe emails.
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists, a reset link has been sent.",
      });
    }

    const token = createRandomToken();
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    const resetUrl = `${getAppBaseUrl()}/reset-password?token=${token}`;
    const mailed = await sendEmail({
      to: user.email,
      subject: "Reset your GovSearch password",
      text: `Reset your password using this link (valid for 1 hour):\n${resetUrl}`,
      html: `<p>Reset your GovSearch password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 1 hour.</p>`,
    });

    return NextResponse.json({
      success: true,
      message: mailed.success
        ? "If an account exists, a reset link has been sent."
        : "Reset token created. Email is not configured on this server, so open the reset page with the token from your administrator.",
      emailConfigured: mailed.success,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to start reset" }, { status: 500 });
  }
}
