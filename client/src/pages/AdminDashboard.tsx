import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Star } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: admin, isLoading: adminLoading } = trpc.admin.me.useQuery();
  const { data: submissions } = trpc.admin.getSubmissions.useQuery();
  const { data: attractions } = trpc.attractions.list.useQuery();
  const { data: restaurants } = trpc.restaurants.list.useQuery();
  const { data: accommodations } = trpc.accommodations.list.useQuery();
  
  const logoutMutation = trpc.admin.logout.useMutation({
    onSuccess: () => setLocation("/admin/login"),
  });

  const toggleFeaturedMutation = trpc.admin.toggleFeatured.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  useEffect(() => {
    if (!adminLoading && !admin) {
      setLocation("/admin/login");
    }
  }, [admin, adminLoading, setLocation]);

  if (adminLoading || !admin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleToggleFeatured = (type: 'attraction' | 'restaurant' | 'accommodation', id: number, currentFeatured: boolean) => {
    toggleFeaturedMutation.mutate({
      type,
      id,
      featured: !currentFeatured,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">ExploreHull Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{admin.email}</span>
            <Button variant="outline" size="sm" onClick={() => logoutMutation.mutate()}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Featured Listings Management */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Featured Listings Management</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attractions ({attractions?.filter(a => a.featured).length} featured)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {attractions?.slice(0, 10).map(attraction => (
                    <div key={attraction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{attraction.name}</span>
                        {attraction.featured && <Badge variant="secondary"><Star className="w-3 h-3 mr-1" />Featured</Badge>}
                      </div>
                      <Button
                        size="sm"
                        variant={attraction.featured ? "outline" : "default"}
                        onClick={() => handleToggleFeatured('attraction', attraction.id, attraction.featured || false)}
                      >
                        {attraction.featured ? "Remove Featured" : "Make Featured"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Restaurants ({restaurants?.filter(r => r.featured).length} featured)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {restaurants?.slice(0, 10).map(restaurant => (
                    <div key={restaurant.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{restaurant.name}</span>
                        {restaurant.featured && <Badge variant="secondary"><Star className="w-3 h-3 mr-1" />Featured</Badge>}
                      </div>
                      <Button
                        size="sm"
                        variant={restaurant.featured ? "outline" : "default"}
                        onClick={() => handleToggleFeatured('restaurant', restaurant.id, restaurant.featured || false)}
                      >
                        {restaurant.featured ? "Remove Featured" : "Make Featured"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accommodations ({accommodations?.filter(a => a.featured).length} featured)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {accommodations?.slice(0, 10).map(accommodation => (
                    <div key={accommodation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{accommodation.name}</span>
                        {accommodation.featured && <Badge variant="secondary"><Star className="w-3 h-3 mr-1" />Featured</Badge>}
                      </div>
                      <Button
                        size="sm"
                        variant={accommodation.featured ? "outline" : "default"}
                        onClick={() => handleToggleFeatured('accommodation', accommodation.id, accommodation.featured || false)}
                      >
                        {accommodation.featured ? "Remove Featured" : "Make Featured"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Partner Submissions */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Partner Submissions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">{submissions?.listings?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Listing Requests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">{submissions?.advertising?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Advertising Inquiries</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">{submissions?.partnerships?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Partnership Requests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">{submissions?.contacts?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Contact Messages</div>
              </CardContent>
            </Card>
          </div>

          {submissions?.listings && submissions.listings.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recent Listing Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submissions.listings.slice(0, 5).map((listing: any) => (
                    <div key={listing.id} className="p-3 border rounded-lg">
                      <div className="font-medium">{listing.businessName}</div>
                      <div className="text-sm text-muted-foreground">{listing.email} • {listing.listingType}</div>
                      <div className="text-sm mt-1">{listing.businessDescription}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}
