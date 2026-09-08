"use client";

import { useAnimate, useReducedMotion, type AnimationPlaybackControlsWithThen } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

/**
 * The scrolling strip under the hero.
 *
 * The content is rendered twice and the track animates to exactly -50%, so the
 * second copy sits where the first one started at the moment the loop restarts —
 * that is what makes the seam invisible. The duplicate is `aria-hidden`: a
 * screen reader must not read the same eight words twice.
 *
 * 38s linear matches the `pvdrift` keyframes in the design mock. Pointer-over
 * sets playback speed to 0 rather than stopping the animation, so a reader who
 * pauses to read it resumes mid-word instead of snapping back to the start.
 * Under `prefers-reduced-motion` it never starts.
 */
export function Marquee({ items }: { items: string }) {
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const playback = useRef<AnimationPlaybackControlsWithThen | null>(null);

  useEffect(() => {
    if (reduceMotion || !scope.current) return;

    playback.current = animate(
      scope.current,
      { x: ["0%", "-50%"] },
      { duration: 38, ease: "linear", repeat: Infinity },
    );

    return () => playback.current?.stop();
  }, [animate, reduceMotion, scope]);

  // Two named handlers rather than a `setSpeed(n)` factory: a factory is called
  // during render, which reads the ref during render.
  const pause = useCallback(() => {
    const controls = playback.current;
    if (controls) controls.speed = 0;
  }, []);

  const resume = useCallback(() => {
    const controls = playback.current;
    if (controls) controls.speed = 1;
  }, []);

  const parts = items
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);

  const strip = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      // `text-faint`, not the `--color-copy` the token table names for this
      // strip: #4A5872 on the #070B18 band measures 2.74:1 at 12px, and moving
      // text below 4.5:1 is the one thing the strip cannot be. #7C8AA3 is the
      // next token up and reaches 5.63:1 on the same band. `text-kicker` is the
      // 12px mono step the design already defines; it was hand-typed here.
      className="flex gap-14 px-7 py-[18px] font-mono text-kicker whitespace-nowrap text-faint"
    >
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className="flex gap-14">
          {part}
          <span aria-hidden>·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="overflow-hidden bg-marquee"
      onPointerEnter={pause}
      onPointerLeave={resume}
    >
      <div ref={scope} className="flex w-max">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
