import Contacts from '@/components/site/Contacts';
import { usePageMeta } from '@/hooks/use-page-meta';

const ContactsPage = () => {
  usePageMeta(
    'Контакты Совета НКО',
    'Как связаться с Советом НКО в сфере охраны психического здоровья при Российском обществе психиатров, форма обращения.',
  );

  return (
    <>
      <Contacts />
    </>
  );
};

export default ContactsPage;
