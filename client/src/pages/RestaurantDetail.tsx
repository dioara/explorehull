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
  Phone, 
  Globe, 
  DollarSign,
  Utensils,
  Navigation2
} from "lucide-react";

export default function RestaurantDetail() {
  const [, params] = useRoute("/restaurant/:slug");
  const slug = params?.slug || "";

  const { data: restaurant, isLoading, error } = trpc.restaurants.bySlug.useQuery({ slug });

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

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Restaurant Not Found</h1>
            <p className="text-muted-foreground mb-6">The restaurant you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = "/eat-drink"}>Back to Eat & Drink</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const priceRangeDisplay = restaurant.priceRange ? "£".repeat(parseInt(restaurant.priceRange)) : "N/A";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${restaurant.name} - Explore Hull`}
        description={restaurant.description}
        ogImage={restaurant.imageUrl || undefined}
        ogType="article"
      />
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <img
            src={restaurant.imageUrl || "/images/hull_dining_restaurant.png"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/90 text-white">
                  {restaurant.cuisine}
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {priceRangeDisplay}
                </Badge>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">{restaurant.name}</h1>
              {restaurant.address && (
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-5 w-5" />
                  <span>{restaurant.address}</span>
                </div>
              )}
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
                  {restaurant.description}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">Cuisine</h2>
                <div className="flex items-center gap-3">
                  <Utensils className="h-6 w-6 text-primary" />
                  <span className="text-lg">{restaurant.cuisine}</span>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Restaurant Info</h3>
                  
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Price Range</p>
                      <p className="text-sm text-muted-foreground">{priceRangeDisplay}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Utensils className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Cuisine</p>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                  </div>

                  {restaurant.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                      </div>
                    </div>
                  )}

                  {restaurant.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                      </div>
                    </div>
                  )}

                  {restaurant.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Website</p>
                        <a 
                          href={restaurant.website} 
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

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Visit</h3>
                  <Button className="w-full" size="lg">
                    <Navigation2 className="mr-2 h-5 w-5" />
                    Get Directions
                  </Button>
                  {restaurant.website && (
                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-5 w-5" />
                        View Menu
                      </a>
                    </Button>
                  )}
                  {restaurant.phone && (
                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <a href={`tel:${restaurant.phone}`}>
                        <Phone className="mr-2 h-5 w-5" />
                        Call Now
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
