import { AdminShell } from "@/components/admin/admin-shell";
import { LoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated, isAdminLocked } from "@/lib/auth/admin";

/**
 * /admin — the CMS.
 *
 * Never static: the answer depends on the caller's session cookie, so caching a
 * rendered page here would serve one visitor's authenticated view to the next.
 */
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (isAdminLocked()) {
    return (
      <main className="flex min-h-screen items-center justify-center px-gutter">
        <div className="flex max-w-[46ch] flex-col gap-3">
          <span className="font-mono text-label tracking-[0.14em] text-accent">PEBBLE VINA CMS</span>
          <h1 className="font-heading text-[1.625rem] leading-[1.25]">Chưa cấu hình mật khẩu</h1>
          <p className="text-lead text-body">
            Đặt biến môi trường <code className="font-mono text-ink">ADMIN_PASSWORD</code> rồi khởi
            động lại. Không có mật khẩu thì CMS đóng — đây là trang sửa được nội dung trang công
            khai.
          </p>
        </div>
      </main>
    );
  }

  if (!(await isAdminAuthenticated())) {
    return <LoginForm />;
  }

  return <AdminShell />;
}
