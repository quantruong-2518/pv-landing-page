import type { ContentPageId, SiteContent } from "@/lib/content/schema";

/**
 * Browser-side access to the content API. Used by the admin panel through
 * TanStack Query; the public pages never call these — they read the document
 * on the server so the HTML ships complete.
 */

export const contentKeys = {
  all: ["content"] as const,
  page: (page: ContentPageId) => ["content", page] as const,
};

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || `${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function fetchPageContent<P extends ContentPageId>(page: P): Promise<SiteContent[P]> {
  return request<SiteContent[P]>(`/api/content/${page}`);
}

/** Save one section. Section-scoped so parallel editors do not clobber. */
export function saveSectionContent<P extends ContentPageId>(args: {
  page: P;
  section: string;
  values: Record<string, unknown>;
}): Promise<SiteContent[P]> {
  return request<SiteContent[P]>(`/api/content/${args.page}`, {
    method: "PATCH",
    body: JSON.stringify({ section: args.section, values: args.values }),
  });
}

/** Revert one section to the value the repository seeded. */
export function resetSectionContent<P extends ContentPageId>(args: {
  page: P;
  section: string;
}): Promise<SiteContent[P]> {
  return request<SiteContent[P]>(`/api/content/${args.page}`, {
    method: "DELETE",
    body: JSON.stringify({ section: args.section }),
  });
}

export interface ContactPayload {
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  locale: string;
}

export function submitContact(payload: ContactPayload): Promise<{ ok: true }> {
  return request<{ ok: true }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
