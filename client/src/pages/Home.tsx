import { trpc } from "@/lib/trpc";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { HullNews } from "@/components/HullNews";
import { WhatsOnToday } from "@/components/WhatsOnToday";
import { CurrencyConverter } from "@/components/CurrencyConverter";

import { AdBanner } from "@/components/AdSense";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { Link } from "wouter";
import { Calendar, MapPin, Utensils, Hotel, Ship, ArrowRight, Star, Clock } from "lucide-react";

export default function Home() {
  
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

      {/* Hero Section - Modern Redesign */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_the_deep.png')" }}
        >
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        <div className="container relative z-10 text-center text-white px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fade-in">
              Discover the Heart of
              <span className="block mt-2 bg-gradient-to-r from-[oklch(0.65_0.12_195)] to-[oklch(0.68_0.10_55)] bg-clip-text text-transparent">
                Maritime England
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-white/90 font-light">
              From world-class aquariums to historic landmarks, Hull offers unforgettable experiences for every traveler
            </p>
            
            {/* Modern Search Bar with Autocomplete */}
            <SearchAutocomplete className="max-w-3xl mx-auto mt-12" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Quick Links - Refined Design */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { icon: MapPin, label: "Attractions", href: "/explore", color: "oklch(0.65_0.12_195)" },
              { icon: Calendar, label: "Events", href: "/events", color: "oklch(0.68_0.10_55)" },
              { icon: Utensils, label: "Eat & Drink", href: "/eat-drink", color: "oklch(0.70_0.12_30)" },
              { icon: Hotel, label: "Stay", href: "/stay", color: "oklch(0.22_0.04_240)" },
              { icon: Ship, label: "Maritime Heritage", href: "/maritime", color: "oklch(0.65_0.12_195)" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="card-modern flex flex-col items-center gap-4 p-6 md:p-8 group">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" 
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="w-7 h-7 md:w-8 md:h-8" style={{ color: item.color }} />
                  </div>
                  <span className="font-semibold text-center text-sm md:text-base group-hover:text-accent transition-colors">
                    {item.label}
                  </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Attractions - Modern Grid */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold">Must-See Attractions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover Hull's iconic landmarks and hidden gems
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="rounded-xl self-start md:self-auto">
              <Link href="/explore" className="flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          {attractionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-2xl">
                  <div className="h-64 bg-muted animate-pulse"></div>
                  <CardContent className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredAttractions?.map((attraction) => (
                <Link key={attraction.id} href={`/attraction/${attraction.slug}`} className="block group">
                    <Card className="overflow-hidden rounded-2xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                      <div className="relative h-64 overflow-hidden">
                        <OptimizedImage
                          src={attraction.imageUrl || '/images/hull_old_town.png'}
                          alt={attraction.name}
                          className="group-hover:scale-110 transition-transform duration-500"
                          aspectRatio="4/3"
                        />
                        {attraction.featured && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-[oklch(0.68_0.10_55)] to-[oklch(0.70_0.12_30)] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-md">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            Featured
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <div className="text-sm text-accent font-semibold uppercase tracking-wide">
                          {attraction.category}
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
                          {attraction.name}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                          {attraction.description}
                        </p>
                      </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ad - After Featured Attractions */}
      <div className="container py-8">
        <AdBanner />
      </div>

      {/* Upcoming Events - Horizontal Cards */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold">Upcoming Events</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Experience Hull's vibrant cultural calendar
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="rounded-xl self-start md:self-auto">
              <Link href="/events" className="flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          {eventsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-2xl">
                  <div className="h-56 bg-muted animate-pulse"></div>
                  <CardContent className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {upcomingEvents?.map((event) => (
                <Link key={event.id} href={`/event/${event.slug}`} className="block group">
                    <Card className="overflow-hidden rounded-2xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-medium hover:-translate-y-1 flex flex-col md:flex-row h-full">
                      <div className="relative w-full md:w-56 h-56 md:h-auto overflow-hidden flex-shrink-0">
                        <OptimizedImage
                          src={event.imageUrl || '/images/hull_events_festival.png'}
                          alt={event.title}
                          className="group-hover:scale-110 transition-transform duration-500"
                          aspectRatio="1/1"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="text-sm text-[oklch(0.68_0.10_55)] font-semibold uppercase tracking-wide">
                            {event.category}
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium">
                            {new Date(event.startDate).toLocaleDateString('en-GB', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Restaurants - Modern Grid */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold">Where to Eat</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Savor Hull's diverse culinary scene
              </p>
            </div>
             <Button asChild variant="outline" size="lg" className="rounded-xl self-start md:self-auto">
              <Link href="/eat-drink" className="flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          {restaurantsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-2xl">
                  <div className="h-64 bg-muted animate-pulse"></div>
                  <CardContent className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {featuredRestaurants?.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`} className="block group">
                    <Card className="overflow-hidden rounded-2xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                      <div className="relative h-64 overflow-hidden">
                        <OptimizedImage
                          src={restaurant.imageUrl || '/images/hull_dining_restaurant.png'}
                          alt={restaurant.name}
                          className="group-hover:scale-110 transition-transform duration-500"
                          aspectRatio="4/3"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-6 space-y-3">
                        <div className="text-sm text-[oklch(0.70_0.12_30)] font-semibold uppercase tracking-wide">
                          {restaurant.cuisine}
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
                          {restaurant.name}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                          {restaurant.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-semibold text-foreground">
                            {restaurant.priceRange}
                          </span>
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What's On Today */}
      <WhatsOnToday />

      {/* Hull News */}
      <HullNews />

      {/* Newsletter CTA - Modern Design */}
      <section className="py-20 bg-gradient-to-br from-primary via-[oklch(0.28_0.05_230)] to-[oklch(0.32_0.06_220)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[oklch(0.68_0.10_55)] rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Stay in the Loop</h2>
              <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto">
                Get the latest news, events, and exclusive offers delivered straight to your inbox
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/90 text-foreground border-0 rounded-xl flex-1"
                />
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-xl px-8 shadow-sm"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad - Before Interactive Tools */}
      <div className="container py-8">
        <AdBanner />
      </div>

      {/* Interactive Tools Section */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Currency Converter */}
          <CurrencyConverter />
          

        </div>
      </section>

      <Footer />
    </div>
  );
}
