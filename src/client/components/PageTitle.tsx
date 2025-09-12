import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMetaTags } from '../../utils';


const PageTitle = () => {
  const location = useLocation();


  useEffect(() => {
    const { description, linkCanonical, title, keywords, ogTitle } = getMetaTags(location.pathname);
    document.title = title;

    // nahradíme existující canonical
    const template = document.createElement('template');
    template.innerHTML = linkCanonical.trim();
    const linkCanonicalElement = template.content.firstChild as HTMLElement;
    document.querySelector("link[rel='canonical']")?.replaceWith(linkCanonicalElement);

    const metaDescription = document.querySelector("meta[name='description']");
    const ogDescription = document.querySelector("meta[name='og:description']");
    const metaKeywords = document.querySelector("meta[name='keywords']");
    const ogTitleTag = document.querySelector("meta[property='og:title']");

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

    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || '');
    } else if (keywords) {
      const newKeywords = document.createElement('meta');
      newKeywords.setAttribute('name', 'keywords');
      newKeywords.setAttribute('content', keywords);
      document.head.appendChild(newKeywords);
    }

    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', ogTitle || title);
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.setAttribute('content', ogTitle || title);
      document.head.appendChild(newOgTitle);
    }

  }, [location]);

  return null;
};

export default PageTitle;