
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Smartphone, Laptop, Headphones, Watch, LayoutGrid, LucideIcon } from "lucide-react";
import { CATEGORIES } from "@/lib/mock-data";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
    "Smartphones": Smartphone,
    "Laptops": Laptop,
    "Audio": Headphones,
    "Wearables": Watch,
    "Accessories": LayoutGrid,
    "All": LayoutGrid,
};

const CATEGORY_IMAGES: Record<string, string> = {
    "Smartphones": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    "Laptops": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
    "Audio": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    "Wearables": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    "Accessories": "https://images.unsplash.com/photo-1546868871-70c122467d3b?auto=format&fit=crop&q=80&w=800",
    "All": "https://images.unsplash.com/photo-1468495244122-4307b91ee43a?auto=format&fit=crop&q=80&w=800",
};

export default function CategoriesPage() {
    const displayCategories = CATEGORIES.filter(c => c !== "All");

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                    EXPLORE <span className="text-accent underline decoration-4 underline-offset-8">TECH</span> STACK
                </h1>
                <p className="text-xl text-muted-foreground">
                    Curated collections of the world&apos;s most innovative hardware.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayCategories.map((category) => {
                    const Icon = CATEGORY_ICONS[category] || LayoutGrid;
                    return (
                        <Link
                            key={category}
                            href={`/shop?category=${category}`}
                            className="group relative h-80 rounded-[2.5rem] overflow-hidden bg-accent/5 border border-white/10 hover:border-accent/50 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-accent/20"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={CATEGORY_IMAGES[category] || CATEGORY_IMAGES["All"]}
                                    alt={category}
                                    fill
                                    className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                            </div>

                            <div className="relative z-10 h-full p-8 flex flex-col justify-end items-start space-y-4">
                                <div className="bg-accent text-white p-4 rounded-2xl shadow-xl shadow-accent/40 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <Icon size={24} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black tracking-tight uppercase">{category}</h3>
                                    <div className="flex items-center space-x-2 text-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500 delay-100">
                                        <span>See more</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
