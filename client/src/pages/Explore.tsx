import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { MapPin, Clock, DollarSign, ExternalLink, Star, Ship } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Museums", "Arts & Culture", "Maritime", "History & Heritage", "Family Friendly", "Don't Miss Experiences"];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { data: attractions, isLoading } = trpc.attractions.list.useQuery();
  
  const filteredAttractions = selectedCategory === "All" 
    ? attractions 
    : attractions?.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2">
                <Ship className="w-8 h-8 text-[oklch(0.70_0.15_200)]" />
                <span className="text-2xl font-bold text-[oklch(0.25_0.05_240)]">Explore Hull</span>
              </a>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/explore"><a className="text-[oklch(0.70_0.15_200)] font-semibold">Explore</a></Link>
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
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[oklch(0.25_0.05_240)] to-[oklch(0.35_0.08_220)] text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Explore Hull</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Discover world-class museums, stunning architecture, and unforgettable experiences in one of England's most vibrant maritime cities
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-[73px] z-40">
        <div className="container py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)]" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "All" ? "All Attractions" : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredAttractions?.length || 0} {filteredAttractions?.length === 1 ? 'attraction' : 'attractions'} found
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
          ) : filteredAttractions && filteredAttractions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.map((attraction) => (
                <Link key={attraction.id} href={`/attraction/${attraction.slug}`}>
                  <a>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
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
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[oklch(0.70_0.15_200)] px-3 py-1 rounded-full text-sm font-semibold">
                          {attraction.category}
                        </div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">
                          {attraction.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {attraction.description}
                        </p>
                        
                        <div className="space-y-2 text-sm">
                          {attraction.address && (
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{attraction.address}</span>
                            </div>
                          )}
                          {attraction.openingHours && (
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{attraction.openingHours}</span>
                            </div>
                          )}
                          {attraction.pricing && (
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <DollarSign className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{attraction.pricing}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <span className="text-[oklch(0.70_0.15_200)] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
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
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No attractions found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.25_0.05_240)] text-white py-12 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Ship className="w-6 h-6 text-[oklch(0.70_0.15_200)]" />
                <span className="text-xl font-bold">Explore Hull</span>
              </div>
              <p className="text-gray-300">Your guide to discovering the best of Hull's attractions, events, and experiences.</p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/explore"><a className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Attractions</a></Link></li>
                <li><Link href="/events"><a className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Events</a></Link></li>
                <li><Link href="/eat-drink"><a className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Eat & Drink</a></Link></li>
                <li><Link href="/stay"><a className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Stay</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Discover</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/maritime"><a className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Maritime Heritage</a></Link></li>
                <li><Link href="/blog"><a className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Blog</a></Link></li>
                <li><Link href="/travel-info"><a className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Travel Info</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/contact"><a className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Contact Us</a></Link></li>
                <li><a href="#" className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[oklch(0.70_0.15_200)] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Explore Hull. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
