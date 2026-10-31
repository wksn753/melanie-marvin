"use client";

import { useEffect } from "react";

/** Progressive enhancement: content is visible by default if JS is unavailable. */
export function ScrollReveals() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || typeof IntersectionObserver === "undefined") return;

    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });

    items.forEach((item) => observer.observe(item));
    root.classList.add("motion-ready");
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);
  return null;
}
