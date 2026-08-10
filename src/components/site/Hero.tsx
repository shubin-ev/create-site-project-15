import { FormEvent, useState } from 'react';
import Icon from '@/components/ui/icon';
import { CONTACT_EMAIL, HERO_TAGS, STATS } from '@/data/council';
import { useNextMeeting } from '@/hooks/use-next-meeting';
import { downloadMeetingIcs } from '@/lib/calendar';
import { scrollToSection } from '@/lib/scroll';

type HeroProps = {
  onSearch: (query: string) => void;
  onTopic: (topic: string) => void;
};

const TAG_TOPICS: Record<string, string> = {
  'Волонтёрство в психиатрии': 'Волонтёрство в психиатрии',
  'Инклюзивное образование': 'Инклюзивное образование',
  'Общественный контроль': 'Общественный контроль в психиатрии',
  'Нормативно-правовые акты': 'Нормативно-правовые акты',
};

const Hero = ({ onSearch, onTopic }: HeroProps) => {
  const [value, setValue] = useState('');
  const next = useNextMeeting();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value);
    scrollToSection('documents');
  };

  const pickTag = (tag: string) => {
    setValue('');
    if (tag === 'Нормативно-правовые акты') {
      scrollToSection('legal');
      return;
    }
    if (tag === 'Общественный контроль') {
      scrollToSection('control');
      return;
    }
    onTopic(TAG_TOPICS[tag] ?? tag);
    scrollToSection('documents');
  };

  return (
    <section className="bg-background pb-16 pt-14 sm:pt-20">
      <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
        <div>
          <p className="eyebrow mb-6">Российское общество психиатров</p>

          <h1 className="max-w-[16ch] text-hero text-foreground">
            Совет НКО в&nbsp;сфере охраны психического здоровья
          </h1>

          <p className="mt-6 max-w-[52ch] leading-[1.55] text-muted-foreground">
            Документы Совета, состав и&nbsp;рабочие группы, график заседаний и&nbsp;методические
            материалы регионов — в&nbsp;одном месте. В&nbsp;составе Совета 114&nbsp;руководителей
            НКО из&nbsp;84&nbsp;регионов России.
          </p>

          <form onSubmit={submit} className="mt-12 flex max-w-[640px] flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Поиск по документам Совета</span>
              <Icon
                name="Search"
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brandblue"
              />
              <input
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Название документа, организация или тема"
                aria-label="Поиск по документам Совета"
                className="h-[52px] w-full rounded-lg border border-border bg-surface pl-12 pr-4 text-foreground transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="h-[52px] whitespace-nowrap rounded-lg bg-primary px-6 font-heading text-[0.88em] font-medium text-primary-foreground transition-opacity hover:opacity-85"
            >
              Найти документ
            </button>
          </form>

          <div className="mt-4 flex max-w-[640px] flex-wrap gap-2">
            {HERO_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => pickTag(tag)}
                className="chip transition-colors hover:bg-teal/25"
              >
                {tag}
              </button>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-heading text-[1.7em] font-medium leading-none tracking-tight text-primary">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[0.85em] leading-snug text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside>
          <div className="rounded-lg border border-border border-l-[3px] border-l-teal bg-surface p-6 transition-colors hover:border-primary hover:border-l-teal">
            <span className="chip">Ближайшее заседание</span>
            <div className="mt-4 font-heading text-[1.5em] font-medium leading-tight tracking-tight">
              {next.date}
            </div>
            <div className="mt-2 text-[0.88em] text-muted-foreground">
              9:00 по&nbsp;московскому времени · {next.format}
            </div>
            <p className="mt-4 border-t border-border pt-4 leading-[1.45]">
              {next.title}. Ссылка на&nbsp;подключение предоставляется отдельно.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => downloadMeetingIcs(next)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-4 text-[0.88em] text-primary transition-colors hover:border-primary"
              >
                <Icon name="CalendarPlus" size={16} />
                Добавить в календарь
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('meetings')}
                className="inline-flex min-h-[44px] items-center gap-2 border-b border-primary/35 text-[0.88em] text-primary transition-colors hover:border-primary"
              >
                График заседаний
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          <p className="mt-6 border-l border-border pl-4 text-[0.88em] leading-[1.5] text-muted-foreground">
            Не&nbsp;нашли нужный документ или хотите вступить в&nbsp;Совет — напишите на&nbsp;
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="border-b border-primary/35 text-primary transition-colors hover:border-primary"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
