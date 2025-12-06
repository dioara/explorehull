import { drizzle } from "drizzle-orm/mysql2";
import { accommodations, restaurants } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function listNames() {
  const hotels = await db.select().from(accommodations).limit(20);
  const rests = await db.select().from(restaurants).limit(20);

  console.log("\n=== SAMPLE HOTEL NAMES ===");
  hotels.forEach((h, i) => console.log(`${i + 1}. ${h.name}`));

  console.log("\n=== SAMPLE RESTAURANT NAMES ===");
  rests.forEach((r, i) => console.log(`${i + 1}. ${r.name}`));
}

listNames().catch(console.error).finally(() => process.exit(0));
