import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  FEDERAL_ORGS,
  VOLUNTEER_ORGS,
  VOLUNTEER_TYPES,
} from "@/data/volunteers";

const host = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
const telHref = (t: string) => t.replace(/[^\d+]/g, "");

const Volunteers = () => {
  const [active, setActive] = useState<string | null>(null);
  const [openList, setOpenList] = useState(false);
  const [openFed, setOpenFed] = useState(false);
  const list = active
    ? VOLUNTEER_ORGS.filter((o) => o.types.includes(active))
    : VOLUNTEER_ORGS;

  const toggle = (
    open: boolean,
    onClick: () => void,
    labelOpen: string,
    labelClosed: string,
  ) => (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-background px-5 font-heading text-[0.9em] transition-colors hover:border-primary"
    >
      {open ? labelOpen : labelClosed}
      <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} />
    </button>
  );

  return (
    <>
      <section
        id="volunteers"
        className="scroll-mt-24 border-t border-border py-14 sm:py-16"
      >
        <div className="section-shell">
          <p className="eyebrow mb-5">Волонтёрство в психиатрии</p>
          <h2 className="max-w-[24ch] text-[1.9em] font-medium leading-tight tracking-tight">
            Куда обратиться за волонтёрской помощью
          </h2>
          <p className="mt-4 max-w-[62ch] text-muted-foreground">
            Организации, которые обучают волонтёров или&nbsp;имеют собственные
            волонтёрские программы в&nbsp;сфере психического здоровья.
            К&nbsp;ним можно обратиться за&nbsp; помощью, за&nbsp;обучением или
            за&nbsp;опытом.
          </p>
          <p className="mt-5 max-w-[62ch] border-l-[3px] border-teal pl-4 text-[0.95em] leading-[1.55]">
            Это не&nbsp;полный перечень волонтёрских НКО, а&nbsp;список тех,
            у&nbsp;кого есть работающая программа. Сведения проверены Советом.
            Если вашего региона нет&nbsp;— воспользуйтесь поиском
            на&nbsp;портале Добро.ру.
          </p>

          {toggle(
            openList,
            () => setOpenList((v) => !v),
            "Свернуть перечень",
            `Подробнее — ${VOLUNTEER_ORGS.length} организаций`,
          )}

          {openList && (
            <>
              <div className="mt-8 flex flex-wrap gap-2">
                {VOLUNTEER_TYPES.map((t) => {
                  const count = VOLUNTEER_ORGS.filter((o) =>
                    o.types.includes(t),
                  ).length;
                  const on = active === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setActive(on ? null : t)}
                      className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-[0.85em] transition-colors ${
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary"
                      }`}
                    >
                      {t} · {count}
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 text-[0.88em] text-muted-foreground">
                Организаций в&nbsp;перечне:{" "}
                <strong className="text-foreground">{list.length}</strong>
                {active ? ` из ${VOLUNTEER_ORGS.length}` : ""}
              </p>

              <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {list.map((o) => (
                  <li key={o.name} className="flex">
                    <article className="flex w-full flex-col rounded-lg border border-border bg-background p-6">
                      <p className="text-[0.82em] text-muted-foreground">
                        {o.city}
                        {o.city !== o.region ? ` · ${o.region}` : ""}
                      </p>
                      <h3 className="mt-1.5 font-heading text-[1.05em] leading-snug">
                        {o.name}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {o.types.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-secondary px-2.5 py-1 text-[0.72em] text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-[0.9em] leading-[1.5] text-muted-foreground">
                        {o.what}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {o.audience.map((a) => (
                          <span
                            key={a}
                            className="rounded-full border border-border px-2.5 py-1 text-[0.72em] text-muted-foreground"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto space-y-1 border-t border-border pt-4 text-[0.85em] leading-[1.6]">
                        {o.site && (
                          <p>
                            <a
                              href={o.site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all border-b border-primary/35 text-primary transition-colors hover:border-primary"
                            >
                              {host(o.site)}
                            </a>
                          </p>
                        )}
                        {o.tel && (
                          <p>
                            <a
                              href={`tel:${telHref(o.tel)}`}
                              className="text-primary"
                            >
                              {o.tel}
                            </a>
                          </p>
                        )}
                        {o.mail && (
                          <p>
                            <a
                              href={`mailto:${o.mail}`}
                              className="break-all text-primary"
                            >
                              {o.mail}
                            </a>
                          </p>
                        )}
                      </div>
                      <p className="mt-3 text-[0.78em] text-tertiary">
                        Сведения проверены: {o.checked}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10 rounded-lg border border-border bg-surface p-6 sm:p-8">
            <h3 className="font-heading text-[1.2em] leading-tight">
              Не нашли организацию в&nbsp;своём регионе?
            </h3>
            <p className="mt-3 max-w-[68ch] text-[0.92em] leading-[1.55] text-muted-foreground">
              Добро.ру&nbsp;— федеральная платформа добровольчества. Там можно
              найти волонтёров в&nbsp;своём городе, разместить заявку
              от&nbsp;организации или проверить, работает ли&nbsp;интересующая
              вас НКО.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://dobro.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-5 text-[0.9em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Перейти на Добро.ру
                <Icon name="ArrowUpRight" size={16} />
              </a>
              <a
                href="mailto:nko@mental-health-russia.ru?subject=Добавить организацию в перечень"
                className="inline-flex min-h-[44px] items-center rounded-lg border border-border px-5 text-[0.9em] transition-colors hover:border-primary"
              >
                Добавить организацию
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-14 sm:py-16">
        <div className="section-shell">
          <h2 className="max-w-[24ch] text-[1.9em] font-medium leading-tight tracking-tight">
            Федеральная инфраструктура волонтёрства
          </h2>
          <p className="mt-4 max-w-[64ch] text-muted-foreground">
            Организации федерального уровня, которые отвечают за&nbsp;развитие
            добровольчества, ведут государственные реестры и&nbsp;выпускают
            методические материалы. К&nbsp;ним обращаются за&nbsp;методиками,
            обучением и&nbsp;включением в&nbsp;единую информационную систему.
          </p>

          {toggle(
            openFed,
            () => setOpenFed((v) => !v),
            "Свернуть список",
            `Подробнее — ${FEDERAL_ORGS.length} организаций`,
          )}

          {openFed && (
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {FEDERAL_ORGS.map((o) => (
                <li key={o.name} className="flex">
                  <article className="flex w-full flex-col rounded-lg border border-border bg-background p-6">
                    <p className="text-[0.72em] uppercase tracking-[0.04em] text-teal">
                      {o.role}
                    </p>
                    <h3 className="mt-1.5 font-heading text-[1.1em] leading-snug">
                      {o.name}
                    </h3>
                    <p className="mt-1.5 text-[0.82em] leading-[1.45] text-muted-foreground">
                      {o.full}
                    </p>
                    <p className="mt-3 text-[0.9em] leading-[1.5] text-muted-foreground">
                      {o.what}
                    </p>
                    {o.head && (
                      <p className="mt-3 text-[0.85em] text-foreground">
                        {o.head}
                      </p>
                    )}
                    <div className="mt-auto space-y-1 border-t border-border pt-4 text-[0.85em] leading-[1.6]">
                      <p>
                        <a
                          href={o.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all border-b border-primary/35 text-primary transition-colors hover:border-primary"
                        >
                          {o.label}
                        </a>
                      </p>
                      <p>
                        <a
                          href={`tel:${telHref(o.tel)}`}
                          className="text-primary"
                        >
                          {o.tel}
                        </a>
                      </p>
                      <p>
                        <a
                          href={`mailto:${o.mail}`}
                          className="break-all text-primary"
                        >
                          {o.mail}
                        </a>
                      </p>
                    </div>
                    <p className="mt-3 text-[0.78em] leading-[1.45] text-tertiary">
                      {o.addr}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-8 max-w-[70ch] text-[0.85em] leading-[1.55] text-muted-foreground">
            Сведения проверены в&nbsp;августе 2026 года. Концепция развития
            добровольчества в&nbsp;Российской Федерации до&nbsp;2025 года,
            утверждённая распоряжением Правительства от&nbsp;27&nbsp;декабря
            2018 года №&nbsp;2950-р, утратила силу&nbsp;— при подготовке
            документов ссылаться на&nbsp;неё не&nbsp;следует.
          </p>
        </div>
      </section>
    </>
  );
};

export default Volunteers;
