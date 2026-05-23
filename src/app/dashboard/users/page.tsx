
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, ShieldCheck, ShieldAlert, UserCog, 
  Search, Loader2, MoreVertical, Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFirestore, useCollection, useUser, useDoc } from "@/firebase";
import { collection, doc, updateDoc, query, orderBy } from "firebase/firestore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserManagementPage() {
  const { user: currentUser } = useUser();
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState("");

  const currentUserRef = useMemo(() => currentUser ? doc(db, "users", currentUser.uid) : null, [db, currentUser]);
  const { data: profile, loading: profileLoading } = useDoc(currentUserRef);

  // Only allow querying users if the current user is a super-admin
  const usersQuery = useMemo(() => {
    if (profile?.role !== "super-admin") return null;
    return query(collection(db, "users"), orderBy("createdAt", "desc"));
  }, [db, profile]);
  const { data: allUsers, loading: usersLoading } = useCollection(usersQuery);

  const filteredUsers = useMemo(() => {
    return allUsers?.filter(u => 
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [allUsers, searchTerm]);

  async function handleUpdateRole(userId: string, newRole: string) {
    if (profile?.role !== "super-admin") return;
    updateDoc(doc(db, "users", userId), { role: newRole });
  }

  // Handle loading state for the initial permission check
  if (profileLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Verifying Permissions...</p>
      </div>
    );
  }

  if (!profile || profile.role !== "super-admin") {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <ShieldAlert className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-headline font-bold text-white">Access Denied</h2>
        <p className="text-muted-foreground">Only the Super Admin can reconfigure system roles.</p>
        <p className="text-[10px] text-primary font-bold uppercase">Current Identity: {currentUser?.email}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-white">Staff & User Nexus</h1>
          <p className="text-muted-foreground">Manage roles, permissions, and system access levels.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or email..." 
            className="bg-white/5 border-white/10 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass border-white/5 overflow-hidden">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <UserCog className="w-5 h-5 text-primary" /> Global User Manifest
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {usersLoading ? (
              <div className="p-20 flex justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
            ) : (
              <div className="divide-y divide-white/5">
                {filteredUsers.map((u) => (
                  <div key={u.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {u.displayName?.[0] || "U"}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm flex items-center gap-2">
                          {u.displayName}
                          {u.role === "super-admin" && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                        </h4>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{u.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <Badge className={
                        u.role === "super-admin" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                        u.role === "admin" ? "bg-primary/10 text-primary border-primary/20" :
                        u.role === "staff" ? "bg-secondary/10 text-secondary border-secondary/20" :
                        "bg-white/5 text-muted-foreground"
                      } variant="outline">
                        {u.role || "client"}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass border-white/10 text-white">
                          <DropdownMenuItem onClick={() => handleUpdateRole(u.id, "admin")} className="focus:bg-primary/20 cursor-pointer">
                            Promote to Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateRole(u.id, "staff")} className="focus:bg-secondary/20 cursor-pointer">
                            Assign to Staff
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateRole(u.id, "client")} className="focus:bg-white/10 cursor-pointer">
                            Revert to Client
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
