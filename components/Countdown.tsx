"use client";

/* eslint-disable react-hooks/set-state-in-effect -- Countdown timestamps are browser-clock driven and update after hydration. */

import { useEffect, useState } from "react";

function remaining(target: string) {
  const delta = Math.max(0, new Date(target).getTime() - Date.now());
  const seconds = Math.floor(delta / 1000);
  return { days: Math.floor(seconds / 86400), hours: Math.floor((seconds % 86400) / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60, done: delta === 0 };
}

export function Countdown({ target }: {target: string | null}) {
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null);
  useEffect(() => { if (!target) return; const update = () => setTime(remaining(target)); update(); const id = window.setInterval(update, 1000); return () => clearInterval(id); }, [target]);
  if (!target) return <p className="countdown-finished">Our special date will be announced soon</p>;
  if (!time) return <div className="countdown" aria-label="Wedding countdown loading">{["Days", "Hours", "Minutes", "Seconds"].map(label => <div key={label}><strong>--</strong><span>{label}</span></div>)}</div>;
  if (time.done) return <p className="countdown-finished">The day we say “I do” has arrived</p>;
  return <div className="countdown" role="timer" aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes until the wedding`}>
    {([['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']] as const).map(([key, label]) => <div key={key}><strong>{String(time[key]).padStart(2, '0')}</strong><span>{label}</span></div>)}
  </div>;
}
