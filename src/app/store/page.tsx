"use client";

/**
 * @fileOverview Production Store Page
 * Fetches real-time products and manages Firestore-persisted shopping carts.
 */

import { useState, useMemo } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AIAssistant } from "@/components/shared/ai-assistant";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, ShoppingCart, Search,
  Trash2, Minus, Plus, Loader2, CheckCircle2, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { useFirestore, useCollection, useUser } from "@/firebase";
import { collection, doc, setDoc, deleteDoc, writeBatch, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const categories = ["All", "Digital Assets", "Courses", "Merch", "Hardware"];

export default function StorePage() {
  const { user } = useUser();
  const db = useFirestore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // REAL FIRESTORE DATA: Products
  const productsQuery = useMemo(() => collection(db, "products"), [db]);
  const { data: products, loading: productsLoading } = useCollection(productsQuery);

  // REAL FIRESTORE DATA: User Cart
  const cartQuery = useMemo(() => {
    if (!user) return null;
    return collection(db, "users", user.uid, "cart");
  }, [db, user]);
  const { data: cartItems } = useCollection(cartQuery);

  const cartTotal = useMemo(() => {
    return cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  }, [cartItems]);

  const filteredProducts = useMemo(() => {
    return products?.filter(p => 
      (activeCategory === "All" || p.category === activeCategory) &&
      (p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];
  }, [products, activeCategory, searchQuery]);

  async function handleAddToCart(product: any) {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    const cartRef = doc(db, "users", user.uid, "cart", product.id);
    const existingItem = cartItems?.find(item => item.id === product.id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    setDoc(cartRef, {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl || PlaceHolderImages.find(img => img.id === product.img)?.imageUrl || ""
    }, { merge: true }).catch(async (e) => {
      errorEmitter.emit("permission-error", new FirestorePermissionError({
        path: cartRef.path,
        operation: "update",
        requestResourceData: { quantity }
      }));
    });
  }

  async function handleUpdateQuantity(productId: string, delta: number) {
    if (!user) return;
    const cartRef = doc(db, "users", user.uid, "cart", productId);
    const item = cartItems?.find(i => i.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      deleteDoc(cartRef);
    } else {
      setDoc(cartRef, { quantity: newQuantity }, { merge: true });
    }
  }

  async function handleCheckout() {
    if (!user || !cartItems || cartItems.length === 0) return;
    setIsCheckingOut(true);

    const batch = writeBatch(db);
    const orderRef = doc(collection(db, "users", user.uid, "orders"));

    batch.set(orderRef, {
      userId: user.uid,
      items: cartItems,
      totalAmount: cartTotal,
      status: "pending",
      createdAt: serverTimestamp()
    });

    cartItems.forEach(item => {
      const itemRef = doc(db, "users", user.uid, "cart", item.id);
      batch.delete(itemRef);
    });

    batch.commit().then(() => {
      setIsCheckingOut(false);
      alert("Transaction broadcasted successfully! View status in your dashboard.");
    }).catch(e => {
      setIsCheckingOut(false);
      console.error("Checkout failed", e);
    });
  }

  const heroImage = PlaceHolderImages.find(img => img.id === "store-hero");

  return (
    <main className="min-h-screen bg-background text-white">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt="Store Hero" 
              fill 
              className="object-cover"
            />
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Badge className="bg-secondary/20 text-secondary border-secondary/20 py-1.5 px-4 rounded-full mb-6 uppercase tracking-[0.2em] text-[10px]">
              Ecosystem Inventory
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold font-headline leading-tight">
              Equip Your <br />
              <span className="text-gradient">Digital Future.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-6 px-6 sticky top-20 z-40 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "ghost"}
                className={`rounded-full px-5 h-9 text-xs transition-all ${activeCategory === cat ? "bg-primary text-white" : "text-muted-foreground"}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
              className="pl-11 bg-white/5 border-white/10 rounded-full h-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {productsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground font-headline uppercase tracking-[0.3em] text-[10px]">Accessing Database...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="group glass rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-primary/20 transition-all flex flex-col h-full">
                      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                        <Image 
                          src={product.imageUrl || PlaceHolderImages.find(img => img.id === product.img)?.imageUrl || ""} 
                          alt={product.name} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-8 space-y-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold font-headline text-white group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                          <span className="text-xl font-bold text-primary">${product.price}</span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                        <div className="pt-6 mt-auto">
                          <Button 
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-white text-black hover:bg-white/90 rounded-full h-12 font-bold gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" /> Add to Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!productsLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20 space-y-4">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto opacity-20" />
              <p className="text-muted-foreground italic">No sector items found for this query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="glass border-white/10 text-white max-w-4xl p-0 overflow-hidden">
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square h-full">
                <Image src={selectedProduct.imageUrl || ""} alt={selectedProduct.name} fill className="object-cover" />
              </div>
              <div className="p-10 space-y-8">
                <DialogHeader>
                  <Badge className="bg-primary/20 text-primary w-fit mb-2">{selectedProduct.category}</Badge>
                  <DialogTitle className="text-3xl font-headline text-white">{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <p className="text-4xl font-bold text-primary">${selectedProduct.price}</p>
                <p className="text-muted-foreground leading-relaxed">{selectedProduct.description}</p>
                <div className="space-y-3">
                  <h5 className="font-bold text-xs uppercase tracking-widest text-white/70">Specifications</h5>
                  <ul className="grid grid-cols-1 gap-2">
                    {(selectedProduct.features || []).map((f: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-xs text-white/80 glass p-3 rounded-xl">
                        <CheckCircle2 className="w-3 h-3 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-primary h-14 rounded-full font-bold">Initialize Purchase</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Persistent Cart System */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="fixed bottom-10 right-10 z-[100]">
            <Button size="lg" className="h-16 w-16 rounded-full bg-primary shadow-2xl hover:scale-110 transition-transform">
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartItems && cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-white text-black font-bold h-6 w-6 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="glass border-white/10 text-white flex flex-col p-0">
          <SheetHeader className="p-6 border-b border-white/5">
            <SheetTitle className="text-white font-headline">Order Manifest</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!cartItems?.length ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                <ShoppingBag className="w-12 h-12" />
                <p className="text-xs uppercase tracking-widest">Inventory Empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 glass p-4 rounded-2xl border-white/5">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-xs text-white">{item.name}</h4>
                      <button onClick={() => handleUpdateQuantity(item.id, -item.quantity)} className="text-muted-foreground hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                    </div>
                    <p className="text-primary font-bold text-sm">${item.price}</p>
                    <div className="flex items-center gap-2 bg-white/5 w-fit rounded-lg px-2 py-1 mt-2">
                      <button onClick={() => handleUpdateQuantity(item.id, -1)} className="text-white/40 hover:text-white"><Minus className="w-3 h-3" /></button>
                      <span className="text-[10px] font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, 1)} className="text-white/40 hover:text-white"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cartItems?.length > 0 && (
            <SheetFooter className="p-6 glass-dark border-t border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Total Value</span>
                <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <Button onClick={handleCheckout} disabled={isCheckingOut} className="w-full bg-primary h-14 rounded-xl font-bold">
                {isCheckingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Transaction"}
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <Footer />
      <AIAssistant />
    </main>
  );
}
