import * as db from "./db";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed Attractions
  const attractionsData = [
    {
      name: "The Deep",
      slug: "the-deep",
      description: "The Deep is one of the UK's most spectacular aquariums, home to over 3,500 fish including sharks, rays, and tropical species. The award-winning building features a stunning underwater tunnel and interactive exhibits that bring the ocean to life.",
      category: "Museums",
      address: "Tower Street, Hull, HU1 4DP",
      latitude: "53.7429",
      longitude: "-0.3323",
      imageUrl: "/images/hero_the_deep.png",
      openingHours: "Daily 10:00 AM - 6:00 PM",
      pricing: "Adults £16.50, Children £12.50, Family tickets available",
      website: "https://www.thedeep.co.uk",
      phone: "01482 381000",
      featured: true,
    },
    {
      name: "Ferens Art Gallery",
      slug: "ferens-art-gallery",
      description: "The Ferens Art Gallery houses an outstanding collection of fine art spanning seven centuries. From Old Masters to contemporary works, the gallery showcases British and European art in a beautiful neoclassical building. Entry is free.",
      category: "Arts & Culture",
      address: "Queen Victoria Square, Hull, HU1 3RA",
      latitude: "53.7439",
      longitude: "-0.3360",
      imageUrl: "/images/ferens_art_gallery.png",
      openingHours: "Monday-Saturday 10:00 AM - 4:30 PM, Sunday 11:00 AM - 4:00 PM",
      pricing: "Free admission",
      website: "https://www.hullcc.gov.uk/ferens",
      phone: "01482 300300",
      featured: true,
    },
    {
      name: "Hull Marina",
      slug: "hull-marina",
      description: "Hull Marina is a vibrant waterfront destination with restaurants, bars, and beautiful views. The marina is home to hundreds of yachts and boats, and the surrounding area features historic buildings, public art, and scenic walking routes.",
      category: "Maritime",
      address: "Hull Marina, Hull, HU1 2DZ",
      latitude: "53.7422",
      longitude: "-0.3294",
      imageUrl: "/images/hull_marina_waterfront.png",
      openingHours: "Open 24 hours",
      pricing: "Free to visit",
      website: "https://www.visithull.org",
      phone: "",
      featured: true,
    },
    {
      name: "Humber Bridge",
      slug: "humber-bridge",
      description: "The iconic Humber Bridge is one of the longest single-span suspension bridges in the world. Visitors can walk or cycle across the bridge, enjoying spectacular views of the Humber estuary. The bridge is particularly stunning at sunset.",
      category: "Don't Miss Experiences",
      address: "Ferriby Road, Hessle, HU13 0LN",
      latitude: "53.7076",
      longitude: "-0.4499",
      imageUrl: "/images/humber_bridge_sunset.png",
      openingHours: "Open 24 hours",
      pricing: "Free for pedestrians and cyclists",
      website: "https://www.humberbridge.co.uk",
      phone: "01482 647161",
      featured: true,
    },
    {
      name: "Hull Old Town",
      slug: "hull-old-town",
      description: "Explore Hull's historic Old Town with its cobbled streets, medieval churches, and Georgian architecture. The area is home to museums, independent shops, cafes, and the famous Humber Street arts quarter.",
      category: "History & Heritage",
      address: "Old Town, Hull, HU1",
      latitude: "53.7430",
      longitude: "-0.3350",
      imageUrl: "/images/hull_old_town.png",
      openingHours: "Open 24 hours",
      pricing: "Free to explore",
      website: "https://www.visithull.org",
      phone: "",
      featured: true,
    },
    {
      name: "Streetlife Museum",
      slug: "streetlife-museum",
      description: "Step back in time at the Streetlife Museum of Transport, featuring historic vehicles, recreated Victorian streets, and interactive exhibits. Perfect for families, this free museum brings Hull's transport heritage to life.",
      category: "Family Friendly",
      address: "High Street, Hull, HU1 1PS",
      latitude: "53.7445",
      longitude: "-0.3365",
      imageUrl: "/images/streetlife_museum.png",
      openingHours: "Monday-Saturday 10:00 AM - 4:30 PM, Sunday 11:00 AM - 4:00 PM",
      pricing: "Free admission",
      website: "https://www.hullcc.gov.uk/museums",
      phone: "01482 300300",
      featured: true,
    },
  ];

  for (const attraction of attractionsData) {
    await db.createAttraction(attraction);
  }

  // Seed Events
  const eventsData = [
    {
      title: "Hull Freedom Festival",
      slug: "hull-freedom-festival",
      description: "Hull's biggest annual celebration featuring street performances, live music, art installations, and spectacular outdoor shows. This free festival transforms the city center into a vibrant cultural playground.",
      category: "Festival",
      startDate: new Date("2025-09-05T10:00:00Z"),
      endDate: new Date("2025-09-07T22:00:00Z"),
      location: "Hull City Centre",
      imageUrl: "/images/hull_events_festival.png",
      ticketUrl: "",
      price: "Free",
      featured: true,
    },
    {
      title: "Christmas Markets",
      slug: "hull-christmas-markets",
      description: "Experience the magic of Christmas at Hull's festive markets, featuring artisan crafts, seasonal food and drink, and family entertainment. The perfect way to get into the holiday spirit.",
      category: "Festival",
      startDate: new Date("2025-11-28T10:00:00Z"),
      endDate: new Date("2025-12-23T20:00:00Z"),
      location: "Queen Victoria Square",
      imageUrl: "/images/hull_events_festival.png",
      ticketUrl: "",
      price: "Free entry",
      featured: true,
    },
  ];

  for (const event of eventsData) {
    await db.createEvent(event);
  }

  // Seed Restaurants
  const restaurantsData = [
    {
      name: "1884 Dock Street Kitchen",
      slug: "1884-dock-street-kitchen",
      description: "A contemporary restaurant and wine bar located in Hull Marina, offering modern British cuisine with stunning waterfront views. The menu features locally sourced ingredients and an extensive wine list.",
      cuisine: "British",
      address: "Humber Dock Street, Hull, HU1 1TB",
      latitude: "53.7425",
      longitude: "-0.3290",
      priceRange: "£££",
      imageUrl: "/images/hull_dining_restaurant.png",
      website: "https://www.1884dockstreetkitchen.co.uk",
      phone: "01482 222260",
      featured: true,
    },
    {
      name: "Hitchcocks Vegetarian Restaurant",
      slug: "hitchcocks-vegetarian",
      description: "Award-winning vegetarian and vegan restaurant in the heart of Hull. Hitchcocks offers creative plant-based dishes in a relaxed, welcoming atmosphere.",
      cuisine: "Vegetarian",
      address: "1 Bishop Lane, Hull, HU1 1PA",
      latitude: "53.7440",
      longitude: "-0.3355",
      priceRange: "££",
      imageUrl: "/images/hull_dining_restaurant.png",
      website: "https://www.hitchcocksrestaurant.co.uk",
      phone: "01482 320233",
      featured: true,
    },
  ];

  for (const restaurant of restaurantsData) {
    await db.createRestaurant(restaurant);
  }

  // Seed Accommodations
  const accommodationsData = [
    {
      name: "DoubleTree by Hilton Hull",
      slug: "doubletree-hull",
      description: "Modern hotel in the heart of Hull city center, offering comfortable rooms, an on-site restaurant, and easy access to all major attractions.",
      type: "Hotel",
      address: "Ferensway, Hull, HU2 8LN",
      latitude: "53.7450",
      longitude: "-0.3380",
      priceRange: "££",
      imageUrl: "/images/hull_marina_waterfront.png",
      bookingUrl: "https://www.hilton.com",
      phone: "01482 380100",
      featured: true,
    },
  ];

  for (const accommodation of accommodationsData) {
    await db.createAccommodation(accommodation);
  }

  // Seed Tours
  const toursData = [
    {
      name: "Hull Old Town Walking Tour",
      slug: "hull-old-town-walking-tour",
      description: "Discover Hull's rich history on this guided walking tour through the Old Town. Learn about medieval merchants, maritime heritage, and the city's role in British history.",
      duration: "2 hours",
      price: "£12 per person",
      imageUrl: "/images/hull_old_town.png",
      bookingUrl: "https://www.visithull.org",
      featured: true,
    },
  ];

  for (const tour of toursData) {
    await db.createTour(tour);
  }

  // Seed Blog Posts
  const blogPostsData = [
    {
      title: "Top 10 Things to Do in Hull",
      slug: "top-10-things-to-do-in-hull",
      content: "Hull is a city full of surprises, from world-class museums to stunning waterfront views. Here are our top 10 must-see attractions and experiences...",
      excerpt: "Discover the best attractions and experiences Hull has to offer, from The Deep to the historic Old Town.",
      author: "Explore Hull Team",
      category: "Travel Guides",
      featuredImage: "/images/hull_old_town.png",
      featured: true,
      publishedAt: new Date("2025-01-15T10:00:00Z"),
    },
    {
      title: "Hull's Maritime Heritage: A Journey Through Time",
      slug: "hull-maritime-heritage",
      content: "Hull's history is deeply intertwined with the sea. From its medieval origins as a port town to its role in the fishing industry, discover the maritime heritage that shaped this remarkable city...",
      excerpt: "Explore Hull's rich maritime history and discover the seafaring traditions that made the city what it is today.",
      author: "Explore Hull Team",
      category: "History",
      featuredImage: "/images/hull_marina_waterfront.png",
      featured: true,
      publishedAt: new Date("2025-02-01T10:00:00Z"),
    },
  ];

  for (const post of blogPostsData) {
    await db.createBlogPost(post);
  }

  console.log("✅ Database seeded successfully!");
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
