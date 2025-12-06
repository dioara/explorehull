import { drizzle } from "drizzle-orm/mysql2";
import { accommodations, restaurants, attractions } from "../drizzle/schema";
import { eq, like, or } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

// Major hotel chain logos (using public CDN URLs or placeholder paths)
const hotelLogos: Record<string, string> = {
  "premier inn": "/logos/premier-inn.png",
  "holiday inn": "/logos/holiday-inn.png",
  "travelodge": "/logos/travelodge.png",
  "ibis": "/logos/ibis.png",
  "doubletree": "/logos/doubletree.png",
  "hilton": "/logos/hilton.png",
  "mercure": "/logos/mercure.png",
  "novotel": "/logos/novotel.png",
  "best western": "/logos/best-western.png",
  "marriott": "/logos/marriott.png",
  "radisson": "/logos/radisson.png",
  "crowne plaza": "/logos/crowne-plaza.png",
};

// Major restaurant chain logos
const restaurantLogos: Record<string, string> = {
  "mcdonald": "/logos/mcdonalds.png",
  "kfc": "/logos/kfc.png",
  "subway": "/logos/subway.png",
  "pizza hut": "/logos/pizza-hut.png",
  "domino": "/logos/dominos.png",
  "nando": "/logos/nandos.png",
  "costa": "/logos/costa.png",
  "starbucks": "/logos/starbucks.png",
  "greggs": "/logos/greggs.png",
  "wetherspoon": "/logos/wetherspoons.png",
  "prezzo": "/logos/prezzo.png",
  "zizzi": "/logos/zizzi.png",
  "ask italian": "/logos/ask-italian.png",
  "pizza express": "/logos/pizza-express.png",
  "wagamama": "/logos/wagamama.png",
  "yo! sushi": "/logos/yo-sushi.png",
  "five guys": "/logos/five-guys.png",
  "burger king": "/logos/burger-king.png",
  "tgi friday": "/logos/tgi-fridays.png",
  "frankie & benny": "/logos/frankie-bennys.png",
};

async function updateLogos() {
  console.log("Starting logo update for all listings...\n");

  // Update accommodations
  const hotels = await db.select().from(accommodations);
  console.log(`Found ${hotels.length} accommodations`);
  
  let hotelUpdates = 0;
  for (const hotel of hotels) {
    if (hotel.logo) continue; // Skip if already has logo
    
    const nameLower = hotel.name.toLowerCase();
    let logoUrl: string | null = null;
    
    // Check if it matches any major chain
    for (const [chain, logo] of Object.entries(hotelLogos)) {
      if (nameLower.includes(chain)) {
        logoUrl = logo;
        break;
      }
    }
    
    // If no match, use a generic hotel logo placeholder
    if (!logoUrl) {
      logoUrl = `/logos/hotel-generic.png`;
    }
    
    await db.update(accommodations)
      .set({ logo: logoUrl })
      .where(eq(accommodations.id, hotel.id));
    
    hotelUpdates++;
  }
  console.log(`Updated ${hotelUpdates} accommodation logos\n`);

  // Update restaurants
  const rests = await db.select().from(restaurants);
  console.log(`Found ${rests.length} restaurants`);
  
  let restUpdates = 0;
  for (const rest of rests) {
    if (rest.logo) continue; // Skip if already has logo
    
    const nameLower = rest.name.toLowerCase();
    let logoUrl: string | null = null;
    
    // Check if it matches any major chain
    for (const [chain, logo] of Object.entries(restaurantLogos)) {
      if (nameLower.includes(chain)) {
        logoUrl = logo;
        break;
      }
    }
    
    // If no match, use a generic restaurant logo placeholder
    if (!logoUrl) {
      logoUrl = `/logos/restaurant-generic.png`;
    }
    
    await db.update(restaurants)
      .set({ logo: logoUrl })
      .where(eq(restaurants.id, rest.id));
    
    restUpdates++;
  }
  console.log(`Updated ${restUpdates} restaurant logos\n`);

  // Update attractions (ensure all have images)
  const attrs = await db.select().from(attractions);
  console.log(`Found ${attrs.length} attractions`);
  
  let attrUpdates = 0;
  for (const attr of attrs) {
    if (attr.imageUrl && !attr.imageUrl.includes('placeholder')) continue;
    
    // Use a generic attraction image based on category
    let imageUrl = `/images/attraction-generic.png`;
    
    if (attr.category) {
      const catLower = attr.category.toLowerCase();
      if (catLower.includes('museum')) imageUrl = `/images/museum-generic.png`;
      else if (catLower.includes('park')) imageUrl = `/images/park-generic.png`;
      else if (catLower.includes('historic')) imageUrl = `/images/historic-generic.png`;
      else if (catLower.includes('entertainment')) imageUrl = `/images/entertainment-generic.png`;
    }
    
    await db.update(attractions)
      .set({ imageUrl })
      .where(eq(attractions.id, attr.id));
    
    attrUpdates++;
  }
  console.log(`Updated ${attrUpdates} attraction images\n`);

  console.log("Logo update complete!");
  console.log(`Total updates: ${hotelUpdates + restUpdates + attrUpdates}`);
}

updateLogos().catch(console.error).finally(() => process.exit(0));
