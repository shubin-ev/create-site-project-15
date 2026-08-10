import Contacts from '@/components/site/Contacts';
import PageHero from '@/components/site/PageHero';
import { usePageMeta } from '@/hooks/use-page-meta';

const ContactsPage = () => {
  usePageMeta(
    'Контакты Совета НКО',
    'Как связаться с Советом НКО в сфере охраны психического здоровья при Российском обществе психиатров, форма обращения.',
  );

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Связаться с Советом"
        description="Задайте вопрос, предложите тему для заседания или сообщите о желании вступить в Совет — ответим на указанную почту."
      />
      <Contacts />
    </>
  );
};

export default ContactsPage;
