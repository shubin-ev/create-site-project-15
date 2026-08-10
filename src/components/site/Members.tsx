import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { GROUP_LABELS, MEMBERS, REGIONS, WorkGroupId } from '@/data/council';

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

const KIND_FILTERS = [
  { id: 'all', label: 'Весь состав' },
  { id: 'lead', label: 'Председатель и оргкомитет' },
  { id: 'group', label: 'Участники рабочих групп' },
] as const;

type KindFilter = (typeof KIND_FILTERS)[number]['id'];

const GROUP_IDS = Object.keys(GROUP_LABELS) as WorkGroupId[];

const Members = () => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [kind, setKind] = useState<KindFilter>('all');
  const [group, setGroup] = useState<WorkGroupId | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [limit, setLimit] = useState(12);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMBERS.filter((m) => {
      const byQuery = !q || `${m.name} ${m.position} ${m.region}`.toLowerCase().includes(q);
      const byRegion = region === 'all' || m.region === region;
      const byKind =
        kind === 'all' ||
        (kind === 'lead' && m.kind !== 'member') ||
        (kind === 'group' && m.groups.length > 0);
      const byGroup = group === 'all' || m.groups.includes(group);
      return byQuery && byRegion && byKind && byGroup;
    });
  }, [query, region, kind, group]);

  const visible = list.slice(0, limit);

  const hasFilters = Boolean(query) || region !== 'all' || kind !== 'all' || group !== 'all';

  const reset = () => {
    setQuery('');
    setRegion('all');
    setKind('all');
    setGroup('all');
    setLimit(12);
  };

  const chipBtn = (active: boolean) =>
    `inline-flex min-h-[44px] items-center rounded-lg border px-4 text-[0.88em] transition-colors ${
      active
        ? 'border-primary bg-secondary text-secondary-foreground'
        : 'border-border bg-background hover:border-primary'
    }`;

  return (
    <section id="members" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Состав Совета</p>
        <h2 className="max-w-[24ch] text-[1.9em] leading-tight">
          {MEMBERS.length} представителей НКО из&nbsp;{REGIONS.length}&nbsp;регионов России
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">
          Председатель Совета, организационный комитет и&nbsp;члены Совета — руководители
          некоммерческих организаций. Данные приведены по&nbsp;состоянию на&nbsp;6&nbsp;августа
          2026&nbsp;года.
        </p>

        <div className="mt-8 grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
          <label className="relative block">
            <span className="sr-only">Поиск по фамилии и организации</span>
            <Icon
              name="Search"
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brandblue"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(12);
              }}
              placeholder="Фамилия, организация или регион"
              className="h-[52px] w-full rounded-lg border border-border bg-surface pl-12 pr-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="sr-only">Регион</span>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setLimit(12);
              }}
              className="h-[52px] w-full rounded-lg border border-border bg-surface px-4 transition-colors hover:border-primary focus:border-primary"
            >
              <option value="all">Все регионы</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {KIND_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={kind === f.id}
              onClick={() => {
                setKind(f.id);
                setLimit(12);
              }}
              className={chipBtn(kind === f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={group === 'all'}
            onClick={() => {
              setGroup('all');
              setLimit(12);
            }}
            className={chipBtn(group === 'all')}
          >
            Все рабочие группы
          </button>
          {GROUP_IDS.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => {
                setGroup(g);
                setLimit(12);
              }}
              className={chipBtn(group === g)}
            >
              {GROUP_LABELS[g]}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.88em] text-muted-foreground">
          <span>
            Найдено: <strong className="text-foreground">{list.length}</strong>
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 border-b border-primary/35 text-primary transition-colors hover:border-primary"
            >
              <Icon name="X" size={14} />
              Сбросить фильтры
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((m) => {
            const open = expanded === m.name;
            return (
              <article
                key={m.name}
                className={`flex flex-col rounded-lg border bg-surface p-5 transition-colors hover:border-primary ${
                  m.kind === 'member'
                    ? 'border-border'
                    : 'border-border border-l-[3px] border-l-teal'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-secondary font-heading text-[0.95em] font-medium text-primary">
                    {initials(m.name)}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading text-[1em] leading-snug">{m.name}</h3>
                    <p className="mt-1 text-[0.85em] text-muted-foreground">
                      {m.roleNote || 'Член Совета'}
                    </p>
                  </div>
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-[0.85em] text-muted-foreground">
                  <Icon name="MapPin" size={14} className="flex-none" />
                  {m.region}
                </p>

                <p
                  className={`mt-3 text-[0.88em] leading-[1.5] text-muted-foreground ${
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

                {m.groups.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {m.groups.map((g) => (
                      <span key={g} className="chip">
                        {GROUP_LABELS[g]}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {list.length > visible.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((v) => v + 24)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-surface px-6 font-heading text-[0.9em] transition-colors hover:border-primary"
            >
              Показать ещё
              <Icon name="ChevronDown" size={18} />
            </button>
          </div>
        )}

        {list.length === 0 && (
          <p className="mt-8 rounded-lg border border-border bg-surface p-6 text-muted-foreground">
            По&nbsp;заданным условиям никого не&nbsp;нашлось. Измените запрос или сбросьте фильтры.
          </p>
        )}
      </div>
    </section>
  );
};

export default Members;