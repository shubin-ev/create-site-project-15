import { useState } from 'react';
import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import About from '@/components/site/About';
import Members from '@/components/site/Members';
import Documents from '@/components/site/Documents';
import Meetings from '@/components/site/Meetings';
import Materials from '@/components/site/Materials';
import Contacts from '@/components/site/Contacts';
import Footer from '@/components/site/Footer';
import { DOC_TOPICS, DOC_TYPES, DOC_YEARS } from '@/data/council';

const Index = () => {
  const [docQuery, setDocQuery] = useState('');
  const [docType, setDocType] = useState(DOC_TYPES[0]);
  const [docTopic, setDocTopic] = useState(DOC_TOPICS[0]);
  const [docYear, setDocYear] = useState(DOC_YEARS[0]);

  const pickTopic = (topic: string) => {
    setDocQuery('');
    setDocType(DOC_TYPES[0]);
    setDocYear(DOC_YEARS[0]);
    setDocTopic(topic);
  };

  const search = (query: string) => {
    setDocTopic(DOC_TOPICS[0]);
    setDocQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero onSearch={search} onTopic={pickTopic} />
        <About />
        <Members />
        <Documents
          query={docQuery}
          onQueryChange={setDocQuery}
          type={docType}
          onTypeChange={setDocType}
          topic={docTopic}
          onTopicChange={setDocTopic}
          year={docYear}
          onYearChange={setDocYear}
        />
        <Meetings />
        <Materials onTopic={pickTopic} />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
