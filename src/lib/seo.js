import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { POSTS } from '../pages/Journal';

const SITE = 'https://fibbi.in';
const OG_IMAGE = `${SITE}/products/fibbi-og-jar.png`;

const ROUTES = {
  '/': {
    title: 'fibbi — fiber that snacks back | 5g fiber per serve',
    desc: 'fibbi is a crunchy fiber snack for Indians who skip the 6am isabgol slime. 5g of psyllium + prebiotic acacia fiber per serve, in granola, jars, sticks and dahi cups.',
  },
  '/shop': {
    title: 'Shop fiber snacks — granola, jars, sticks & dahi cups | fibbi',
    desc: "Launch pricing for India. Crunch granola in berry, coffee, cocoa and vanilla, og psyllium jars and 6g sticks, plus ready-to-eat dahi cups. 5g psyllium per serve, zero added sugar, free shipping over ₹499.",
  },
  '/science': {
    title: 'The science of psyllium husk & prebiotic fiber | fibbi',
    desc: 'Psyllium husk is a soluble, gel-forming fiber studied for decades — for cholesterol, post-meal blood sugar and regularity. We did not invent the ingredient, we engineered the delivery.',
  },
  '/story': {
    title: 'Our story — the most effective fiber on earth had a branding problem | fibbi',
    desc: 'Isabgol always worked; it just got filed under uncle behaviour. fibbi bakes the same clinically proven psyllium into crunchy 5g clusters with zero added sugar. Made in Pune, priced for India.',
  },
  '/journal': {
    title: 'The fibbi journal — fiber, gut health and ingredients explained',
    desc: 'Notes on gut health, ingredients and the science we build on — written for people who want the reasoning, not the marketing.',
  },
  '/play': {
    title: 'The fibermaxxing game — catch clusters, dodge sugar | fibbi',
    desc: 'Catch 30 seconds of fiber clusters, dodge the sugar cubes, screenshot your tier. 25g+ makes you a certified fibermaxxer.',
  },
  '/policies': {
    title: 'Shipping, returns & policies | fibbi',
    desc: 'Shipping timelines, returns, refunds and contact details for fibbi orders across India. Free shipping over ₹499, COD available, a human replies on WhatsApp 10am–7pm IST.',
  },
};

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
