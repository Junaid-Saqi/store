"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
    {
        category: "Ordering",
        questions: [
            {
                q: "Why do I need to pay a 10% advance?",
                a: "Our advance payment model is an anti-fake policy. It ensures that the high-demand tech you order is reserved specifically for you and covers priority shipping costs. You pay the remaining 90% only after inspecting the product at your door."
            },
            {
                q: "Can I cancel my order after paying the advance?",
                a: "Yes, you can cancel within 12 hours of placing the order for a full refund. After that, once the item is dispatched, the advance becomes non-refundable to cover logistics and shipping costs."
            },
            {
                q: "What products are eligible for the advance payment model?",
                a: "Currently, all premium electronics in our 'Trending' and 'Innovation' categories follow this model. Standard accessories may be eligible for full cash on delivery."
            }
        ]
    },
    {
        category: "Delivery",
        questions: [
            {
                q: "How long does delivery take?",
                a: "We pride ourselves on speed. Most orders are delivered within 24-48 hours in major cities. Remote areas may take up to 4 days."
            },
            {
                q: "Do you ship internationally?",
                a: "Currently, VOLT operates exclusively within our primary markets to ensure the integrity of our 'Pay on Delivery' network. Stay tuned for global expansion soon."
            }
        ]
    },
    {
        category: "Returns & Trust",
        questions: [
            {
                q: "What if the product is damaged on arrival?",
                a: "You inspect the product before paying the final 90%. If it's damaged or not as described, simply refuse the delivery and our team will handle the refund or replacement immediately."
            },
            {
                q: "Is there a warranty on my tech?",
                a: "Absolutely. All our products come with a minimum 1-year brand warranty, plus an exclusive 7-day no-questions-asked replacement policy from VOLT."
            }
        ]
    }
];

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState(FAQS[0].category);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <HelpCircle size={14} />
                        <span>Support Visionaries Center</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        EVERYTHING YOU <br /><span className="text-accent underline decoration-4 underline-offset-8">NEED</span> TO KNOW.
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Categories Sidebar */}
                    <aside className="w-full md:w-64 shrink-0 space-y-4">
                        {FAQS.map((cat) => (
                            <button
                                key={cat.category}
                                onClick={() => {
                                    setActiveCategory(cat.category);
                                    setOpenIndex(null);
                                }}
                                className={`w-full text-left px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all ${activeCategory === cat.category
                                    ? 'bg-accent text-white shadow-xl shadow-accent/20 translate-x-2'
                                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground'
                                    }`}
                            >
                                {cat.category}
                            </button>
                        ))}
                    </aside>

                    {/* FAQ Accordion */}
                    <div className="flex-grow space-y-4">
                        {FAQS.find(c => c.category === activeCategory)?.questions.map((faq, i) => (
                            <div
                                key={i}
                                className={`rounded-3xl border transition-all duration-500 overflow-hidden ${openIndex === i
                                    ? 'bg-white dark:bg-zinc-900 border-accent shadow-2xl'
                                    : 'bg-black/5 dark:bg-white/5 border-transparent hover:border-black/10 dark:hover:border-white/10'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-8 text-left"
                                >
                                    <span className={`text-xl font-black uppercase tracking-tight ${openIndex === i ? 'text-accent' : ''}`}>
                                        {faq.q}
                                    </span>
                                    <div className={`shrink-0 ml-4 p-2 rounded-xl transition-all ${openIndex === i ? 'bg-accent text-white rotate-180' : 'bg-black/10 dark:bg-white/10 text-muted-foreground'}`}>
                                        {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-8 pb-8 text-lg text-muted-foreground leading-relaxed border-t border-black/5 dark:border-white/5 pt-6 mx-8">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Still Block */}
                <div className="bg-black dark:bg-zinc-900 text-white p-12 md:p-20 rounded-[4rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-accent/5 pointer-events-none" />
                    <h2 className="text-4xl font-black tracking-tighter uppercase relative z-10">LOST IN <span className="text-accent underline decoration-4 underline-offset-8">TECH</span>?</h2>
                    <p className="text-xl text-white/60 italic max-w-xl mx-auto relative z-10">Our actual human experts are waiting to guide you through your innovation journey.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="bg-accent text-white px-10 py-5 rounded-2xl font-black flex items-center justify-center space-x-2 shadow-xl shadow-accent/40 active:scale-95 transition-all"
                        >
                            <span>Talk to Human</span>
                            <MessageCircle size={20} />
                        </Link>
                        <Link
                            href="/track"
                            className="bg-white/10 hover:bg-white/20 glass px-10 py-5 rounded-2xl font-black flex items-center justify-center space-x-2 transition-all"
                        >
                            <span>Track Existing</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
