import type { ContactInput } from "@/lib/contact-submission";
import { LOGO_CONTENT_ID } from "@/lib/contact-email-assets";

/**
 * Markup only — no I/O, no env. Split from notify-email.ts so the Resend
 * wiring and the email's own layout don't churn together.
 *
 * Every value tile carries `data-field="…"` and the text fallback keeps a
 * stable "Label: value" line per field, in the same order — an email-parsing
 * rule (Zapier, Make, a CRM's own inbound-lead mailbox) can anchor on either
 * without depending on the Vietnamese label text itself.
 *
 * Fonts and the Pebble Blue palette mirror web/app/globals.css so the email
 * reads as the same product as the site, not a generic notification. The
 * logo ships as a Resend inline attachment (see contact-email-assets.ts),
 * referenced here as `cid:` — Gmail strips `data:` image sources, and this
 * lab has no production domain to host a hosted URL at.
 */

const BRAND = "#234894"; // --color-primary
const BRAND_DEEP = "#152c5e"; // darker step for the header gradient, off --color-primary
const BRAND_LIGHT = "#5e8ae8"; // lighter step, off --color-primary in .tone-dark
const INK = "#0b1220"; // --color-fg
const MUTED = "#5f6f94"; // --color-subtle
const LINE = "#dce3ed"; // --color-line
const SURFACE = "#f3f6fa"; // --color-surface
const CANVAS = "#fafbfc"; // --color-canvas
const ON_BRAND = "#ffffff";

const SANS = "'Inter',ui-sans-serif,system-ui,'Segoe UI',Roboto,'Noto Sans',sans-serif";
const DISPLAY = "'Space Grotesk','Inter',ui-sans-serif,system-ui,sans-serif";
const MONO = "'IBM Plex Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap";

/** Layered radial gradients standing in for a soft, blurred droplet field — email clients have no `filter: blur()`, so the softness comes from wide transparent stops instead. `background-color` is the fallback for clients (Outlook desktop) that drop gradients entirely. */
const HEADER_GRADIENT = `background-color:${BRAND};background-image:radial-gradient(42% 65% at 10% 0%,rgba(255,255,255,.24),rgba(255,255,255,0) 60%),radial-gradient(55% 75% at 95% 105%,rgba(94,138,232,.65),rgba(94,138,232,0) 62%),radial-gradient(32% 46% at 75% -15%,rgba(255,255,255,.14),rgba(255,255,255,0) 65%),linear-gradient(135deg,${BRAND_DEEP} 0%,${BRAND} 55%,${BRAND_LIGHT} 120%);`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSubmittedAt(date: Date): string {
  const formatted = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return `${formatted} (giờ Hà Nội)`;
}

type Field = { label: string; field: string; value: string; href?: string };

function primaryFields(input: ContactInput): Field[] {
  return [
    { label: "Họ tên", field: "name", value: input.name },
    { label: "Công ty", field: "company", value: input.company },
    { label: "Email", field: "email", value: input.email, href: `mailto:${input.email}` },
    ...(input.phone
      ? [{ label: "Điện thoại", field: "phone", value: input.phone, href: `tel:${input.phone.replace(/[^\d+]/g, "")}` }]
      : []),
  ];
}

function tile(f: Field, colspan?: 2): string {
  const value = f.href
    ? `<a href="${f.href}" style="color:${INK};text-decoration:none;">${escapeHtml(f.value)}</a>`
    : escapeHtml(f.value);
  return `
              <td class="tile-cell" ${colspan ? `colspan="${colspan}"` : ""} style="padding:6px;" width="50%">
                <div style="background:${SURFACE};border:1px solid ${LINE};border-radius:10px;padding:13px 15px;">
                  <div style="font:500 11px/1.4 ${MONO};letter-spacing:.06em;text-transform:uppercase;color:${MUTED};margin-bottom:4px;">${escapeHtml(f.label)}</div>
                  <div data-field="${f.field}" style="font:16px/1.4 ${SANS};color:${INK};word-break:break-word;">${value}</div>
                </div>
              </td>`;
}

/** Chunks fields into two-column rows; an odd field out spans both columns. */
function tileGrid(fields: Field[]): string {
  const rows: string[] = [];
  for (let i = 0; i < fields.length; i += 2) {
    const pair = fields.slice(i, i + 2);
    rows.push(
      pair.length === 2
        ? `<tr>${tile(pair[0]!)}${tile(pair[1]!)}</tr>`
        : `<tr>${tile(pair[0]!, 2)}</tr>`,
    );
  }
  return rows.join("");
}

export function contactEmailHtml(input: ContactInput, submittedAt: Date): string {
  const grid = tileGrid(primaryFields(input));
  const preheader = `${input.name} tại ${input.company} vừa gửi yêu cầu liên hệ.`;

  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${FONT_LINK}" rel="stylesheet">
    <style>
      body{margin:0;padding:0;}
      @media (max-width:480px){
        .tile-cell{display:block !important;width:100% !important;padding:6px 0 !important;}
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${CANVAS};">
    <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${CANVAS};opacity:0;">
      ${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CANVAS};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:16px;border-collapse:separate;overflow:hidden;">
            <tr>
              <td style="padding:26px 32px;border-radius:16px 16px 0 0;${HEADER_GRADIENT}">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:12px;" valign="middle">
                      <img src="cid:${LOGO_CONTENT_ID}" width="34" height="32" alt="Pebble Vina" style="display:block;border:0;">
                    </td>
                    <td valign="middle">
                      <span style="font:600 16px/1 ${DISPLAY};letter-spacing:.04em;color:${ON_BRAND};">PEBBLE VINA</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 32px 6px;">
                <h1 style="margin:0 0 6px;font:600 22px/1.3 ${DISPLAY};letter-spacing:-.01em;color:${INK};">Yêu cầu liên hệ mới</h1>
                <p style="margin:0;font:14px/1.55 ${SANS};color:${MUTED};">Một khách hàng vừa gửi thông tin qua trang liên hệ.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 26px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${grid}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 0;">
                <div style="font:12px/1.5 ${MONO};color:${MUTED};">Gửi lúc <span data-field="submitted_at">${escapeHtml(formatSubmittedAt(submittedAt))}</span></div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 28px;">
                <div style="font:500 11px/1.4 ${MONO};letter-spacing:.06em;text-transform:uppercase;color:${MUTED};margin-bottom:8px;">Nội dung</div>
                <div data-field="message" style="font:15px/1.65 ${SANS};color:${INK};white-space:pre-wrap;background:${SURFACE};border:1px solid ${LINE};border-radius:10px;padding:15px 17px;">${escapeHtml(input.message)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;border-top:1px solid ${LINE};">
                <a href="mailto:${input.email}" style="display:inline-block;background:${BRAND};color:${ON_BRAND};text-decoration:none;font:600 14px/1 ${SANS};border-radius:10px;padding:13px 24px;">Trả lời khách hàng</a>
              </td>
            </tr>
          </table>
          <p style="max-width:600px;margin:16px auto 0;font:12px/1.5 ${SANS};color:${MUTED};">Gửi tự động từ trang liên hệ pebblevina.com — không trả lời email này.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function contactEmailText(input: ContactInput, submittedAt: Date): string {
  const fields = [...primaryFields(input), { label: "Thời gian gửi", field: "submitted_at", value: formatSubmittedAt(submittedAt) }];
  return [...fields.map((f) => `${f.label}: ${f.value}`), "", "Nội dung:", input.message].join("\n");
}
