
"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, User, ArrowRight, Search, 
  Tag, Share2, MessageCircle, Sparkles, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const categories = ["All", "Tech", "Gaming", "AI", "Robotics", "Company"];

const posts = [
  {
    id: 1,
    title: "The Future of AI in Lagos: A Technological Renaissance",
    excerpt: "Exploring how artificial intelligence is transforming the business landscape in Nigeria's commercial capital.",
    category: "AI",
    author: "Donald Attah",
    date: "May 12, 2024",
    readTime: "8 min",
    img: "blog-1",
    featured: true
  },
  {
    id: 2,
    title: "Unreal Engine 5: Beyond Gaming",
    excerpt: "How we use UE5's Nanite and Lumen for cinematic architecture and interactive training simulations.",
    category: "Tech",
    author: "Sarah Chen",
    date: "May 10, 2024",
    readTime: "6 min",
    img: "project-vem",
  },
  {
    id: 3,
    title: "Building Immersive Worlds: Our Game Dev Process",
    excerpt: "A behind-the-scenes look at the development lifecycle of 'Dawn of Titans' and our proprietary engine tools.",
    category: "Gaming",
    author: "Marcus Thorne",
    date: "May 08, 2024",
    readTime: "12 min",
    img: "project-game",
  },
  {
    id: 4,
    title: "Human-Robot Collaboration in Modern Industry",
    excerpt: "Why the next decade will be defined by how well we integrate AI-driven robotics into daily workflows.",
    category: "Robotics",
    author: "Donald Attah",
    date: "May 05, 2024",
    readTime: "10 min",
    img: "blog-3",
  },
  {
    id: 5,
    title: "CyGen Dawn: Our Q1 2024 Roadmap Update",
    excerpt: "A look at our upcoming projects, global partnerships, and the growth of our Next-Gen mentorship program.",
    category: "Company",
    author: "Sarah Chen",
    date: "May 01, 2024",
    readTime: "5 min",
    img: "blog-2",
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(post => 
    (activeCategory === "All" || post.category === activeCategory) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const heroImage = PlaceHolderImages.find(img => img.id === "blog-hero");
  const featuredPost = posts.find(p => p.featured);

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Blog Hero" 
              fill 
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/20 py-1.5 px-4 rounded-full mb-6">
              Knowledge & Insights
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-headline leading-tight">
              The <span className="text-gradient">CyGen</span> Journal.
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed mt-6">
              Stay updated with the latest trends in AI, game development, and the 
              future of technology in Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <section className="px-6 mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group glass rounded-[3.5rem] overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="relative h-96 lg:h-full">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === featuredPost.img)?.imageUrl || ""} 
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-primary text-white px-4 py-1.5 rounded-full flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Featured Post
                  </Badge>
                </div>
              </div>
              <div className="p-12 md:p-16 space-y-6 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {featuredPost.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredPost.date}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="pt-6">
                  <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12">
                    Read Full Story <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section className="py-12 px-6 sticky top-20 z-40 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "ghost"}
                className={`rounded-full px-6 transition-all ${
                  activeCategory === cat ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-11 bg-white/5 border-white/10 rounded-full h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group glass rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col hover:border-primary/20 transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id === post.img)?.imageUrl || ""} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-8 space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} Read</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-headline text-white group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                        {post.author[0]}
                      </div>
                      <span className="text-xs text-white/70">{post.author}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[4rem] border border-white/10 text-center space-y-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Subscribe to the Dawn.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Get the most innovative tech news and project updates delivered directly 
            to your inbox every week.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              placeholder="Your email address" 
              className="bg-white/5 border-white/10 h-14 rounded-full px-8 flex-1"
            />
            <Button className="bg-primary hover:bg-primary/90 rounded-full h-14 px-10 font-bold">
              Join Now
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            Zero spam. Only pure innovation.
          </p>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
