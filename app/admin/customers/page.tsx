
"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Mail,
    Phone,
    ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

interface Customer {
    email: string;
    customer: string;
    phone?: string;
    orderCount: number;
    totalSpent: number;
    status: string;
}

export default function AdminCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("/api/orders")
            .then(res => res.json())
            .then(data => {
                const customerMap = new Map<string, Customer>();
                
                data.forEach((order: any) => {
                    if (customerMap.has(order.email)) {
                        const cust = customerMap.get(order.email)!;
                        cust.orderCount += 1;
                        cust.totalSpent += order.amount;
                    } else {
                        customerMap.set(order.email, {
                            email: order.email,
                            customer: order.customer,
                            orderCount: 1,
                            totalSpent: order.amount,
                            status: order.status === 'Delivered' ? 'Active' : 'New'
                        });
                    }
                });

                setCustomers(Array.from(customerMap.values()));
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch customers:", err);
                setLoading(false);
            });
    }, []);

    const filteredCustomers = customers.filter(cust =>
        cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="flex h-[400px] items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase">Customers</h1>
                    <p className="text-muted-foreground">Manage your customer database and relationship.</p>
                </div>
                <button className="bg-accent text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-accent/20">
                    <Mail size={20} />
                    <span>Broadcast Message</span>
                </button>
            </div>

            <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-6 bg-muted/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center bg-background rounded-2xl px-4 py-2 w-full max-w-md">
                        <Search size={18} className="text-muted-foreground mr-2" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none text-sm w-full py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-background rounded-xl text-sm font-bold hover:bg-muted/50 transition-colors">
                            <Filter size={16} />
                            <span>Segment</span>
                        </button>
                    </div>
                </div>

                {filteredCustomers.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-muted-foreground">No customers found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/10">
                                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Customer</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Contact</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-center">Orders</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Total Spent</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((cust, index) => (
                                    <motion.tr
                                        key={cust.email}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-accent/5 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black text-xs">
                                                    {cust.customer.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{cust.customer}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Mail size={10} className="mr-1.5" />
                                                    {cust.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-sm">
                                            {cust.orderCount}
                                        </td>
                                        <td className="px-6 py-4 font-black text-sm">
                                            Rs. {cust.totalSpent.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${cust.status === 'Active' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
                                                'text-blue-500 bg-blue-500/10 border-blue-500/20'
                                            }`}>
                                                {cust.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-colors">
                                                <ArrowUpRight size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
