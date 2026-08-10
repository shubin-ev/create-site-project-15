import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { CONTROL_FORMS, ControlForm } from '@/data/control-forms';

const ControlForms = () => {
  const [onlyNko, setOnlyNko] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const list = CONTROL_FORMS.filter((f) => !onlyNko || f.nko);

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-[0.85em] transition-colors ${
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-foreground hover:border-primary'
      }`}
    >
      {label}
    </button>
  );

  const fact = (label: string, value: string) => (
    <div>
      <p className="text-[0.72em] uppercase tracking-[0.04em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-[0.9em] leading-[1.45]">{value}</p>
    </div>
  );

  const card = (f: ControlForm) => {
    const isOpen = open === f.id;
    return (
      <article
        key={f.id}
        className={`rounded-lg border bg-background p-6 ${
          f.nko ? 'border-border border-l-[3px] border-l-teal' : 'border-border'
        }`}
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-heading text-[1.2em] leading-tight tracking-tight">{f.title}</h3>
          <span className="text-[0.82em] text-muted-foreground">
            {f.law} Федерального закона № 212-ФЗ
          </span>
        </div>

        <p className="mt-2 max-w-[80ch] text-[0.92em] leading-[1.5] text-muted-foreground">
          {f.short}
        </p>

        <span
          className={`mt-4 inline-flex h-7 items-center gap-1.5 rounded-full px-3.5 text-[0.78em] ${
            f.nko ? 'bg-teal/15 text-foreground' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <Icon name={f.nko ? 'Check' : 'Minus'} size={13} />
          {f.nko ? 'НКО может быть организатором' : 'НКО не может инициировать'}
        </span>

        <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {fact('Кто инициирует', f.who)}
          {fact('Срок', f.term)}
          {fact('Итоговый документ', f.doc)}
          {fact('Что дальше', f.binding)}
        </div>

        <button
          type="button"
          onClick={() => setOpen(isOpen ? null : f.id)}
          className="mt-5 inline-flex min-h-[40px] items-center gap-2 text-[0.9em] text-primary"
        >
          <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
          Как проводится
        </button>

        {isOpen && (
          <ul className="mt-2 space-y-3">
            {f.how.map((h) => (
              <li key={h} className="flex gap-3 text-[0.9em] leading-[1.55] text-muted-foreground">
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
    <section id="control" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Общественный контроль</p>
        <h2 className="max-w-[24ch] text-[1.9em] leading-tight">Формы общественного контроля</h2>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Федеральный закон №&nbsp;212-ФЗ предусматривает пять форм общественного контроля.
          Контроль может осуществляться одновременно в&nbsp;нескольких формах.
        </p>

        <div className="mt-8 max-w-[70ch] border-l-[3px] border-l-teal py-1 pl-4">
          <p className="text-[0.95em] leading-[1.55]">
            Некоммерческая организация может <strong className="font-medium">самостоятельно
            организовать</strong> общественный мониторинг, а&nbsp;по&nbsp;его результатам —
            инициировать общественное обсуждение или публичные слушания.
          </p>
          <p className="mt-3 text-[0.95em] leading-[1.55] text-muted-foreground">
            Общественную проверку и&nbsp;общественную экспертизу НКО инициировать не&nbsp;может:
            перечень инициаторов в&nbsp;законе закрытый. Но&nbsp;организация вправе предложить
            провести их&nbsp;уполномоченному по&nbsp;правам человека или общественной палате,
            а&nbsp;её&nbsp;специалисты могут участвовать как общественные инспекторы и&nbsp;эксперты.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {chip('Все формы', !onlyNko, () => setOnlyNko(false))}
          {chip('Что НКО может инициировать сама', onlyNko, () => setOnlyNko(true))}
        </div>

        <div className="mt-6 space-y-4">{list.map(card)}</div>

        <p className="mt-8 max-w-[75ch] text-[0.85em] leading-[1.55] text-muted-foreground">
          Правовая основа — Федеральный закон от&nbsp;21&nbsp;июля 2014&nbsp;года №&nbsp;212-ФЗ
          «Об&nbsp;основах общественного контроля в&nbsp;Российской Федерации» в&nbsp;редакции
          от&nbsp;25&nbsp;декабря 2023&nbsp;года, действующей с&nbsp;1&nbsp;июля 2024&nbsp;года.
          Действие закона не&nbsp;распространяется на&nbsp;общественный экологический контроль
          и&nbsp;контроль в&nbsp;области обращения с&nbsp;животными — они регулируются отдельно.
        </p>
      </div>
    </section>
  );
};

export default ControlForms;
