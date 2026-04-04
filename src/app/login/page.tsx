"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Lock, User, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (res?.error) {
          setError("Invalid email or password");
        } else {
          router.push("/account");
          router.refresh();
        }
      } else {
        // Registration Logic
        // In a real app, you'd call your API to create the user
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
           // Auto login after registration
           const loginRes = await signIn("credentials", {
             email: formData.email,
             password: formData.password,
             redirect: false,
           });
           if (loginRes?.error) {
             setError("Account created! Please sign in.");
             setIsLogin(true);
           } else {
             router.push("/account");
             router.refresh();
           }
        } else {
          const data = await response.json();
          setError(data.message || "Registration failed");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles size={32} className="text-brand-600" />
            <span className="text-3xl font-display font-bold tracking-tighter text-brand-900">
              SKINN.
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold text-brand-900 italic">
            {isLogin ? "Welcome back to the Ritual" : "Begin Your Skin Journey"}
          </h2>
          <p className="text-brand-500 mt-2">
            {isLogin
              ? "Access your personalized ritual and rewards"
              : "Create an account to start earning loyalty points"}
          </p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-brand-100">
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center space-x-3 text-red-600 text-sm font-medium">
                   <AlertCircle size={18} />
                   <span>{error}</span>
                </div>
              )}

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-4">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-300" />
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-6 py-4 rounded-3xl bg-brand-50 border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-4">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-300" />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-14 pr-6 py-4 rounded-3xl bg-brand-50 border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-4">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-300" />
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-14 pr-6 py-4 rounded-3xl bg-brand-50 border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-bold text-brand-400 hover:text-brand-900 transition-colors uppercase tracking-widest">
                    Forgot Ritual?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full py-8 text-lg shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-brand-500 hover:text-brand-900 transition-colors"
            >
              {isLogin
                ? "New to Skinn? Create an account here"
                : "Already a member? Sign in to your ritual"}
            </button>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-brand-400 font-medium tracking-widest uppercase italic">
          Clean Science. Pure Rituals.
        </p>
      </motion.div>
    </div>
  );
}
