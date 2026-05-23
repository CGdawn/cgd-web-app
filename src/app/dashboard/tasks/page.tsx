
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, ClipboardList, Clock, CheckCircle2, 
  Loader2, UserPlus, Zap, History
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
import { Slider } from "@/components/ui/slider";

export default function TaskManagementPage() {
  const { user: currentUser } = useUser();
  const db = useFirestore();
  const [isCreating, setIsCreating] = useState(false);
  const [taskData, setTaskData] = useState({ title: "", description: "", assignedToId: "" });

  const currentUserRef = useMemo(() => currentUser ? doc(db, "users", currentUser.uid) : null, [db, currentUser]);
  const { data: profile } = useDoc(currentUserRef);

  // Fetch all staff for assignment
  const staffQuery = useMemo(() => query(collection(db, "users"), where("role", "==", "staff")), [db]);
  const { data: staffList } = useCollection(staffQuery);

  // Fetch tasks based on role
  const tasksQuery = useMemo(() => {
    if (!profile) return null;
    if (profile.role === "super-admin") return query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    return query(collection(db, "tasks"), where("assignedToId", "==", currentUser?.uid), orderBy("createdAt", "desc"));
  }, [db, profile, currentUser]);
  const { data: tasks, loading } = useCollection(tasksQuery);

  async function handleCreateTask() {
    if (!currentUser || profile?.role !== "super-admin") return;
    const taskRef = doc(collection(db, "tasks"));
    const assignedStaff = staffList?.find(s => s.id === taskData.assignedToId);
    
    await setDoc(taskRef, {
      ...taskData,
      assignedToName: assignedStaff?.displayName || "Unknown Staff",
      assignedById: currentUser.uid,
      status: "todo",
      progress: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    setIsCreating(false);
    setTaskData({ title: "", description: "", assignedToId: "" });
  }

  async function handleUpdateProgress(taskId: string, progress: number) {
    const status = progress === 100 ? "completed" : progress > 0 ? "in-progress" : "todo";
    await updateDoc(doc(db, "tasks", taskId), { 
      progress, 
      status,
      updatedAt: serverTimestamp() 
    });
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-white">Task Nexus</h1>
          <p className="text-muted-foreground">
            {profile?.role === "super-admin" ? "Delegate operational tasks to the core team." : "Manage your active assignments and report progress."}
          </p>
        </div>
        {profile?.role === "super-admin" && (
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" /> Assign Task
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline text-white">Initialize New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Task Title</Label>
                  <Input 
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assigned To</Label>
                  <select 
                    value={taskData.assignedToId}
                    onChange={(e) => setTaskData({ ...taskData, assignedToId: e.target.value })}
                    className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 text-sm outline-none"
                  >
                    <option value="" className="bg-[#1A161E]">Select Staff Member</option>
                    {staffList?.map(s => <option key={s.id} value={s.id} className="bg-[#1A161E]">{s.displayName}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Detailed Briefing</Label>
                  <Textarea 
                    value={taskData.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    className="bg-white/5 border-white/10 h-32"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateTask} className="bg-primary w-full h-12 rounded-xl">Broadcast Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
        ) : tasks?.map((task) => (
          <Card key={task.id} className="glass border-white/5 group hover:border-primary/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Badge className={
                task.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                task.status === "in-progress" ? "bg-primary/10 text-primary border-primary/20" :
                "bg-white/5 text-muted-foreground"
              } variant="outline">
                {task.status.replace("-", " ")}
              </Badge>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-widest">
                <History className="w-3 h-3" /> Updated {new Date(task.updatedAt?.seconds * 1000).toLocaleDateString()}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{task.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-white/60">
                  <span>Current Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="pt-2">
                  {profile?.role === "staff" ? (
                    <Slider 
                      defaultValue={[task.progress]} 
                      max={100} 
                      step={5}
                      onValueCommit={(val) => handleUpdateProgress(task.id, val[0])}
                    />
                  ) : (
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${task.progress}%` }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-[10px] text-secondary font-bold">
                  {task.assignedToName[0]}
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Assigned to: {task.assignedToName}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {!tasks?.length && !loading && (
          <div className="col-span-full py-20 text-center space-y-4 opacity-40">
            <ClipboardList className="w-16 h-16 mx-auto" />
            <p className="text-sm font-headline uppercase tracking-widest">No active tasks found in the nexus.</p>
          </div>
        )}
      </div>
    </div>
  );
}
