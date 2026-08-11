import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import InclusiveEducation from '@/components/site/InclusiveEducation';
import { usePageMeta } from '@/hooks/use-page-meta';

const INCLUSIVE_ACTS_LINK =
  '/legal?sphere=%D0%98%D0%BD%D0%BA%D0%BB%D1%8E%D0%B7%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5';

const SOURCE_FILE = '/docs/Inklyuzivnoe-obrazovanie-pamyatka-2026.docx';

const InclusivePage = () => {
  usePageMeta(
    'Инклюзивное образование: нормы и финансирование',
    'Право на образование обучающихся с ОВЗ и инвалидностью: действующие нормы, федеральные стандарты, государственные программы и механизмы финансирования.',
  );

  return (
    <>
      <section className="bg-surface py-14 sm:py-16">
        <div className="section-shell">
          <p className="eyebrow mb-5">Инклюзивное образование</p>
          <h1 className="max-w-[26ch] text-[2.1em] font-medium leading-[1.15] tracking-tight">
            Образование детей с&nbsp;ОВЗ и&nbsp;инвалидностью
          </h1>
          <p className="mt-4 max-w-[62ch] text-muted-foreground">
            Какие нормы регулируют право на&nbsp;образование, как устроено финансовое
            обеспечение, какие действуют стандарты и&nbsp;государственные программы.
            Справка и&nbsp;полный перечень нормативных актов — в&nbsp;одном разделе.
          </p>

          <Link
            to={INCLUSIVE_ACTS_LINK}
            className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-primary px-6 font-heading text-[0.95em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Icon name="Scale" size={18} />
            Нормативные акты по инклюзии
          </Link>
          <p className="mt-3 text-[0.85em] text-muted-foreground">
            62 акта в&nbsp;правовой базе со&nbsp;ссылками на&nbsp;официальные тексты
          </p>
        </div>
      </section>

      <InclusiveEducation />

      <section className="border-t border-border py-14 sm:py-16">
        <div className="section-shell">
          <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-heading text-[1.2em] leading-tight">
              Скачать памятку одним файлом
            </h2>
            <p className="mt-3 max-w-[68ch] text-[0.92em] leading-[1.55] text-muted-foreground">
              Правовая основа и&nbsp;финансовое обеспечение инклюзивного образования:
              федеральный закон, госпрограммы «Доступная среда» и&nbsp;«Развитие
              образования», ФГОС и&nbsp;адаптированные программы, что проверить
              на&nbsp;уровне региона. Актуализировано на&nbsp;10&nbsp;августа 2026&nbsp;года.
            </p>
            <a
              href={SOURCE_FILE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border bg-background px-5 text-[0.9em] text-primary transition-colors hover:border-primary"
            >
              <Icon name="Download" size={16} />
              Памятка «Инклюзивное образование», DOCX
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default InclusivePage;
