import { NextResponse } from "next/server";

import { contactRequestSchema } from "@/lib/contact/schema";

/**
 * Enquiry intake.
 *
 * There is no CRM wired up in this repository, and inventing an endpoint would
 * mean leads disappearing into a URL nobody owns. So: validate with the same
 * schema the form uses, forward to `CONTACT_WEBHOOK_URL` when one is
 * configured, and otherwise log the enquiry on the server so it is at least
 * recoverable while the integration is pending.
 *
 * Validation runs here as well as in the browser because the browser is not a
 * trust boundary — a form can be replayed straight at this URL.
 */
export async function POST(request: Request) {
  const parsed = contactRequestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Malformed enquiry", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const enquiry = { ...parsed.data, receivedAt: new Date().toISOString() };
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(enquiry),
      });

      if (!response.ok) {
        // Log the payload before returning, so a downstream outage does not
        // also mean the lead is gone.
        console.error("[contact] webhook rejected", response.status, enquiry);
        return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
      }
    } catch (error) {
      console.error("[contact] webhook unreachable", error, enquiry);
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.info("[contact] no CONTACT_WEBHOOK_URL configured; enquiry logged only", enquiry);
  }

  return NextResponse.json({ ok: true });
}
