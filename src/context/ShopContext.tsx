import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage, defaultShopSettings } from '../lib/storage';
import { CartItem, Category, Product, ServiceItem, ShopSettings, StoredOrder, OrderStatus } from '../types';

interface ShopContextType {
  products: Product[];
  categories: Category[];
  services: ServiceItem[];
  settings: ShopSettings;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  addToCart: (product: Product, variantId?: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, variantId: string | undefined, qty: number) => void;
  clearCart: () => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => boolean;
  addProduct: (product: Product) => void;
  updateSettings: (newSettings: ShopSettings) => void;
  reloadProducts: () => void;
  resetAllData: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // Order history
  orderHistory: StoredOrder[];
  addOrderToHistory: (order: StoredOrder) => void;
  updateOrderStatusInHistory: (orderId: string, status: OrderStatus, note?: string) => void;
  deleteOrderFromHistory: (orderId: string) => void;
  clearOrderHistory: () => void;
  reorderPastOrder: (order: StoredOrder) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => Storage.getProducts());
  const [categories, setCategories] = useState<Category[]>(() => Storage.getCategories());
  const [services, setServices] = useState<ServiceItem[]>(() => Storage.getServices());
  const [settings, setSettings] = useState<ShopSettings>(() => Storage.getSettings());
  const [searchQuery, setSearchQuery] = useState('');

  // Cart persistence in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('modern_aquarium_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Recently viewed products persistence
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('modern_aquarium_recent_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Order history persistence
  const [orderHistory, setOrderHistory] = useState<StoredOrder[]>(() => {
    return Storage.getOrderHistory();
  });

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('modern_aquarium_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to storage:', e);
    }
  }, [cart]);

  // Save recently viewed
  useEffect(() => {
    try {
      localStorage.setItem('modern_aquarium_recent_v1', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error('Error saving recently viewed:', e);
    }
  }, [recentlyViewed]);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  const addToCart = (product: Product, variantId?: string, quantity = 1) => {
    if (quantity <= 0) return;
    const selectedVariant = product.variants.find((v) => v.id === variantId);
    const unitPrice = selectedVariant ? selectedVariant.price : product.price;

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.variantId === variantId
      );

      if (existingIdx >= 0) {
        const next = [...prev];
        const newQty = next[existingIdx].quantity + quantity;
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: newQty,
          unitPrice, // Validate against current authoritative price
          lineTotal: newQty * unitPrice
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            variantId,
            variantName: selectedVariant?.name,
            quantity,
            unitPrice,
            lineTotal: quantity * unitPrice
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variantId === variantId))
    );
  };

  const updateCartQuantity = (productId: string, variantId: string | undefined, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.variantId === variantId) {
          return {
            ...item,
            quantity: qty,
            lineTotal: qty * item.unitPrice
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateProduct = (updated: Product) => {
    Storage.upsertProduct(updated);
    setProducts(Storage.getProducts());
  };

  const addProduct = (newProd: Product) => {
    Storage.upsertProduct(newProd);
    setProducts(Storage.getProducts());
  };

  const deleteProduct = (id: string): boolean => {
    const success = Storage.deleteProduct(id);
    if (success) {
      setProducts(Storage.getProducts());
      // Also clean up from cart if present
      setCart((prev) => prev.filter((item) => item.product.id !== id));
    }
    return success;
  };

  const updateSettings = (newSettings: ShopSettings) => {
    Storage.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const reloadProducts = () => {
    setProducts(Storage.getProducts());
    setCategories(Storage.getCategories());
    setServices(Storage.getServices());
  };

  const resetAllData = () => {
    Storage.resetToDefaultData();
    setProducts(Storage.getProducts());
    setCategories(Storage.getCategories());
    setServices(Storage.getServices());
    setSettings(defaultShopSettings);
    setCart([]);
    setRecentlyViewed([]);
    setOrderHistory(Storage.getOrderHistory());
  };

  const addOrderToHistory = (order: StoredOrder) => {
    Storage.saveOrder(order);
    setOrderHistory(Storage.getOrderHistory());
  };

  const updateOrderStatusInHistory = (orderId: string, status: OrderStatus, note?: string) => {
    Storage.updateOrderStatus(orderId, status, note);
    setOrderHistory(Storage.getOrderHistory());
  };

  const deleteOrderFromHistory = (orderId: string) => {
    Storage.deleteOrder(orderId);
    setOrderHistory(Storage.getOrderHistory());
  };

  const clearOrderHistory = () => {
    Storage.clearOrderHistory();
    setOrderHistory([]);
  };

  const reorderPastOrder = (order: StoredOrder) => {
    // Add all items in the past order to active cart
    order.items.forEach((item) => {
      const liveProduct = Storage.getProductById(item.productId) || {
        id: item.productId,
        name: item.name,
        slug: item.productId,
        sku: 'MA-REORDER',
        categoryId: 'general',
        shortDescription: item.name,
        fullDescription: item.name,
        images: [item.image],
        price: item.unitPrice,
        currency: 'INR',
        stockQuantity: 10,
        availabilityStatus: 'in_stock' as const,
        productType: item.isPickupOnly ? ('live-bird' as const) : ('equipment' as const),
        variants: [],
        tags: [],
        specifications: {},
        deliveryPolicy: item.isPickupOnly ? ('store_pickup_only' as const) : ('standard_delivery' as const),
        featured: false,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addToCart(liveProduct, item.variantId, item.quantity);
    });
    setIsCartOpen(true);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.lineTotal, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        services,
        settings,
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        recentlyViewed,
        addRecentlyViewed,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        updateProduct,
        deleteProduct,
        addProduct,
        updateSettings,
        reloadProducts,
        resetAllData,
        searchQuery,
        setSearchQuery,
        orderHistory,
        addOrderToHistory,
        updateOrderStatusInHistory,
        deleteOrderFromHistory,
        clearOrderHistory,
        reorderPastOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
