"use client";

import React, { useState } from "react";
import { X, Upload, Plus, Trash2, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFormProps {
  initialData?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const ProductForm = ({ initialData, onClose, onSave }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      price: "",
      category: "Cleanse",
      stock: "",
      description: "",
      ingredients: "",
      usage: "",
      images: [],
    }
  );

  const [newImage, setNewImage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData((prev: any) => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }));
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      onSave(formData);
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-end p-0 md:p-6 bg-black/20 backdrop-blur-sm">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        className="w-full max-w-2xl bg-white h-full md:h-auto md:rounded-[3rem] shadow-2xl overflow-y-auto"
      >
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-3xl font-display font-bold text-brand-900">
                {initialData ? "Edit Ritual" : "New Skincare Ritual"}
              </h3>
              <p className="text-brand-500 mt-1">Define the science and ritual of this product</p>
            </div>
            <button onClick={onClose} className="p-3 bg-brand-50 rounded-full text-brand-400 hover:text-brand-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 pb-10">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 ml-4">Product Name</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Pure Glow Face Cleanser"
                  className="w-full bg-brand-50 border border-brand-100 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 ml-4">Price ($)</label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full bg-brand-50 border border-brand-100 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 ml-4">Stock</label>
                <input
                  required
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full bg-brand-50 border border-brand-100 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 ml-4">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-brand-50 border border-brand-100 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium appearance-none"
                >
                  <option>Cleanse</option>
                  <option>Treat</option>
                  <option>Moisturize</option>
                  <option>Protect</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 ml-4">Description</label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-brand-50 border border-brand-100 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium italic"
              />
            </div>

            {/* Ingredients & Usage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 ml-4">Ingredients</label>
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-brand-50 border border-brand-100 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 ml-4">Usage Ritual</label>
                <textarea
                  name="usage"
                  value={formData.usage}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-brand-50 border border-brand-100 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm font-medium"
                />
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-400 ml-4">Gallery Images</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Image URL..."
                  className="flex-1 bg-brand-50 border border-brand-100 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-medium"
                />
                <Button type="button" onClick={addImage} size="md" className="rounded-full w-14">
                  <Plus />
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <AnimatePresence>
                  {formData.images.map((img: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative aspect-square rounded-2xl overflow-hidden group"
                    >
                      <img src={img} alt="" className="object-cover w-full h-full" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {formData.images.length === 0 && (
                  <div className="aspect-square rounded-2xl border-2 border-dashed border-brand-100 flex items-center justify-center text-brand-300">
                    <Upload size={24} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 pt-10 border-t border-brand-100">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-full py-8">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-2 rounded-full py-8 text-lg font-bold shadow-xl px-12">
                {loading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Ritual
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
