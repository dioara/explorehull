import { getAllAttractions, getAllEvents, getAllRestaurants, getAllAccommodations, getAllBlogPosts } from "./db";

export async function generateSitemap(): Promise<string> {
  const baseUrl = "https://explorehull.com";
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '', changefreq: 'daily', priority: '1.0' },
    { url: '/explore', changefreq: 'daily', priority: '0.9' },
    { url: '/events', changefreq: 'daily', priority: '0.9' },
    { url: '/eat-drink', changefreq: 'weekly', priority: '0.8' },
    { url: '/stay', changefreq: 'weekly', priority: '0.8' },
    { url: '/blog', changefreq: 'weekly', priority: '0.8' },
    { url: '/maritime', changefreq: 'monthly', priority: '0.7' },
    { url: '/travel-info', changefreq: 'monthly', priority: '0.7' },
    { url: '/contact', changefreq: 'monthly', priority: '0.6' },
  ];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages
  for (const page of staticPages) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  }

  // Add dynamic pages
  try {
    const attractions = await getAllAttractions();
    for (const attraction of attractions) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/attraction/${attraction.slug}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.8</priority>\n`;
      sitemap += '  </url>\n';
    }

    const events = await getAllEvents();
    for (const event of events) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/event/${event.slug}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>daily</changefreq>\n`;
      sitemap += `    <priority>0.7</priority>\n`;
      sitemap += '  </url>\n';
    }

    const restaurants = await getAllRestaurants();
    for (const restaurant of restaurants) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/restaurant/${restaurant.slug}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.7</priority>\n`;
      sitemap += '  </url>\n';
    }

    const blogPosts = await getAllBlogPosts();
    for (const post of blogPosts) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>monthly</changefreq>\n`;
      sitemap += `    <priority>0.6</priority>\n`;
      sitemap += '  </url>\n';
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap entries:', error);
  }

  sitemap += '</urlset>';
  return sitemap;
}
