"use client";

import { FileText, ShoppingBag, LayoutDashboard, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLandingPage() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center p-6 space-y-12">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="inline-flex p-4 rounded-3xl bg-secondary/20 border border-secondary/20">
          <Zap className="w-12 h-12 text-secondary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight">
          Admin <span className="text-gradient">Operations</span>
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
          Welcome to the operations center. Manage inventory, publish news, and coordinate 
          with the technical staff.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          <Card className="glass border-white/5 hover:border-primary/20 transition-all text-left">
            <CardHeader>
              <FileText className="w-8 h-8 text-primary mb-2" />
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Update the CyGen Journal.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 rounded-xl">
                <Link href="/dashboard/posts">Manage Posts</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="glass border-white/5 hover:border-primary/20 transition-all text-left">
            <CardHeader>
              <ShoppingBag className="w-8 h-8 text-secondary mb-2" />
              <CardTitle>Store Manifest</CardTitle>
              <CardDescription>Track inventory and digital assets.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full glass border-white/10 rounded-xl">
                <Link href="/dashboard/store">Open Store Nexus</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
