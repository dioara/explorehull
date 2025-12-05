import { eq, and, gte, lte, desc, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  attractions, 
  InsertAttraction,
  events,
  InsertEvent,
  restaurants,
  InsertRestaurant,
  accommodations,
  InsertAccommodation,
  tours,
  InsertTour,
  blogPosts,
  InsertBlogPost,
  newsletterSubscriptions,
  InsertNewsletterSubscription
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ===== User Management =====

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ===== Attractions =====

export async function getAllAttractions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(attractions).orderBy(desc(attractions.featured), attractions.name);
}

export async function getFeaturedAttractions(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(attractions).where(eq(attractions.featured, true)).limit(limit);
}

export async function getAttractionBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(attractions).where(eq(attractions.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAttractionsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(attractions).where(eq(attractions.category, category)).orderBy(attractions.name);
}

export async function createAttraction(attraction: InsertAttraction) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(attractions).values(attraction);
}

// ===== Events =====

export async function getAllEvents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).orderBy(desc(events.featured), events.startDate);
}

export async function getUpcomingEvents(limit?: number) {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  const query = db.select().from(events).where(gte(events.startDate, now)).orderBy(events.startDate);
  return limit ? query.limit(limit) : query;
}

export async function getFeaturedEvents(limit: number = 4) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).where(eq(events.featured, true)).limit(limit);
}

export async function getEventBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(events).where(eq(events.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getEventsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(events).where(eq(events.category, category)).orderBy(events.startDate);
}

export async function createEvent(event: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(events).values(event);
}

// ===== Restaurants =====

export async function getAllRestaurants() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(restaurants).orderBy(desc(restaurants.featured), restaurants.name);
}

export async function getFeaturedRestaurants(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(restaurants).where(eq(restaurants.featured, true)).limit(limit);
}

export async function getRestaurantBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(restaurants).where(eq(restaurants.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getRestaurantsByCuisine(cuisine: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(restaurants).where(eq(restaurants.cuisine, cuisine)).orderBy(restaurants.name);
}

export async function createRestaurant(restaurant: InsertRestaurant) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(restaurants).values(restaurant);
}

// ===== Accommodations =====

export async function getAllAccommodations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(accommodations).orderBy(desc(accommodations.featured), accommodations.name);
}

export async function getFeaturedAccommodations(limit: number = 4) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(accommodations).where(eq(accommodations.featured, true)).limit(limit);
}

export async function getAccommodationBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(accommodations).where(eq(accommodations.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createAccommodation(accommodation: InsertAccommodation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(accommodations).values(accommodation);
}

// ===== Tours =====

export async function getAllTours() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tours).orderBy(desc(tours.featured), tours.name);
}

export async function getFeaturedTours(limit: number = 4) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tours).where(eq(tours.featured, true)).limit(limit);
}

export async function getTourBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tours).where(eq(tours.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTour(tour: InsertTour) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(tours).values(tour);
}

// ===== Blog Posts =====

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getFeaturedBlogPosts(limit: number = 3) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).where(eq(blogPosts.featured, true)).limit(limit);
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(post);
}

// ===== Newsletter =====

export async function subscribeToNewsletter(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.insert(newsletterSubscriptions).values({ email });
    return { success: true };
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, error: 'Email already subscribed' };
    }
    throw error;
  }
}

// ===== Search =====

export async function searchContent(query: string) {
  const db = await getDb();
  if (!db) return { attractions: [], events: [], restaurants: [], blogPosts: [] };
  
  const searchPattern = `%${query}%`;
  
  const [attractionResults, eventResults, restaurantResults, blogResults] = await Promise.all([
    db.select().from(attractions).where(
      or(
        like(attractions.name, searchPattern),
        like(attractions.description, searchPattern)
      )
    ).limit(5),
    db.select().from(events).where(
      or(
        like(events.title, searchPattern),
        like(events.description, searchPattern)
      )
    ).limit(5),
    db.select().from(restaurants).where(
      or(
        like(restaurants.name, searchPattern),
        like(restaurants.description, searchPattern)
      )
    ).limit(5),
    db.select().from(blogPosts).where(
      or(
        like(blogPosts.title, searchPattern),
        like(blogPosts.content, searchPattern)
      )
    ).limit(5),
  ]);
  
  return {
    attractions: attractionResults,
    events: eventResults,
    restaurants: restaurantResults,
    blogPosts: blogResults,
  };
}
