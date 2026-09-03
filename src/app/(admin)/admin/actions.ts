"use server";

import { revalidatePath } from "next/cache";

import { signInAdmin, signOutAdmin } from "@/lib/auth/admin";

/**
 * Sign-in for the CMS. A server action rather than a route handler so the login
 * form works with no JavaScript at all — the CMS should still be reachable when
 * a bundle fails to load, which is exactly when someone needs to fix a page.
 */
export async function signIn(_state: { error?: string }, formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!(await signInAdmin(password))) {
    return { error: "Mật khẩu không đúng." };
  }

  revalidatePath("/admin");
  return {};
}

export async function signOut() {
  await signOutAdmin();
  revalidatePath("/admin");
}
