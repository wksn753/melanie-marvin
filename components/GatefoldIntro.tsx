"use client";

/* eslint-disable react-hooks/set-state-in-effect -- Synchronizing initial client-only session state. */

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { TinyFlower } from "./Botanicals";
import { EmbroideredDoors } from "./EmbroideredDoors";
import { wedding } from "@/config/wedding";
import { GATEFOLD_THEME } from "@/config/gatefold";
import { MusicPicker } from "./Soundtrack";

type IntroState = "closed" | "opening" | "revealed";
const STORAGE_KEY = "marvin-melanie-invitation-opened-v2";

export function GatefoldIntro() {
  const [stage, setStage] = useState<IntroState>("closed");
  const [ready, setReady] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try { if (sessionStorage.getItem(STORAGE_KEY) === "yes") setStage("revealed"); }
    catch { /* Storage can be disabled. */ }
    setReady(true);
    const replay = () => {
      if (timer.current) clearTimeout(timer.current);
      setStage("closed");
      requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
    };
    window.addEventListener("wedding:replay-invitation", replay);
    return () => { window.removeEventListener("wedding:replay-invitation", replay); if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("invitation-revealed", stage === "revealed");
    return () => document.documentElement.classList.remove("invitation-revealed");
  }, [stage, ready]);

  useEffect(() => {
    if (!ready || stage === "revealed") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [stage, ready]);

  function openCard() {
    if (stage !== "closed") return;
    setStage("opening");
    window.dispatchEvent(new Event("wedding:open-invitation"));
    try { sessionStorage.setItem(STORAGE_KEY, "yes"); } catch { /* Not essential */ }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => setStage("revealed"), reduced ? 120 : 2250);
  }

  function trapFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const nodes = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])')];
    if (!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  if (!ready) return <div className="gatefold-loading" aria-hidden="true" />;
  if (stage === "revealed") return null;

  return <div className="gatefold-overlay gatefold-art-overlay" role="dialog" aria-modal="true" aria-label="Marvin and Melanie's wedding invitation" onKeyDown={trapFocus}>
    <EmbroideredDoors theme={GATEFOLD_THEME} opening={stage === "opening"} onOpen={openCard} triggerRef={trigger}>
      <div className="gatefold-art-message">
        <span className="gatefold-art-eyebrow">TOGETHER WITH THEIR FAMILIES</span>
        <div className="gatefold-art-flourish" aria-hidden="true"><span/><TinyFlower/><span/></div>
        <p>With hearts full of joy</p>
        <h1>{wedding.couple.first}<em>&amp;</em>{wedding.couple.second}</h1>
        <span className="gatefold-art-subtitle">REQUEST THE PLEASURE OF YOUR COMPANY</span>
        <strong>SATURDAY, 1 MAY 2027</strong>
        <span className="gatefold-art-location">ALL SAINTS CATHEDRAL, NAKASERO</span>
        <span className="gatefold-art-location">RECEPTION AT NAGURU GARDENS</span>
        <span className="gatefold-art-continue">SCROLL TO DISCOVER OUR DAY</span>
      </div>
    </EmbroideredDoors>
    <div className="gatefold-art-music"><MusicPicker variant="intro" /></div>
  </div>;
}

export function ReplayInvitationButton() {
  return <button type="button" className="replay-invitation" onClick={() => window.dispatchEvent(new Event("wedding:replay-invitation"))}>View invitation <Icon name="flower" size={14} /></button>;
}
