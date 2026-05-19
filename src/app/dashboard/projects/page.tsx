"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical, Clock, CheckCircle2, LayoutGrid, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    title: "To Do",
    tasks: [
      { id: 1, title: "3D Rigging: Titan Lord", priority: "High", team: "Art Dept", date: "2d left" },
      { id: 2, title: "API Docs: Auth Flow", priority: "Med", team: "Backend", date: "5d left" },
    ]
  },
  {
    title: "In Progress",
    tasks: [
      { id: 3, title: "Smart Contract: NFT Marketplace", priority: "Urgent", team: "Blockchain", date: "Today" },
      { id: 4, title: "UI Components: Dashboard v2", priority: "High", team: "Frontend", date: "1d left" },
    ]
  },
  {
    title: "Testing",
    tasks: [
      { id: 5, title: "QA: Robotics Simulation #4", priority: "Low", team: "Robotics", date: "Completed" },
    ]
  },
  {
    title: "Completed",
    tasks: [
      { id: 6, title: "Website Launch: CG Dawn", priority: "Low", team: "Fullstack", date: "Done" },
    ]
  }
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-white">Project Pipeline</h1>
          <p className="text-muted-foreground">Manage ongoing development cycles and milestones.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="glass border-white/5 rounded-xl">
            <LayoutGrid className="w-4 h-4 mr-2" /> Board
          </Button>
          <Button variant="outline" className="glass border-white/5 rounded-xl">
            <List className="w-4 h-4 mr-2" /> List
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.title} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-sm text-white/80 uppercase tracking-widest">{column.title}</h3>
              <Badge variant="secondary" className="glass border-white/5 rounded-full px-2 text-[10px]">{column.tasks.length}</Badge>
            </div>
            
            <div className="space-y-4">
              {column.tasks.map((task) => (
                <Card key={task.id} className="glass border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <Badge className={
                        task.priority === "Urgent" ? "bg-red-500/10 text-red-500" :
                        task.priority === "High" ? "bg-primary/10 text-primary" :
                        "bg-white/5 text-muted-foreground"
                      } variant="outline">
                        {task.priority}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground group-hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <h4 className="font-bold text-white text-sm">{task.title}</h4>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
                          {task.team[0]}
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase">{task.team}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" /> {task.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {column.tasks.length === 0 && (
                <div className="border-2 border-dashed border-white/5 rounded-2xl p-8 text-center">
                  <p className="text-xs text-muted-foreground">Empty stack</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
