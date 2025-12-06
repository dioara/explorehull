import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Calendar, MapPin, Ticket, Clock } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Festival", "Exhibition", "Theatre", "Music", "Family", "Sports"];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const { data: events, isLoading } = trpc.events.list.useQuery();
  
  const filteredEvents = selectedCategory === "All" 
    ? events 
    : events?.filter(e => e.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Events in Hull"
        description="Discover upcoming events, festivals, exhibitions, and entertainment in Hull. From cultural festivals to family activities, find what's on in Hull today."
        keywords="Hull events, what's on Hull, Hull festivals, Hull exhibitions, Hull entertainment, things to do Hull"
        ogImage="/images/hull_events_festival.png"
      />
      
      <Navigation />

      {/* Hero Section - Modern Redesign */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hull_events_festival.png')" }}
        >
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              What's On in Hull
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed">
              From vibrant festivals to world-class exhibitions, discover the events that make Hull an exciting destination year-round
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Modern Pills */}
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

      {/* Events List - Modern Cards */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">
              {selectedCategory === "All" ? "All Events" : selectedCategory}
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredEvents?.length || 0} {filteredEvents?.length === 1 ? 'event' : 'events'} found
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6 md:space-y-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-2xl">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-96 h-64 bg-muted animate-pulse"></div>
                    <CardContent className="p-6 flex-1 space-y-3">
                      <div className="h-6 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredEvents && filteredEvents.length > 0 ? (
            <div className="space-y-6 md:space-y-8">
              {filteredEvents.map((event) => (
                <Link key={event.id} href={`/event/${event.slug}`}>
                  <a className="block group">
                    <Card className="overflow-hidden rounded-2xl border-border/50 hover:border-border transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-96 h-64 md:h-80 overflow-hidden flex-shrink-0 bg-muted">
                          <img 
                            src={event.imageUrl || '/images/hull_events_festival.png'} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-[oklch(0.68_0.10_55)] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                            {event.category}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                              {event.title}
                            </h3>
                            
                            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                          
                          <div className="space-y-3 mt-6 pt-6 border-t border-border/50">
                            <div className="flex items-center gap-3 text-foreground">
                              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 text-accent" />
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {new Date(event.startDate).toLocaleDateString('en-GB', { 
                                    weekday: 'long',
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                  })}
                                </div>
                                {event.endDate && event.endDate !== event.startDate && (
                                  <div className="text-sm text-muted-foreground">
                                    Until {new Date(event.endDate).toLocaleDateString('en-GB', { 
                                      day: 'numeric', 
                                      month: 'long' 
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {event.location && (
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                                  <MapPin className="w-5 h-5" />
                                </div>
                                <span className="font-medium">{event.location}</span>
                              </div>
                            )}
                            
                            {event.ticketUrl && (
                              <div className="flex items-center gap-3 text-accent">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                  <Ticket className="w-5 h-5" />
                                </div>
                                <span className="font-semibold">Tickets Available</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold">No events found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category to explore more events.
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
