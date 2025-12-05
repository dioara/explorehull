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
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Where to Stay in Hull"
        description="Find the perfect accommodation in Hull. Browse hotels, B&Bs, apartments, and guesthouses near Hull's top attractions. Book your stay in Hull today."
        keywords="Hull hotels, Hull accommodation, where to stay Hull, Hull B&B, Hull apartments, Hull lodging, book hotel Hull"
        ogImage="/images/hull_marina_waterfront.png"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hull_marina_waterfront.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.25_0.05_240)]/85 to-[oklch(0.25_0.05_240)]/65"></div>
        </div>
        
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Where to Stay in Hull</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
            Find comfortable accommodation in the heart of Hull, close to all major attractions
          </p>
        </div>
      </section>

      {/* Type Filter */}
      <section className="bg-white border-b sticky top-[73px] z-40">
        <div className="container py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={selectedType === type ? "bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)]" : ""}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {selectedType === "All" ? "All Accommodation" : selectedType}
            </h2>
            <p className="text-muted-foreground">
              {filteredAccommodations?.length || 0} {filteredAccommodations?.length === 1 ? 'property' : 'properties'} found
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
          ) : filteredAccommodations && filteredAccommodations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map((accommodation) => (
                <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={accommodation.imageUrl || '/images/hull_marina_waterfront.png'} 
                      alt={`${accommodation.name} - ${accommodation.type} in Hull`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {accommodation.featured && (
                      <div className="absolute top-3 right-3 bg-[oklch(0.72_0.12_60)] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Featured
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[oklch(0.70_0.15_200)] px-3 py-1 rounded-full text-sm font-semibold">
                      {accommodation.type}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">
                      {accommodation.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {accommodation.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      {accommodation.address && (
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{accommodation.address}</span>
                        </div>
                      )}
                      {accommodation.priceRange && (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[oklch(0.70_0.15_200)]">{accommodation.priceRange}</span>
                          <span className="text-xs text-muted-foreground">per night</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      {accommodation.bookingUrl ? (
                        <a 
                          href={accommodation.bookingUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[oklch(0.70_0.15_200)] font-semibold hover:gap-3 transition-all"
                        >
                          Book Now <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-[oklch(0.70_0.15_200)] font-semibold flex items-center gap-2">
                          View Details <ExternalLink className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No accommodation found for this type.</p>
            </div>
          )}
        </div>
      </section>

      {/* Accommodation Tips */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Stay in Hull?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[oklch(0.70_0.15_200)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="w-8 h-8 text-[oklch(0.70_0.15_200)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Central Location</h3>
              <p className="text-muted-foreground">
                Stay close to Hull's top attractions, restaurants, and entertainment venues
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[oklch(0.72_0.12_60)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-[oklch(0.72_0.12_60)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Great Value</h3>
              <p className="text-muted-foreground">
                Hull offers excellent accommodation at competitive prices compared to other UK cities
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[oklch(0.68_0.15_25)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-[oklch(0.68_0.15_25)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Access</h3>
              <p className="text-muted-foreground">
                Well-connected by road and rail, with parking available at most properties
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
