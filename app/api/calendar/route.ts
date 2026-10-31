import { wedding } from '@/config/wedding';

function escapeText(str: string) {
  return str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

/**
 * All-day ICS event. Ceremony and reception times remain unconfirmed;
 * never turn the countdown's local-midnight anchor into a fictitious service time.
 */
export async function GET() {
  const day = wedding.date.replace(/-/g, '');
  const nextDay = new Date(`${wedding.date}T12:00:00Z`);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  const nextDayString = nextDay.toISOString().slice(0, 10).replace(/-/g, '');
  const description = [
    wedding.message,
    `Church ceremony: ${wedding.ceremony.name}, ${wedding.ceremony.address}.`,
    `Reception: ${wedding.reception.name}, ${wedding.reception.address}.`,
    'Please check the invitation for confirmed start times.',
  ].join('\n');
  const content = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'CALSCALE:GREGORIAN',
    'PRODID:-//Marvin and Melanie Wedding//EN', 'BEGIN:VEVENT',
    `UID:${day}-marvin-melanie-wedding@wedding-invitation`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART;VALUE=DATE:${day}`, `DTEND;VALUE=DATE:${nextDayString}`,
    `SUMMARY:${escapeText(`${wedding.couple.first} & ${wedding.couple.second}'s Wedding`)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(`${wedding.ceremony.name}, ${wedding.ceremony.address}`)}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  return new Response(content, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="marvin-melanie-save-the-date.ics"',
      'Cache-Control': 'no-store',
    },
  });
}
