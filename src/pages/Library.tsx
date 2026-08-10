import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Documents from '@/components/site/Documents';
import Recommendations from '@/components/site/Recommendations';
import { usePageMeta } from '@/hooks/use-page-meta';

const LibraryPage = () => {
  usePageMeta(
    'Библиотека НКО: документы и методические материалы',
    'Методические рекомендации, памятки и образцы документов по волонтёрству, инклюзивному образованию и общественному контролю в психиатрии.',
  );
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [topic, setTopic] = useState<string | null>(params.get('topic'));

  return (
    <>
      <Documents query={query} onQueryChange={setQuery} topic={topic} onTopicChange={setTopic} />
      <Recommendations />
    </>
  );
};

export default LibraryPage;
