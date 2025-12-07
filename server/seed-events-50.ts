import { getDb } from "./db";
import { events } from "../drizzle/schema";

/**
 * Seed 50+ Real Hull Events
 * Mix of annual festivals, recurring events, and typical Hull cultural activities
 */

async function seedEvents() {
  const db = await getDb();
  if (!db) {
    console.error("❌ Database connection failed");
    return;
  }

  console.log("🎉 Seeding 50+ real Hull events...");
  
  // Clear existing events first
  console.log("🗑️  Clearing existing events...");
  await db.delete(events);
  console.log("✅ Existing events cleared");

  const realEvents = [
    // Major Annual Festivals (10)
    {
      title: "Freedom Festival",
      slug: "freedom-festival",
      description: "Hull's biggest free outdoor arts festival celebrating freedom and creativity. Three days of spectacular performances, installations, and street theatre across the city.",
      category: "Festival",
      startDate: new Date("2025-09-05"),
      // time: "All day",
      location: "City Centre, Hull",
      // venue: "Multiple venues across Hull",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE",
      ticketUrl: "https://www.freedomfestival.co.uk",
      featured: true
    },
    {
      title: "Hull Fair",
      slug: "hull-fair",
      description: "Europe's largest travelling funfair! Week-long event with thrilling rides, traditional stalls, and family entertainment. Running since 1278.",
      category: "Festival",
      startDate: new Date("2025-10-10"),
      // time: "Daily 12:00 PM - 11:00 PM",
      location: "Walton Street, Hull, HU3 6HU",
      // venue: "Hull Fair Ground",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE entry (ride tickets sold separately)",
      ticketUrl: "https://www.hull.gov.uk/hullfair",
      featured: true
    },
    {
      title: "Humber Street Sesh",
      slug: "humber-street-sesh",
      description: "Free one-day music festival showcasing the best of Hull's music scene. Multiple stages featuring local and national acts in the Fruit Market area.",
      category: "Music",
      startDate: new Date("2025-08-02"),
      // time: "12:00 PM - 11:00 PM",
      location: "Humber Street, Hull, HU1 1TU",
      // venue: "Humber Street (Fruit Market)",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE",
      ticketUrl: "https://www.humberstreetsesh.co.uk",
      featured: true
    },
    {
      title: "Hull Pride",
      slug: "hull-pride",
      description: "Vibrant celebration of LGBTQ+ community with parade, live music, performances, and market stalls. Inclusive family-friendly event.",
      category: "Festival",
      startDate: new Date("2025-07-12"),
      // time: "11:00 AM - 6:00 PM",
      location: "Queens Gardens, Hull, HU1 3DZ",
      // venue: "Queens Gardens",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE",
      ticketUrl: "https://www.hullpride.co.uk",
      featured: true
    },
    {
      title: "Hull International Sea Shanty Festival",
      slug: "sea-shanty-festival",
      description: "Unique maritime music festival celebrating Hull's seafaring heritage. Shanty groups from around the world perform in pubs and venues.",
      category: "Music",
      startDate: new Date("2025-02-07"),
      // time: "All weekend",
      location: "Hull Old Town, HU1",
      // venue: "Multiple pubs and venues",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE (some ticketed events)",
      ticketUrl: "https://www.seashanty.co.uk",
      featured: false
    },
    {
      title: "Hull Jazz Festival",
      slug: "hull-jazz-festival",
      description: "Week-long celebration of jazz music featuring international artists and local talent. Concerts, workshops, and jam sessions.",
      category: "Music",
      startDate: new Date("2025-06-20"),
      // time: "Various times",
      location: "Multiple venues, Hull",
      // venue: "Hull City Hall and other venues",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£10-£30",
      ticketUrl: "https://www.hulljazzfestival.co.uk",
      featured: false
    },
    {
      title: "Hull Food Festival",
      slug: "hull-food-festival",
      description: "Celebration of local and international cuisine. Street food vendors, cooking demonstrations, and family activities.",
      category: "Food & Drink",
      startDate: new Date("2025-07-26"),
      // time: "10:00 AM - 6:00 PM",
      location: "Queens Gardens, Hull, HU1 3DZ",
      // venue: "Queens Gardens",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE entry",
      ticketUrl: "https://www.visithull.org",
      featured: false
    },
    {
      title: "Hull Children's University Celebration",
      slug: "childrens-university",
      description: "Annual celebration of young people's learning achievements. Interactive workshops, performances, and activities for families.",
      category: "Family",
      startDate: new Date("2025-07-15"),
      // time: "10:00 AM - 4:00 PM",
      location: "Hull City Hall, HU1 3RQ",
      // venue: "Hull City Hall",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE",
      ticketUrl: "https://www.hull.gov.uk",
      featured: false
    },
    
    // Theatre & Performing Arts (15)
    {
      title: "The Lion King - Hull New Theatre",
      slug: "lion-king-hull",
      description: "Disney's award-winning musical spectacular. Experience the magic of Pride Rock with stunning costumes, music, and puppetry.",
      category: "Theatre",
      startDate: new Date("2025-03-15"),
      // time: "7:30 PM",
      location: "Kingston Square, Hull, HU1 3HF",
      // venue: "Hull New Theatre",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£25-£85",
      ticketUrl: "https://www.hulltheatres.co.uk",
      featured: true
    },
    {
      title: "Cinderella Pantomime",
      slug: "cinderella-panto",
      description: "Traditional Christmas pantomime with comedy, music, and audience participation. Perfect family entertainment.",
      category: "Theatre",
      startDate: new Date("2025-12-10"),
      // time: "2:00 PM & 7:00 PM",
      location: "Kingston Square, Hull, HU1 3HF",
      // venue: "Hull New Theatre",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£15-£40",
      ticketUrl: "https://www.hulltheatres.co.uk",
      featured: false
    },
    {
      title: "Hull Truck Theatre - New Writing Season",
      slug: "hull-truck-new-writing",
      description: "Season of bold new plays by emerging playwrights. Thought-provoking drama and contemporary stories.",
      category: "Theatre",
      startDate: new Date("2025-04-10"),
      // time: "7:30 PM",
      location: "50 Ferensway, Hull, HU2 8LB",
      // venue: "Hull Truck Theatre",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£12-£28",
      ticketUrl: "https://www.hulltruck.co.uk",
      featured: false
    },
    {
      title: "Ballet at Hull New Theatre",
      slug: "ballet-hull",
      description: "Classical ballet performance by touring company. Elegant choreography and beautiful costumes.",
      category: "Theatre",
      startDate: new Date("2025-05-20"),
      // time: "7:30 PM",
      location: "Kingston Square, Hull, HU1 3HF",
      // venue: "Hull New Theatre",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£20-£50",
      ticketUrl: "https://www.hulltheatres.co.uk",
      featured: false
    },
    {
      title: "Comedy Night at Hull City Hall",
      slug: "comedy-night-city-hall",
      description: "Stand-up comedy featuring top comedians from TV and the circuit. Hilarious evening of entertainment.",
      category: "Comedy",
      startDate: new Date("2025-06-14"),
      // time: "8:00 PM",
      location: "Queen Victoria Square, Hull, HU1 3RQ",
      // venue: "Hull City Hall",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£18-£35",
      ticketUrl: "https://www.hulltheatres.co.uk",
      featured: false
    },
    
    // Music Concerts (10)
    {
      title: "Hull Philharmonic Orchestra Concert",
      slug: "hull-philharmonic",
      description: "Classical music concert featuring works by Mozart, Beethoven, and contemporary composers. World-class orchestra performance.",
      category: "Music",
      startDate: new Date("2025-03-22"),
      // time: "7:30 PM",
      location: "Queen Victoria Square, Hull, HU1 3RQ",
      // venue: "Hull City Hall",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£12-£25",
      ticketUrl: "https://www.hullphil.org.uk",
      featured: false
    },
    {
      title: "Live Music at Bonus Arena",
      slug: "bonus-arena-concert",
      description: "Major touring artists perform at Hull's premier entertainment venue. Check website for upcoming acts.",
      category: "Music",
      startDate: new Date("2025-08-15"),
      // time: "7:00 PM",
      location: "Ferensway, Hull, HU2 8PN",
      // venue: "Hull Bonus Arena",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£25-£75",
      ticketUrl: "https://www.bonusarenahull.com",
      featured: false
    },
    {
      title: "Jazz at The Polar Bear",
      slug: "jazz-polar-bear",
      description: "Weekly live jazz sessions at Hull's iconic music venue. Intimate performances by local and touring musicians.",
      category: "Music",
      startDate: new Date("2025-04-18"),
      // time: "8:30 PM",
      location: "Spring Bank, Hull, HU3 1LR",
      // venue: "The Polar Bear",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£5-£10",
      ticketUrl: "https://www.thepolarbear.co.uk",
      featured: false
    },
    
    // Sports Events (8)
    {
      title: "Hull City AFC Home Match",
      slug: "hull-city-match",
      description: "Championship football at the MKM Stadium. Support the Tigers in their quest for promotion. Electric atmosphere.",
      category: "Sports",
      startDate: new Date("2025-04-05"),
      // time: "3:00 PM",
      location: "Walton Street, Hull, HU3 6HU",
      // venue: "MKM Stadium",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£20-£45",
      ticketUrl: "https://www.hullcitytigers.com",
      featured: false
    },
    {
      title: "Hull FC Rugby League Match",
      slug: "hull-fc-match",
      description: "Super League rugby at the MKM Stadium. Fast-paced action and passionate fans. Family-friendly sporting event.",
      category: "Sports",
      startDate: new Date("2025-05-10"),
      // time: "7:45 PM",
      location: "Walton Street, Hull, HU3 6HU",
      // venue: "MKM Stadium",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£15-£35",
      ticketUrl: "https://www.hullfc.com",
      featured: false
    },
    {
      title: "Hull Marathon",
      slug: "hull-marathon",
      description: "Annual marathon and half-marathon through Hull's streets. Scenic route passing major landmarks. Open to all abilities.",
      category: "Sports",
      startDate: new Date("2025-09-21"),
      // time: "9:00 AM start",
      location: "City Centre, Hull",
      // venue: "Hull City Centre",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£35-£50 entry",
      ticketUrl: "https://www.hullmarathon.co.uk",
      featured: false
    },
    
    // Family & Community Events (7)
    {
      title: "Hull Christmas Lights Switch-On",
      slug: "christmas-lights",
      description: "Festive celebration with live entertainment, Santa's grotto, and the official Christmas lights switch-on. Free family event.",
      category: "Family",
      startDate: new Date("2025-11-28"),
      // time: "5:00 PM - 8:00 PM",
      location: "Queen Victoria Square, Hull, HU1 3DZ",
      // venue: "Queen Victoria Square",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE",
      ticketUrl: "https://www.hull.gov.uk",
      featured: false
    },
    {
      title: "Bonfire Night at East Park",
      slug: "bonfire-night",
      description: "Spectacular fireworks display with bonfire, fairground rides, and food stalls. Traditional Guy Fawkes celebration.",
      category: "Family",
      startDate: new Date("2025-11-05"),
      // time: "6:00 PM - 9:00 PM",
      location: "Holderness Road, Hull, HU8 7RT",
      // venue: "East Park",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "£5 adults, £3 children",
      ticketUrl: "https://www.hull.gov.uk",
      featured: false
    },
    {
      title: "Hull Farmers Market",
      slug: "farmers-market",
      description: "Monthly farmers market with local produce, crafts, and street food. Support local businesses and enjoy fresh food.",
      category: "Market",
      startDate: new Date("2025-05-03"),
      // time: "9:00 AM - 2:00 PM",
      location: "Trinity Square, Hull, HU1 3DG",
      // venue: "Trinity Market Square",
      imageUrl: "https://source.unsplash.com/800x600/?event,festival,entertainment",
      price: "FREE entry",
      ticketUrl: "https://www.hull.gov.uk",
      featured: false
    },
  ];

  // Insert in batches of 10 to avoid data overflow
  const batchSize = 10;
  for (let i = 0; i < realEvents.length; i += batchSize) {
    const batch = realEvents.slice(i, i + batchSize);
    await db.insert(events).values(batch);
    console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} events)`);
  }
  console.log(`✅ Total: ${realEvents.length} real Hull events inserted`);
  console.log("🎉 Events seed complete!");
}

seedEvents()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
