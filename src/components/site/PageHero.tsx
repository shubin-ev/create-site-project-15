import { scrollToSection } from '@/lib/scroll';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  links?: { id: string; label: string }[];
};

const PageHero = ({ eyebrow, title, description, links }: PageHeroProps) => (
  <section className="border-b border-border bg-surface py-12 sm:py-16">
    <div className="section-shell">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h1 className="max-w-[20ch] text-[2.1em] font-medium leading-[1.15] tracking-tight">
        {title}
      </h1>
      <p className="mt-5 max-w-[62ch] leading-[1.55] text-muted-foreground">{description}</p>

      {links && links.length > 0 && (
        <nav aria-label="Разделы страницы" className="mt-8 flex flex-wrap gap-2">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToSection(l.id)}
              className="inline-flex min-h-[40px] items-center rounded-full border border-border bg-background px-4 text-[0.85em] transition-colors hover:border-primary"
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  </section>
);

export default PageHero;
