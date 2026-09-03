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
      className="flex gap-14 px-7 py-[18px] font-mono text-[0.75rem] tracking-[0.15em] whitespace-nowrap text-copy"
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
