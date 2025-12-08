import { trpc } from "@/lib/trpc";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useRoute } from "wouter";
import { MapPin, Users, Phone, Mail, Globe, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/OptimizedImage";

export default function VenueDetail() {
  const [, params] = useRoute("/venue/:slug");
  const slug = params?.slug || "";
  
  const { data: venue, isLoading } = trpc.venues.bySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-muted rounded-2xl"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Venue Not Found</h1>
          <p className="text-muted-foreground">The venue you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const amenities = venue.amenities ? JSON.parse(venue.amenities) : [];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${venue.name} | Hull Venues`}
        description={venue.description}
        keywords={`${venue.name}, ${venue.category} venue Hull, event space Hull, ${venue.category.toLowerCase()} venues`}
        ogImage={venue.imageUrl || '/images/hull_venues.png'}
      />
      
      <Navigation />

      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[400px]">
        <OptimizedImage 
          src={venue.imageUrl || '/images/hull_venues.png'} 
          alt={venue.name}
          className="absolute inset-0"
          aspectRatio="21/9"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container">
            <div className="inline-block bg-[oklch(0.68_0.10_55)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {venue.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {venue.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Venue</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {venue.description}
                </p>
              </div>

              {amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Amenities & Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {venue.pricing && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Pricing</h2>
                  <p className="text-lg font-semibold text-accent">{venue.pricing}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border rounded-2xl p-6 space-y-4 sticky top-24">
                <h3 className="text-xl font-bold">Venue Information</h3>
                
                {venue.capacity && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Capacity</div>
                      <div className="text-sm text-muted-foreground">Up to {venue.capacity} guests</div>
                    </div>
                  </div>
                )}

                {venue.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Address</div>
                      <div className="text-sm text-muted-foreground">{venue.address}</div>
                    </div>
                  </div>
                )}

                {venue.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <a href={`tel:${venue.phone}`} className="text-sm text-accent hover:underline">
                        {venue.phone}
                      </a>
                    </div>
                  </div>
                )}

                {venue.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <a href={`mailto:${venue.email}`} className="text-sm text-accent hover:underline break-all">
                        {venue.email}
                      </a>
                    </div>
                  </div>
                )}

                {venue.website && (
                  <Button asChild className="w-full">
                    <a href={venue.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}

                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Availability
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
