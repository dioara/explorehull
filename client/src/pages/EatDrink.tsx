import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { MapPin, ExternalLink, Phone, Star } from "lucide-react";
import { useState } from "react";

const cuisines = ["All", "British", "Italian", "Asian", "Indian", "Vegetarian", "Seafood", "International"];

export default function EatDrink() {
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  
  const { data: restaurants, isLoading } = trpc.restaurants.list.useQuery();
  
  const filteredRestaurants = selectedCuisine === "All" 
    ? restaurants 
    : restaurants?.filter(r => r.cuisine === selectedCuisine);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Eat & Drink in Hull"
        description="Discover Hull's diverse culinary scene. From traditional British pubs to international cuisine, find the perfect dining experience in Hull's restaurants, cafes, and bars."
        keywords="Hull restaurants, dining in Hull, Hull food, where to eat Hull, Hull cafes, Hull bars, Hull cuisine"
        ogImage="/images/hull_dining_restaurant.png"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hull_dining_restaurant.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.25_0.05_240)]/85 to-[oklch(0.25_0.05_240)]/65"></div>
        </div>
        
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Eat & Drink in Hull</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
            From waterfront dining to cozy cafes, discover Hull's vibrant food and drink scene
          </p>
        </div>
      </section>

      {/* Cuisine Filter */}
      <section className="bg-white border-b sticky top-[73px] z-40">
        <div className="container py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                onClick={() => setSelectedCuisine(cuisine)}
                className={selectedCuisine === cuisine ? "bg-[oklch(0.68_0.15_25)] hover:bg-[oklch(0.65_0.15_25)]" : ""}
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCuisine === "All" ? "All Restaurants" : `${selectedCuisine} Cuisine`}
            </h2>
            <p className="text-muted-foreground">
              {filteredRestaurants?.length || 0} {filteredRestaurants?.length === 1 ? 'restaurant' : 'restaurants'} found
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`}>
                  <a>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={restaurant.imageUrl || '/images/hull_dining_restaurant.png'} 
                          alt={`${restaurant.name} - ${restaurant.cuisine} restaurant in Hull`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {restaurant.featured && (
                          <div className="absolute top-3 right-3 bg-[oklch(0.72_0.12_60)] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current" />
                            Featured
                          </div>
                        )}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[oklch(0.68_0.15_25)] px-3 py-1 rounded-full text-sm font-semibold">
                          {restaurant.cuisine}
                        </div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">
                          {restaurant.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {restaurant.description}
                        </p>
                        
                        <div className="space-y-2 text-sm">
                          {restaurant.address && (
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{restaurant.address}</span>
                            </div>
                          )}
                          {restaurant.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-4 h-4 flex-shrink-0" />
                              <span>{restaurant.phone}</span>
                            </div>
                          )}
                          {restaurant.priceRange && (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[oklch(0.68_0.15_25)]">{restaurant.priceRange}</span>
                              <span className="text-xs text-muted-foreground">Price Range</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <span className="text-[oklch(0.70_0.15_200)] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Details <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No restaurants found for this cuisine.</p>
            </div>
          )}
        </div>
      </section>

      {/* Dining Tips */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Dining in Hull</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[oklch(0.70_0.15_200)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[oklch(0.70_0.15_200)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Waterfront Dining</h3>
              <p className="text-muted-foreground">
                Enjoy stunning marina views at Hull's waterfront restaurants and bars
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[oklch(0.72_0.12_60)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[oklch(0.72_0.12_60)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Specialties</h3>
              <p className="text-muted-foreground">
                Try traditional Yorkshire puddings, fresh seafood, and locally sourced produce
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[oklch(0.68_0.15_25)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-[oklch(0.68_0.15_25)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Booking Ahead</h3>
              <p className="text-muted-foreground">
                Popular restaurants fill up quickly, especially on weekends - book in advance
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
