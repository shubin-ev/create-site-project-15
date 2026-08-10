import { useEffect } from 'react';

const SUFFIX = 'Совет НКО при РОП';

export const usePageMeta = (title: string, description: string) => {
  useEffect(() => {
    document.title = `${title} — ${SUFFIX}`;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }, [title, description]);
};
