import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { MEETINGS, Meeting } from '@/data/council';
import { isPast, useNextMeeting } from '@/hooks/use-next-meeting';
import { downloadMeetingIcs } from '@/lib/calendar';

const Meetings = () => {
  const next = useNextMeeting();
  const { toast } = useToast();

  const upcoming = MEETINGS.filter((m) => !isPast(m.iso));
  const archive = MEETINGS.filter((m) => isPast(m.iso)).slice().reverse();

  const card = (m: Meeting) => {
    const isNext = m.iso === next.iso;
    return (
      <article
        key={m.iso}
        className={`flex flex-col rounded-lg border bg-surface p-6 transition-colors ${
          isNext
            ? 'border-border border-l-[3px] border-l-teal hover:border-primary hover:border-l-teal'
            : 'border-border hover:border-primary'
        }`}
      >
        <span
          className={
            isNext
              ? 'chip'
              : 'inline-flex h-7 items-center rounded-full bg-secondary px-3.5 text-[0.78em] text-secondary-foreground'
          }
        >
          {isNext ? 'Ближайшее' : 'Запланировано'}
        </span>
        <div className="mt-4 font-heading text-[1.25em] font-medium leading-tight tracking-tight">
          {m.date}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[0.85em] text-muted-foreground">
          <Icon name="Clock" size={15} />
          9:00 МСК · {m.format}
        </div>
        <p className="mt-4 border-t border-border pt-4 text-[0.9em] leading-[1.45]">{m.title}</p>
        <p className="mb-5 mt-2 text-[0.85em] leading-[1.45] text-muted-foreground">{m.note}</p>

        <button
          type="button"
          onClick={() => {
            downloadMeetingIcs(m);
            toast({
              title: 'Событие сохранено',
              description: 'Откройте скачанный файл — заседание добавится в ваш календарь.',
            });
          }}
          className="mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border px-4 text-[0.85em] text-primary transition-colors hover:border-primary"
        >
          <Icon name="CalendarPlus" size={16} />
          Добавить в календарь
        </button>
      </article>
    );
  };

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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{upcoming.map(card)}</div>

        {archive.length > 0 && (
          <div className="mt-14">
            <h3 className="font-heading text-[1.35em] leading-tight tracking-tight">
              Прошедшие заседания
            </h3>
            <p className="mt-3 max-w-[60ch] text-[0.92em] text-muted-foreground">
              Повестки и протоколы заседаний Совета доступны для скачивания.
            </p>

            <ul className="mt-6 space-y-4">
              {archive.map((m) => (
                <li key={m.iso}>
                  <article className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex h-7 items-center rounded-full bg-secondary px-3.5 text-[0.78em] text-secondary-foreground">
                        Состоялось
                      </span>
                      <span className="font-heading text-[1.2em] font-medium leading-tight tracking-tight">
                        {m.date}
                      </span>
                      <span className="text-[0.85em] text-muted-foreground">
                        9:00 МСК · {m.format}
                      </span>
                    </div>
                    <p className="mt-4 text-[0.98em] leading-snug">{m.title}</p>
                    <p className="mt-2 max-w-[85ch] text-[0.88em] leading-[1.5] text-muted-foreground">
                      {m.note}
                    </p>

                    {m.files && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {m.files.map((f) => (
                          <a
                            key={f.url}
                            href={f.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-4 text-[0.85em] text-primary transition-colors hover:border-primary"
                          >
                            <Icon name="FileText" size={16} />
                            {f.label}
                            <span className="text-muted-foreground">DOCX</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Meetings;
