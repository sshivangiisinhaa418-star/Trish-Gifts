"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { syncUserCart, fetchUserCart } from "@/app/actions/store";

export type CartItem = {
  id: string;
  productId?: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  giftingOptions: {
    giftWrap: boolean;
    greetingCard: boolean;
    giftMessage: string;
    deliveryDate: string;
  };
};

type CartContextType = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage & Supabase DB on mount
  useEffect(() => {
    async function initializeCart() {
      let initialCart: CartItem[] = [];
      try {
        const savedCart = localStorage.getItem("trish_cart");
        if (savedCart) {
          initialCart = JSON.parse(savedCart);
        }
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }

      // Check DB cart for logged-in user
      const serverRes = await fetchUserCart();
      if (serverRes?.cartItems && Array.isArray(serverRes.cartItems)) {
        if (serverRes.cartItems.length > 0) {
          initialCart = serverRes.cartItems;
        } else if (initialCart.length > 0) {
          // Sync local items to server if server cart was empty
          await syncUserCart(initialCart);
        }
      }

      setCartItems(initialCart);
      setIsLoaded(true);
    }

    initializeCart();
  }, []);

  // Save to localStorage & Supabase DB whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("trish_cart", JSON.stringify(cartItems));
      syncUserCart(cartItems);
    }
  }, [cartItems, isLoaded]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback((item: Omit<CartItem, "id">) => {
    // Generate a simple unique ID for line items while preserving productId
    const id = Math.random().toString(36).substr(2, 9);
    setCartItems((prev) => [{ ...item, id }, ...prev]);
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    try {
      localStorage.removeItem("trish_cart");
    } catch (e) {
      console.error("Failed to remove cart from local storage", e);
    }
  }, []);

  const cartTotal = cartItems.reduce((total, item) => {
    let itemTotal = item.price * item.quantity;
    if (item.giftingOptions?.giftWrap) itemTotal += 250;
    if (item.giftingOptions?.greetingCard) itemTotal += 150;
    return total + itemTotal;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
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
