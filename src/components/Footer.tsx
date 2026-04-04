import Link from "next/link";
import { Sparkles, Globe, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <Sparkles size={24} className="text-brand-400" />
              <span className="text-2xl font-display font-bold tracking-tighter">SKINN.</span>
            </div>
            <p className="text-brand-300 text-sm leading-relaxed max-w-xs">
              Premium clean skincare crafted with botanical science. 
              Every formula is designed to bring out your skin's natural radiance.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400 mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-brand-300">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/category/cleanse" className="hover:text-white transition-colors">Cleansers</Link></li>
              <li><Link href="/category/treat" className="hover:text-white transition-colors">Treatments</Link></li>
              <li><Link href="/category/moisturize" className="hover:text-white transition-colors">Moisturizers</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Gift Sets</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-brand-300">
              <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Ingredients</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400 mb-6">Help</h4>
            <ul className="space-y-4 text-sm text-brand-300">
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-brand-400 tracking-widest uppercase">
            © 2024 SKINN. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-brand-400 tracking-widest uppercase">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
