
"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Star, Zap, ShoppingCart, Filter, Search,
  ArrowRight, Heart, Info, CheckCircle2, Package, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = ["All", "Digital Assets", "Courses", "Merch", "Hardware"];

const products = [
  {
    id: 1,
    name: "CyGen Elite Pro Jersey",
    price: "$45.00",
    category: "Merch",
    rating: 4.9,
    reviews: 120,
    img: "prod-1",
    desc: "Premium breathable performance jersey designed for professional gamers. Features holographic logo and futuristic accents.",
    features: ["Quick-dry technology", "Holographic elements", "Elite fit"]
  },
  {
    id: 2,
    name: "Unreal Engine Sci-Fi Pack",
    price: "$99.00",
    category: "Digital Assets",
    rating: 4.8,
    reviews: 45,
    img: "prod-2",
    desc: "Professional-grade modular sci-fi environment pack for UE5. Includes 4K textures, Nanite-ready meshes, and custom shaders.",
    features: ["Nanite optimized", "4K Textures", "Modular design"]
  },
  {
    id: 3,
    name: "Aether Vision VR Headset",
    price: "$599.00",
    category: "Hardware",
    rating: 5.0,
    reviews: 12,
    img: "prod-3",
    desc: "The next generation of standalone VR. 8K resolution, 144Hz refresh rate, and AI-driven eye tracking for immersive focus.",
    features: ["8K Resolution", "144Hz Refresh", "AI Eye-Tracking"]
  },
  {
    id: 4,
    name: "Next.js Futuristic Web Dev",
    price: "$149.00",
    category: "Courses",
    rating: 4.7,
    reviews: 890,
    img: "fullstack",
    desc: "Master the art of building futuristic UIs with Next.js, Framer Motion, and Three.js. From beginner to pro.",
    features: ["50+ Hours content", "Source code included", "Lifetime access"]
  },
  {
    id: 5,
    name: "Dawn of Titans Art Book",
    price: "$35.00",
    category: "Merch",
    rating: 4.9,
    reviews: 56,
    img: "portfolio-hero",
    desc: "A collector's edition digital art book showcasing the concept art, world building, and character designs of our flagship RPG.",
    features: ["200+ Pages", "Concept sketches", "Director's notes"]
  },
  {
    id: 6,
    name: "Cyber Motion MoCap Suite",
    price: "$2,499.00",
    category: "Hardware",
    rating: 4.6,
    reviews: 8,
    img: "animation",
    desc: "Portable professional motion capture suit for independent creators. High precision sensors and real-time Unity/Unreal integration.",
    features: ["18 High-res sensors", "Real-time stream", "Wireless setup"]
  }
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filteredProducts = products.filter(p => 
    (activeCategory === "All" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const heroImage = PlaceHolderImages.find(img => img.id === "store-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Store Hero" 
              fill 
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <Badge className="bg-secondary/20 text-secondary border-secondary/20 py-1.5 px-4 rounded-full mb-6">
              Official Marketplace
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-headline leading-tight">
              Equip Your <br />
              <span className="text-gradient">Digital Future.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed mt-6">
              From premium hardware and digital assets to professional courses 
              and official CyGen gear.
            </p>
          </motion.div>
        </div>
      </section>

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
              placeholder="Search products..." 
              className="pl-11 bg-white/5 border-white/10 rounded-full h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div 
                      className="group glass rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-primary/20 transition-all cursor-pointer flex flex-col h-full"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="relative aspect-square overflow-hidden bg-black/20">
                        <Image 
                          src={PlaceHolderImages.find(img => img.id === product.img)?.imageUrl || ""} 
                          alt={product.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white">{product.category}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <Button variant="ghost" size="icon" className="glass h-10 w-10 rounded-full text-white hover:text-red-400">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-8 space-y-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold font-headline text-white group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <span className="text-xl font-bold text-primary">{product.price}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-0.5 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                            ))}
                          </div>
                          <span>({product.reviews} reviews)</span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {product.desc}
                        </p>
                        <div className="pt-6 mt-auto">
                          <Button className="w-full bg-white text-black hover:bg-white/90 rounded-full h-12 font-bold flex items-center justify-center gap-2">
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="glass border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-headline">{selectedProduct?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                      <div className="space-y-6">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10">
                          <Image 
                            src={PlaceHolderImages.find(img => img.id === selectedProduct?.img)?.imageUrl || ""} 
                            alt={selectedProduct?.name || ""} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/5 overflow-hidden opacity-50 hover:opacity-100 cursor-pointer">
                               <Image 
                                src={PlaceHolderImages.find(img => img.id === selectedProduct?.img)?.imageUrl || ""} 
                                alt="thumb" 
                                width={100} 
                                height={100} 
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <Badge className="bg-primary/20 text-primary mb-4">{selectedProduct?.category}</Badge>
                          <h4 className="text-4xl font-bold text-white mb-2">{selectedProduct?.price}</h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {selectedProduct?.desc}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h5 className="font-bold flex items-center gap-2 text-primary">
                            <Zap className="w-4 h-4" /> Key Features
                          </h5>
                          <ul className="grid grid-cols-1 gap-3">
                            {selectedProduct?.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm text-white/80 glass p-3 rounded-xl border-white/5">
                                <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                          <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 h-14 rounded-full font-bold">
                            Buy Now
                          </Button>
                          <Button size="lg" variant="outline" className="flex-1 glass border-white/10 h-14 rounded-full">
                            Add to Favorites
                          </Button>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-white/5 text-xs text-muted-foreground uppercase tracking-widest">
                          <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Global Shipping</span>
                          <span className="flex items-center gap-2"><Package className="w-4 h-4" /> Secure Packing</span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
           {[
             { icon: Globe, title: "Global Access", desc: "Digital products delivered instantly worldwide." },
             { icon: Star, title: "Quality Assured", desc: "Every product is vetted by our core engineering team." },
             { icon: ShoppingBag, title: "Verified Gear", desc: "Official merchandise with authenticity guarantee." }
           ].map((item, i) => (
             <div key={i} className="text-center space-y-4 p-10 glass rounded-[3rem] border-white/5">
               <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                 <item.icon className="w-8 h-8 text-primary" />
               </div>
               <h4 className="text-xl font-bold font-headline text-white">{item.title}</h4>
               <p className="text-muted-foreground text-sm">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Floating Cart Button */}
      <div className="fixed bottom-24 right-8 z-[90]">
        <Button size="lg" className="h-16 w-16 rounded-full bg-primary shadow-2xl shadow-primary/20 hover:scale-110 transition-transform">
          <ShoppingCart className="w-6 h-6" />
          <Badge className="absolute -top-1 -right-1 bg-white text-black font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-primary">2</Badge>
        </Button>
      </div>

      <Footer />
      <AIAssistant />
    </main>
  );
}
