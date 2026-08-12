import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { GROUP_LABELS, MEMBERS } from '@/data/council';

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

const chair = MEMBERS.find((m) => m.kind === 'chair');
const committee = MEMBERS.filter((m) => m.kind === 'org');

const Avatar = ({
  name,
  photo,
  className,
}: {
  name: string;
  photo?: string;
  className: string;
}) =>
  photo ? (
    <img
      src={photo}
      alt={name}
      loading="lazy"
      className={`${className} flex-none rounded-lg object-cover`}
    />
  ) : (
    <span
      className={`${className} flex flex-none items-center justify-center rounded-lg bg-secondary font-heading text-[1.1em] font-medium text-primary`}
    >
      {initials(name)}
    </span>
  );

const Leadership = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="leadership" className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Руководство Совета</p>

        {chair && (
          <article className="rounded-lg border border-border border-l-[3px] border-l-teal bg-background p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <Avatar
                name={chair.name}
                photo={chair.photo}
                className="h-40 w-40 sm:h-44 sm:w-44"
              />
              <div className="min-w-0">
                <span className="chip">{chair.roleNote}</span>
                <h3 className="mt-3 font-heading text-[1.35em] leading-snug">{chair.name}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-[0.85em] text-muted-foreground">
                  <Icon name="MapPin" size={14} className="flex-none" />
                  {chair.region}
                </p>
                <p className="mt-3 text-[0.92em] leading-[1.6] text-muted-foreground">
                  {chair.position}
                </p>
              </div>
            </div>
          </article>
        )}

        <h3 className="mt-12 font-heading text-[1.15em]">Организационный комитет</h3>
        <p className="mt-2 max-w-2xl text-[0.9em] leading-[1.6] text-muted-foreground">
          Координирует работу Совета между заседаниями и руководит профильными рабочими группами.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {committee.map((m) => {
            const expanded = open === m.name;
            return (
              <article
                key={m.name}
                className="flex flex-col rounded-lg border border-border border-l-[3px] border-l-teal bg-background p-5 transition-colors hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <Avatar name={m.name} photo={m.photo} className="h-16 w-16" />
                  <div className="min-w-0">
                    <h4 className="font-heading text-[1em] leading-snug">{m.name}</h4>
                    <p className="mt-1 text-[0.85em] text-muted-foreground">{m.roleNote}</p>
                  </div>
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-[0.85em] text-muted-foreground">
                  <Icon name="MapPin" size={14} className="flex-none" />
                  {m.region}
                </p>

                <p
                  className={`mt-3 text-[0.88em] leading-[1.5] text-muted-foreground ${
                    expanded ? '' : 'line-clamp-3'
                  }`}
                >
                  {m.position}
                </p>
                {m.position.length > 120 && (
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : m.name)}
                    className="mt-2 self-start text-[0.85em] text-primary underline-offset-4 hover:underline"
                  >
                    {expanded ? 'Свернуть' : 'Подробнее'}
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
      </div>
    </section>
  );
};

export default Leadership;
