
import Link from "next/link";
import { ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-black/5 dark:border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 bg-accent/5 rounded-2xl text-accent">
                            <Truck size={24} />
                        </div>
                        <h3 className="font-semibold">Fast Shipping</h3>
                        <p className="text-xs text-muted-foreground">Delivery in 24-48 hours</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 bg-accent/5 rounded-2xl text-accent">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-semibold">Secure Advance</h3>
                        <p className="text-xs text-muted-foreground">Only 10% to secure order</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 bg-accent/5 rounded-2xl text-accent">
                            <RefreshCw size={24} />
                        </div>
                        <h3 className="font-semibold">7 Days Replace</h3>
                        <p className="text-xs text-muted-foreground">Easy replacement policy</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 bg-accent/5 rounded-2xl text-accent">
                            <Headphones size={24} />
                        </div>
                        <h3 className="font-semibold">24/7 Support</h3>
                        <p className="text-xs text-muted-foreground">Always here for you</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-accent">
                            Electro<span className="text-foreground">Wave</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-sm">
                            The ultimate destination for premium electronics. We redefine trust with our unique advance payment model and lightning-fast delivery.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop" className="hover:text-accent">All Products</Link></li>
                            <li><Link href="/track" className="hover:text-accent">Track Order</Link></li>
                            <li><Link href="/faq" className="hover:text-accent">FAQs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-accent">Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-accent">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-black/5 dark:border-white/5 pt-8 text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} ElectroWave. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
