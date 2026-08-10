import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { LEGAL_ACTS, LEGAL_LEVELS, LEGAL_SPHERES, LegalAct } from '@/data/legal-acts';

const SOURCE_FILES = [
  {
    label: 'Волонтёрство',
    url: 'https://mental-health-russia.ru/wp-content/uploads/2022/02/2.-NPA-RF-v-sfere-volonterstva.docx',
  },
  {
    label: 'Инклюзивное образование',
    url: 'https://mental-health-russia.ru/wp-content/uploads/2022/02/2.-NPA-RF-v-sfere-inklyuzivnogo-obrazovaniya-Prilozhenie-1.docx',
  },
  {
    label: 'Общественный контроль',
    url: 'https://mental-health-russia.ru/wp-content/uploads/2022/02/4.-NPA-RFsostavlyayuschie-pravovuyu-osnovu-Obschestvennogo-kontrolya-1.docx',
  },
];

const plural = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'акт';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'акта';
  return 'актов';
};

const PAGE = 12;

const LegalActs = () => {
  const [sphere, setSphere] = useState(LEGAL_SPHERES[0]);
  const [level, setLevel] = useState(LEGAL_LEVELS[0]);
  const [query, setQuery] = useState('');
  const [onlyValid, setOnlyValid] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const [openNote, setOpenNote] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LEGAL_ACTS.filter((a) => {
      if (sphere !== LEGAL_SPHERES[0] && a.sphere !== sphere) return false;
      if (level !== LEGAL_LEVELS[0] && a.level !== level) return false;
      if (onlyValid && a.status) return false;
      if (q && !`${a.title} ${a.note} ${a.number}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [sphere, level, query, onlyValid]);

  const outdated = LEGAL_ACTS.filter((a) => a.status).length;

  const reset = (fn: () => void) => {
    fn();
    setLimit(PAGE);
  };

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-[0.85em] transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-foreground hover:border-primary'
      }`}
    >
      {label}
    </button>
  );

  const row = (a: LegalAct) => {
    const id = `${a.sphere}-${a.title}`;
    const noteOpen = openNote === id;
    return (
      <li key={id}>
        <article className="rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary">
          <div className="flex flex-wrap items-center gap-2 text-[0.78em]">
            <span className="inline-flex h-6 items-center rounded-full bg-secondary px-3 text-secondary-foreground">
              {a.kind}
            </span>
            {a.status && (
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-destructive/10 px-3 text-destructive">
                <Icon name="CircleAlert" size={13} />
                {a.status}
              </span>
            )}
            {a.year && <span className="text-muted-foreground">{a.year}</span>}
            {a.number && <span className="text-muted-foreground">№ {a.number}</span>}
            <span className="text-muted-foreground">· {a.sphere}</span>
          </div>

          <h4
            className={`mt-3 text-[0.98em] leading-[1.45] ${
              a.status ? 'text-muted-foreground' : ''
            }`}
          >
            {a.title}
          </h4>

          {a.replacedBy && (
            <p className="mt-2 flex items-start gap-2 text-[0.85em] leading-[1.5] text-foreground">
              <Icon name="ArrowRightLeft" size={15} className="mt-0.5 flex-none text-teal" />
              Действует вместо него: {a.replacedBy}
            </p>
          )}

          {a.note && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setOpenNote(noteOpen ? null : id)}
                className="inline-flex min-h-[32px] items-center gap-1.5 text-[0.85em] text-primary"
              >
                <Icon name={noteOpen ? 'ChevronUp' : 'ChevronDown'} size={15} />
                {noteOpen ? 'Скрыть пояснение' : 'Что важно знать'}
              </button>
              {noteOpen && (
                <p className="mt-2 rounded-lg bg-surface p-4 text-[0.88em] leading-[1.55] text-muted-foreground">
                  {a.note}
                </p>
              )}
            </div>
          )}

          {a.url && (
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[40px] items-center gap-2 border-b border-primary/35 text-[0.88em] text-primary transition-colors hover:border-primary"
            >
              <Icon name="ExternalLink" size={16} />
              Открыть официальный текст
            </a>
          )}
        </article>
      </li>
    );
  };

  return (
    <section
      id="legal"
      className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20"
    >
      <div className="section-shell">
        <p className="eyebrow mb-6">Нормативно-правовые акты</p>
        <h2 className="max-w-[26ch] text-[1.9em] leading-tight">
          Реестр законодательства для работы НКО в&nbsp;сфере психического здоровья
        </h2>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {LEGAL_ACTS.length} нормативных актов по&nbsp;волонтёрству, инклюзивному образованию
          и&nbsp;общественному контролю. Каждый акт ведёт на&nbsp;официальный текст —
          скачивать документы не&nbsp;нужно.
        </p>

        <div className="mt-8 max-w-[640px]">
          <label className="relative block">
            <span className="sr-only">Поиск по нормативным актам</span>
            <Icon
              name="Search"
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brandblue"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => reset(() => setQuery(e.target.value))}
              placeholder="Номер закона, название или ключевое слово"
              className="h-[52px] w-full rounded-lg border border-border bg-background pl-12 pr-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
            />
          </label>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            {LEGAL_SPHERES.map((s) => chip(s, s === sphere, () => reset(() => setSphere(s))))}
          </div>
          <div className="flex flex-wrap gap-2">
            {LEGAL_LEVELS.map((l) => chip(l, l === level, () => reset(() => setLevel(l))))}
            {chip(
              `Только действующие · скрыть ${outdated}`,
              onlyValid,
              () => reset(() => setOnlyValid(!onlyValid)),
            )}
          </div>
        </div>

        <p className="mt-6 text-[0.88em] text-muted-foreground">
          Найдено: <strong className="text-foreground">{list.length}</strong> {plural(list.length)}
        </p>

        {list.length === 0 ? (
          <p className="mt-4 rounded-lg border border-border bg-background p-6 text-muted-foreground">
            Ничего не&nbsp;нашлось. Измените запрос или сбросьте фильтры.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">{list.slice(0, limit).map(row)}</ul>
        )}

        {limit < list.length && (
          <button
            type="button"
            onClick={() => setLimit((v) => v + PAGE * 2)}
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-background px-6 text-[0.9em] text-primary transition-colors hover:border-primary"
          >
            <Icon name="Plus" size={16} />
            Показать ещё
          </button>
        )}

        <div className="mt-10 rounded-lg border border-border bg-background p-6">
          <h3 className="font-heading text-[1.05em] leading-snug">
            Скачать перечни одним файлом
          </h3>
          <p className="mt-2 text-[0.88em] leading-[1.5] text-muted-foreground">
            Исходные подборки Совета в&nbsp;формате DOCX.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {SOURCE_FILES.map((f) => (
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
        </div>
      </div>
    </section>
  );
};

export default LegalActs;