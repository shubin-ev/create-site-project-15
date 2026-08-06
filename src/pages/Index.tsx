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
import { DOC_TYPES, DOC_YEARS } from '@/data/council';

const Index = () => {
  const [docQuery, setDocQuery] = useState('');
  const [docType, setDocType] = useState(DOC_TYPES[0]);
  const [docYear, setDocYear] = useState(DOC_YEARS[0]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero onSearch={setDocQuery} />
        <About />
        <Members />
        <Documents
          query={docQuery}
          onQueryChange={setDocQuery}
          type={docType}
          onTypeChange={setDocType}
          year={docYear}
          onYearChange={setDocYear}
        />
        <Meetings />
        <Materials />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
