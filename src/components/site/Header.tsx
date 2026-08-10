import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { CONTACT_EMAIL, LOGO_URL, NAV_LINKS } from '@/data/council';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground">
      <div className="section-shell flex h-[76px] items-center gap-8">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3.5 text-left">
          <img src={LOGO_URL} alt="" className="h-10 w-11 flex-none object-contain" />
          <span className="w-[9.5rem] font-heading text-[0.85em] font-medium leading-tight">
            Совет НКО при&nbsp;РОП
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `whitespace-nowrap py-1.5 text-[0.85em] transition-colors hover:text-header-hover ${
                  isActive ? 'text-teal' : 'text-header-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden min-h-[44px] items-center whitespace-nowrap rounded-lg border border-header-foreground/45 px-4 text-[0.85em] transition-colors hover:border-teal hover:text-teal xl:inline-flex"
          >
            {CONTACT_EMAIL}
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-header-foreground/45 lg:hidden"
        >
          <Icon name={open ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {open && (
        <div className="border-t border-header-foreground/15 lg:hidden">
          <nav className="section-shell flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-[44px] items-center rounded-lg px-2 text-left text-[0.95em] transition-colors hover:bg-header-foreground/10 ${
                    isActive ? 'text-teal' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
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
