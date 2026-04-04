"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  User, Package, MapPin, Gift, Settings, LogOut,
  ChevronRight, Star, Crown, Sparkles, Trophy
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "SKN-2024-8192",
    date: "March 28, 2024",
    status: "Delivered",
    total: 82.00,
    items: [
      { name: "Pure Glow Face Cleanser", qty: 1, price: 34.00, image: "/images/cleaner.png" },
      { name: "Ultra-Rich Daily Moisturizer", qty: 1, price: 48.00, image: "/images/moisturizer.png" },
    ],
  },
  {
    id: "SKN-2024-7541",
    date: "March 14, 2024",
    status: "Shipped",
    total: 65.00,
    items: [
      { name: "Botanical Vitamin C Serum", qty: 1, price: 65.00, image: "/images/cleaner.png" },
    ],
  },
];

const MOCK_ADDRESSES = [
  { id: "1", label: "Home", street: "42 Lotus Lane, Bandra West", city: "Mumbai, Maharashtra 400050", isDefault: true },
  { id: "2", label: "Office", street: "Tower B, WeWork BKC", city: "Mumbai, Maharashtra 400051", isDefault: false },
];

const TABS = [
  { id: "orders", label: "Order History", icon: Package },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "loyalty", label: "Loyalty Rewards", icon: Gift },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");

  // Mock loyalty data
  const loyaltyPoints = 1240;
  const tier = "Gold";
  const nextTier = "Platinum";
  const pointsToNextTier = 760;

  return (
    <div className="bg-brand-50 min-h-screen pb-24">
      <div className="container mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-full bg-brand-200 flex items-center justify-center text-brand-600">
              <User size={36} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-900 tracking-tighter">
                Welcome back, Juhi
              </h1>
              <p className="text-brand-500 mt-1">Member since March 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-bold">
              <Crown size={14} className="mr-2 text-amber-500" />
              {tier} Member
            </Badge>
            <span className="text-sm font-display font-bold text-brand-900">{loyaltyPoints.toLocaleString()} pts</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Tabs */}
          <aside className="lg:w-72 flex-shrink-0">
            <nav className="space-y-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left transition-all",
                    activeTab === tab.id
                      ? "bg-white shadow-md text-brand-900 font-bold"
                      : "text-brand-500 hover:bg-white/50"
                  )}
                >
                  <tab.icon size={20} />
                  <span className="text-sm font-medium">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                </button>
              ))}
              <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-left text-red-400 hover:text-red-600 hover:bg-red-50 transition-all mt-6">
                <LogOut size={20} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-display font-bold text-brand-900 mb-8">Your Ritual History</h2>
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="p-8 rounded-[2rem] bg-white border border-brand-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-400">Order #{order.id}</p>
                        <p className="text-sm text-brand-600 mt-1">{order.date}</p>
                      </div>
                      <Badge
                        variant={order.status === "Delivered" ? "default" : "secondary"}
                        className={cn(
                          "px-4 py-1.5",
                          order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        )}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-brand-900">{item.name}</p>
                            <p className="text-xs text-brand-400">Qty: {item.qty}</p>
                          </div>
                          <p className="text-sm font-bold text-brand-900">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-brand-100">
                      <span className="text-sm text-brand-500">Total</span>
                      <span className="text-lg font-display font-bold text-brand-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-bold text-brand-900">Saved Addresses</h2>
                  <Button variant="outline" size="sm">+ Add Address</Button>
                </div>
                {MOCK_ADDRESSES.map((addr) => (
                  <div key={addr.id} className="p-8 rounded-[2rem] bg-white border border-brand-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl bg-brand-50 text-brand-500">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <p className="text-sm font-bold text-brand-900">{addr.label}</p>
                          {addr.isDefault && <Badge variant="secondary" className="text-[10px]">Default</Badge>}
                        </div>
                        <p className="text-sm text-brand-600 mt-1">{addr.street}</p>
                        <p className="text-sm text-brand-400">{addr.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-sm text-brand-500 font-medium hover:underline">Edit</button>
                      <button className="text-sm text-red-400 font-medium hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Loyalty Tab */}
            {activeTab === "loyalty" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-display font-bold text-brand-900 mb-4">Loyalty Rewards</h2>

                {/* Points Card */}
                <div className="p-10 rounded-[3rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-5">
                    <Trophy size={240} />
                  </div>
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center space-x-3">
                      <Crown size={24} className="text-amber-400" />
                      <span className="text-sm font-bold uppercase tracking-widest">{tier} Tier</span>
                    </div>
                    <div>
                      <p className="text-6xl font-display font-bold">{loyaltyPoints.toLocaleString()}</p>
                      <p className="text-brand-300 mt-1">Ritual Points</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-brand-300">Progress to {nextTier}</span>
                        <span className="font-bold">{pointsToNextTier} pts to go</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all"
                          style={{ width: `${((2000 - pointsToNextTier) / 2000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tier Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { tier: "Silver", range: "0 - 499 pts", benefits: ["5% discount", "Free shipping over $100", "Birthday gift"], active: false },
                    { tier: "Gold", range: "500 - 1999 pts", benefits: ["10% discount", "Free shipping", "Priority support", "Early access"], active: true },
                    { tier: "Platinum", range: "2000+ pts", benefits: ["15% discount", "Free express shipping", "VIP concierge", "Exclusive launches", "Anniversary gift"], active: false },
                  ].map((t) => (
                    <div
                      key={t.tier}
                      className={cn(
                        "p-8 rounded-[2rem] border transition-all",
                        t.active
                          ? "bg-white border-brand-500 shadow-lg scale-[1.02]"
                          : "bg-white/50 border-brand-100"
                      )}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-display font-bold text-brand-900">{t.tier}</h4>
                        {t.active && <Badge className="bg-brand-500 text-white">Current</Badge>}
                      </div>
                      <p className="text-xs text-brand-400 font-bold uppercase tracking-widest mb-6">{t.range}</p>
                      <ul className="space-y-3">
                        {t.benefits.map((b, i) => (
                          <li key={i} className="flex items-center space-x-2 text-sm text-brand-600">
                            <Sparkles size={12} className="text-brand-400 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-display font-bold text-brand-900 mb-8">Account Settings</h2>
                <div className="p-8 rounded-[2rem] bg-white border border-brand-100 shadow-sm space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-500">Full Name</label>
                      <input defaultValue="Juhi" className="w-full px-6 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-brand-500">Email</label>
                      <input defaultValue="juhi@example.com" className="w-full px-6 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-500">Phone</label>
                    <input defaultValue="+91 98765 43210" className="w-full px-6 py-4 rounded-2xl bg-brand-50 border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <Button size="md" className="rounded-full">Save Changes</Button>
                </div>

                <div className="p-8 rounded-[2rem] bg-white border border-red-100 shadow-sm space-y-4">
                  <h3 className="text-lg font-display font-bold text-red-600">Danger Zone</h3>
                  <p className="text-sm text-brand-600">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button variant="ghost" className="text-red-500 hover:bg-red-50">Delete Account</Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
