import Meetings from '@/components/site/Meetings';
import PageHero from '@/components/site/PageHero';
import { usePageMeta } from '@/hooks/use-page-meta';

const MeetingsPage = () => {
  usePageMeta(
    'График заседаний Совета',
    'Даты ежеквартальных заседаний Совета НКО при Российском обществе психиатров, повестки и протоколы прошедших встреч.',
  );

  return (
    <>
      <PageHero
        eyebrow="Заседания"
        title="График заседаний Совета"
        description="Совет собирается ежеквартально в дистанционном формате. Все заседания протоколируются, повестки и протоколы доступны для скачивания."
      />
      <Meetings />
    </>
  );
};

export default MeetingsPage;
