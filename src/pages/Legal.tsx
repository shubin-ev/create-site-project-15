import LegalActs from '@/components/site/LegalActs';
import ControlForms from '@/components/site/ControlForms';
import PageHero from '@/components/site/PageHero';
import { usePageMeta } from '@/hooks/use-page-meta';

const LegalPage = () => {
  usePageMeta(
    'Нормативные акты и общественный контроль',
    'Каталог нормативно-правовых актов в сфере психического здоровья и разбор форм общественного контроля по Федеральному закону № 212-ФЗ.',
  );

  return (
    <>
      <PageHero
        eyebrow="Правовая база"
        title="Нормативные акты и общественный контроль"
        description="Каталог федеральных и региональных нормативно-правовых актов в сфере психического здоровья, а также формы и субъекты общественного контроля."
        links={[
          { id: 'legal', label: 'Нормативно-правовые акты' },
          { id: 'control', label: 'Общественный контроль' },
        ]}
      />
      <LegalActs />
      <ControlForms />
    </>
  );
};

export default LegalPage;
