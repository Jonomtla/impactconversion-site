import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createHash } from "node:crypto";

export const runtime = "nodejs";

// Kit form "Upsell Engine - Lead Magnet" (uid b06fe8dacc). Subscribing via
// the API keeps Kit's confirmation email (the playbook link) and tag rule.
const KIT_FORM_ID = "9863461";

type Body = {
  email?: string;
  name?: string;
  revenue?: string;
  source?: string;
  eventId?: string;
  url?: string;
  website?: string; // honeypot
};

const META_PIXEL_ID = "810167591458471";
const sha256 = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

// Conversions API: same event name + event_id as the browser pixel call, so
// Meta dedupes and still records the lead when the browser event is blocked.
async function sendMetaEvent(opts: {
  name: string;
  eventId?: string;
  email: string;
  firstName: string;
  url?: string;
  ip?: string;
  ua?: string;
}) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return;
  const body = {
    data: [
      {
        event_name: opts.name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.eventId,
        action_source: "website",
        event_source_url: opts.url,
        user_data: {
          em: [sha256(opts.email)],
          fn: opts.firstName ? [sha256(opts.firstName)] : undefined,
          client_ip_address: opts.ip,
          client_user_agent: opts.ua,
        },
        custom_data: { content_name: "free-money-playbook" },
      },
    ],
  };
  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${token}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
    );
    if (!res.ok) console.error("[magnet-lead] capi failed", res.status, await res.text());
  } catch (err) {
    console.error("[magnet-lead] capi error", err);
  }
}

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

  const qualified = Boolean(revenue) && revenue !== "Under $1M / year";
  await sendMetaEvent({
    name: qualified ? "Lead" : "CompleteRegistration",
    eventId: body.eventId,
    email,
    firstName: name,
    url: body.url,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    ua: req.headers.get("user-agent") || undefined,
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && qualified) {
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
