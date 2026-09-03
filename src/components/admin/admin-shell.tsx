"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { FieldEditor } from "@/components/admin/field-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  contentKeys,
  fetchPageContent,
  resetSectionContent,
  saveSectionContent,
} from "@/lib/api/content";
import { CONTENT_PAGES, findPage } from "@/lib/content/fields";
import type { ContentPageId } from "@/lib/content/schema";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { routes } from "@/lib/routes";
import { useAdminStore } from "@/lib/store/admin-store";
import { cn } from "@/lib/utils";

type SectionValues = Record<string, unknown>;

/**
 * The CMS.
 *
 * Three pieces of state, kept deliberately separate:
 *
 *  - which page and section are open, and whether there are unsaved edits —
 *    Zustand, because it is pure UI navigation state;
 *  - the published document — TanStack Query, because it is server state and
 *    another editor can change it under you;
 *  - the values in the open form — local `useState`, because a draft is not
 *    shared with anyone until it is saved.
 *
 * "Hoàn tác" reverts the open section to the seeded value rather than wiping
 * the whole document, which is what the mock's reset did. Losing every section
 * because you wanted to undo one is not an undo.
 */
export function AdminShell() {
  const { page, section, dirty, selectPage, selectSection, setDirty } = useAdminStore();
  const queryClient = useQueryClient();

  const descriptor = findPage(page)!;
  const activeSection = useMemo(
    () => descriptor.sections.find((entry) => entry.id === section) ?? descriptor.sections[0],
    [descriptor, section],
  );

  const { data, isPending } = useQuery({
    queryKey: contentKeys.page(page),
    queryFn: () => fetchPageContent(page),
  });

  const published = (data as Record<string, SectionValues> | undefined)?.[activeSection.id];
  const [draft, setDraft] = useState<SectionValues>({});
  const [seeded, setSeeded] = useState<{ key: string; from: SectionValues | undefined }>({
    key: "",
    from: undefined,
  });

  // Re-seed the form when the editor moves to another section, or when a fetch
  // lands with a newer document — and never when there is an unsaved draft to
  // protect. Done during render rather than in an effect: this is derived
  // state, and an effect would render the previous section's values once before
  // correcting itself.
  const seedKey = `${page}:${activeSection.id}`;
  if (published && !dirty && (seeded.key !== seedKey || seeded.from !== published)) {
    setSeeded({ key: seedKey, from: published });
    setDraft(published);
  }

  const save = useMutation({
    mutationFn: () => saveSectionContent({ page, section: activeSection.id, values: draft }),
    onSuccess: (next) => {
      queryClient.setQueryData(contentKeys.page(page), next);
      setDirty(false);
      toast.success("Đã lưu và xuất bản.");
    },
    onError: (error: Error) => toast.error(error.message || "Lưu không thành công."),
  });

  const revert = useMutation({
    mutationFn: () => resetSectionContent({ page, section: activeSection.id }),
    onSuccess: (next) => {
      queryClient.setQueryData(contentKeys.page(page), next);
      setDraft((next as Record<string, SectionValues>)[activeSection.id]);
      setDirty(false);
      toast.success("Đã trả section này về nội dung gốc.");
    },
    onError: (error: Error) => toast.error(error.message || "Không hoàn tác được."),
  });

  const update = (key: string, value: unknown) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setDirty(true);
  };

  const status = dirty ? "CÓ THAY ĐỔI CHƯA LƯU" : save.isSuccess ? "ĐÃ LƯU" : "CHƯA CÓ THAY ĐỔI";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex min-h-header-admin flex-wrap items-center gap-5 border-b border-ink/14 bg-night/90 px-6 backdrop-blur-[14px]">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="" width={28} height={28} />
          <span className="font-heading text-sm font-bold tracking-[0.1em]">PEBBLE VINA</span>
          <span className="font-mono text-label tracking-[0.14em] text-faint">CMS</span>
        </div>

        <div className="ml-2 flex border border-ink/20">
          {CONTENT_PAGES.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => selectPage(entry.id as ContentPageId, entry.sections[0].id)}
              className={cn(
                "px-[18px] py-2.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors",
                entry.id === page ? "bg-accent text-night" : "text-body hover:text-ink",
              )}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-3.5">
          <span className="font-mono text-label tracking-[0.1em] whitespace-nowrap text-faint">
            {status}
          </span>
          <Link
            href={page === "home" ? routes.home(DEFAULT_LOCALE) : routes.products(DEFAULT_LOCALE)}
            target="_blank"
            className="font-mono text-label tracking-[0.12em] whitespace-nowrap text-accent hover:text-accent-hover"
          >
            XEM TRANG →
          </Link>
          <Button
            type="button"
            variant="outline"
            size="none"
            mono={false}
            className="px-[18px] py-2.5 text-[0.8125rem]"
            onClick={() => revert.mutate()}
            disabled={revert.isPending}
          >
            Hoàn tác
          </Button>
          <Button
            type="button"
            variant="primary"
            size="none"
            mono={false}
            className="px-[22px] py-[11px] text-[0.8125rem]"
            onClick={() => save.mutate()}
            disabled={save.isPending || !dirty}
          >
            {save.isPending ? "Đang lưu…" : "Lưu thay đổi"}
          </Button>
        </div>
      </header>

      <div className="grid flex-1 items-stretch lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className="border-b border-ink/14 bg-panel py-5 lg:border-r lg:border-b-0">
          <div className="px-5 pb-3.5 font-mono text-label tracking-[0.13em] text-faint">
            CÁC SECTION
          </div>
          <nav>
            {descriptor.sections.map((entry, index) => {
              const record = (data as Record<string, SectionValues> | undefined)?.[entry.id];
              const visible = record?.visible !== false;
              const current = entry.id === activeSection.id;

              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => selectSection(entry.id)}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 border-l-2 px-5 py-3.5 text-left text-sm font-medium transition-colors hover:bg-accent/9",
                    current
                      ? "border-l-accent bg-accent/14 text-ink"
                      : "border-l-transparent text-body",
                  )}
                >
                  <span className="font-mono text-label text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">{entry.label}</span>
                  {/* Lit square = section is live on the public page. */}
                  <span
                    aria-hidden
                    className={cn("size-[7px]", visible ? "bg-accent" : "bg-ink/22")}
                  />
                </button>
              );
            })}
          </nav>
          <p className="mt-5 border-t border-ink/14 px-5 pt-4 text-[0.78125rem] leading-[1.7] text-faint">
            Ô vuông sáng = section đang hiển thị trên trang công khai. Lưu là xuất bản ngay.
          </p>
        </aside>

        <main className="min-w-0 px-7 pt-7 pb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/22 pb-[18px]">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-label tracking-[0.13em] text-accent">
                {descriptor.label.toUpperCase()} / SECTION
              </span>
              <h2 className="font-heading text-[1.625rem] leading-[1.25]">{activeSection.label}</h2>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <span className="text-[0.84375rem] text-body">Hiển thị section này</span>
              <Checkbox
                checked={draft.visible !== false}
                onCheckedChange={(checked) => update("visible", checked === true)}
              />
            </label>
          </div>

          {isPending ? (
            <p className="py-10 font-mono text-label text-faint">ĐANG TẢI NỘI DUNG…</p>
          ) : (
            activeSection.fields.map((field) => (
              <FieldEditor
                key={field.key}
                field={field}
                value={draft[field.key]}
                onChange={(next) => update(field.key, next)}
              />
            ))
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button
              type="button"
              variant="primary"
              size="none"
              mono={false}
              className="px-7 py-[15px] text-sm"
              onClick={() => save.mutate()}
              disabled={save.isPending || !dirty}
            >
              Lưu thay đổi
            </Button>
            <span className="max-w-[56ch] text-[0.8125rem] leading-[1.7] text-faint">
              Nội dung lưu trên máy chủ và xuất bản ngay cho cả hai ngôn ngữ. Trường bỏ trống ở một
              ngôn ngữ sẽ dùng lại nội dung gốc của ngôn ngữ đó.
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
