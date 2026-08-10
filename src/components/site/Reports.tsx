import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { ANNUAL_REPORTS } from '@/data/reports';

const Reports = () => {
  const [year, setYear] = useState(ANNUAL_REPORTS[0].year);
  const report = ANNUAL_REPORTS.find((r) => r.year === year) ?? ANNUAL_REPORTS[0];

  return (
    <section id="reports" className="scroll-mt-24 border-t border-border py-16 sm:py-20">
      <div className="section-shell">
        <p className="eyebrow mb-6">Отчётность</p>
        <h2 className="max-w-[24ch] text-[1.9em] leading-tight">Отчёты о работе Совета</h2>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Что сделано за каждый год: заседания, рабочие группы, проекты и результаты.
        </p>

        <div
          role="tablist"
          aria-label="Годы отчётов"
          className="mt-8 flex flex-wrap gap-1 border-b border-border"
        >
          {ANNUAL_REPORTS.map((r) => (
            <button
              key={r.year}
              role="tab"
              type="button"
              aria-selected={year === r.year}
              onClick={() => setYear(r.year)}
              className={`-mb-px min-h-[44px] border-b-2 px-5 font-heading text-[1em] font-medium transition-colors ${
                year === r.year
                  ? 'border-teal text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {r.year}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <p className="max-w-[70ch] border-l-[3px] border-l-teal py-1 pl-4 text-[0.98em] leading-[1.55]">
            {report.summary}
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {report.highlights.map((h) => (
              <div key={h.label} className="rounded-lg border border-border bg-background p-5">
                <dt className="text-[0.78em] uppercase tracking-[0.04em] text-muted-foreground">
                  {h.label}
                </dt>
                <dd className="mt-2 font-heading text-[1.15em] leading-snug">{h.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 space-y-8">
            {report.sections.map((s) => (
              <div key={s.title}>
                <h3 className="flex items-center gap-2.5 font-heading text-[1.15em] leading-tight">
                  <Icon name="FileText" size={18} className="text-teal" />
                  {s.title}
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex max-w-[85ch] gap-3 text-[0.93em] leading-[1.6] text-muted-foreground"
                    >
                      <span className="mt-[0.6em] h-1.5 w-1.5 flex-none rounded-full bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reports;
