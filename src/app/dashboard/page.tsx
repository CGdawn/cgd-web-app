"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, FolderKanban, GraduationCap, TrendingUp, DollarSign, Activity } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";

const data = [
  { name: "Jan", projects: 4, revenue: 2400 },
  { name: "Feb", projects: 3, revenue: 1398 },
  { name: "Mar", projects: 5, revenue: 9800 },
  { name: "Apr", projects: 7, revenue: 3908 },
  { name: "May", projects: 6, revenue: 4800 },
  { name: "Jun", projects: 8, revenue: 3800 },
];

const stats = [
  { title: "Total Staff", value: "48", icon: Users, color: "text-primary", trend: "+4 this month" },
  { title: "Active Projects", value: "12", icon: FolderKanban, color: "text-secondary", trend: "3 finishing soon" },
  { title: "Students", value: "1,240", icon: GraduationCap, color: "text-primary", trend: "+12% growth" },
  { title: "Total Revenue", value: "$42.5k", icon: DollarSign, color: "text-secondary", trend: "+2.5% vs LW" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline text-white">System Intelligence</h1>
          <p className="text-muted-foreground">Real-time monitoring of AetherCore ecosystem.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/5">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-xs font-bold text-white uppercase tracking-tighter">Systems Normal</span>
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
            <CardTitle className="text-lg font-headline">Revenue Performance</CardTitle>
            <CardDescription>Monthly growth trajectory of digital services.</CardDescription>
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

        <Card className="glass border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Recent Activity</CardTitle>
            <CardDescription>Latest events across the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { user: "Donald Attah", action: "Approved 'Dawn Titans' project", time: "2m ago" },
                { user: "HR System", action: "New application for 3D Artist", time: "15m ago" },
                { user: "Bot v2", action: "Completed daily server backup", time: "1h ago" },
                { user: "Jane Doe", action: "Submitted course assignment", time: "3h ago" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
