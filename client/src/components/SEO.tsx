import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  canonicalUrl?: string;
  structuredData?: object;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage = "/images/hero_the_deep.png",
  ogType = "website",
  canonicalUrl,
  structuredData,
}: SEOProps) {
  const fullTitle = `${title} | Explore Hull`;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://explorehull.com";
  const currentUrl = typeof window !== "undefined" ? window.location.href : siteUrl;
  const canonical = canonicalUrl || currentUrl;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:url", canonical, true);
    updateMetaTag("og:image", fullOgImage, true);
    updateMetaTag("og:site_name", "Explore Hull", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", fullOgImage);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [fullTitle, description, keywords, ogImage, ogType, canonical, fullOgImage, structuredData]);

  return null;
}

// Helper function to generate structured data for attractions
export function generateAttractionStructuredData(attraction: {
  name: string;
  description: string;
  address?: string;
  imageUrl?: string;
  website?: string;
  phone?: string;
  openingHours?: string;
  pricing?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attraction.name,
    description: attraction.description,
    image: attraction.imageUrl,
    address: attraction.address ? {
      "@type": "PostalAddress",
      streetAddress: attraction.address,
      addressLocality: "Hull",
      addressRegion: "East Yorkshire",
      addressCountry: "GB",
    } : undefined,
    url: attraction.website,
    telephone: attraction.phone,
    openingHours: attraction.openingHours,
    priceRange: attraction.pricing,
  };
}

// Helper function to generate structured data for events
export function generateEventStructuredData(event: {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date | null;
  location?: string;
  imageUrl?: string;
  ticketUrl?: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate?.toISOString(),
    location: event.location ? {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hull",
        addressRegion: "East Yorkshire",
        addressCountry: "GB",
      },
    } : undefined,
    image: event.imageUrl,
    offers: event.ticketUrl ? {
      "@type": "Offer",
      url: event.ticketUrl,
      price: event.price || "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    } : undefined,
  };
}

// Helper function to generate structured data for restaurants
export function generateRestaurantStructuredData(restaurant: {
  name: string;
  description: string;
  cuisine: string;
  address?: string;
  imageUrl?: string;
  website?: string;
  phone?: string;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.description,
    servesCuisine: restaurant.cuisine,
    image: restaurant.imageUrl,
    address: restaurant.address ? {
      "@type": "PostalAddress",
      streetAddress: restaurant.address,
      addressLocality: "Hull",
      addressRegion: "East Yorkshire",
      addressCountry: "GB",
    } : undefined,
    url: restaurant.website,
    telephone: restaurant.phone,
    priceRange: restaurant.priceRange,
  };
}

// Helper function to generate organization structured data
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Explore Hull",
    url: "https://explorehull.com",
    logo: "https://explorehull.com/images/hero_the_deep.png",
    description: "Your comprehensive guide to discovering Hull's attractions, events, restaurants, and experiences.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hull",
      addressRegion: "East Yorkshire",
      addressCountry: "GB",
    },
    sameAs: [
      // Add social media links when available
    ],
  };
}

// Helper function to generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
