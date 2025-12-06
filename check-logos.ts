import { drizzle } from "drizzle-orm/mysql2";
import { accommodations, restaurants, attractions } from "./drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function checkLogos() {
  const hotels = await db.select().from(accommodations);
  const rests = await db.select().from(restaurants);
  const attrs = await db.select().from(attractions);

  const hotelsWithoutLogos = hotels.filter(h => !h.logo);
  const restsWithoutLogos = rests.filter(r => !r.logo);
  const attrsWithoutImages = attrs.filter(a => !a.imageUrl || a.imageUrl.includes('placeholder'));

  console.log(`\nAccommodations: ${hotels.length} total, ${hotelsWithoutLogos.length} without logos`);
  console.log(`Restaurants: ${rests.length} total, ${restsWithoutLogos.length} without logos`);
  console.log(`Attractions: ${attrs.length} total, ${attrsWithoutImages.length} without proper images`);
  
  console.log(`\nSample accommodations needing logos:`);
  hotelsWithoutLogos.slice(0, 10).forEach(h => console.log(`- ${h.name}`));
  
  console.log(`\nSample restaurants needing logos:`);
  restsWithoutLogos.slice(0, 10).forEach(r => console.log(`- ${r.name}`));
}

checkLogos().catch(console.error);
