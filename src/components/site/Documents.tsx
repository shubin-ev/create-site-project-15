import { useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { DOCUMENTS, DOC_TYPES, DOC_YEARS } from '@/data/council';

type DocumentsProps = {
  query: string;
  onQueryChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  year: string;
  onYearChange: (value: string) => void;
};

const Documents = ({
  query,
  onQueryChange,
  type,
  onTypeChange,
  year,
  onYearChange,
}: DocumentsProps) => {
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOCUMENTS.filter((d) => {
      const byQuery =
        !q || `${d.title} ${d.description} ${d.topic}`.toLowerCase().includes(q);
      const byType = type === DOC_TYPES[0] || d.type === type;
      const byYear = year === DOC_YEARS[0] || d.year === year;
      return byQuery && byType && byYear;
    });
  }, [query, type, year]);

  const hasFilters = Boolean(query) || type !== DOC_TYPES[0] || year !== DOC_YEARS[0];

  const reset = () => {
    onQueryChange('');
    onTypeChange(DOC_TYPES[0]);
    onYearChange(DOC_YEARS[0]);
  };

  return (
    <section id="documents" className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Документы и положения</p>
        <h2 className="max-w-[24ch] text-[1.9em] leading-tight">
          Единый каталог документов Совета
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">
          Положения, протоколы заседаний и методические материалы. У&nbsp;каждой ссылки указан
          формат и&nbsp;размер файла.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h3 className="font-heading text-[0.95em] font-medium">Тип документа</h3>
              <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
                {DOC_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={type === t}
                    onClick={() => onTypeChange(t)}
                    className={`inline-flex min-h-[44px] items-center rounded-lg border px-4 text-left text-[0.88em] transition-colors ${
                      type === t
                        ? 'border-primary bg-secondary text-secondary-foreground'
                        : 'border-border bg-background hover:border-primary'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-[0.95em] font-medium">Год</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {DOC_YEARS.map((y) => (
                  <button
                    key={y}
                    type="button"
                    aria-pressed={year === y}
                    onClick={() => onYearChange(y)}
                    className={`inline-flex min-h-[44px] items-center rounded-lg border px-4 text-[0.88em] transition-colors ${
                      year === y
                        ? 'border-primary bg-secondary text-secondary-foreground'
                        : 'border-border bg-background hover:border-primary'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <label className="relative block">
              <span className="sr-only">Поиск по названию и описанию</span>
              <Icon
                name="Search"
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brandblue"
              />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Название документа или тема"
                className="h-[52px] w-full rounded-lg border border-border bg-background pl-12 pr-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
              />
            </label>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-[0.88em] text-muted-foreground">
              <span>
                Найдено документов: <strong className="text-foreground">{list.length}</strong>
              </span>
              {hasFilters && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 border-b border-primary/35 text-primary transition-colors hover:border-primary"
                >
                  <Icon name="X" size={14} />
                  Сбросить
                </button>
              )}
            </div>

            <ul className="mt-6 space-y-3">
              {list.map((d) => (
                <li key={d.title}>
                  <article className="flex gap-4 rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon name={d.format === 'DOCX' ? 'FileText' : 'FileType2'} size={22} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-[1.05em] leading-snug">
                        <a
                          href={`mailto:nko@mental-health-russia.ru?subject=${encodeURIComponent(
                            `Запрос документа: ${d.title}`,
                          )}`}
                          className="border-b border-primary/35 text-primary transition-colors hover:border-primary"
                        >
                          {d.title}
                        </a>
                      </h3>
                      <p className="mt-2 text-[0.9em] leading-[1.5] text-muted-foreground">
                        {d.description}
                      </p>
                      <p className="mt-3 text-[0.85em] text-muted-foreground">
                        {d.format} · {d.size} · {d.year} · {d.topic}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            {list.length === 0 && (
              <p className="mt-6 rounded-lg border border-border bg-background p-6 text-muted-foreground">
                Документов по&nbsp;заданным условиям не&nbsp;найдено. Напишите нам — подскажем, где
                искать.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;
