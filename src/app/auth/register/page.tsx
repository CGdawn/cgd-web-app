"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Briefcase, Eye, EyeOff, Lock } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function RegisterPage() {
  const [role, setRole] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  const logo = PlaceHolderImages.find(img => img.id === "site-logo");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="w-full max-lg space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex flex-col items-center gap-4 group">
            {logo && (
              <div className="relative w-20 h-20 overflow-hidden rounded-2xl glass p-2">
                <Image 
                  src={logo.imageUrl} 
                  alt="CyGen Dawn Logo" 
                  fill 
                  className="object-contain p-2"
                  data-ai-hint={logo.imageHint}
                />
              </div>
            )}
            <span className="text-2xl font-bold font-headline tracking-tighter text-white uppercase">
              CyGen<span className="text-primary"> Dawn</span>
            </span>
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white font-headline">Join CyGen Dawn</h1>
            <p className="text-muted-foreground">Start your journey with Cyber Generation Dawn.</p>
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-8">
          <div className="space-y-4">
            <Label className="text-base">What best describes you?</Label>
            <RadioGroup defaultValue="client" onValueChange={setRole} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="client" id="client" className="peer sr-only" />
                <Label
                  htmlFor="client"
                  className="flex flex-col items-center justify-between rounded-2xl border-2 border-white/5 glass p-6 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all cursor-pointer"
                >
                  <User className="mb-3 h-6 w-6 text-secondary" />
                  <span className="font-bold">Client</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Hire us for projects</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="staff" id="staff" className="peer sr-only" />
                <Label
                  htmlFor="staff"
                  className="flex flex-col items-center justify-between rounded-2xl border-2 border-white/5 glass p-6 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 transition-all cursor-pointer"
                >
                  <Briefcase className="mb-3 h-6 w-6 text-primary" />
                  <span className="font-bold">Staff</span>
                  <span className="text-[10px] text-muted-foreground mt-1">Join the core team</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input id="firstname" placeholder="Donald" className="bg-white/5 border-white/10" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input id="lastname" placeholder="Attah" className="bg-white/5 border-white/10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="name@company.com" className="bg-white/5 border-white/10" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  className="pl-10 pr-10 bg-white/5 border-white/10" 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl mt-6">
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
