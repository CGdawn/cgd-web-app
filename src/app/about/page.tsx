
"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Target, Eye, Users, ShieldCheck, Sparkles } from "lucide-react";

export default function AboutPage() {
  const ceoImage = PlaceHolderImages.find(img => img.id === "team-ceo");
  const ctoImage = PlaceHolderImages.find(img => img.id === "team-cto");
  const creativeImage = PlaceHolderImages.find(img => img.id === "team-creative");
  const heroImage = PlaceHolderImages.find(img => img.id === "about-hero");

  const values = [
    { icon: Rocket, title: "Innovation", desc: "Pushing the boundaries of what's possible in digital reality." },
    { icon: ShieldCheck, title: "Integrity", desc: "Building trust through transparent and ethical technological solutions." },
    { icon: Sparkles, title: "Excellence", desc: "Crafting every pixel and line of code with uncompromising quality." },
  ];

  const team = [
    { name: "Donald Attah", role: "Founder & CEO", img: ceoImage, bio: "A visionary leader dedicated to transforming the technological landscape of Africa and beyond." },
    { name: "Sarah Chen", role: "CTO", img: ctoImage, bio: "Expert in scalable systems and AI-driven infrastructure." },
    { name: "Marcus Thorne", role: "Creative Director", img: creativeImage, bio: "Award-winning artist bridging the gap between imagination and digital art." },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
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
          <Badge className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30 py-1.5 px-4 rounded-full">
            Our Journey
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-headline text-white leading-tight">
            Creating <span className="text-gradient">Tomorrow</span> Today.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Based in Lagos, Nigeria, Cyber Generation Dawn (CG DAWN) is a collective of visionaries, 
            engineers, and artists dedicated to pioneering the next generation of digital reality.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass p-12 rounded-[3rem] space-y-6 border-white/5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <Target className="w-12 h-12 text-primary" />
            <h2 className="text-3xl font-bold font-headline text-white">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower industries and individuals through revolutionary technological solutions, 
              fostering a future where technology enhances human potential and creativity.
            </p>
          </div>
          <div className="glass p-12 rounded-[3rem] space-y-6 border-white/5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors" />
            <Eye className="w-12 h-12 text-secondary" />
            <h2 className="text-3xl font-bold font-headline text-white">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To be the global cornerstone of technological evolution, leading the charge in 
              AI, game development, and immersive experiences from the heart of Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <h2 className="text-4xl font-bold font-headline text-white">The CG DAWN Story</h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed text-left glass-dark p-8 md:p-12 rounded-[2.5rem] border-white/5">
            <p>
              Founded by Donald Attah, Cyber Generation Dawn began as a response to the rapidly 
              evolving global tech landscape. Recognizing the immense talent within Lagos and 
              across the continent, CG DAWN was established to bridge the gap between local 
              innovation and global standards.
            </p>
            <p>
              What started as a small team focused on web solutions has blossomed into a 
              multi-disciplinary powerhouse. Today, we operate at the intersection of 
              Game Development, AI, Robotics, and VR/AR, delivering world-class projects 
              that push the boundaries of what is possible.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Core Principles</h2>
            <h3 className="text-4xl font-bold font-headline text-white">What Drives Us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center space-y-4 p-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto border border-white/5">
                  <v.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-white font-headline">{v.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Users className="w-10 h-10 text-secondary mb-2" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">The Core Team</h2>
            <h3 className="text-4xl font-bold font-headline text-white">Visionaries Behind AetherCore</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <Card key={i} className="glass border-white/5 overflow-hidden group hover:border-primary/20 transition-all duration-500 rounded-[2.5rem]">
                <CardContent className="p-0">
                  <div className="relative h-80 w-full overflow-hidden">
                    {member.img && (
                      <Image 
                        src={member.img.imageUrl} 
                        alt={member.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint={member.img.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  </div>
                  <div className="p-8 space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white font-headline">{member.name}</h4>
                      <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
