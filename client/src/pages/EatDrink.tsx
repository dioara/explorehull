import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { MapPin, ExternalLink, Phone, Star, Utensils } from "lucide-react";
import { useState } from "react";

const cuisines = ["All", "British", "Italian", "Asian", "Indian", "Vegetarian", "Seafood", "International"];

export default function EatDrink() {
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  
  const { data: restaurants, isLoading } = trpc.restaurants.list.useQuery();
  
  const filteredRestaurants = selectedCuisine === "All" 
    ? restaurants 
    : restaurants?.filter(r => r.cuisine === selectedCuisine);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Eat & Drink in Hull"
        description="Discover Hull's diverse culinary scene. From traditional British pubs to international cuisine, find the perfect dining experience in Hull's restaurants, cafes, and bars."
        keywords="Hull restaurants, dining in Hull, Hull food, where to eat Hull, Hull cafes, Hull bars, Hull cuisine"
        ogImage="/images/hull_dining_restaurant.png"
      />
      
      <Navigation />

      {/* Hero Section - Modern Redesign */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hull_dining_restaurant.png')" }}
        >
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Eat & Drink in Hull
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              From waterfront dining to cozy cafes, discover Hull's vibrant food and drink scene
            </p>
          </div>
        </div>
      </section>

      {/* Cuisine Filter - Modern Pills */}
      <section className="bg-card border-b sticky top-[73px] z-40 shadow-sm">
        <div className="container py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`rounded-full whitespace-nowrap transition-all ${
                  selectedCuisine === cuisine 
                    ? "bg-[oklch(0.70_0.12_30)] hover:bg-[oklch(0.70_0.12_30)]/90 text-white shadow-sm" 
                    : "hover:bg-secondary"
                }`}
                size="sm"
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Grid - Modern Cards */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              {selectedCuisine === "All" ? "All Restaurants" : `${selectedCuisine} Cuisine`}
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredRestaurants?.length || 0} {filteredRestaurants?.length === 1 ? 'restaurant' : 'restaurants'} found
            </p>
          </div>

          {isLoading ? (
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
          ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredRestaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`}>
                  <a className="block group">
                    <Card className="overflow-hidden rounded-2xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-medium hover:-translate-y-1 h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden bg-muted">
                        {restaurant.logo ? (
                          <div className="w-full h-full bg-white flex items-center justify-center p-8">
                            <img 
                              src={restaurant.logo} 
                              alt={`${restaurant.name} logo`}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <img 
                            src={restaurant.imageUrl || '/images/hull_dining_restaurant.png'} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute top-4 left-4 bg-[oklch(0.70_0.12_30)] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                          {restaurant.cuisine}
                        </div>
                        {!restaurant.logo && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col space-y-4">
                        <div className="space-y-3 flex-1">
                          <h3 className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                            {restaurant.name}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                            {restaurant.description}
                          </p>
                        </div>
                        
                        <div className="space-y-2.5 text-sm">
                          {restaurant.address && (
                            <div className="flex items-start gap-2.5 text-muted-foreground">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{restaurant.address}</span>
                            </div>
                          )}
                          {restaurant.phone && (
                            <div className="flex items-start gap-2.5 text-muted-foreground">
                              <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <a 
                                href={`tel:${restaurant.phone}`} 
                                className="hover:text-accent transition-colors line-clamp-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {restaurant.phone}
                              </a>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <span className="text-sm font-semibold text-foreground">
                            {restaurant.priceRange}
                          </span>
                          <span className="text-accent font-semibold flex items-center gap-2 text-sm">
                            View Menu <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Utensils className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold">No restaurants found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different cuisine to explore more dining options.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
