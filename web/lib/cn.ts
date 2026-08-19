/** Ghép class, bỏ giá trị rỗng. Đủ dùng cho landing 1 trang — không kéo thêm dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
