import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { POSTS } from '../pages/Journal';
import { ROUTES, SITE } from '../data/seo-routes';

const OG_IMAGE = `${SITE}/og.jpg`;

function metaTag(attr, key) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  return el;
}

function linkTag(rel) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  return el;
}

function articleLd(post, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.dek,
    articleSection: post.tag,
    mainEntityOfPage: url,
    image: OG_IMAGE,
    publisher: { '@type': 'Organization', name: 'fibbi', url: SITE },
  };
}

export function resolveMeta(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  if (ROUTES[path]) return { ...ROUTES[path], path, index: true };

  const slug = path.startsWith('/journal/') && path.slice('/journal/'.length);
  const post = slug && POSTS.find((p) => p.slug === slug);
  if (post) {
    return {
      title: `${post.title} | fibbi journal`,
      desc: post.dek,
      path,
      index: true,
      type: 'article',
      ld: articleLd(post, SITE + path),
    };
  }

  // Unknown path: App renders Home, so mark it noindex to avoid soft-404 duplicates.
  return { ...ROUTES['/'], path: '/', index: false };
}

export function useSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, desc, path, index, type = 'website', ld } = resolveMeta(pathname);
    const url = SITE + (path === '/' ? '/' : path);

    document.title = title;
    metaTag('name', 'description').setAttribute('content', desc);
    metaTag('name', 'robots').setAttribute(
      'content',
      index ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    );
    linkTag('canonical').setAttribute('href', url);

    metaTag('property', 'og:title').setAttribute('content', title);
    metaTag('property', 'og:description').setAttribute('content', desc);
    metaTag('property', 'og:url').setAttribute('content', url);
    metaTag('property', 'og:type').setAttribute('content', type);
    metaTag('name', 'twitter:title').setAttribute('content', title);
    metaTag('name', 'twitter:description').setAttribute('content', desc);

    let script = document.getElementById('route-ld');
    if (ld) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'route-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(ld);
    } else if (script) {
      script.remove();
    }
  }, [pathname]);
}
