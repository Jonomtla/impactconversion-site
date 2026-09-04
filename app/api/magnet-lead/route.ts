import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// Kit form "Upsell Engine - Lead Magnet" (uid b06fe8dacc). Subscribing via
// the API keeps Kit's confirmation email (the playbook link) and tag rule.
const KIT_FORM_ID = "9863461";

type Body = {
  email?: string;
  name?: string;
  revenue?: string;
  source?: string;
  website?: string; // honeypot
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if ((body.website ?? "").trim() !== "") return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim();
  const name = (body.name ?? "").trim();
  const revenue = (body.revenue ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const kitKey = process.env.KIT_API_KEY;
  if (!kitKey) {
    console.error("[magnet-lead] KIT_API_KEY not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const res = await fetch(`https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Kit-Api-Key": kitKey },
    body: JSON.stringify({
      email_address: email,
      first_name: name || undefined,
      fields: { store_revenue: revenue || undefined },
    }),
  });
  if (!res.ok) {
    console.error("[magnet-lead] kit subscribe failed", res.status, await res.text());
    return NextResponse.json({ error: "kit_failed" }, { status: 502 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && revenue && revenue !== "Under $1M / year") {
    try {
      await new Resend(apiKey).emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "Impact Conversion <onboarding@resend.dev>",
        to: process.env.RESEND_TO_EMAIL ?? "jono@impactconversion.com",
        subject: `Qualified magnet lead: ${email}`,
        text: [`Email: ${email}`, `Name: ${name || "(not given)"}`, `Store revenue: ${revenue}`, `Source: free-money-playbook / ${body.source ?? ""}`].join("\n"),
      });
    } catch (err) {
      console.error("[magnet-lead] notification failed", err);
    }
  }
  return NextResponse.json({ ok: true });
}
