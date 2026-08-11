import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import {
  CONTACT_EMAIL,
  LOGO_URL,
  NAV_LINKS,
  NavLinkItem,
  PARTNER_LINKS,
} from '@/data/council';
import { scrollToSection } from '@/lib/scroll';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToSection = (link: NavLinkItem, hash: string) => {
    setHovered(null);
    setOpen(false);
    setExpanded(null);
    if (pathname === link.path) {
      scrollToSection(hash);
      return;
    }
    navigate(link.path);
    window.setTimeout(() => scrollToSection(hash), 140);
  };

  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground">
      <div className="section-shell flex h-[84px] items-center gap-5">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3.5 text-left">
          <img src={LOGO_URL} alt="" className="h-10 w-11 flex-none object-contain" />
          <span className="w-[9.5rem] font-heading text-[0.85em] font-medium leading-tight">
            Совет НКО при&nbsp;РОП
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-4 lg:flex">
          {NAV_LINKS.map((link) => (
            <div
              key={link.path}
              className="relative"
              onMouseEnter={() => setHovered(link.path)}
              onMouseLeave={() => setHovered(null)}
            >
              <NavLink
                to={link.path}
                onClick={() => setHovered(null)}
                className={({ isActive }) =>
                  `flex items-center gap-1 whitespace-nowrap py-1.5 text-[0.85em] transition-colors hover:text-header-hover ${
                    isActive ? 'text-teal' : 'text-header-foreground'
                  }`
                }
              >
                {link.label}
                {link.items && (
                  <Icon
                    name="ChevronDown"
                    size={14}
                    className={`transition-transform ${hovered === link.path ? 'rotate-180' : ''}`}
                  />
                )}
              </NavLink>

              {link.items && hovered === link.path && (
                <div className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3">
                  <ul className="overflow-hidden rounded-lg border border-border bg-background p-1.5 shadow-lg">
                    {link.items.map((item) => (
                      <li key={item.hash}>
                        <button
                          type="button"
                          onClick={() => goToSection(link, item.hash)}
                          className="w-full rounded-md px-3 py-2.5 text-left transition-colors hover:bg-secondary"
                        >
                          <span className="block font-heading text-[0.9em] leading-snug text-foreground">
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[0.8em] leading-[1.4] text-muted-foreground">
                            {item.hint}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-5 hidden flex-none items-center gap-4 lg:flex">
          {PARTNER_LINKS.map((partner) => (
            <a
              key={partner.url}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.name}
              className="group relative flex h-[52px] items-center px-1"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.headerRatio} object-contain flex-none opacity-80 transition-opacity duration-300 group-hover:opacity-0`}
              />
              <img
                src={partner.logoColor}
                alt=""
                aria-hidden
                className={`${partner.headerRatio} absolute left-1 top-1/2 -translate-y-1/2 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
            </a>
          ))}
        </div>

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
              <div key={link.path}>
                <div className="flex items-center">
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex min-h-[44px] flex-1 items-center rounded-lg px-2 text-left text-[0.95em] transition-colors hover:bg-header-foreground/10 ${
                        isActive ? 'text-teal' : ''
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                  {link.items && (
                    <button
                      type="button"
                      aria-label={`Разделы: ${link.label}`}
                      aria-expanded={expanded === link.path}
                      onClick={() =>
                        setExpanded((v) => (v === link.path ? null : link.path))
                      }
                      className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg"
                    >
                      <Icon
                        name="ChevronDown"
                        size={18}
                        className={`transition-transform ${
                          expanded === link.path ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {link.items && expanded === link.path && (
                  <ul className="mb-1 ml-2 border-l border-header-foreground/20 pl-3">
                    {link.items.map((item) => (
                      <li key={item.hash}>
                        <button
                          type="button"
                          onClick={() => goToSection(link, item.hash)}
                          className="flex min-h-[42px] w-full items-center rounded-lg px-2 text-left text-[0.88em] text-header-foreground/80 transition-colors hover:bg-header-foreground/10"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 inline-flex min-h-[44px] items-center rounded-lg border border-header-foreground/45 px-4 text-[0.88em]"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {PARTNER_LINKS.map((partner) => (
                <a
                  key={partner.url}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                  className="flex h-[56px] items-center rounded-lg bg-background px-3"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`${partner.headerRatio} object-contain flex-none`}
                  />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;