import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { Calendar, ArrowRight, Clock } from "lucide-react";

export default function Blog() {
  const { data: blogPosts, isLoading } = trpc.blog.list.useQuery();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Hull Travel Blog & Guides"
        description="Read our latest articles, travel guides, and insider tips for visiting Hull. Discover hidden gems, local stories, and the best ways to experience Hull."
        keywords="Hull blog, Hull travel guide, Hull tips, things to do Hull, Hull stories, visit Hull guide"
        ogType="website"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[oklch(0.25_0.05_240)] to-[oklch(0.35_0.08_220)] text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Hull Travel Blog</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Discover insider tips, local stories, and comprehensive guides to help you make the most of your visit to Hull
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : blogPosts && blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <a>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.featuredImage || '/images/hull_old_town.png'} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {post.category && (
                          <div className="absolute top-3 left-3 bg-[oklch(0.70_0.15_200)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {post.category}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString('en-GB', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                          {post.author && (
                            <span>By {post.author}</span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-[oklch(0.70_0.15_200)] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {post.excerpt || post.content.substring(0, 150) + '...'}
                        </p>
                        
                        <div className="pt-4 border-t">
                          <span className="text-[oklch(0.70_0.15_200)] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Read More <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No blog posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["Travel Guides", "History", "Food & Drink", "Events", "Culture", "Family", "Maritime", "Hidden Gems"].map((category) => (
              <div 
                key={category}
                className="bg-gray-50 hover:bg-[oklch(0.70_0.15_200)]/10 p-6 rounded-lg text-center transition-colors cursor-pointer group"
              >
                <h3 className="font-semibold group-hover:text-[oklch(0.70_0.15_200)] transition-colors">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
