// Canonical SEO constants and JSON-LD builders. Every page pulls from
// here so claims about the brand stay aligned and we don't duplicate
// schema literals across templates.

export const SITE_URL = "https://boisemarketingguy.com";
export const SITE_NAME = "Boise Marketing Guy";
export const FOUNDER_NAME = "Dwight Davis";
export const FOUNDER_TITLE = "Founder, Boise Marketing Guy";
export const PUBLIC_PHONE = "+1-208-957-5828";
export const PUBLIC_EMAIL = "dwight@boisemarketingguy.com";
export const AREA_CITY = "Boise";
export const AREA_REGION = "ID";
export const AREA_COUNTRY = "US";

export const SAMEAS = [
  "https://www.linkedin.com/in/dwightdavis/",
];

// Organization schema. Goes on every page.
export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/dwight.png`,
    founder: { "@id": `${SITE_URL}/#dwight` },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: PUBLIC_PHONE,
        email: PUBLIC_EMAIL,
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
    sameAs: SAMEAS,
  };
}

// LocalBusiness schema. Adds geo + service area on top of Organization.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    image: `${SITE_URL}/dwight.png`,
    url: SITE_URL,
    telephone: PUBLIC_PHONE,
    email: PUBLIC_EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: AREA_CITY,
      addressRegion: AREA_REGION,
      addressCountry: AREA_COUNTRY,
    },
    areaServed: [
      { "@type": "State", name: "Idaho" },
      { "@type": "Country", name: "United States" },
    ],
    founder: { "@id": `${SITE_URL}/#dwight` },
    sameAs: SAMEAS,
  };
}

// Person schema for Dwight. Used on /about and homepage.
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#dwight`,
    name: FOUNDER_NAME,
    jobTitle: FOUNDER_TITLE,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/about/`,
    image: `${SITE_URL}/dwight.png`,
    sameAs: SAMEAS,
    knowsAbout: [
      "Local SEO",
      "Answer Engine Optimization",
      "AI Search Visibility",
      "Google Ads",
      "Paid Media",
      "Digital Marketing Strategy",
      "Conversion Rate Optimization",
    ],
    description:
      "20+ year digital marketing strategist managing ~$450K/month in paid media, helping small businesses across Idaho turn marketing into revenue.",
  };
}

// Breadcrumb schema. Pass array of {name, url} where url is path-only.
export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.url}`,
    })),
  };
}

// Service schema for service-tier pages.
export function serviceSchema({
  name,
  description,
  url,
  category,
}: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    serviceType: category,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: [
      { "@type": "State", name: "Idaho" },
      { "@type": "Country", name: "United States" },
    ],
  };
}

// Article / BlogPosting schema for blog posts.
export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified,
    image: image || `${SITE_URL}/dwight.png`,
    author: { "@id": `${SITE_URL}/#dwight` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${url}` },
  };
}
