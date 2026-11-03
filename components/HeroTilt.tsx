"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { preload } from "react-dom";

const MAX = 16; // degrees
const SPRING = { stiffness: 140, damping: 18, mass: 0.6 };
const POSTER = "/videos/racket-hovering-poster.jpg";

type Mode = "tilt" | "float" | "static";

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false, // server and first client render: static state, no hydration mismatch
  );
}

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

export function HeroTilt() {
  preload(POSTER, { as: "image", fetchPriority: "high" });

  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const coarse = useMediaQuery("(hover: none), (pointer: coarse)");
  const mode: Mode = reduced ? "static" : coarse ? "float" : "tilt";

  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rects = useRef<{ hero: DOMRect; stage: DOMRect } | null>(null);

  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const rotateY = useSpring(useTransform(nx, (v) => v * MAX), SPRING);
  const rotateX = useSpring(useTransform(ny, (v) => -v * MAX), SPRING);
  const x = useSpring(useTransform(nx, (v) => v * 12), SPRING);
  const y = useSpring(useTransform(ny, (v) => v * 8), SPRING);
  const glowX = useSpring(useTransform(nx, (v) => v * 40), SPRING);
  const glowY = useSpring(useTransform(ny, (v) => v * 24), SPRING);

  const measure = useCallback(() => {
    if (!heroRef.current || !stageRef.current) return;
    rects.current = {
      hero: heroRef.current.getBoundingClientRect(),
      stage: stageRef.current.getBoundingClientRect(),
    };
  }, []);

  useEffect(() => {
    if (mode !== "tilt") {
      nx.set(0);
      ny.set(0);
      return;
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [mode, measure, nx, ny]);

  function onPointerMove(e: React.PointerEvent) {
    if (mode !== "tilt" || e.pointerType === "touch") return;
    if (!rects.current) measure();
    const r = rects.current;
    if (!r) return;
    // Centre of the (non-rotating) stage is the centre of the paddle.
    const cx = r.stage.left + r.stage.width / 2;
    const cy = r.stage.top + r.stage.height / 2;
    nx.set(clamp((e.clientX - cx) / (r.hero.width / 2)));
    ny.set(clamp((e.clientY - cy) / (r.hero.height / 2)));
  }

  function onPointerLeave() {
    nx.set(0);
    ny.set(0);
  }

  return (
    <section
      ref={heroRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerEnter={measure}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-black"
    >
      <div className="relative z-10 mx-auto grid min-h-[90svh] max-w-7xl items-center gap-6 px-4 pb-24 pt-6 sm:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-4 lg:pt-0">
        {/* Video stage: perspective wrapper (does not rotate) */}
        <div
          ref={stageRef}
          // On phones the stage is wider than the screen: the video's sides are empty black, so
          // this enlarges the paddle without cropping it (the section clips the overflow).
          className="relative -mx-[30%] sm:-mx-[12%] lg:order-2 lg:-mr-10 lg:ml-0"
          style={{ perspective: "1200px" }}
        >
          {/* Soft glow BEHIND the paddle. The video is screen-blended over it, so black adds nothing. */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
            style={{
              x: glowX,
              y: glowY,
              background: "radial-gradient(closest-side, rgb(255 77 26 / 0.9), rgb(255 45 111 / 0.5), rgb(34 211 238 / 0.35), transparent)",
            }}
          />
          {/* The rotating element. Blend + edge mask live here (not on the <video>), because a
              transformed element is its own compositing group: blending the inner video would
              only blend against a transparent backdrop and the glow would reveal its rectangle. */}
          <motion.div
            className="hero-video relative aspect-video w-full"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
              ...(mode === "tilt" ? { rotateX, rotateY, x, y } : {}),
            }}
            animate={
              mode === "float"
                ? {
                    rotateX: [-5, 5, -5],
                    rotateY: [0, 7, 0, -7, 0],
                    y: [-6, 6, -6],
                  }
                : undefined
            }
            transition={
              mode === "float"
                ? {
                    rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.75 },
                  }
                : undefined
            }
          >
            <video
              src="/videos/racket-hovering.mp4"
              poster={POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              className="block size-full object-contain"
            />
          </motion.div>
        </div>

        {/* Copy */}
        <div className="relative lg:order-1">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-frozen">
            Genuine Luzz paddles · Australia
          </p>
          <h1 id="hero-title" className="display text-5xl sm:text-6xl xl:text-7xl">
            Engineered Power.
            <br />
            <span className="gradient-text">Australian Courts.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            Thermoformed and MPP foam paddles from Luzz, shipped Australia-wide. Free standard shipping on orders $150+.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#shop" className="btn btn-primary px-6 py-3 text-base">
              Shop Paddles <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/technology" className="btn btn-secondary px-6 py-3 text-base">
              Explore Technology
            </Link>
          </div>
        </div>
      </div>

      {/* Tall fade from pure black into the page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-black to-obsidian"
      />
    </section>
  );
}
