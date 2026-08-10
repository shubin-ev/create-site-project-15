import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { AUTHORITIES, AUTHORITY_CATEGORIES, AUTHORITY_REGIONS } from '@/data/authorities';

const PAGE = 12;

const Authorities = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [category, setCategory] = useState('all');
  const [limit, setLimit] = useState(PAGE);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AUTHORITIES.filter((a) => {
      const byQuery =
        !q || `${a.name} ${a.head ?? ''} ${a.region} ${a.category}`.toLowerCase().includes(q);
      const byRegion = region === 'all' || a.region === region;
      const byCategory = category === 'all' || a.category === category;
      return byQuery && byRegion && byCategory;
    });
  }, [query, region, category]);

  const visible = list.slice(0, limit);
  const hasFilters = Boolean(query) || region !== 'all' || category !== 'all';

  const reset = () => {
    setQuery('');
    setRegion('all');
    setCategory('all');
    setLimit(PAGE);
  };

  const copyLetter = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Шапка письма скопирована',
        description: 'Вставьте её в начало документа Word или в письмо.',
      });
    } catch {
      toast({ title: 'Не удалось скопировать', variant: 'destructive' });
    }
  };

  const chipBtn = (active: boolean) =>
    `inline-flex min-h-[44px] items-center rounded-lg border px-4 text-[0.88em] transition-colors ${
      active
        ? 'border-primary bg-secondary text-secondary-foreground'
        : 'border-border bg-background hover:border-primary'
    }`;

  return (
    <section
      id="authorities"
      className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20"
    >
      <div className="section-shell">
        <p className="eyebrow mb-6">Органы власти</p>
        <h2 className="max-w-[26ch] text-[1.9em] leading-tight">
          Справочник органов власти {AUTHORITY_REGIONS.length}&nbsp;регионов России
        </h2>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Контакты глав регионов, общественных палат и&nbsp;профильных ведомств: здравоохранение,
          труд и&nbsp;социальная защита, образование, культура, спорт. У&nbsp;каждой карточки
          готовая шапка письма — её&nbsp;можно скопировать и&nbsp;вставить в&nbsp;свой документ.
        </p>

        <div className="mt-8 grid gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
          <label className="relative block">
            <span className="sr-only">Поиск по ведомству и руководителю</span>
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
              placeholder="Ведомство, руководитель или регион"
              className="h-[52px] w-full rounded-lg border border-border bg-background pl-12 pr-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary"
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
              className="h-[52px] w-full rounded-lg border border-border bg-background px-4 transition-colors hover:border-primary focus:border-primary"
            >
              <option value="all">Все регионы</option>
              {AUTHORITY_REGIONS.map((r) => (
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
            aria-pressed={category === 'all'}
            onClick={() => {
              setCategory('all');
              setLimit(PAGE);
            }}
            className={chipBtn(category === 'all')}
          >
            Все категории
          </button>
          {AUTHORITY_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setLimit(PAGE);
              }}
              className={chipBtn(category === c)}
            >
              {c}
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
          {visible.map((a) => (
            <article
              key={a.id}
              className="flex flex-col rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary"
            >
              <span className="chip self-start">{a.category}</span>
              <h3 className="mt-3 font-heading text-[1.02em] leading-snug">{a.name}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-[0.85em] text-muted-foreground">
                <Icon name="MapPin" size={14} className="flex-none" />
                {a.region}
              </p>

              {a.head && (
                <p className="mt-3 text-[0.9em] leading-snug">
                  {a.head}
                  {a.post && (
                    <span className="mt-1 block text-[0.9em] text-muted-foreground">{a.post}</span>
                  )}
                </p>
              )}

              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-[0.85em]">
                {a.address && (
                  <div className="flex gap-2">
                    <dt className="flex-none text-muted-foreground">
                      <Icon name="Building2" size={14} />
                    </dt>
                    <dd className="leading-[1.45] text-muted-foreground">{a.address}</dd>
                  </div>
                )}
                {a.phone && (
                  <div className="flex gap-2">
                    <dt className="flex-none text-muted-foreground">
                      <Icon name="Phone" size={14} />
                    </dt>
                    <dd className="leading-[1.45]">{a.phone}</dd>
                  </div>
                )}
                {a.email && (
                  <div className="flex gap-2">
                    <dt className="flex-none text-muted-foreground">
                      <Icon name="Mail" size={14} />
                    </dt>
                    <dd className="min-w-0">
                      <a
                        href={`mailto:${a.email}`}
                        className="block break-all border-b border-primary/35 text-primary transition-colors hover:border-primary"
                      >
                        {a.email}
                      </a>
                    </dd>
                  </div>
                )}
                {a.site && (
                  <div className="flex gap-2">
                    <dt className="flex-none text-muted-foreground">
                      <Icon name="Globe" size={14} />
                    </dt>
                    <dd className="min-w-0">
                      <a
                        href={a.site.startsWith('http') ? a.site : `https://${a.site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block break-all border-b border-primary/35 text-primary transition-colors hover:border-primary"
                      >
                        {a.site.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              {a.letter && (
                <button
                  type="button"
                  onClick={() => copyLetter(a.letter as string)}
                  className="mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border pt-0 text-[0.88em] text-primary transition-colors hover:border-primary"
                >
                  <Icon name="Copy" size={16} />
                  Скопировать шапку письма
                </button>
              )}
            </article>
          ))}
        </div>

        {list.length > visible.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((v) => v + 24)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-background px-6 font-heading text-[0.9em] transition-colors hover:border-primary"
            >
              Показать ещё
              <Icon name="ChevronDown" size={18} />
            </button>
          </div>
        )}

        {list.length === 0 && (
          <p className="mt-8 rounded-lg border border-border bg-background p-6 text-muted-foreground">
            По&nbsp;заданным условиям ничего не&nbsp;нашлось. Измените запрос или сбросьте фильтры.
          </p>
        )}
      </div>
    </section>
  );
};

export default Authorities;
