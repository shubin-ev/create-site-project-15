import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import {
  RECOMMENDATIONS,
  RECOMMENDATION_REGIONS,
} from "@/data/recommendations";

const PAGE = 9;

type RecommendationsProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  groups: string[];
  buttonLabel: string;
};

const Recommendations = ({
  id,
  eyebrow,
  title,
  description,
  groups,
  buttonLabel,
}: RecommendationsProps) => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [group, setGroup] = useState("all");
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState(false);

  const scope = useMemo(
    () => RECOMMENDATIONS.filter((r) => groups.includes(r.group)),
    [groups],
  );

  const regions = useMemo(
    () =>
      RECOMMENDATION_REGIONS.filter((r) => scope.some((i) => i.region === r)),
    [scope],
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scope.filter((r) => {
      const byQuery =
        !q ||
        `${r.title} ${r.desc} ${r.org} ${r.kind} ${r.region}`
          .toLowerCase()
          .includes(q);
      const byRegion = region === "all" || r.region === region;
      const byGroup = group === "all" || r.group === group;
      return byQuery && byRegion && byGroup;
    });
  }, [query, region, group, scope]);

  const visible = list.slice(0, limit);
  const hasFilters = Boolean(query) || region !== "all" || group !== "all";

  const reset = () => {
    setQuery("");
    setRegion("all");
    setGroup("all");
    setLimit(PAGE);
  };

  const chipBtn = (active: boolean) =>
    `inline-flex min-h-[44px] items-center rounded-lg border px-4 text-[0.88em] transition-colors ${
      active
        ? "border-primary bg-secondary text-secondary-foreground"
        : "border-border bg-surface hover:border-primary"
    }`;

  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border py-14 sm:py-16"
    >
      <div className="section-shell">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2 className="max-w-[26ch] text-[1.9em] font-medium leading-tight tracking-tight">
          {title}
        </h2>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">{description}</p>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-surface px-5 font-heading text-[0.9em] transition-colors hover:border-primary"
        >
          {open ? "Свернуть список" : `Подробнее — ${scope.length} ${buttonLabel}`}
          <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} />
        </button>

        {open && (
          <>
            <div className="mt-8 grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
              <label className="relative block">
                <span className="sr-only">Поиск по материалам</span>
                <Icon
                  name="Search"
                  size={20}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brandblue"
                />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setLimit(PAGE);
                  }}
                  placeholder="Название, тема или организация"
                  className="h-[52px] w-full rounded-lg border border-border bg-surface pl-12 pr-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="sr-only">Регион</span>
                <select
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setLimit(PAGE);
                  }}
                  className="h-[52px] w-full rounded-lg border border-border bg-surface px-4 transition-colors hover:border-primary focus:border-primary"
                >
                  <option value="all">Все регионы</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={group === "all"}
                onClick={() => {
                  setGroup("all");
                  setLimit(PAGE);
                }}
                className={chipBtn(group === "all")}
              >
                Все материалы
              </button>
              {groups.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={group === g}
                  onClick={() => {
                    setGroup(g);
                    setLimit(PAGE);
                  }}
                  className={chipBtn(group === g)}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.88em] text-muted-foreground">
              <span>
                Найдено:{" "}
                <strong className="text-foreground">{list.length}</strong>
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
              {visible.map((r) => (
                <article
                  key={r.url + r.title}
                  className="flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
                >
                  <span className="chip self-start">{r.kind}</span>
                  <h3 className="mt-3 font-heading text-[1.02em] leading-snug">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-primary/35 text-primary transition-colors hover:border-primary"
                    >
                      {r.title}
                    </a>
                  </h3>
                  <p className="mt-3 text-[0.88em] leading-[1.5] text-muted-foreground">
                    {r.desc}
                  </p>
                  <div className="mt-auto space-y-2 border-t border-border pt-4 text-[0.85em] text-muted-foreground">
                    <p className="flex gap-2">
                      <Icon
                        name="Building2"
                        size={14}
                        className="mt-0.5 flex-none"
                      />
                      {r.org}
                    </p>
                    <p className="flex items-center gap-2">
                      <Icon name="MapPin" size={14} className="flex-none" />
                      {r.region}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {list.length > visible.length && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLimit((v) => v + 18)}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-surface px-6 font-heading text-[0.9em] transition-colors hover:border-primary"
                >
                  Показать ещё
                  <Icon name="ChevronDown" size={18} />
                </button>
              </div>
            )}

            {list.length === 0 && (
              <p className="mt-8 rounded-lg border border-border bg-surface p-6 text-muted-foreground">
                По&nbsp;заданным условиям ничего не&nbsp;нашлось. Измените
                запрос или сбросьте фильтры.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
