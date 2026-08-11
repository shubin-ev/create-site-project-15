import About from '@/components/site/About';
import Members from '@/components/site/Members';
import WorkGroups from '@/components/site/WorkGroups';
import { usePageMeta } from '@/hooks/use-page-meta';

const AboutPage = () => {
  usePageMeta(
    'О Совете: состав и рабочие группы',
    'Состав Совета НКО из 114 руководителей организаций 84 регионов, рабочие группы и документы Совета.',
  );

  return (
    <>
      <About />
      <Members />
      <WorkGroups />
    </>
  );
};

export default AboutPage;
