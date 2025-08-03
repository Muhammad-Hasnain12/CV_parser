import React from 'react';
import { Header } from '@/components/Header';
import { 
  Calendar, 
  User, 
  ArrowRight,
  Star,
  Clock,
  Tag,
  ExternalLink
} from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Resume Parsing: AI vs Traditional Methods",
      excerpt: "Explore how artificial intelligence is revolutionizing the way we extract information from resumes, making the process faster, more accurate, and more efficient than ever before.",
      author: "Muhammad Hasnain",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "AI & Technology",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Building a Resume Parser with Hugging Face Models",
      excerpt: "A technical deep-dive into how we built ParsePath using state-of-the-art NLP models from Hugging Face for accurate resume data extraction.",
      author: "Muhammad Hasnain",
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "Development",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Privacy in Resume Parsing: Why It Matters",
      excerpt: "Understanding the importance of data privacy in resume parsing and how ParsePath ensures your information remains secure and confidential.",
      author: "Muhammad Hasnain",
      date: "December 5, 2024",
      readTime: "4 min read",
      category: "Privacy & Security",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Top 10 Resume Formats That Work Best with AI Parsers",
      excerpt: "Discover which resume formats and structures work best with AI-powered parsing tools and how to optimize your resume for better extraction results.",
      author: "Muhammad Hasnain",
      date: "November 30, 2024",
      readTime: "6 min read",
      category: "Career Tips",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Integrating Resume Parsing APIs into Your Application",
      excerpt: "A comprehensive guide on how to integrate ParsePath API into your applications, with code examples and best practices for developers.",
      author: "Muhammad Hasnain",
      date: "November 25, 2024",
      readTime: "10 min read",
      category: "API & Integration",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "The Evolution of Resume Parsing Technology",
      excerpt: "From manual data entry to AI-powered extraction: a historical look at how resume parsing technology has evolved over the years.",
      author: "Muhammad Hasnain",
      date: "November 20, 2024",
      readTime: "7 min read",
      category: "Technology",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-medium text-primary mb-8">
              <Star className="h-4 w-4 mr-2" />
              Blog
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              ParsePath Blog
              <br />
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Insights & Updates
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Stay updated with the latest insights on AI-powered resume parsing, technology trends, and industry best practices
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Featured Article
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h3>
                
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{blogPosts[0].author}</span>
                  </div>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Latest Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover insights, tutorials, and updates from the ParsePath team
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                      <span>•</span>
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    
                    <a 
                      href="#" 
                      className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                    >
                      <span className="text-sm font-semibold">Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Subscribe to our newsletter for the latest insights on AI-powered resume parsing and industry updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Browse by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find articles that match your interests and expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "AI & Technology", count: 12, color: "bg-blue-500/10 text-blue-600" },
              { name: "Development", count: 8, color: "bg-green-500/10 text-green-600" },
              { name: "Privacy & Security", count: 6, color: "bg-purple-500/10 text-purple-600" },
              { name: "Career Tips", count: 10, color: "bg-orange-500/10 text-orange-600" },
              { name: "API & Integration", count: 5, color: "bg-red-500/10 text-red-600" },
              { name: "Technology", count: 15, color: "bg-indigo-500/10 text-indigo-600" },
              { name: "Tutorials", count: 7, color: "bg-pink-500/10 text-pink-600" },
              { name: "Industry News", count: 9, color: "bg-yellow-500/10 text-yellow-600" }
            ].map((category, index) => (
              <a 
                key={index}
                href="#" 
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${category.color}`}>
                    {category.name}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{category.count} articles</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Ready to Try ParsePath?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience the power of AI-powered resume parsing for yourself
            </p>
            <a 
              href="/" 
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Try ParsePath</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 