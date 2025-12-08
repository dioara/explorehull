import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO, generateAttractionStructuredData } from "@/components/SEO";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SaveToItinerary } from "@/components/SaveToItinerary";
import { MapView } from "@/components/Map";
import { AdBanner } from "@/components/AdSense";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  Globe, 
  Star,
  Navigation2,
  ChevronLeft
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
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
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Attraction Not Found</h1>
            <p className="text-muted-foreground">The attraction you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = "/explore"} size="lg" className="rounded-xl">
              Back to Explore
            </Button>
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
        structuredData={generateAttractionStructuredData({
          name: attraction.name,
          description: attraction.description,
          address: attraction.address || undefined,
          imageUrl: images[0],
          website: attraction.website || undefined,
          phone: attraction.phone || undefined,
          openingHours: attraction.openingHours || undefined,
          pricing: attraction.pricing || undefined,
        })}
      />
      <Navigation />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-card border-b">
          <div className="container py-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.location.href = "/explore"}
              className="hover:bg-secondary rounded-lg"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Explore
            </Button>
          </div>
        </div>

        {/* Hero Image - Modern Design */}
        <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
          <img
            src={images[0] || "/images/hero_the_deep.png"}
            alt={attraction.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-overlay" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container">
              <div className="max-w-4xl space-y-4">
                <Badge className="bg-accent/90 text-accent-foreground hover:bg-accent px-4 py-2 text-sm font-semibold rounded-full">
                  {attraction.category}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {attraction.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm md:text-base">{attraction.address}</span>
                  </div>
                  {attraction.featured && (
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-[oklch(0.68_0.10_55)] text-[oklch(0.68_0.10_55)]" />
                      <span className="text-sm md:text-base font-semibold">Featured</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <section className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">About</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {attraction.description}
                </p>
              </section>

              {/* Image Gallery */}
              {images.length > 1 && (
                <section className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Gallery</h2>
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    {images.slice(1).map((img: string, idx: number) => (
                      <div key={idx} className="relative overflow-hidden rounded-2xl group">
                        <img
                          src={img}
                          alt={`${attraction.name} ${idx + 1}`}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Visitor Information Card */}
              <Card className="rounded-2xl border-border/50 shadow-soft">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-2xl font-bold">Visitor Information</h3>
                  
                  {attraction.openingHours && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-3">Opening Hours</p>
                        <div className="text-sm text-muted-foreground space-y-2">
                          {Object.entries(openingHours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between gap-4">
                              <span className="capitalize font-medium">{day}:</span>
                              <span>{hours as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {attraction.pricing && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Pricing</p>
                        <p className="text-sm text-muted-foreground">{attraction.pricing}</p>
                      </div>
                    </div>
                  )}

                  {attraction.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Address</p>
                        <p className="text-sm text-muted-foreground">{attraction.address}</p>
                      </div>
                    </div>
                  )}

                  {attraction.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Phone</p>
                        <a 
                          href={`tel:${attraction.phone}`} 
                          className="text-sm text-accent hover:underline font-medium"
                        >
                          {attraction.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {attraction.website && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">Website</p>
                        <a 
                          href={attraction.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-accent hover:underline font-medium"
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
                <Card className="rounded-2xl border-border/50 shadow-soft overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Location Map</h3>
                    <MapView
                      className="h-[300px] rounded-xl"
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

              {/* Plan Your Visit Card */}
              <Card className="rounded-2xl border-border/50 shadow-soft bg-gradient-to-br from-accent/5 to-accent/10">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Plan Your Visit</h3>
                  <SaveToItinerary
                    itemType="attraction"
                    itemId={attraction.id}
                    itemName={attraction.name}
                    size="lg"
                  />
                  <Button 
                    className="w-full rounded-xl shadow-sm" 
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
                    <Button variant="outline" className="w-full rounded-xl" size="lg" asChild>
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
          
          {/* Ad - After Main Content */}
          <div className="mt-16">
            <AdBanner />
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <ReviewsSection
              itemType="attraction"
              itemId={attraction.id}
              itemName={attraction.name}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
