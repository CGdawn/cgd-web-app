
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Mail, Lock, Info, Key, ShieldCheck, User, Briefcase, Loader2, Eye, EyeOff } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { useAuth } from "@/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const DEMO_ACCOUNTS = [
  { role: "Super Admin", email: "superadmin@cgdawn.org", icon: ShieldCheck, color: "text-primary" },
  { role: "Admin", email: "admin@cgdawn.org", icon: Key, color: "text-secondary" },
  { role: "Staff", email: "staff@cgdawn.org", icon: Briefcase, color: "text-primary" },
  { role: "Client", email: "client@cgdawn.org", icon: User, color: "text-secondary" },
];

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const { toast } = useToast();
  
  const logo = PlaceHolderImages.find(img => img.id === "site-logo");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // 1. Attempt standard login
      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "/dashboard";
      } catch (err: any) {
        // 2. If user doesn't exist and it's a demo account, create it
        const isDemoAccount = email.endsWith("@cgdawn.org") && password === "password123";
        
        if (isDemoAccount && (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential')) {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.location.href = "/dashboard";
            return;
          } catch (createErr: any) {
            // If creation fails (e.g. email already exists but password was wrong), re-throw original error
            throw err;
          }
        } else {
          throw err;
        }
      }
    } catch (error: any) {
      console.error("Auth Error:", error.code, error.message);
      
      let errorMessage = "Invalid credentials provided.";
      if (error.code === 'auth/user-not-found') errorMessage = "This identity does not exist in our nexus.";
      if (error.code === 'auth/wrong-password') errorMessage = "Security key mismatch. Please check your credentials.";
      if (error.code === 'auth/invalid-credential') errorMessage = "Authentication failed. Incorrect email or password.";
      if (error.code === 'auth/too-many-requests') errorMessage = "Access blocked due to multiple failed attempts. Try again later.";

      toast({
        variant: "destructive",
        title: "Access Denied",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Side: Login Form */}
        <div className="space-y-8">
          <div className="text-center lg:text-left space-y-6">
            <Link href="/" className="inline-flex flex-col lg:flex-row items-center gap-4 group">
              {logo && (
                <div className="relative w-16 h-16 overflow-hidden rounded-2xl glass p-2">
                  <Image 
                    src={logo.imageUrl} 
                    alt="CyGen Dawn Logo" 
                    fill 
                    className="object-contain p-2"
                  />
                </div>
              )}
              <span className="text-3xl font-bold font-headline tracking-tighter text-white uppercase">
                CyGen<span className="text-primary"> Dawn</span>
              </span>
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white font-headline">Intelligence Login</h1>
              <p className="text-muted-foreground text-sm">Sign in to the Cyber Generation Dawn ecosystem.</p>
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Security Key (Password)</Label>
                </div>
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
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-muted-foreground">Keep session active</label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Establish Connection"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-[#1A161E] px-2 text-muted-foreground tracking-widest">Global Auth Bridge</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="glass border-white/5 hover:bg-white/5" onClick={() => signInWithPopup(auth, new GithubAuthProvider())}>
                <Github className="mr-2 h-4 w-4" /> Github
              </Button>
              <Button variant="outline" className="glass border-white/5 hover:bg-white/5" onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Demo Access */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border-white/5 space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <Info className="w-5 h-5" />
              <h3 className="font-headline font-bold uppercase tracking-widest text-sm">Demo Access Nexus</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Select an identity to explore the ecosystem roles. Password for all: <span className="text-white font-bold">password123</span>
            </p>
            <div className="space-y-3">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => fillDemo(acc.email)}
                  className="w-full flex items-center justify-between p-4 glass-dark rounded-xl border border-white/5 hover:border-primary/20 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={acc.color}>
                      <acc.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{acc.role}</p>
                      <p className="text-xs font-medium text-white group-hover:text-primary transition-colors">{acc.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-[10px] text-primary/80 leading-relaxed italic text-center">
                * Note: The first login will automatically provision your Firestore role.
              </p>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            New to the generation?{" "}
            <Link href="/auth/register" className="text-primary font-bold hover:underline">Join the Mission</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
