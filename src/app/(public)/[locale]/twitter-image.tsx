/**
 * Twitter card image.
 *
 * Same composition as the Open Graph image — a wordmark-on-token-background
 * card has nothing platform-specific about it — so this re-exports rather
 * than keeping two copies of the same JSX to drift apart. See
 * opengraph-image.tsx for the composition, the reasoning behind it, and the
 * `@theme` tokens it cites.
 */
export { default, alt, size, contentType, generateStaticParams } from "./opengraph-image";
