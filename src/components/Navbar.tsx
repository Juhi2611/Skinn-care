"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop All", href: "/products" },
    { name: "Cleanse", href: "/category/cleanse" },
    { name: "Treat", href: "/category/treat" },
    { name: "Moisturize", href: "/category/moisturize" },
  ];

  const { data: session } = useSession();

  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled
          ? "py-4 glass-effect border-b border-brand-200/50"
          : "py-8 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="text-brand-600"
          >
            <Sparkles size={24} />
          </motion.div>
          <span className="text-2xl font-display font-bold tracking-tighter text-brand-900">
            SKINN.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "nav-link text-sm font-medium tracking-wide transition-colors",
                pathname === link.href ? "text-brand-900" : "text-brand-500 hover:text-brand-900"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-brand-500 hover:text-brand-900 transition-colors">
            <Search size={20} />
          </button>
          <Link href="/ritual-cart" className="relative p-2 text-brand-500 hover:text-brand-900 transition-colors">
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-brand-500 text-[10px] font-bold text-white flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          {session ? (
            <div className="flex items-center space-x-2">
              <Link href="/account" className="hidden md:block p-2 text-brand-500 hover:text-brand-900 transition-colors">
                <User size={20} />
              </Link>
              <button 
                onClick={() => signOut()}
                className="hidden md:block p-2 text-brand-500 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:block p-2 text-brand-500 hover:text-brand-900 transition-colors">
               <User size={20} />
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-brand-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect mt-4 rounded-3xl border border-brand-200/50 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-brand-900"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-brand-200/50 my-2" />
              {session ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-brand-900 flex items-center"
                  >
                    <User size={20} className="mr-2" />
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-lg font-medium text-red-500 flex items-center text-left"
                  >
                    <LogOut size={20} className="mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-brand-900 flex items-center"
                >
                  <User size={20} className="mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
