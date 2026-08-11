import LibraryCatalog from '@/components/site/LibraryCatalog';
import { usePageMeta } from '@/hooks/use-page-meta';

const LibraryPage = () => {
  usePageMeta(
    'Библиотека НКО: методики, документы и образцы',
    'Методики, памятки и образцы документов для некоммерческих организаций: практики работы с психическими особенностями, регистрация, отчётность, гранты и типовые бланки.',
  );

  return <LibraryCatalog />;
};

export default LibraryPage;
