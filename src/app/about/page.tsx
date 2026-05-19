
"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Rocket, Target, Eye, Users, ShieldCheck, Sparkles, 
  ArrowRight, Linkedin, Twitter, Heart, Globe, 
  Zap, Award, GraduationCap, Bot
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  { icon: Zap, title: "Innovation", desc: "Pushing the boundaries of digital reality every single day." },
  { icon: ShieldCheck, title: "Integrity", desc: "Transparent and ethical technology at our core." },
  { icon: Sparkles, title: "Excellence", desc: "Uncompromising quality in every pixel and line of code." },
  { icon: Heart, title: "Youth Impact", desc: "Empowering Africa's next generation of creators." },
];

const team = [
  { 
    name: "Donald Attah", 
    role: "Founder & CEO", 
    img: "team-ceo", 
    bio: "A visionary technologist dedicated to transforming Africa's tech landscape through AI and Game Dev.",
    skills: ["AI Strategy", "Game Dev", "Leadership"]
  },
  { 
    name: "Sarah Chen", 
    role: "CTO", 
    img: "team-cto", 
    bio: "Expert in scalable cloud systems and AI-driven infrastructure architecture.",
    skills: ["Cloud Ops", "Python", "Scalability"]
  },
  { 
    name: "Marcus Thorne", 
    role: "Creative Director", 
    img: "team-creative", 
    bio: "Award-winning visual storyteller bridging imagination and high-fidelity digital art.",
    skills: ["3D Art", "UX Design", "Cinematics"]
  },
];

const achievements = [
  { label: "Projects Delivered", value: "100+", icon: Rocket },
  { label: "Students Mentored", value: "12k+", icon: GraduationCap },
  { label: "AI Solutions", value: "15+", icon: Bot },
  { label: "Global Partners", value: "20+", icon: Globe },
];

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "about-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
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
              Creating Tomorrow Today
            </Badge>
            <h1 className="text-6xl md:text-9xl font-bold font-headline leading-tight tracking-tighter">
              The <span className="text-gradient">Dawn</span> of a New <br /> Digital Era.
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed mt-8">
              Based in Lagos, CyGen Dawn is a technological powerhouse at the intersection of 
              AI, Robotics, and Immersive Entertainment.
            </p>
            <div className="flex justify-center mt-12">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full h-16 px-12 text-lg font-bold group">
                Explore Our Vision <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Achievements */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-[2rem] border-white/5 text-center space-y-2"
            >
              <h4 className="text-4xl font-bold text-white font-headline">{item.value}</h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Our Story</h2>
            <h3 className="text-4xl font-bold font-headline text-white">From Lagos to the World</h3>
          </div>
          <div className="glass-dark p-8 md:p-16 rounded-[3rem] border-white/5 space-y-8 text-lg leading-relaxed text-muted-foreground">
            <p>
              Founded by <span className="text-white font-bold">Donald Attah</span>, CyGen Dawn began as a response 
              to the rapidly evolving global tech landscape. Recognizing the immense talent within 
              Nigeria and across the continent, CyGen Dawn was established to bridge the gap 
              between local innovation and global standards.
            </p>
            <p>
              What started as a boutique web studio has blossomed into a multi-disciplinary powerhouse. 
              Today, we operate at the cutting edge of <span className="text-primary font-bold">Unreal Engine 5 development, 
              Advanced Robotics, and Neural Networks</span>, delivering world-class projects that 
              push the boundaries of what's possible.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision Cards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-12 rounded-[3rem] space-y-6 border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <Target className="w-12 h-12 text-primary" />
            <h2 className="text-3xl font-bold font-headline text-white">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower industries and individuals through revolutionary technological solutions, 
              fostering a future where technology enhances human potential and creativity across Africa.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass p-12 rounded-[3rem] space-y-6 border-white/5 relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors" />
            <Eye className="w-12 h-12 text-secondary" />
            <h2 className="text-3xl font-bold font-headline text-white">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To be the global cornerstone of technological evolution, leading the charge in 
              AI, game development, and immersive experiences from the heart of Lagos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-1/3 h-1/2 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 order-2 lg:order-1 space-y-8">
            <Badge className="bg-primary/20 text-primary border-primary/20">Founder & CEO</Badge>
            <h3 className="text-5xl md:text-6xl font-bold font-headline text-white leading-tight">Donald Attah</h3>
            <p className="text-muted-foreground text-xl leading-relaxed italic">
              "Technology is the ultimate equalizer. At CyGen Dawn, we are not just coding apps; we are architecting the future of human experience."
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Donald is a visionary technologist with over a decade of experience in Software Architecture, 
                AI Research, and Game Development. His passion for education led to the creation of 
                mentorship programs that have impacted thousands of African developers.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                {["AI Research", "Unreal Engine", "Strategic Innovation", "Youth Mentor"].map((tag) => (
                  <Badge key={tag} variant="outline" className="border-white/10 text-[10px] uppercase tracking-widest">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button size="icon" variant="outline" className="glass border-white/10 rounded-xl hover:bg-primary hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="outline" className="glass border-white/10 rounded-xl hover:bg-primary hover:text-white">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <div className="relative aspect-[3/4] max-w-md mx-auto glass p-3 rounded-[4rem] border-white/10 rotate-2 group hover:rotate-0 transition-transform duration-700">
              <div className="relative w-full h-full overflow-hidden rounded-[3.5rem]">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === "team-ceo")?.imageUrl || ""} 
                  alt="Donald Attah" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl border-white/10 animate-float">
                <Award className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Core Values</h2>
            <h3 className="text-4xl font-bold font-headline text-white">What Drives Us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center space-y-4 p-8 glass rounded-[2.5rem] border-white/5 hover:bg-white/5 transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                  <v.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-white font-headline">{v.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">Leadership</h2>
            <h3 className="text-4xl font-bold font-headline text-white">The Visionary Core</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <Card key={i} className="glass border-white/5 overflow-hidden group hover:border-primary/20 transition-all duration-500 rounded-[3rem]">
                <CardContent className="p-0">
                  <div className="relative h-96 w-full overflow-hidden">
                    <Image 
                      src={PlaceHolderImages.find(img => img.id === member.img)?.imageUrl || ""} 
                      alt={member.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  </div>
                  <div className="p-8 space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white font-headline">{member.name}</h4>
                      <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                    <div className="flex gap-2 pt-4">
                      {member.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-white/5 text-[8px] uppercase">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto glass p-16 rounded-[4rem] border-white/10 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl" />
          <h2 className="text-5xl font-bold font-headline text-white">Build the Future With Us</h2>
          <p className="text-muted-foreground text-lg">
            Whether you're looking to start a project, join the team, or form a strategic 
            partnership, we're ready to create something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-12 h-14 font-bold" asChild>
              <Link href="/contact">Partner With Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="glass border-white/10 hover:bg-white/5 rounded-full px-12 h-14" asChild>
              <Link href="/careers">Join the Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
