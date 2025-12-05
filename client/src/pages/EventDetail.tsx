import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  Clock,
  Ticket,
  Share2
} from "lucide-react";
import { format } from "date-fns";

export default function EventDetail() {
  const [, params] = useRoute("/event/:slug");
  const slug = params?.slug || "";

  const { data: event, isLoading, error } = trpc.events.bySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = "/events"}>Back to Events</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const eventDate = new Date(event.startDate);
  const formattedDate = format(eventDate, "EEEE, MMMM d, yyyy");
  const formattedTime = format(eventDate, "h:mm a");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${event.title} - Explore Hull`}
        description={event.description}
        ogImage={event.imageUrl || undefined}
        ogType="article"
      />
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <img
            src={event.imageUrl || "/images/hull_events_festival.png"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container">
              <Badge className="mb-4 bg-primary/90 text-white">
                {event.category}
              </Badge>
              <h1 className="text-5xl font-bold text-white mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{formattedTime}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-4">About This Event</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </section>

              {event.location && (
                <section>
                  <h2 className="text-3xl font-bold mb-4">Location</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">{event.location}</p>
                          <Button variant="link" className="p-0 h-auto text-primary">
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Event Details</h3>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-sm text-muted-foreground">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Time</p>
                      <p className="text-sm text-muted-foreground">{formattedTime}</p>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Venue</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {event.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Get Tickets</h3>
                  {event.ticketUrl ? (
                    <Button className="w-full" size="lg" asChild>
                      <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                        <Ticket className="mr-2 h-5 w-5" />
                        Buy Tickets
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg" disabled>
                      <Ticket className="mr-2 h-5 w-5" />
                      Tickets Not Available
                    </Button>
                  )}
                  <Button variant="outline" className="w-full" size="lg">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share Event
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
