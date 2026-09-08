import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sendMetaEvent } from "@/lib/meta-capi";

// Runtime: Node so we can use the Resend SDK without edge constraints.
export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  store?: string;
  adSpend?: string;
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

  // Honeypot: real users never see this field. Bots fill every input.
  // Return 200 silently so bots don't learn to skip the field next time.
  if ((body.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const store = (body.store ?? "").trim();
  const adSpend = (body.adSpend ?? "").trim();

  if (!name || !email) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Server-side twin of the browser pixel Lead in GamePlanForm. This funnel
  // is what the service ads point at, so it has to reach Meta with fbc.
  await sendMetaEvent(
    {
      name: "Lead",
      eventId: body.eventId,
      email,
      firstName: name,
      url: body.url,
      customData: {
        content_name: "leaky-funnel-game-plan",
        store: store || undefined,
        ad_spend: adSpend || undefined,
      },
    },
    req,
  );

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL ?? "jono@impactconversion.com";
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Impact Conversion <onboarding@resend.dev>";

  // The lead still reaches the schedule page even if notification fails —
  // never block the funnel on our own plumbing.
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        subject: `Game Plan lead: ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Store: ${store || "(not given)"}`,
          `Monthly ad spend: ${adSpend || "(not given)"}`,
          `Source: /game-plan opt-in`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("[lead] notification failed", err);
    }
  } else {
    console.error("[lead] RESEND_API_KEY not configured");
  }

  return NextResponse.json({ ok: true });
}
