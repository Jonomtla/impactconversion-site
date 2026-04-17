// Kit (ConvertKit) v3 API wrapper.
// Requires KIT_API_KEY + KIT_FORM_ID in environment.
// Docs: https://developers.kit.com/v3

export type KitSubscribeInput = {
  email: string;
  firstName?: string;
  fields?: Record<string, string | undefined>;
  tags?: number[];
};

export async function kitSubscribe(input: KitSubscribeInput) {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  if (!apiKey || !formId) {
    throw new Error(
      "Kit not configured: set KIT_API_KEY and KIT_FORM_ID in env"
    );
  }

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email: input.email,
        first_name: input.firstName,
        fields: input.fields,
        tags: input.tags,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Kit subscribe failed: ${res.status} ${body}`);
  }
  return res.json();
}
