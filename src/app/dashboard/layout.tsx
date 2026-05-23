"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, Users, FolderKanban, GraduationCap, 
  Briefcase, Settings, LogOut, Bell, MessageSquare,
  FileText, ShoppingBag, ClipboardList, Zap, Loader2, ShieldAlert
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser, useFirestore, useDoc } from "@/firebase";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useMemo, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useAuth } from "@/firebase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const logo = PlaceHolderImages.find(img => img.id === "site-logo");

  // Only create userRef if user is definitively logged in
  const userRef = useMemo(() => user ? doc(db, "users", user.uid) : null, [db, user]);
  const { data: profile, loading: profileLoading, error: profileError } = useDoc(userRef);

  // Role Bootstrapper: Ensures user document exists in Firestore
  useEffect(() => {
    if (user && !authLoading && !profileLoading && !profile) {
      const email = user.email?.toLowerCase();
      let role = "client"; // Default role
      
      if (email === "superadmin@cgdawn.org") role = "super-admin";
      else if (email === "admin@cgdawn.org") role = "admin";
      else if (email === "staff@cgdawn.org") role = "staff";
      else if (email === "client@cgdawn.org") role = "client";

      const newUserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email?.split('@')[0] || "Explorer",
        avatar: user.photoURL || "",
        role: role,
        createdAt: serverTimestamp()
      };

      setDoc(doc(db, "users", user.uid), newUserProfile, { merge: true });
    }
  }, [user, profile, profileLoading, authLoading, db]);

  const role = profile?.role || "client";

  const navItems = useMemo(() => {
    const items = [
      { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    ];

    if (role === "super-admin") {
      items.push(
        { icon: Users, label: "Manage Roles", href: "/dashboard/users" },
        { icon: ClipboardList, label: "System Tasks", href: "/dashboard/tasks" },
        { icon: FolderKanban, label: "Job Requests", href: "/dashboard/jobs" },
        { icon: FileText, label: "All Posts", href: "/dashboard/posts" },
        { icon: ShoppingBag, label: "Inventory", href: "/dashboard/store" }
      );
    }

    if (role === "admin") {
      items.push(
        { icon: FileText, label: "My Posts", href: "/dashboard/posts" },
        { icon: ShoppingBag, label: "Inventory", href: "/dashboard/store" }
      );
    }

    if (role === "staff") {
      items.push(
        { icon: ClipboardList, label: "My Tasks", href: "/dashboard/tasks" },
        { icon: GraduationCap, label: "Learning", href: "/dashboard/learning" }
      );
    }

    if (role === "client") {
      items.push(
        { icon: FolderKanban, label: "My Requests", href: "/dashboard/jobs" },
        { icon: ShoppingBag, label: "Browse Store", href: "/store" }
      );
    }

    items.push(
      { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
      { icon: Settings, label: "Settings", href: "/dashboard/settings" }
    );

    return items;
  }, [role]);

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/auth/login";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0D0B10] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-muted-foreground font-headline uppercase tracking-[0.3em] text-[10px]">Synchronizing Interface...</p>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/auth/login";
    return null;
  }

  // Handle case where profile exists but permission error occurred initially
  if (profileError && !profile) {
    return (
      <div className="min-h-screen bg-[#0D0B10] flex flex-col items-center justify-center p-8 text-center space-y-6">
        <ShieldAlert className="w-16 h-16 text-primary" />
        <h2 className="text-2xl font-headline font-bold text-white">Interface Lock</h2>
        <p className="text-muted-foreground max-w-md">
          Establishing your security clearance. This usually happens on your first connection to the nexus.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline" className="glass">
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#0D0B10] w-full">
        <Sidebar className="glass border-r border-white/5">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-3 group">
              {logo && (
                <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                  <Image 
                    src={logo.imageUrl} 
                    alt="CyGen Dawn Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
              )}
              <span className="font-headline font-bold text-lg tracking-tighter text-white uppercase">
                CyGen<span className="text-primary"> Dawn</span>
              </span>
            </Link>
          </SidebarHeader>

          <SidebarContent className="px-4 py-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label} className="hover:bg-primary/10 text-white/70 hover:text-white rounded-xl mb-1">
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4 mt-auto">
            <div className="glass-dark p-4 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border border-primary/20">
                  <AvatarImage src={user?.photoURL || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary">{user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || "A"}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{user?.displayName || user?.email?.split('@')[0]}</p>
                  <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">{role.replace("-", " ")}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="w-full justify-start text-white/60 hover:text-red-400 hover:bg-red-400/10 h-10 rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <header className="h-16 border-b border-white/5 glass-dark flex items-center justify-between px-8 z-10">
            <h2 className="text-sm font-bold font-headline text-white uppercase tracking-widest">Workspace Dashboard</h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white/60 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </Button>
              <div className="h-6 w-px bg-white/10" />
              <p className="text-xs font-medium text-white/40">v1.2.5-stable</p>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 bg-background/50">
            {profileLoading ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Loading Profile...</p>
              </div>
            ) : children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
