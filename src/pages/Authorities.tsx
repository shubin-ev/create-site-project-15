import Authorities from '@/components/site/Authorities';
import { usePageMeta } from '@/hooks/use-page-meta';

const AuthoritiesPage = () => {
  usePageMeta(
    'Справочник органов власти регионов',
    'Контакты глав регионов, общественных палат, министерств здравоохранения, соцзащиты, образования и культуры по всем субъектам РФ.',
  );

  return (
    <>
      <Authorities />
    </>
  );
};

export default AuthoritiesPage;
