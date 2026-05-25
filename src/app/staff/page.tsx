"use client";

import { ClipboardList, MessageSquare, LayoutDashboard, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StaffLandingPage() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-6 space-y-12">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="inline-flex p-4 rounded-3xl bg-primary/20 border border-primary/20">
          <Rocket className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight">
          Staff <span className="text-gradient">Task Nexus</span>
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Initialize your operational tasks. Track your technical progress and 
          communicate with the administration team.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          <Card className="glass border-white/5 hover:border-primary/20 transition-all text-left">
            <CardHeader>
              <ClipboardList className="w-8 h-8 text-secondary mb-2" />
              <CardTitle>My Assignments</CardTitle>
              <CardDescription>Check your current technical tasks.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 rounded-xl">
                <Link href="/dashboard/tasks">View Tasks</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/5 hover:border-primary/20 transition-all text-left">
            <CardHeader>
              <MessageSquare className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Communications</CardTitle>
              <CardDescription>Internal messaging and updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full glass border-white/10 rounded-xl">
                <Link href="/dashboard/messages">Open Messages</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
