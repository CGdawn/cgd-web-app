
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Link from "next/link";

export default function Home() {
  const projectImg = PlaceHolderImages.find(img => img.id === "project-game");

  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServicesPreview />

      {/* Featured Project Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-[3rem] overflow-hidden border border-white/5 grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 space-y-8">
              <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest">
                <Star className="w-4 h-4 fill-secondary" /> Featured Project
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
                Dawn of Titans: <br />
                <span className="text-primary">Next-Gen RPG</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Experience the pinnacle of mobile gaming. Built with Unreal Engine 5, 
                our flagship RPG pushes the boundaries of hardware performance with 
                real-time raytracing and AI-driven NPC behaviors.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 rounded-full glass border border-white/5 text-xs text-white/60">Unreal Engine 5</span>
                <span className="px-4 py-2 rounded-full glass border border-white/5 text-xs text-white/60">AI Integration</span>
                <span className="px-4 py-2 rounded-full glass border border-white/5 text-xs text-white/60">Cross-Platform</span>
              </div>
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="relative min-h-[400px]">
              {projectImg && (
                <Image 
                  src={projectImg.imageUrl} 
                  alt={projectImg.description}
                  fill
                  className="object-cover"
                  data-ai-hint={projectImg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-l" />
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px]" />
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-headline">Join the Revolution</h2>
          <p className="text-muted-foreground text-lg">
            We are always looking for visionary developers, artists, and engineers. 
            Build the future of Lagos tech with CyGen Dawn.
          </p>
          <Link href="/careers">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 h-14">
              View Openings
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  );
}
