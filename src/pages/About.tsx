import About from '@/components/site/About';
import Leadership from '@/components/site/Leadership';
import Members from '@/components/site/Members';
import WorkGroups from '@/components/site/WorkGroups';
import Meetings from '@/components/site/Meetings';
import { usePageMeta } from '@/hooks/use-page-meta';

const AboutPage = () => {
  usePageMeta(
    'О Совете: состав, рабочие группы и заседания',
    'Состав Совета НКО из 114 руководителей организаций 84 регионов, рабочие группы, документы, график заседаний и протоколы.',
  );

  return (
    <>
      <About />
      <Leadership />
      <Members />
      <WorkGroups />
      <Meetings />
    </>
  );
};

export default AboutPage;
