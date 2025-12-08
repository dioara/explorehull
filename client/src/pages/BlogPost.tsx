import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading } = trpc.blog.bySlug.useQuery({ slug });
  
  // Fetch related articles from the same category
  const { data: relatedPosts } = trpc.blog.list.useQuery(
    { category: post?.category },
    { enabled: !!post?.category }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container py-12">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the blog post you're looking for.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${post.title} | Explore Hull Blog`}
        description={post.excerpt}
        keywords={`Hull, ${post.category}, ${post.title}`}
        ogType="article"
      />
      
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[oklch(0.25_0.05_240)] to-[oklch(0.35_0.08_220)] text-white py-16">
        <div className="container">
          <Link href="/blog">
            <Button variant="ghost" className="text-white hover:text-white/80 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          
          <Badge className="mb-4 bg-[oklch(0.70_0.15_200)]">{post.category}</Badge>
          
          <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime || 5} min read</span>
            </div>
            
            {post.author && (
              <span>By {post.author}</span>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="container py-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="container py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
                p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-gray-700">{children}</li>,
                a: ({ href, children }) => (
                  <a href={href} className="text-[oklch(0.70_0.15_200)] hover:underline">
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[oklch(0.70_0.15_200)] pl-4 italic my-4 text-gray-600">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      <section className="bg-white py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">More from {post.category}</h2>
          
          {relatedPosts && relatedPosts.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts
                .filter(p => p.slug !== post.slug) // Exclude current post
                .slice(0, 3) // Show max 3 related posts
                .map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                      {relatedPost.featuredImage && (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <Badge className="mb-3 bg-[oklch(0.70_0.15_200)]">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{relatedPost.readingTime || 5} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Check out more articles in the <Link href="/blog" className="text-[oklch(0.70_0.15_200)] hover:underline">blog</Link>.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
