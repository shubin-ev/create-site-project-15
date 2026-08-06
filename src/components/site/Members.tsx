import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { MEMBERS } from '@/data/council';

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

const SOSTAV_URL = 'https://mental-health-russia.ru/wp-content/uploads/2025/02/NKO-02.2025.pdf';

const Members = () => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMBERS.filter(
      (m) => !q || `${m.name} ${m.position} ${m.role}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section id="members" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Состав Совета</p>
        <h2 className="max-w-[24ch] text-[1.9em] leading-tight">
          Председатель и&nbsp;организационный комитет
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">
          В&nbsp;состав Совета вошли руководители некоммерческих организаций из&nbsp;85&nbsp;регионов
          Российской Федерации. Ниже — председатель и&nbsp;организационный комитет; полный список
          доступен в&nbsp;документе{' '}
          <a
            href={SOSTAV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-primary/35 text-primary transition-colors hover:border-primary"
          >
            «Состав Совета НКО»
          </a>
          .
        </p>

        <div className="mt-8 max-w-[520px]">
          <label className="relative block">
            <span className="sr-only">Поиск по фамилии и организации</span>
            <Icon
              name="Search"
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brandblue"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Фамилия или организация"
              className="h-[52px] w-full rounded-lg border border-border bg-surface pl-12 pr-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.88em] text-muted-foreground">
          <span>
            Найдено: <strong className="text-foreground">{list.length}</strong>
          </span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="inline-flex items-center gap-1.5 border-b border-primary/35 text-primary transition-colors hover:border-primary"
            >
              <Icon name="X" size={14} />
              Сбросить
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => {
            const open = expanded === m.name;
            return (
              <article
                key={m.name}
                className="flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-secondary font-heading text-[0.95em] font-medium text-primary">
                    {initials(m.name)}
                  </span>
                  <div>
                    <h3 className="font-heading text-[1em] leading-snug">{m.name}</h3>
                    <p className="mt-1 text-[0.85em] text-muted-foreground">{m.role}</p>
                  </div>
                </div>
                <p
                  className={`mt-4 text-[0.88em] leading-[1.5] text-muted-foreground ${
                    open ? '' : 'line-clamp-3'
                  }`}
                >
                  {m.position}
                </p>
                {m.position.length > 120 && (
                  <button
                    type="button"
                    onClick={() => setExpanded(open ? null : m.name)}
                    className="mt-2 self-start text-[0.85em] text-primary underline-offset-4 hover:underline"
                  >
                    {open ? 'Свернуть' : 'Подробнее'}
                  </button>
                )}
              </article>
            );
          })}
        </div>

        {list.length === 0 && (
          <p className="mt-8 rounded-lg border border-border bg-surface p-6 text-muted-foreground">
            По&nbsp;заданному запросу никого не&nbsp;нашлось. Измените запрос или откройте полный
            список состава.
          </p>
        )}
      </div>
    </section>
  );
};

export default Members;
