"use client";

import { useState } from "react";
import { PRODUCTS, Product } from "./mock-data";

export interface Order {
    id: string;
    customer: string;
    email: string;
    product: string;
    date: string;
    amount: number;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    method: string;
}

const INITIAL_ORDERS: Order[] = [
    { id: "ORD-1234", customer: "John Doe", email: "john@example.com", product: "iPhone 15 Pro", date: "2024-03-10", amount: 999.00, status: "Pending", method: "10% Advance" },
    { id: "ORD-1235", customer: "Alice Smith", email: "alice@example.com", product: "MacBook Air M2", date: "2024-03-09", amount: 1199.00, status: "Shipped", method: "Full Payment" },
    { id: "ORD-1236", customer: "Bob Wilson", email: "bob@example.com", product: "Sony WH-1000XM5", date: "2024-03-09", amount: 399.00, status: "Delivered", method: "10% Advance" },
    { id: "ORD-1237", customer: "Emma Davis", email: "emma@example.com", product: "Apple Watch S9", date: "2024-03-08", amount: 399.00, status: "Cancelled", method: "Full Payment" },
    { id: "ORD-1238", customer: "Chris Brown", email: "chris@example.com", product: "S24 Ultra", date: "2024-03-08", amount: 1299.00, status: "Processing", method: "20% Advance" },
];

export function useAdminStore() {
    const [products, setProducts] = useState<Product[]>(() => {
        if (typeof window === "undefined") return PRODUCTS;
        const savedProducts = localStorage.getItem("volt_products");
        if (savedProducts) {
            try {
                return JSON.parse(savedProducts);
            } catch {
                return PRODUCTS;
            }
        }
        localStorage.setItem("volt_products", JSON.stringify(PRODUCTS));
        return PRODUCTS;
    });
    const [orders, setOrders] = useState<Order[]>(() => {
        if (typeof window === "undefined") return INITIAL_ORDERS;
        const savedOrders = localStorage.getItem("volt_orders");
        if (savedOrders) {
            try {
                return JSON.parse(savedOrders);
            } catch {
                return INITIAL_ORDERS;
            }
        }
        localStorage.setItem("volt_orders", JSON.stringify(INITIAL_ORDERS));
        return INITIAL_ORDERS;
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("volt_admin_auth") === "true";
    });
    const [isLoading] = useState(false);

    const login = (email: string, pass: string) => {
        if (email === "admin@volt.com" && pass === "admin123") {
            setIsAuthenticated(true);
            localStorage.setItem("volt_admin_auth", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("volt_admin_auth");
    };

    const addProduct = (product: Omit<Product, "id">) => {
        const newProduct = {
            ...product,
            id: Math.random().toString(36).substr(2, 9),
            rating: 0,
            reviews: 0
        };
        const updated = [newProduct, ...products];
        setProducts(updated);
        localStorage.setItem("volt_products", JSON.stringify(updated));
    };

    const deleteProduct = (id: string) => {
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
        localStorage.setItem("volt_products", JSON.stringify(updated));
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
        setProducts(updated);
        localStorage.setItem("volt_products", JSON.stringify(updated));
    };

    const updateOrderStatus = (id: string, status: Order["status"]) => {
        const updated = orders.map(o => o.id === id ? { ...o, status } : o);
        setOrders(updated);
        localStorage.setItem("volt_orders", JSON.stringify(updated));
    };

    return {
        products,
        orders,
        isAuthenticated,
        isLoading,
        login,
        logout,
        addProduct,
        deleteProduct,
        updateProduct,
        updateOrderStatus,
        totalSales: orders.reduce((acc, o) => o.status !== "Cancelled" ? acc + o.amount : acc, 0),
        orderCount: orders.length,
        productCount: products.length
    };
}
