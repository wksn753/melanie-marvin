import { BotanicalSprig, TinyFlower } from "@/components/Botanicals";
import { Icon } from "@/components/Icons";
import { Countdown } from "@/components/Countdown";
import { GatefoldIntro, ReplayInvitationButton } from "@/components/GatefoldIntro";
import { Gallery } from "@/components/Gallery";
import { RSVPForm } from "@/components/RSVPForm";
import { ScrollReveals } from "@/components/ScrollReveals";
import { wedding } from "@/config/wedding";
import Image from "next/image";
import { FloralFrame } from "@/components/FloralFrame";
import { MusicDock, MusicPicker, SoundtrackProvider } from "@/components/Soundtrack";

const date = wedding.dateTime ? new Date(wedding.dateTime) : null;
const dateLabel = date ? new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: wedding.timezone }).format(date) : 'Date to be announced';
const dayNumber = date ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', timeZone: wedding.timezone }).format(date) : '';
const month = date ? new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: wedding.timezone }).format(date) : '';
const year = date ? new Intl.DateTimeFormat('en-GB', { year: 'numeric', timeZone: wedding.timezone }).format(date) : '';
const footerYear = year || String(new Date().getFullYear());

export default function Home() {
  return <SoundtrackProvider>
    <GatefoldIntro/>
    <MusicDock/>
    <ScrollReveals/>
    <header className="header"><a className="brand" href="#top" aria-label="Back to top">{wedding.couple.first.charAt(0)} <span>&</span> {wedding.couple.second.charAt(0)}<span className="brand-flower"><Icon name="flower" size={13}/></span></a><nav aria-label="Site navigation"><ReplayInvitationButton/><a href="#our-story">Our story</a><a href="#moments">Gallery</a><a href="#the-day">The day</a><a className="nav-rsvp" href="#rsvp">RSVP <Icon name="arrow-up-right" size={15}/></a></nav></header>
    <main>
      <section className="hero" id="top"><div className="hero-texture"/><FloralFrame/>
        <div className="hero-side-note" aria-hidden="true">A LOVE IN BLOOM <span>·</span> MARVIN & MELANIE</div>
        <div className="hero-center" data-reveal="up"><span className="eyebrow">TOGETHER WITH THEIR FAMILIES</span><div className="ornament"><span></span><TinyFlower/><span></span></div><p className="hero-intro">A beautiful beginning, a lifetime together</p>
          <h1><span>{wedding.couple.first}</span><em>&</em><span>{wedding.couple.second}</span></h1><p className="hero-subtitle">ARE GETTING MARRIED</p>{date ? <div className="hero-date"><span>{month.toUpperCase()}</span><strong>{dayNumber}</strong><span>{year}</span></div> : <div className="date-coming-soon">DATE TO BE ANNOUNCED</div>}<p className="hero-city">{wedding.city}</p><a className="hero-cta" href="#rsvp">Kindly RSVP <Icon name="arrow-up-right" size={15}/></a><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><Icon name="arrow-down" size={18}/></div></div>
      </section>
      <section className="photo-intro" aria-label="A moment with Marvin and Melanie">
        <div className="photo-intro-image" data-reveal="up"><Image src="/photos/marvin-melanie-laughter.webp" alt="Marvin carrying Melanie by the water while they laugh together" fill priority={false} sizes="(max-width: 700px) 100vw, 58vw" /></div>
        <div className="photo-intro-copy" data-reveal="right"><p className="eyebrow">THE BEGINNING OF FOREVER</p><span className="photo-intro-detail"><Icon name="flower" size={30}/></span><h2>Of all the moments,<br/><em>this is ours.</em></h2><p>A little love, a lot of laughter, and the joy of choosing each other.</p><span className="photo-intro-names">Marvin <i>&</i> Melanie</span></div>
      </section>
      <section className="countdown-section" data-reveal="up"><p className="eyebrow">A MOMENT WORTH WAITING FOR</p><h2>Counting down to <em>forever.</em></h2><Countdown target={wedding.dateTime}/><p className="subtle-text">{dateLabel}</p></section>
      <section className="soundtrack-feature" aria-labelledby="song-heading" data-reveal="up">
        <div className="soundtrack-art"><Image src="/illustrations/gramophone.webp" alt="Watercolor gramophone surrounded by ivory wedding flowers" width={396} height={328} /></div>
        <div className="soundtrack-feature-copy"><p className="eyebrow">A LITTLE MUSIC, A LOT OF LOVE</p><h2 id="song-heading">Set the <em>mood.</em></h2><p>Every love story has its melody. Choose whether to hear ours as you explore the invitation.</p><MusicPicker variant="feature" /></div>
      </section>
      <section className="story section-container" id="our-story"><div className="section-flourish" data-reveal="up"><TinyFlower/><span>01 / OUR STORY</span></div><div className="story-layout"><div className="story-title" data-reveal="left"><p className="eyebrow">HOW IT ALL BEGAN</p><h2>Every love story<br/>is beautiful.<br/><em>This one is ours.</em></h2><div className="story-drawn-flower"><Icon name="flower" size={58}/></div></div><div className="story-copy" data-reveal="right"><p className="story-lead">{wedding.couple.tagline}</p><p>{wedding.couple.story}</p><p className="signature">With love, <span>{wedding.couple.first} & {wedding.couple.second}</span></p></div></div></section>
      <section className="gallery-section" id="moments"><div className="section-container"><div className="section-header" data-reveal="up"><div><p className="eyebrow">02 / LITTLE THINGS, BIG LOVE</p><h2>A few moments<br/><em>along the way.</em></h2></div><p>{wedding.gallery.length ? "Our story, in snapshots." : "An album still in bloom."}<br/>The memories we hold close.</p></div><Gallery/></div></section>
      <section className="day-section" id="the-day"><div className="section-container"><div className="day-intro" data-reveal="up"><Image className="day-watercolor" src="/illustrations/calendar-clock.webp" alt="A watercolor wedding calendar with pocket watch and flowers" width={352} height={296}/><p className="eyebrow">03 / THE CELEBRATION</p><h2>The day we say <em>yes.</em></h2><p>{wedding.message}</p></div><div className="day-details" data-reveal="up"><div className="date-card"><span className="eyebrow">SAVE THE DATE</span><strong>{dayNumber || <Icon name="heart" size={45}/>}</strong><span>{date ? `${month} ${year}` : "Date to be announced"}</span><div className="date-divider"/><p>{dateLabel}</p>{date && <a className="text-link" href="/api/calendar">Add to calendar <Icon name="calendar" size={15}/></a>}</div><div className="day-venue"><p className="eyebrow">THE PLACE</p><h3>{wedding.venue.name}</h3><p>{wedding.venue.address}</p>{wedding.venue.mapUrl && <a className="text-link" href={wedding.venue.mapUrl} target="_blank" rel="noopener noreferrer">Get directions <Icon name="map-pin" size={15}/></a>}<div className="venue-rule"/><Image className="dress-watercolor" src="/illustrations/dress-code.webp" alt="Watercolor wedding outfits with sage, gold and blush dress-code colors" width={384} height={334}/><p className="eyebrow">DRESS CODE</p><p>{wedding.dressCode}</p></div></div>
        <div className="schedule" data-reveal="up"><div><p className="eyebrow">OUR WEDDING DAY</p><h3>Order of <em>celebration.</em></h3></div><div className="timeline">{wedding.program.map((item, i) => <div className="timeline-item" key={i} data-reveal="right" data-reveal-delay={String(i % 3)}><span className="timeline-time">{item.time}</span><span className="timeline-dot"/><div><h4>{item.name}</h4><p>{item.detail}</p></div></div>)}</div></div>
      </div></section>
      <section className="rsvp-section" id="rsvp"><BotanicalSprig className="rsvp-plant left"/><BotanicalSprig className="rsvp-plant right" mirrored/><div className="rsvp-content" data-reveal="up"><p className="eyebrow">04 / BE PART OF OUR DAY</p><TinyFlower className="rsvp-flower"/><h2>Will you join<br/><em>our celebration?</em></h2><p className="rsvp-copy">We can&apos;t imagine this day without the people we love. Kindly let us know if you&apos;ll be there.</p>{wedding.rsvpDeadline && <p className="rsvp-deadline">PLEASE REPLY BY {new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'long',year:'numeric', timeZone:'UTC'}).format(new Date(`${wedding.rsvpDeadline}T12:00:00Z`)).toUpperCase()}</p>}<RSVPForm siteKey={process.env.TURNSTILE_SITE_KEY ?? ""}/></div></section>
      <section className="faq section-container"><div className="section-header" data-reveal="up"><div><p className="eyebrow">A FEW MORE DETAILS</p><h2>Good to <em>know.</em></h2></div><p>Little details to help you<br/>enjoy every moment.</p></div><div className="faq-list" data-reveal="up">{wedding.faq.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></section>
      <section className="closing" data-reveal="up"><TinyFlower/><p className="eyebrow">WE CAN'T WAIT TO SEE YOU</p><h2>Love, laughter &<br/><em>happily ever after.</em></h2><p>{wedding.couple.first} <span>&</span> {wedding.couple.second}</p></section>
    </main><footer><span>{wedding.couple.first} & {wedding.couple.second}</span><span>MADE WITH LOVE · {footerYear}</span><a href="#top">BACK TO TOP <Icon name="arrow-up" size={14}/></a></footer>
  </SoundtrackProvider>;
}
