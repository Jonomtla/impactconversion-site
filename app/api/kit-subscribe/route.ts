import { NextResponse } from "next/server";
import { kitSubscribe } from "@/lib/kit";

export const runtime = "nodejs";

type Body = {
  email?: string;
  firstName?: string;
  source?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  try {
    const result = await kitSubscribe({
      email,
      firstName: body.firstName?.trim() || undefined,
      fields: {
        source: body.source ?? "site_lead_magnet",
      },
    });
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("kit-subscribe error", err);
    return NextResponse.json(
      { error: "Subscription failed. Try again in a minute." },
      { status: 502 }
    );
  }
}
