import About from '@/components/site/About';
import Members from '@/components/site/Members';
import WorkGroups from '@/components/site/WorkGroups';
import Reports from '@/components/site/Reports';
import PageHero from '@/components/site/PageHero';
import { usePageMeta } from '@/hooks/use-page-meta';

const AboutPage = () => {
  usePageMeta(
    'О Совете: состав, рабочие группы и отчёты',
    'Состав Совета НКО из 114 руководителей организаций 84 регионов, рабочие группы, документы и отчёты о работе за 2022–2025 годы.',
  );

  return (
    <>
      <PageHero
        eyebrow="О Совете"
        title="Совет НКО в сфере охраны психического здоровья"
        description="Кто входит в Совет, чем занимаются рабочие группы, какие документы регулируют работу и что сделано за каждый год."
        links={[
          { id: 'about', label: 'О Совете' },
          { id: 'members', label: 'Состав' },
          { id: 'groups', label: 'Рабочие группы' },
          { id: 'reports', label: 'Отчёты' },
        ]}
      />
      <About />
      <Members />
      <WorkGroups />
      <Reports />
    </>
  );
};

export default AboutPage;
