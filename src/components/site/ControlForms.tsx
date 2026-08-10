import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CONTROL_FORMS, ControlForm } from "@/data/control-forms";
import {
  CONTROL_PARTICIPANTS,
  CONTROL_SUBJECTS,
} from "@/data/control-subjects";

const TABS = [
  { id: "forms", label: "Формы контроля" },
  { id: "subjects", label: "Кто осуществляет" },
];

const ControlForms = () => {
  const [tab, setTab] = useState("forms");
  const [onlyNko, setOnlyNko] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [openSubject, setOpenSubject] = useState<string | null>(null);

  const list = CONTROL_FORMS.filter((f) => !onlyNko || f.nko);

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-[0.85em] transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-primary"
      }`}
    >
      {label}
    </button>
  );

  const fact = (label: string, value: string) => (
    <div>
      <p className="text-[0.72em] uppercase tracking-[0.04em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-[0.9em] leading-[1.45]">{value}</p>
    </div>
  );

  const card = (f: ControlForm) => {
    const isOpen = open === f.id;
    return (
      <article
        key={f.id}
        className={`rounded-lg border bg-background p-6 ${
          f.nko ? "border-border border-l-[3px] border-l-teal" : "border-border"
        }`}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-heading text-[1.2em] leading-tight tracking-tight">
            {f.title}
          </h3>
          <span className="text-[0.82em] text-muted-foreground">
            {f.law} Федерального закона № 212-ФЗ
          </span>
        </div>

        <p className="mt-2 max-w-[80ch] text-[0.92em] leading-[1.5] text-muted-foreground">
          {f.short}
        </p>

        <span
          className={`mt-4 inline-flex h-7 items-center gap-1.5 rounded-full px-3.5 text-[0.78em] ${
            f.nko
              ? "bg-teal/15 text-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          <Icon name={f.nko ? "Check" : "Minus"} size={13} />
          {f.nko ? "НКО может быть организатором" : "НКО не может инициировать"}
        </span>

        <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {fact("Кто инициирует", f.who)}
          {fact("Срок", f.term)}
          {fact("Итоговый документ", f.doc)}
          {fact("Что дальше", f.binding)}
        </div>

        <button
          type="button"
          onClick={() => setOpen(isOpen ? null : f.id)}
          className="mt-5 inline-flex min-h-[40px] items-center gap-2 text-[0.9em] text-primary"
        >
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
          Как проводится
        </button>

        {isOpen && (
          <ul className="mt-2 space-y-3">
            {f.how.map((h) => (
              <li
                key={h}
                className="flex gap-3 text-[0.9em] leading-[1.55] text-muted-foreground"
              >
                <span className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-teal" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </article>
    );
  };

  return (
    <section
      id="control"
      className="scroll-mt-24 border-t border-border py-16 sm:py-20"
    >
      <div className="section-shell">
        <p className="eyebrow mb-6">Общественный контроль</p>
        <h2 className="max-w-[26ch] text-[1.9em] leading-tight">
          Общественный контроль: формы и&nbsp;участники
        </h2>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Кто вправе вести общественный контроль и&nbsp;в&nbsp;каких формах
          он&nbsp;проводится — по&nbsp;Федеральному закону №&nbsp;212-ФЗ
          и&nbsp;профильному законодательству.
        </p>

        <div
          role="tablist"
          aria-label="Разделы об общественном контроле"
          className="mt-8 flex flex-wrap gap-1 border-b border-border"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`-mb-px min-h-[44px] border-b-2 px-4 font-heading text-[0.95em] font-medium transition-colors ${
                tab === t.id
                  ? "border-teal text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "subjects" ? (
          <div className="mt-10">
            <h3 className="font-heading text-[1.35em] leading-tight tracking-tight">
              Субъекты общественного контроля
            </h3>
            <p className="mt-3 max-w-[62ch] text-[0.92em] text-muted-foreground">
              Организационные структуры, которым закон прямо даёт полномочия
              вести общественный контроль.
            </p>

            <ul className="mt-6 grid gap-4 lg:grid-cols-2">
              {CONTROL_SUBJECTS.map((s) => {
                const isOpen = openSubject === s.id;
                return (
                  <li key={s.id}>
                    <article className="flex h-full flex-col rounded-lg border border-border bg-background p-6">
                      <div className="flex items-start gap-4">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-secondary text-primary">
                          <Icon name={s.icon} fallback="Landmark" size={22} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.78em] uppercase tracking-[0.04em] text-muted-foreground">
                            {s.level}
                          </p>
                          <h4 className="mt-1 font-heading text-[1.08em] leading-snug">
                            {s.title}
                          </h4>
                        </div>
                      </div>

                      <p className="mt-4 text-[0.9em] leading-[1.55] text-muted-foreground">
                        {s.short}
                      </p>

                      <button
                        type="button"
                        onClick={() => setOpenSubject(isOpen ? null : s.id)}
                        className="mt-4 inline-flex min-h-[40px] items-center gap-2 text-[0.88em] text-primary"
                      >
                        <Icon
                          name={isOpen ? "ChevronUp" : "ChevronDown"}
                          size={16}
                        />
                        Полномочия
                      </button>

                      {isOpen && (
                        <ul className="mt-1 space-y-3">
                          {s.powers.map((p) => (
                            <li
                              key={p}
                              className="flex gap-3 text-[0.88em] leading-[1.55] text-muted-foreground"
                            >
                              <span className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-teal" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-auto border-t border-border pt-4">
                        <p className="text-[0.82em] leading-[1.5] text-muted-foreground">
                          {s.law}
                        </p>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex min-h-[36px] items-center gap-2 border-b border-primary/35 text-[0.85em] text-primary transition-colors hover:border-primary"
                        >
                          <Icon name="ExternalLink" size={15} />
                          Открыть закон
                        </a>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <h3 className="mt-14 font-heading text-[1.35em] leading-tight tracking-tight">
              Право на участие в общественном контроле
            </h3>
            <p className="mt-3 max-w-[62ch] text-[0.92em] text-muted-foreground">
              Что закон разрешает гражданам, некоммерческим организациям
              и&nbsp;объединениям в&nbsp;сфере психиатрии.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {CONTROL_PARTICIPANTS.map((p) => (
                <article
                  key={p.id}
                  className="flex h-full flex-col rounded-lg border border-border border-l-[3px] border-l-teal bg-background p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon name={p.icon} fallback="User" size={22} />
                  </span>
                  <h4 className="mt-4 font-heading text-[1.08em] leading-snug">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-[0.9em] leading-[1.5] text-muted-foreground">
                    {p.lead}
                  </p>

                  <ul className="mt-5 space-y-4 border-t border-border pt-5">
                    {p.rules.map((r) => (
                      <li key={r.law}>
                        <p className="text-[0.88em] leading-[1.55]">{r.text}</p>
                        <p className="mt-1.5 text-[0.78em] text-muted-foreground">
                          {r.law}
                        </p>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <p className="mt-8 max-w-[75ch] text-[0.85em] leading-[1.55] text-muted-foreground">
              Помимо перечисленных структур закон допускает создание иных
              организационных структур общественного контроля в&nbsp;случаях,
              предусмотренных федеральным законодательством.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <p className="max-w-[62ch] text-muted-foreground">
              Федеральный закон №&nbsp;212-ФЗ предусматривает пять форм
              общественного контроля. Контроль может осуществляться одновременно
              в&nbsp;нескольких формах.
            </p>

            <div className="mt-8 max-w-[70ch] border-l-[3px] border-l-teal py-1 pl-4">
              <p className="text-[0.95em] leading-[1.55]">
                Некоммерческая организация может{" "}
                <strong className="font-medium">
                  самостоятельно организовать
                </strong>{" "}
                общественный мониторинг, а&nbsp;по&nbsp;его результатам —
                инициировать общественное обсуждение или публичные слушания.
              </p>
              <p className="mt-3 text-[0.95em] leading-[1.55] text-muted-foreground">
                Общественную проверку и&nbsp;общественную экспертизу НКО
                инициировать не&nbsp;может: перечень инициаторов в&nbsp;законе
                закрытый. Но&nbsp;организация вправе предложить провести
                их&nbsp;уполномоченному по&nbsp;правам человека или общественной
                палате, а&nbsp;её&nbsp;специалисты могут участвовать как
                общественные инспекторы и&nbsp;эксперты.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {chip("Все формы", !onlyNko, () => setOnlyNko(false))}
              {chip("Что НКО может инициировать сама", onlyNko, () =>
                setOnlyNko(true),
              )}
            </div>

            <div className="mt-6 space-y-4">{list.map(card)}</div>

            <p className="mt-8 max-w-[75ch] text-[0.85em] leading-[1.55] text-muted-foreground">
              Правовая основа — Федеральный закон от&nbsp;21&nbsp;июля
              2014&nbsp;года №&nbsp;212-ФЗ «Об&nbsp;основах общественного
              контроля в&nbsp;Российской Федерации» в&nbsp;редакции
              от&nbsp;25&nbsp;декабря 2023&nbsp;года, действующей
              с&nbsp;1&nbsp;июля 2024&nbsp;года. Действие закона
              не&nbsp;распространяется на&nbsp;общественный экологический
              контроль и&nbsp;контроль в&nbsp;области обращения с&nbsp;животными
              — они регулируются отдельно.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ControlForms;
