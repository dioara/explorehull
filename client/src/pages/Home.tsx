import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { HullNews } from "@/components/HullNews";
import { WhatsOnToday } from "@/components/WhatsOnToday";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { Link } from "wouter";
import { Calendar, MapPin, Utensils, Hotel, Ship, Search, ArrowRight, Star } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: featuredAttractions, isLoading: attractionsLoading } = trpc.attractions.featured.useQuery({ limit: 6 });
  const { data: upcomingEvents, isLoading: eventsLoading } = trpc.events.upcoming.useQuery({ limit: 4 });
  const { data: featuredRestaurants, isLoading: restaurantsLoading } = trpc.restaurants.featured.useQuery({ limit: 3 });

  return (
    <div className="min-h-screen">
      <SEO
        title="Discover Hull - Your Guide to East Yorkshire's Maritime City"
        description="Explore Hull's world-class attractions, vibrant events, and rich maritime heritage. Plan your perfect visit to the UK's City of Culture 2017 with our comprehensive guide."
        keywords="Hull, visit Hull, Hull attractions, Hull events, things to do Hull, Hull tourism, East Yorkshire, City of Culture"
        ogType="website"
      />
      
      <Navigation />
      {/* <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2">
                <Ship className="w-8 h-8 text-[oklch(0.70_0.15_200)]" />
                <span className="text-2xl font-bold text-[oklch(0.25_0.05_240)]">Explore Hull</span>
              </a>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/explore"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Explore</a></Link>
              <Link href="/events"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Events</a></Link>
              <Link href="/eat-drink"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Eat & Drink</a></Link>
              <Link href="/stay"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Stay</a></Link>
              <Link href="/blog"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Blog</a></Link>
            </div>
            
            <Button asChild className="bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)] text-white">
              <Link href="/plan-visit"><a>Plan Your Visit</a></Link>
            </Button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_the_deep.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.25_0.05_240)]/90 to-[oklch(0.25_0.05_240)]/70"></div>
        </div>
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover the Heart of<br />
            <span className="text-[oklch(0.70_0.15_200)]">Maritime England</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            From world-class aquariums to historic landmarks, Hull offers unforgettable experiences for every traveler
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-2 flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-5 h-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search attractions, events, restaurants..." 
                className="border-0 focus-visible:ring-0 text-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button asChild className="bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)]">
              <Link href={`/search?q=${encodeURIComponent(searchQuery)}`}><a>Search</a></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: MapPin, label: "Attractions", href: "/explore", color: "oklch(0.70_0.15_200)" },
              { icon: Calendar, label: "Events", href: "/events", color: "oklch(0.72_0.12_60)" },
              { icon: Utensils, label: "Eat & Drink", href: "/eat-drink", color: "oklch(0.68_0.15_25)" },
              { icon: Hotel, label: "Stay", href: "/stay", color: "oklch(0.25_0.05_240)" },
              { icon: Ship, label: "Maritime Heritage", href: "/maritime", color: "oklch(0.70_0.15_200)" },
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <a className="flex flex-col items-center gap-3 p-6 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                    <item.icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <span className="font-semibold text-center group-hover:text-[oklch(0.70_0.15_200)] transition-colors">{item.label}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2">Must-See Attractions</h2>
              <p className="text-lg text-muted-foreground">Discover Hull's iconic landmarks and hidden gems</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/explore"><a className="flex items-center gap-2">View All <ArrowRight className="w-4 h-4" /></a></Link>
            </Button>
          </div>
          
          {attractionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAttractions?.map((attraction) => (
                <Link key={attraction.id} href={`/attraction/${attraction.slug}`}>
                  <a>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={attraction.imageUrl || '/images/hull_old_town.png'} 
                          alt={attraction.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {attraction.featured && (
                          <div className="absolute top-3 right-3 bg-[oklch(0.72_0.12_60)] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current" />
                            Featured
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="text-sm text-[oklch(0.70_0.15_200)] font-semibold mb-2">{attraction.category}</div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">{attraction.name}</h3>
                        <p className="text-muted-foreground line-clamp-2">{attraction.description}</p>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2">Upcoming Events</h2>
              <p className="text-lg text-muted-foreground">Experience Hull's vibrant cultural calendar</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/events"><a className="flex items-center gap-2">View All <ArrowRight className="w-4 h-4" /></a></Link>
            </Button>
          </div>
          
          {eventsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents?.map((event) => (
                <Link key={event.id} href={`/event/${event.slug}`}>
                  <a>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48 overflow-hidden flex-shrink-0">
                        <img 
                          src={event.imageUrl || '/images/hull_events_festival.png'} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6 flex-1">
                        <div className="text-sm text-[oklch(0.72_0.12_60)] font-semibold mb-2">{event.category}</div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">{event.title}</h3>
                        <p className="text-muted-foreground line-clamp-2 mb-3">{event.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2">Where to Eat</h2>
              <p className="text-lg text-muted-foreground">Savor Hull's diverse culinary scene</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/eat-drink"><a className="flex items-center gap-2">View All <ArrowRight className="w-4 h-4" /></a></Link>
            </Button>
          </div>
          
          {restaurantsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredRestaurants?.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`}>
                  <a>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={restaurant.imageUrl || '/images/hull_dining_restaurant.png'} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="text-sm text-[oklch(0.68_0.15_25)] font-semibold mb-2">{restaurant.cuisine}</div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">{restaurant.name}</h3>
                        <p className="text-muted-foreground line-clamp-2 mb-3">{restaurant.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{restaurant.priceRange}</span>
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-[oklch(0.25_0.05_240)] to-[oklch(0.35_0.08_220)] text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Get the latest news, events, and exclusive offers delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white text-foreground"
            />
            <Button className="bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)] text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* What's On Today */}
      <WhatsOnToday />

      {/* Latest Hull News */}
      <HullNews />

      {/* Currency Converter & Practical Info */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Plan Your Visit</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <CurrencyConverter />
            <div className="space-y-6">
              <h3 className="text-xl font-bold">First Time in Hull?</h3>
              <p className="text-muted-foreground">
                Hull is a vibrant maritime city with a rich history and modern attractions. Most city center attractions are within walking distance, making it easy to explore on foot.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <div className="font-semibold">Getting Around</div>
                    <div className="text-sm text-muted-foreground">Excellent bus network and bike-friendly city center</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <div className="font-semibold">Best Time to Visit</div>
                    <div className="text-sm text-muted-foreground">Summer (June-August) for festivals, year-round for museums</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <div className="font-semibold">Must-See Attractions</div>
                    <div className="text-sm text-muted-foreground">The Deep, Hull Old Town, Humber Bridge, Maritime Museum</div>
                  </div>
                </div>
              </div>
              <Link href="/travel-info">
                <Button variant="outline" className="w-full">
                  View Full Travel Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
