// Cloudflare Turnstile server-side verification.
//
// The widget on its own is decorative: the token it produces only means
// anything once this side has checked it with Cloudflare. Called before any
// other work in the route it protects.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; reason: string };

// Fail closed on a bad token, fail open if Cloudflare itself is unreachable.
// A visitor who solved the challenge should never lose their submission to our
// own plumbing, and the honeypot still stands behind this either way.
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string | null,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Unconfigured (local dev, or before the keys are added in Vercel). The form
  // stays usable and the honeypot carries the load until the keys land.
  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not configured, skipping verification");
    return { ok: true, skipped: true };
  }

  if (!token) return { ok: false, reason: "missing_token" };

  const form = new URLSearchParams({ secret, response: token });
  if (remoteIp) form.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error("[turnstile] siteverify returned", res.status);
      return { ok: true, skipped: true };
    }
    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (data.success) return { ok: true };
    return { ok: false, reason: (data["error-codes"] ?? []).join(",") || "rejected" };
  } catch (err) {
    // Network failure or timeout reaching Cloudflare. Let the lead through.
    console.error("[turnstile] verification unreachable", err);
    return { ok: true, skipped: true };
  }
}
