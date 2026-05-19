
"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Gamepad2, Box, Code, Glasses, Bot, GraduationCap, 
  Zap, Shield, Globe, Database, Layers, ArrowRight,
  Cpu, Rocket, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: Gamepad2,
    title: "Game Development",
    desc: "Unity & Unreal Engine experts crafting AAA-grade mobile, PC, and educational games. We build immersive worlds and multiplayer systems that push hardware limits.",
    features: ["Unity & Unreal", "Mobile & PC", "Multiplayer Systems", "Educational Games"],
    color: "text-primary",
    image: "game-dev"
  },
  {
    icon: Box,
    title: "2D & 3D Animation",
    desc: "Breathtaking motion graphics, cinematic visualizations, and character animation that tell compelling stories and elevate brand identities.",
    features: ["Character Animation", "Motion Graphics", "Cinematics", "Storyboarding"],
    color: "text-secondary",
    image: "animation"
  },
  {
    icon: Code,
    title: "Fullstack Web & Mobile",
    desc: "Scalable cloud-based architectures, high-performance APIs, and interactive cross-platform applications for Android and iOS.",
    features: ["React & Next.js", "Android Apps", "Cloud APIs", "Admin Dashboards"],
    color: "text-primary",
    image: "fullstack"
  },
  {
    icon: Glasses,
    title: "VR & AR Development",
    desc: "Immersive metaverse environments, Oculus Quest solutions, and architectural walkthroughs that redefine spatial interaction.",
    features: ["Oculus Solutions", "Museum VR", "Metaverse Environments", "Architectural VR"],
    color: "text-secondary",
    image: "vr-ar"
  },
  {
    icon: Bot,
    title: "AI Solutions",
    desc: "Intelligent automation, predictive analytics, and AI-driven content tools designed to transform enterprise productivity and customer engagement.",
    features: ["AI Chatbots", "Predictive Analytics", "Content Tools", "Automation"],
    color: "text-primary",
    image: "hero-bg"
  },
  {
    icon: Cpu,
    title: "Robotics & Automation",
    desc: "Smart robotics simulations and embedded systems that bridge the gap between digital intelligence and physical execution.",
    features: ["Smart Robotics", "Simulations", "Embedded Systems", "AI Control"],
    color: "text-secondary",
    image: "robotics"
  },
  {
    icon: GraduationCap,
    title: "Tutoring & Mentorship",
    desc: "Elite mentorship in programming, 3D design, and game development for aspiring creators and the next generation of tech leaders.",
    features: ["Coding Bootcamps", "Game Dev Courses", "3D Design", "Tech Career Paths"],
    color: "text-primary",
    image: "about-hero"
  }
];

const processes = [
  { title: "Discovery", desc: "Understanding your vision and core requirements." },
  { title: "Planning", desc: "Detailed roadmap and technical architecture design." },
  { title: "Design", desc: "User-centric UI/UX and aesthetic framework development." },
  { title: "Development", desc: "Clean code execution and feature implementation." },
  { title: "Testing", desc: "Rigorous QA and performance optimization." },
  { title: "Deployment", desc: "Global launch and ecosystem integration." },
  { title: "Maintenance", desc: "Continuous support and scaling strategies." }
];

const technologies = [
  { name: "React", icon: Rocket },
  { name: "Next.js", icon: Sparkles },
  { name: "Unity", icon: Gamepad2 },
  { name: "Unreal Engine", icon: Box },
  { name: "Blender", icon: Box },
  { name: "Node.js", icon: Code },
  { name: "PostgreSQL", icon: Database },
  { name: "Firebase", icon: Globe },
  { name: "Three.js", icon: Layers },
  { name: "Tailwind CSS", icon: Sparkles },
];

export default function ServicesPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "services-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Grid" 
              fill 
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30 py-1.5 px-4 rounded-full mb-6">
              Our Expertise
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-headline leading-tight">
              Building the <span className="text-gradient">Future</span> <br />
              Through Technology.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mt-6">
              CyGen Dawn delivers high-impact digital solutions spanning AI, gaming, 
              robotics, and fullstack development. We create the tools for tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-14 px-8 text-lg font-bold">
                Start a Project
              </Button>
              <Button size="lg" variant="outline" className="glass border-white/10 hover:bg-white/5 rounded-full h-14 px-8 text-lg">
                Explore Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group glass p-8 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                
                <div className={`p-4 rounded-2xl bg-white/5 w-fit mb-6 transition-colors group-hover:bg-primary/20`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                
                <h4 className="text-2xl font-bold font-headline text-white mb-4">{service.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/60">
                      <Zap className="w-3 h-3 text-primary" /> {f}
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" className="p-0 text-primary font-bold text-xs uppercase tracking-widest hover:bg-transparent group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Our Process</h2>
            <h3 className="text-4xl font-bold font-headline text-white">How We Build</h3>
          </div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 relative z-10">
              {processes.map((p, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto text-black font-bold border-4 border-background ring-4 ring-primary/20">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-white text-sm">{p.title}</h4>
                  <p className="text-[10px] text-muted-foreground leading-tight px-4">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">Tech Stack</h2>
            <h3 className="text-4xl font-bold font-headline text-white">Industry-Leading Tools</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-12 opacity-50">
            {technologies.map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
                <tech.icon className="w-10 h-10 text-white group-hover:text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-10">
          <h2 className="text-5xl md:text-7xl font-bold font-headline text-white leading-tight">
            Let's Build Something <br />
            <span className="text-gradient">Extraordinary</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-14 px-12 text-lg font-bold">
              Contact Us Now
            </Button>
            <p className="text-muted-foreground">or email us at <span className="text-white font-bold">hello@cgdawn.org</span></p>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
