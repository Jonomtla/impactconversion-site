// Common consumer mailbox domains. The magnet form asks for a work email so
// the brand behind the lead is visible from the domain alone.
const FREEMAIL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.nz", "yahoo.com.au", "yahoo.co.uk",
  "hotmail.com", "hotmail.co.nz", "hotmail.com.au", "hotmail.co.uk", "outlook.com", "outlook.co.nz",
  "outlook.com.au", "live.com", "live.co.uk", "live.com.au", "msn.com", "icloud.com", "me.com", "mac.com",
  "aol.com", "protonmail.com", "proton.me", "pm.me", "gmx.com", "gmx.net", "mail.com", "zoho.com",
  "yandex.com", "ymail.com", "xtra.co.nz", "bigpond.com", "optusnet.com.au", "fastmail.com", "hey.com",
]);

export function isFreemail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return FREEMAIL.has(domain);
}
