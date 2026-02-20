"use client";

import { useAdminStore, Order } from "@/lib/admin-store";
import {
    Search,
    Filter,
    Download,
    Eye,
    Clock,
    CreditCard
} from "lucide-react";
import { useState } from "react";

import { motion } from "framer-motion";

export default function AdminOrders() {
    const { orders, updateOrderStatus, isLoading } = useAdminStore();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return (
        <div className="flex h-[400px] items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
    );

    const STATUS_OPTIONS: Order["status"][] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase">Orders</h1>
                    <p className="text-muted-foreground">Monitor and manage customer transactions.</p>
                </div>
                <button className="bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all border border-border">
                    <Download size={20} />
                    <span>Export CSV</span>
                </button>
            </div>

            <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border bg-muted/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center bg-background rounded-2xl border border-border px-4 py-2 w-full max-w-md">
                        <Search size={18} className="text-muted-foreground mr-2" />
                        <input
                            type="text"
                            placeholder="Search orders (ID, Customer, Product)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm w-full py-1"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-xl text-sm font-bold hover:bg-muted/50 transition-colors">
                            <Filter size={16} />
                            <span>Status</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-xl text-sm font-bold hover:bg-muted/50 transition-colors">
                            <Clock size={16} />
                            <span>Last 30 Days</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border bg-muted/10">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Order ID</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Customer</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Product</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredOrders.map((order, index) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-accent/5 transition-colors"
                                >
                                    <td className="px-6 py-4 font-bold text-sm text-accent">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-sm">{order.customer}</p>
                                            <p className="text-[10px] text-muted-foreground">{order.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium">{order.product}</p>
                                        <div className="flex items-center mt-0.5 text-[10px] text-muted-foreground">
                                            <CreditCard size={10} className="mr-1" />
                                            {order.method}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-black text-sm">
                                        ${order.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                                            className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-transparent cursor-pointer outline-none ${order.status === 'Delivered' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
                                                order.status === 'Shipped' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' :
                                                    order.status === 'Pending' ? 'text-orange-500 bg-orange-500/10 border-orange-500/20' :
                                                        order.status === 'Processing' ? 'text-purple-500 bg-purple-500/10 border-purple-500/20' :
                                                            'text-red-500 bg-red-500/10 border-red-500/20'
                                                }`}
                                        >
                                            {STATUS_OPTIONS.map(status => (
                                                <option key={status} value={status} className="bg-background text-foreground">{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-colors">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
