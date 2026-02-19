"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Globe, Instagram, Twitter, Linkedin } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        // Simulate API call
        setTimeout(() => {
            setIsSending(false);
            setSent(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                {/* Left Side: Info */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                            TALK TO <br /><span className="text-accent underline decoration-4 underline-offset-8">HUMANS</span>.
                        </h1>
                        <p className="text-xl text-muted-foreground italic max-w-md">
                            No bots. Just visionaries ready to help you navigate the future of tech.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[2rem] space-y-4 border border-transparent hover:border-accent/20 transition-all">
                            <div className="h-12 w-12 bg-accent text-white rounded-2xl flex items-center justify-center shadow-xl shadow-accent/20">
                                <Mail size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Us</p>
                                <p className="font-bold text-lg">hello@volt.tech</p>
                            </div>
                        </div>

                        <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[2rem] space-y-4 border border-transparent hover:border-accent/20 transition-all">
                            <div className="h-12 w-12 bg-accent text-white rounded-2xl flex items-center justify-center shadow-xl shadow-accent/20">
                                <Phone size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Call Us</p>
                                <p className="font-bold text-lg">+92 312 3456789</p>
                            </div>
                        </div>

                        <div className="p-8 bg-black/5 dark:bg-white/5 rounded-[2rem] space-y-4 border border-transparent hover:border-accent/20 transition-all md:col-span-2">
                            <div className="h-12 w-12 bg-accent text-white rounded-2xl flex items-center justify-center shadow-xl shadow-accent/20">
                                <MapPin size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Innovation Hub</p>
                                <p className="font-bold text-lg">Suite 404, Tech Plaza, Karachi, Pakistan</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        {[Instagram, Twitter, Linkedin, Globe].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="h-14 w-14 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                            >
                                <Icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-accent rounded-[3rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                    <form
                        onSubmit={handleSubmit}
                        className="relative p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-[3rem] border border-black/5 dark:border-white/10 shadow-premium space-y-8"
                    >
                        <div className="flex items-center space-x-2 text-accent">
                            <MessageSquare size={20} />
                            <span className="font-black uppercase tracking-widest text-sm">Send a Message</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-6 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-accent focus:bg-transparent rounded-2xl focus:outline-none font-bold transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Your Email</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-6 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-accent focus:bg-transparent rounded-2xl focus:outline-none font-bold transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Subject</label>
                            <input
                                required
                                type="text"
                                placeholder="Product Inquiry"
                                className="w-full px-6 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-accent focus:bg-transparent rounded-2xl focus:outline-none font-bold transition-all"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Message</label>
                            <textarea
                                required
                                rows={5}
                                placeholder="Write your vision..."
                                className="w-full px-6 py-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-accent focus:bg-transparent rounded-2xl focus:outline-none font-bold transition-all resize-none"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            disabled={isSending || sent}
                            type="submit"
                            className={`w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center space-x-3 transition-all shadow-xl ${sent
                                ? 'bg-green-500 text-white shadow-green-500/20'
                                : 'bg-accent text-white shadow-accent/20 hover:scale-[1.02] active:scale-[0.98]'
                                }`}
                        >
                            {isSending ? (
                                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : sent ? (
                                <span>MESSAGE SENT!</span>
                            ) : (
                                <>
                                    <span>SEND MISSION</span>
                                    <Send size={24} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
