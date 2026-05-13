import { NextResponse } from "next/server";
import { Resend } from "resend";

// Runtime: Node so we can use the Resend SDK without edge constraints.
export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  agree?: boolean;
  website?: string;
};

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real users never see this field. Bots fill every input.
  // Return 200 silently so bots don't learn to skip the field next time.
  if ((body.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const role = (body.role ?? "").trim();
  const agree = Boolean(body.agree);

  // Minimal validation — enough to stop empty/bot submissions.
  if (!name || !email || !company || !agree) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL ?? "jono@impactconversion.com";
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Impact Conversion <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[terms-accept] RESEND_API_KEY not configured");
    return NextResponse.json(
      { error: "email_not_configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const timestamp = new Date().toISOString();
  const ua = req.headers.get("user-agent") ?? "unknown";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.55;color:#111">
      <h2 style="margin:0 0 16px;color:#7c5aec">New terms of service acceptance</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${escape(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escape(email)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escape(company)}</td></tr>
        <tr><td><strong>Role</strong></td><td>${escape(role || "—")}</td></tr>
        <tr><td><strong>Agreed</strong></td><td>${agree ? "Yes" : "No"}</td></tr>
        <tr><td><strong>Timestamp</strong></td><td>${timestamp}</td></tr>
        <tr><td><strong>IP</strong></td><td>${escape(ip)}</td></tr>
        <tr><td><strong>User agent</strong></td><td style="font-family:monospace;font-size:12px">${escape(ua)}</td></tr>
      </table>
      <p style="margin-top:24px;color:#555;font-size:13px">
        Submitted via impactconversion.com/terms-of-service — this record should be saved as
        evidence of engagement.
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `TOS accepted · ${company} (${name})`,
      html,
    });
    if (error) {
      console.error("[terms-accept] resend error", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[terms-accept] unexpected", e);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
