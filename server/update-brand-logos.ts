import { drizzle } from "drizzle-orm/mysql2";
import { accommodations, restaurants } from "../drizzle/schema";
import { eq, like, or, sql } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

// Map of brand keywords to logo filenames
const hotelBrands: Record<string, string> = {
  "premier inn": "/logos/premier-inn.png",
  "holiday inn": "/logos/holiday-inn.png",
  "travelodge": "/logos/travelodge.png",
  "ibis": "/logos/ibis.png",
  "best western": "/logos/best-western.jpg",
  "hilton": "/logos/hilton.png",
  "doubletree": "/logos/doubletree.png",
};

const restaurantBrands: Record<string, string> = {
  "mcdonald": "/logos/mcdonalds.png",
  "kfc": "/logos/kfc.png",
  "subway": "/logos/subway.png",
  "pizza hut": "/logos/pizza-hut.png",
  "nando": "/logos/nandos.png",
  "costa": "/logos/costa.png",
  "starbucks": "/logos/starbucks.png",
  "greggs": "/logos/greggs.jpg",
  "burger king": "/logos/burger-king.png",
  "1884 dock street": "/logos/1884-dock-street.jpg",
};

async function updateBrandLogos() {
  console.log("Updating brand logos in database...\n");

  // Update hotels
  const hotels = await db.select().from(accommodations);
  let hotelUpdates = 0;

  for (const hotel of hotels) {
    const nameLower = hotel.name.toLowerCase();
    let matched = false;

    for (const [brand, logoPath] of Object.entries(hotelBrands)) {
      if (nameLower.includes(brand)) {
        await db.update(accommodations)
          .set({ logo: logoPath })
          .where(eq(accommodations.id, hotel.id));
        console.log(`✓ Updated ${hotel.name} with ${logoPath}`);
        hotelUpdates++;
        matched = true;
        break;
      }
    }
  }

  console.log(`\nHotels: Updated ${hotelUpdates} out of ${hotels.length} listings\n`);

  // Update restaurants
  const rests = await db.select().from(restaurants);
  let restUpdates = 0;

  for (const rest of rests) {
    const nameLower = rest.name.toLowerCase();
    let matched = false;

    for (const [brand, logoPath] of Object.entries(restaurantBrands)) {
      if (nameLower.includes(brand)) {
        await db.update(restaurants)
          .set({ logo: logoPath })
          .where(eq(restaurants.id, rest.id));
        console.log(`✓ Updated ${rest.name} with ${logoPath}`);
        restUpdates++;
        matched = true;
        break;
      }
    }
  }

  console.log(`\nRestaurants: Updated ${restUpdates} out of ${rests.length} listings\n`);
  console.log(`Total: Updated ${hotelUpdates + restUpdates} logos`);
}

updateBrandLogos().catch(console.error).finally(() => process.exit(0));
