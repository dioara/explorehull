import { trpc } from "@/lib/trpc";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for ExploreHull.com - Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, personal information, ExploreHull"
      />
      
      <Navigation />

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Last updated: December 6, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="leading-relaxed text-foreground/90">
                ExploreHull.com ("we," "our," or "us") is operated by Lampstand Consulting. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
              <p className="leading-relaxed text-foreground/90 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Submit a contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Create an account on our website</li>
                <li>Leave a review or comment</li>
              </ul>
              <p className="leading-relaxed text-foreground/90 mt-4">
                This information may include your name, email address, and any other information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
              <p className="leading-relaxed text-foreground/90">
                When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. We may also collect information about your browsing behavior, such as the pages you visit and the links you click.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed text-foreground/90 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you newsletters and marketing communications (with your consent)</li>
                <li>Improve our website and user experience</li>
                <li>Analyze website usage and trends</li>
                <li>Prevent fraudulent activity and ensure website security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed text-foreground/90">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="leading-relaxed text-foreground/90">
                We may use third-party service providers to help us operate our website and provide services to you. These third parties may have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose. Third-party services we use may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
                <li>Google Maps for location services</li>
                <li>Analytics providers for website usage analysis</li>
                <li>Email service providers for communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="leading-relaxed text-foreground/90">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="leading-relaxed text-foreground/90 mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to or restrict processing of your information</li>
                <li>The right to data portability</li>
              </ul>
              <p className="leading-relaxed text-foreground/90 mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="leading-relaxed text-foreground/90">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <p className="leading-relaxed text-foreground/90">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="leading-relaxed text-foreground/90">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
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
