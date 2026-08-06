import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { GROUPS, MEMBERS, REGIONS } from '@/data/council';

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

const Members = () => {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState(REGIONS[0]);
  const [group, setGroup] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMBERS.filter((m) => {
      const byQuery = !q || `${m.name} ${m.position}`.toLowerCase().includes(q);
      const byRegion = region === REGIONS[0] || m.region === region;
      const byGroup = !group || m.group === group;
      return byQuery && byRegion && byGroup;
    });
  }, [query, region, group]);

  const reset = () => {
    setQuery('');
    setRegion(REGIONS[0]);
    setGroup(null);
  };

  return (
    <section id="members" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Состав Совета</p>
        <h2 className="max-w-[22ch] text-[1.9em] leading-tight">
          108 представителей НКО из&nbsp;78 субъектов РФ
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">
          Найдите коллегу по&nbsp;фамилии, организации, региону или рабочей группе. Ниже показана
          часть состава; полный список доступен в&nbsp;разделе «Документы».
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_260px]">
          <label className="relative">
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
          <label>
            <span className="sr-only">Регион</span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="h-[52px] w-full rounded-lg border border-border bg-surface px-4 transition-colors hover:border-primary focus:border-primary"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(group === g ? null : g)}
              className={`inline-flex min-h-[44px] items-center rounded-lg border px-4 text-[0.88em] transition-colors ${
                group === g
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface hover:border-primary'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.88em] text-muted-foreground">
          <span>
            Найдено: <strong className="text-foreground">{list.length}</strong>
          </span>
          {(query || region !== REGIONS[0] || group) && (
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
                    <p className="mt-1 text-[0.85em] text-muted-foreground">{m.region}</p>
                  </div>
                </div>
                <p
                  className={`mt-4 text-[0.88em] leading-[1.5] text-muted-foreground ${
                    open ? '' : 'line-clamp-3'
                  }`}
                >
                  {m.position}
                </p>
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : m.name)}
                  className="mt-2 self-start text-[0.85em] text-primary underline-offset-4 hover:underline"
                >
                  {open ? 'Свернуть' : 'Подробнее'}
                </button>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                  <span className="chip">{m.role}</span>
                  <span className="inline-flex h-7 items-center rounded-full bg-secondary px-3.5 text-[0.78em] text-secondary-foreground">
                    {m.group}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

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
