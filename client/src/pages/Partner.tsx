import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Building2, Megaphone, Handshake, Check, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormType = "listing" | "advertising" | "partnership";

export default function Partner() {
  const [activeForm, setActiveForm] = useState<FormType>("listing");
  
  // Listing Form State
  const [listingData, setListingData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    listingType: "",
    businessDescription: "",
    website: "",
    address: "",
  });

  // Advertising Form State
  const [adData, setAdData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    adType: "",
    budget: "",
    message: "",
  });

  // Partnership Form State
  const [partnershipData, setPartnershipData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    proposal: "",
  });

  const submitListingMutation = trpc.partner.submitListing.useMutation({
    onSuccess: () => {
      toast.success("Listing submission received! We'll contact you within 2 business days.");
      setListingData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        listingType: "",
        businessDescription: "",
        website: "",
        address: "",
      });
    },
    onError: () => {
      toast.error("Failed to submit listing. Please try again.");
    },
  });

  const submitAdMutation = trpc.partner.submitAdvertising.useMutation({
    onSuccess: () => {
      toast.success("Advertising inquiry received! We'll send you our media kit shortly.");
      setAdData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        adType: "",
        budget: "",
        message: "",
      });
    },
    onError: () => {
      toast.error("Failed to submit inquiry. Please try again.");
    },
  });

  const submitPartnershipMutation = trpc.partner.submitPartnership.useMutation({
    onSuccess: () => {
      toast.success("Partnership inquiry received! We'll be in touch soon.");
      setPartnershipData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        partnershipType: "",
        proposal: "",
      });
    },
    onError: () => {
      toast.error("Failed to submit inquiry. Please try again.");
    },
  });

  const handleListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitListingMutation.mutate(listingData);
  };

  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAdMutation.mutate(adData);
  };

  const handlePartnershipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitPartnershipMutation.mutate(partnershipData);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Partner With Us"
        description="Join ExploreHull.com as a partner. Add your business listing, advertise to thousands of Hull visitors, or explore partnership opportunities."
        keywords="Hull business listing, advertise Hull, Hull tourism partnership, promote Hull business"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[oklch(0.35_0.08_240)] to-[oklch(0.25_0.05_240)]">
        <div className="container relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner With ExploreHull.com</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Reach thousands of visitors exploring Hull. List your business, advertise your services, or collaborate with us.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">High Visibility</h3>
                <p className="text-muted-foreground">
                  Your business will be showcased to thousands of tourists and locals searching for Hull attractions, restaurants, and accommodations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Targeted Audience</h3>
                <p className="text-muted-foreground">
                  Connect with visitors actively planning their Hull experience - people ready to book, dine, and explore.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Options</h3>
                <p className="text-muted-foreground">
                  From free basic listings to premium featured placements and advertising packages - choose what works for your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Selection Tabs */}
      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Button
              variant={activeForm === "listing" ? "default" : "outline"}
              onClick={() => setActiveForm("listing")}
              className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
            >
              <Building2 className="w-6 h-6" />
              <span className="font-semibold">Add Your Listing</span>
              <span className="text-xs opacity-80">Attractions, Restaurants, Hotels</span>
            </Button>

            <Button
              variant={activeForm === "advertising" ? "default" : "outline"}
              onClick={() => setActiveForm("advertising")}
              className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
            >
              <Megaphone className="w-6 h-6" />
              <span className="font-semibold">Advertise With Us</span>
              <span className="text-xs opacity-80">Banner Ads, Sponsored Content</span>
            </Button>

            <Button
              variant={activeForm === "partnership" ? "default" : "outline"}
              onClick={() => setActiveForm("partnership")}
              className="flex-1 h-auto py-4 flex flex-col items-center gap-2"
            >
              <Handshake className="w-6 h-6" />
              <span className="font-semibold">Partnership Inquiry</span>
              <span className="text-xs opacity-80">Collaborations, Sponsorships</span>
            </Button>
          </div>

          {/* Add Your Listing Form */}
          {activeForm === "listing" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Add Your Business Listing</CardTitle>
                <p className="text-muted-foreground">
                  Get your attraction, restaurant, hotel, or event featured on ExploreHull.com
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleListingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        required
                        value={listingData.businessName}
                        onChange={(e) => setListingData({ ...listingData, businessName: e.target.value })}
                        placeholder="The Deep Aquarium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="listingType">Listing Type *</Label>
                      <Select
                        required
                        value={listingData.listingType}
                        onValueChange={(value) => setListingData({ ...listingData, listingType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="attraction">Attraction</SelectItem>
                          <SelectItem value="restaurant">Restaurant/Café</SelectItem>
                          <SelectItem value="accommodation">Hotel/Accommodation</SelectItem>
                          <SelectItem value="event">Event/Festival</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        required
                        value={listingData.contactName}
                        onChange={(e) => setListingData({ ...listingData, contactName: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={listingData.email}
                        onChange={(e) => setListingData({ ...listingData, email: e.target.value })}
                        placeholder="contact@business.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={listingData.phone}
                        onChange={(e) => setListingData({ ...listingData, phone: e.target.value })}
                        placeholder="+44 1482 123456"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={listingData.website}
                        onChange={(e) => setListingData({ ...listingData, website: e.target.value })}
                        placeholder="https://www.yourbusiness.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address *</Label>
                    <Input
                      id="address"
                      required
                      value={listingData.address}
                      onChange={(e) => setListingData({ ...listingData, address: e.target.value })}
                      placeholder="123 High Street, Hull, HU1 1AA"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessDescription">Business Description *</Label>
                    <Textarea
                      id="businessDescription"
                      required
                      value={listingData.businessDescription}
                      onChange={(e) => setListingData({ ...listingData, businessDescription: e.target.value })}
                      placeholder="Tell us about your business, what makes it special, opening hours, pricing, etc."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={submitListingMutation.isPending}>
                    {submitListingMutation.isPending ? "Submitting..." : "Submit Listing Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Advertise With Us Form */}
          {activeForm === "advertising" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Advertise With ExploreHull.com</CardTitle>
                <p className="text-muted-foreground">
                  Reach thousands of Hull visitors with banner ads, sponsored content, and premium placements
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        required
                        value={adData.companyName}
                        onChange={(e) => setAdData({ ...adData, companyName: e.target.value })}
                        placeholder="Your Company Ltd"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adContactName">Contact Name *</Label>
                      <Input
                        id="adContactName"
                        required
                        value={adData.contactName}
                        onChange={(e) => setAdData({ ...adData, contactName: e.target.value })}
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adEmail">Email Address *</Label>
                      <Input
                        id="adEmail"
                        type="email"
                        required
                        value={adData.email}
                        onChange={(e) => setAdData({ ...adData, email: e.target.value })}
                        placeholder="marketing@company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adPhone">Phone Number</Label>
                      <Input
                        id="adPhone"
                        type="tel"
                        value={adData.phone}
                        onChange={(e) => setAdData({ ...adData, phone: e.target.value })}
                        placeholder="+44 1482 123456"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adType">Advertising Type *</Label>
                      <Select
                        required
                        value={adData.adType}
                        onValueChange={(value) => setAdData({ ...adData, adType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ad type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="banner">Banner Ads</SelectItem>
                          <SelectItem value="sponsored">Sponsored Content</SelectItem>
                          <SelectItem value="featured">Featured Listing</SelectItem>
                          <SelectItem value="newsletter">Newsletter Sponsorship</SelectItem>
                          <SelectItem value="custom">Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Monthly Budget *</Label>
                      <Select
                        required
                        value={adData.budget}
                        onValueChange={(value) => setAdData({ ...adData, budget: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500">Under £500</SelectItem>
                          <SelectItem value="500-1000">£500 - £1,000</SelectItem>
                          <SelectItem value="1000-2500">£1,000 - £2,500</SelectItem>
                          <SelectItem value="2500-5000">£2,500 - £5,000</SelectItem>
                          <SelectItem value="over-5000">Over £5,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adMessage">Campaign Details *</Label>
                    <Textarea
                      id="adMessage"
                      required
                      value={adData.message}
                      onChange={(e) => setAdData({ ...adData, message: e.target.value })}
                      placeholder="Tell us about your advertising goals, target audience, campaign duration, and any specific requirements..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={submitAdMutation.isPending}>
                    {submitAdMutation.isPending ? "Submitting..." : "Request Media Kit & Pricing"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Partnership Inquiry Form */}
          {activeForm === "partnership" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Partnership Opportunities</CardTitle>
                <p className="text-muted-foreground">
                  Explore collaboration opportunities, sponsorships, and strategic partnerships
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePartnershipSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input
                        id="organizationName"
                        required
                        value={partnershipData.organizationName}
                        onChange={(e) => setPartnershipData({ ...partnershipData, organizationName: e.target.value })}
                        placeholder="Your Organization"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partnerContactName">Contact Name *</Label>
                      <Input
                        id="partnerContactName"
                        required
                        value={partnershipData.contactName}
                        onChange={(e) => setPartnershipData({ ...partnershipData, contactName: e.target.value })}
                        placeholder="Alex Johnson"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partnerEmail">Email Address *</Label>
                      <Input
                        id="partnerEmail"
                        type="email"
                        required
                        value={partnershipData.email}
                        onChange={(e) => setPartnershipData({ ...partnershipData, email: e.target.value })}
                        placeholder="partnerships@organization.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partnerPhone">Phone Number</Label>
                      <Input
                        id="partnerPhone"
                        type="tel"
                        value={partnershipData.phone}
                        onChange={(e) => setPartnershipData({ ...partnershipData, phone: e.target.value })}
                        placeholder="+44 1482 123456"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="partnershipType">Partnership Type *</Label>
                      <Select
                        required
                        value={partnershipData.partnershipType}
                        onValueChange={(value) => setPartnershipData({ ...partnershipData, partnershipType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select partnership type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="event-sponsorship">Event Sponsorship</SelectItem>
                          <SelectItem value="content-collaboration">Content Collaboration</SelectItem>
                          <SelectItem value="tourism-board">Tourism Board Partnership</SelectItem>
                          <SelectItem value="affiliate">Affiliate Partnership</SelectItem>
                          <SelectItem value="technology">Technology Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proposal">Partnership Proposal *</Label>
                    <Textarea
                      id="proposal"
                      required
                      value={partnershipData.proposal}
                      onChange={(e) => setPartnershipData({ ...partnershipData, proposal: e.target.value })}
                      placeholder="Describe your partnership idea, what you bring to the table, and how we can work together..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={submitPartnershipMutation.isPending}>
                    {submitPartnershipMutation.isPending ? "Submitting..." : "Submit Partnership Inquiry"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
