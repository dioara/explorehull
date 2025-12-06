import { getDb } from "./db";
import { attractions, events, restaurants, accommodations, tours, blogPosts } from "../drizzle/schema";

/**
 * Expanded seed data for ExploreHull.com with 100+ listings per category
 */

async function seedExpandedData() {
  const db = await getDb();
  if (!db) {
    console.error("Database connection failed");
    return;
  }

  console.log("Starting expanded data seeding...");

  // Clear existing data
  await db.delete(attractions);
  await db.delete(events);
  await db.delete(restaurants);
  await db.delete(accommodations);
  await db.delete(tours);
  await db.delete(blogPosts);

  // Generate 100+ Attractions
  const attractionsData = generateAttractions();
  console.log(`Inserting ${attractionsData.length} attractions...`);
  
  // Insert in batches to avoid overwhelming the database
  for (let i = 0; i < attractionsData.length; i += 50) {
    const batch = attractionsData.slice(i, i + 50);
    await db.insert(attractions).values(batch);
    console.log(`  Inserted attractions ${i + 1} to ${Math.min(i + 50, attractionsData.length)}`);
  }

  // Generate 100+ Events
  const eventsData = generateEvents();
  console.log(`Inserting ${eventsData.length} events...`);
  for (let i = 0; i < eventsData.length; i += 50) {
    const batch = eventsData.slice(i, i + 50);
    await db.insert(events).values(batch);
    console.log(`  Inserted events ${i + 1} to ${Math.min(i + 50, eventsData.length)}`);
  }

  // Generate 100+ Restaurants
  const restaurantsData = generateRestaurants();
  console.log(`Inserting ${restaurantsData.length} restaurants...`);
  for (let i = 0; i < restaurantsData.length; i += 50) {
    const batch = restaurantsData.slice(i, i + 50);
    await db.insert(restaurants).values(batch);
    console.log(`  Inserted restaurants ${i + 1} to ${Math.min(i + 50, restaurantsData.length)}`);
  }

  // Generate 100+ Accommodations
  const accommodationsData = generateAccommodations();
  console.log(`Inserting ${accommodationsData.length} accommodations...`);
  for (let i = 0; i < accommodationsData.length; i += 50) {
    const batch = accommodationsData.slice(i, i + 50);
    await db.insert(accommodations).values(batch);
    console.log(`  Inserted accommodations ${i + 1} to ${Math.min(i + 50, accommodationsData.length)}`);
  }

  // Seed Tours
  const toursData = generateTours();
  console.log(`Inserting ${toursData.length} tours...`);
  await db.insert(tours).values(toursData);

  // Seed Blog Posts
  const blogData = generateBlogPosts();
  console.log(`Inserting ${blogData.length} blog posts...`);
  await db.insert(blogPosts).values(blogData);

  console.log("✅ Expanded data seeding completed!");
  console.log(`Total: ${attractionsData.length} attractions, ${eventsData.length} events, ${restaurantsData.length} restaurants, ${accommodationsData.length} accommodations`);
}

function generateAttractions(): any[] {
  const attractions: any[] = [];
  
  // Core attractions with detailed information
  const coreAttractions = [
    {
      name: "The Deep",
      category: "Museums",
      desc: "One of the UK's most spectacular aquariums, home to over 3,500 fish including sharks and rays. The Deep offers an unforgettable underwater journey through the world's oceans.",
      address: "Tower Street, Hull, HU1 4DP",
      lat: 53.7432,
      lng: -0.3318,
      hours: "Daily 10:00 AM - 6:00 PM",
      price: "Adults £16.50, Children £13.50",
      website: "https://www.thedeep.co.uk",
      phone: "+44 1482 381000",
      featured: true
    },
    {
      name: "Ferens Art Gallery",
      category: "Arts & Culture",
      desc: "Award-winning art gallery featuring European Old Masters, modern and contemporary art. Free admission to permanent collections.",
      address: "Queen Victoria Square, Hull, HU1 3RA",
      lat: 53.7438,
      lng: -0.3362,
      hours: "Mon-Sat 10:00 AM - 5:00 PM, Sun 11:00 AM - 4:00 PM",
      price: "Free admission",
      website: "https://www.hullcc.gov.uk/ferens",
      phone: "+44 1482 300300",
      featured: true
    },
    {
      name: "Streetlife Museum",
      category: "Museums",
      desc: "Step back in time and experience 200 years of transport history. Free admission.",
      address: "High Street, Hull, HU1 1PS",
      lat: 53.7445,
      lng: -0.3355,
      hours: "Mon-Sat 10:00 AM - 5:00 PM, Sun 11:00 AM - 4:00 PM",
      price: "Free admission",
      website: "https://www.hullcc.gov.uk/museums",
      phone: "+44 1482 300300",
      featured: true
    },
    {
      name: "Hull Maritime Museum",
      category: "Museums",
      desc: "Discover Hull's rich maritime heritage, from whaling to fishing.",
      address: "Queen Victoria Square, Hull, HU1 3DX",
      lat: 53.7439,
      lng: -0.3364,
      hours: "Mon-Sat 10:00 AM - 5:00 PM, Sun 11:00 AM - 4:00 PM",
      price: "Free admission",
      website: "https://www.hullcc.gov.uk/museums",
      phone: "+44 1482 300300",
      featured: false
    },
    {
      name: "Wilberforce House Museum",
      category: "History & Heritage",
      desc: "Birthplace of William Wilberforce, the slavery abolitionist.",
      address: "25 High Street, Hull, HU1 1NQ",
      lat: 53.7447,
      lng: -0.3353,
      hours: "Mon-Sat 10:00 AM - 5:00 PM, Sun 11:00 AM - 4:00 PM",
      price: "Free admission",
      website: "https://www.hullcc.gov.uk/museums",
      phone: "+44 1482 300300",
      featured: false
    },
    // Add more core attractions...
  ];

  // Extended attractions list (100+ total)
  const attractionTypes = [
    // Museums & Galleries
    { name: "Hull & East Riding Museum", category: "Museums", type: "archaeology" },
    { name: "Humber Street Gallery", category: "Arts & Culture", type: "contemporary art" },
    { name: "Hands On History Museum", category: "Family Friendly", type: "interactive" },
    { name: "Arctic Corsair", category: "Museums", type: "ship museum" },
    { name: "Spurn Lightship", category: "History & Heritage", type: "maritime" },
    
    // Historic Buildings
    { name: "Hull Guildhall", category: "History & Heritage", type: "civic building" },
    { name: "Holy Trinity Church", category: "History & Heritage", type: "church" },
    { name: "Hull Minster", category: "History & Heritage", type: "church" },
    { name: "Beverley Gate", category: "History & Heritage", type: "medieval gate" },
    { name: "The Ropery", category: "History & Heritage", type: "industrial heritage" },
    
    // Entertainment & Leisure
    { name: "Lost City Adventure Golf", category: "Family Friendly", type: "mini golf" },
    { name: "Escape Hull", category: "Entertainment", type: "escape room" },
    { name: "TeamSport Karting", category: "Entertainment", type: "go-karting" },
    { name: "Dinostar", category: "Family Friendly", type: "dinosaur attraction" },
    { name: "Napoleons Casino", category: "Entertainment", type: "casino" },
    { name: "Hull Ice Arena", category: "Sports & Leisure", type: "ice skating" },
    { name: "Bonus Arena", category: "Entertainment", type: "concert venue" },
    
    // Theatres & Performance Venues
    { name: "Hull Truck Theatre", category: "Arts & Culture", type: "theatre" },
    { name: "Hull New Theatre", category: "Arts & Culture", type: "theatre" },
    { name: "Hull City Hall", category: "Arts & Culture", type: "concert hall" },
    { name: "The Polar Bear", category: "Arts & Culture", type: "music venue" },
    { name: "Hull Venue", category: "Entertainment", type: "live music" },
    
    // Parks & Outdoor Spaces
    { name: "East Park", category: "Outdoors", type: "park" },
    { name: "Pearson Park", category: "Outdoors", type: "Victorian park" },
    { name: "Queens Gardens", category: "Outdoors", type: "gardens" },
    { name: "Pickering Park", category: "Outdoors", type: "park" },
    { name: "Humber Bridge Country Park", category: "Outdoors", type: "country park" },
    { name: "Hull Marina", category: "Outdoors", type: "marina" },
    
    // Shopping & Markets
    { name: "Paragon Arcade", category: "Shopping", type: "Victorian arcade" },
    { name: "Trinity Market", category: "Shopping", type: "indoor market" },
    { name: "Princes Quay", category: "Shopping", type: "shopping center" },
    { name: "St Stephen's Shopping Centre", category: "Shopping", type: "shopping center" },
    { name: "Fruit Market", category: "Arts & Culture", type: "creative quarter" },
    
    // Landmarks & Bridges
    { name: "Humber Bridge", category: "Landmarks", type: "suspension bridge" },
    { name: "Scale Lane Bridge", category: "Landmarks", type: "swing bridge" },
    { name: "Tidal Surge Barrier", category: "Landmarks", type: "flood defense" },
    
    // Sports Venues
    { name: "KCOM Stadium", category: "Sports & Leisure", type: "football stadium" },
    { name: "Hull FC Stadium", category: "Sports & Leisure", type: "rugby stadium" },
    { name: "Costello Stadium", category: "Sports & Leisure", type: "athletics" },
    
    // Additional Attractions (to reach 100+)
    { name: "Hull Old Town", category: "History & Heritage", type: "historic quarter" },
    { name: "Museum Quarter", category: "Museums", type: "museum district" },
    { name: "Humber Street", category: "Arts & Culture", type: "cultural street" },
    { name: "Victoria Pier", category: "Landmarks", type: "pier" },
    { name: "Hull Fair Ground", category: "Events", type: "fairground" },
  ];

  // Generate core attractions
  coreAttractions.forEach((attr, i) => {
    attractions.push({
      name: attr.name,
      slug: attr.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: attr.desc,
      category: attr.category,
      address: attr.address,
      latitude: attr.lat,
      longitude: attr.lng,
      imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
      openingHours: attr.hours,
      pricing: attr.price,
      website: attr.website,
      phone: attr.phone,
      featured: attr.featured
    });
  });

  // Generate extended attractions (reaching 100+)
  for (let i = 0; i < 100; i++) {
    const baseAttr = attractionTypes[i % attractionTypes.length];
    const suffix = i >= attractionTypes.length ? ` ${Math.floor(i / attractionTypes.length) + 1}` : "";
    
    attractions.push({
      name: `${baseAttr.name}${suffix}`,
      slug: `${baseAttr.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}${suffix ? `-${Math.floor(i / attractionTypes.length) + 1}` : ""}`,
      description: `Experience ${baseAttr.name}${suffix}, a wonderful ${baseAttr.type} attraction in Hull. Perfect for visitors looking to explore the city's ${baseAttr.category.toLowerCase()} offerings.`,
      category: baseAttr.category,
      address: `${i + 10} High Street, Hull, HU1 ${(i % 9) + 1}XX`,
      latitude: 53.74 + (Math.random() * 0.02 - 0.01),
      longitude: -0.33 + (Math.random() * 0.02 - 0.01),
      imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
      openingHours: i % 3 === 0 ? "Daily 10:00 AM - 5:00 PM" : "Mon-Sat 10:00 AM - 6:00 PM, Sun 11:00 AM - 4:00 PM",
      pricing: i % 4 === 0 ? "Free admission" : `Adults £${5 + (i % 15)}, Children £${3 + (i % 8)}`,
      website: `https://www.${baseAttr.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.co.uk`,
      phone: `+44 1482 ${300000 + i * 100}`,
      featured: i % 15 === 0
    });
  }

  return attractions;
}

function generateEvents(): any[] {
  const events: any[] = [];
  
  const eventCategories = [
    "Festival", "Concert", "Exhibition", "Market", "Workshop", "Tour", 
    "Performance", "Comedy", "Theatre", "Music", "Art", "Food & Drink",
    "Family", "Sports", "Cultural", "Community", "Charity", "Educational"
  ];
  
  const eventNames = [
    "Hull Freedom Festival", "Hull Pride", "Humber Street Sesh", "Hull Jazz Festival",
    "Hull Literature Festival", "Hull Fair", "Christmas Markets", "Food Festival",
    "Art Exhibition", "Music Concert", "Theatre Performance", "Comedy Night",
    "Craft Fair", "Farmers Market", "Vintage Market", "Car Boot Sale",
    "Charity Run", "Community Event", "Workshop Series", "Guided Tour",
    "Film Screening", "Poetry Reading", "Book Launch", "Dance Performance",
    "Opera Night", "Classical Concert", "Rock Concert", "Pop Concert",
    "Folk Festival", "Blues Night", "Reggae Festival", "Electronic Music Night"
  ];

  // Generate 100+ events spread across the year
  for (let i = 0; i < 120; i++) {
    const category = eventCategories[i % eventCategories.length];
    const baseName = eventNames[i % eventNames.length];
    const month = i % 12;
    const day = (i % 28) + 1;
    const year = 2025;
    
    events.push({
      title: `${baseName} ${month + 1}/${year}`,
      slug: `${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${month + 1}-${year}-${i}`,
      description: `Join us for ${baseName} in Hull. This ${category.toLowerCase()} event promises to be an unforgettable experience for all attendees. Featuring local talent, great atmosphere, and community spirit.`,
      startDate: new Date(year, month, day, 10 + (i % 10), 0, 0),
      endDate: new Date(year, month, day + (i % 3), 18 + (i % 5), 0, 0),
      location: `${(i % 20) + 1} Queen Victoria Square, Hull, HU1 ${(i % 9) + 1}XX`,
      category,
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200",
      ticketUrl: `https://www.tickets.com/${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      featured: i % 10 === 0
    });
  }
  
  return events;
}

function generateRestaurants(): any[] {
  const restaurants: any[] = [];
  
  const cuisines = [
    "British", "Italian", "Indian", "Chinese", "Thai", "Mexican", "French", 
    "Mediterranean", "Japanese", "American", "Spanish", "Greek", "Turkish",
    "Vietnamese", "Korean", "Lebanese", "Moroccan", "Caribbean", "Fusion",
    "Vegetarian", "Vegan", "Seafood", "Steakhouse", "Pizza", "Burgers"
  ];
  
  const priceRanges = ["£", "££", "£££", "££££"];
  
  const restaurantPrefixes = [
    "The", "Bella", "La", "El", "Le", "Casa", "Trattoria", "Bistro",
    "Cafe", "Restaurant", "Kitchen", "Grill", "House", "Bar", "Pub"
  ];
  
  const restaurantSuffixes = [
    "Kitchen", "Bistro", "Grill", "House", "Restaurant", "Cafe", "Bar",
    "Eatery", "Diner", "Lounge", "Brasserie", "Tavern", "Inn", "Place"
  ];

  // Generate 100+ restaurants
  for (let i = 0; i < 120; i++) {
    const cuisine = cuisines[i % cuisines.length];
    const prefix = restaurantPrefixes[i % restaurantPrefixes.length];
    const suffix = restaurantSuffixes[i % restaurantSuffixes.length];
    const name = i % 3 === 0 ? `${prefix} ${suffix}` : `${prefix} ${cuisine} ${suffix}`;
    
    restaurants.push({
      name: `${name} ${i > 40 ? i - 40 : ""}`.trim(),
      slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`,
      description: `Authentic ${cuisine} cuisine served in a welcoming atmosphere. Fresh ingredients, expert chefs, and excellent service make this a must-visit dining destination in Hull.`,
      cuisine,
      address: `${i + 1} Humber Street, Hull, HU1 ${(i % 9) + 1}XX`,
      latitude: 53.742 + (Math.random() * 0.015 - 0.0075),
      longitude: -0.329 + (Math.random() * 0.015 - 0.0075),
      priceRange: priceRanges[i % priceRanges.length],
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
      website: `https://www.${name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.co.uk`,
      phone: `+44 1482 ${200000 + i * 100}`,
      featured: i % 12 === 0
    });
  }
  
  return restaurants;
}

function generateAccommodations(): any[] {
  const accommodations: any[] = [];
  
  const types = ["Hotel", "B&B", "Apartment", "Hostel", "Guest House", "Inn"];
  const priceRanges = ["£", "££", "£££", "££££"];
  
  const hotelPrefixes = [
    "The", "Grand", "Royal", "Premier", "Best", "Quality", "Comfort",
    "Holiday", "Express", "Budget", "Luxury", "Boutique", "City", "Park"
  ];
  
  const hotelSuffixes = [
    "Hotel", "Inn", "Lodge", "Suites", "Apartments", "Residence", "House",
    "Manor", "Palace", "Tower", "Plaza", "Court", "Gardens", "View"
  ];

  // Generate 100+ accommodations
  for (let i = 0; i < 110; i++) {
    const type = types[i % types.length];
    const prefix = hotelPrefixes[i % hotelPrefixes.length];
    const suffix = hotelSuffixes[i % hotelSuffixes.length];
    const name = `${prefix} ${suffix}${i > 50 ? ` ${i - 50}` : ""}`;
    
    accommodations.push({
      name,
      slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`,
      description: `Comfortable ${type.toLowerCase()} accommodation in Hull. Modern amenities, convenient location, excellent value. Perfect for business travelers and tourists alike.`,
      type,
      address: `${i + 1} Ferensway, Hull, HU2 ${(i % 9) + 1}XX`,
      latitude: 53.745 + (Math.random() * 0.015 - 0.0075),
      longitude: -0.342 + (Math.random() * 0.015 - 0.0075),
      priceRange: priceRanges[i % priceRanges.length],
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
      bookingUrl: `https://www.booking.com/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      featured: i % 11 === 0
    });
  }
  
  return accommodations;
}

function generateTours(): any[] {
  return [
    {
      name: "Hull Old Town Walking Tour",
      slug: "hull-old-town-walking-tour",
      description: "Discover Hull's fascinating history on this guided walking tour through the Old Town.",
      duration: "2 hours",
      price: "12.50",
      imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
      bookingUrl: "https://www.visithull.org/tours",
      featured: true
    },
    {
      name: "Maritime Heritage Tour",
      slug: "maritime-heritage-tour",
      description: "Explore Hull's rich maritime history including the docks and museums.",
      duration: "3 hours",
      price: "18.00",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
      bookingUrl: "https://www.visithull.org/tours",
      featured: true
    },
    {
      name: "Humber Bridge Experience",
      slug: "humber-bridge-experience",
      description: "Visit the iconic Humber Bridge and learn about its construction.",
      duration: "2.5 hours",
      price: "15.00",
      imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200",
      bookingUrl: "https://www.visithull.org/tours",
      featured: true
    },
    {
      name: "Museums Quarter Tour",
      slug: "museums-quarter-tour",
      description: "Guided tour of Hull's free museums and galleries.",
      duration: "3.5 hours",
      price: "20.00",
      imageUrl: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=1200",
      bookingUrl: "https://www.visithull.org/tours",
      featured: true
    },
    {
      name: "Food & Drink Walking Tour",
      slug: "food-drink-walking-tour",
      description: "Sample the best of Hull's culinary scene on this delicious walking tour.",
      duration: "3 hours",
      price: "35.00",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
      bookingUrl: "https://www.visithull.org/tours",
      featured: true
    }
  ];
}

function generateBlogPosts(): any[] {
  return [
    {
      title: "Top 10 Things to Do in Hull",
      slug: "top-10-things-to-do-in-hull",
      content: "Hull offers an incredible array of attractions for visitors. From world-class museums to stunning waterfront views, here are our top picks for making the most of your visit to this vibrant city.",
      author: "ExploreHull Team",
      publishedDate: new Date("2024-01-15"),
      category: "Travel Tips",
      featuredImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200",
      featured: true
    },
    {
      title: "Hull's Maritime Heritage: A Journey Through Time",
      slug: "hull-maritime-heritage",
      content: "Discover the rich maritime history that shaped Hull into the city it is today. From fishing trawlers to merchant ships, Hull's connection to the sea runs deep.",
      author: "ExploreHull Team",
      publishedDate: new Date("2024-02-01"),
      category: "History",
      featuredImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
      featured: true
    },
    {
      title: "Best Restaurants in Hull for Foodies",
      slug: "best-restaurants-hull-foodies",
      content: "Hull's dining scene has exploded in recent years. From fine dining to street food, discover the best places to eat in the city.",
      author: "ExploreHull Team",
      publishedDate: new Date("2024-03-10"),
      category: "Food & Drink",
      featuredImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
      featured: true
    },
    {
      title: "A Weekend Guide to Hull",
      slug: "weekend-guide-hull",
      content: "Planning a weekend in Hull? This comprehensive guide covers everything you need to know for a perfect 48 hours in the city.",
      author: "ExploreHull Team",
      publishedDate: new Date("2024-04-05"),
      category: "Travel Tips",
      featuredImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200",
      featured: true
    },
    {
      title: "Free Things to Do in Hull",
      slug: "free-things-to-do-hull",
      content: "Explore Hull on a budget with our guide to the best free attractions, museums, parks, and events in the city.",
      author: "ExploreHull Team",
      publishedDate: new Date("2024-05-20"),
      category: "Budget Travel",
      featuredImage: "/images/ferens_art_gallery.png",
      featured: true
    }
  ];
}

// Run the seed
seedExpandedData().catch(console.error);
