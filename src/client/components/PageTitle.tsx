import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMetaTags } from '../../utils';


const PageTitle = () => {
  const location = useLocation();


  useEffect(() => {
    const { description, linkCanonical, title } = getMetaTags(location.pathname);
    document.title = title;

    // nahradíme existující canonical
    const template = document.createElement('template');
    template.innerHTML = linkCanonical.trim();
    const linkCanonicalElement = template.content.firstChild as HTMLElement;
    document.querySelector("link[rel='canonical']")?.replaceWith(linkCanonicalElement);

    const metaDescription = document.querySelector("meta[name='description']");
    const ogDescription = document.querySelector("meta[name='og:description']");
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.setAttribute('name', 'description');
      newMeta.setAttribute('content', description);
      document.head.appendChild(newMeta);
    }
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

  }, [location]);

  return null;
};

export default PageTitle;