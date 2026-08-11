import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { DOCUMENTS, VOLUNTEER_TOPIC } from '@/data/council';

const DOCS = DOCUMENTS.filter((d) => d.topic === VOLUNTEER_TOPIC);

const TYPES = ['Все материалы', ...Array.from(new Set(DOCS.map((d) => d.type)))];

const plural = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'документ';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'документа';
  return 'документов';
};

const VolunteerDocs = () => {
  const [type, setType] = useState(TYPES[0]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOCS.filter((d) => {
      if (type !== TYPES[0] && d.type !== type) return false;
      if (q && !`${d.title} ${d.org ?? ''}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [type, query]);

  return (
    <section
      id="volunteer-docs"
      className="scroll-mt-24 border-t border-border bg-surface py-14 sm:py-16"
    >
      <div className="section-shell">
        <p className="eyebrow mb-5">Документы и методики</p>
        <h2 className="max-w-[26ch] text-[1.9em] font-medium leading-tight tracking-tight">
          Методички, пособия и&nbsp;формы документов для волонтёров
        </h2>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Договоры с&nbsp;добровольцами, соглашения с&nbsp;медицинскими организациями, пособия
          по&nbsp;подготовке и&nbsp;мотивации волонтёров. Все файлы открываются в&nbsp;новом окне.
        </p>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-background px-5 font-heading text-[0.9em] transition-colors hover:border-primary"
        >
          {open ? 'Свернуть список' : `Подробнее — ${DOCS.length} ${plural(DOCS.length)}`}
          <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={18} />
        </button>

        {open && (
          <>
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
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Название документа или организация"
                  className="h-[52px] w-full rounded-lg border border-border bg-background pl-12 pr-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                  className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-[0.85em] transition-colors ${
                    type === t
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <p className="mt-6 text-[0.88em] text-muted-foreground">
              Найдено: <strong className="text-foreground">{list.length}</strong>{' '}
              {plural(list.length)}
            </p>

            {list.length === 0 ? (
              <p className="mt-4 rounded-lg border border-border bg-background p-6 text-muted-foreground">
                Ничего не&nbsp;нашлось. Измените запрос или сбросьте фильтр.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {list.map((d) => (
                  <li key={d.url}>
                    <article className="flex gap-4 rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon name={d.format === 'DOCX' ? 'FileText' : 'FileType2'} size={22} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-[1.05em] leading-snug">
                          <a
                            href={d.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-b border-primary/35 text-primary transition-colors hover:border-primary"
                          >
                            {d.title}
                          </a>
                        </h3>
                        {d.org && (
                          <p className="mt-2 text-[0.9em] leading-[1.5] text-muted-foreground">
                            {d.org}
                          </p>
                        )}
                        <p className="mt-3 text-[0.85em] text-muted-foreground">
                          {d.format} · {d.year} · {d.type}
                        </p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default VolunteerDocs;
