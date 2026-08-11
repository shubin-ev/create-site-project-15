import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Recommendations from '@/components/site/Recommendations';
import VolunteerDocs from '@/components/site/VolunteerDocs';
import Volunteers from '@/components/site/Volunteers';
import { VOLUNTEER_GROUPS } from '@/data/recommendations';
import { usePageMeta } from '@/hooks/use-page-meta';

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
