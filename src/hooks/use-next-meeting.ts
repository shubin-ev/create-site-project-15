import { useMemo } from 'react';
import { MEETINGS, Meeting } from '@/data/council';

export function useNextMeeting(): Meeting {
  return useMemo(() => {
    const now = Date.now();
    return MEETINGS.find((m) => new Date(`${m.iso}T09:00:00+03:00`).getTime() >= now) ?? MEETINGS[MEETINGS.length - 1];
  }, []);
}

export function isPast(iso: string) {
  return new Date(`${iso}T09:00:00+03:00`).getTime() < Date.now();
}
