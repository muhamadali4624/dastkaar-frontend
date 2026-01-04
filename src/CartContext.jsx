import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

const addToCart = (product, availableStock) => {
    setCart((prevCart) => {
        const existingItem = prevCart.find(item => item.product_id === product.product_id);
        
        if (existingItem) {
            // Check if adding one more exceeds stock
            if (existingItem.quantity >= availableStock) {
                alert(`Only ${availableStock} units available in stock!`);
                return prevCart;
            }
            return prevCart.map(item =>
                item.product_id === product.product_id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );
        }
        return [...prevCart, { ...product, quantity: 1 }];
    });
};


const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.product_id === productId);
            if (existingItem.quantity === 1) {
                return prevCart.filter(item => item.product_id !== productId);
            }
            return prevCart.map(item =>
                item.product_id === productId 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
            );
        });
    };



   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // Add subtotal calculation here
    const subtotal = cart.reduce((total, item) => total + (item.total_price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);