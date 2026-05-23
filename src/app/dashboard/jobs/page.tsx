
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, FolderKanban, Clock, CheckCircle2, 
  Loader2, MessageSquare, ShieldCheck, ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFirestore, useCollection, useUser, useDoc } from "@/firebase";
import { collection, doc, setDoc, updateDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function JobsManagementPage() {
  const { user: currentUser } = useUser();
  const db = useFirestore();
  const [isCreating, setIsCreating] = useState(false);
  const [jobData, setJobData] = useState({ title: "", description: "" });
  const [updateText, setUpdateText] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const currentUserRef = useMemo(() => currentUser ? doc(db, "users", currentUser.uid) : null, [db, currentUser]);
  const { data: profile } = useDoc(currentUserRef);

  const jobsQuery = useMemo(() => {
    if (!profile) return null;
    if (profile.role === "super-admin") return query(collection(db, "jobRequests"), orderBy("createdAt", "desc"));
    return query(collection(db, "jobRequests"), where("clientId", "==", currentUser?.uid), orderBy("createdAt", "desc"));
  }, [db, profile, currentUser]);
  const { data: jobs, loading } = useCollection(jobsQuery);

  async function handleCreateJob() {
    if (!currentUser) return;
    const jobRef = doc(collection(db, "jobRequests"));
    await setDoc(jobRef, {
      ...jobData,
      clientId: currentUser.uid,
      clientName: currentUser.displayName || "Unknown Client",
      status: "pending",
      adminUpdate: "Awaiting review from the Super Admin...",
      createdAt: serverTimestamp()
    });
    setIsCreating(false);
    setJobData({ title: "", description: "" });
  }

  async function handleAdminUpdate() {
    if (!selectedJobId || profile?.role !== "super-admin") return;
    await updateDoc(doc(db, "jobRequests", selectedJobId), { 
      adminUpdate: updateText,
      status: "active"
    });
    setSelectedJobId(null);
    setUpdateText("");
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-white">Project Job Nexus</h1>
          <p className="text-muted-foreground">
            {profile?.role === "super-admin" ? "Monitor client requests and provide project updates." : "Request new projects and track your ongoing inquiries."}
          </p>
        </div>
        {profile?.role === "client" && (
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" /> Request Project
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline text-white">Project Inquiry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input 
                    value={jobData.title}
                    onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                    placeholder="e.g. Next-Gen RPG Development"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mission Parameters (Description)</Label>
                  <Textarea 
                    value={jobData.description}
                    onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                    placeholder="Describe your vision and requirements..."
                    className="bg-white/5 border-white/10 h-32"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateJob} className="bg-primary w-full h-12 rounded-xl">Initialize Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
        ) : jobs?.map((job) => (
          <Card key={job.id} className="glass border-white/5 overflow-hidden group hover:border-primary/20 transition-all">
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-3 space-y-6">
                <div className="flex items-center gap-4">
                  <Badge className={
                    job.status === "active" ? "bg-primary/10 text-primary border-primary/20" :
                    job.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                    "bg-white/5 text-muted-foreground"
                  } variant="outline">
                    {job.status.toUpperCase()}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Submitted {new Date(job.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{job.description}</p>
                </div>

                <div className="glass-dark p-6 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" /> Admin Status Update
                  </div>
                  <p className="text-sm italic text-white/80">{job.adminUpdate}</p>
                </div>
              </div>

              <div className="space-y-6 md:border-l md:border-white/5 md:pl-8 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Initiator</p>
                  <p className="font-bold text-white text-sm">{job.clientName}</p>
                </div>

                {profile?.role === "super-admin" && (
                  <Dialog open={selectedJobId === job.id} onOpenChange={(open) => !open && setSelectedJobId(null)}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedJobId(job.id)} variant="outline" className="w-full glass border-white/10 rounded-xl h-12 gap-2">
                        <MessageSquare className="w-4 h-4" /> Update Status
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-headline">Operational Update</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Label>Update for Client</Label>
                        <Textarea 
                          value={updateText}
                          onChange={(e) => setUpdateText(e.target.value)}
                          placeholder="Project is currently in the discovery phase..."
                          className="bg-white/5 border-white/10 h-32"
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAdminUpdate} className="bg-primary w-full h-12 rounded-xl">Broadcast Update</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                <Button variant="ghost" className="w-full text-[10px] uppercase tracking-[0.2em] hover:text-primary">
                  View Dossier <ExternalLink className="ml-2 w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {!jobs?.length && !loading && (
          <div className="py-20 text-center space-y-4 opacity-40">
            <FolderKanban className="w-16 h-16 mx-auto" />
            <p className="text-sm font-headline uppercase tracking-widest">No project inquiries recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
}
