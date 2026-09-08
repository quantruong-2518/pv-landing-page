"use client";

import type { Locale } from "@/lib/i18n/config";
import { dictionary } from "@/lib/i18n/dictionary";
import { useConsentStore } from "@/lib/store/consent-store";

/**
 * The withdrawal route.
 *
 * Consent that cannot be taken back as easily as it was given is not valid
 * consent, so this sits in the footer of every page — the one place a visitor
 * looks for it — and reopens the same preferences panel the banner shows,
 * pre-filled with the answer currently on record.
 *
 * A client island inside the server-rendered footer: it exists to dispatch one
 * store action, so nothing else about the footer needs to ship JavaScript.
 */
export function ConsentSettingsLink({ locale }: { locale: Locale }) {
  const openPanel = useConsentStore((state) => state.openPanel);

  return (
    <button
      type="button"
      onClick={openPanel}
      // `text-faint` rather than `--color-copy`: 2.84:1 on the footer surface
      // against 5.84:1. Withdrawing consent has to be as easy to *find* as it
      // is to click, and it now matches the copyright line it sits beside.
      className="flex items-center font-mono text-label text-faint transition-colors hover:text-accent max-lg:min-h-11"
    >
      {dictionary.consent.manage[locale]}
    </button>
  );
}
