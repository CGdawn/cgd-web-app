
"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Briefcase, Users, Zap, GraduationCap, ArrowRight,
  Clock, MapPin, DollarSign, Rocket, Globe, Sparkles,
  MessageSquare, FileText, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const jobs = [
  {
    title: "Fullstack Developer",
    dept: "Engineering",
    type: "Full-time",
    location: "Lagos / Remote",
    salary: "$2k - $4k",
    exp: "Mid-Senior",
    desc: "We are looking for a Fullstack Wizard to lead our Next.js and Cloud architecture."
  },
  {
    title: "Unity Game Developer",
    dept: "Gaming",
    type: "Full-time",
    location: "Lagos / Hybrid",
    salary: "$1.5k - $3k",
    exp: "Mid-Level",
    desc: "Join our core gaming team to build high-performance mobile RPGs using Unity."
  },
  {
    title: "AI Engineer",
    dept: "AI & Robotics",
    type: "Full-time",
    location: "Remote",
    salary: "$3k - $6k",
    exp: "Senior",
    desc: "Implement cutting-edge LLMs and computer vision solutions for enterprise clients."
  },
  {
    title: "3D Artist",
    dept: "Creative",
    type: "Contract",
    location: "Hybrid",
    salary: "$1k - $2k",
    exp: "Mid-Level",
    desc: "Create stunning character models and environments for our upcoming VR titles."
  },
  {
    title: "UI/UX Designer",
    dept: "Creative",
    type: "Full-time",
    location: "Remote",
    salary: "$1.5k - $3k",
    exp: "Mid-Senior",
    desc: "Design the next generation of futuristic dashboard UIs and mobile experiences."
  }
];

const culture = [
  { icon: Zap, title: "Innovation First", desc: "We don't just follow trends; we create the blueprints for tomorrow." },
  { icon: Globe, title: "Global Mindset", desc: "Based in Lagos, collaborating with talent across the entire planet." },
  { icon: GraduationCap, title: "Mentorship", desc: "Every senior is a mentor. We grow together as a collective." },
  { icon: Rocket, title: "Youth Empowerment", desc: "We believe in the raw potential of the next generation." }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const heroImage = PlaceHolderImages.find(img => img.id === "careers-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Careers" 
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
            <Badge className="bg-secondary/20 text-secondary border-secondary/20 py-1.5 px-4 rounded-full mb-6">
              Join the Mission
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-headline leading-tight">
              Build the <span className="text-gradient">Next Generation</span> <br />
              With CyGen Dawn.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mt-6">
              We are a collective of visionaries, artists, and engineers dedicated to 
              pioneering the future of digital reality. Your journey starts here.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-14 px-10 text-lg mt-10 font-bold" asChild>
              <a href="#openings">View Open Positions</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {culture.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2rem] border border-white/5 space-y-4"
            >
              <div className="p-3 bg-white/5 w-fit rounded-xl">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-white font-headline">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Openings */}
      <section id="openings" className="py-24 px-6 bg-black/20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">Opportunities</h2>
            <h3 className="text-4xl font-bold font-headline text-white">Current Openings</h3>
          </div>

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div 
                      onClick={() => setSelectedJob(job)}
                      className="group glass p-6 rounded-[1.5rem] border border-white/5 hover:border-primary/20 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{job.title}</h4>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.dept}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs font-bold text-white">{job.salary}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{job.exp}</p>
                        </div>
                        <Button variant="outline" className="glass border-white/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                          Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="glass border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-headline">{selectedJob?.title}</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        {selectedJob?.dept} • {selectedJob?.location} • {selectedJob?.type}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-8 mt-6">
                      <div className="space-y-4">
                        <h5 className="font-bold text-primary flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> About the Role
                        </h5>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {selectedJob?.desc} We are building something massive and we need your expertise to make it happen. 
                          At CyGen Dawn, we value creative problem solving and a relentless drive for innovation.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h5 className="font-bold text-primary flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Requirements
                        </h5>
                        <ul className="text-sm space-y-2 text-muted-foreground list-disc list-inside">
                          <li>Proven experience in {selectedJob?.dept} workflows.</li>
                          <li>Strong portfolio or GitHub demonstrating technical depth.</li>
                          <li>Ability to collaborate in a high-speed, remote-first environment.</li>
                          <li>Passion for futuristic technology and creative storytelling.</li>
                        </ul>
                      </div>

                      <hr className="border-white/5" />

                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder="Donald Attah" className="bg-white/5 border-white/10" />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="name@company.com" className="bg-white/5 border-white/10" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Portfolio / GitHub Link</Label>
                          <Input placeholder="https://..." className="bg-white/5 border-white/10" />
                        </div>
                        <div className="space-y-2">
                          <Label>Cover Letter / Message</Label>
                          <Textarea placeholder="Tell us why you're a perfect fit..." className="bg-white/5 border-white/10 h-32" />
                        </div>
                        <div className="space-y-2">
                          <Label>Upload CV (PDF)</Label>
                          <Input type="file" className="bg-white/5 border-white/10 cursor-pointer" />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 mt-4 font-bold">
                          Submit Application
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <Badge className="bg-primary/20 text-primary border-primary/20">Learning & Growth</Badge>
              <h3 className="text-4xl md:text-5xl font-bold font-headline text-white">Next-Gen Internship Program</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Are you a student or fresh graduate? We offer specialized tracks for 
                <span className="text-white font-bold"> NYSC, SIWES, and IT Internships</span>. 
                Get hands-on experience with AI, Game Dev, and Robotics under elite mentorship.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["NYSC Placement", "SIWES / IT Track", "Mentorship Circles", "Graduate Trainee"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 glass p-4 rounded-xl border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold">{t}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full h-14 px-10">
                Apply for Internship
              </Button>
            </div>
            <div className="flex-1 glass p-2 rounded-[3rem] border-white/5">
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden">
                <Image 
                  src="https://picsum.photos/seed/learn/800/600" 
                  alt="Internship" 
                  fill 
                  className="object-cover"
                  data-ai-hint="mentorship tech"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
