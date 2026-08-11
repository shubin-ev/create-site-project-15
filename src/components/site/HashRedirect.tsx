import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/lib/scroll';

const HASH_MAP: Record<string, string> = {
  about: '/about',
  members: '/about',
  groups: '/about',
  documents: '/library',
  'inclusive-education': '/inclusive',
  recommendations: '/library',
  legal: '/legal',
  control: '/legal',
  authorities: '/authorities',
  meetings: '/about',
  contacts: '/contacts',
};

const HashRedirect = () => {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const target = HASH_MAP[id];
    if (!target) return;

    if (pathname !== target) {
      navigate(target, { replace: true });
      window.setTimeout(() => scrollToSection(id), 120);
      return;
    }
    window.setTimeout(() => scrollToSection(id), 60);
  }, [hash, pathname, navigate]);

  return null;
};

export default HashRedirect;
