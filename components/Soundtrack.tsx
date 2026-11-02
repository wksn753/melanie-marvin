"use client";

import { Icon } from "./Icons";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/** This track was composed for this demo, not copied from a commercial song.
 * To use a real wedding song, replace the file only after you have permission to use it. */
export const soundtrackOptions = [
  { id: "none", title: "No music", subtitle: "A quiet invitation", length: "" },
  { id: "garden", title: "Garden Waltz", subtitle: "Original instrumental preview", length: "0:25" },
] as const;

type Track = (typeof soundtrackOptions)[number]["id"];
type AudioControls = { selected: Track; playing: boolean; select: (next: Track, playImmediately?: boolean) => void; toggle: () => void };
const SoundtrackContext = createContext<AudioControls | null>(null);

export function SoundtrackProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Track>("garden");
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function play() {
    const audio = audioRef.current;
    if (!audio) return;
    // Browser autoplay rules: only called after the guest chooses music or opens the card.
    void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }
  function pause() { audioRef.current?.pause(); setPlaying(false); }
  function select(next: Track, playImmediately = true) {
    setSelected(next);
    if (next === "none") { pause(); if (audioRef.current) audioRef.current.currentTime = 0; }
    else if (playImmediately) play();
  }
  function toggle() { if (playing) pause(); else if (selected === "garden") play(); else select("garden", true); }

  useEffect(() => {
    const onOpening = () => {
      const audio = audioRef.current;
      if (selected !== "none" && audio?.paused) void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    window.addEventListener("wedding:open-invitation", onOpening);
    return () => window.removeEventListener("wedding:open-invitation", onOpening);
  }, [selected]);

  return <SoundtrackContext.Provider value={{ selected, playing, select, toggle }}>
    {children}
    <audio ref={audioRef} preload="metadata" loop onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} aria-label="Garden Waltz instrumental wedding music"><source src="/audio/garden-waltz.mp3" type="audio/mpeg"/><source src="/audio/garden-waltz.ogg" type="audio/ogg"/></audio>
  </SoundtrackContext.Provider>;
}

function useSoundtrack() {
  const value = useContext(SoundtrackContext);
  if (!value) throw new Error("Music controls must be within SoundtrackProvider");
  return value;
}

/** Music starts on the guest’s Open Invitation tap, then has persistent controls. */
export function MusicPicker({ variant = "feature" }: { variant?: "intro" | "feature" | "dock" }) {
  const { selected, playing, select, toggle } = useSoundtrack();
  const [open, setOpen] = useState(false);
  const current = soundtrackOptions.find(item => item.id === selected)!;
  return <div className={`music-control music-control-${variant}`} onKeyDown={e => { if (e.key === "Escape") setOpen(false); }}>
    <button type="button" className="music-trigger" aria-expanded={open} aria-label={variant === "dock" ? "Opening song settings" : undefined} onClick={() => setOpen(o => !o)}>
      <Icon name="music" size={17}/>
      <span>{variant === "intro" ? "Choose an opening song" : variant === "dock" ? (playing ? "Music on" : "Music") : current.title === "No music" ? "Choose our opening song" : current.title}</span>
      <span className="music-chevron" aria-hidden="true"><Icon name="chevron-down" size={17}/></span>
    </button>
    {open && <div className="music-choices" role="group" aria-label="Opening song options">
      <p className="music-picker-label">YOUR INVITATION SOUNDTRACK</p>
      {soundtrackOptions.map(track => <button type="button" className={`music-choice ${selected === track.id ? "is-active" : ""}`} key={track.id} aria-pressed={selected === track.id} onClick={() => { select(track.id, variant !== "intro"); setOpen(false); }}>
        <span className="music-choice-mark" aria-hidden="true">{selected === track.id ? <Icon name="check" size={14}/> : null}</span>
        <span className="music-choice-copy"><strong>{track.title}</strong><small>{track.subtitle}</small></span>
        <small className="music-length">{track.length}</small>
      </button>)}
      <p className="music-picker-note">The selected song begins when you open the invitation. You can pause or turn it off at any time.</p>
    </div>}
    {selected !== "none" && variant !== "intro" && <button className="music-play-toggle" type="button" onClick={toggle} aria-label={playing ? "Pause wedding music" : "Play wedding music"}>{playing ? "Pause" : "Play"}<span aria-hidden="true"><Icon name={playing ? "pause" : "play"} size={15}/></span></button>}
  </div>;
}

export function MusicDock() {
  return <aside className="music-dock" aria-label="Background music settings"><MusicPicker variant="dock" /></aside>;
}
