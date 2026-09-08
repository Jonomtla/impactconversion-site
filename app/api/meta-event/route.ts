import { NextResponse } from "next/server";
import { sendMetaEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";

// Conversions that happen entirely in the browser (a Cal booking, the
// Kit-hosted magnet form) have no server step of their own, so they post here
// to get a CAPI twin. Without it those events are browser-only and vanish for
// anyone on iOS or running a blocker.
//
// Event names are whitelisted: this route is public, and an open pipe to the
// pixel invites junk in the dataset.
const ALLOWED = new Set(["Lead", "Schedule", "CompleteRegistration"]);

type Body = {
  name?: string;
  eventId?: string;
  email?: string;
  firstName?: string;
  url?: string;
  customData?: Record<string, unknown>;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  if (!ALLOWED.has(name)) {
    return NextResponse.json({ error: "unsupported_event" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  await sendMetaEvent(
    {
      name,
      eventId: body.eventId,
      email: email || undefined,
      firstName: (body.firstName ?? "").trim() || undefined,
      url: body.url,
      customData: body.customData,
    },
    req,
  );

  return NextResponse.json({ ok: true });
}
