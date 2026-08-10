import { Meeting } from '@/data/council';

const pad = (n: number) => String(n).padStart(2, '0');

const toUtcStamp = (date: Date) =>
  `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(
    date.getUTCHours(),
  )}${pad(date.getUTCMinutes())}00Z`;

const escapeText = (text: string) => text.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');

export function downloadMeetingIcs(meeting: Meeting) {
  const start = new Date(`${meeting.iso}T09:00:00+03:00`);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sovet NKO pri ROP//Meetings//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${meeting.iso}-sovet-nko-rop`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${escapeText(meeting.title)}`,
    `DESCRIPTION:${escapeText(`${meeting.note} Начало в 9:00 по московскому времени.`)}`,
    `LOCATION:${escapeText(meeting.format)}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Напоминание о заседании Совета НКО при РОП',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([`${lines.join('\r\n')}\r\n`], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `zasedanie-soveta-nko-${meeting.iso}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
