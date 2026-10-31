import { BotanicalSprig, TinyFlower } from "@/components/Botanicals";
import { Countdown } from "@/components/Countdown";
import { GatefoldIntro, ReplayInvitationButton } from "@/components/GatefoldIntro";
import { Gallery } from "@/components/Gallery";
import { RSVPForm } from "@/components/RSVPForm";
import { ScrollReveals } from "@/components/ScrollReveals";
import { wedding } from "@/config/wedding";

const date = wedding.dateTime ? new Date(wedding.dateTime) : null;
const dateLabel = date ? new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: wedding.timezone }).format(date) : 'Date to be announced';
const dayNumber = date ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', timeZone: wedding.timezone }).format(date) : '';
const month = date ? new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: wedding.timezone }).format(date) : '';
const year = date ? new Intl.DateTimeFormat('en-GB', { year: 'numeric', timeZone: wedding.timezone }).format(date) : '';
const footerYear = year || String(new Date().getFullYear());

export default function Home() {
  return <>
    <GatefoldIntro/>
    <ScrollReveals/>
    <header className="header"><a className="brand" href="#top" aria-label="Back to top">{wedding.couple.first.charAt(0)} <span>&</span> {wedding.couple.second.charAt(0)}<span className="brand-flower">✳</span></a><nav aria-label="Site navigation"><ReplayInvitationButton/><a href="#our-story">Our story</a><a href="#moments">Gallery</a><a href="#the-day">The day</a><a className="nav-rsvp" href="#rsvp">RSVP <span>↗</span></a></nav></header>
    <main>
      <section className="hero" id="top"><div className="hero-texture"/><BotanicalSprig className="hero-botanical hero-botanical-left"/><BotanicalSprig className="hero-botanical hero-botanical-right" mirrored/>
        <div className="hero-center" data-reveal="up"><span className="eyebrow">TOGETHER WITH THEIR FAMILIES</span><div className="ornament"><span></span><TinyFlower/><span></span></div><p className="hero-intro">The joy of a lifetime begins with you</p>
          <h1>{wedding.couple.first}<em>&</em>{wedding.couple.second}</h1><p className="hero-subtitle">ARE GETTING MARRIED</p>{date ? <div className="hero-date"><span>{month.toUpperCase()}</span><strong>{dayNumber}</strong><span>{year}</span></div> : <div className="date-coming-soon">DATE TO BE ANNOUNCED</div>}<p className="hero-city">{wedding.city}</p><a className="hero-cta" href="#rsvp">Kindly RSVP <span>↗</span></a><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i>↓</i></div></div>
      </section>
      <section className="countdown-section" data-reveal="up"><p className="eyebrow">A MOMENT WORTH WAITING FOR</p><h2>Counting down to <em>forever.</em></h2><Countdown target={wedding.dateTime}/><p className="subtle-text">{dateLabel}</p></section>
      <section className="story section-container" id="our-story"><div className="section-flourish" data-reveal="up"><TinyFlower/><span>01 / OUR STORY</span></div><div className="story-layout"><div className="story-title" data-reveal="left"><p className="eyebrow">HOW IT ALL BEGAN</p><h2>Every love story<br/>is beautiful.<br/><em>This one is ours.</em></h2><div className="story-drawn-flower">✳</div></div><div className="story-copy" data-reveal="right"><p className="story-lead">{wedding.couple.tagline}</p><p>{wedding.couple.story}</p><p className="signature">With love, <span>{wedding.couple.first} & {wedding.couple.second}</span></p></div></div></section>
      <section className="gallery-section" id="moments"><div className="section-container"><div className="section-header" data-reveal="up"><div><p className="eyebrow">02 / LITTLE THINGS, BIG LOVE</p><h2>A few moments<br/><em>along the way.</em></h2></div><p>Our story, in snapshots.<br/>The memories we hold close.</p></div><Gallery/></div></section>
      <section className="day-section" id="the-day"><div className="section-container"><div className="day-intro" data-reveal="up"><p className="eyebrow">03 / THE CELEBRATION</p><h2>The day we say <em>yes.</em></h2><p>{wedding.message}</p></div><div className="day-details" data-reveal="up"><div className="date-card"><span className="eyebrow">SAVE THE DATE</span><strong>{dayNumber || "♡"}</strong><span>{date ? `${month} ${year}` : "Date to be announced"}</span><div className="date-divider"/><p>{dateLabel}</p>{date && <a className="text-link" href="/api/calendar">Add to calendar ↗</a>}</div><div className="day-venue"><p className="eyebrow">THE PLACE</p><h3>{wedding.venue.name}</h3><p>{wedding.venue.address}</p>{wedding.venue.mapUrl && <a className="text-link" href={wedding.venue.mapUrl} target="_blank" rel="noopener noreferrer">Get directions ↗</a>}<div className="venue-rule"/><p className="eyebrow">DRESS CODE</p><p>{wedding.dressCode}</p></div></div>
        <div className="schedule" data-reveal="up"><div><p className="eyebrow">OUR WEDDING DAY</p><h3>Order of <em>celebration.</em></h3></div><div className="timeline">{wedding.program.map((item, i) => <div className="timeline-item" key={i} data-reveal="right" data-reveal-delay={String(i % 3)}><span className="timeline-time">{item.time}</span><span className="timeline-dot"/><div><h4>{item.name}</h4><p>{item.detail}</p></div></div>)}</div></div>
      </div></section>
      <section className="rsvp-section" id="rsvp"><BotanicalSprig className="rsvp-plant left"/><BotanicalSprig className="rsvp-plant right" mirrored/><div className="rsvp-content" data-reveal="up"><p className="eyebrow">04 / BE PART OF OUR DAY</p><TinyFlower className="rsvp-flower"/><h2>Will you join<br/><em>our celebration?</em></h2><p className="rsvp-copy">We can&apos;t imagine this day without the people we love. Kindly let us know if you&apos;ll be there.</p>{wedding.rsvpDeadline && <p className="rsvp-deadline">PLEASE REPLY BY {new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'long',year:'numeric', timeZone:'UTC'}).format(new Date(`${wedding.rsvpDeadline}T12:00:00Z`)).toUpperCase()}</p>}<RSVPForm siteKey={process.env.TURNSTILE_SITE_KEY ?? ""}/></div></section>
      <section className="faq section-container"><div className="section-header" data-reveal="up"><div><p className="eyebrow">A FEW MORE DETAILS</p><h2>Good to <em>know.</em></h2></div><p>Little details to help you<br/>enjoy every moment.</p></div><div className="faq-list" data-reveal="up">{wedding.faq.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></section>
      <section className="closing" data-reveal="up"><TinyFlower/><p className="eyebrow">WE CAN'T WAIT TO SEE YOU</p><h2>Love, laughter &<br/><em>happily ever after.</em></h2><p>{wedding.couple.first} <span>&</span> {wedding.couple.second}</p></section>
    </main><footer><span>{wedding.couple.first} & {wedding.couple.second}</span><span>MADE WITH LOVE · {footerYear}</span><a href="#top">BACK TO TOP ↑</a></footer>
  </>;
}
