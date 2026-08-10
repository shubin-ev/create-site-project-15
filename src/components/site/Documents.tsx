import { useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { DOCUMENTS, MATERIALS } from '@/data/council';

type DocumentsProps = {
  query: string;
  onQueryChange: (value: string) => void;
  topic: string | null;
  onTopicChange: (value: string | null) => void;
};

const plural = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'документ';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'документа';
  return 'документов';
};

const Documents = ({ query, onQueryChange, topic, onTopicChange }: DocumentsProps) => {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    DOCUMENTS.forEach((d) => {
      map[d.topic] = (map[d.topic] ?? 0) + 1;
    });
    return map;
  }, []);

  const found = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return DOCUMENTS.filter((d) =>
      `${d.title} ${d.org ?? ''} ${d.topic}`.toLowerCase().includes(q),
    );
  }, [query]);

  const inTopic = useMemo(
    () => (topic ? DOCUMENTS.filter((d) => d.topic === topic) : []),
    [topic],
  );

  const list = found ?? inTopic;
  const current = MATERIALS.find((m) => m.topic === topic);

  const item = (d: (typeof DOCUMENTS)[number]) => (
    <li key={`${d.url}-${d.topic}`}>
      <article className="flex gap-4 rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon
            name={d.format === 'DOCX' ? 'FileText' : d.format === 'XLSX' ? 'Table2' : 'FileType2'}
            size={22}
          />
        </span>
        <div className="min-w-0">
          <h4 className="font-heading text-[1.05em] leading-snug">
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-primary/35 text-primary transition-colors hover:border-primary"
            >
              {d.title}
            </a>
          </h4>
          {d.org && (
            <p className="mt-2 text-[0.9em] leading-[1.5] text-muted-foreground">{d.org}</p>
          )}
          <p className="mt-3 text-[0.85em] text-muted-foreground">
            {d.format} · {d.year} · {d.type}
            {found ? ` · ${d.topic}` : ''}
          </p>
        </div>
      </article>
    </li>
  );

  return (
    <section
      id="documents"
      className="scroll-mt-24 bg-surface py-14 sm:py-16"
    >
      <div className="section-shell">
        <p className="eyebrow mb-5">Документы и материалы</p>
        <h1 className="max-w-[24ch] text-[2.1em] font-medium leading-[1.15] tracking-tight">
          Методические материалы и практики регионов
        </h1>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">
          Методички, формы документов и&nbsp;наработки регионов по&nbsp;волонтёрству, инклюзивному
          образованию и&nbsp;общественному контролю. Выберите направление или воспользуйтесь
          поиском — все файлы открываются в&nbsp;новом окне.
        </p>

        <div className="mt-8 max-w-[640px]">
          <label className="relative block">
            <span className="sr-only">Поиск по документам</span>
            <Icon
              name="Search"
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brandblue"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Название документа, организация или тема"
              className="h-[52px] w-full rounded-lg border border-border bg-background pl-12 pr-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
            />
          </label>
        </div>

        {found ? (
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-4 text-[0.88em] text-muted-foreground">
              <span>
                Найдено: <strong className="text-foreground">{found.length}</strong>
              </span>
              <button
                type="button"
                onClick={() => onQueryChange('')}
                className="inline-flex items-center gap-1.5 border-b border-primary/35 text-primary transition-colors hover:border-primary"
              >
                <Icon name="X" size={14} />
                Очистить поиск
              </button>
            </div>
            <ul className="mt-6 space-y-3">{found.map(item)}</ul>
            {found.length === 0 && (
              <p className="mt-6 rounded-lg border border-border bg-background p-6 text-muted-foreground">
                Ничего не&nbsp;нашлось. Измените запрос или выберите направление ниже.
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MATERIALS.map((m) => {
                const count = counts[m.topic] ?? 0;
                const active = topic === m.topic;
                return (
                  <button
                    key={m.topic}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onTopicChange(active ? null : m.topic)}
                    className={`group flex h-full flex-col rounded-lg border bg-background p-6 text-left transition-colors ${
                      active ? 'border-primary' : 'border-border hover:border-primary'
                    }`}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon name={m.icon} size={22} />
                    </span>
                    <h3 className="mt-4 font-heading text-[1.05em] leading-snug">{m.title}</h3>
                    <p className="mt-3 text-[0.9em] leading-[1.5] text-muted-foreground">
                      {m.text}
                    </p>
                    <span className="mt-auto flex items-center gap-2 pt-5 text-[0.85em] text-primary">
                      {count} {plural(count)}
                      <Icon
                        name={active ? 'ChevronUp' : 'ArrowRight'}
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {topic && (
              <div className="mt-8 rounded-lg border border-border bg-background p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-[1.35em] leading-tight">{current?.title}</h3>
                    <p className="mt-2 text-[0.88em] text-muted-foreground">
                      {list.length} {plural(list.length)} в&nbsp;разделе
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onTopicChange(null)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-[0.88em] text-primary"
                  >
                    <Icon name="X" size={16} />
                    Свернуть
                  </button>
                </div>
                <ul className="mt-6 space-y-3">{list.map(item)}</ul>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Documents;