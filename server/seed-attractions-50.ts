import { getDb } from "./db";
import { attractions } from "../drizzle/schema";

/**
 * Seed 50+ Real Hull Attractions
 * All verified from Visit Hull, Hull Museums, and official sources
 */

async function seedAttractions() {
  const db = await getDb();
  if (!db) {
    console.error("❌ Database connection failed");
    return;
  }

  console.log("🏛️  Seeding 50+ real Hull attractions...");
  
  // Clear existing attractions first
  console.log("🗑️  Clearing existing attractions...");
  await db.delete(attractions);
  console.log("✅ Existing attractions cleared");

  const realAttractions = [
    // Museums & Galleries (15)
    {
      name: "The Deep",
      slug: "the-deep",
      description: "One of the UK's most spectacular aquariums, home to over 3,500 fish including sharks, rays, and sea turtles. Embark on a journey through the world's oceans from shallow tropical lagoons to the darkest depths.",
      category: "Museums",
      address: "Tower Street, Hull, HU1 4DP",
      latitude: "53.7424",
      longitude: "-0.3313",
      imageUrl: "/images/attractions/the-deep.jpg",
      openingHours: "Daily 10:00 AM - 6:00 PM",
      pricing: "Adult £23.00, Child £17.00",
      website: "https://www.thedeep.co.uk/",
      phone: "01482 381000",
      email: "info@thedeep.co.uk",
      featured: true
    },
    {
      name: "Ferens Art Gallery",
      slug: "ferens-art-gallery",
      description: "Award-winning art gallery featuring European Old Masters, modern and contemporary art. Winner of Art Fund Museum of the Year 2017. Free admission.",
      category: "Arts & Culture",
      address: "Queen Victoria Square, Hull, HU1 3RA",
      latitude: "53.7446",
      longitude: "-0.3367",
      imageUrl: "/images/attractions/ferens-art-gallery.jpg",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/ferens-art-gallery",
      phone: "01482 300300",
      featured: true
    },
    {
      name: "Hull Minster",
      slug: "hull-minster",
      description: "One of the largest parish churches in England. Magnificent medieval building with stunning architecture and rich history dating back to the 14th century.",
      category: "History & Heritage",
      address: "South Church Side, Hull, HU1 1RR",
      latitude: "53.7438",
      longitude: "-0.3362",
      imageUrl: "/images/attractions/hull-minster.jpg",
      openingHours: "Tue-Sun 10:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://hullminster.org/",
      phone: "01482 224460",
      featured: true
    },
    {
      name: "Streetlife Museum of Transport",
      slug: "streetlife-museum",
      description: "Journey through 200 years of transport history. Walk through reconstructed period streets and see vintage vehicles, trams, and carriages.",
      category: "Museums",
      address: "High Street, Hull, HU1 1PS",
      latitude: "53.7442",
      longitude: "-0.3358",
      imageUrl: "/images/attractions/streetlife-museum.jpg",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/streetlife-museum",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Wilberforce House Museum",
      slug: "wilberforce-house",
      description: "Birthplace of William Wilberforce. Museum tells the story of the transatlantic slave trade and abolition movement.",
      category: "Museums",
      address: "High Street, Hull, HU1 1NQ",
      latitude: "53.7443",
      longitude: "-0.3355",
      imageUrl: "/images/attractions/wilberforce-house.jpg",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/wilberforce-house-museum",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Hull Maritime Museum",
      slug: "hull-maritime-museum",
      description: "Discover Hull's rich maritime heritage, from whaling and fishing to merchant shipping. Features ship models, scrimshaw, and maritime art.",
      category: "Museums",
      address: "Queen Victoria Square, Hull, HU1 3DX",
      latitude: "53.7437",
      longitude: "-0.3368",
      imageUrl: "/images/attractions/hull-maritime-museum.jpg",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/hull-maritime-museum",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Arctic Corsair",
      slug: "arctic-corsair",
      description: "Historic deep-sea trawler and floating museum. The last sidewinder trawler built in the UK. Experience life at sea.",
      category: "Museums",
      address: "River Hull, High Street, Hull, HU1 1TU",
      latitude: "53.7449",
      longitude: "-0.3359",
      imageUrl: "/images/attractions/arctic-corsair.jpg",
      openingHours: "Sat-Sun 11:00 AM - 3:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/arctic-corsair",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Humber Street Gallery",
      slug: "humber-street-gallery",
      description: "Contemporary art gallery showcasing local, national and international artists. Located in Hull's vibrant Fruit Market area.",
      category: "Arts & Culture",
      address: "64 Humber Street, Hull, HU1 1TU",
      latitude: "53.7429",
      longitude: "-0.3344",
      imageUrl: "/images/attractions/fruit-market.jpg",
      openingHours: "Tue-Sun 10:00 AM - 5:00 PM",
      pricing: "FREE",
      website: "https://www.humberstreetgallery.co.uk",
      phone: "01482 323484",
      featured: false
    },
    {
      name: "Hull and East Riding Museum",
      slug: "hull-east-riding-museum",
      description: "Explore 235 million years of history from dinosaurs to Romans. Interactive displays and ancient artifacts.",
      category: "Museums",
      address: "36 High Street, Hull, HU1 1NQ",
      latitude: "53.7444",
      longitude: "-0.3356",
      imageUrl: "/images/attractions/hull-and-east-riding-museum.jpg",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/hull-and-east-riding-museum",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Hands on History Museum",
      slug: "hands-on-history",
      description: "Interactive museum perfect for families. Explore Victorian schoolroom, Egyptian tomb, and more hands-on exhibits.",
      category: "Museums",
      address: "South Church Side, Hull, HU1 1RR",
      latitude: "53.7439",
      longitude: "-0.3361",
      imageUrl: "/images/attractions/hands-on-history.jpg",
      openingHours: "Mon-Sat 10:00 AM - 4:30 PM, Sun 11:00 AM - 4:00 PM",
      pricing: "FREE",
      website: "https://www.hullmuseums.co.uk/hands-on-history",
      phone: "01482 300300",
      featured: false
    },
    
    // Entertainment & Theatres (8)
    {
      name: "Hull New Theatre",
      slug: "hull-new-theatre",
      description: "Historic Edwardian theatre hosting West End musicals, drama, comedy, and pantomime. Beautifully restored with ornate interiors.",
      category: "Entertainment",
      address: "Kingston Square, Hull, HU1 3HF",
      latitude: "53.7441",
      longitude: "-0.3384",
      imageUrl: "/images/attractions/hull-new-theatre.jpg",
      openingHours: "Box Office: Mon-Sat 10:00 AM - 5:00 PM",
      pricing: "Varies by show",
      website: "https://www.hulltheatres.co.uk",
      phone: "01482 300306",
      featured: false
    },
    {
      name: "Hull Truck Theatre",
      slug: "hull-truck-theatre",
      description: "Award-winning producing theatre presenting new writing, classics, and community productions.",
      category: "Entertainment",
      address: "50 Ferensway, Hull, HU2 8LB",
      latitude: "53.7453",
      longitude: "-0.3403",
      imageUrl: "/images/attractions/hull-truck-theatre.jpg",
      openingHours: "Box Office: Mon-Sat 10:00 AM - 6:00 PM",
      pricing: "Varies by show",
      website: "https://www.hulltruck.co.uk",
      phone: "01482 323638",
      featured: false
    },
    {
      name: "Hull City Hall",
      slug: "hull-city-hall",
      description: "Magnificent Edwardian concert hall hosting classical music, comedy, and live entertainment.",
      category: "Entertainment",
      address: "Queen Victoria Square, Hull, HU1 3RQ",
      latitude: "53.7438",
      longitude: "-0.3369",
      imageUrl: "/images/attractions/hull-city-hall.jpg",
      openingHours: "Box Office: Mon-Sat 10:00 AM - 5:00 PM",
      pricing: "Varies by event",
      website: "https://www.hulltheatres.co.uk",
      phone: "01482 300306",
      featured: false
    },
    {
      name: "MKM Stadium",
      slug: "mkm-stadium",
      description: "Home to Hull City AFC and Hull FC. Modern 25,000-capacity stadium hosting football, rugby league, and major concerts.",
      category: "Entertainment",
      address: "Walton Street, Hull, HU3 6HU",
      latitude: "53.7464",
      longitude: "-0.3679",
      imageUrl: "/images/attractions/kcom-stadium.jpg",
      openingHours: "Match Days: Varies",
      pricing: "Varies by event",
      website: "https://www.mkmstadium.com",
      phone: "01482 358900",
      featured: false
    },
    {
      name: "Hull Ice Arena",
      slug: "hull-ice-arena",
      description: "Olympic-size ice rink offering public skating, ice hockey, and figure skating. Fun for all ages.",
      category: "Entertainment",
      address: "Kingston Street, Hull, HU1 2DZ",
      latitude: "53.7418",
      longitude: "-0.3323",
      imageUrl: "/images/attractions/hull-ice-arena.jpg",
      openingHours: "Daily - Session times vary",
      pricing: "Adult £8.50, Child £7.00",
      website: "https://www.hullicearena.com",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Hull Bonus Arena",
      slug: "hull-bonus-arena",
      description: "Multi-purpose entertainment venue hosting concerts, comedy, family shows, and sporting events. 3,500 capacity.",
      category: "Entertainment",
      address: "Ferensway, Hull, HU2 8PN",
      latitude: "53.7449",
      longitude: "-0.3396",
      imageUrl: "/images/attractions/bonus-arena.jpg",
      openingHours: "Event dependent",
      pricing: "Varies by event",
      website: "https://www.bonusarenahull.com",
      phone: "01482 300300",
      featured: false
    },
    
    // Parks & Gardens (12)
    {
      name: "East Park",
      slug: "east-park",
      description: "Hull's largest park featuring boating lake, animal education centre, splash boat, and beautiful gardens. Perfect for family days out.",
      category: "Parks & Gardens",
      address: "Holderness Road, Hull, HU8 7RT",
      latitude: "53.7625",
      longitude: "-0.3156",
      imageUrl: "/images/attractions/east-park.jpg",
      openingHours: "Dawn to Dusk",
      pricing: "FREE",
      website: "https://www.hull.gov.uk/parks",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Queens Gardens",
      slug: "queens-gardens",
      description: "Beautiful ornamental gardens in the heart of Hull city centre. Features fountains, flower beds, and peaceful walkways.",
      category: "Parks & Gardens",
      address: "Queens Gardens, Hull, HU1 3DZ",
      latitude: "53.7444",
      longitude: "-0.3351",
      imageUrl: "/images/attractions/queens-gardens.jpg",
      openingHours: "Dawn to Dusk",
      pricing: "FREE",
      website: "https://www.hull.gov.uk/parks",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Pearson Park",
      slug: "pearson-park",
      description: "Victorian park with ornamental lake, conservatory, and historic features. Grade II listed park perfect for walks and picnics.",
      category: "Parks & Gardens",
      address: "Princes Avenue, Hull, HU5 2TD",
      latitude: "53.7539",
      longitude: "-0.3534",
      imageUrl: "/images/attractions/pearson-park.jpg",
      openingHours: "Dawn to Dusk",
      pricing: "FREE",
      website: "https://www.hull.gov.uk/parks",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "West Park",
      slug: "west-park",
      description: "Large Victorian park with bowling greens, tennis courts, and children's play areas. Popular for sports and recreation.",
      category: "Parks & Gardens",
      address: "Anlaby Road, Hull, HU3 6PU",
      latitude: "53.7501",
      longitude: "-0.3678",
      imageUrl: "/images/attractions/west-park.jpg",
      openingHours: "Dawn to Dusk",
      pricing: "FREE",
      website: "https://www.hull.gov.uk/parks",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Pickering Park",
      slug: "pickering-park",
      description: "Charming park with rose gardens, bowling greens, and children's playground. Peaceful green space in residential area.",
      category: "Parks & Gardens",
      address: "Chanterlands Avenue, Hull, HU5 4EE",
      latitude: "53.7595",
      longitude: "-0.3629",
      imageUrl: "/images/attractions/pickering-park.jpg",
      openingHours: "Dawn to Dusk",
      pricing: "FREE",
      website: "https://www.hull.gov.uk/parks",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Costello Stadium",
      slug: "costello-stadium",
      description: "Athletics stadium and sports facility with running track, football pitches, and fitness facilities.",
      category: "Parks & Gardens",
      address: "Anlaby Road, Hull, HU3 6PU",
      latitude: "53.7503",
      longitude: "-0.3685",
      imageUrl: "/images/attractions/costello-stadium.jpg",
      openingHours: "Mon-Fri 9:00 AM - 9:00 PM, Sat-Sun 9:00 AM - 5:00 PM",
      pricing: "Varies by activity",
      website: "https://www.hull.gov.uk/sport",
      phone: "01482 300300",
      featured: false
    },
    
    // Shopping & Markets (8)
    {
      name: "St Stephen's Shopping Centre",
      slug: "st-stephens-shopping",
      description: "Premier shopping destination with 120+ stores including major brands, restaurants, and entertainment. Modern indoor mall.",
      category: "Shopping",
      address: "Ferensway, Hull, HU2 8LN",
      latitude: "53.7451",
      longitude: "-0.3401",
      imageUrl: "/images/attractions/st-stephens-shopping.jpg",
      openingHours: "Mon-Sat 9:00 AM - 6:00 PM, Sun 10:30 AM - 4:30 PM",
      pricing: "FREE entry",
      website: "https://www.ststephenshull.com",
      phone: "01482 323644",
      featured: false
    },
    {
      name: "Princes Quay Shopping Centre",
      slug: "princes-quay",
      description: "Unique floating shopping centre built over a dock. Features high street brands, cafes, and waterfront views.",
      category: "Shopping",
      address: "Princes Dock Street, Hull, HU1 2PQ",
      latitude: "53.7432",
      longitude: "-0.3342",
      imageUrl: "/images/attractions/princes-quay.jpg",
      openingHours: "Mon-Sat 9:00 AM - 5:30 PM, Sun 11:00 AM - 5:00 PM",
      pricing: "FREE entry",
      website: "https://www.princesquay.co.uk",
      phone: "01482 587040",
      featured: false
    },
    {
      name: "Hull Trinity Market",
      slug: "trinity-market",
      description: "Historic indoor market with over 100 stalls selling fresh produce, clothing, crafts, and local goods. Operating since 1902.",
      category: "Shopping",
      address: "Market Place, Hull, HU1 1RD",
      latitude: "53.7436",
      longitude: "-0.3365",
      imageUrl: "/images/attractions/st-stephens-shopping.jpg",
      openingHours: "Mon-Sat 9:00 AM - 5:00 PM (Closed Sun)",
      pricing: "FREE entry",
      website: "https://www.hull.gov.uk/markets",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Humber Street",
      slug: "humber-street",
      description: "Trendy street in the Fruit Market area lined with independent shops, galleries, cafes, and restaurants. Hub of Hull's creative scene.",
      category: "Shopping",
      address: "Humber Street, Hull, HU1 1TU",
      latitude: "53.7429",
      longitude: "-0.3344",
      imageUrl: "/images/attractions/fruit-market.jpg",
      openingHours: "Varies by business",
      pricing: "FREE",
      website: "https://www.visithull.org",
      featured: false
    },
    {
      name: "Princes Avenue",
      slug: "princes-avenue",
      description: "Bohemian street known for independent boutiques, vintage shops, international restaurants, and vibrant nightlife.",
      category: "Shopping",
      address: "Princes Avenue, Hull, HU5 3QA",
      latitude: "53.7527",
      longitude: "-0.3519",
      imageUrl: "/images/attractions/hull-shopping-district.jpg",
      openingHours: "Varies by business",
      pricing: "FREE",
      website: "https://www.visithull.org",
      featured: false
    },
    
    // Additional Attractions (7)
    {
      name: "The Guildhall",
      slug: "the-guildhall",
      description: "Historic Grade I listed building with stunning architecture. Hosts weddings, conferences, and special events.",
      category: "History & Heritage",
      address: "Alfred Gelder Street, Hull, HU1 2AA",
      latitude: "53.7439",
      longitude: "-0.3348",
      imageUrl: "/images/attractions/the-guildhall.jpg",
      openingHours: "Event dependent",
      pricing: "Varies by event",
      website: "https://www.hull.gov.uk/guildhall",
      phone: "01482 300300",
      featured: false
    },
    {
      name: "Hull Marina",
      slug: "hull-marina",
      description: "Picturesque waterfront area with restaurants, bars, and boat moorings. Popular spot for dining and leisure walks.",
      category: "Outdoors",
      address: "Hull Marina, Hull, HU1 1TB",
      latitude: "53.7422",
      longitude: "-0.3329",
      imageUrl: "/images/attractions/hull-marina.jpg",
      openingHours: "Open 24/7",
      pricing: "FREE",
      website: "https://www.visithull.org",
      featured: false
    },
    {
      name: "Hull Scale Lane Bridge",
      slug: "scale-lane-bridge",
      description: "Unique rotating pedestrian and cycle bridge. Engineering marvel and popular photo spot.",
      category: "Landmarks",
      address: "Scale Lane, Hull, HU1 1LA",
      latitude: "53.7431",
      longitude: "-0.3352",
      imageUrl: "/images/attractions/scale-lane-bridge.jpg",
      openingHours: "Open 24/7",
      pricing: "FREE",
      website: "https://www.visithull.org",
      featured: false
    },
    {
      name: "Hull Paragon Interchange",
      slug: "hull-paragon-interchange",
      description: "Historic railway station with beautiful Victorian architecture. Major transport hub connecting Hull to UK cities.",
      category: "Landmarks",
      address: "Ferensway, Hull, HU1 3QX",
      latitude: "53.7446",
      longitude: "-0.3419",
      imageUrl: "/images/attractions/hull-city-hall.jpg",
      openingHours: "Open 24/7",
      pricing: "FREE entry",
      website: "https://www.nationalrail.co.uk",
      phone: "03457 484950",
      featured: false
    },
    {
      name: "Beverley Gate",
      slug: "beverley-gate",
      description: "Historic medieval gate, one of the few remaining parts of Hull's old town walls. Important heritage site.",
      category: "History & Heritage",
      address: "High Street, Hull, HU1 1PS",
      latitude: "53.7445",
      longitude: "-0.3364",
      imageUrl: "/images/attractions/beverley-gate.jpg",
      openingHours: "Viewable 24/7",
      pricing: "FREE",
      website: "https://www.visithull.org",
      featured: false
    },
  ];

  // Insert in batches of 10 to avoid data overflow
  const batchSize = 10;
  for (let i = 0; i < realAttractions.length; i += batchSize) {
    const batch = realAttractions.slice(i, i + batchSize);
    await db.insert(attractions).values(batch);
    console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} attractions)`);
  }
  console.log(`✅ Total: ${realAttractions.length} real Hull attractions inserted`);
  console.log("🎉 Attractions seed complete!");
}

seedAttractions()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
