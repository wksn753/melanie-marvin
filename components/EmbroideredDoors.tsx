"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import s from "./EmbroideredDoors.module.css";

export type GatefoldTheme = "sage" | "rose" | "lavender";

type Props = {
  theme?: GatefoldTheme;
  opening: boolean;
  onOpen: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
};

/** Image-backed, 3D side-opening card. All theme paths come from an allowlisted union. */
export function EmbroideredDoors({ theme = "sage", opening, onOpen, triggerRef, children }: Props) {
  const base = `/art/${theme}`;
  const vars = {
    "--doors-m": `url("${base}/doors-mobile.svg")`,
    "--doors-d": `url("${base}/doors-desktop.svg")`,
    "--bow-m": `url("${base}/bow-mobile.webp")`,
    "--bow-d": `url("${base}/bow-desktop.webp")`,
    "--linen": 'url("/art/linen.webp")',
  } as CSSProperties;

  return <>
    {/* Preload the matching size only. Next/React may move these into the head. */}
    <link rel="preload" as="image" href={`${base}/doors-mobile.svg`} media="(max-width: 899px), (orientation: portrait)" />
    <link rel="preload" as="image" href={`${base}/bow-mobile.webp`} media="(max-width: 899px), (orientation: portrait)" />
    <link rel="preload" as="image" href={`${base}/doors-desktop.svg`} media="(min-width: 900px) and (orientation: landscape)" />
    <link rel="preload" as="image" href={`${base}/bow-desktop.webp`} media="(min-width: 900px) and (orientation: landscape)" />

    <div className={`${s.stage} ${opening ? s.open : ""}`} style={vars}>
      <div className={s.content}>{children}</div>
      <div className={s.doors} aria-hidden="true">
        <div className={`${s.panel} ${s.left}`}><div className={s.bow}/></div>
        <div className={`${s.panel} ${s.right}`}><div className={s.bow}/></div>
      </div>
      <button
        ref={triggerRef}
        className={s.trigger}
        type="button"
        disabled={opening}
        onClick={onOpen}
        aria-label="Open Marvin and Melanie's wedding invitation"
      >
        <span className={s.triggerText}>{opening ? "OPENING WITH LOVE" : "OPEN OUR INVITATION"}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></span>
      </button>
    </div>
  </>;
}
