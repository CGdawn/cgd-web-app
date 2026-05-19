
"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export function Footer() {
  const logo = PlaceHolderImages.find(img => img.id === "site-logo");

  return (
    <footer className="bg-background border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-4">
            {logo && (
              <div className="relative w-20 h-20">
                <Image 
                  src={logo.imageUrl} 
                  alt="CyGen Dawn Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-xl font-bold font-headline tracking-tighter text-white uppercase">
              CyGen<span className="text-primary"> Dawn</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Cyber Generation Dawn (CG DAWN) is a leader in technological innovation, building the future of digital experiences through AI, game dev, and immersive solutions.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="p-2 rounded-full glass hover:bg-primary/20 transition-colors">
              <Github className="w-4 h-4" />
            </Link>
            <Link href="#" className="p-2 rounded-full glass hover:bg-primary/20 transition-colors">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="p-2 rounded-full glass hover:bg-primary/20 transition-colors">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-white uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & News</Link></li>
            <li><Link href="/store" className="hover:text-primary transition-colors">Official Store</Link></li>
            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-white uppercase tracking-widest text-xs">Services</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/services" className="hover:text-primary transition-colors">Game Development</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">AI & Robotics</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Animation (2D/3D)</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">VR/AR Solutions</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Fullstack Web</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-6 text-white uppercase tracking-widest text-xs">Contact Us</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary" />
              <span>+234 810 408 2051</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary" />
              <span>hello@cgdawn.org</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-1" />
              <span>Lagos, Nigeria</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cyber Generation Dawn. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
