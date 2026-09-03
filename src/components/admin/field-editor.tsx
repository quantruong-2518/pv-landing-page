"use client";

import Image from "next/image";
import { useId } from "react";

import { FieldLabel } from "@/components/ui/field-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ASSETS, type FieldDescriptor } from "@/lib/content/fields";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * One row of the CMS field panel: label and hint on the left, the control on
 * the right.
 *
 * Localized fields get one control per language, side by side. That is the
 * whole reason this editor exists in a bilingual form rather than the mock's
 * single Vietnamese box: an editor who cannot see the English while writing the
 * Vietnamese will let the two drift, and nothing downstream catches it.
 */
export function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: FieldDescriptor;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  const uid = useId();
  const controlId = `${uid}-${field.key}`;

  return (
    <div className="grid items-start gap-6 border-b border-ink/10 py-6 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)]">
      <div className="flex flex-col gap-1.5">
        <FieldLabel htmlFor={field.localized ? `${controlId}-vi` : controlId} className="text-body">
          {field.label}
        </FieldLabel>
        {field.hint ? (
          <span className="text-[0.75rem] leading-[1.6] text-faint">{field.hint}</span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        {field.localized ? (
          <LocalizedControl
            field={field}
            controlId={controlId}
            value={(value ?? {}) as Partial<Record<Locale, string>>}
            onChange={onChange}
          />
        ) : null}

        {!field.localized && field.type === "text" ? (
          <Input
            id={controlId}
            className="bg-field"
            value={String(value ?? "")}
            onChange={(event) => onChange(event.target.value)}
          />
        ) : null}

        {field.type === "number" ? (
          <Input
            id={controlId}
            type="number"
            min={1}
            max={100}
            className="w-[110px] bg-field"
            value={Number(value ?? 0)}
            onChange={(event) => onChange(Number(event.target.value))}
          />
        ) : null}

        {field.type === "image" ? (
          <ImageControl
            controlId={controlId}
            value={String(value ?? "")}
            fit={field.fit}
            onChange={onChange}
          />
        ) : null}
      </div>
    </div>
  );
}

function LocalizedControl({
  field,
  controlId,
  value,
  onChange,
}: {
  field: FieldDescriptor;
  controlId: string;
  value: Partial<Record<Locale, string>>;
  onChange: (next: unknown) => void;
}) {
  const set = (locale: Locale, next: string) => onChange({ ...value, [locale]: next });

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {LOCALES.map((locale) => (
        <div key={locale} className="flex min-w-0 flex-col gap-2">
          <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-faint">
            {LOCALE_LABELS[locale]}
          </span>
          {field.type === "area" ? (
            <Textarea
              id={`${controlId}-${locale}`}
              rows={4}
              className="bg-field"
              value={value[locale] ?? ""}
              onChange={(event) => set(locale, event.target.value)}
            />
          ) : (
            <Input
              id={`${controlId}-${locale}`}
              className="bg-field"
              value={value[locale] ?? ""}
              onChange={(event) => set(locale, event.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ImageControl({
  controlId,
  value,
  fit,
  onChange,
}: {
  controlId: string;
  value: string;
  fit?: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-start gap-4">
      <div className="relative aspect-video w-[210px] shrink-0 border border-ink/20 bg-field">
        {value ? (
          <Image src={value} alt="" fill sizes="210px" className="object-cover" />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 basis-[260px] flex-col gap-2.5">
        <Input
          id={controlId}
          className="bg-field font-mono text-[0.8125rem]"
          placeholder="/images/ten-anh.png"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />

        {/* Quick-pick over the assets already shipped with the site. An upload
            action belongs beside this, not instead of it: reusing an image the
            site already serves is the common case. */}
        <div className="flex flex-wrap gap-2">
          {ASSETS.map((asset) => (
            <button
              key={asset}
              type="button"
              onClick={() => onChange(asset)}
              className={cn(
                "border px-2.5 py-[7px] font-mono text-[0.6875rem] transition-colors",
                asset === value
                  ? "border-accent bg-accent/16 text-accent"
                  : "border-ink/20 text-body hover:border-accent hover:text-accent",
              )}
            >
              {asset.replace("/images/", "")}
            </button>
          ))}
        </div>

        {fit ? <span className="text-[0.75rem] leading-[1.6] text-faint">{fit}</span> : null}
      </div>
    </div>
  );
}
