"use client";

import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Plus
} from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import Link from "next/link";

import { motion } from "framer-motion";

export default function AdminDashboard() {
    const { orders, products, totalSales, orderCount, productCount } = useAdminStore();

    const STATS = [
        {
            label: "Total Sales",
            value: `$${totalSales.toLocaleString()}`,
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
            color: "bg-green-500/10 text-green-600 dark:text-green-500",
        },
        {
            label: "Orders",
            value: `+${orderCount}`,
            change: "+18.1%",
            trend: "up",
            icon: ShoppingBag,
            color: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
        },
        {
            label: "Active Customers",
            value: "+12,234",
            change: "+19.2%",
            trend: "up",
            icon: Users,
            color: "bg-purple-500/10 text-purple-600 dark:text-purple-500",
        },
        {
            label: "Total Products",
            value: String(productCount),
            change: "Stable",
            trend: "up",
            icon: Package,
            color: "bg-orange-500/10 text-orange-600 dark:text-orange-500",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <div>
                <h1 className="text-4xl font-black tracking-tight uppercase">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, Admin. Here&apos;s what&apos;s happening with your store today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card border border-border rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-2xl`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                <span>{stat.change}</span>
                            </div>
                        </div>
                        <p className="text-muted-foreground font-medium text-sm">{stat.label}</p>
                        <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-card border border-border rounded-[3rem] p-8 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black uppercase">Sales Analytics</h3>
                        <div className="flex items-center space-x-2">
                            <span className="flex items-center text-xs font-bold text-accent">
                                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                                Revenue
                            </span>
                        </div>
                    </div>

                    <div className="relative h-[300px] w-full">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                            {/* Grid Lines */}
                            {[0, 1, 2, 3].map((i) => (
                                <line
                                    key={i}
                                    x1="0" y1={i * 100} x2="1000" y2={i * 100}
                                    stroke="currentColor" strokeWidth="1" strokeOpacity="0.05"
                                />
                            ))}

                            {/* Area Path */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                d="M 0 300 L 0 250 Q 125 240 250 180 Q 375 120 500 150 Q 625 180 750 100 Q 875 20 1000 50 L 1000 300 Z"
                                fill="url(#gradient)"
                            />

                            {/* Line Path */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                d="M 0 250 Q 125 240 250 180 Q 375 120 500 150 Q 625 180 750 100 Q 875 20 1000 50"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                className="text-accent"
                            />

                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="flex justify-between mt-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border rounded-[3rem] p-8 shadow-sm"
                >
                    <h3 className="text-xl font-black mb-6 uppercase">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <Link href="/admin/products/new" className="p-6 bg-accent/5 hover:bg-accent/10 rounded-[2rem] text-left transition-all border border-accent/10 group">
                            <Plus className="text-accent mb-3 group-hover:scale-110 transition-transform" size={32} />
                            <p className="font-bold">Add Product</p>
                            <p className="text-xs text-muted-foreground mt-1">List a new tech piece</p>
                        </Link>
                        <Link href="/admin/orders" className="p-6 bg-accent/5 hover:bg-accent/10 rounded-[2rem] text-left transition-all border border-accent/10 group">
                            <ShoppingBag className="text-accent mb-3 group-hover:scale-110 transition-transform" size={32} />
                            <p className="font-bold">View Orders</p>
                            <p className="text-xs text-muted-foreground mt-1">Check pending deliveries</p>
                        </Link>
                        <Link href="/admin/customers" className="p-6 bg-accent/5 hover:bg-accent/10 rounded-[2rem] text-left transition-all border border-accent/10 group">
                            <Users className="text-accent mb-3 group-hover:scale-110 transition-transform" size={32} />
                            <p className="font-bold">Customers</p>
                            <p className="text-xs text-muted-foreground mt-1">Manage user database</p>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card border border-border rounded-[3rem] p-8 shadow-sm"
            >
                <h3 className="text-xl font-black mb-6 uppercase">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {orders.slice(0, 5).map((order, index) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + (index * 0.05) }}
                                    className="group"
                                >
                                    <td className="py-4 font-black text-sm text-accent">{order.id}</td>
                                    <td className="py-4">
                                        <p className="font-bold text-sm">{order.customer}</p>
                                        <p className="text-[10px] text-muted-foreground">{order.email}</p>
                                    </td>
                                    <td className="py-4 text-sm font-medium">{order.product}</td>
                                    <td className="py-4 font-black text-sm">${order.amount.toFixed(2)}</td>
                                    <td className="py-4 text-right">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${order.status === 'Delivered' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
                                                order.status === 'Shipped' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' :
                                                    order.status === 'Pending' ? 'text-orange-500 bg-orange-500/10 border-orange-500/20' :
                                                        'text-red-500 bg-red-500/10 border-red-500/20'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}
