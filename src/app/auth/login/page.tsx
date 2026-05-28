"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, Eye, EyeOff, ShieldCheck, Key, User, Briefcase, Info, ShieldAlert } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { syncUserToFirestore, getRedirectPath, handleGoogleSignIn, RESERVED_EMAILS } from "@/firebase/auth/auth-service";

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
  const { toast } = useToast();
  
  const logo = PlaceHolderImages.find(img => img.id === "site-logo");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let user;
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        user = result.user;
      } catch (authErr: any) {
        // Auto-provision demo accounts if they don't exist yet
        if (RESERVED_EMAILS.includes(email.toLowerCase())) {
          const result = await createUserWithEmailAndPassword(auth, email, password);
          user = result.user;
        } else {
          throw authErr;
        }
      }

      // Sync user profile and check verification
      const { role, emailVerified } = await syncUserToFirestore(user, 'password');

      // Security Protocol: Block unverified users from protected dashboards
      // Exception: Demo accounts might bypass this if needed, but safer to enforce for all
      if (!emailVerified && !RESERVED_EMAILS.includes(user.email?.toLowerCase() || "")) {
        window.location.href = "/auth/verify-email";
        return;
      }

      window.location.href = getRedirectPath(role);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: error.message || "Identity authentication failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await handleGoogleSignIn();
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Nexus Auth Error", 
        description: error.message || "Failed to establish link via Google." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden selection:bg-primary/20">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="text-center lg:text-left space-y-6">
            <Link href="/" className="inline-flex flex-col lg:flex-row items-center gap-4 group">
              {logo && (
                <div className="relative w-16 h-16 overflow-hidden rounded-2xl glass p-2 transition-transform group-hover:scale-105">
                  <Image 
                    src={logo.imageUrl} 
                    alt="CG Dawn" 
                    fill 
                    sizes="64px"
                    className="object-contain p-2" 
                    priority
                  />
                </div>
              )}
              <span className="text-3xl font-bold font-headline tracking-tighter text-white uppercase">
                CyGen<span className="text-primary"> Dawn</span>
              </span>
            </Link>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white font-headline tracking-tight">System Intelligence</h1>
              <p className="text-muted-foreground text-sm">Synchronize with the Cyber Generation Dawn ecosystem.</p>
            </div>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-white/60 ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    placeholder="nexus@cgdawn.org" 
                    className="pl-12 bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-primary focus:border-primary" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <Label htmlFor="password" className="text-[10px] uppercase font-bold tracking-widest text-white/60">Security Key</Label>
                  <button type="button" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-widest">Lost Access?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    className="pl-12 pr-12 bg-white/5 border-white/10 h-14 rounded-2xl" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Establish Connection"}
              </Button>
            </form>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
              <span className="relative bg-[#0D0B10] px-4 text-[10px] uppercase text-muted-foreground tracking-[0.4em] font-bold">Global Auth Bridge</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="glass border-white/5 hover:bg-white/5 h-14 rounded-2xl transition-all" onClick={onGoogleSignIn}>
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-0.78-0.07-1.53-0.2-2.25H12v4.26h5.92c-0.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-0.98 7.28-2.66l-3.57-2.77c-0.98 0.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-0.22-0.66-0.35-1.36-0.35-2.09s0.13-1.43 0.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s0.43 3.45 1.18 4.93l2.85-2.22 0.81-0.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06 0.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c0.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="glass border-white/5 hover:bg-white/5 h-14 rounded-2xl transition-all">
                <Image src="/images/icon.png" alt="Github" width={20} height={20} className="mr-3" />
                Github
              </Button>
            </div>
          </div>
        </div>

         {/* <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border-white/5 space-y-8">
            <div className="flex items-center gap-3 text-primary">
              <Info className="w-5 h-5" />
              <h3 className="font-headline font-bold uppercase tracking-widest text-xs">Demo Identity Access</h3>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-bold tracking-widest">Select an identity to explore. <br />All keys: <span className="text-white">password123</span></p>
            <div className="grid grid-cols-1 gap-4">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => { setEmail(acc.email); setPassword("password123"); }}
                  className="flex items-center justify-between p-5 glass-dark rounded-2xl border border-white/5 hover:border-primary/20 transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${acc.color} p-3 rounded-xl bg-white/5 transition-colors group-hover:bg-primary/10`}><acc.icon className="w-6 h-6" /></div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{acc.role}</p>
                      <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{acc.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            New explorer? <Link href="/auth/register" className="text-primary font-bold hover:underline ml-1">Join the Generation</Link>
          </p>
        </div>
         */}
      </div>
    </div>
  );
}
