import Authorities from '@/components/site/Authorities';
import PageHero from '@/components/site/PageHero';
import { usePageMeta } from '@/hooks/use-page-meta';

const AuthoritiesPage = () => {
  usePageMeta(
    'Справочник органов власти регионов',
    'Контакты глав регионов, общественных палат, министерств здравоохранения, соцзащиты, образования и культуры по всем субъектам РФ.',
  );

  return (
    <>
      <PageHero
        eyebrow="Органы власти"
        title="Справочник органов власти регионов"
        description="Контакты глав регионов, общественных палат, министерств здравоохранения, соцзащиты, образования, культуры и спорта — с шаблоном обращения."
      />
      <Authorities />
    </>
  );
};

export default AuthoritiesPage;
