"use client";

/**
 * @fileOverview Production Blog Post Page
 * Features real-time multi-emoji reactions and threaded community comments.
 */

import { use, useState, useMemo } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Send, Sparkles, Loader2,
  ThumbsUp, Flame, Zap, Rocket, Brain, HeartPulse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFirestore, useCollection, useUser, useDoc } from "@/firebase";
import { collection, doc, setDoc, updateDoc, increment, serverTimestamp, query, where, orderBy, deleteDoc } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { cn } from "@/lib/utils";

const REACTIONS = [
  { type: "like", icon: ThumbsUp, label: "Like", color: "text-blue-400" },
  { type: "love", icon: HeartPulse, label: "Love", color: "text-red-400" },
  { type: "fire", icon: Flame, label: "Fire", color: "text-orange-400" },
  { type: "mindblown", icon: Zap, label: "Wow", color: "text-purple-400" },
  { type: "rocket", icon: Rocket, label: "Rocket", color: "text-primary" },
  { type: "genius", icon: Brain, label: "Smart", color: "text-green-400" },
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user } = useUser();
  const db = useFirestore();
  const [commentText, setCommentText] = useState("");

  const postsQuery = useMemo(() => query(collection(db, "posts"), where("slug", "==", slug)), [db, slug]);
  const { data: posts, loading: postLoading } = useCollection(postsQuery);
  const post = posts?.[0];

  const commentsQuery = useMemo(() => {
    if (!post) return null;
    return query(collection(db, "posts", post.id, "comments"), orderBy("createdAt", "asc"));
  }, [db, post]);
  const { data: comments } = useCollection(commentsQuery);

  const reactionRef = useMemo(() => {
    if (!post || !user) return null;
    return doc(db, "posts", post.id, "reactions", user.uid);
  }, [db, post, user]);
  const { data: userReaction } = useDoc(reactionRef);

  async function handleReaction(type: string) {
    if (!user || !post) return;
    const ref = doc(db, "posts", post.id, "reactions", user.uid);
    
    if (userReaction?.type === type) {
      deleteDoc(ref);
      updateDoc(doc(db, "posts", post.id), { reactionsCount: increment(-1) });
    } else {
      setDoc(ref, { type, userId: user.uid, createdAt: serverTimestamp() });
      if (!userReaction) {
        updateDoc(doc(db, "posts", post.id), { reactionsCount: increment(1) });
      }
    }
  }

  async function handleAddComment() {
    if (!user || !post || !commentText.trim()) return;

    const commentRef = doc(collection(db, "posts", post.id, "comments"));
    setDoc(commentRef, {
      postId: post.id,
      userId: user.uid,
      userName: user.displayName || "Explorer",
      userAvatar: user.photoURL || "",
      content: commentText,
      likes: 0,
      createdAt: serverTimestamp()
    }).catch(async (e) => {
      errorEmitter.emit("permission-error", new FirestorePermissionError({
        path: commentRef.path,
        operation: "create",
        requestResourceData: { content: commentText }
      }));
    });

    updateDoc(doc(db, "posts", post.id), { commentsCount: increment(1) });
    setCommentText("");
  }

  if (postLoading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
      <h2 className="text-3xl font-headline font-bold text-white">Transmission Lost</h2>
      <Button asChild variant="outline" className="glass rounded-full"><Link href="/blog">Back to Feed</Link></Button>
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Navbar />
      <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-white"><Link href="/blog"><ArrowLeft className="mr-2 w-4 h-4" /> Journal Feed</Link></Button>
          <div className="space-y-4">
            <Badge className="bg-primary/20 text-primary border-primary/20 uppercase tracking-widest text-[10px] font-bold">{post.category}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight">{post.title}</h1>
          </div>
          <div className="flex items-center justify-between border-y border-white/5 py-8">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border border-primary/20">
                <AvatarFallback>{post.authorName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-white text-xs uppercase">{post.authorName}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{new Date(post.createdAt?.seconds * 1000).toLocaleDateString()} • 8 min read</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10">
          <Image src={post.imageUrl || PlaceHolderImages.find(img => img.id === "blog-1")?.imageUrl || ""} alt={post.title} fill className="object-cover" />
        </div>

        <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed space-y-8">
          <p className="text-xl text-white font-medium leading-relaxed border-l-4 border-primary pl-6">{post.excerpt}</p>
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        <div className="pt-12 border-t border-white/5 space-y-12">
          <div className="flex flex-wrap items-center gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mr-4">Interactions</h4>
            <div className="flex items-center gap-2 glass p-2 rounded-full border-white/10">
              {REACTIONS.map((r) => {
                const isActive = userReaction?.type === r.type;
                return (
                  <Button 
                    key={r.type} 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleReaction(r.type)}
                    className={cn("rounded-full transition-all duration-300", isActive ? "bg-white/10 scale-110" : "opacity-60")}
                  >
                    <r.icon className={cn("w-5 h-5", isActive ? r.color : "text-white")} />
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-2xl font-bold font-headline flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-secondary" /> Discussion
              <Badge variant="outline" className="glass text-[10px] ml-2">{comments?.length || 0}</Badge>
            </h3>

            {user ? (
              <div className="glass p-8 rounded-[2rem] border-white/5 space-y-6">
                <Textarea 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Broadcast your take on this insight..."
                  className="bg-white/5 border-white/10 min-h-[120px] rounded-2xl p-6"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment} disabled={!commentText.trim()} className="bg-primary rounded-full px-8 h-12 gap-2 font-bold">Post Response <Send className="w-4 h-4" /></Button>
                </div>
              </div>
            ) : (
              <div className="text-center p-12 glass rounded-[2rem] border-white/5">
                <p className="text-muted-foreground mb-6">Authenticate to join the scientific discourse.</p>
                <Button asChild className="bg-white text-black rounded-full px-8 h-12"><Link href="/auth/login">Sign In</Link></Button>
              </div>
            )}

            <div className="space-y-8">
              {comments?.map((comment) => (
                <div key={comment.id} className="flex gap-6">
                  <Avatar className="w-12 h-12 border border-white/5">
                    <AvatarImage src={comment.userAvatar} />
                    <AvatarFallback className="bg-white/5 text-[10px]">{comment.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white uppercase">{comment.userName}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(comment.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed glass-dark p-6 rounded-2xl border border-white/5">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
      <Footer />
      <AIAssistant />
    </main>
  );
}
