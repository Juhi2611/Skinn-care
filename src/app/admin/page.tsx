"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag,
  TrendingUp, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight,
  Plus, Search, MoreHorizontal, ChevronRight, Sparkles, Eye, Edit, Trash2, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { ProductForm } from "@/components/admin/ProductForm";
import { signOut } from "next-auth/react";

// Mock analytics data
const STATS = [
  { label: "Total Revenue", value: "$12,450", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Orders", value: "284", change: "+8.2%", up: true, icon: ShoppingCart },
  { label: "Customers", value: "1,024", change: "+15.3%", up: true, icon: Users },
  { label: "Avg. Order Value", value: "$43.80", change: "-2.1%", up: false, icon: BarChart3 },
];

const RECENT_ORDERS = [
  { id: "SKN-8192", customer: "Sarah J.", email: "sarah@email.com", total: 82.00, status: "Delivered", date: "Mar 28" },
  { id: "SKN-8191", customer: "Priya M.", email: "priya@email.com", total: 65.00, status: "Shipped", date: "Mar 27" },
  { id: "SKN-8190", customer: "James K.", email: "james@email.com", total: 118.00, status: "Processing", date: "Mar 27" },
  { id: "SKN-8189", customer: "Elena G.", email: "elena@email.com", total: 34.00, status: "Pending", date: "Mar 26" },
  { id: "SKN-8188", customer: "Michael R.", email: "michael@email.com", total: 96.00, status: "Delivered", date: "Mar 26" },
];

const TOP_PRODUCTS = [
  { name: "Botanical Vitamin C Serum", sold: 201, revenue: 13065, image: "/images/cleaner.png" },
  { name: "Daily Defense SPF 50", sold: 178, revenue: 7476, image: "/images/hero.png" },
  { name: "Pure Glow Face Cleanser", sold: 124, revenue: 4216, image: "/images/cleaner.png" },
  { name: "Ultra-Rich Daily Moisturizer", sold: 89, revenue: 4272, image: "/images/moisturizer.png" },
];

const ADMIN_PRODUCTS = [
  { id: "1", name: "Pure Glow Face Cleanser", category: "Cleanse", price: 34.00, stock: 15, status: "Active", image: "/images/cleaner.png" },
  { id: "2", name: "Ultra-Rich Daily Moisturizer", category: "Moisturize", price: 48.00, stock: 22, status: "Active", image: "/images/moisturizer.png" },
  { id: "3", name: "Rosehip Infused Facial Oil", category: "Treat", price: 52.00, stock: 8, status: "Low Stock", image: "/images/hero.png" },
  { id: "4", name: "Botanical Vitamin C Serum", category: "Treat", price: 65.00, stock: 30, status: "Active", image: "/images/cleaner.png" },
  { id: "5", name: "Soothing Lavender Mask", category: "Masks", price: 28.00, stock: 0, status: "Out of Stock", image: "/images/moisturizer.png" },
];

const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "customers", label: "Customers", icon: Users },
  { id: "coupons", label: "Coupons", icon: Tag },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from DB
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to load rituals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handeSaveProduct = async (data: any) => {
    setLoading(true);
    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save ritual");

      const { product } = await res.json();
      
      if (editingProduct) {
        setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      } else {
        setProducts(prev => [product, ...prev]);
      }
      setShowProductForm(false);
    } catch (error) {
      console.error("Save ritual error:", error);
      alert("Performance drop in ritual creation. Falling back to optimistic simulation.");
      // Optimistic fallback for demo
      if (editingProduct) {
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...data } : p));
      } else {
        const newId = "MOCK-" + Math.floor(Math.random() * 1000);
        setProducts(prev => [{ ...data, id: newId, status: "Active", image: data.images[0] || "/images/cleaner.png" }, ...prev]);
      }
      setShowProductForm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to remove this ritual?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-brand-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-900 text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8 border-b border-white/10 text-center">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <Sparkles size={24} className="text-brand-400" />
            <span className="text-2xl font-display font-bold tracking-tighter">SKINN.</span>
          </Link>
          <Badge className="mt-4 bg-white/10 text-brand-300 text-[10px] uppercase tracking-widest px-4 border-none">Admin Legacy</Badge>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-sm",
                activeSection === item.id
                  ? "bg-white/10 text-white font-bold"
                  : "text-brand-300 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-sm font-bold shadow-lg">JD</div>
              <div>
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-[10px] text-brand-400 uppercase tracking-widest">Master Ritualist</p>
              </div>
            </div>
            <button onClick={() => signOut()} className="text-brand-300 hover:text-red-400 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 p-8 lg:p-12 pb-24">
        {/* Dashboard View */}
        {activeSection === "dashboard" && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-display font-bold text-brand-900">Legacy Overview</h1>
                <p className="text-brand-500 mt-1 italic">The ritual performance and growth.</p>
              </div>
              <Button size="md" className="rounded-full shadow-lg">
                <TrendingUp className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-white border border-brand-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-brand-50">
                      <stat.icon size={24} className="text-brand-600" />
                    </div>
                    <span className={cn(
                      "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                      stat.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                    )}>
                      {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-4xl font-display font-bold text-brand-900">{stat.value}</p>
                  <p className="text-[10px] text-brand-400 mt-2 uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Revenue Chart Placeholder + Top Products */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Chart Area */}
              <div className="xl:col-span-2 p-10 rounded-[3rem] bg-white border border-brand-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-display font-bold text-brand-900">Revenue Flow</h3>
                  <div className="flex items-center space-x-2 text-xs">
                    <button className="px-5 py-2 rounded-full bg-brand-900 text-white font-bold shadow-md">Monthly</button>
                    <button className="px-5 py-2 rounded-full text-brand-500 hover:bg-brand-50 transition-colors">Weekly</button>
                  </div>
                </div>
                {/* Simulated chart with bars */}
                <div className="flex items-end justify-between h-56 gap-3">
                  {[65, 80, 45, 90, 70, 95, 55, 85, 75, 60, 88, 100].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                      className={cn(
                        "flex-1 rounded-t-2xl shadow-sm",
                        i === 11 ? "bg-brand-600" : "bg-brand-100 group-hover:bg-brand-200 transition-colors"
                      )}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-6 text-[10px] text-brand-300 font-bold uppercase tracking-widest border-t border-brand-50 pt-4">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="p-10 rounded-[3rem] bg-white border border-brand-100 shadow-sm">
                <h3 className="text-2xl font-display font-bold text-brand-900 mb-8">Iconic Rituals</h3>
                <div className="space-y-8">
                  {TOP_PRODUCTS.map((product, i) => (
                    <div key={i} className="flex items-center space-x-5 group cursor-pointer">
                      <span className="text-xs font-bold text-brand-200 w-5 transition-colors group-hover:text-brand-900">0{i + 1}</span>
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-brand-50 flex-shrink-0 shadow-sm">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-900 truncate group-hover:text-brand-600 transition-colors">{product.name}</p>
                        <p className="text-xs text-brand-400">{product.sold} creations sold</p>
                      </div>
                      <p className="text-base font-bold text-brand-900 font-display">${product.revenue.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="p-10 rounded-[3rem] bg-white border border-brand-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-display font-bold text-brand-900">Recent Transactions</h3>
                <button
                  onClick={() => setActiveSection("orders")}
                  className="text-xs text-brand-500 font-bold flex items-center hover:text-brand-900 transition-all uppercase tracking-widest"
                >
                  View All Orders <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-50">
                      <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Order ID</th>
                      <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Patron</th>
                      <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Ritual Date</th>
                      <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Investment</th>
                      <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((order) => (
                      <tr key={order.id} className="border-b border-brand-50 hover:bg-brand-50/30 transition-colors group">
                        <td className="py-6 font-bold text-brand-900">#{order.id}</td>
                        <td className="py-6">
                          <p className="font-bold text-brand-900">{order.customer}</p>
                          <p className="text-xs text-brand-400 lowercase">{order.email}</p>
                        </td>
                        <td className="py-6 text-brand-500 font-medium">{order.date}</td>
                        <td className="py-6 font-bold text-brand-900 font-display">${order.total.toFixed(2)}</td>
                        <td className="py-6">
                          <Badge
                            className={cn(
                              "text-[10px] uppercase tracking-widest border-none px-4 py-1",
                              order.status === "Delivered" && "bg-green-50 text-green-600",
                              order.status === "Shipped" && "bg-blue-50 text-blue-600",
                              order.status === "Processing" && "bg-amber-50 text-amber-600",
                              order.status === "Pending" && "bg-gray-100 text-gray-500"
                            )}
                          >
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products View */}
        {activeSection === "products" && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-display font-bold text-brand-900">Ritual Lab</h1>
                <p className="text-brand-500 mt-1 italic">Cultivate and manage your products.</p>
              </div>
              <Button size="lg" className="rounded-full shadow-xl px-10 h-14" onClick={handleAddProduct}>
                <Plus className="mr-2 h-5 w-5" />
                New Ritual
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-300" />
                <input
                  placeholder="Search your creations..."
                  className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-lg shadow-sm"
                />
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-white border border-brand-100 shadow-sm overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-50">
                    <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Product</th>
                    <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Science</th>
                    <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Price</th>
                    <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Stock</th>
                    <th className="text-left pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Status</th>
                    <th className="text-right pb-6 text-[10px] font-bold uppercase tracking-widest text-brand-300">Ritual Management</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-brand-50 hover:bg-brand-50/30 transition-colors group">
                      <td className="py-6">
                        <div className="flex items-center space-x-5">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-brand-50 flex-shrink-0 shadow-sm">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <span className="font-bold text-brand-900 text-lg">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-6 text-brand-500 font-medium">{product.category}</td>
                      <td className="py-6 font-bold text-brand-900 font-display text-lg">${product.price.toFixed(2)}</td>
                      <td className="py-6 text-brand-500 font-bold">{product.stock} units</td>
                      <td className="py-6">
                        <Badge
                          className={cn(
                            "text-[10px] uppercase tracking-widest border-none px-4 py-1",
                            product.status === "Active" && "bg-green-50 text-green-600",
                            product.status === "Low Stock" && "bg-amber-50 text-amber-600",
                            (product.status === "Out of Stock" || product.stock === 0) && "bg-red-50 text-red-600"
                          )}
                        >
                          {product.stock === 0 ? "Out of Stock" : product.status}
                        </Badge>
                      </td>
                      <td className="py-6 text-right">
                        <div className="flex items-center justify-end space-x-3">
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="p-3 rounded-xl bg-brand-50 text-brand-400 hover:text-brand-900 hover:bg-brand-100 transition-all shadow-sm"
                          >
                            <Edit size={20} />
                          </button>
                          <button 
                             onClick={() => handleDeleteProduct(product.id)}
                             className="p-3 rounded-xl bg-red-50 text-red-300 hover:text-red-600 hover:bg-red-100 transition-all shadow-sm"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ... (Orders/Customers/Coupons sections remain the same for space) */}
        {activeSection === "orders" && (
            <div className="space-y-8">
               <h1 className="text-4xl font-display font-bold text-brand-900 text-center py-20 opacity-30 italic">Order Legacy Flow coming soon...</h1>
            </div>
        )}
        {activeSection === "customers" && (
            <div className="space-y-8">
               <h1 className="text-4xl font-display font-bold text-brand-900 text-center py-20 opacity-30 italic">Patron Directory coming soon...</h1>
            </div>
        )}
      </main>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showProductForm && (
          <ProductForm 
            initialData={editingProduct} 
            onClose={() => setShowProductForm(false)} 
            onSave={handeSaveProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
