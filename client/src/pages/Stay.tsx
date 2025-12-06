import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { MapPin, ExternalLink, Star, Hotel, Home, Building } from "lucide-react";
import { useState } from "react";

const types = ["All", "Hotel", "B&B", "Apartment", "Guesthouse"];

export default function Stay() {
  const [selectedType, setSelectedType] = useState("All");
  
  const { data: accommodations, isLoading } = trpc.accommodations.list.useQuery();
  
  const filteredAccommodations = selectedType === "All" 
    ? accommodations 
    : accommodations?.filter(a => a.type === selectedType);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Where to Stay in Hull"
        description="Find the perfect accommodation in Hull. Browse hotels, B&Bs, apartments, and guesthouses near Hull's top attractions. Book your stay in Hull today."
        keywords="Hull hotels, Hull accommodation, where to stay Hull, Hull B&B, Hull apartments, Hull lodging, book hotel Hull"
        ogImage="/images/hull_marina_waterfront.png"
      />
      
      <Navigation />

      {/* Hero Section - Modern Redesign */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hull_marina_waterfront.png')" }}
        >
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Where to Stay in Hull
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              Find comfortable accommodation in the heart of Hull, close to all major attractions
            </p>
          </div>
        </div>
      </section>

      {/* Type Filter - Modern Pills */}
      <section className="bg-card border-b sticky top-[73px] z-40 shadow-sm">
        <div className="container py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={`rounded-full whitespace-nowrap transition-all ${
                  selectedType === type 
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm" 
                    : "hover:bg-secondary"
                }`}
                size="sm"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations Grid - Modern Cards */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              {selectedType === "All" ? "All Accommodation" : selectedType}
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredAccommodations?.length || 0} {filteredAccommodations?.length === 1 ? 'property' : 'properties'} found
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
          ) : filteredAccommodations && filteredAccommodations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredAccommodations.map((accommodation) => (
                <Card 
                  key={accommodation.id} 
                  className="overflow-hidden rounded-2xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-medium hover:-translate-y-1 h-full flex flex-col group"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {accommodation.logo ? (
                      <div className="w-full h-full bg-white flex items-center justify-center p-8">
                        <img
                          src={accommodation.logo}
                          alt={`${accommodation.name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <img 
                        src={accommodation.imageUrl || '/images/hull_marina_waterfront.png'} 
                        alt={accommodation.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                      {accommodation.type}
                    </div>
                    {!accommodation.logo && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="space-y-3 flex-1">
                      <h3 className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                        {accommodation.name}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                        {accommodation.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2.5 text-sm">
                      {accommodation.address && (
                        <div className="flex items-start gap-2.5 text-muted-foreground">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{accommodation.address}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-sm font-semibold text-foreground">
                        {accommodation.priceRange}
                      </span>
                      {accommodation.bookingUrl && (
                        <a 
                          href={accommodation.bookingUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-accent font-semibold flex items-center gap-2 text-sm hover:gap-3 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Book Now <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Hotel className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold">No accommodation found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different type to explore more options.
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
