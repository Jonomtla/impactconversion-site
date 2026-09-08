import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isFreemail } from "@/lib/freemail";
import { isQualified } from "@/lib/revenue";
import { sendMetaEvent } from "@/lib/meta-capi";

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
  if (isFreemail(email)) {
    return NextResponse.json({ error: "freemail" }, { status: 400 });
  }

  const kitKey = process.env.KIT_API_KEY;
  if (!kitKey) {
    console.error("[magnet-lead] KIT_API_KEY not configured");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const kitHeaders = { "Content-Type": "application/json", "X-Kit-Api-Key": kitKey };
  // Kit v4: the form endpoint only accepts subscribers that already exist, so
  // create (or upsert) the subscriber first, then add them to the form so the
  // form's incentive email and tag rule fire.
  const created = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: kitHeaders,
    body: JSON.stringify({
      email_address: email,
      first_name: name || undefined,
      fields: { store_revenue: revenue || undefined },
    }),
  });
  if (!created.ok) {
    const text = await created.text();
    console.error("[magnet-lead] kit create failed", created.status, text);
    const status = created.status === 422 ? 400 : 502;
    return NextResponse.json({ error: status === 400 ? "invalid_email" : "kit_failed" }, { status });
  }
  const added = await fetch(`https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`, {
    method: "POST",
    headers: kitHeaders,
    body: JSON.stringify({ email_address: email }),
  });
  if (!added.ok) {
    console.error("[magnet-lead] kit form add failed", added.status, await added.text());
    return NextResponse.json({ error: "kit_failed" }, { status: 502 });
  }

  const qualified = isQualified(revenue);
  await sendMetaEvent(
    {
      name: "Lead",
      eventId: body.eventId,
      email,
      firstName: name,
      url: body.url,
      customData: {
        content_name: "free-money-playbook",
        store_revenue: revenue || undefined,
        qualified,
      },
    },
    req,
  );

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
