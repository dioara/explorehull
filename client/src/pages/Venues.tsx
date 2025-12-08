import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { MapPin, Users, Phone, Mail, Globe } from "lucide-react";
import { useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";

const categories = ["All", "Wedding", "Conference", "Corporate", "Party", "Exhibition", "Concert"];

export default function Venues() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { data: venues, isLoading } = trpc.venues.list.useQuery();
  
  // Filter by category
  const filteredVenues = selectedCategory === "All" 
    ? venues 
    : venues?.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Event Venues in Hull"
        description="Discover the perfect venue for your event in Hull. From elegant wedding venues to professional conference centers and corporate event spaces."
        keywords="Hull venues, wedding venues Hull, conference centers Hull, event spaces Hull, corporate venues Hull, party venues Hull"
        ogImage="/images/hull_venues.png"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hull_venues.png')" }}
        >
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Event Venues in Hull
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              From elegant wedding venues to professional conference centers, find the perfect space for your special event
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-card border-b sticky top-[73px] z-40 shadow-sm">
        <div className="container py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category 
                    ? "bg-[oklch(0.68_0.10_55)] hover:bg-[oklch(0.68_0.10_55)]/90 text-white shadow-sm" 
                    : "hover:bg-secondary"
                }`}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              {selectedCategory === "All" ? "All Venues" : `${selectedCategory} Venues`}
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredVenues?.length || 0} {filteredVenues?.length === 1 ? 'venue' : 'venues'} found
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-2xl">
                  <div className="w-full h-64 bg-muted animate-pulse"></div>
                  <CardContent className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredVenues && filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredVenues.map((venue) => (
                <Link key={venue.id} href={`/venue/${venue.slug}`}>
                  <a className="block group">
                    <Card className="overflow-hidden rounded-2xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                      <div className="relative h-64 overflow-hidden">
                        <OptimizedImage 
                          src={venue.imageUrl || '/images/hull_venues.png'} 
                          alt={venue.name}
                          className="group-hover:scale-110 transition-transform duration-500"
                          aspectRatio="16/9"
                        />
                        <div className="absolute top-4 left-4 bg-[oklch(0.68_0.10_55)] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                          {venue.category}
                        </div>
                        {venue.featured && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
                            {venue.name}
                          </h3>
                          <p className="text-muted-foreground mt-2 line-clamp-2 leading-relaxed text-sm">
                            {venue.description}
                          </p>
                        </div>
                        
                        <div className="space-y-2 pt-4 border-t border-border/50">
                          {venue.capacity && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="w-4 h-4 text-accent" />
                              <span>Capacity: {venue.capacity} guests</span>
                            </div>
                          )}
                          
                          {venue.address && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 text-accent" />
                              <span className="line-clamp-1">{venue.address}</span>
                            </div>
                          )}
                          
                          {venue.pricing && (
                            <div className="text-sm font-semibold text-accent">
                              {venue.pricing}
                            </div>
                          )}
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
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold">No venues found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category to explore more venues.
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
