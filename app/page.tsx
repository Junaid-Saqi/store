
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Target, ShieldCheck } from "lucide-react";
import { PRODUCTS } from "@/lib/mock-data";
import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  const trendingProducts = PRODUCTS.filter(p => p.isTrending);

  return (
    <div className="flex flex-col space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            fill
            className="object-cover opacity-10 dark:opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-left-4 duration-1000">
              <Zap size={14} />
              <span>Future of Shopping is Here</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              PREMIUM <br />
              <span className="text-accent underline decoration-4 underline-offset-8">TECH</span> FOR <br />
              VISIONARIES.
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              Simple, addictive, and high-trust. Secure your next piece of innovation with just 10% advance. The rest? On delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
              <Link
                href="/shop"
                className="bg-accent text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20"
              >
                <span>Shop Collection</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/why-advance"
                className="bg-white/5 hover:bg-white/10 glass px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all"
              >
                <span>How it works</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section - Horizontal Scroll */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">TRENDING NOW</h2>
            <p className="text-muted-foreground">The most wanted tech this week.</p>
          </div>
          <Link href="/shop" className="text-accent font-bold flex items-center space-x-1 group">
            <span>View All</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-8 hide-scrollbar snap-x">
          {trendingProducts.map((product) => (
            <div key={product.id} className="snap-start">
              <ProductCard product={product} horizontal />
            </div>
          ))}
        </div>
      </section>

      {/* Educational Section */}
      <section className="container mx-auto px-4">
        <div className="bg-accent/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                WHY ADVANCE <br />PAYMENT?
              </h2>
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="mt-1 h-8 w-8 bg-accent text-white rounded-xl flex items-center justify-center shrink-0">
                    <Target size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Anti-Fake Policy</h4>
                    <p className="text-muted-foreground text-sm">A small commitment prevents fake orders and ensures your piece remains reserved exclusively for you.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="mt-1 h-8 w-8 bg-accent text-white rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Trust & Security</h4>
                    <p className="text-muted-foreground text-sm">We only ask for 10-20% upfront. This builds a mutual bridge of trust before the final delivery.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1000"
                alt="Advance Payment explanation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-white text-center">
                  <p className="text-4xl font-black">10%</p>
                  <p className="text-xs font-bold uppercase tracking-widest">Commitment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
