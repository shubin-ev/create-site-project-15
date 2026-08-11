import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { WORK_GROUPS } from '@/data/council';

const WorkGroups = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="groups" className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Рабочие группы</p>

        <div className="space-y-4">
          {WORK_GROUPS.map((g) => {
            const isOpen = open === g.id;
            return (
              <article key={g.id} className="rounded-lg border border-border bg-background">
                <div className="flex flex-wrap items-start justify-between gap-4 p-6">
                  <div className="min-w-0">
                    <h3 className="max-w-[46ch] font-heading text-[1.2em] leading-snug">
                      {g.title}
                    </h3>
                    <p className="mt-3 text-[0.9em] leading-[1.5]">
                      <span className="text-muted-foreground">Руководитель: </span>
                      {g.lead.name}
                    </p>
                    <p className="mt-1 max-w-[60ch] text-[0.88em] leading-[1.5] text-muted-foreground">
                      {g.lead.position}
                    </p>
                    <p className="mt-3 text-[0.85em] text-muted-foreground">
                      Участников: {g.members.length + 1}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : g.id)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-4 text-[0.88em] text-primary transition-colors hover:border-primary"
                  >
                    {isOpen ? 'Свернуть состав' : 'Состав группы'}
                    <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
                  </button>
                </div>

                {isOpen && (
                  <ul className="border-t border-border px-6 py-5">
                    {g.members.map((m) => (
                      <li
                        key={m.name}
                        className="flex gap-3 border-b border-border py-3 last:border-0"
                      >
                        <Icon
                          name="User"
                          size={16}
                          className="mt-1 flex-none text-muted-foreground"
                        />
                        <div>
                          <p className="text-[0.95em] leading-snug">{m.name}</p>
                          <p className="mt-1 text-[0.85em] leading-[1.5] text-muted-foreground">
                            {m.position}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkGroups;
