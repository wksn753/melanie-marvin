import Image from "next/image";
import { BotanicalSprig, TinyFlower } from "@/components/Botanicals";
import { Icon } from "@/components/Icons";
import { Countdown } from "@/components/Countdown";
import { GatefoldIntro, ReplayInvitationButton } from "@/components/GatefoldIntro";
import { Gallery } from "@/components/Gallery";
import { RSVPForm } from "@/components/RSVPForm";
import { ScrollReveals } from "@/components/ScrollReveals";
import { FloralFrame } from "@/components/FloralFrame";
import { MusicDock, MusicPicker, SoundtrackProvider } from "@/components/Soundtrack";
import { wedding } from "@/config/wedding";

const weddingDay = new Date(wedding.dateTime);
const dateLabel = new Intl.DateTimeFormat("en-GB", {
  weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: wedding.timezone,
}).format(weddingDay);
const dayNumber = new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: wedding.timezone }).format(weddingDay);
const month = new Intl.DateTimeFormat("en-GB", { month: "long", timeZone: wedding.timezone }).format(weddingDay);
const year = new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: wedding.timezone }).format(weddingDay);

export default function Home() {
  return <SoundtrackProvider>
    <GatefoldIntro />
    <MusicDock />
    <ScrollReveals />

    <header className="header">
      <a className="brand" href="#top" aria-label="Back to top">
        {wedding.couple.first.charAt(0)} <span>&amp;</span> {wedding.couple.second.charAt(0)}
        <span className="brand-flower"><Icon name="flower" size={13} /></span>
      </a>
      <nav aria-label="Site navigation">
        <ReplayInvitationButton />
        <a href="#our-story">Our story</a>
        <a href="#moments">Gallery</a>
        <a href="#the-day">The day</a>
        <a className="nav-rsvp" href="#rsvp">RSVP <Icon name="arrow-up-right" size={15} /></a>
      </nav>
    </header>

    <main>
      <section className="hero" id="top">
        <div className="hero-texture" />
        <FloralFrame />
        <div className="hero-center" data-reveal="up">
          <span className="eyebrow">TOGETHER WITH THEIR FAMILIES</span>
          <div className="ornament"><span /><TinyFlower /><span /></div>
          <p className="hero-intro">A beautiful beginning, a lifetime together</p>
          <h1><span>{wedding.couple.first}</span><em>&amp;</em><span>{wedding.couple.second}</span></h1>
          <p className="hero-subtitle">ARE GETTING MARRIED</p>
          <div className="hero-date"><span>{month.toUpperCase()}</span><strong>{dayNumber}</strong><span>{year}</span></div>
          <p className="hero-city">SATURDAY · KAMPALA, UGANDA</p>
          <p className="hero-locations">All Saints Cathedral, Nakasero <span aria-hidden="true">·</span> Naguru Gardens</p>
          <a className="hero-cta" href="#rsvp">Kindly RSVP <Icon name="arrow-up-right" size={15} /></a>
          <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><Icon name="arrow-down" size={18} /></div>
        </div>
      </section>

      <section className="photo-intro" aria-label="Marvin and Melanie's first photo chapter">
        <div className="photo-intro-image" data-reveal="up">
          <Image src="/photos/marvin-melanie-laughter.webp" alt="Marvin carrying Melanie beside the water as they share a playful moment" fill priority={false} sizes="(max-width: 700px) 100vw, 58vw" />
        </div>
        <div className="photo-intro-copy" data-reveal="right">
          <p className="eyebrow">01 / LITTLE JOYS</p>
          <span className="photo-intro-detail"><Icon name="flower" size={30}/></span>
          <h2>Of all the moments,<br/><em>this is ours.</em></h2>
          <p>A little love, a lot of laughter, and the joy of choosing each other.</p>
          <span className="photo-intro-names">Marvin <i>&amp;</i> Melanie</span>
        </div>
      </section>

      <section className="countdown-section" data-reveal="up">
        <p className="eyebrow">A MOMENT WORTH WAITING FOR</p>
        <h2>Counting down to <em>forever.</em></h2>
        <Countdown target={wedding.dateTime} />
        <p className="subtle-text">{dateLabel} · Kampala, Uganda</p>
      </section>

      <section className="soundtrack-feature" aria-labelledby="song-heading" data-reveal="up">
        <div className="soundtrack-art">
          <Image src="/illustrations/gramophone.webp" alt="Watercolor gramophone surrounded by ivory wedding flowers" width={396} height={328}/>
        </div>
        <div className="soundtrack-feature-copy">
          <p className="eyebrow">A LITTLE MUSIC, A LOT OF LOVE</p>
          <h2 id="song-heading">Set the <em>mood.</em></h2>
          <p>Every love story has its melody. Choose whether to hear ours as you explore the invitation.</p>
          <MusicPicker variant="feature" />
        </div>
      </section>

      <section className="story section-container" id="our-story">
        <div className="section-flourish" data-reveal="up"><TinyFlower/><span>02 / OUR STORY</span></div>
        <div className="story-layout">
          <div className="story-title" data-reveal="left">
            <p className="eyebrow">THIS CHAPTER IS OURS</p>
            <h2>Every love story<br/>is beautiful.<br/><em>This one is ours.</em></h2>
            <div className="story-drawn-flower"><Icon name="flower" size={58}/></div>
          </div>
          <div className="story-copy" data-reveal="right">
            <p className="story-lead">{wedding.couple.tagline}</p>
            <p>{wedding.couple.story}</p>
            <p className="signature">With love, <span>{wedding.couple.first} &amp; {wedding.couple.second}</span></p>
          </div>
        </div>
        <figure className="story-photo-interlude" data-reveal="up">
          <div className="story-photo-interlude-image">
            <Image src="/photos/marvin-melanie-dancing.webp" alt="Marvin and Melanie laughing and dancing together by the water" fill sizes="(max-width: 700px) 100vw, 60vw" />
          </div>
          <figcaption>
            <p className="eyebrow">THE WAY WE ARE</p>
            <h3>Better<br/><em>together.</em></h3>
            <p>Where there is love, there is always room for a little laughter.</p>
            <span>MARVIN &amp; MELANIE</span>
          </figcaption>
        </figure>
      </section>

      <section className="gallery-section" id="moments">
        <div className="section-container">
          <div className="section-header" data-reveal="up">
            <div><p className="eyebrow">03 / OUR LITTLE MOMENTS</p><h2>Through the lens<br/><em>of love.</em></h2></div>
            <p>Golden light. Spontaneous laughter.<br/>The memories we hold close.</p>
          </div>
          <Gallery />
        </div>
      </section>

      <section className="day-section" id="the-day">
        <div className="section-container">
          <div className="day-intro" data-reveal="up">
            <Image className="day-watercolor" src="/illustrations/calendar-clock.webp" alt="Watercolor wedding calendar with a pocket watch and flowers" width={352} height={296}/>
            <p className="eyebrow">04 / THE CELEBRATION</p>
            <h2>The day we say <em>yes.</em></h2>
            <p>{wedding.message}</p>
          </div>
          <div className="wedding-places" data-reveal="up">
            <div className="save-date-panel">
              <p className="eyebrow">SAVE THE DATE</p>
              <strong>{dayNumber}</strong>
              <span>{month} {year}</span>
              <p>{dateLabel}</p>
              <a className="text-link" href="/api/calendar">Add to calendar <Icon name="calendar" size={15}/></a>
            </div>
            <div className="venue-pair">
              <article className="venue-stop">
                <span className="venue-number">01 / CHURCH</span>
                <Icon name="church" size={31}/>
                <h3>{wedding.ceremony.name}</h3>
                <p>{wedding.ceremony.address}</p>
                <span className="venue-time">Service time to be confirmed</span>
                <a className="text-link" href={wedding.ceremony.mapUrl} target="_blank" rel="noopener noreferrer">Church directions <Icon name="map-pin" size={15}/></a>
              </article>
              <article className="venue-stop">
                <span className="venue-number">02 / RECEPTION</span>
                <Icon name="party" size={31}/>
                <h3>{wedding.reception.name}</h3>
                <p>{wedding.reception.address}</p>
                <span className="venue-time">Following the church ceremony</span>
                <a className="text-link" href={wedding.reception.mapUrl} target="_blank" rel="noopener noreferrer">Reception directions <Icon name="map-pin" size={15}/></a>
              </article>
            </div>
          </div>
          <div className="schedule" data-reveal="up">
            <div><p className="eyebrow">OUR WEDDING DAY</p><h3>Order of <em>celebration.</em></h3><p className="schedule-note">Exact start times will be added once confirmed.</p></div>
            <div className="timeline">{wedding.program.map((item, i) => <div className="timeline-item" key={item.name} data-reveal="right" data-reveal-delay={String(i)}><span className="timeline-time">{item.time}</span><span className="timeline-dot"/><div><h4>{item.name}</h4><p>{item.detail}</p></div></div>)}</div>
          </div>
          <div className="dress-code-inline" data-reveal="up">
            <Image src="/illustrations/dress-code.webp" alt="Watercolor wedding attire, flowers and sage tones" width={270} height={230}/>
            <div><p className="eyebrow">DRESS CODE</p><h3>Come celebrate<br/><em>with us.</em></h3><p>{wedding.dressCode}</p></div>
          </div>
        </div>
      </section>

      <section className="promise-photo" aria-label="A final glimpse of Marvin and Melanie" data-reveal="up">
        <Image src="/photos/marvin-melanie-beach.webp" alt="Marvin and Melanie together near the beach, sharing a quiet happy moment" fill sizes="100vw" />
        <div className="promise-photo-copy"><p className="eyebrow">05 / A PROMISE OF FOREVER</p><h2>And now,<br/><em>the next chapter.</em></h2><span>01 · 05 · 2027</span></div>
      </section>

      <section className="rsvp-section" id="rsvp">
        <BotanicalSprig className="rsvp-plant left"/><BotanicalSprig className="rsvp-plant right" mirrored/>
        <div className="rsvp-content" data-reveal="up">
          <p className="eyebrow">BE PART OF OUR DAY</p><TinyFlower className="rsvp-flower"/>
          <h2>Will you join<br/><em>our celebration?</em></h2>
          <p className="rsvp-copy">We can&apos;t imagine this day without the people we love. Kindly let us know if you&apos;ll be there.</p>
          {wedding.rsvpDeadline && <p className="rsvp-deadline">PLEASE REPLY BY {new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'long',year:'numeric', timeZone:'UTC'}).format(new Date(`${wedding.rsvpDeadline}T12:00:00Z`)).toUpperCase()}</p>}
          <RSVPForm siteKey={process.env.TURNSTILE_SITE_KEY ?? ""}/>
        </div>
      </section>

      <section className="faq section-container">
        <div className="section-header" data-reveal="up">
          <div><p className="eyebrow">A FEW MORE DETAILS</p><h2>Good to <em>know.</em></h2></div>
          <p>Little details to help you<br/>enjoy every moment.</p>
        </div>
        <div className="faq-list" data-reveal="up">{wedding.faq.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
      </section>
      <section className="closing" data-reveal="up">
        <TinyFlower/><p className="eyebrow">WE CAN&apos;T WAIT TO SEE YOU</p>
        <h2>Love, laughter &amp;<br/><em>happily ever after.</em></h2>
        <p>{wedding.couple.first} <span>&amp;</span> {wedding.couple.second}</p>
      </section>
    </main>
    <footer><span>{wedding.couple.first} &amp; {wedding.couple.second}</span><span>1 MAY {year} · KAMPALA</span><a href="#top">BACK TO TOP <Icon name="arrow-up" size={14}/></a></footer>
  </SoundtrackProvider>;
}
