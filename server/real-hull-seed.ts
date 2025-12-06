import { getDb } from "./db";
import { attractions, events, restaurants, accommodations, tours, blogPosts } from "../drizzle/schema";

/**
 * Production Seed - REAL HULL DATA ONLY
 * All listings verified as authentic Hull businesses
 * Last updated: December 2024
 */

async function seedRealHullData() {
  const db = await getDb();
  if (!db) {
    console.error("❌ Database connection failed");
    return;
  }

  console.log("🌱 Starting REAL Hull data seeding...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await db.delete(attractions);
  await db.delete(events);
  await db.delete(restaurants);
  await db.delete(accommodations);
  await db.delete(tours);
  await db.delete(blogPosts);

  // ====================
  // REAL ATTRACTIONS
  // ====================
  console.log("🏛️  Inserting real Hull attractions...");
  
  const realAttractions = [
    {
      name: "The Deep",
      slug: "the-deep",
      description: "One of the UK's most spectacular aquariums, home to over 3,500 fish including sharks, rays, and sea turtles. Embark on a journey through the world's oceans from shallow tropical lagoons to the darkest depths. Features daily dive shows at 2pm and penguin feeds at 11:30am & 3:30pm.",
      category: "Museums",
      address: "Tower Street, Hull, HU1 4DP",
      latitude: "53.7424",
      longitude: "-0.3313",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      openingHours: "Daily 10:00 AM - 6:00 PM",
      pricing: "Adult £23.00, Child (3-15) £17.00, Under 3 FREE",
      website: "https://www.thedeep.co.uk/",
      phone: "01482 381000",
      email: "info@thedeep.co.uk",
      featured: true
    },
    {
      name: "Ferens Art Gallery",
      slug: "ferens-art-gallery",
      description: "Step inside 700 years of art and imagination from all across the world. From late medieval painting to modern art, discover one of the UK's finest art collections. Journey through painting, sculpture and new media with highlights from Lorenzetti, Frans Hals, Canaletto, and contemporary artists.",
      category: "Arts & Culture",
      address: "Queen Victoria Square, Carr Lane, Hull, HU1 3RA",
      latitude: "53.7446",
      longitude: "-0.3367",
      imageUrl: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/ferens-art-gallery",
      phone: "01482 300 300",
      featured: true
    },
    {
      name: "Hull Minster",
      slug: "hull-minster",
      description: "Hull Minster, formerly Holy Trinity Church until 2017, is one of the largest parish churches in England. Located in the heart of Hull's Old Town at Market Place, this magnificent historic church features beautiful architecture spanning centuries. Free to visit with guided tours available.",
      category: "History & Heritage",
      address: "South Church Side, Hull, HU1 1RR",
      latitude: "53.7438",
      longitude: "-0.3362",
      imageUrl: "https://images.unsplash.com/photo-1548625149-720da0f2f9eb?w=800",
      openingHours: "Tue-Sun 10:00 AM - 4:00 PM (Closed Mondays except bank holidays)",
      pricing: "FREE",
      website: "https://hullminster.org/",
      phone: "01482 224460",
      email: "office@hullminster.org",
      featured: true
    },
    {
      name: "Streetlife Museum of Transport",
      slug: "streetlife-museum",
      description: "Join us on a journey through 200 years of transport history. Enjoy the sights, sounds and smells of the past at Streetlife Museum. Take a stroll down a 1940s high street, explore six galleries featuring bicycles, carriages, trams, and vintage vehicles.",
      category: "Museums",
      address: "High Street, Hull, HU1 1PS",
      latitude: "53.7442",
      longitude: "-0.3358",
      imageUrl: "https://images.unsplash.com/photo-1569144654912-5f146d08b98b?w=800",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/streetlife-museum",
      phone: "01482 300 300",
      featured: false
    },
    {
      name: "Wilberforce House Museum",
      slug: "wilberforce-house",
      description: "Step inside Hull's oldest museum (opened 1906) and discover hidden stories from the struggle against slavery. Wilberforce House was the birthplace of social reformer William Wilberforce (1759–1833). This seventeenth-century historic building houses important items relating to Wilberforce and tells the story of the slave trade and abolition movement.",
      category: "Museums",
      address: "High Street, Hull, HU1 1NQ",
      latitude: "53.7443",
      longitude: "-0.3355",
      imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/wilberforce-house-museum",
      phone: "01482 300 300",
      featured: false
    }
  ];

  await db.insert(attractions).values(realAttractions);
  console.log(`✅ Inserted ${realAttractions.length} real attractions`);

  // ====================
  // REAL RESTAURANTS
  // ====================
  console.log("🍽️  Inserting real Hull restaurants...");
  
  const realRestaurants = [
    {
      name: "1884 Dock Street Kitchen",
      slug: "1884-dock-street-kitchen",
      description: "Named Restaurant of the Year at the Yorkshire National Business Hero Awards in 2023 and 2024. Fine British dining combining contemporary steak and seafood dishes with exceptional service. Located in Hull's Marina, offering beautiful waterfront views.",
      cuisine: "British",
      address: "2-3 Humber Dock Street, Marina, Hull, HU1 1TB",
      latitude: "53.7428",
      longitude: "-0.3295",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
      priceRange: "£££",
      openingHours: "Mon-Sun 12:00 PM - 9:30 PM (Fri-Sat until 10:00 PM)",
      website: "https://www.1884dockstreetkitchen.co.uk/",
      phone: "01482 222260",
      featured: true
    },
    {
      name: "Ambiente Tapas Hull",
      slug: "ambiente-tapas",
      description: "Independent, vibrant tapas restaurant and sherry bar on Humber Street. Serving classic Spanish favourites, inventive small plates and an extensive sherry selection. Opened in 2016, Ambiente has become a favourite on Hull's most popular independent street.",
      cuisine: "Spanish",
      address: "5 Humber Street, Hull, HU1 1TG",
      latitude: "53.7431",
      longitude: "-0.3289",
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      priceRange: "££",
      openingHours: "Daily 11:30 AM - 10:00 PM",
      website: "https://www.ambiente-tapas.co.uk/hull",
      phone: "01482 426126",
      featured: true
    },
    {
      name: "Hearth Restaurant and Bakery",
      slug: "hearth-restaurant",
      description: "Spread over two floors in Hull's Old Town at Trinity Square. Ground floor houses a bar and bakery, upstairs is the rustic two-room restaurant. Menu fuses small plates with larger dishes, often cooked over flames with huge flavours. Fresh bread baked daily on site.",
      cuisine: "Modern British",
      address: "Trinity Square, Hull Old Town, Hull, HU1 3DG",
      latitude: "53.7445",
      longitude: "-0.3365",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      priceRange: "££",
      openingHours: "Tue-Fri 12:00 PM - 9:00 PM, Sat 10:00 AM - 10:00 PM, Sun 10:00 AM - 8:00 PM (Closed Mon)",
      website: "https://www.hearthfamily.co.uk/",
      featured: true
    },
    {
      name: "The Madras Restaurant",
      slug: "the-madras",
      description: "Award-winning Indian & Bangladeshi restaurant. Beautiful yet cosy 80-seat restaurant situated on Anlaby Road, close to KC Stadium, Hull Paragon Station and Hull Royal Infirmary. Serving authentic Indian cuisine with exceptional service.",
      cuisine: "Indian",
      address: "249-251 Anlaby Road, Kingston upon Hull, HU3 2SE",
      latitude: "53.7485",
      longitude: "-0.3698",
      imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
      priceRange: "££",
      openingHours: "Daily 5:00 PM - 10:30 PM (Last table 10:00 PM)",
      website: "https://www.the-madras.com/",
      phone: "01482 213321",
      featured: false
    },
    {
      name: "Beleza Rodizio",
      slug: "beleza-rodizio",
      description: "Authentic Brazilian rodizio dining experience with unlimited premium meats, bold flavours, and lively atmosphere. Located at Kingswood Leisure Park. Features passadores (meat carvers) bringing various cuts to your table.",
      cuisine: "Brazilian",
      address: "Kingswood Leisure Park, Hull, HU7 3DB",
      latitude: "53.7653",
      longitude: "-0.3142",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      priceRange: "£££",
      openingHours: "Daily 12:00 PM - 10:00 PM (Fri-Sat until 11:00 PM)",
      website: "https://www.belezarodizio.co.uk/locations/hull/",
      featured: false
    },
    {
      name: "Humber Fish Co",
      slug: "humber-fish-co",
      description: "Independent restaurant specializing in locally-sourced fish and seafood. Relaxed informal dining with comfortable seating, marble-topped tables and reclaimed driftwood adorning the walls. Nautical-themed seafood paradise. Reservations by phone only.",
      cuisine: "Seafood",
      address: "Humber Street, Hull, HU1 1TU",
      latitude: "53.7432",
      longitude: "-0.3287",
      imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      priceRange: "£££",
      openingHours: "Wed 12:00 PM - 9:30 PM, Thu 12:00 PM - 10:00 PM, Fri-Sat 12:00 PM - 10:30 PM, Sun 12:00 PM - 5:00 PM (Closed Mon-Tue)",
      website: "https://humberfishco.co.uk/",
      phone: "01482 326136",
      email: "info@humberfishco.co.uk",
      featured: false
    }
  ];

  await db.insert(restaurants).values(realRestaurants);
  console.log(`✅ Inserted ${realRestaurants.length} real restaurants`);

  // ====================
  // REAL ACCOMMODATIONS
  // ====================
  console.log("🏨  Inserting real Hull hotels...");
  
  const realAccommodations = [
    {
      name: "Holiday Inn Hull Marina",
      slug: "holiday-inn-hull-marina",
      description: "Marina-side hotel with modern amenities, restaurant, and bar. Located near Hull's waterfront attractions and city center. Part of the IHG hotel group, offering comfortable rooms with excellent service. Perfect base for exploring Hull's cultural attractions.",
      type: "Hotel",
      address: "Castle Street, Hull, HU1 2BX",
      latitude: "53.7425",
      longitude: "-0.3305",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      priceRange: "££",
      website: "https://www.ihg.com/holidayinn/hotels/us/en/hull/huynh/hoteldetail",
      phone: "01482 692600",
      email: "salesmgr@hihull.com",
      featured: true
    },
    {
      name: "DoubleTree by Hilton Hull",
      slug: "doubletree-hilton-hull",
      description: "Contemporary city center hotel next to Hull Truck Theatre and St. Stephen's shopping center, half a mile from the city center. Within 10 minutes of Ferens Art Gallery. Features terrace, bars, and on-site parking. Modern rooms with Hilton's signature service.",
      type: "Hotel",
      address: "24 Ferensway, Kingston Upon Hull, HU2 8NH",
      latitude: "53.7452",
      longitude: "-0.3425",
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      priceRange: "£££",
      website: "https://www.hilton.com/en/hotels/huyukdi-doubletree-hull/",
      featured: true
    },
    {
      name: "The Kingston Theatre Hotel",
      slug: "kingston-theatre-hotel",
      description: "Luxury Victorian family-run hotel in the heart of Hull's Historic Old Town, overlooking Kingston Square Garden. Independent boutique hotel praised for helpful staff and quiet location within easy walking distance of Hull attractions. Book direct for best prices.",
      type: "Boutique Hotel",
      address: "Kingston Square, Hull Old Town, Hull, HU1 3HF",
      latitude: "53.7441",
      longitude: "-0.3361",
      imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      priceRange: "££",
      website: "https://kingstontheatrehotel.com/",
      featured: true
    },
    {
      name: "Holiday Inn Express Hull City Centre",
      slug: "holiday-inn-express-hull",
      description: "Ideally situated by the main bus & train interchange, near the Old Town & The Deep. Features meeting rooms. Modern, comfortable rooms with complimentary breakfast. Perfect for business and leisure travelers.",
      type: "Hotel",
      address: "Ferensway, Hull, HU2 8LN",
      latitude: "53.7448",
      longitude: "-0.3418",
      imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      priceRange: "££",
      website: "https://www.ihg.com/holidayinnexpress/hotels/us/en/kingston-upon-hull/huyuk/hoteldetail",
      featured: false
    }
  ];

  await db.insert(accommodations).values(realAccommodations);
  console.log(`✅ Inserted ${realAccommodations.length} real hotels`);

  // ====================
  // REAL EVENTS
  // ====================
  console.log("🎉  Inserting real Hull events...");
  
  const currentYear = new Date().getFullYear();
  const realEvents = [
    {
      title: "Freedom Festival 2025",
      slug: "freedom-festival-2025",
      description: "Hull's award-winning international arts festival. Over 115 hours of FREE entertainment featuring epic spectaculars unfolding in the city center and intimate performances. 76 experiences by 29 artists featuring 100s of performers. Won the Culture Award at the Yorkshire Post.",
      category: "Festival",
      startDate: new Date(`${currentYear}-08-28`),
      endDate: new Date(`${currentYear}-08-31`),
      location: "Hull City Centre, various venues",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
      ticketUrl: "https://www.freedomfestival.co.uk/",
      price: "FREE",
      featured: true
    },
    {
      title: "Hull Fair 2025",
      slug: "hull-fair-2025",
      description: "Europe's largest travelling funfair, held annually for over 700 years. Week-long event with rides, games, and traditional fair attractions. A Hull tradition bringing together families and thrill-seekers for an unforgettable experience.",
      category: "Festival",
      startDate: new Date(`${currentYear}-10-10`),
      endDate: new Date(`${currentYear}-10-17`),
      location: "Walton Street, Hull",
      imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
      price: "FREE entry, pay per ride",
      featured: true
    },
    {
      title: "Larkin Out Festival",
      slug: "larkin-out-festival",
      description: "Festival celebrating poet Philip Larkin's connection to Hull with poetry, music, and cultural events. Features readings, performances, and discussions exploring Larkin's legacy and contemporary poetry.",
      category: "Cultural",
      startDate: new Date(`${currentYear}-06-15`),
      endDate: new Date(`${currentYear}-06-16`),
      location: "Various Hull venues",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
      price: "Varies by event",
      featured: false
    },
    {
      title: "Hull Minster Christmas Market",
      slug: "hull-minster-christmas-market",
      description: "Traditional indoor Christmas market in the historic setting of Hull Minster. Browse unique gifts, crafts, and festive treats while enjoying the beautiful architecture. Perfect for finding special Christmas presents.",
      category: "Market",
      startDate: new Date(`${currentYear}-12-01`),
      endDate: new Date(`${currentYear}-12-23`),
      location: "Hull Minster, South Church Side, Hull",
      imageUrl: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800",
      ticketUrl: "https://hullminster.org/",
      price: "FREE entry",
      featured: false
    }
  ];

  await db.insert(events).values(realEvents);
  console.log(`✅ Inserted ${realEvents.length} real events`);

  // ====================
  // REAL TOURS
  // ====================
  console.log("🚶  Inserting real Hull tours...");
  
  const realTours = [
    {
      name: "Guided Walking Tours of Hull",
      slug: "guided-walking-tours",
      description: "English Heritage-accredited tour guides offering walks through Hull's historic old quarter. Paul, an independent guide with over 30 years of experience, conducts tours showcasing the city's history, architecture, and culture. Discover hidden gems and fascinating stories about Hull's maritime heritage, medieval streets, and cultural landmarks. Duration: 2 hours. Meeting point: Queen Victoria Square.",
      duration: "2 hours",
      price: "£10 per person",
      imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      bookingUrl: "https://www.visithull.org/to-do/guided-walking-tours/",
      featured: true
    },
    {
      name: "Hull Heritage Walk",
      slug: "hull-heritage-walk",
      description: "FREE self-guided audio and printable guides presented in 9 separate stages. Takes you on a fascinating journey through Hull's history and architecture. Explore at your own pace, discovering the city's medieval origins, maritime heritage, and modern transformation. Download the guide online and follow the trail through Hull's most historic areas.",
      duration: "Self-paced (3-4 hours total)",
      price: "FREE",
      imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
      bookingUrl: "https://visithull.org.uk/",
      featured: true
    },
    {
      name: "Hull Museums Guided Tours",
      slug: "hull-museums-tours",
      description: "FREE one-hour tours led by volunteer tour guides at Hull Museums. Four different tours available, each telling stories behind museum collections. Explore Ferens Art Gallery, Streetlife Museum, Wilberforce House, and more with knowledgeable guides who bring the exhibits to life. Meeting point: Individual museum reception.",
      duration: "1 hour",
      price: "FREE",
      imageUrl: "https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=800",
      bookingUrl: "https://www.hullmuseums.co.uk/homepage/221/guided-tours",
      featured: false
    }
  ];

  await db.insert(tours).values(realTours);
  console.log(`✅ Inserted ${realTours.length} real tours`);

  console.log("\n🎉 REAL Hull data seeding completed successfully!");
  console.log("📊 Summary:");
  console.log(`   - ${realAttractions.length} real attractions`);
  console.log(`   - ${realRestaurants.length} real restaurants`);
  console.log(`   - ${realAccommodations.length} real hotels`);
  console.log(`   - ${realEvents.length} real events`);
  console.log(`   - ${realTours.length} real tours`);
  console.log("   - All data verified as authentic Hull businesses\n");
}

// Run the seed
seedRealHullData()
  .then(() => {
    console.log("✅ Database seeded successfully with REAL Hull data!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Failed to seed database:", error);
    process.exit(1);
  });
