
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, Clock, CheckCircle2, 
  FileText, Edit, Trash2, Eye, Search, Loader2, ShieldAlert
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFirestore, useCollection, useUser, useDoc } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
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
  const [editingPost, setEditingPost] = useState<any>(null);
  const [postData, setPostData] = useState({ title: "", excerpt: "", content: "", category: "Tech", imageUrl: "" });

  const userRef = useMemo(() => user ? doc(db, "users", user.uid) : null, [db, user]);
  const { data: profile } = useDoc(userRef);

  const postsQuery = useMemo(() => {
    return query(collection(db, "posts"), orderBy("createdAt", "desc"));
  }, [db]);

  const { data: posts, loading } = useCollection(postsQuery);

  const canCreate = profile?.role === "super-admin" || profile?.role === "admin";
  const canDelete = profile?.role === "super-admin";

  async function handleSavePost() {
    if (!user || !canCreate) return;
    const slug = postData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const postRef = editingPost ? doc(db, "posts", editingPost.id) : doc(collection(db, "posts"));
    
    // Admins can only edit their own posts
    if (editingPost && profile?.role === "admin" && editingPost.authorId !== user.uid) {
      alert("Unauthorized: You can only reconfigure your own transmissions.");
      return;
    }

    await setDoc(postRef, {
      ...postData,
      slug,
      authorId: user.uid,
      authorName: user.displayName || "Author",
      published: true,
      updatedAt: serverTimestamp(),
      ...(editingPost ? {} : { 
        createdAt: serverTimestamp(),
        likesCount: 0,
        commentsCount: 0,
        featured: false
      })
    }, { merge: true });
    
    setIsCreating(false);
    setEditingPost(null);
    setPostData({ title: "", excerpt: "", content: "", category: "Tech", imageUrl: "" });
  }

  async function handleDeletePost(post: any) {
    if (!canDelete) {
      alert("Unauthorized: Only the Super Admin can decommissioning records completely.");
      return;
    }
    if (confirm("Are you sure you want to delete this transmission? This cannot be undone.")) {
      await deleteDoc(doc(db, "posts", post.id));
    }
  }

  function openEdit(post: any) {
    if (profile?.role === "admin" && post.authorId !== user?.uid) {
      alert("Unauthorized: You can only edit your own posts.");
      return;
    }
    setEditingPost(post);
    setPostData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      imageUrl: post.imageUrl || ""
    });
    setIsCreating(true);
  }

  if (profile?.role === "staff" || profile?.role === "client") {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <ShieldAlert className="w-16 h-16 text-primary" />
        <h2 className="text-2xl font-headline font-bold text-white">Access Restricted</h2>
        <p className="text-muted-foreground">Only Admins and the Super Admin can access the Content Nexus.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-white">Content Nexus</h1>
          <p className="text-muted-foreground">Manage articles, drafts, and system-wide communications.</p>
        </div>
        {canCreate && (
          <Dialog open={isCreating} onOpenChange={(open) => {
            setIsCreating(open);
            if (!open) {
              setEditingPost(null);
              setPostData({ title: "", excerpt: "", content: "", category: "Tech", imageUrl: "" });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4 mr-2" /> New Transmission
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline">
                  {editingPost ? "Reconfigure Post" : "Initialize Post"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    placeholder="The Future of AI in Lagos..." 
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input 
                      value={postData.category}
                      onChange={(e) => setPostData({ ...postData, category: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Image URL</Label>
                    <Input 
                      value={postData.imageUrl}
                      onChange={(e) => setPostData({ ...postData, imageUrl: e.target.value })}
                      placeholder="https://picsum.photos/..."
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Excerpt</Label>
                  <Textarea 
                    value={postData.excerpt}
                    onChange={(e) => setPostData({ ...postData, excerpt: e.target.value })}
                    className="bg-white/5 border-white/10 h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Main Content</Label>
                  <Textarea 
                    value={postData.content}
                    onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                    className="bg-white/5 border-white/10 h-64"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSavePost} className="bg-primary shadow-lg shadow-primary/20">
                  {editingPost ? "Update Record" : "Publish Transmission"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
            <CardTitle className="text-lg font-headline">Recent Transmissions</CardTitle>
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
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 overflow-hidden">
                        {post.imageUrl ? (
                          <img src={post.imageUrl} className="w-full h-full object-cover" />
                        ) : (
                          <FileText className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-white text-sm truncate">{post.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                          <span className="text-primary font-bold">{post.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white" asChild>
                        <a href={`/blog/${post.slug}`} target="_blank"><Eye className="w-4 h-4" /></a>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(post)} className="h-8 w-8 text-white/40 hover:text-white"><Edit className="w-4 h-4" /></Button>
                      {canDelete && (
                        <Button onClick={() => handleDeletePost(post)} variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-white/5 h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-headline text-white">Nexus Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Global Ranking</p>
              <h3 className="text-2xl font-bold text-secondary">#42</h3>
              <p className="text-[10px] text-muted-foreground mt-2">Top 5% in tech category</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Active Discussions</p>
              <h3 className="text-2xl font-bold text-white">{posts?.reduce((acc, p) => acc + (p.commentsCount || 0), 0) || 0}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
