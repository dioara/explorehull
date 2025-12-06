import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { accommodations, restaurants } from "../drizzle/schema";

async function updateLogos() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  console.log("Updating hotel and restaurant logos...\n");

  // Hotel logos mapping
  const hotelLogos: Record<string, string> = {
    "premier-inn-hull-city-centre": "/logos/premier-inn.png",
    "doubletree-by-hilton-hull": "/logos/doubletree.png",
    "holiday-inn-express-hull-city-centre": "/logos/premier-inn.png", // Use generic for now
    "ibis-hull-city-centre": "/logos/premier-inn.png", // Use generic for now
  };

  // Restaurant logos mapping
  const restaurantLogos: Record<string, string> = {
    "1884-dock-street-kitchen": "/logos/1884-dock-street.jpg",
  };

  // Update accommodations
  for (const [slug, logo] of Object.entries(hotelLogos)) {
    try {
      await db
        .update(accommodations)
        .set({ logo })
        .where(eq(accommodations.slug, slug));
      console.log(`✓ Updated logo for accommodation: ${slug}`);
    } catch (error) {
      console.log(`✗ Failed to update ${slug}:`, error);
    }
  }

  // Update restaurants
  for (const [slug, logo] of Object.entries(restaurantLogos)) {
    try {
      await db
        .update(restaurants)
        .set({ logo })
        .where(eq(restaurants.slug, slug));
      console.log(`✓ Updated logo for restaurant: ${slug}`);
    } catch (error) {
      console.log(`✗ Failed to update ${slug}:`, error);
    }
  }

  console.log("\n✅ Logo update complete!");
  process.exit(0);
}

updateLogos().catch((error) => {
  console.error("Error updating logos:", error);
  process.exit(1);
});
