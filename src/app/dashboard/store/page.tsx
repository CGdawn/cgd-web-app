
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, Search, Loader2, Package, Edit, Trash2, 
  Eye, ShoppingBag, DollarSign, Tag, Box
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFirestore, useCollection } from "@/firebase";
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

const categories = ["Digital Assets", "Courses", "Merch", "Hardware"];

export default function StoreManagementPage() {
  const db = useFirestore();
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productData, setProductData] = useState({ 
    name: "", 
    price: 0, 
    category: "Digital Assets", 
    description: "", 
    stock: 999,
    imageUrl: ""
  });

  const productsQuery = useMemo(() => query(collection(db, "products"), orderBy("name", "asc")), [db]);
  const { data: products, loading } = useCollection(productsQuery);

  async function handleSaveProduct() {
    const productRef = editingProduct ? doc(db, "products", editingProduct.id) : doc(collection(db, "products"));
    
    await setDoc(productRef, {
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock),
      updatedAt: serverTimestamp(),
      ...(editingProduct ? {} : { createdAt: serverTimestamp() })
    }, { merge: true });
    
    setIsCreating(false);
    setEditingProduct(null);
    setProductData({ name: "", price: 0, category: "Digital Assets", description: "", stock: 999, imageUrl: "" });
  }

  async function handleDeleteProduct(id: string) {
    if (confirm("Decommission this item from the inventory?")) {
      await deleteDoc(doc(db, "products", id));
    }
  }

  function openEdit(product: any) {
    setEditingProduct(product);
    setProductData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      stock: product.stock,
      imageUrl: product.imageUrl || ""
    });
    setIsCreating(true);
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-white">Inventory Nexus</h1>
          <p className="text-muted-foreground">Manage products, pricing, and stock for the CyGen Store.</p>
        </div>
        <Dialog open={isCreating} onOpenChange={(open) => {
          setIsCreating(open);
          if (!open) {
            setEditingProduct(null);
            setProductData({ name: "", price: 0, category: "Digital Assets", description: "", stock: 999, imageUrl: "" });
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline">
                {editingProduct ? "Reconfigure Asset" : "Initialize Asset"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input 
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    placeholder="Cyber Helmet Mk-1" 
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input 
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: Number(e.target.value) })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select 
                    value={productData.category}
                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                    className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  >
                    {categories.map(cat => <option key={cat} value={cat} className="bg-[#1A161E]">{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Initial Stock</Label>
                  <Input 
                    type="number"
                    value={productData.stock}
                    onChange={(e) => setProductData({ ...productData, stock: Number(e.target.value) })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input 
                  value={productData.imageUrl}
                  onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}
                  placeholder="https://picsum.photos/seed/..."
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  className="bg-white/5 border-white/10 h-32"
                  placeholder="Describe the asset's utility and features..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button onClick={handleSaveProduct} className="bg-primary shadow-lg shadow-primary/20">
                {editingProduct ? "Update Record" : "Add to Store"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="glass border-white/5 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
            <CardTitle className="text-lg font-headline">Inventory List</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="Filter assets..." className="pl-9 h-9 text-xs bg-white/5 border-white/10 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-20 flex justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
            ) : (
              <div className="divide-y divide-white/5">
                {products?.map((product) => (
                  <div key={product.id} className="p-6 flex items-center justify-between group hover:bg-white/5 transition-colors">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20 shrink-0 overflow-hidden">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-6 h-6 text-secondary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{product.name}</h4>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1 font-bold text-primary"><DollarSign className="w-3 h-3" /> {product.price}</span>
                          <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {product.category}</span>
                          <span className="flex items-center gap-1"><Box className="w-3 h-3" /> Stock: {product.stock}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(product)} className="h-8 w-8 text-white/40 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleDeleteProduct(product.id)} variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {!products?.length && (
                  <div className="p-20 text-center space-y-4">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto opacity-10" />
                    <p className="text-muted-foreground font-headline uppercase tracking-widest text-xs">No assets in the manifest.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass border-white/5 h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-headline text-white">Store Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Total Inventory Value</p>
              <h3 className="text-3xl font-bold text-white">
                ${products?.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString() || 0}
              </h3>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Category Distribution</h5>
              {categories.map(cat => {
                const count = products?.filter(p => p.category === cat).length || 0;
                return (
                  <div key={cat} className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{cat}</span>
                    <Badge variant="outline" className="glass text-white/60">{count}</Badge>
                  </div>
                )
              })}
            </div>
            <Button variant="outline" className="w-full glass border-white/10 rounded-xl h-12 uppercase text-[10px] tracking-[0.2em] font-bold">
              Export manifest (CSV)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
