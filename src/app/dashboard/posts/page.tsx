
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, MoreVertical, Clock, CheckCircle2, 
  FileText, Edit, Trash2, Eye, LayoutGrid, 
  List, Search, Loader2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFirestore, useCollection, useUser } from "@/firebase";
import { collection, query, where, orderBy, deleteDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PostsManagementPage() {
  const { user } = useUser();
  const db = useFirestore();
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", excerpt: "", content: "", category: "Tech" });

  const postsQuery = useMemo(() => {
    if (!user) return null;
    return query(collection(db, "posts"), where("authorId", "==", user.uid), orderBy("createdAt", "desc"));
  }, [db, user]);

  const { data: posts, loading } = useCollection(postsQuery);

  async function handleCreatePost() {
    if (!user) return;
    const slug = newPost.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const postRef = doc(collection(db, "posts"));
    
    await setDoc(postRef, {
      ...newPost,
      slug,
      authorId: user.uid,
      authorName: user.displayName || "Admin",
      published: true,
      featured: false,
      likesCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    setIsCreating(false);
    setNewPost({ title: "", excerpt: "", content: "", category: "Tech" });
  }

  async function handleDeletePost(id: string) {
    if (confirm("Are you sure you want to delete this transmission?")) {
      await deleteDoc(doc(db, "posts", id));
    }
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-white">Content Nexus</h1>
          <p className="text-muted-foreground">Manage your articles, drafts, and community engagement.</p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> New Transmission
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline">Initialize Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="The Future of AI in Lagos..." 
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input 
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea 
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  className="bg-white/5 border-white/10 h-20"
                />
              </div>
              <div className="space-y-2">
                <Label>Main Content</Label>
                <Textarea 
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="bg-white/5 border-white/10 h-64"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button onClick={handleCreatePost} className="bg-primary shadow-lg shadow-primary/20">Publish Transmission</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
            <div className="space-y-1">
              <CardTitle className="text-lg font-headline">Recent Transmissions</CardTitle>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="Filter posts..." className="pl-9 h-9 text-xs bg-white/5 border-white/10 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-20 flex justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
            ) : (
              <div className="divide-y divide-white/5">
                {posts?.map((post) => (
                  <div key={post.id} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
                    <div className="flex gap-4 items-center overflow-hidden">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-white text-sm truncate">{post.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                          <span className="text-primary font-bold">{post.category}</span>
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500" /> {post.likesCount || 0}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white" asChild>
                        <a href={`/blog/${post.slug}`} target="_blank"><Eye className="w-4 h-4" /></a>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white"><Edit className="w-4 h-4" /></Button>
                      <Button onClick={() => handleDeletePost(post.id)} variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {!posts?.length && (
                  <div className="p-20 text-center space-y-4">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto opacity-10" />
                    <p className="text-muted-foreground font-headline uppercase tracking-widest text-xs">No transmissions broadcasted yet.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-white/5 h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-headline text-white">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Total Impressions</p>
              <h3 className="text-2xl font-bold text-white">12,408</h3>
              <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold mt-2">
                <CheckCircle2 className="w-3 h-3" /> +12% from last week
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Global Ranking</p>
              <h3 className="text-2xl font-bold text-secondary">#42</h3>
              <p className="text-[10px] text-muted-foreground mt-2">Top 5% in tech category</p>
            </div>
            <Button variant="outline" className="w-full glass border-white/10 rounded-xl h-12 uppercase text-[10px] tracking-[0.2em] font-bold">
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
