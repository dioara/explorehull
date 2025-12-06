import { trpc } from "@/lib/trpc";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms of Service"
        description="Terms of Service for ExploreHull.com - Read our terms and conditions for using our website."
        keywords="terms of service, terms and conditions, legal, ExploreHull"
      />
      
      <Navigation />

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Last updated: December 6, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="leading-relaxed text-foreground/90">
                By accessing and using ExploreHull.com (the "Website"), you accept and agree to be bound by the terms and provisions of this agreement. This Website is operated by Lampstand Consulting ("we," "our," or "us"). If you do not agree to these Terms of Service, please do not use this Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Use of the Website</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Permitted Use</h3>
              <p className="leading-relaxed text-foreground/90">
                You may use this Website for lawful purposes only. You agree not to use the Website in any way that violates any applicable federal, state, local, or international law or regulation.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Prohibited Activities</h3>
              <p className="leading-relaxed text-foreground/90 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Use the Website in any manner that could disable, overburden, damage, or impair the site</li>
                <li>Attempt to gain unauthorized access to any portion of the Website</li>
                <li>Use any automated system to access the Website without our express written permission</li>
                <li>Interfere with or disrupt the Website or servers or networks connected to the Website</li>
                <li>Upload or transmit viruses or any other type of malicious code</li>
                <li>Collect or track personal information of other users</li>
                <li>Use the Website for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Content and Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Our Content</h3>
              <p className="leading-relaxed text-foreground/90">
                The Website and its original content, features, and functionality are owned by Lampstand Consulting and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of the content without our express written permission.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">User-Generated Content</h3>
              <p className="leading-relaxed text-foreground/90">
                If you submit reviews, comments, or other content to the Website, you grant us a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify, adapt, publish, and display such content. You represent and warrant that you own or have the necessary rights to submit such content and that it does not violate any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Links and Services</h2>
              <p className="leading-relaxed text-foreground/90">
                Our Website may contain links to third-party websites or services that are not owned or controlled by Lampstand Consulting. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any such third-party content or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
              <p className="leading-relaxed text-foreground/90">
                The Website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components. We make no warranties regarding the accuracy, reliability, or completeness of any content on the Website.
              </p>
              <p className="leading-relaxed text-foreground/90 mt-4">
                Information about attractions, events, restaurants, and accommodations is provided for informational purposes only. We do not guarantee the accuracy of business hours, prices, availability, or other details. We recommend contacting venues directly to confirm information before visiting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="leading-relaxed text-foreground/90">
                To the fullest extent permitted by applicable law, Lampstand Consulting shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
                <li>Your access to or use of or inability to access or use the Website</li>
                <li>Any conduct or content of any third party on the Website</li>
                <li>Any content obtained from the Website</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              <p className="leading-relaxed text-foreground/90">
                You agree to defend, indemnify, and hold harmless Lampstand Consulting and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of the Website or your violation of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="leading-relaxed text-foreground/90">
                These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Lampstand Consulting operates, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts located in that jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="leading-relaxed text-foreground/90">
                We reserve the right to modify or replace these Terms of Service at any time at our sole discretion. If we make material changes, we will notify you by updating the "Last updated" date at the top of this page. Your continued use of the Website after any such changes constitutes your acceptance of the new Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Severability</h2>
              <p className="leading-relaxed text-foreground/90">
                If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="leading-relaxed text-foreground/90">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-muted rounded-lg">
                <p className="font-semibold text-foreground">Lampstand Consulting</p>
                <p className="text-foreground/90 mt-2">
                  Email: <a href="mailto:contact@lampstand.consulting" className="text-accent hover:underline">contact@lampstand.consulting</a>
                </p>
                <p className="text-foreground/90 mt-1">
                  Website: <a href="https://lampstand.consulting" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">lampstand.consulting</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
