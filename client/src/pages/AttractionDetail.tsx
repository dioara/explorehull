import { useParams, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { MapView } from "@/components/Map";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  Globe, 
  Calendar,
  Star,
  Navigation2
} from "lucide-react";

export default function AttractionDetail() {
  const [, params] = useRoute("/attraction/:slug");
  const slug = params?.slug || "";

  const { data: attraction, isLoading, error } = trpc.attractions.bySlug.useQuery({ slug });

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

  if (error || !attraction) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Attraction Not Found</h1>
            <p className="text-muted-foreground mb-6">The attraction you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = "/explore"}>Back to Explore</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = attraction.imageUrl ? [attraction.imageUrl] : [];
  let openingHours: Record<string, string> = {};
  
  // Try to parse openingHours as JSON, otherwise treat as plain string
  if (attraction.openingHours) {
    try {
      openingHours = JSON.parse(attraction.openingHours);
    } catch {
      // If not JSON, it's a plain string - we'll display it as-is
      openingHours = { general: attraction.openingHours };
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${attraction.name} - Explore Hull`}
        description={attraction.description}
        ogImage={images[0]}
        ogType="article"
      />
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <img
            src={images[0] || "/images/hero_the_deep.png"}
            alt={attraction.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container">
              <Badge className="mb-4 bg-primary/90 text-white">
                {attraction.category}
              </Badge>
              <h1 className="text-5xl font-bold text-white mb-4">{attraction.name}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{attraction.address}</span>
                </div>
                {attraction.featured && (
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>Featured</span>
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
                <h2 className="text-3xl font-bold mb-4">About</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {attraction.description}
                </p>
              </section>

              {/* Image Gallery */}
              {images.length > 1 && (
                <section>
                  <h2 className="text-3xl font-bold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {images.slice(1).map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${attraction.name} ${idx + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Visitor Information</h3>
                  
                  {attraction.openingHours && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold mb-2">Opening Hours</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {Object.entries(openingHours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="capitalize">{day}:</span>
                              <span>{hours as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {attraction.pricing && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Pricing</p>
                        <p className="text-sm text-muted-foreground">{attraction.pricing}</p>
                      </div>
                    </div>
                  )}

                  {attraction.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-sm text-muted-foreground">{attraction.address}</p>
                      </div>
                    </div>
                  )}

                  {attraction.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-sm text-muted-foreground">{attraction.phone}</p>
                      </div>
                    </div>
                  )}

                  {attraction.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Website</p>
                        <a 
                          href={attraction.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Interactive Map */}
              {attraction.latitude && attraction.longitude && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Location Map</h3>
                    <MapView
                      className="h-[400px] rounded-lg"
                      initialCenter={{
                        lat: parseFloat(attraction.latitude),
                        lng: parseFloat(attraction.longitude),
                      }}
                      initialZoom={15}
                      onMapReady={(map) => {
                        // Add marker for the attraction
                        new google.maps.marker.AdvancedMarkerElement({
                          map,
                          position: {
                            lat: parseFloat(attraction.latitude!),
                            lng: parseFloat(attraction.longitude!),
                          },
                          title: attraction.name,
                        });
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Plan Your Visit</h3>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      if (attraction.latitude && attraction.longitude) {
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${attraction.latitude},${attraction.longitude}`;
                        window.open(url, '_blank');
                      }
                    }}
                  >
                    <Navigation2 className="mr-2 h-5 w-5" />
                    Get Directions
                  </Button>
                  {attraction.website && (
                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <a href={attraction.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-5 w-5" />
                        Book Tickets
                      </a>
                    </Button>
                  )}
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
