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
  InsertNewsletterSubscription,
  contactSubmissions,
  InsertContactSubmission,
  partnerListings,
  InsertPartnerListing,
  advertisingInquiries,
  InsertAdvertisingInquiry,
  partnershipInquiries,
  InsertPartnershipInquiry,
  reviews,
  InsertReview,
  itineraryItems,
  InsertItineraryItem
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
  // Order by: start date ascending (closest events first)
  return db.select().from(events).orderBy(events.startDate);
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
  // Order by start date descending (latest/upcoming first)
  return db.select().from(events).where(eq(events.category, category)).orderBy(desc(events.startDate));
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

// ===== Contact Submissions =====

export async function saveContactSubmission(data: Omit<InsertContactSubmission, 'id' | 'submittedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.insert(contactSubmissions).values(data);
    return { success: true };
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    throw error;
  }
}

// ===== Partner Submissions =====

export async function getAllPartnerListings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partnerListings).orderBy(desc(partnerListings.submittedAt));
}

export async function getAllAdvertisingInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(advertisingInquiries).orderBy(desc(advertisingInquiries.submittedAt));
}

export async function getAllPartnershipInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partnershipInquiries).orderBy(desc(partnershipInquiries.submittedAt));
}

export async function getAllContactSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.submittedAt));
}

export async function savePartnerListing(data: Omit<InsertPartnerListing, 'id' | 'submittedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.insert(partnerListings).values(data);
    return { success: true };
  } catch (error) {
    console.error("Failed to save partner listing:", error);
    throw error;
  }
}

export async function saveAdvertisingInquiry(data: Omit<InsertAdvertisingInquiry, 'id' | 'submittedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.insert(advertisingInquiries).values(data);
    return { success: true };
  } catch (error) {
    console.error("Failed to save advertising inquiry:", error);
    throw error;
  }
}

export async function savePartnershipInquiry(data: Omit<InsertPartnershipInquiry, 'id' | 'submittedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    await db.insert(partnershipInquiries).values(data);
    return { success: true };
  } catch (error) {
    console.error("Failed to save partnership inquiry:", error);
    throw error;
  }
}

// ===== Search =====

export async function searchContent(query: string) {
  const db = await getDb();
  if (!db) return { attractions: [], events: [], restaurants: [], accommodations: [], blogPosts: [] };
  
  const searchPattern = `%${query}%`;
  
  const [attractionResults, eventResults, restaurantResults, accommodationResults, blogResults] = await Promise.all([
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
    db.select().from(accommodations).where(
      or(
        like(accommodations.name, searchPattern),
        like(accommodations.description, searchPattern)
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
    accommodations: accommodationResults,
    blogPosts: blogResults,
  };
}


// ===== Reviews =====

export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const [result] = await db.insert(reviews).values(review);
  return result;
}

export async function getReviewsByItem(itemType: string, itemId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(reviews)
    .where(and(
      eq(reviews.itemType, itemType),
      eq(reviews.itemId, itemId)
    ))
    .orderBy(desc(reviews.createdAt));
}

export async function getAverageRating(itemType: string, itemId: number) {
  const db = await getDb();
  if (!db) return { average: 0, count: 0 };
  
  const reviewList = await db.select().from(reviews)
    .where(and(
      eq(reviews.itemType, itemType),
      eq(reviews.itemId, itemId)
    ));
  
  if (reviewList.length === 0) return { average: 0, count: 0 };
  
  const sum = reviewList.reduce((acc, review) => acc + review.rating, 0);
  const average = sum / reviewList.length;
  
  return { average: Math.round(average * 10) / 10, count: reviewList.length };
}


// ===== Itinerary =====

export async function addToItinerary(item: InsertItineraryItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if item already exists
  const existing = await db.select().from(itineraryItems)
    .where(and(
      eq(itineraryItems.userId, item.userId),
      eq(itineraryItems.itemType, item.itemType),
      eq(itineraryItems.itemId, item.itemId)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    return existing[0];
  }
  
  const [result] = await db.insert(itineraryItems).values(item);
  return result;
}

export async function removeFromItinerary(userId: number, itemType: string, itemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(itineraryItems)
    .where(and(
      eq(itineraryItems.userId, userId),
      eq(itineraryItems.itemType, itemType),
      eq(itineraryItems.itemId, itemId)
    ));
  
  return { success: true };
}

export async function getUserItinerary(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const items = await db.select().from(itineraryItems)
    .where(eq(itineraryItems.userId, userId))
    .orderBy(desc(itineraryItems.createdAt));
  
  // Fetch full details for each item
  const detailedItems = await Promise.all(
    items.map(async (item) => {
      let details = null;
      if (item.itemType === 'attraction') {
        const [attraction] = await db.select().from(attractions).where(eq(attractions.id, item.itemId)).limit(1);
        details = attraction;
      } else if (item.itemType === 'restaurant') {
        const [restaurant] = await db.select().from(restaurants).where(eq(restaurants.id, item.itemId)).limit(1);
        details = restaurant;
      } else if (item.itemType === 'accommodation') {
        const [accommodation] = await db.select().from(accommodations).where(eq(accommodations.id, item.itemId)).limit(1);
        details = accommodation;
      }
      
      return {
        ...item,
        details,
      };
    })
  );
  
  return detailedItems;
}

export async function isInItinerary(userId: number, itemType: string, itemId: number) {
  const db = await getDb();
  if (!db) return false;
  
  const result = await db.select().from(itineraryItems)
    .where(and(
      eq(itineraryItems.userId, userId),
      eq(itineraryItems.itemType, itemType),
      eq(itineraryItems.itemId, itemId)
    ))
    .limit(1);
  
  return result.length > 0;
}
