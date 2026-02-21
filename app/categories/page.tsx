
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LucideIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";

const CATEGORY_ICONS: Record<string, string> = {
    "audio": "🎧",
    "speakers": "🔈",
    "power": "🔋",
    "mobile_accessories": "📱",
    "tripods_lighting": "📸",
    "bike_outdoor": "🚴",
    "networking": "🌐",
    "decor": "💡",
    "wearables": "⌚",
};

const CATEGORY_IMAGES: Record<string, string> = {
    "audio": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    "speakers": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
    "power": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=800",
    "mobile_accessories": "https://images.unsplash.com/photo-1586942593568-29361efcd571?auto=format&fit=crop&q=80&w=800",
    "tripods_lighting": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    "bike_outdoor": "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800",
    "networking": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    "decor": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800",
    "wearables": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800",
};

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        include: {
            products: true,
        },
        orderBy: { id: "asc" },
    });

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                    EXPLORE <span className="text-accent underline decoration-4 underline-offset-8">CATEGORIES</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                    Browse our collection of premium tech accessories.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => {
                    const icon = CATEGORY_ICONS[category.id] || "📦";
                    const image = CATEGORY_IMAGES[category.id] || CATEGORY_IMAGES["audio"];
                    return (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.id}`}
                            className="group relative h-80 rounded-[2.5rem] overflow-hidden bg-accent/5 border border-white/10 hover:border-accent/50 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-accent/20"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={image}
                                    alt={category.name}
                                    fill
                                    className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                            </div>

                            <div className="relative z-10 h-full p-8 flex flex-col justify-end items-start space-y-4">
                                <div className="bg-accent text-white p-4 rounded-2xl shadow-xl shadow-accent/40 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-3xl">
                                    {icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black tracking-tight uppercase">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground">{category.products.length} products</p>
                                    <div className="flex items-center space-x-2 text-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500 delay-100">
                                        <span>Shop Now</span>
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
