
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
  Cpu, Rocket, Sparkles, BoxSelect, Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: Gamepad2,
    title: "Game Development",
    desc: "Unity & Unreal Engine experts crafting high-performance mobile, PC, and educational games. We specialize in cross-platform systems and realistic physics.",
    features: ["Physics Optimization", "Mobile & PC", "Multiplayer Integration", "Unreal Engine 5"],
    color: "text-primary",
    image: "/images/platformer1.png"
  },
  {
    icon: Box,
    title: "2D & 3D Animation",
    desc: "Breathtaking cinematic visualizations, motion graphics, and character animation designed to tell compelling stories with premium quality.",
    features: ["Cinematic Rendering", "Motion Graphics", "Character Design", "Storyboarding"],
    color: "text-secondary",
    image: "/images/blender-rain.png"
  },
  {
    icon: BoxSelect,
    title: "3D Asset Production",
    desc: "Hard surface modeling and product visualization. We create production-ready assets from tactical weapons to luxury consumer products.",
    features: ["Hard Surface Modeling", "PBR Texturing", "Asset Optimization", "Digital Twins"],
    color: "text-primary",
    image: "/images/sword.png"
  },
  {
    icon: Glasses,
    title: "VR & Metaverse",
    desc: "Immersive virtual galleries, metaverse environments, and architectural walkthroughs that redefine how users interact with digital space.",
    features: ["Metaverse Design", "Museum VR", "Immersive Training", "Architectural VR"],
    color: "text-secondary",
    image: "/images/metaverse-galleria.png"
  },
  {
    icon: Code,
    title: "UI/UX & Software",
    desc: "Futuristic software architectures and dashboard designs. We build scalable, high-performance applications with a focus on immersive UX.",
    features: ["Starkit UI Design", "Dashboard Systems", "React & Next.js", "Cloud Solutions"],
    color: "text-primary",
    image: "/images/menu3.png"
  },
  {
    icon: GraduationCap,
    title: "Mentorship",
    desc: "Elite mentorship in programming, 3D design, and game development. Empowering the next generation of creative technologists across Africa.",
    features: ["Coding Bootcamps", "Game Dev Courses", "3D Modeling IT", "Tech Career Paths"],
    color: "text-secondary",
    image: "/images/classroom.png"
  }
];

export default function ServicesPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "services-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Grid Background" 
              fill 
              className="object-cover"
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/20 py-1.5 px-4 rounded-full mb-6 uppercase tracking-widest text-[10px] font-bold">
              Operational Expertise
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-headline leading-tight">
              Building the <span className="text-gradient">Future</span> <br />
              With Precision.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mt-6">
              CyGen Dawn delivers high-impact creative solutions. From meticulous 3D asset modeling 
              to grand-scale metaverse level design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-14 px-10 text-lg font-bold">
                Start a Conversation
              </Button>
              <Button size="lg" variant="outline" className="glass border-white/10 hover:bg-white/5 rounded-full h-14 px-10 text-lg">
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group glass rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  <div className="absolute top-6 left-6">
                    <div className={`p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 ${service.color}`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col space-y-4">
                  <h4 className="text-2xl font-bold font-headline text-white">{service.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <ul className="grid grid-cols-2 gap-y-3 pt-2">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] text-white/60 uppercase font-bold tracking-wider">
                        <Zap className="w-3 h-3 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 mt-auto">
                    <Button variant="ghost" className="p-0 text-primary font-bold text-xs uppercase tracking-widest hover:bg-transparent group-hover:translate-x-2 transition-transform">
                      Inquire Details <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-10">
          <h2 className="text-5xl md:text-7xl font-bold font-headline text-white leading-tight">
            Ready to Build the <br />
            <span className="text-gradient">Next Generation?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-16 px-12 text-lg font-bold">
              Initialize Project
            </Button>
            <p className="text-muted-foreground">Direct Handshake: <span className="text-white font-bold">hello@cgdawn.org</span></p>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
