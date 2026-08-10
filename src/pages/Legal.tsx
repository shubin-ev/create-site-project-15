import LegalActs from '@/components/site/LegalActs';
import ControlForms from '@/components/site/ControlForms';
import { usePageMeta } from '@/hooks/use-page-meta';

const LegalPage = () => {
  usePageMeta(
    'Нормативные акты и общественный контроль',
    'Каталог нормативно-правовых актов в сфере психического здоровья и разбор форм общественного контроля по Федеральному закону № 212-ФЗ.',
  );

  return (
    <>
      <LegalActs />
      <ControlForms />
    </>
  );
};

export default LegalPage;
