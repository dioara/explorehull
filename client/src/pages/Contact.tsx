import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactMutation = trpc.system.notifyOwner.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    contactMutation.mutate({
      title: `Contact Form: ${formData.subject || "General Inquiry"}`,
      content: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Contact Us"
        description="Get in touch with Explore Hull. Whether you have questions, feedback, or need assistance planning your visit, we're here to help."
        keywords="contact Hull tourism, Hull visitor inquiries, contact Explore Hull"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[oklch(0.25_0.05_240)] to-[oklch(0.35_0.08_220)] text-white py-16">
        <div className="container text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6 text-[oklch(0.70_0.15_200)]" />
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Have a question about visiting Hull? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[oklch(0.70_0.15_200)]/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-[oklch(0.70_0.15_200)]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-muted-foreground">
                    Send us your questions and we'll respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[oklch(0.72_0.12_60)]/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-[oklch(0.72_0.12_60)]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quick Response</h3>
                  <p className="text-muted-foreground">
                    We aim to respond to all inquiries within one business day
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="What is your inquiry about?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[oklch(0.70_0.15_200)] hover:bg-[oklch(0.65_0.15_200)] text-white"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "How do I get to Hull?",
                answer: "Hull is easily accessible by train, car, coach, and air. Visit our Travel Info page for detailed directions and transport options.",
              },
              {
                question: "What are the must-see attractions in Hull?",
                answer: "Don't miss The Deep aquarium, Hull Old Town, the Humber Bridge, and the city's excellent museums. Check our Explore page for the full list.",
              },
              {
                question: "When is the best time to visit Hull?",
                answer: "Hull is great year-round, but summer (June-August) offers the best weather and most events. Spring and autumn are perfect for fewer crowds.",
              },
              {
                question: "Is Hull suitable for families?",
                answer: "Absolutely! Hull has many family-friendly attractions including The Deep, museums, parks, and regular events for children.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
