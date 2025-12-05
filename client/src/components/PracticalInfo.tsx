import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Bus, Train, Car, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PracticalInfo() {
  const taxiCompanies = [
    { name: "Hull Taxis", phone: "01482 123456", description: "24/7 service" },
    { name: "City Cabs Hull", phone: "01482 789012", description: "Airport transfers" },
    { name: "Streamline Taxis", phone: "01482 345678", description: "Pre-booking available" },
  ];

  const emergencyContacts = [
    { name: "Emergency Services", phone: "999", description: "Police, Fire, Ambulance" },
    { name: "NHS 111", phone: "111", description: "Non-emergency medical advice" },
    { name: "Hull Royal Infirmary", phone: "01482 328541", description: "Main hospital" },
    { name: "Tourist Information", phone: "01482 300300", description: "Visitor queries" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <Info className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Practical Information</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Taxi Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                Local Taxis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {taxiCompanies.map((taxi, index) => (
                <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="font-semibold">{taxi.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{taxi.description}</div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${taxi.phone.replace(/\s/g, '')}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      {taxi.phone}
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Public Transport */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="w-5 h-5 text-primary" />
                Public Transport
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Bus className="w-4 h-4" />
                  Buses
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  First Bus and Stagecoach operate throughout Hull
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.firstbus.co.uk/hull-east-yorkshire" target="_blank" rel="noopener noreferrer">
                    View Bus Times
                  </a>
                </Button>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Train className="w-4 h-4" />
                  Trains
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Hull Paragon Interchange - Main station
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.nationalrail.co.uk/stations/hul" target="_blank" rel="noopener noreferrer">
                    View Train Times
                  </a>
                </Button>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Car className="w-4 h-4" />
                  Parking
                </div>
                <p className="text-sm text-muted-foreground">
                  Multiple car parks in city center. Pay & display and multi-story options available.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-900">
                <AlertCircle className="w-5 h-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="border-b border-red-200 last:border-0 pb-3 last:pb-0">
                  <div className="font-semibold text-red-900">{contact.name}</div>
                  <div className="text-sm text-red-700 mb-2">{contact.description}</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-300 hover:bg-red-100"
                    asChild
                  >
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phone}
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
