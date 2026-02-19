"use client";

import Image from "next/image";
import { ShieldCheck, Zap, Target, Lock, CreditCard, Ship, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WhyAdvancePage() {
    const steps = [
        {
            icon: Target,
            title: "Choose Innovation",
            desc: "Select your premium tech piece from our curated collection."
        },
        {
            icon: CreditCard,
            title: "10% Advance",
            desc: "Pay a small commitment fee to verify your order and reserve the item."
        },
        {
            icon: Ship,
            title: "Fast Shipping",
            desc: "We dispatch your order within 24 hours via our priority network."
        },
        {
            icon: ShieldCheck,
            title: "Pay on Delivery",
            desc: "Inspect the product and pay the remaining 90% at your doorstep."
        }
    ];

    return (
        <div className="flex flex-col space-y-32 pb-32">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=2000"
                        alt="Secure Payment"
                        fill
                        className="object-cover opacity-10"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest">
                        <Lock size={16} />
                        <span>Built on Mutual Trust</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight uppercase">
                        THE <span className="text-accent underline decoration-4 underline-offset-8">ADVANCE</span> <br />MODEL.
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto italic">
                        Why we do it differently, and why it's better for you.
                    </p>
                </div>
            </section>

            {/* The Core Logic */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">ANTI-FAKE <br />COMMITMENT.</h2>
                            <div className="h-1.5 w-24 bg-accent rounded-full" />
                        </div>

                        <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                            <p>
                                In an era of bot-generated orders and fake cancellations, premium tech deserves a premium commitment. Our <span className="text-foreground font-black">10% Advance Policy</span> is a bridge of trust.
                            </p>
                            <p>
                                By making a small upfront payment, you verify your intent as a serious innovator. This allows us to reserve high-demand stock exclusively for you and absorb the risk of priority shipping.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <p className="text-4xl font-black text-accent tracking-tighter">0%</p>
                                <p className="text-sm font-bold uppercase tracking-widest">Fake Orders</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-black text-accent tracking-tighter">100%</p>
                                <p className="text-sm font-bold uppercase tracking-widest">Stock Reservation</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-2 border-accent/20">
                        <Image
                            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1000"
                            alt="Security Layers"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-accent/20 backdrop-blur-[2px]" />
                        <div className="absolute bottom-12 left-12 right-12 bg-white/10 glass p-8 rounded-3xl border border-white/20">
                            <ShieldCheck size={48} className="text-white mb-4" />
                            <p className="text-white text-2xl font-black italic uppercase">Verified Innovation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works Stepper */}
            <section className="bg-accent/5 py-32 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-4xl font-black tracking-tighter uppercase">THE 4-STEP JOURNEY</h2>
                        <p className="text-muted-foreground">Simple. Addictive. Secure.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative group p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-black/5 dark:border-white/10 hover:border-accent/50 transition-all duration-500 shadow-xl hover:shadow-accent/5">
                                <div className="absolute -top-6 left-8 h-12 w-12 bg-accent text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-accent/20">
                                    {i + 1}
                                </div>
                                <div className="mt-4 space-y-4">
                                    <div className="h-12 w-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                                        <step.icon size={24} />
                                    </div>
                                    <h4 className="text-2xl font-black uppercase tracking-tight">{step.title}</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="container mx-auto px-4 text-center space-y-12">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">STILL HAVE <br />QUESTIONS?</h2>
                    <p className="text-xl text-muted-foreground italic">
                        Our support visionaries are ready 24/7 to clear any doubts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/faq"
                            className="bg-accent text-white px-10 py-5 rounded-2xl font-black flex items-center justify-center space-x-2 shadow-xl shadow-accent/20 hover:scale-105 transition-all"
                        >
                            <span>Explore FAQs</span>
                            <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-white/5 hover:bg-white/10 glass px-10 py-5 rounded-2xl font-black flex items-center justify-center space-x-2 transition-all"
                        >
                            <MessageSquare size={20} />
                            <span>Talk to Us</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
