"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";

interface Product {
    id: number;
    name: string;
    purchasePrice: number | null;
    retailPrice: number | null;
    category?: {
        name: string;
    };
}

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        const savedCart = localStorage.getItem("volt-cart");
        if (savedCart) {
            try {
                return JSON.parse(savedCart);
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        return [];
    });
    const { showToast } = useToast();

    useEffect(() => {
        localStorage.setItem("volt-cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        const price = product.retailPrice || product.purchasePrice || 0;
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showToast(`${product.name} added to your cart!`, "success");
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => {
        const price = item.retailPrice || item.purchasePrice || 0;
        return total + price * item.quantity;
    }, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
