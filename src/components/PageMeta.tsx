import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const defaultDescription = 'Professional visa consultancy, documentation support and overseas career guidance for students, professionals and families.';

const metadata: Record<string, { title: string; description: string }> = {
  '/': { title: 'The Visa Fox | Visa & Overseas Career Guidance', description: defaultDescription },
  '/checklist': { title: 'Visa Document Checklist | The Visa Fox', description: 'Explore country and visa-specific document checklists for study, work, visitor and permanent residency applications.' },
  '/sop-generator': { title: 'SOP Generator | The Visa Fox', description: 'Prepare a structured statement of purpose for your international study application.' },
  '/blogs': { title: 'Visa Guides & Insights | The Visa Fox', description: 'Read practical information about visa preparation, international study and overseas career planning.' },
  '/contact': { title: 'Free Profile Assessment | The Visa Fox', description: 'Contact The Visa Fox for profile-based visa, documentation and overseas career guidance.' },
  '/privacy-policy': { title: 'Privacy Policy | The Visa Fox', description: 'Learn how The Visa Fox handles information submitted through this website.' },
  '/terms': { title: 'Terms of Use | The Visa Fox', description: 'Read the website and consultancy information terms for The Visa Fox.' },
};

const setMeta = (selector: string, attribute: string, value: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
};

const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = metadata[pathname] || (pathname.startsWith('/blog/') ? metadata['/blogs'] : metadata['/']);
    document.title = page.title;
    setMeta('meta[name="description"]', 'content', page.description);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', page.description);
    setMeta('meta[property="og:url"]', 'content', `https://www.thevisafox.com${pathname}`);
  }, [pathname]);

  return null;
};

export default PageMeta;
