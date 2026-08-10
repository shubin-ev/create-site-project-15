import About from '@/components/site/About';
import Members from '@/components/site/Members';
import WorkGroups from '@/components/site/WorkGroups';
import Reports from '@/components/site/Reports';
import { usePageMeta } from '@/hooks/use-page-meta';

const AboutPage = () => {
  usePageMeta(
    'О Совете: состав, рабочие группы и отчёты',
    'Состав Совета НКО из 114 руководителей организаций 84 регионов, рабочие группы, документы и отчёты о работе за 2022–2025 годы.',
  );

  return (
    <>
      <About />
      <Members />
      <WorkGroups />
      <Reports />
    </>
  );
};

export default AboutPage;
