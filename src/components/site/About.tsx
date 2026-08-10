import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { ABOUT_TABS, COUNCIL_DOCS, QUOTES } from '@/data/council';

const About = () => {
  const [active, setActive] = useState(ABOUT_TABS[0].id);
  const tab = ABOUT_TABS.find((t) => t.id === active) ?? ABOUT_TABS[0];

  return (
    <section id="about" className="scroll-mt-24 bg-surface py-14 sm:py-16">
      <div className="section-shell">
        <p className="eyebrow mb-5">О Совете</p>
        <h1 className="mb-10 max-w-[20ch] text-[2.1em] font-medium leading-[1.15] tracking-tight">
          Совет НКО в&nbsp;сфере охраны психического здоровья
        </h1>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <div
              role="tablist"
              aria-label="Разделы о Совете"
              className="flex flex-wrap gap-1 border-b border-border"
            >
              {ABOUT_TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={active === t.id}
                  onClick={() => setActive(t.id)}
                  className={`-mb-px min-h-[44px] border-b-2 px-4 font-heading text-[0.95em] font-medium transition-colors ${
                    active === t.id
                      ? 'border-teal text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>

            <div role="tabpanel" className="mt-8 space-y-5">
              {tab.text.map((p) => (
                <p key={p} className="max-w-[62ch] leading-[1.6] text-foreground">
                  {p}
                </p>
              ))}
            </div>

          </div>

          <aside className="space-y-6">
            {QUOTES.map((q) => (
              <figure
                key={q.author}
                className="rounded-lg border border-border border-l-[3px] border-l-teal bg-background p-6"
              >
                <Icon name="Quote" size={20} className="text-teal" />
                <blockquote className="mt-3 leading-[1.55] text-foreground">{q.text}</blockquote>
                <figcaption className="mt-4 border-t border-border pt-3 text-[0.85em] text-muted-foreground">
                  {q.author}
                </figcaption>
              </figure>
            ))}
          </aside>
        </div>

        <div className="mt-14 border-t border-border pt-12">
          <h3 className="font-heading text-[1.35em] leading-tight tracking-tight">
            Документы Совета
          </h3>
          <p className="mt-3 max-w-[60ch] text-[0.92em] text-muted-foreground">
            Учредительные документы, актуальный состав и&nbsp;годовые отчёты о&nbsp;работе.
          </p>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COUNCIL_DOCS.map((d) => (
              <li key={d.url}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon name={d.icon} fallback="FileText" size={22} />
                  </span>
                  <h4 className="mt-4 font-heading text-[1.05em] leading-snug text-foreground">
                    {d.title}
                  </h4>
                  <p className="mt-2 text-[0.88em] leading-[1.5] text-muted-foreground">
                    {d.hint}
                  </p>
                  <span className="mt-auto flex items-center gap-2 pt-5 text-[0.82em] text-primary">
                    {d.format} · {d.year}
                    <Icon
                      name="ArrowRight"
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;