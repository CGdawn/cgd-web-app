
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Gamepad2, Cpu, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { 
    id: "hero-bg", 
    title: "Metaverse GALLERIA", 
    desc: "Immersive architectural environments for the next web." 
  },
  { 
    id: "hero-alt-1", 
    title: "VEM7 Nexus", 
    desc: "Advanced level design and spatial visualization." 
  },
  { 
    id: "hero-alt-2", 
    title: "Modern Stage", 
    desc: "Futuristic digital production environments." 
  },
  { 
    id: "hero-alt-3", 
    title: "UE5 Skyscrapers", 
    desc: "Photorealistic cityscapes built in Unreal Engine 5." 
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentImage = PlaceHolderImages.find(img => img.id === slides[currentSlide].id);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Cinematic Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-full"
          >
            {currentImage && (
              <Image 
                src={currentImage.imageUrl} 
                alt="Cinematic Background" 
                fill 
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary animate-glow" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Creating Tomorrow Today</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold font-headline leading-tight text-white"
          >
            Pioneering the <br />
            <span className="text-gradient">Next Generation</span> <br />
            of Digital Reality.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            From award-winning game development and 3D animation to cutting-edge AI and robotics. 
            We are CG DAWN, your partners in technological evolution.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg font-bold">
              Explore Our Work
              <Gamepad2 className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 glass hover:bg-white/5 rounded-full px-8 h-14 text-lg">
              View Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/5">
            {[
              { val: "100+", lab: "Projects Delivered" },
              { val: "12k+", lab: "Global Students" },
              { val: "15+", lab: "AI Solutions" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                <p className="text-2xl font-bold font-headline text-white">{stat.val}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.lab}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          <div className="relative z-10 glass p-3 rounded-[3rem] border border-white/10 rotate-3 transform transition-transform hover:rotate-0 duration-700">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  {currentImage && (
                    <Image 
                      src={currentImage.imageUrl} 
                      alt={slides[currentSlide].title}
                      fill
                      className="object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl border border-white/10 animate-float backdrop-blur-3xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/20 rounded-xl">
                  <Cpu className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">{slides[currentSlide].title}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{slides[currentSlide].desc}</p>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-6 flex flex-col gap-2 z-20">
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:bg-primary transition-colors group/btn"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
              </button>
              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:bg-primary transition-colors group/btn"
              >
                <ChevronRight className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Decorative Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-primary/10 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
