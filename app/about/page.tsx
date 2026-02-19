
import Image from "next/image";
import { ShieldCheck, Target, Zap, Clock, ThumbsUp, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col space-y-32 pb-32">
            {/* Brand Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000"
                        alt="About VOLT"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        WE ARE <br /><span className="text-accent underline decoration-4 underline-offset-8">ELECTROWAVE</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto italic animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                        Redefining trust in the digital age. Bringing the world's finest innovation to your doorstep with total security.
                    </p>
                </div>
            </section>

            {/* Vision Grid */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="bg-accent/5 p-12 rounded-[3rem] border border-white/5 space-y-6 hover:bg-accent/10 transition-colors">
                        <div className="h-16 w-16 bg-accent text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-accent/20">
                            <Target size={32} />
                        </div>
                        <h3 className="text-3xl font-black tracking-tight">OUR MISSION</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            To eliminate the fear of online shopping in emerging markets by providing a hybrid trust model that combines digital convenience with real-world verification.
                        </p>
                    </div>

                    <div className="bg-accent/5 p-12 rounded-[3rem] border border-white/5 space-y-6 hover:bg-accent/10 transition-colors">
                        <div className="h-16 w-16 bg-accent text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-accent/20">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-3xl font-black tracking-tight">OUR SPEED</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We understand that waiting is the hardest part. Our logistics network is optimized for 24-48 hour deliveries, ensuring your innovation reaches you lightning fast.
                        </p>
                    </div>

                    <div className="bg-accent/5 p-12 rounded-[3rem] border border-white/5 space-y-6 hover:bg-accent/10 transition-colors">
                        <div className="h-16 w-16 bg-accent text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-accent/20">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-3xl font-black tracking-tight">OUR TRUST</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Our unique 10% advance payment model is designed to protect both the customer and the delivery network, creating a ecosystem of mutual accountability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Trust Stats Section */}
            <section className="bg-accent text-white py-24">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    <div className="space-y-2">
                        <p className="text-6xl font-black tracking-tighter">50K+</p>
                        <p className="text-accent-foreground/80 font-bold uppercase tracking-widest text-sm">Innovators Served</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-6xl font-black tracking-tighter">98%</p>
                        <p className="text-accent-foreground/80 font-bold uppercase tracking-widest text-sm">Trust Rating</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-6xl font-black tracking-tighter">24H</p>
                        <p className="text-accent-foreground/80 font-bold uppercase tracking-widest text-sm">Avg Delivery Time</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-6xl font-black tracking-tighter">0.1%</p>
                        <p className="text-accent-foreground/80 font-bold uppercase tracking-widest text-sm">Return Rate</p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                            alt="VOLT Team"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-accent/20 backdrop-blur-[2px]" />
                    </div>

                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black tracking-tighter uppercase">CORE VALUES</h2>
                            <p className="text-xl text-muted-foreground">The principles that guide every package we ship.</p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: Globe, title: "Global Innovation", desc: "Sourcing the latest tech from global centers of excellence." },
                                { icon: Clock, title: "Time Respect", desc: "Valuing your time with precision logistics and prompt responses." },
                                { icon: ThumbsUp, title: "Quality First", desc: "Every product is authenticated and inspected before dispatch." }
                            ].map((value, i) => (
                                <div key={i} className="flex space-x-6">
                                    <div className="shrink-0 h-14 w-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center">
                                        <value.icon size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-bold">{value.title}</h4>
                                        <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
