import Icon from '@/components/ui/icon';
import { MEETINGS } from '@/data/council';
import { isPast, useNextMeeting } from '@/hooks/use-next-meeting';

const Meetings = () => {
  const next = useNextMeeting();

  return (
    <section id="meetings" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Мероприятия и заседания</p>
        <h2 className="max-w-[26ch] text-[1.9em] leading-tight">
          Заседания проходят онлайн на&nbsp;платформе ZOOM в&nbsp;9:00 по&nbsp;Москве
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">
          Утверждённый график заседаний Совета НКО при&nbsp;РОП. Заседания рабочих групп проходят
          по&nbsp;отдельному расписанию, ссылки на&nbsp;подключение рассылаются участникам.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MEETINGS.map((m) => {
            const past = isPast(m.iso);
            const isNext = m.iso === next.iso;
            return (
              <article
                key={m.iso}
                className={`rounded-lg border bg-surface p-6 transition-colors ${
                  isNext
                    ? 'border-border border-l-[3px] border-l-teal hover:border-primary hover:border-l-teal'
                    : 'border-border hover:border-primary'
                } ${past ? 'opacity-60' : ''}`}
              >
                <span
                  className={
                    isNext
                      ? 'chip'
                      : 'inline-flex h-7 items-center rounded-full bg-secondary px-3.5 text-[0.78em] text-secondary-foreground'
                  }
                >
                  {past ? 'Состоялось' : isNext ? 'Ближайшее' : 'Запланировано'}
                </span>
                <div className="mt-4 font-heading text-[1.25em] font-medium leading-tight tracking-tight">
                  {m.date}
                </div>
                <div className="mt-2 flex items-center gap-2 text-[0.85em] text-muted-foreground">
                  <Icon name="Clock" size={15} />
                  9:00 МСК · {m.format}
                </div>
                <p className="mt-4 border-t border-border pt-4 text-[0.9em] leading-[1.45]">
                  {m.title}
                </p>
                <p className="mt-2 text-[0.85em] leading-[1.45] text-muted-foreground">{m.note}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Meetings;
