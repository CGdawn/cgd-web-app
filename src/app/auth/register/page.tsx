"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Briefcase, Eye, EyeOff, Lock, Loader2, Mail } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { syncUserToFirestore, getRedirectPath } from "@/firebase/auth/auth-service";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  const logo = PlaceHolderImages.find(img => img.id === "site-logo");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const fullName = `${firstName} ${lastName}`.trim();
      
      // Update firebase profile
      await updateProfile(result.user, { displayName: fullName });
      
      // Sync to Firestore
      console.log("Registration success. Syncing profile...");
      const profile = await syncUserToFirestore(db, result.user, 'password');
      
      const redirectPath = getRedirectPath(profile.role);
      console.log("Redirecting new user to:", redirectPath);
      
      toast({
        title: "Account Created",
        description: `Welcome to CG Dawn, ${firstName}!`,
      });
      
      window.location.href = redirectPath;
    } catch (error: any) {
      console.error("Registration Error:", error.code);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Failed to create account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-lg space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex flex-col items-center gap-4 group">
            {logo && (
              <div className="relative w-20 h-20 overflow-hidden rounded-2xl glass p-2">
                <Image 
                  src={logo.imageUrl} 
                  alt="CyGen Dawn Logo" 
                  fill 
                  className="object-contain p-2"
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
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input 
                  id="firstname" 
                  placeholder="Donald" 
                  className="bg-white/5 border-white/10" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input 
                  id="lastname" 
                  placeholder="Attah" 
                  className="bg-white/5 border-white/10" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  placeholder="name@company.com" 
                  className="pl-10 bg-white/5 border-white/10" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  className="pl-10 pr-10 bg-white/5 border-white/10" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl mt-6"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
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
