import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";
import { Link } from "wouter";

export function WhatsOnToday() {
  const { data: upcomingEvents, isLoading } = trpc.events.upcoming.useQuery({ limit: 10 });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">What's On Today</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!upcomingEvents || upcomingEvents.length === 0) {
    return null;
  }

  // Filter events happening today or tomorrow
  const todayAndTomorrowEvents = upcomingEvents.filter((event) => {
    const eventDate = new Date(event.startDate);
    return isToday(eventDate) || isTomorrow(eventDate);
  });

  if (todayAndTomorrowEvents.length === 0) {
    return null;
  }

  const getTimeLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">What's On Today</h2>
          </div>
          <Link href="/events">
            <Button variant="outline">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todayAndTomorrowEvents.slice(0, 6).map((event) => {
            const eventDate = new Date(event.startDate);
            
            return (
              <Link key={event.id} href={`/event/${event.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer">
                  {event.imageUrl && (
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-white">
                        {getTimeLabel(eventDate)}
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{format(eventDate, "h:mm a")}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                      {event.category && (
                        <Badge variant="secondary" className="text-xs">
                          {event.category}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
