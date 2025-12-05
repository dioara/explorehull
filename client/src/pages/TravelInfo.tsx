import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Car, Plane, Bus, Cloud, MapPin, Info, Phone } from "lucide-react";

export default function TravelInfo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Travel Information & Visitor Guide"
        description="Plan your visit to Hull with our comprehensive travel guide. Find information on getting here, getting around, weather, and practical tips for visitors."
        keywords="Hull travel info, getting to Hull, Hull transport, Hull weather, visit Hull guide, Hull visitor information"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[oklch(0.25_0.05_240)] to-[oklch(0.35_0.08_220)] text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Plan Your Visit to Hull</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Everything you need to know for a smooth and enjoyable visit to Hull
          </p>
        </div>
      </section>

      {/* Getting Here */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Getting to Hull</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[oklch(0.70_0.15_200)]/10 rounded-full flex items-center justify-center mb-4">
                  <Train className="w-6 h-6 text-[oklch(0.70_0.15_200)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">By Train</h3>
                <p className="text-muted-foreground mb-4">
                  Hull Paragon Interchange connects to major UK cities. Direct trains from London, Manchester, Leeds, and more.
                </p>
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold mb-1">Journey Times:</div>
                  <ul className="space-y-1">
                    <li>London: 2h 45m</li>
                    <li>Leeds: 1h</li>
                    <li>Manchester: 2h</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[oklch(0.72_0.12_60)]/10 rounded-full flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-[oklch(0.72_0.12_60)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">By Car</h3>
                <p className="text-muted-foreground mb-4">
                  Hull is easily accessible via the M62 and A63. Multiple car parks available in the city center.
                </p>
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold mb-1">From:</div>
                  <ul className="space-y-1">
                    <li>Leeds: 1 hour</li>
                    <li>York: 1 hour</li>
                    <li>Sheffield: 1h 30m</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[oklch(0.68_0.15_25)]/10 rounded-full flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6 text-[oklch(0.68_0.15_25)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">By Air</h3>
                <p className="text-muted-foreground mb-4">
                  Humberside Airport is 20 miles from Hull. Manchester and Leeds Bradford airports are also convenient options.
                </p>
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold mb-1">Airports:</div>
                  <ul className="space-y-1">
                    <li>Humberside: 30 mins</li>
                    <li>Leeds Bradford: 1h 30m</li>
                    <li>Manchester: 2h</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[oklch(0.25_0.05_240)]/10 rounded-full flex items-center justify-center mb-4">
                  <Bus className="w-6 h-6 text-[oklch(0.25_0.05_240)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">By Coach</h3>
                <p className="text-muted-foreground mb-4">
                  National Express and other coach services operate regular routes to Hull from across the UK.
                </p>
                <div className="text-sm text-muted-foreground">
                  <div className="font-semibold mb-1">Services:</div>
                  <ul className="space-y-1">
                    <li>National Express</li>
                    <li>Megabus</li>
                    <li>FlixBus</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Around */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-8 text-center">Getting Around Hull</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Hull is a compact city that's easy to navigate on foot, by bike, or using public transport
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">On Foot</h3>
                <p className="text-muted-foreground">
                  Most attractions in the city center are within walking distance. The Old Town, Marina, and Museum Quarter are all easily accessible on foot.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">By Bus</h3>
                <p className="text-muted-foreground">
                  Hull's bus network connects all major areas. Day tickets and multi-journey passes available. Main operator: East Yorkshire Buses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">By Bike</h3>
                <p className="text-muted-foreground">
                  Hull is bike-friendly with dedicated cycle lanes. Bike rental available at various locations around the city.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weather & Best Time to Visit */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[oklch(0.70_0.15_200)]/10 rounded-full flex items-center justify-center">
                <Cloud className="w-8 h-8 text-[oklch(0.70_0.15_200)]" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Weather & Best Time to Visit</h2>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Hull enjoys a temperate maritime climate with mild winters and warm summers. The city is one of the driest in the UK, 
                making it a great destination year-round.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Spring (March-May)</h3>
                    <p className="text-muted-foreground mb-2">Temperature: 8-15°C</p>
                    <p className="text-muted-foreground">
                      Mild weather, blooming parks, and fewer crowds. Perfect for exploring outdoor attractions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Summer (June-August)</h3>
                    <p className="text-muted-foreground mb-2">Temperature: 15-22°C</p>
                    <p className="text-muted-foreground">
                      Peak season with festivals, events, and the best weather. Book accommodation in advance.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Autumn (September-November)</h3>
                    <p className="text-muted-foreground mb-2">Temperature: 10-16°C</p>
                    <p className="text-muted-foreground">
                      Beautiful autumn colors, cultural events, and comfortable temperatures for sightseeing.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Winter (December-February)</h3>
                    <p className="text-muted-foreground mb-2">Temperature: 2-8°C</p>
                    <p className="text-muted-foreground">
                      Festive atmosphere with Christmas markets. Indoor attractions like museums and The Deep are perfect.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Practical Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[oklch(0.70_0.15_200)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-[oklch(0.70_0.15_200)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Visitor Information</h3>
                    <p className="text-muted-foreground">
                      Visit Hull Tourist Information Centre at Paragon Interchange for maps, guides, and local advice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[oklch(0.72_0.12_60)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[oklch(0.72_0.12_60)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Emergency Numbers</h3>
                    <p className="text-muted-foreground">
                      Emergency: 999 | Non-emergency police: 101 | NHS: 111
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[oklch(0.68_0.15_25)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[oklch(0.68_0.15_25)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Currency & Payment</h3>
                    <p className="text-muted-foreground">
                      UK Pound Sterling (£). Cards widely accepted. ATMs available throughout the city.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[oklch(0.25_0.05_240)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-[oklch(0.25_0.05_240)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Language</h3>
                    <p className="text-muted-foreground">
                      English is the primary language. Hull has a distinctive local accent and dialect.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
