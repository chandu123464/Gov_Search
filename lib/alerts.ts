import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

function readEnvFile(): Record<string, string> {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return {};
    const result: Record<string, string> = {};
    for (const rawLine of fs.readFileSync(envPath, "utf-8").split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const idx = line.indexOf("=");
      if (idx === -1) continue;
      result[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
    return result;
  } catch {
    return {};
  }
}

export function getAppEnv(): Record<string, string> {
  return { ...readEnvFile(), ...(process.env as Record<string, string>) };
}

export function getAppBaseUrl(): string {
  const env = getAppEnv();
  return env.APP_BASE_URL || env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<{ success: boolean; reason?: string; messageId?: string }> {
  const env = getAppEnv();
  if (!env.MAIL_SERVER || !env.MAIL_USERNAME || !env.MAIL_PASSWORD) {
    return { success: false, reason: "Email is not configured. Add MAIL_SERVER, MAIL_USERNAME, and MAIL_PASSWORD." };
  }

  const transporter = nodemailer.createTransport({
    host: env.MAIL_SERVER,
    port: parseInt(env.MAIL_PORT || "587", 10),
    secure: env.MAIL_PORT === "465",
    auth: {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${env.MAIL_FROM_NAME || "GovSearch"}" <${env.MAIL_FROM || env.MAIL_USERNAME}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || `<pre style="font-family:sans-serif">${options.text}</pre>`,
    });
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    return { success: false, reason: err.message || "Failed to send email" };
  }
}

export async function sendWhatsApp(options: {
  to: string;
  message: string;
}): Promise<{ success: boolean; reason?: string }> {
  const env = getAppEnv();
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  const from = env.TWILIO_WHATSAPP_FROM;
  if (!sid || !token || !from) {
    return { success: false, reason: "WhatsApp is not configured. Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM." };
  }

  const mobile = options.to.replace(/\D/g, "");
  if (mobile.length < 10) {
    return { success: false, reason: "A valid mobile number is required for WhatsApp alerts." };
  }
  const toNumber = mobile.startsWith("91") && mobile.length > 10 ? `whatsapp:+${mobile}` : `whatsapp:+91${mobile.slice(-10)}`;

  try {
    const auth = Buffer.from(`${sid}:${token}`).toString("base64");
    const body = new URLSearchParams({
      From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
      To: toNumber,
      Body: options.message,
    });
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!res.ok) {
      const text = await res.text();
      return { success: false, reason: text.slice(0, 200) };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, reason: err.message || "WhatsApp send failed" };
  }
}

export function reminderEmailHtml(params: {
  name: string;
  postName: string;
  organization: string;
  lastDate: string;
  daysLeft: number;
  jobUrl: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
      <div style="background:#1e3a8a;color:white;padding:20px;text-align:center">
        <h2 style="margin:0">GovSearch last-date reminder</h2>
      </div>
      <div style="padding:24px;color:#1e293b">
        <p>Dear <strong>${params.name}</strong>,</p>
        <p>Your saved recruitment <strong>${params.postName}</strong> (${params.organization}) closes in <strong>${params.daysLeft} day(s)</strong>.</p>
        <p>Last date: <strong>${params.lastDate}</strong></p>
        <p style="text-align:center;margin-top:24px">
          <a href="${params.jobUrl}" style="background:#2563eb;color:white;padding:10px 22px;text-decoration:none;border-radius:6px;font-weight:bold">Open job</a>
        </p>
      </div>
    </div>
  `;
}
