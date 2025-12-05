import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Festival", "Exhibition", "Theatre", "Music", "Family", "Sports"];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { data: events, isLoading } = trpc.events.list.useQuery();
  
  const filteredEvents = selectedCategory === "All" 
    ? events 
    : events?.filter(e => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Events in Hull"
        description="Discover upcoming events, festivals, exhibitions, and entertainment in Hull. From cultural festivals to family activities, find what's on in Hull today."
        keywords="Hull events, what's on Hull, Hull festivals, Hull exhibitions, Hull entertainment, things to do Hull"
        ogImage="/images/hull_events_festival.png"
      />
      
      <Navigation />
      {/* <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2">
                <Ship className="w-8 h-8 text-[oklch(0.70_0.15_200)]" />
                <span className="text-2xl font-bold text-[oklch(0.25_0.05_240)]">Explore Hull</span>
              </a>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/explore"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Explore</a></Link>
              <Link href="/events"><a className="text-[oklch(0.70_0.15_200)] font-semibold">Events</a></Link>
              <Link href="/eat-drink"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Eat & Drink</a></Link>
              <Link href="/stay"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Stay</a></Link>
              <Link href="/blog"><a className="text-foreground hover:text-[oklch(0.70_0.15_200)] transition-colors font-medium">Blog</a></Link>
            </div>
            
            <Button asChild className="bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)] text-white">
              <Link href="/plan-visit"><a>Plan Your Visit</a></Link>
            </Button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hull_events_festival.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.25_0.05_240)]/80 to-[oklch(0.25_0.05_240)]/60"></div>
        </div>
        
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-4">What's On in Hull</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            From vibrant festivals to world-class exhibitions, discover the events that make Hull an exciting destination year-round
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
                className={selectedCategory === category ? "bg-[oklch(0.72_0.12_60)] hover:bg-[oklch(0.70_0.12_60)]" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="container">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {selectedCategory === "All" ? "All Events" : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredEvents?.length || 0} {filteredEvents?.length === 1 ? 'event' : 'events'} found
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-80 h-64 bg-gray-200 animate-pulse"></div>
                    <CardContent className="p-6 flex-1">
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredEvents && filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <Link key={event.id} href={`/event/${event.slug}`}>
                  <a>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-80 h-64 overflow-hidden flex-shrink-0">
                          <img 
                            src={event.imageUrl || '/images/hull_events_festival.png'} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 bg-[oklch(0.72_0.12_60)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {event.category}
                          </div>
                        </div>
                        
                        <CardContent className="p-6 md:p-8 flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">
                            {event.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {event.description}
                          </p>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-foreground">
                              <Calendar className="w-5 h-5 text-[oklch(0.70_0.15_200)]" />
                              <div>
                                <div className="font-semibold">
                                  {new Date(event.startDate).toLocaleDateString('en-GB', { 
                                    weekday: 'long',
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                  })}
                                </div>
                                {event.endDate && (
                                  <div className="text-sm text-muted-foreground">
                                    Until {new Date(event.endDate).toLocaleDateString('en-GB', { 
                                      day: 'numeric', 
                                      month: 'long', 
                                      year: 'numeric' 
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {event.location && (
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-[oklch(0.70_0.15_200)]" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            
                            {event.price && (
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <Ticket className="w-5 h-5 text-[oklch(0.70_0.15_200)]" />
                                <span>{event.price}</span>
                              </div>
                            )}
                          </div>
                          
                          {event.ticketUrl && (
                            <div className="mt-6">
                              <Button className="bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)]">
                                Get Tickets
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
