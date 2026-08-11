import { Link } from 'react-router-dom';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  LOGO_URL,
  NAV_LINKS,
  PARTNER_LINKS,
} from '@/data/council';

const Footer = () => (
  <footer className="bg-header text-header-foreground">
    <div className="section-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <Link to="/" className="flex items-center gap-3.5">
          <img src={LOGO_URL} alt="" className="h-12 w-12 flex-none object-contain" />
          <span className="max-w-[26ch] font-heading text-[0.95em] font-medium leading-tight">
            Совет НКО в сфере охраны психического здоровья при Российском обществе психиатров
          </span>
        </Link>
        <p className="mt-5 max-w-[46ch] text-[0.88em] leading-[1.5] text-header-foreground/70">
          Информационный ресурс для представителей некоммерческих организаций: документы, состав,
          заседания и материалы Совета.
        </p>
        <p className="mt-6 text-[0.82em] text-header-foreground/55">При поддержке</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {PARTNER_LINKS.map((partner) => (
            <a
              key={partner.url}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.name}
              className="flex items-center rounded-lg bg-white px-3 py-2 transition-opacity hover:opacity-85"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.ratio} object-contain`}
              />
            </a>
          ))}
        </div>
      </div>

      <nav aria-label="Разделы сайта">
        <h3 className="font-heading text-[0.95em] font-medium">Разделы</h3>
        <ul className="mt-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <li key={l.path}>
              <Link
                to={l.path}
                className="flex min-h-[36px] items-center text-[0.88em] text-header-foreground/80 transition-colors hover:text-header-hover"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h3 className="font-heading text-[0.95em] font-medium">Связь</h3>
        <ul className="mt-4 space-y-2 text-[0.88em]">
          <li>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex min-h-[36px] items-center text-header-foreground/80 transition-colors hover:text-header-hover"
            >
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            <a
              href={`tel:${CONTACT_PHONE_HREF}`}
              className="flex min-h-[36px] items-center text-header-foreground/80 transition-colors hover:text-header-hover"
            >
              {CONTACT_PHONE}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-header-foreground/15">
      <div className="section-shell py-6 text-[0.85em] text-header-foreground/60">
        © {new Date().getFullYear()} Совет НКО при Российском обществе психиатров
      </div>
    </div>
  </footer>
);

export default Footer;