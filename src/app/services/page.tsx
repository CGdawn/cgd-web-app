import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { ServicesPreview } from "@/components/home/services-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Rocket, Globe, Database, Layers } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-6 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold font-headline text-white">Full-Spectrum <span className="text-primary">Tech</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From the foundational code to the immersive front-end experiences, we provide the tools and expertise to build tomorrow.
        </p>
      </section>

      {/* Main Services Breakdown */}
      <ServicesPreview />

      {/* Tech Stack / Infrastructure */}
      <section className="py-24 px-6 relative bg-black/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold font-headline text-white">Powering the <span className="text-secondary">Ecosystem</span></h2>
            <p className="text-muted-foreground">
              Our infrastructure is built for scale. We leverage the most advanced technologies to ensure your project is robust, secure, and future-proof.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Shield, title: "Secure APIs", desc: "Military-grade encryption" },
                { icon: Globe, title: "Global Cloud", desc: "Edge computing power" },
                { icon: Database, title: "Big Data", desc: "Intelligent analytics" },
                { icon: Layers, title: "PWA Support", desc: "Mobile-first experience" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="p-3 bg-white/5 w-fit rounded-xl border border-white/5">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass p-1 rounded-3xl border border-white/5">
            <div className="bg-black/40 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <h3 className="font-headline font-bold text-white uppercase tracking-widest text-xs">Project Estimator</h3>
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Ready to start? Use our AI-powered estimator to get a baseline for your vision.</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12">
                  Start Consultation
                </Button>
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
