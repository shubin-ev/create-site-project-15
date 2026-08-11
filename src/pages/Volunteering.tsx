import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Recommendations from '@/components/site/Recommendations';
import VolunteerDocs from '@/components/site/VolunteerDocs';
import Volunteers from '@/components/site/Volunteers';
import { VOLUNTEER_GROUPS } from '@/data/recommendations';
import { scrollToSection } from '@/lib/scroll';
import { usePageMeta } from '@/hooks/use-page-meta';

const TRAINING = [
  {
    icon: 'GraduationCap',
    title: 'Школа волонтёров в психиатрии',
    org: 'Союз специалистов в сфере охраны психического здоровья',
    text: 'Курс для тех, кто хочет прийти волонтёром в психиатрические учреждения, психоневрологические интернаты и НКО. Ведут врачи-психиатры, психотерапевты и клинические психологи.',
    points: [
      'Видеоуроки и вебинары, тестовые задания и обратная связь кураторов',
      'Правила общения и техника безопасности при работе с людьми с ментальными особенностями',
      'Методическое пособие и рабочая тетрадь',
    ],
    action: 'Записаться на курс',
    url: 'https://volunteers.mental-health-russia.ru/volunteer-school',
  },
  {
    icon: 'Lightbulb',
    title: 'Социальный импакт: как проекты меняют мир',
    org: 'Академия постдипломного образования при поддержке Союза охраны психического здоровья',
    text: 'Курс по социальному проектированию для тех, у кого есть идея, но нет плана: как найти проблему, собрать команду, привлечь ресурсы и запустить инициативу.',
    points: [
      '13 практических модулей — от концепции до реализации, 36 часов видеоуроков',
      'Паспорт проекта, дорожная карта, поиск спонсоров и партнёров',
      'Разбор реальных кейсов и приёмы публичной защиты проекта',
    ],
    action: 'Начать обучение',
    url: 'https://rosmededucation.ru/social_impact',
  },
];

const VolunteeringPage = () => {
  usePageMeta(
    'Волонтёрство в сфере психического здоровья',
    'Организации с волонтёрскими программами, методички и формы договоров с добровольцами, федеральная инфраструктура добровольчества и профильное законодательство.',
  );

  return (
    <>
      <section className="bg-surface py-14 sm:py-16">
        <div className="section-shell">
          <p className="eyebrow mb-5">Волонтёрство и добровольчество</p>
          <h1 className="max-w-[26ch] text-[2.1em] font-medium leading-[1.15] tracking-tight">
            Всё о&nbsp;волонтёрстве в&nbsp;сфере психического здоровья
          </h1>
          <p className="mt-4 max-w-[62ch] text-muted-foreground">
            Куда обратиться за&nbsp;волонтёрской помощью, как оформить отношения
            с&nbsp;добровольцем, где обучить волонтёров и&nbsp;какие законы это регулируют.
            Всё собрано в&nbsp;одном разделе.
          </p>

          <button
            type="button"
            onClick={() => scrollToSection('volunteer-training')}
            className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-primary px-6 font-heading text-[0.95em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Icon name="GraduationCap" size={18} />
            Бесплатное обучение волонтёров
          </button>
          <p className="mt-3 text-[0.85em] text-muted-foreground">
            Два онлайн-курса с&nbsp;открытой записью
          </p>
        </div>
      </section>

      <Volunteers />
      <VolunteerDocs />
      <Recommendations
        id="volunteering-methods"
        eyebrow="Методические материалы"
        title="Методики регионов по добровольчеству"
        description="Рекомендации ресурсных центров: как привлекать добровольцев, выстраивать работу с ними в учреждениях и оформлять финансовые отношения."
        groups={VOLUNTEER_GROUPS}
        buttonLabel="материалов"
      />

      <section
        id="volunteer-training"
        className="scroll-mt-24 border-t border-border py-14 sm:py-16"
      >
        <div className="section-shell">
          <p className="eyebrow mb-5">Бесплатное обучение</p>
          <h2 className="max-w-[26ch] text-[1.9em] font-medium leading-tight tracking-tight">
            Онлайн-курсы для волонтёров
          </h2>
          <p className="mt-4 max-w-[62ch] text-muted-foreground">
            Два бесплатных дистанционных курса при поддержке Союза охраны психического
            здоровья: подготовка волонтёров к&nbsp;работе в&nbsp;психиатрии и&nbsp;обучение
            социальному проектированию. Записаться может любой желающий.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {TRAINING.map((c) => (
              <article
                key={c.url}
                className="flex flex-col rounded-lg border border-border bg-surface p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon name={c.icon} fallback="GraduationCap" size={22} />
                </span>
                <h3 className="mt-4 font-heading text-[1.15em] leading-snug">{c.title}</h3>
                <p className="mt-1.5 text-[0.85em] text-muted-foreground">{c.org}</p>
                <p className="mt-3 text-[0.92em] leading-[1.55] text-muted-foreground">
                  {c.text}
                </p>
                <ul className="mt-4 space-y-2">
                  {c.points.map((t) => (
                    <li
                      key={t}
                      className="flex gap-3 text-[0.88em] leading-[1.5] text-muted-foreground"
                    >
                      <span className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-teal" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-5 text-[0.9em] text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {c.action}
                    <Icon name="ArrowUpRight" size={16} />
                  </a>
                  <span className="text-[0.85em] text-teal">Бесплатно</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-14 sm:py-16">
        <div className="section-shell">
          <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-heading text-[1.2em] leading-tight">
              Законодательство о&nbsp;добровольчестве
            </h2>
            <p className="mt-3 max-w-[68ch] text-[0.92em] leading-[1.55] text-muted-foreground">
              Федеральные законы, постановления и&nbsp;ведомственные акты, регулирующие
              волонтёрскую деятельность, собраны в&nbsp;правовой базе — с&nbsp;фильтром
              по&nbsp;сфере «Волонтёрство» и&nbsp;ссылками на&nbsp;официальные тексты.
            </p>
            <Link
              to="/legal?sphere=%D0%92%D0%BE%D0%BB%D0%BE%D0%BD%D1%82%D1%91%D1%80%D1%81%D1%82%D0%B2%D0%BE"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-5 text-[0.9em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Открыть акты о волонтёрстве
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default VolunteeringPage;