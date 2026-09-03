"use client";

import { create } from "zustand";

import type { ContentPageId } from "@/lib/content/schema";

/**
 * Admin navigation state — which page and section the editor is looking at,
 * and whether the open section has unsaved edits.
 *
 * Deliberately holds no content: the document is server state and belongs to
 * TanStack Query (`src/lib/api/content.ts`). Keeping a second copy here is how
 * a CMS starts showing one editor a value another editor already overwrote.
 */
interface AdminState {
  page: ContentPageId;
  section: string;
  dirty: boolean;
  selectPage: (page: ContentPageId, firstSection: string) => void;
  selectSection: (section: string) => void;
  setDirty: (dirty: boolean) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  page: "home",
  section: "hero",
  selectPage: (page, firstSection) => set({ page, section: firstSection, dirty: false }),
  selectSection: (section) => set({ section, dirty: false }),
  dirty: false,
  setDirty: (dirty) => set({ dirty }),
}));
