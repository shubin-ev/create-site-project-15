import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { ABOUT_TABS, QUOTES, WORK_GROUPS } from '@/data/council';

const About = () => {
  const [active, setActive] = useState(ABOUT_TABS[0].id);
  const tab = ABOUT_TABS.find((t) => t.id === active) ?? ABOUT_TABS[0];

  return (
    <section id="about" className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">О Совете</p>

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

            <h3 className="mt-12 font-heading text-[1.35em]">Рабочие группы</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {WORK_GROUPS.map((g) => (
                <article
                  key={g.title}
                  className="rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary"
                >
                  <h4 className="font-heading text-[1em] leading-snug">{g.title}</h4>
                  <p className="mt-3 text-[0.88em] leading-[1.5] text-muted-foreground">{g.text}</p>
                  <dl className="mt-4 space-y-1 border-t border-border pt-3 text-[0.85em]">
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Руководитель:</dt>
                      <dd>{g.lead}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Состав:</dt>
                      <dd>{g.members}</dd>
                    </div>
                  </dl>
                </article>
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
      </div>
    </section>
  );
};

export default About;
