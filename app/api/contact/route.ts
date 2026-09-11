import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isFreemail } from "@/lib/freemail";
import { isQualified } from "@/lib/revenue";
import { sendMetaEvent } from "@/lib/meta-capi";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  store?: string;
  revenue?: string;
  challenge?: string;
  eventId?: string;
  url?: string;
  website?: string; // honeypot
  turnstileToken?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real users never see this field. Return 200 silently so bots
  // don't learn to skip the field next time.
  if ((body.website ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const check = await verifyTurnstile(
    body.turnstileToken,
    req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for"),
  );
  if (!check.ok) {
    console.warn("[contact] turnstile rejected:", check.reason);
    return NextResponse.json({ error: "challenge_failed" }, { status: 403 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const store = (body.store ?? "").trim();
  const revenue = (body.revenue ?? "").trim();
  const challenge = (body.challenge ?? "").trim();

  if (!name || !email || !store || !challenge) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Recorded, not rejected: see FreeMoneyForm.
  const freemail = isFreemail(email);
  const qualified = isQualified(revenue);

  // One Lead event name across every form on the site so the ad set's
  // optimisation signal is not split; the source rides along as custom data.
  await sendMetaEvent(
    {
      name: "Lead",
      eventId: body.eventId,
      email,
      firstName: name,
      url: body.url,
      customData: {
        content_name: "contact-form",
        store_revenue: revenue || undefined,
        qualified,
        freemail,
      },
    },
    req,
  );

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL ?? "jono@impactconversion.com";
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Impact Conversion <onboarding@resend.dev>";

  // The visitor still reaches the thank-you state even if notification fails.
  // Never block the funnel on our own plumbing.
  if (apiKey) {
    try {
      await new Resend(apiKey).emails.send({
        from,
        to,
        replyTo: email,
        subject: `Contact ${qualified ? "[qualified]" : "[below band]"}: ${name}, ${store}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}${freemail ? " (freemail)" : ""}`,
          `Store: ${store}`,
          `Revenue: ${revenue || "(not given)"}`,
          `Qualified: ${qualified ? "yes" : "no"}`,
          ``,
          `Trying to fix:`,
          challenge,
          ``,
          `Source: /contact form`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("[contact] notification failed", err);
    }
  } else {
    console.error("[contact] RESEND_API_KEY not configured");
  }

  return NextResponse.json({ ok: true });
}
