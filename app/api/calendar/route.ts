import { wedding } from '@/config/wedding';

function icsDate(date: Date) { return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
function escapeText(str: string) { return str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;'); }

export async function GET() {
  if (!wedding.dateTime) return new Response("Wedding date has not been announced yet.", { status: 404 });
  const start = new Date(wedding.dateTime);
  const end = new Date(start.getTime() + 6*60*60*1000);
  const content = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Herbarium Wedding Invitation//EN','BEGIN:VEVENT',
    `UID:${start.getTime()}-wedding-invitation@personal-wedding`,
    `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeText(`${wedding.couple.first} & ${wedding.couple.second}'s Wedding`)}`,
    `DESCRIPTION:${escapeText(wedding.message)}`,
    `LOCATION:${escapeText(`${wedding.venue.name}, ${wedding.venue.address}`)}`,
    'END:VEVENT','END:VCALENDAR'].join('\r\n');
  return new Response(content, { headers: { 'Content-Type':'text/calendar; charset=utf-8', 'Content-Disposition':'attachment; filename="save-the-date.ics"' }});
}
