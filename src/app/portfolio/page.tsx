
"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, Glasses, Bot, Code, Box, Cpu, GraduationCap, 
  Search, ArrowRight, ExternalLink, Sparkles,
  Zap, Globe, Play, Star, LayoutGrid, BoxSelect, Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const categories = [
  "All", "3D Assets", "Interior Visualization", "Level Design", 
  "UI Design", "Character Design", "Game Development"
];

const projects = [
  // 3D Assets
  { id: 1, title: "Ritual Sword", category: "3D Assets", img: "/images/sword.png", tech: ["Blender", "Substance"], desc: "High-fidelity hard surface modeling for cinematic use." },
  { id: 2, title: "Combat Bow", category: "3D Assets", img: "/images/bow&arrow.png", tech: ["ZBrush", "Maya"], desc: "Intricate weapon design with realistic materials." },
  { id: 3, title: "Mortar V2", category: "3D Assets", img: "/images/mortar-2.png", tech: ["Hard Surface", "UE5"], desc: "Industrial asset modeling for tactical simulations." },
  { id: 4, title: "Rayban Vision", category: "3D Assets", img: "/images/rayban-eyeglass.png", tech: ["Product Vis", "Octane"], desc: "Hyper-realistic eyewear product visualization." },
  
  // Interior Viz
  { id: 5, title: "Luxury Living", category: "Interior Visualization", img: "/images/livingroom.png", tech: ["Unreal Engine 5", "Lumen"], desc: "Interactive architectural walkthrough of a modern living space." },
  { id: 6, title: "Digital Beauty Shop", category: "Interior Visualization", img: "/images/beauty_shop.png", tech: ["Real-time Render"], desc: "Futuristic commercial interior visualization." },
  { id: 7, title: "Corporate Nexus", category: "Interior Visualization", img: "/images/office-view.png", tech: ["ArchViz", "V-Ray"], desc: "Modern office environment visualization." },
  
  // Level Design
  { id: 8, title: "Metaverse GALLERIA", category: "Level Design", img: "/images/metaverse-galleria.png", tech: ["Metaverse", "Spatial"], desc: "Grand-scale virtual gallery for digital art exhibitions." },
  { id: 9, title: "VEM7 Hub", category: "Level Design", img: "/images/vem7.png", tech: ["UE5", "Blueprints"], desc: "Cybernetic urban environment rendering." },
  { id: 10, title: "UE5 Skyscraper", category: "Level Design", img: "/images/ue5-skyscrapper1.png", tech: ["CityGen", "Lumen"], desc: "Cinematic city environment for film production." },
  { id: 11, title: "Metaverse Camp", category: "Level Design", img: "/images/metaverse-camp-side.png", tech: ["VR", "Unity"], desc: "Immersive nature-themed virtual camping experience." },

  // UI Design
  { id: 12, title: "Tactical Menu HUD", category: "UI Design", img: "/images/menu1.png", tech: ["Figma", "Unity UI"], desc: "Futuristic game interface for high-action RPGs." },
  { id: 13, title: "Starkit Dashboard", category: "UI Design", img: "/images/starkit.png", tech: ["React", "UI/UX"], desc: "Educational platform interface with gamified elements." },
  { id: 14, title: "Inventory Nexus", category: "UI Design", img: "/images/menu2.png", tech: ["UI Engineering"], desc: "Advanced item management system interface." },

  // Character Design
  { id: 15, title: "Neon Knight", category: "Character Design", img: "/images/fuse1.png", tech: ["Character Creator", "Fuse"], desc: "Futuristic warrior design with modular armor." },
  { id: 16, title: "Cyber Vanguard", category: "Character Design", img: "/images/fuse2.png", tech: ["Rigging", "Animation"], desc: "Custom-rigged character for real-time applications." },

  // Game Dev
  { id: 17, title: "Titan Platformer", category: "Game Development", img: "/images/platformer1.png", tech: ["Unity", "C#"], desc: "Fast-paced action platformer with custom physics." },
  { id: 18, title: "Digital Snooker", category: "Game Development", img: "/images/snooker.png", tech: ["Physics Engine"], desc: "Highly accurate digital billiards simulation." }
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter(p => 
    (activeFilter === "All" || p.category === activeFilter) &&
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const heroImage = PlaceHolderImages.find(img => img.id === "portfolio-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Portfolio Background" 
              fill 
              className="object-cover"
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/20 py-1.5 px-4 rounded-full mb-6 uppercase tracking-widest text-[10px] font-bold">
              The Creative Vault
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold font-headline leading-tight">
              Our Vision. <br />
              <span className="text-gradient">Your Reality.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed mt-8">
              Explore the real-world impact of Cyber Generation Dawn. From hyper-realistic 
              3D assets to grand-scale metaverse level design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter System */}
      <section className="py-6 px-6 sticky top-20 z-40 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "default" : "ghost"}
                className={cn(
                  "rounded-full px-5 h-9 text-xs transition-all",
                  activeFilter === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"
                )}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search vault..." 
              className="pl-11 bg-white/5 border-white/10 rounded-full h-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div 
                      className="group glass rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-primary/20 transition-all cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image 
                          src={project.img} 
                          alt={project.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <Badge className="bg-primary/20 text-primary border-primary/20 mb-2 uppercase tracking-widest text-[8px]">{project.category}</Badge>
                          <h3 className="text-2xl font-bold font-headline text-white group-hover:text-primary transition-colors">{project.title}</h3>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <Maximize2 className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-8 space-y-4">
                        <p className="text-muted-foreground text-sm line-clamp-2">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map(t => (
                            <Badge key={t} variant="secondary" className="bg-white/5 text-[8px] uppercase tracking-wider">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="glass border-white/10 text-white max-w-4xl p-0 overflow-hidden">
                    {selectedProject && (
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative aspect-square md:h-full">
                          <Image src={selectedProject.img} alt={selectedProject.title} fill className="object-cover" />
                        </div>
                        <div className="p-10 space-y-8 flex flex-col justify-center">
                          <DialogHeader>
                            <Badge className="bg-primary/20 text-primary w-fit mb-2 uppercase text-[10px]">{selectedProject.category}</Badge>
                            <DialogTitle className="text-4xl font-headline text-white">{selectedProject.title}</DialogTitle>
                            <DialogDescription className="text-muted-foreground text-lg pt-4 leading-relaxed">
                              {selectedProject.desc}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <h5 className="font-bold text-xs uppercase tracking-widest text-primary">Stack Used</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tech.map(t => (
                                <div key={t} className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-xs">
                                  <Zap className="w-3 h-3 text-primary" /> {t}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="pt-8 flex gap-4">
                            <Button className="flex-1 bg-primary hover:bg-primary/90 rounded-full h-12 font-bold gap-2">
                              <Play className="w-4 h-4 fill-white" /> Full Preview
                            </Button>
                            <Button variant="outline" className="glass border-white/10 rounded-full h-12 font-bold gap-2 px-6">
                              <Star className="w-4 h-4" /> Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section className="py-24 px-6 relative bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Assets Created", value: "500+", icon: BoxSelect },
            { label: "VR Worlds", value: "40+", icon: Glasses },
            { label: "UI Kits", value: "25+", icon: LayoutGrid },
            { label: "Level Renders", value: "100+", icon: Globe },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[2.5rem] border-white/5 text-center space-y-4"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-4xl font-bold text-white font-headline">{item.value}</h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
