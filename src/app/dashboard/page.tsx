
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FolderKanban, GraduationCap, TrendingUp, DollarSign, Activity, ClipboardList, ShieldCheck } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useUser, useFirestore, useDoc, useCollection } from "@/firebase";
import { doc, query, collection, where } from "firebase/firestore";

const data = [
  { name: "Jan", revenue: 2400 },
  { name: "Feb", revenue: 1398 },
  { name: "Mar", revenue: 9800 },
  { name: "Apr", revenue: 3908 },
  { name: "May", revenue: 4800 },
  { name: "Jun", revenue: 3800 },
];

export default function DashboardOverview() {
  const { user } = useUser();
  const db = useFirestore();

  const userRef = useMemo(() => user ? doc(db, "users", user.uid) : null, [db, user]);
  const { data: profile } = useDoc(userRef);

  const role = profile?.role;

  // STAFF VISIBILITY: Only Super Admin
  const staffQuery = useMemo(() => {
    if (role !== "super-admin") return null;
    return query(collection(db, "users"), where("role", "==", "staff"));
  }, [db, role]);
  const { data: staffList } = useCollection(staffQuery);

  // TASKS VISIBILITY: Super Admin sees all, Staff sees own
  const tasksQuery = useMemo(() => {
    if (!role || !user) return null;
    if (role === "super-admin") return collection(db, "tasks");
    if (role === "staff") return query(collection(db, "tasks"), where("assignedToId", "==", user.uid));
    return null;
  }, [db, role, user]);
  const { data: tasks } = useCollection(tasksQuery);

  // JOBS VISIBILITY: Super Admin sees all, Clients see own
  const jobsQuery = useMemo(() => {
    if (!role || !user) return null;
    if (role === "super-admin") return collection(db, "jobRequests");
    if (role === "client") return query(collection(db, "jobRequests"), where("clientId", "==", user.uid));
    return null;
  }, [db, role, user]);
  const { data: jobs } = useCollection(jobsQuery);

  const stats = useMemo(() => {
    if (role === "super-admin") {
      return [
        { title: "Staff Core", value: staffList?.length || 0, icon: ShieldCheck, color: "text-primary", trend: "Global team" },
        { title: "System Tasks", value: tasks?.length || 0, icon: ClipboardList, color: "text-secondary", trend: "Active ops" },
        { title: "Job Requests", value: jobs?.length || 0, icon: FolderKanban, color: "text-primary", trend: "Inquiries" },
        { title: "Total Revenue", value: "$42.5k", icon: DollarSign, color: "text-secondary", trend: "+2.5% vs LW" },
      ];
    }
    if (role === "staff") {
      return [
        { title: "My Tasks", value: tasks?.length || 0, icon: ClipboardList, color: "text-primary", trend: "Assignments" },
        { title: "Work Hours", value: "124", icon: Activity, color: "text-secondary", trend: "This month" },
        { title: "Learning", value: "12", icon: GraduationCap, color: "text-primary", trend: "Certifications" },
        { title: "Efficiency", value: "94%", icon: TrendingUp, color: "text-secondary", trend: "Performance" },
      ];
    }
    return [
      { title: "My Projects", value: jobs?.length || 0, icon: FolderKanban, color: "text-primary", trend: "Active requests" },
      { title: "Invoices", value: "0", icon: DollarSign, color: "text-secondary", trend: "Pending" },
      { title: "Support", value: "Online", icon: Activity, color: "text-primary", trend: "24/7" },
      { title: "Journal", value: "12", icon: ClipboardList, color: "text-secondary", trend: "Read posts" },
    ];
  }, [role, staffList, tasks, jobs]);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline text-white uppercase tracking-tighter">System Intelligence</h1>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Role: <span className="text-primary">{role?.replace("-", " ") || "authenticating..."}</span></p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/5">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Network Normal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass border-white/5 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.trend}</span>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Operational Trajectory</CardTitle>
            <CardDescription>Visualizing growth and performance across the ecosystem.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B3DEE" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B3DEE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A161E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8B3DEE" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-white/5 h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-headline text-white">Security Log</CardTitle>
            <CardDescription>Authentication and permission events.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: "Role verified", val: role || "client", color: "text-primary" },
                { label: "IP Clearance", val: "Global Proxy", color: "text-green-500" },
                { label: "Access Level", val: role === "super-admin" ? "Level 4" : "Level 1", color: "text-secondary" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</span>
                  <span className={`text-xs font-bold ${item.color} uppercase`}>{item.val}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white/60 text-[10px] uppercase tracking-widest font-bold h-10 rounded-xl">
              Audit Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
