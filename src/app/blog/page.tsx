
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, User, ArrowRight, Search, 
  TrendingUp, Heart, Loader2, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, where } from "firebase/firestore";

const categories = ["All", "Tech", "Gaming", "AI", "Robotics", "Company"];

export default function BlogPage() {
  const db = useFirestore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch published posts
  const postsQuery = useMemo(() => {
    return query(
      collection(db, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
  }, [db]);

  const { data: posts, loading } = useCollection(postsQuery);

  const filteredPosts = useMemo(() => {
    return posts?.filter(post => 
      (activeCategory === "All" || post.category === activeCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = useMemo(() => posts?.find(p => p.featured), [posts]);
  const heroImage = PlaceHolderImages.find(img => img.id === "blog-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-primary/20 text-primary border-primary/20 py-1.5 px-4 rounded-full mb-6 uppercase tracking-widest text-[10px] font-bold">
              Knowledge & Insights
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-headline leading-tight">
              The <span className="text-gradient">CyGen</span> Journal.
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed mt-6">
              Stay updated with the latest trends in AI, game development, and the 
              future of technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <section className="px-6 mb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="group glass rounded-[3.5rem] overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-2">
              <Link href={`/blog/${featuredPost.slug}`} className="relative h-96 lg:h-full overflow-hidden">
                <Image 
                  src={featuredPost.imageUrl || PlaceHolderImages.find(img => img.id === "blog-1")?.imageUrl || ""} 
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-primary text-white px-4 py-1.5 rounded-full flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Featured Post
                  </Badge>
                </div>
              </Link>
              <div className="p-12 md:p-16 space-y-6 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 uppercase tracking-wider"><User className="w-3 h-3" /> {featuredPost.authorName}</span>
                  <span className="flex items-center gap-1 uppercase tracking-wider"><Calendar className="w-3 h-3" /> {new Date(featuredPost.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{featuredPost.excerpt}</p>
                <div className="pt-6">
                  <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 font-bold">
                    <Link href={`/blog/${featuredPost.slug}`}>Read Full Story <ArrowRight className="ml-2 w-4 h-4" /></Link>
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
                  activeCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"
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
        <div className="max-w-7xl mx-auto">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
               <Loader2 className="w-12 h-12 text-primary animate-spin" />
               <p className="text-muted-foreground font-headline uppercase tracking-widest text-[10px]">Accessing Database...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group glass rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col hover:border-primary/20 transition-all"
                  >
                    <Link href={`/blog/${post.slug}`} className="relative aspect-video overflow-hidden">
                      <Image 
                        src={post.imageUrl || PlaceHolderImages.find(img => img.id === "blog-2")?.imageUrl || ""} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white uppercase text-[8px] tracking-widest">{post.category}</Badge>
                      </div>
                    </Link>
                    <div className="p-8 space-y-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest">
                        <span>{new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500" /> {post.likesCount || 0}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-secondary" /> {post.commentsCount || 0}</span>
                      </div>
                      <h3 className="text-xl font-bold font-headline text-white group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                            {post.authorName[0]}
                          </div>
                          <span className="text-[10px] text-white/70 uppercase tracking-wider">{post.authorName}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
                          <Link href={`/blog/${post.slug}`}><ArrowRight className="w-4 h-4" /></Link>
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
