import { useState } from 'react';
import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import About from '@/components/site/About';
import Members from '@/components/site/Members';
import WorkGroups from '@/components/site/WorkGroups';
import Documents from '@/components/site/Documents';
import LegalActs from '@/components/site/LegalActs';
import Recommendations from '@/components/site/Recommendations';
import Authorities from '@/components/site/Authorities';
import Meetings from '@/components/site/Meetings';
import Contacts from '@/components/site/Contacts';
import Footer from '@/components/site/Footer';

const Index = () => {
  const [docQuery, setDocQuery] = useState('');
  const [docTopic, setDocTopic] = useState<string | null>(null);

  const pickTopic = (topic: string) => {
    setDocQuery('');
    setDocTopic(topic);
  };

  const search = (query: string) => {
    setDocTopic(null);
    setDocQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero onSearch={search} onTopic={pickTopic} />
        <About />
        <Members />
        <WorkGroups />
        <Documents
          query={docQuery}
          onQueryChange={setDocQuery}
          topic={docTopic}
          onTopicChange={setDocTopic}
        />
        <LegalActs />
        <Recommendations />
        <Authorities />
        <Meetings />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
