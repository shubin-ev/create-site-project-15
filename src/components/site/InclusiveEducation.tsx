import { useState } from "react";
import Icon from "@/components/ui/icon";

const LAWS = [
  {
    no: "Ст. 5",
    title: "Право на образование",
    text: "Органы публичной власти создают необходимые условия для получения без дискриминации качественного образования лицами с ограниченными возможностями здоровья, коррекции нарушений развития, социальной адаптации и организации инклюзивного образования.",
  },
  {
    no: "Ст. 7",
    title: "Переданные полномочия",
    text: "Часть федеральных полномочий в сфере образования передана органам государственной власти субъектов Российской Федерации. Их финансовое обеспечение осуществляется в установленном законом порядке.",
  },
  {
    no: "Ст. 11",
    title: "Федеральные государственные образовательные стандарты",
    text: "Для реализации права на образование обучающихся с ОВЗ устанавливаются специальные требования в федеральных государственных образовательных стандартах.",
  },
  {
    no: "Ст. 79",
    title: "Организация образования обучающихся с ОВЗ и инвалидностью",
    text: "Статья регулирует специальные условия обучения, воспитания и сопровождения обучающихся с ОВЗ, инвалидов и детей-инвалидов. Это одна из ключевых норм.",
  },
];

const FINANCE = [
  {
    title: "Субвенции",
    text: "Межбюджетные трансферты, направляемые субъектам РФ для финансового обеспечения расходных обязательств, возникающих при выполнении переданных федеральных полномочий.",
    ref: "БК РФ, ст. 133",
  },
  {
    title: "Субсидии",
    text: "Средства федерального бюджета, предоставляемые для софинансирования расходных обязательств субъектов Российской Федерации и муниципальных образований.",
    ref: "БК РФ, ст. 132",
  },
  {
    title: "Региональные нормативы",
    text: "Финансовое обеспечение государственных гарантий получения общедоступного и бесплатного образования по адаптированным программам осуществляется на основе нормативов, определяемых субъектами РФ.",
    ref: "ФГОС № 1598 и № 1599",
  },
];

const STANDARDS = [
  {
    no: "Приказ № 1598",
    text: "Федеральный государственный образовательный стандарт начального общего образования обучающихся с ограниченными возможностями здоровья.",
  },
  {
    no: "Приказ № 1599",
    text: "Федеральный государственный образовательный стандарт образования обучающихся с умственной отсталостью (интеллектуальными нарушениями).",
  },
];

const PROGRAMS = [
  {
    no: "№ 1022",
    text: "Федеральная адаптированная образовательная программа дошкольного образования для обучающихся с ОВЗ",
  },
  {
    no: "№ 1023",
    text: "Федеральная адаптированная образовательная программа начального общего образования для обучающихся с ОВЗ",
  },
  {
    no: "№ 1025",
    text: "Федеральная адаптированная образовательная программа основного общего образования для обучающихся с ОВЗ",
  },
  {
    no: "№ 1026",
    text: "Федеральная адаптированная основная общеобразовательная программа обучающихся с умственной отсталостью (интеллектуальными нарушениями)",
  },
];

const REGIONS = [
  "законы и иные акты субъекта РФ об образовании",
  "законы о региональном бюджете на текущий год и плановый период",
  "акты об организации инклюзивного образования лиц с ОВЗ",
  "региональные концепции, планы, комплексы мероприятий и дорожные карты",
  "порядки расходования и предоставления субсидий",
  "нормативы финансового обеспечения реализации адаптированных программ",
];

const SOURCES = [
  {
    title: "Федеральный закон № 273-ФЗ «Об образовании в Российской Федерации»",
    url: "https://www.consultant.ru/document/cons_doc_LAW_140174/",
  },
  {
    title: "Статья 79 Федерального закона № 273-ФЗ",
    url: "https://www.consultant.ru/document/cons_doc_LAW_140174/6c54646c803424bc1fff4634c4e925d90c4affec/",
  },
  {
    title: "Бюджетный кодекс Российской Федерации",
    url: "https://www.consultant.ru/document/cons_doc_LAW_19702/",
  },
  {
    title: "Постановление Правительства РФ № 363 — «Доступная среда»",
    url: "https://www.consultant.ru/document/cons_doc_LAW_322085/",
  },
  {
    title: "Постановление Правительства РФ № 1642 — «Развитие образования»",
    url: "https://www.consultant.ru/document/cons_doc_LAW_286474/",
  },
  {
    title: "Приказ Минобрнауки России № 1598",
    url: "https://www.consultant.ru/document/cons_doc_LAW_175495/",
  },
  {
    title: "Приказ Минобрнауки России № 1599",
    url: "https://www.consultant.ru/document/cons_doc_LAW_175316/",
  },
  {
    title: "Приказ Минпросвещения России № 1022",
    url: "https://www.consultant.ru/document/cons_doc_LAW_438538/",
  },
  {
    title: "Приказ Минпросвещения России № 1023",
    url: "https://www.consultant.ru/document/cons_doc_LAW_442699/",
  },
  {
    title: "Приказ Минпросвещения России № 1025",
    url: "https://www.consultant.ru/document/cons_doc_LAW_442698/",
  },
  {
    title: "Приказ Минпросвещения России № 1026",
    url: "https://www.consultant.ru/document/cons_doc_LAW_436515/",
  },
  {
    title: "Национальный проект «Молодёжь и дети» — Правительство России",
    url: "https://government.ru/rugovclassifier/914/about/",
  },
];

const head = (num: string, title: string, sub: string) => (
  <div className="flex items-start gap-4">
    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-secondary font-heading text-[0.9em] text-primary">
      {num}
    </span>
    <div>
      <h3 className="font-heading text-[1.25em] leading-tight">{title}</h3>
      <p className="mt-1 text-[0.85em] text-muted-foreground">{sub}</p>
    </div>
  </div>
);

const InclusiveEducation = () => {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="inclusive-education"
      className="scroll-mt-24 border-t border-border py-14 sm:py-16"
    >
      <div className="section-shell">
        <p className="eyebrow mb-5">Инклюзивное образование</p>
        <h2 className="max-w-[28ch] text-[1.9em] font-medium leading-tight tracking-tight">
          Об образовании, в&nbsp;том числе инклюзивном, и&nbsp;его финансовом
          обеспечении
        </h2>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Основные действующие нормы, государственные программы и&nbsp;механизмы
          финансирования, которые регулируют право на&nbsp;образование
          обучающихся с&nbsp;ограниченными возможностями здоровья
          и&nbsp;инвалидностью.
        </p>

        <p className="mt-5 max-w-[62ch] border-l-[3px] border-teal pl-4 text-[0.95em] leading-[1.55]">
          Нормативная база регулярно меняется. Ниже собрана актуальная
          информация на&nbsp;10&nbsp;августа 2026&nbsp;года. Для официального
          применения конкретной нормы проверьте её&nbsp;действующую редакцию
          на&nbsp;дату обращения.
        </p>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-surface px-5 font-heading text-[0.9em] transition-colors hover:border-primary"
        >
          {open ? "Свернуть справку" : "Развернуть справку"}
          <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} />
        </button>

        {open && (
          <div className="mt-10 space-y-12">
            <div>
              {head(
                "1",
                "Правовая основа",
                "Федеральный закон от 29.12.2012 № 273-ФЗ «Об образовании в Российской Федерации»",
              )}
              <ul className="mt-6 border-t border-border">
                {LAWS.map((l) => (
                  <li
                    key={l.no}
                    className="grid gap-2 border-b border-border py-5 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="font-heading text-[0.9em] text-primary">
                      {l.no}
                    </span>
                    <div>
                      <p className="font-heading text-[1.02em] leading-snug">
                        {l.title}
                      </p>
                      <p className="mt-2 text-[0.92em] leading-[1.6] text-muted-foreground">
                        {l.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {head(
                "2",
                "Как устроено финансовое обеспечение",
                "Федеральный закон № 273-ФЗ и Бюджетный кодекс РФ",
              )}
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {FINANCE.map((f) => (
                  <article
                    key={f.title}
                    className="flex flex-col rounded-lg border border-border bg-surface p-5"
                  >
                    <h4 className="font-heading text-[1.05em]">{f.title}</h4>
                    <p className="mt-3 text-[0.9em] leading-[1.55] text-muted-foreground">
                      {f.text}
                    </p>
                    <p className="mt-auto border-t border-border pt-4 text-[0.82em] text-tertiary">
                      {f.ref}
                    </p>
                  </article>
                ))}
              </div>
              <p className="mt-5 rounded-lg bg-secondary/60 p-5 text-[0.92em] leading-[1.6]">
                Средства, предоставляемые на&nbsp;осуществление переданных
                полномочий, имеют целевое назначение. Конкретный порядок
                предоставления и&nbsp;использования средств определяется
                федеральными и&nbsp;региональными нормативными актами.
              </p>
            </div>

            <div>
              {head(
                "3",
                "Государственные программы",
                "Актуальные механизмы поддержки и софинансирования",
              )}

              <article className="mt-6 rounded-lg border border-border bg-surface p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <span className="inline-flex rounded bg-teal-soft px-2.5 py-1 text-[0.75em] uppercase tracking-wide text-teal-deep">
                      Действует
                    </span>
                    <h4 className="mt-2 font-heading text-[1.1em]">
                      Государственная программа «Доступная среда»
                    </h4>
                  </div>
                  <p className="text-[0.82em] text-muted-foreground">
                    Постановление Правительства РФ от 29.03.2019 № 363
                  </p>
                </div>
                <p className="mt-5 text-[0.92em] leading-[1.6] text-muted-foreground">
                  Для финансового обеспечения мероприятий в&nbsp;сфере инклюзии
                  имеют значение действующие правила предоставления
                  и&nbsp;распределения субсидий. В&nbsp;актуальной структуре
                  программы:
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-secondary/60 p-4">
                    <span className="font-heading text-[0.82em] text-primary">
                      Приложение № 1
                    </span>
                    <p className="mt-2 text-[0.88em] leading-[1.55]">
                      мероприятия по&nbsp;формированию системы комплексной
                      реабилитации и&nbsp;абилитации инвалидов, в&nbsp;том числе
                      детей-инвалидов
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/60 p-4">
                    <span className="font-heading text-[0.82em] text-primary">
                      Приложение № 2
                    </span>
                    <p className="mt-2 text-[0.88em] leading-[1.55]">
                      создание базовых профессиональных образовательных
                      организаций, поддерживающих региональные системы
                      инклюзивного профессионального образования инвалидов
                      и&nbsp;лиц с&nbsp;ОВЗ
                    </p>
                  </div>
                </div>
              </article>

              <article className="mt-4 rounded-lg border border-border bg-surface p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <span className="inline-flex rounded bg-teal-soft px-2.5 py-1 text-[0.75em] uppercase tracking-wide text-teal-deep">
                      До 2030 года
                    </span>
                    <h4 className="mt-2 font-heading text-[1.1em]">
                      Государственная программа «Развитие образования»
                    </h4>
                  </div>
                  <p className="text-[0.82em] text-muted-foreground">
                    Постановление Правительства РФ от 26.12.2017 № 1642
                  </p>
                </div>
                <p className="mt-5 text-[0.92em] leading-[1.6] text-muted-foreground">
                  В&nbsp;программе сохраняется задача совершенствования условий
                  получения общего, дополнительного и&nbsp;профессионального
                  образования лицами с&nbsp;ОВЗ и&nbsp;инвалидами. Отдельно
                  закрепляется необходимость соблюдать баланс между развитием
                  инклюзивного образования и&nbsp;сохранением сети отдельных
                  образовательных организаций, чтобы у&nbsp;родителей
                  и&nbsp;законных представителей сохранялось право выбора.
                </p>
                <p className="mt-5 border-l-[3px] border-teal pl-4 text-[0.9em] leading-[1.55]">
                  <strong className="font-heading">Важно.</strong> Перечень
                  субсидий и&nbsp;приложения к&nbsp;постановлению №&nbsp;1642
                  регулярно меняются. Для конкретного мероприятия необходимо
                  проверять действующую редакцию соответствующего приложения
                  на&nbsp;дату обращения.
                </p>
              </article>

              <p className="mt-5 rounded-lg bg-secondary/60 p-5 text-[0.92em] leading-[1.6]">
                С&nbsp;2025&nbsp;года текущей рамкой федеральной образовательной
                политики является национальный проект «Молодёжь и&nbsp;дети».
                Ссылки на&nbsp;национальный проект «Образование» могут
                встречаться в&nbsp;переходных или ранее принятых нормативных
                положениях, но&nbsp;не&nbsp;должны использоваться как общее
                описание действующей системы.
              </p>
            </div>

            <div>
              {head(
                "4",
                "ФГОС и федеральные адаптированные образовательные программы",
                "Нормативная база организации обучения",
              )}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {STANDARDS.map((s) => (
                  <article
                    key={s.no}
                    className="rounded-lg border border-border bg-surface p-5"
                  >
                    <span className="inline-flex rounded bg-secondary px-2.5 py-1 text-[0.75em] uppercase tracking-wide text-primary">
                      ФГОС
                    </span>
                    <h4 className="mt-2 font-heading text-[1.05em]">{s.no}</h4>
                    <p className="mt-3 text-[0.9em] leading-[1.55] text-muted-foreground">
                      {s.text}
                    </p>
                  </article>
                ))}
              </div>
              <p className="mt-8 font-heading text-[1.05em]">
                Федеральные адаптированные образовательные программы
              </p>
              <ul className="mt-4 border-t border-border">
                {PROGRAMS.map((p) => (
                  <li
                    key={p.no}
                    className="grid gap-2 border-b border-border py-4 text-[0.92em] leading-[1.55] sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="font-heading text-[0.9em] text-primary">
                      {p.no}
                    </span>
                    <span className="text-muted-foreground">{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {head(
                "5",
                "Что регулируется на уровне субъекта РФ",
                "Региональные документы необходимо проверять отдельно для каждого субъекта",
              )}
              <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {REGIONS.map((r) => (
                  <li
                    key={r}
                    className="relative border-b border-border py-3 pl-6 text-[0.92em] leading-[1.5] text-muted-foreground"
                  >
                    <span className="absolute left-0 top-[1.15em] h-[7px] w-[7px] rounded-full bg-teal" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg bg-secondary/60 p-5 text-[0.92em] leading-[1.6]">
                Этот перечень носит ориентировочный характер. Наличие, название
                и&nbsp;содержание конкретных документов различаются
                в&nbsp;зависимости от&nbsp;субъекта Российской Федерации.
              </p>
            </div>

            <div>
              {head(
                "6",
                "Основные нормативные документы",
                "Ссылки для проверки действующей редакции",
              )}
              <ul className="mt-6 border-t border-border">
                {SOURCES.map((s) => (
                  <li key={s.url} className="border-b border-border">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[52px] items-center justify-between gap-4 py-3 text-[0.95em] text-primary transition-colors hover:text-teal-deep"
                    >
                      <span>{s.title}</span>
                      <Icon
                        name="ArrowUpRight"
                        size={18}
                        className="flex-none"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[0.85em] leading-[1.6] text-tertiary">
              Дата последней проверки: 10&nbsp;августа 2026&nbsp;года. Материал
              носит справочно-информационный характер и&nbsp;не&nbsp;заменяет
              проверку конкретного нормативного акта в&nbsp;его действующей
              редакции.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InclusiveEducation;
