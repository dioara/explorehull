import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { MapPin, Clock, DollarSign, ExternalLink, Star, Grid3x3, List, Map as MapIcon } from "lucide-react";
import { useState, useRef } from "react";
import { MapView } from "@/components/Map";
import { AdSquare } from "@/components/AdSense";

const categories = ["All", "Museums", "Arts & Culture", "Maritime", "History & Heritage", "Family Friendly", "Don't Miss Experiences"];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const { data: attractions, isLoading } = trpc.attractions.list.useQuery();
  
  const filteredAttractions = selectedCategory === "All" 
    ? attractions 
    : attractions?.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Explore Hull Attractions"
        description="Discover Hull's top attractions including The Deep, museums, historic sites, and family-friendly activities. Find opening hours, prices, and visitor information."
        keywords="Hull attractions, things to do Hull, Hull museums, The Deep Hull, Hull Old Town, Hull landmarks"
        ogImage="/images/hero_the_deep.png"
      />
      
      <Navigation />

      {/* Hero Section - Modern Redesign */}
      <section className="relative bg-gradient-to-br from-primary via-[oklch(0.28_0.05_230)] to-[oklch(0.32_0.06_220)] text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[oklch(0.68_0.10_55)] rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Explore Hull
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              Discover world-class museums, stunning architecture, and unforgettable experiences in one of England's most vibrant maritime cities
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Modern Pills */}
      <section className="bg-card border-b sticky top-[73px] z-40 shadow-sm">
        <div className="container py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category 
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm" 
                      : "hover:bg-secondary"
                  }`}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex gap-1 bg-secondary rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-md ${viewMode === "grid" ? "bg-background shadow-sm" : ""}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-md ${viewMode === "list" ? "bg-background shadow-sm" : ""}`}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("map")}
                className={`rounded-md ${viewMode === "map" ? "bg-background shadow-sm" : ""}`}
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Grid/List */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              {selectedCategory === "All" ? "All Attractions" : selectedCategory}
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredAttractions?.length || 0} {filteredAttractions?.length === 1 ? 'attraction' : 'attractions'} found
            </p>
          </div>

          {viewMode === "map" ? (
            <div className="space-y-6">
              <MapView
                className="w-full h-[600px] rounded-2xl overflow-hidden shadow-medium"
                initialCenter={{ lat: 53.7457, lng: -0.3367 }}
                initialZoom={13}
                onMapReady={(map) => {
                  mapRef.current = map;
                  
                  // Add markers for all filtered attractions
                  filteredAttractions?.forEach((attraction) => {
                    if (attraction.latitude && attraction.longitude) {
                      const marker = new google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: { lat: Number(attraction.latitude), lng: Number(attraction.longitude) },
                        title: attraction.name,
                      });

                      // Create info window
                      const infoWindow = new google.maps.InfoWindow({
                        content: `
                          <div style="padding: 12px; max-width: 280px;">
                            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${attraction.name}</h3>
                            <p style="color: #666; font-size: 14px; margin-bottom: 8px;">${attraction.description.substring(0, 100)}...</p>
                            <div style="display: flex; align-items: center; gap: 6px; color: #888; font-size: 13px; margin-bottom: 8px;">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              <span>${attraction.address || 'Hull, UK'}</span>
                            </div>
                            <a href="/attraction/${attraction.slug}" style="display: inline-block; background: #0891b2; color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">View Details</a>
                          </div>
                        `,
                      });

                      marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                      });
                    }
                  });
                }}
              />
              
              {/* Attraction List Below Map */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAttractions?.map((attraction) => (
                  <Link key={attraction.id} href={`/attraction/${attraction.slug}`}>
                    <a className="block">
                      <Card className="overflow-hidden rounded-xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-sm h-full">
                        <div className="flex gap-4 p-4">
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            <img 
                              src={attraction.imageUrl || '/images/hull_old_town.png'} 
                              alt={attraction.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base mb-1 line-clamp-1">{attraction.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{attraction.description}</p>
                            {attraction.address && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                <span className="line-clamp-1">{attraction.address}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ) : isLoading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" : "space-y-6"}>
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-2xl">
                  <div className={viewMode === "grid" ? "h-64" : "h-48"}>
                    <div className="w-full h-full bg-muted animate-pulse"></div>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredAttractions && filteredAttractions.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" : "space-y-6"}>
              {filteredAttractions.map((attraction, index) => (
                <>
                  {/* Show ad after every 9 attractions */}
                  {index > 0 && index % 9 === 0 && viewMode === "grid" && (
                    <div className="col-span-full">
                      <AdSquare />
                    </div>
                  )}
                  {index > 0 && index % 9 === 0 && viewMode === "list" && (
                    <AdSquare />
                  )}
                <Link key={attraction.id} href={`/attraction/${attraction.slug}`}>
                  <a className="block group">
                    <Card className={`overflow-hidden rounded-2xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-medium hover:-translate-y-1 h-full ${
                      viewMode === "list" ? "flex flex-col md:flex-row" : ""
                    }`}>
                      <div className={`relative overflow-hidden bg-muted ${
                        viewMode === "grid" ? "h-64" : "w-full md:w-80 h-56 md:h-auto flex-shrink-0"
                      }`}>
                        <img 
                          src={attraction.imageUrl || '/images/hull_old_town.png'} 
                          alt={attraction.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {attraction.featured && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-[oklch(0.68_0.10_55)] to-[oklch(0.70_0.12_30)] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-md">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            Featured
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-accent px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                          {attraction.category}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className={`p-6 flex flex-col ${viewMode === "list" ? "flex-1" : ""}`}>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                          {attraction.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 leading-relaxed">
                          {attraction.description}
                        </p>
                        
                        <div className="space-y-2.5 text-sm mb-4">
                          {attraction.address && (
                            <div className="flex items-start gap-2.5 text-muted-foreground">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{attraction.address}</span>
                            </div>
                          )}
                          {attraction.openingHours && (
                            <div className="flex items-start gap-2.5 text-muted-foreground">
                              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{attraction.openingHours}</span>
                            </div>
                          )}
                          {attraction.pricing && (
                            <div className="flex items-start gap-2.5 text-muted-foreground">
                              <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{attraction.pricing}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="pt-4 border-t border-border/50">
                          <span className="text-accent font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                            Learn More <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
                </>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold">No attractions found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category to explore more attractions.
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
