import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Calendar, Utensils, Hotel, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function SearchResults() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const initialQuery = searchParams.get('q') || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all");

  const { data: searchResults, isLoading } = trpc.search.query.useQuery(
    { q: searchQuery },
    { enabled: searchQuery.length > 0 }
  );

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`Search Results for "${searchQuery}" - Explore Hull`}
        description={`Find attractions, events, restaurants, and accommodations in Hull matching "${searchQuery}"`}
        keywords={`Hull search, ${searchQuery}, Hull attractions, Hull events`}
      />
      
      <Navigation />

      <main className="flex-1 bg-gray-50">
        {/* Search Header */}
        <section className="bg-[oklch(0.25_0.05_240)] text-white py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-6">Search Results</h1>
            
            {/* Search Bar */}
            <div className="max-w-2xl bg-white rounded-lg shadow-lg p-2 flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="w-5 h-5 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search attractions, events, restaurants..." 
                  className="border-0 focus-visible:ring-0 text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button 
                className="bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)]"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : !searchQuery ? (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Start Your Search</h2>
                <p className="text-muted-foreground">Enter a search term to find attractions, events, and more in Hull</p>
              </div>
            ) : searchResults && (searchResults.attractions.length > 0 || searchResults.events.length > 0 || searchResults.restaurants.length > 0 || searchResults.accommodations.length > 0) ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-8">
                  <TabsTrigger value="all">
                    All Results ({(searchResults.attractions.length + searchResults.events.length + searchResults.restaurants.length + searchResults.accommodations.length)})
                  </TabsTrigger>
                  <TabsTrigger value="attractions">
                    Attractions ({searchResults.attractions.length})
                  </TabsTrigger>
                  <TabsTrigger value="events">
                    Events ({searchResults.events.length})
                  </TabsTrigger>
                  <TabsTrigger value="restaurants">
                    Restaurants ({searchResults.restaurants.length})
                  </TabsTrigger>
                  <TabsTrigger value="accommodations">
                    Accommodations ({searchResults.accommodations.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-8">
                  {searchResults.attractions.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        Attractions
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.attractions.map((attraction: any) => (
                          <Link key={attraction.id} href={`/attraction/${attraction.slug}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                              <CardContent className="p-0">
                                <div className="relative h-48 overflow-hidden rounded-t-lg">
                                  <img
                                    src={JSON.parse(attraction.images as string)[0]}
                                    alt={attraction.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                                    {attraction.category}
                                  </Badge>
                                </div>
                                <div className="p-4">
                                  <h3 className="font-bold text-lg mb-2">{attraction.name}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                    {attraction.description}
                                  </p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span className="line-clamp-1">{attraction.address}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.events.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6" />
                        Events
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.events.map((event: any) => (
                          <Link key={event.id} href={`/event/${event.slug}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                              <CardContent className="p-0">
                                <div className="relative h-48 overflow-hidden rounded-t-lg">
                                  <img
                                    src={event.image || "/images/hull_events_festival.png"}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                                    {event.category}
                                  </Badge>
                                </div>
                                <div className="p-4">
                                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                    {event.description}
                                  </p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.restaurants.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Utensils className="w-6 h-6" />
                        Restaurants
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.restaurants.map((restaurant: any) => (
                          <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                              <CardContent className="p-0">
                                <div className="relative h-48 overflow-hidden rounded-t-lg">
                                  <img
                                    src={JSON.parse(restaurant.images as string)[0]}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                                    {restaurant.cuisine}
                                  </Badge>
                                </div>
                                <div className="p-4">
                                  <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                    {restaurant.description}
                                  </p>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{restaurant.priceRange}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.accommodations.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Hotel className="w-6 h-6" />
                        Accommodations
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchResults.accommodations.map((accommodation: any) => (
                          <Card key={accommodation.id} className="hover:shadow-lg transition-shadow h-full">
                            <CardContent className="p-0">
                              <div className="relative h-48 overflow-hidden rounded-t-lg">
                                <img
                                  src={JSON.parse(accommodation.images as string)[0]}
                                  alt={accommodation.name}
                                  className="w-full h-full object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                                  {accommodation.type}
                                </Badge>
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{accommodation.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                  {accommodation.description}
                                </p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">{accommodation.priceRange}</span>
                                  {accommodation.bookingUrl && (
                                    <Button size="sm" asChild>
                                      <a href={accommodation.bookingUrl} target="_blank" rel="noopener noreferrer">
                                        Book Now
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="attractions">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.attractions.map((attraction: any) => (
                      <Link key={attraction.id} href={`/attraction/${attraction.slug}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <CardContent className="p-0">
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                              <img
                                src={JSON.parse(attraction.images as string)[0]}
                                alt={attraction.name}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                                {attraction.category}
                              </Badge>
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-lg mb-2">{attraction.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {attraction.description}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span className="line-clamp-1">{attraction.address}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="events">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.events.map((event: any) => (
                      <Link key={event.id} href={`/event/${event.slug}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <CardContent className="p-0">
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                              <img
                                src={event.image || "/images/hull_events_festival.png"}
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                                {event.category}
                              </Badge>
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {event.description}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(event.startDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="restaurants">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.restaurants.map((restaurant: any) => (
                      <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <CardContent className="p-0">
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                              <img
                                src={JSON.parse(restaurant.images as string)[0]}
                                alt={restaurant.name}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                                {restaurant.cuisine}
                              </Badge>
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {restaurant.description}
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{restaurant.priceRange}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="accommodations">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.accommodations.map((accommodation: any) => (
                      <Card key={accommodation.id} className="hover:shadow-lg transition-shadow h-full">
                        <CardContent className="p-0">
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <img
                              src={JSON.parse(accommodation.images as string)[0]}
                              alt={accommodation.name}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                              {accommodation.type}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">{accommodation.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {accommodation.description}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{accommodation.priceRange}</span>
                              {accommodation.bookingUrl && (
                                <Button size="sm" asChild>
                                  <a href={accommodation.bookingUrl} target="_blank" rel="noopener noreferrer">
                                    Book Now
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find anything matching "{searchQuery}". Try a different search term.
                </p>
                <Button asChild>
                  <Link href="/explore"><a>Browse All Attractions</a></Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
