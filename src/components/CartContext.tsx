'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { products } from '../data/products';

export interface CartItem {
    id: string; // unique by productId + weight
    productId: string;
    name: string;
    weight: number;
    pricePerKg: number;
    qty: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (category: 'beef' | 'mutton' | 'chicken', productId: string, weight: number, qty: number) => void;
    removeFromCart: (cartItemId: string) => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    wishlist: Record<string, boolean>;
    toggleWishlist: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

    const addToCart = (category: 'beef' | 'mutton' | 'chicken', productId: string, weight: number, qty: number) => {
        const categoryProducts = products[category];
        const product = categoryProducts.find((p) => p.id === productId);
        if (!product) return;

        const cartItemId = `${productId}-${weight}`;

        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
            if (existingIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingIndex] = { ...newCart[existingIndex], qty: newCart[existingIndex].qty + qty };
                return newCart;
            } else {
                return [
                    ...prevCart,
                    {
                        id: cartItemId,
                        productId: product.id,
                        name: product.name,
                        weight: weight,
                        pricePerKg: product.price,
                        qty: qty,
                        image: product.image,
                    },
                ];
            }
        });

        setIsCartOpen(true);
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    };

    const removeFromCart = (cartItemId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    };

    const openCart = () => {
        setIsCartOpen(true);
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    };

    const closeCart = () => {
        setIsCartOpen(false);
        if (typeof window !== 'undefined') {
            document.body.style.overflow = '';
        }
    };

    const toggleWishlist = (productId: string) => {
        setWishlist((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            isCartOpen,
            openCart,
            closeCart,
            searchQuery,
            setSearchQuery,
            wishlist,
            toggleWishlist
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
