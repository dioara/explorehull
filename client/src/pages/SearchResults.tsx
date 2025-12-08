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
import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { SearchFilters, SearchFiltersState } from "@/components/SearchFilters";
import { OptimizedImage } from "@/components/OptimizedImage";

export default function SearchResults() {
  const [location] = useLocation();
  // Get query params from window.location.search since wouter's location doesn't include them
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get('q') || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<SearchFiltersState>({
    priceRange: [0, 100],
    categories: [],
    minRating: 0,
    openNow: false,
  });

  const { data: searchResults, isLoading } = trpc.search.query.useQuery(
    { q: searchQuery },
    { enabled: searchQuery.length > 0 }
  );

  const hasNoResults = searchResults && 
    searchResults.attractions.length === 0 && 
    searchResults.events.length === 0 && 
    searchResults.restaurants.length === 0 && 
    searchResults.accommodations.length === 0;

  const { data: spellingSuggestion } = trpc.search.spellcheck.useQuery(
    { q: searchQuery },
    { enabled: searchQuery.length > 0 && hasNoResults }
  );

  // Update search query when URL changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || "";
    setSearchQuery(query);
  }, [location]);

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

  const handleFiltersChange = (newFilters: SearchFiltersState) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: [0, 100],
      categories: [],
      minRating: 0,
      openNow: false,
    });
  };

  // Apply filters to search results
  const filteredResults = useMemo(() => {
    if (!searchResults) return null;

    const filterItems = (items: any[]) => {
      return items.filter(item => {
        // Price filter (if item has price)
        if (item.price) {
          const price = parseFloat(item.price);
          if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
            return false;
          }
        }

        // Category filter
        if (filters.categories.length > 0 && item.category) {
          const itemCategory = item.category.toLowerCase().replace(/\s+/g, '-');
          if (!filters.categories.includes(itemCategory)) {
            return false;
          }
        }

        // Rating filter (if item has rating)
        if (filters.minRating > 0 && item.rating) {
          if (item.rating < filters.minRating) {
            return false;
          }
        }

        return true;
      });
    };

    return {
      attractions: filterItems(searchResults.attractions),
      events: filterItems(searchResults.events),
      restaurants: filterItems(searchResults.restaurants),
      accommodations: filterItems(searchResults.accommodations),
    };
  }, [searchResults, filters]);

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
            ) : filteredResults && (filteredResults.attractions.length > 0 || filteredResults.events.length > 0 || filteredResults.restaurants.length > 0 || filteredResults.accommodations.length > 0) ? (
              <>
                <SearchFilters 
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onReset={handleResetFilters}
                />
                
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-8">
                  <TabsTrigger value="all">
                    All Results ({(filteredResults.attractions.length + filteredResults.events.length + filteredResults.restaurants.length + filteredResults.accommodations.length)})
                  </TabsTrigger>
                  <TabsTrigger value="attractions">
                    Attractions ({filteredResults.attractions.length})
                  </TabsTrigger>
                  <TabsTrigger value="events">
                    Events ({filteredResults.events.length})
                  </TabsTrigger>
                  <TabsTrigger value="restaurants">
                    Restaurants ({filteredResults.restaurants.length})
                  </TabsTrigger>
                  <TabsTrigger value="accommodations">
                    Accommodations ({filteredResults.accommodations.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-8">
                  {filteredResults.attractions.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        Attractions
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResults.attractions.map((attraction: any) => (
                          <Link key={attraction.id} href={`/attraction/${attraction.slug}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                              <CardContent className="p-0">
                                <div className="relative h-48 overflow-hidden rounded-t-lg">
                                  <img
                                    src={attraction.images ? JSON.parse(attraction.images as string)[0] : '/images/hull_culture_theatre.png'}
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

                  {filteredResults.events.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6" />
                        Events
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResults.events.map((event: any) => (
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

                  {filteredResults.restaurants.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Utensils className="w-6 h-6" />
                        Restaurants
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResults.restaurants.map((restaurant: any) => (
                          <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                              <CardContent className="p-0">
                                <div className="relative h-48 overflow-hidden rounded-t-lg">
                                  <img
                                    src={restaurant.images ? JSON.parse(restaurant.images as string)[0] : '/images/hull_food_festival.png'}
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

                  {filteredResults.accommodations.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Hotel className="w-6 h-6" />
                        Accommodations
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResults.accommodations.map((accommodation: any) => (
                          <Link key={accommodation.id} href={`/accommodation/${accommodation.slug}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                              <CardContent className="p-0">
                                <div className="relative h-48 overflow-hidden rounded-t-lg">
                                  <OptimizedImage
                                    src={accommodation.images ? JSON.parse(accommodation.images as string)[0] : '/images/hull_marina.png'}
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
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="attractions">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResults.attractions.map((attraction: any) => (
                      <Link key={attraction.id} href={`/attraction/${attraction.slug}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <CardContent className="p-0">
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                              <img
                                src={attraction.images ? JSON.parse(attraction.images as string)[0] : '/images/hull_culture_theatre.png'}
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
                    {filteredResults.events.map((event: any) => (
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
                    {filteredResults.restaurants.map((restaurant: any) => (
                      <Link key={restaurant.id} href={`/restaurant/${restaurant.slug}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <CardContent className="p-0">
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                              <img
                                src={restaurant.images ? JSON.parse(restaurant.images as string)[0] : '/images/hull_food_festival.png'}
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
                    {filteredResults.accommodations.map((accommodation: any) => (
                      <Link key={accommodation.id} href={`/accommodation/${accommodation.slug}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <CardContent className="p-0">
                            <div className="relative h-48 overflow-hidden rounded-t-lg">
                              <OptimizedImage
                                src={accommodation.images ? JSON.parse(accommodation.images as string)[0] : '/images/hull_marina.png'}
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
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                </Tabs>
              </>
            ) : (<div className="text-center py-20">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
                <p className="text-muted-foreground mb-4">
                  We couldn't find anything matching "{searchQuery}".
                </p>
                {spellingSuggestion && spellingSuggestion !== searchQuery && (
                  <div className="mb-6">
                    <p className="text-muted-foreground mb-2">Did you mean:</p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery(spellingSuggestion);
                        window.history.pushState({}, '', `/search?q=${encodeURIComponent(spellingSuggestion)}`);
                      }}
                      className="text-lg font-semibold"
                    >
                      {spellingSuggestion}
                    </Button>
                  </div>
                )}
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
