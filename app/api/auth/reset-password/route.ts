import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ error: "Token and new password are required." }, { status: 400 });
    }
    if (String(password).length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
    }

    const record = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!record || record.used || record.expiresAt < new Date()) {
      return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { password: hashPassword(password) },
      }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { used: true },
      }),
    ]);

    return NextResponse.json({ success: true, message: "Password updated. You can log in now." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to reset password" }, { status: 500 });
  }
}
