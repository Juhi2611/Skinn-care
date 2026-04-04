import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-brand-500" />,
                title: "Dermatologist Tested",
                description: "Clinically proven formulas safe for all skin types, including sensitive skin."
              },
              {
                icon: <Zap className="w-8 h-8 text-brand-500" />,
                title: "High Performance",
                description: "Visible results in as little as 14 days with our active botanical extracts."
              },
              {
                icon: <Star className="w-8 h-8 text-brand-500" />,
                title: "Clean Beauty",
                description: "100% vegan, cruelty-free, and free from parabens, sulfates, and phthalates."
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl bg-brand-50 hover:bg-brand-100 transition-colors">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-brand-900">{feature.title}</h3>
                <p className="text-brand-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section className="py-24 bg-brand-200/20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-900 mb-6 italic tracking-tight">"The science of skin meeting the luxury of self-care."</h2>
            <p className="text-xl text-brand-600 mb-10">We believe that skincare should be a ritual, not a chore. Every formula is meticulously crafted to deliver results while providing a sensory experience that calms the mind.</p>
            <Button size="lg" variant="outline">Our Story</Button>
        </div>
      </section>

      <Testimonials />

      {/* Newsletter */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Join the SKINN. Ritual</h2>
            <p className="text-brand-200">Subscribe to receive skincare tips, early access to new launches, and curated rituals. Get 15% off your first order.</p>
          </div>
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 rounded-full bg-brand-800 border border-brand-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Button size="lg" className="bg-brand-500 hover:bg-brand-400">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}


