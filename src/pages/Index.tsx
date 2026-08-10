import { useNavigate } from 'react-router-dom';
import Hero from '@/components/site/Hero';
import SectionsGrid from '@/components/site/SectionsGrid';

const Index = () => {
  const navigate = useNavigate();

  const pickTopic = (topic: string) => {
    navigate(`/library?topic=${encodeURIComponent(topic)}`);
  };

  const search = (query: string) => {
    navigate(`/library?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Hero onSearch={search} onTopic={pickTopic} />
      <SectionsGrid />
    </>
  );
};

export default Index;
