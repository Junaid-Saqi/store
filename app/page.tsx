
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Target, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";

export default async function Home() {
  const trendingProducts = await prisma.product.findMany({
    where: { isTrending: true },
    take: 6,
  });

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
                className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <span>How it Works</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              <Zap size={14} />
              <span>Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Innovation <span className="text-accent underline decoration-4 underline-offset-8">Redefined</span></h2>
          </div>
          <Link
            href="/shop?trending=true"
            className="hidden md:flex items-center space-x-2 text-accent font-bold hover:underline"
          >
            <span>View All</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-accent/5 p-8 rounded-[3rem] border border-white/5 space-y-6 hover:bg-accent/10 transition-colors">
            <div className="h-16 w-16 bg-accent text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-accent/20">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Curated Selection</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every product is hand-picked for quality, innovation, and value. No clutter, just the best.
            </p>
          </div>
          <div className="bg-accent/5 p-8 rounded-[3rem] border border-white/5 space-y-6 hover:bg-accent/10 transition-colors">
            <div className="h-16 w-16 bg-accent text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-accent/20">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Trust Model</h3>
            <p className="text-muted-foreground leading-relaxed">
              Pay just 10% now, the rest on delivery. If you don&apos;t love it, simply refuse to pay.
            </p>
          </div>
          <div className="bg-accent/5 p-8 rounded-[3rem] border border-white/5 space-y-6 hover:bg-accent/10 transition-colors">
            <div className="h-16 w-16 bg-accent text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-accent/20">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">Fast Delivery</h3>
            <p className="text-muted-foreground leading-relaxed">
              Same-day dispatch on all orders. Express delivery within 24-48 hours to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-accent rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Ready to <br />Upgrade?</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Join thousands of visionaries who trust Volt for their premium tech needs.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 bg-white text-accent px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              <span>Start Shopping</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
