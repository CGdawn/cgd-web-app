
"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Phone, Mail, MapPin, Clock, Send, MessageSquare, 
  Sparkles, Zap, Shield, Globe, Rocket, Calendar,
  ArrowRight, Bot, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactInfo = [
  { icon: MapPin, label: "Office", value: "Lagos, Nigeria", color: "text-primary" },
  { icon: Phone, label: "Phone", value: "+234 810 408 2051", color: "text-secondary" },
  { icon: Mail, label: "Email", value: "contact@cgdawn.org", color: "text-primary" },
  { icon: Clock, label: "Hours", value: "Mon - Fri, 9am - 6pm", color: "text-secondary" },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Timelines vary depending on complexity. Small projects can take 2-4 months, while AAA game dev or enterprise AI systems can take 12-24 months. We provide a detailed roadmap after discovery."
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely! We operate globally with a remote-first collaborative model, serving clients across Africa, Europe, and North America."
  },
  {
    q: "What technologies do you specialize in?",
    a: "Our core stack includes Unreal Engine 5, Unity, Next.js, OpenAI APIs, and advanced robotics simulations."
  },
  {
    q: "Do you offer internships or mentorships?",
    a: "Yes! We have dedicated tracks for NYSC, SIWES, and graduate trainees under our 'Next-Gen' initiative."
  }
];

const services = [
  "Game Development", "Web Development", "VR & AR", 
  "AI Solutions", "Animation", "Robotics", "Mentorship"
];

export default function ContactPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "contact-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Network" 
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
            <Badge className="bg-primary/20 text-primary border-primary/20 py-1.5 px-4 rounded-full mb-6">
              Connect With Us
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold font-headline leading-tight">
              Let's Create the <br />
              <span className="text-gradient">Future Together.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed mt-8">
              Whether you're an innovator, a business leader, or a creative visionary, 
              CyGen Dawn is your partner in technological evolution.
            </p>
            <div className="flex justify-center gap-6 mt-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-16 px-12 text-lg font-bold">
                Start a Conversation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info & Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Information</h2>
              <h3 className="text-4xl font-bold font-headline text-white">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Have a specific project in mind? Or just want to say hello? 
                Our team is always ready to discuss the next big thing in digital innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="glass p-8 rounded-[2rem] border-white/5 space-y-4 hover:bg-white/5 transition-all">
                  <div className={`p-4 rounded-xl bg-white/5 w-fit ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-bold text-white text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <Shield className="w-12 h-12 text-primary opacity-20" />
              </div>
              <h4 className="text-2xl font-bold font-headline text-white mb-4">Enterprise Support</h4>
              <p className="text-muted-foreground mb-8">
                Looking for priority consultation or enterprise-grade software solutions? 
                Connect with our strategic advisors for dedicated support.
              </p>
              <Button variant="outline" className="glass border-white/10 rounded-full h-12 px-8">
                Request Priority Call <Zap className="ml-2 w-4 h-4 text-primary" />
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-12 rounded-[3.5rem] border border-white/10 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            
            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-white/70">Full Name</Label>
                  <Input placeholder="Donald Attah" className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-white/70">Email Address</Label>
                  <Input type="email" placeholder="donald@cgdawn.org" className="bg-white/5 border-white/10 h-14 rounded-2xl" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-white/70">Service Required</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-2xl">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/10 text-white">
                    {services.map(s => (
                      <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-white/70">Message</Label>
                <Textarea placeholder="Tell us about your project or inquiry..." className="bg-white/5 border-white/10 min-h-[160px] rounded-2xl p-6" />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 h-16 rounded-2xl text-lg font-bold group">
                Send Message <Send className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By submitting this form, you agree to our <span className="text-white underline">Privacy Policy</span>.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">Common Questions</h2>
            <h3 className="text-4xl font-bold font-headline text-white">Find Your Answers</h3>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass px-8 py-2 rounded-[2rem] border-white/5 overflow-hidden">
                <AccordionTrigger className="text-left font-bold text-white hover:no-underline font-headline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Scheduling CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-5xl mx-auto glass p-16 rounded-[4rem] border-white/10 space-y-10 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary/5 blur-[120px]" />
          <h2 className="text-5xl font-bold font-headline text-white">Book a Discovery Call</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to dive deep into your project requirements? Schedule a 15-minute 
            consultation with our technical leads via Google Meet.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-12 h-16 text-lg font-bold">
            <Calendar className="mr-3 w-6 h-6" /> Schedule Meeting
          </Button>
          <div className="flex justify-center gap-12 pt-8 opacity-40">
            <div className="flex items-center gap-2"><Star className="w-4 h-4" /> 4.9/5 Rating</div>
            <div className="flex items-center gap-2"><Bot className="w-4 h-4" /> AI Assisted Routing</div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
