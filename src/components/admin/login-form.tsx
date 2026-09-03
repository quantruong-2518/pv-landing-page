"use client";

import { useActionState } from "react";

import { signIn } from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field-label";
import { Input } from "@/components/ui/input";

/**
 * CMS sign-in. Progressive by construction: it is a plain form posting to a
 * server action, so it submits before hydration and reports its error from the
 * server rather than from client state.
 */
export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, {} as { error?: string });

  return (
    <main className="flex min-h-screen items-center justify-center px-gutter">
      <form action={formAction} className="flex w-full max-w-[380px] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-label tracking-[0.14em] text-accent">PEBBLE VINA CMS</span>
          <h1 className="font-heading text-[1.625rem] leading-[1.25]">Quản trị nội dung</h1>
        </div>

        <div className="flex flex-col gap-2.5">
          <FieldLabel htmlFor="admin-password">MẬT KHẨU</FieldLabel>
          <Input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="bg-field"
            aria-invalid={Boolean(state?.error)}
          />
        </div>

        {state?.error ? (
          <p role="alert" className="text-[0.8125rem] text-accent-hover">
            {state.error}
          </p>
        ) : null}

        <Button type="submit" variant="primary" size="xl" mono={false} disabled={pending}>
          {pending ? "Đang kiểm tra…" : "Đăng nhập"}
        </Button>
      </form>
    </main>
  );
}
