import crypto from "node:crypto";

/**
 * Appends a single row to the Terms of Service acceptance log in Google Sheets.
 *
 * Auth uses a Google service account via a manually-minted JWT -> OAuth token,
 * so there are no extra npm dependencies. Configure three env vars:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  - the service account's email
 *   GOOGLE_PRIVATE_KEY            - the service account private key (\n-escaped)
 *   TOS_SHEET_ID                  - the spreadsheet ID to append to
 *
 * The sheet must be shared with GOOGLE_SERVICE_ACCOUNT_EMAIL as an Editor.
 * Best-effort: callers should treat failures as non-fatal (the Resend email
 * remains the legal source of truth).
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
// First sheet, columns A:J (Timestamp..Status/Notes).
const RANGE = "A:J";

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(
  email: string,
  privateKey: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signingInput = `${header}.${claims}`;
  const signature = base64url(
    crypto.createSign("RSA-SHA256").update(signingInput).sign(privateKey)
  );
  const assertion = `${signingInput}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(`token request failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("no access_token in token response");
  return json.access_token;
}

/** Append one row (array of cell values) to the TOS log sheet. */
export async function appendTosRow(row: string[]): Promise<void> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.TOS_SHEET_ID;

  if (!email || !privateKey || !sheetId) {
    console.warn("[sheets] not configured (missing env) - skipping sheet log");
    return;
  }

  const token = await getAccessToken(email, privateKey);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}` +
    `/values/${encodeURIComponent(RANGE)}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    throw new Error(`sheets append failed: ${res.status} ${await res.text()}`);
  }
}
