
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
];

const dropdownLinks = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Store", href: "/store" },
  { name: "Careers", href: "/careers" },
];

const contactLink = { name: "Contact", href: "/contact" };

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const logo = PlaceHolderImages.find(img => img.id === "site-logo");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 lg:px-12",
        scrolled ? "py-4 glass border-b border-white/5" : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {logo && (
            <div className="relative w-12 h-12">
              <Image 
                src={logo.imageUrl} 
                alt="CyGen Dawn Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          )}
          <span className="text-xl font-bold font-headline tracking-tighter text-white uppercase hidden sm:block">
            CyGen<span className="text-primary"> Dawn</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors outline-none">
                Explore <ChevronDown className="w-4 h-4 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="glass border-white/10 text-white min-w-[180px] p-2 mt-2">
              {dropdownLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild className="focus:bg-primary/20 focus:text-white cursor-pointer rounded-lg px-4 py-2.5">
                  <Link href={link.href} className="w-full">
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href={contactLink.href}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {contactLink.name}
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 font-bold">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-dark border-t border-white/5 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/80"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Dropdown Items */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-bold">Ecosystem</p>
              {dropdownLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-lg font-medium text-white/80"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              href={contactLink.href}
              className="text-lg font-medium text-white/80 pt-2 border-t border-white/5"
              onClick={() => setIsOpen(false)}
            >
              {contactLink.name}
            </Link>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-white/5">
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-white">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
