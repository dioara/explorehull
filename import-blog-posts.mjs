import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { blogPosts } from "./drizzle/schema.js";
import fs from "fs";
import path from "path";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

// Blog articles metadata
const articles = [
  {
    file: "01-hull-maritime-history.md",
    title: "Hull's Maritime History: From Fishing Port to Modern City",
    category: "History & Heritage",
    slug: "hull-maritime-history",
    readingTime: 8,
    featured: true,
    imageUrl: "/images/hull_marina.png",
  },
  {
    file: "02-city-of-culture-legacy.md",
    title: "Hull's City of Culture 2017: A Transformative Year",
    category: "History & Heritage",
    slug: "city-of-culture-legacy",
    readingTime: 7,
    featured: true,
    imageUrl: "/images/hull_city_hall.png",
  },
  {
    file: "03-must-visit-attractions.md",
    title: "Top 10 Must-Visit Attractions in Hull",
    category: "Things to Do",
    slug: "must-visit-attractions",
    readingTime: 10,
    featured: true,
    imageUrl: "/images/the_deep.png",
  },
  {
    file: "04-hull-best-restaurants.md",
    title: "Hull's Best Restaurants: A Foodie's Guide",
    category: "Food & Drink",
    slug: "hull-best-restaurants",
    readingTime: 8,
    featured: false,
    imageUrl: "/images/restaurants/ambiente-tapas.png",
  },
  {
    file: "05-traditional-hull-cuisine.md",
    title: "Traditional Hull Cuisine: The Famous Hull Patty and More",
    category: "Food & Drink",
    slug: "traditional-hull-cuisine",
    readingTime: 6,
    featured: false,
    imageUrl: "/images/hull_old_town.png",
  },
  {
    file: "06-hull-coffee-culture.md",
    title: "Hull's Thriving Coffee Culture: Best Cafes and Coffee Shops",
    category: "Food & Drink",
    slug: "hull-coffee-culture",
    readingTime: 6,
    featured: false,
    imageUrl: "/images/hull_city_center.png",
  },
  {
    file: "07-annual-events-calendar.md",
    title: "Hull's Annual Events Calendar: Festivals and Celebrations",
    category: "Events & Culture",
    slug: "annual-events-calendar",
    readingTime: 7,
    featured: false,
    imageUrl: "/images/events/freedom-festival.png",
  },
  {
    file: "08-hull-arts-scene.md",
    title: "Hull's Vibrant Arts Scene: Galleries, Theatres, and Creative Spaces",
    category: "Events & Culture",
    slug: "hull-arts-scene",
    readingTime: 7,
    featured: false,
    imageUrl: "/images/ferens_art_gallery.png",
  },
  {
    file: "09-hull-fair-tradition.md",
    title: "Hull Fair: Europe's Largest Travelling Funfair",
    category: "Events & Culture",
    slug: "hull-fair-tradition",
    readingTime: 6,
    featured: false,
    imageUrl: "/images/hull_marina.png",
  },
  {
    file: "10-hull-neighborhoods-guide.md",
    title: "A Local's Guide to Hull's Best Neighborhoods",
    category: "Local Life",
    slug: "hull-neighborhoods-guide",
    readingTime: 7,
    featured: false,
    imageUrl: "/images/hull_old_town.png",
  },
  {
    file: "11-hidden-gems-locals-secrets.md",
    title: "Hidden Gems: Local Secrets and Off-the-Beaten-Path Hull",
    category: "Local Life",
    slug: "hidden-gems-locals-secrets",
    readingTime: 5,
    featured: false,
    imageUrl: "/images/hull_city_center.png",
  },
  {
    file: "12-living-like-local-hull.md",
    title: "Living Like a Local: How to Experience the Real Hull",
    category: "Local Life",
    slug: "living-like-local-hull",
    readingTime: 5,
    featured: false,
    imageUrl: "/images/hull_marina.png",
  },
  {
    file: "13-getting-around-hull.md",
    title: "Getting Around Hull: Transport and Parking Guide",
    category: "Travel Tips",
    slug: "getting-around-hull",
    readingTime: 5,
    featured: false,
    imageUrl: "/images/hull_city_center.png",
  },
  {
    file: "14-where-to-stay-hull.md",
    title: "Where to Stay in Hull: Accommodation Guide for Every Budget",
    category: "Travel Tips",
    slug: "where-to-stay-hull",
    readingTime: 5,
    featured: false,
    imageUrl: "/images/hull_marina.png",
  },
  {
    file: "15-planning-perfect-hull-visit.md",
    title: "Planning the Perfect Hull Visit: Itineraries and Insider Tips",
    category: "Travel Tips",
    slug: "planning-perfect-hull-visit",
    readingTime: 6,
    featured: false,
    imageUrl: "/images/the_deep.png",
  },
];

console.log("Starting blog posts import...");

// Clear existing blog posts
await db.delete(blogPosts);
console.log("Cleared existing blog posts");

const articlesDir = "/home/ubuntu/explorehull/blog-articles";

for (const article of articles) {
  const filePath = path.join(articlesDir, article.file);
  
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    
    // Extract excerpt from content (first paragraph after metadata)
    const lines = content.split("\n");
    let excerpt = "";
    let inMetadata = true;
    
    for (const line of lines) {
      if (line.startsWith("**Category:**") || line.startsWith("**Author:**") || line.startsWith("**Reading Time:**")) {
        continue;
      }
      if (line.trim() && !line.startsWith("#") && !inMetadata) {
        excerpt = line.trim();
        if (excerpt.length > 200) {
          excerpt = excerpt.substring(0, 200) + "...";
        }
        break;
      }
      if (line.startsWith("##")) {
        inMetadata = false;
      }
    }
    
    if (!excerpt) {
      excerpt = content.substring(0, 200).replace(/[#*]/g, "").trim() + "...";
    }
    
    await db.insert(blogPosts).values({
      title: article.title,
      slug: article.slug,
      content,
      excerpt,
      author: "ExploreHull Editorial Team",
      category: article.category,
      featuredImage: article.imageUrl,
      readingTime: article.readingTime,
      featured: article.featured,
      published: true,
      publishedAt: new Date(),
    });
    
    console.log(`✓ Imported: ${article.title}`);
  } catch (error) {
    console.error(`✗ Failed to import ${article.file}:`, error.message);
  }
}

console.log("\nBlog posts import completed!");
console.log(`Total articles imported: ${articles.length}`);

await connection.end();
