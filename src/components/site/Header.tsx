import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { CONTACT_EMAIL, LOGO_URL, NAV_LINKS } from '@/data/council';
import { scrollToSection } from '@/lib/scroll';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('about');

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY + 140;
      let current = NAV_LINKS[0].id;
      NAV_LINKS.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= offset) current = link.id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground">
      <div className="section-shell flex h-[76px] items-center gap-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3.5 text-left"
        >
          <img src={LOGO_URL} alt="" className="h-10 w-11 flex-none object-contain" />
          <span className="max-w-[15ch] font-heading text-[0.88em] font-medium leading-tight">
            Совет НКО при&nbsp;РОП
          </span>
        </button>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className={`py-1.5 text-[0.88em] transition-colors hover:text-header-hover ${
                active === link.id ? 'text-teal' : 'text-header-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-header-foreground/45 px-4 text-[0.88em] transition-colors hover:border-teal hover:text-teal"
          >
            {CONTACT_EMAIL}
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-lg border border-header-foreground/45 lg:hidden"
        >
          <Icon name={open ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {open && (
        <div className="border-t border-header-foreground/15 lg:hidden">
          <nav className="section-shell flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="flex min-h-[44px] items-center rounded-lg px-2 text-left text-[0.95em] transition-colors hover:bg-header-foreground/10"
              >
                {link.label}
              </button>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 inline-flex min-h-[44px] items-center rounded-lg border border-header-foreground/45 px-4 text-[0.88em]"
            >
              {CONTACT_EMAIL}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
