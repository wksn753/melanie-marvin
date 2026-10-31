"use client";

/* eslint-disable react-hooks/set-state-in-effect -- Initial client-only sessionStorage state cannot be read during server rendering. */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "./Icons";
import { BotanicalSprig, TinyFlower } from "./Botanicals";
import { FallingPetals, LivingEmbroidery } from "./LiveFlorals";
import { wedding } from "@/config/wedding";
import { MusicPicker } from "./Soundtrack";

type IntroState = "closed" | "opening" | "revealed";
const STORAGE_KEY = "melanie-marvin-invitation-opened-v1";

/** A two-panel wedding card. Each panel rotates around an OUTSIDE hinge (not an envelope flap). */
export function GatefoldIntro() {
  const [stage, setStage] = useState<IntroState>("closed");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetFocus = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // The card appears on the first visit to this tab, without replaying on every navigation.
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === "yes") setStage("revealed");
    } catch { /* Privacy settings may disable storage; the card remains usable. */ }
    setReady(true);
    const replay = () => {
      if (timer.current) clearTimeout(timer.current);
      setStage("closed");
      requestAnimationFrame(() => resetFocus.current?.focus());
    };
    window.addEventListener("wedding:replay-invitation", replay);
    return () => { window.removeEventListener("wedding:replay-invitation", replay); if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("invitation-revealed", stage === "revealed");
    return () => { document.documentElement.classList.remove("invitation-revealed"); };
  }, [ready, stage]);

  useEffect(() => {
    if (stage === "closed" && ready) resetFocus.current?.focus({ preventScroll: true });
  }, [ready, stage]);

  useEffect(() => {
    if (stage === "revealed" || !ready) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [stage, ready]);

  function openCard() {
    if (stage !== "closed") return;
    setStage("opening");
    window.dispatchEvent(new Event("wedding:open-invitation"));
    try { window.sessionStorage.setItem(STORAGE_KEY, "yes"); } catch { /* Still opens */ }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => setStage("revealed"), reducedMotion ? 200 : 2450);
  }

  function trapFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const nodes = event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  if (!ready) return <div className="gatefold-loading" aria-hidden="true" />;
  if (stage === "revealed") return null;

  return <div className={`gatefold-overlay gatefold-${stage}`} role="dialog" aria-modal="true" aria-label="Marvin and Melanie's wedding invitation" onKeyDown={trapFocus}>
    <div className="gatefold-scene">
      <BotanicalSprig className="intro-botanical intro-botanical-left" />
      <BotanicalSprig className="intro-botanical intro-botanical-right" mirrored/>
      <p className="gatefold-eyebrow">A SPECIAL INVITATION FOR YOU</p>
      <span className="gatefold-chapter" aria-hidden="true">MARVIN <i>&</i> MELANIE · A LOVE IN BLOOM</span>
      <div className="gatefold-divider" aria-hidden="true"><span/><TinyFlower/><span/></div>
      <button
        className="gatefold-stage"
        type="button"
        ref={resetFocus}
        onClick={openCard}
        disabled={stage === "opening"}
        aria-label="Open Marvin and Melanie's floral wedding card"
      >
        <span className="gatefold-card">
          <span className="gatefold-inner">
            <BotanicalSprig className="gate-inner-botanical left"/>
            <BotanicalSprig className="gate-inner-botanical right" mirrored/>
            <span className="gatefold-inner-content">
              <span className="gate-inside-eyebrow">TOGETHER WITH OUR FAMILIES</span>
              <span className="gate-inner-flower" aria-hidden="true"><Icon name="flower" size={27}/></span>
              <span className="gate-names">{wedding.couple.first}<em>&</em>{wedding.couple.second}</span>
              <span className="gate-ornament"><Icon name="heart" size={25}/></span>
              <span className="gate-invitation-message">request the pleasure<br/>of your company</span>
              <span className="gate-sentiment">SATURDAY · 1 MAY 2027</span>
            </span>
          </span>
          <span className="gatefold-door gatefold-door-left" aria-hidden="true"><Image src="/images/gatefold-left.png" alt="" width={284} height={859} priority unoptimized draggable={false}/><LivingEmbroidery side="left" /></span>
          <span className="gatefold-door gatefold-door-right" aria-hidden="true"><Image src="/images/gatefold-right.png" alt="" width={283} height={859} priority unoptimized draggable={false}/><LivingEmbroidery side="right" /></span>
          <span className="gatefold-seal" aria-hidden="true">M <i>&</i> M</span>
          <FallingPetals/>
        </span>
      </button>
      <button type="button" className="gatefold-open-btn" onClick={openCard} disabled={stage === "opening"}>
        {stage === "opening" ? "OPENING WITH LOVE…" : "OPEN OUR INVITATION"}
        <span aria-hidden="true"><Icon name={stage === "opening" ? "heart" : "arrow-right"} size={18}/></span>
      </button>
      <MusicPicker variant="intro"/>
      <p className="gatefold-caption">A little note, sent with all our love.</p>
      <div className="gatefold-footer-ornament" aria-hidden="true"><Icon name="flower" size={19}/></div>
    </div>
  </div>;
}

/** Can be shown in the header at any point to play the invitation opening again. */
export function ReplayInvitationButton() {
  return <button type="button" className="replay-invitation" onClick={() => window.dispatchEvent(new Event("wedding:replay-invitation"))}>View invitation <Icon name="flower" size={14}/></button>;
}
