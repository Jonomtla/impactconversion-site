import { createHash } from "node:crypto";

// Impact Conversion pixel. Server-side twin of the browser pixel initialised
// in instrumentation-client.ts.
export const META_PIXEL_ID = "810167591458471";

const GRAPH_VERSION = "v21.0";
const sha256 = (v: string) =>
  createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

export function readCookie(header: string | null, name: string) {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=") || undefined;
  }
  return undefined;
}

// fbc is the click identifier Meta uses to join a conversion to the ad click.
// The pixel writes it to the _fbc cookie on landing; if that hasn't happened
// yet (first hit, blocked pixel) rebuild it from the fbclid on the landing URL
// in the format Meta expects: fb.1.<timestamp>.<fbclid>.
export function resolveFbc(cookieHeader: string | null, url: string | undefined) {
  const fromCookie = readCookie(cookieHeader, "_fbc");
  if (fromCookie) return fromCookie;
  if (!url) return undefined;
  try {
    const fbclid = new URL(url).searchParams.get("fbclid");
    return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
  } catch {
    return undefined;
  }
}

export type MetaEventInput = {
  /** Standard event name, e.g. "Lead" or "Schedule". */
  name: string;
  /** Shared with the browser pixel call so Meta dedupes the pair. */
  eventId?: string;
  email?: string;
  firstName?: string;
  /** The page the visitor converted on. */
  url?: string;
  customData?: Record<string, unknown>;
};

// Sends one event to the Conversions API. Never throws: tracking must not be
// able to break a form submission. Pulls fbc/fbp/ip/ua off the request, which
// is the whole reason attribution works — without fbc Meta cannot tie the
// conversion to the ad click, and the server event usually wins the dedupe.
export async function sendMetaEvent(event: MetaEventInput, req: Request) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    console.error("[meta-capi] META_CAPI_TOKEN not configured");
    return;
  }
  const cookieHeader = req.headers.get("cookie");
  const body = {
    data: [
      {
        event_name: event.name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        event_source_url: event.url,
        user_data: {
          em: event.email ? [sha256(event.email)] : undefined,
          fn: event.firstName ? [sha256(event.firstName)] : undefined,
          client_ip_address:
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
          client_user_agent: req.headers.get("user-agent") || undefined,
          fbc: resolveFbc(cookieHeader, event.url),
          fbp: readCookie(cookieHeader, "_fbp"),
        },
        custom_data: event.customData,
      },
    ],
  };
  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!res.ok) {
      console.error("[meta-capi] failed", event.name, res.status, await res.text());
    }
  } catch (err) {
    console.error("[meta-capi] error", event.name, err);
  }
}
