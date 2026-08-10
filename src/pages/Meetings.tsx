import Meetings from '@/components/site/Meetings';
import { usePageMeta } from '@/hooks/use-page-meta';

const MeetingsPage = () => {
  usePageMeta(
    'График заседаний Совета',
    'Даты ежеквартальных заседаний Совета НКО при Российском обществе психиатров, повестки и протоколы прошедших встреч.',
  );

  return (
    <>
      <Meetings />
    </>
  );
};

export default MeetingsPage;
