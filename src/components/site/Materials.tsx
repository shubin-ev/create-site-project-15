import Icon from '@/components/ui/icon';
import { MATERIALS } from '@/data/council';
import { scrollToSection } from '@/lib/scroll';

const Materials = () => (
  <section id="materials" className="scroll-mt-24 border-t border-border bg-surface py-16 sm:py-20">
    <div className="section-shell">
      <p className="eyebrow mb-6">Материалы</p>
      <h2 className="max-w-[24ch] text-[1.9em] leading-tight">
        Практика регионов, собранная в&nbsp;одном месте
      </h2>
      <p className="mt-4 max-w-[60ch] text-muted-foreground">
        Материалы Совета открыты и&nbsp;пригодны к&nbsp;повторению: их&nbsp;можно использовать
        в&nbsp;работе своей организации без дополнительного согласования.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MATERIALS.map((m) => (
          <button
            key={m.title}
            type="button"
            onClick={() => scrollToSection('documents')}
            className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 text-left transition-colors hover:border-primary"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
              <Icon name={m.icon} size={22} />
            </span>
            <h3 className="mt-4 font-heading text-[1.05em] leading-snug">{m.title}</h3>
            <p className="mt-3 text-[0.9em] leading-[1.5] text-muted-foreground">{m.text}</p>
            <span className="mt-auto flex items-center gap-2 pt-5 text-[0.85em] text-primary">
              {m.count}
              <Icon
                name="ArrowRight"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default Materials;
