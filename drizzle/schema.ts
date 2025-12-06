import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Attractions table - museums, galleries, landmarks, etc.
 */
export const attractions = mysqlTable("attractions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "Museums", "Arts & Culture", "Family Friendly"
  address: text("address"),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  imageUrl: text("imageUrl"),
  openingHours: text("openingHours"),
  pricing: text("pricing"),
  website: varchar("website", { length: 500 }),
  phone: varchar("phone", { length: 50 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Attraction = typeof attractions.$inferSelect;
export type InsertAttraction = typeof attractions.$inferInsert;

/**
 * Events table - festivals, exhibitions, shows, etc.
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "Festival", "Exhibition", "Theatre"
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  location: text("location"),
  imageUrl: text("imageUrl"),
  ticketUrl: varchar("ticketUrl", { length: 500 }),
  price: varchar("price", { length: 100 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

/**
 * Restaurants table - dining establishments
 */
export const restaurants = mysqlTable("restaurants", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  cuisine: varchar("cuisine", { length: 100 }).notNull(), // e.g., "British", "Italian", "Asian"
  address: text("address"),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  priceRange: varchar("priceRange", { length: 20 }), // e.g., "£", "££", "£££"
  imageUrl: text("imageUrl"),
  logo: text("logo"),
  website: varchar("website", { length: 500 }),
  phone: varchar("phone", { length: 50 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Restaurant = typeof restaurants.$inferSelect;
export type InsertRestaurant = typeof restaurants.$inferInsert;

/**
 * Accommodations table - hotels, B&Bs, etc.
 */
export const accommodations = mysqlTable("accommodations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  type: varchar("type", { length: 100 }).notNull(), // e.g., "Hotel", "B&B", "Apartment"
  address: text("address"),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  priceRange: varchar("priceRange", { length: 20 }),
  imageUrl: text("imageUrl"),
  logo: text("logo"),
  bookingUrl: varchar("bookingUrl", { length: 500 }),
  phone: varchar("phone", { length: 50 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Accommodation = typeof accommodations.$inferSelect;
export type InsertAccommodation = typeof accommodations.$inferInsert;

/**
 * Tours table - guided tours and experiences
 */
export const tours = mysqlTable("tours", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  duration: varchar("duration", { length: 100 }), // e.g., "2 hours", "Half day"
  price: varchar("price", { length: 100 }),
  imageUrl: text("imageUrl"),
  bookingUrl: varchar("bookingUrl", { length: 500 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Tour = typeof tours.$inferSelect;
export type InsertTour = typeof tours.$inferInsert;

/**
 * Blog posts table - articles and guides
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  author: varchar("author", { length: 100 }),
  category: varchar("category", { length: 100 }),
  featuredImage: text("featuredImage"),
  featured: boolean("featured").default(false),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Newsletter subscriptions table
 */
export const newsletterSubscriptions = mysqlTable("newsletter_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
});

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;

/**
 * Contact submissions table
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Partner listing submissions table
 */
export const partnerListings = mysqlTable("partner_listings", {
  id: int("id").autoincrement().primaryKey(),
  businessName: varchar("business_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  listingType: varchar("listing_type", { length: 100 }).notNull(),
  businessDescription: text("business_description").notNull(),
  website: varchar("website", { length: 500 }).notNull(),
  address: text("address").notNull(),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type PartnerListing = typeof partnerListings.$inferSelect;
export type InsertPartnerListing = typeof partnerListings.$inferInsert;

/**
 * Advertising inquiries table
 */
export const advertisingInquiries = mysqlTable("advertising_inquiries", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  adType: varchar("ad_type", { length: 100 }).notNull(),
  budget: varchar("budget", { length: 100 }).notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type AdvertisingInquiry = typeof advertisingInquiries.$inferSelect;
export type InsertAdvertisingInquiry = typeof advertisingInquiries.$inferInsert;

/**
 * Partnership inquiries table
 */
export const partnershipInquiries = mysqlTable("partnership_inquiries", {
  id: int("id").autoincrement().primaryKey(),
  organizationName: varchar("organization_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  partnershipType: varchar("partnership_type", { length: 100 }).notNull(),
  proposal: text("proposal").notNull(),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type PartnershipInquiry = typeof partnershipInquiries.$inferSelect;
export type InsertPartnershipInquiry = typeof partnershipInquiries.$inferInsert;

/**
 * Reviews table - user reviews for attractions, restaurants, and accommodations
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  itemType: varchar("item_type", { length: 50 }).notNull(), // 'attraction', 'restaurant', 'accommodation'
  itemId: int("item_id").notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  userName: varchar("user_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Itinerary table - user saved items for trip planning
 */
export const itineraryItems = mysqlTable("itinerary_items", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  itemType: varchar("item_type", { length: 50 }).notNull(), // 'attraction', 'restaurant', 'accommodation'
  itemId: int("item_id").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ItineraryItem = typeof itineraryItems.$inferSelect;
export type InsertItineraryItem = typeof itineraryItems.$inferInsert;
