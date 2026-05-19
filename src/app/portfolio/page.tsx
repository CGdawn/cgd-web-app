
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
  Search, Filter, ArrowRight, ExternalLink, Github, Sparkles,
  Zap, Globe, LayoutGrid, List, Play, X, Star
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

const categories = [
  "All", "Game Development", "VR & AR", "AI Solutions", 
  "Web Applications", "Mobile Apps", "3D Visualization", 
  "Animation", "Robotics", "Educational Technology"
];

const projects = [
  {
    id: 1,
    title: "VR Museum Experience",
    category: "VR & AR",
    desc: "Immersive historical VR experience for museums using Oculus Quest and Unity. Features 360° interaction and interactive sculptures.",
    tech: ["Unity", "Blender", "XR Toolkit"],
    img: "project-vr",
    timeline: "6 Months",
    team: "12 Members",
    metrics: "98% User Satisfaction"
  },
  {
    id: 2,
    title: "Educational Game Platform",
    category: "Educational Technology",
    desc: "Interactive educational gaming system for children with gamified learning and AI learning assistance.",
    tech: ["Unity", "Firebase", "GenAI"],
    img: "project-edu",
    timeline: "8 Months",
    team: "8 Members",
    metrics: "50k+ Active Students"
  },
  {
    id: 3,
    title: "Virtual Estate Manager (VEM)",
    category: "3D Visualization",
    desc: "Collaborative 3D visualization and metaverse architecture platform built with Unreal Engine.",
    tech: ["Unreal Engine", "Node.js", "PostgreSQL"],
    img: "project-vem",
    timeline: "12 Months",
    team: "15 Members",
    metrics: "Used by 20+ Real Estate Firms"
  },
  {
    id: 4,
    title: "AI-Powered Business Dashboard",
    category: "AI Solutions",
    desc: "Enterprise AI dashboard providing predictive analytics, CRM integration, and smart automation insights.",
    tech: ["Next.js", "OpenAI API", "PostgreSQL"],
    img: "project-dashboard",
    timeline: "4 Months",
    team: "5 Members",
    metrics: "40% Increase in Productivity"
  },
  {
    id: 5,
    title: "Dawn of Titans: RPG",
    category: "Game Development",
    desc: "A cinematic next-gen mobile RPG featuring real-time raytracing and AI-driven behavior.",
    tech: ["Unreal Engine 5", "Niagara VFX", "Neural Networks"],
    img: "project-game",
    timeline: "24 Months",
    team: "40 Members",
    metrics: "App Store Editor's Choice"
  },
  {
    id: 6,
    title: "Neural Animation Engine",
    category: "Animation",
    desc: "AI-driven character animation production suite for visual effects and cinematic rendering.",
    tech: ["Blender", "Python", "PyTorch"],
    img: "animation",
    timeline: "10 Months",
    team: "6 Members",
    metrics: "3x Faster Rendering"
  }
];

const stats = [
  { label: "Projects Completed", value: "100+", icon: Zap },
  { label: "Games Developed", value: "25+", icon: Gamepad2 },
  { label: "VR Experiences", value: "15+", icon: Glasses },
  { label: "Countries Reached", value: "30+", icon: Globe },
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
        <div className="absolute inset-0 opacity-10">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Background" 
              fill 
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/20 py-1.5 px-4 rounded-full mb-6">
              Our Creations
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold font-headline leading-tight">
              Our Innovation. <br />
              <span className="text-gradient">Our Future.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed mt-8">
              Witness the transformation of visionary ideas into world-class digital realities. 
              From immersive RPGs to enterprise-grade AI ecosystems.
            </p>
            <div className="flex justify-center gap-4 mt-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-16 px-12 text-lg font-bold group">
                View Projects <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter System */}
      <section className="py-12 px-6 sticky top-20 z-40 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? "default" : "ghost"}
                className={cn(
                  "rounded-full px-6 transition-all",
                  activeFilter === cat ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
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
              placeholder="Search projects..." 
              className="pl-11 bg-white/5 border-white/10 rounded-full h-12"
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
                          src={PlaceHolderImages.find(img => img.id === project.img)?.imageUrl || ""} 
                          alt={project.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-6 left-6">
                          <Badge className="bg-primary/20 text-primary border-primary/20 mb-2">{project.category}</Badge>
                          <h3 className="text-2xl font-bold font-headline text-white">{project.title}</h3>
                        </div>
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <Play className="w-6 h-6 text-white fill-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-8 space-y-4">
                        <p className="text-muted-foreground text-sm line-clamp-2">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map(t => (
                            <Badge key={t} variant="secondary" className="bg-white/5 text-[8px] uppercase">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="glass border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-headline">{project.title}</DialogTitle>
                      <DialogDescription className="text-primary font-bold uppercase tracking-widest text-xs">
                        {project.category}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-12 mt-6">
                      <div className="relative aspect-video rounded-3xl overflow-hidden glass border border-white/10">
                        <Image 
                          src={PlaceHolderImages.find(img => img.id === project.img)?.imageUrl || ""} 
                          alt={project.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                          <h4 className="text-xl font-bold font-headline text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" /> Project Overview
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">{project.desc}</p>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="glass p-6 rounded-2xl border-white/5">
                              <p className="text-xs text-muted-foreground uppercase mb-1">Timeline</p>
                              <p className="font-bold text-white">{project.timeline}</p>
                            </div>
                            <div className="glass p-6 rounded-2xl border-white/5">
                              <p className="text-xs text-muted-foreground uppercase mb-1">Impact</p>
                              <p className="font-bold text-white">{project.metrics}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h4 className="text-xl font-bold font-headline text-white">Tech Stack</h4>
                          <div className="flex flex-col gap-3">
                            {project.tech.map(t => (
                              <div key={t} className="flex items-center gap-3 glass p-4 rounded-xl border-white/5">
                                <Zap className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{t}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-6 space-y-3">
                            <Button className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl">
                              <ExternalLink className="mr-2 w-4 h-4" /> Live Demo
                            </Button>
                            <Button variant="outline" className="w-full glass border-white/10 h-12 rounded-xl">
                              <Github className="mr-2 w-4 h-4" /> View Source
                            </Button>
                          </div>
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

      {/* Portfolio Stats */}
      <section className="py-24 px-6 relative bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, i) => (
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

      {/* Tech Showcase */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">Ecosystem</h2>
            <h3 className="text-4xl font-bold font-headline text-white">The Tech Behind the Dawn</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
             {[Gamepad2, Box, Code, Globe, Cpu, Bot, GraduationCap].map((Icon, i) => (
               <Icon key={i} className="w-16 h-16 text-white/40 hover:text-primary transition-colors cursor-pointer" />
             ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto glass p-16 rounded-[4rem] border-white/10 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full" />
          <h2 className="text-5xl font-bold font-headline text-white">Let's Build the Future Together</h2>
          <p className="text-muted-foreground text-lg">
            Ready to transform your vision into a digital masterpiece? Our team of 
            visionary engineers and creative artists is ready to innovate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-12 h-16 text-lg font-bold" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button size="lg" variant="outline" className="glass border-white/10 hover:bg-white/5 rounded-full px-12 h-16 text-lg" asChild>
              <Link href="/services">Hire Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
