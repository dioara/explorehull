import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { MapPin, Clock, DollarSign, ExternalLink, Star, Grid3x3, List } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Museums", "Arts & Culture", "Maritime", "History & Heritage", "Family Friendly", "Don't Miss Experiences"];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
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

          {isLoading ? (
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
              {filteredAttractions.map((attraction) => (
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
