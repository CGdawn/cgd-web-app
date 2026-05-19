"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, FolderKanban, GraduationCap, Briefcase, Settings, LogOut, Bell, Rocket, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  { icon: Users, label: "Teams", href: "/dashboard/staff" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: GraduationCap, label: "Learning", href: "/dashboard/learning" },
  { icon: Briefcase, label: "Recruitment", href: "/dashboard/hr" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#0D0B10] w-full">
        <Sidebar className="glass border-r border-white/5">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-primary/20">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <span className="font-headline font-bold text-lg tracking-tighter text-white">
                AETHER<span className="text-primary">CORE</span>
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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>DA</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">Donald Attah</p>
                  <p className="text-[10px] text-muted-foreground truncate">Super Admin</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-red-400 hover:bg-red-400/10 h-10 rounded-xl" asChild>
                <Link href="/auth/login">
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {/* Dashboard Header */}
          <header className="h-16 border-b border-white/5 glass-dark flex items-center justify-between px-8 z-10">
            <h2 className="text-sm font-bold font-headline text-white uppercase tracking-widest">Workspace Dashboard</h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-white/60 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </Button>
              <div className="h-6 w-px bg-white/10" />
              <p className="text-xs font-medium text-white/40">v1.2.0-stable</p>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 bg-background/50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
