"use client";

import { useState } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { useRouter } from "next/navigation";
import { Zap, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
    const { login } = useAdminStore();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Artificial delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = login(email, password);
        if (success) {
            router.push("/admin");
        } else {
            setError("Invalid credentials. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-accent rounded-2xl mb-4 shadow-xl shadow-accent/20">
                        <Zap className="text-white fill-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        VOLT <span className="text-accent underline decoration-4 underline-offset-4">ADMIN</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 font-medium">Please sign in to access the control center.</p>
                </div>

                <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                    {/* Glassmorphism Effect */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm -z-10"></div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="admin@volt.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-destructive text-sm font-bold text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-accent/25 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Sign In Now</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border/50 text-center">
                        <p className="text-xs text-muted-foreground">
                            Use <span className="font-bold text-foreground">admin@volt.com</span> / <span className="font-bold text-foreground">admin123</span> for access testing.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push("/")}
                        className="text-sm font-bold text-muted-foreground hover:text-accent transition-colors"
                    >
                        &larr; Return to Storefront
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
