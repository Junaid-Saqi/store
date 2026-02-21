"use client";

import { useState, useEffect, useCallback } from "react";

export interface Product {
  id: number;
  name: string;
  purchasePrice: number | null;
  retailPrice: number | null;
  category?: {
    name: string;
  };
}

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

export interface Admin {
  id: string;
  email: string;
  name: string;
}

export function useAdminStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedAdmin = localStorage.getItem("volt_admin");
    return !!savedAdmin;
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchOrders()]).finally(() => {
      setIsLoading(false);
    });
  }, [fetchProducts, fetchOrders]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return false;
      }

      setIsAuthenticated(true);
      setAdmin(data.admin);
      localStorage.setItem("volt_admin", JSON.stringify(data.admin));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    localStorage.removeItem("volt_admin");
  };

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const newProduct = await res.json();
      setProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    } catch (error) {
      console.error("Failed to add product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      throw error;
    }
  };

  const updateProduct = async (id: number, updates: Partial<Product>) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      );
      return updated;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  };

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const updated = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: updated.status } : o))
      );
      return updated;
    } catch (error) {
      console.error("Failed to update order:", error);
      throw error;
    }
  };

  return {
    products,
    orders,
    admin,
    isAuthenticated,
    isLoading,
    login,
    logout,
    addProduct,
    deleteProduct,
    updateProduct,
    updateOrderStatus,
    totalSales: orders.reduce(
      (acc, o) => (o.status !== "Cancelled" ? acc + o.amount : acc),
      0
    ),
    orderCount: orders.length,
    productCount: products.length,
  };
}
