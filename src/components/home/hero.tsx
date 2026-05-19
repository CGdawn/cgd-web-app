"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Gamepad2, Cpu } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-glow" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Creating Tomorrow Today</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight text-white">
            Pioneering the <br />
            <span className="text-gradient">Next Generation</span> <br />
            of Digital Reality.
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            From award-winning game development and 3D animation to cutting-edge AI and robotics. 
            We are CG DAWN, your partners in technological evolution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg">
              Explore Our Games
              <Gamepad2 className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 glass hover:bg-white/5 rounded-full px-8 h-14 text-lg">
              View Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/5">
            <div>
              <p className="text-2xl font-bold font-headline text-white">100+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Projects Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-headline text-white">12k+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Global Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-headline text-white">15+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">AI Solutions</p>
            </div>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="relative z-10 glass p-4 rounded-3xl border border-white/10 rotate-3 transform transition-transform hover:rotate-0 duration-700">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description}
                width={800}
                height={600}
                className="rounded-2xl object-cover shadow-2xl"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl border border-white/10 animate-float">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/20 rounded-xl">
                  <Cpu className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">AI Engine v2.5</p>
                  <p className="text-xs text-muted-foreground">Optimization Active</p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary/5 rounded-full" />
        </div>
      </div>
    </section>
  );
}
