import { initialCategories } from '../data/categories';
import { initialProducts } from '../data/products';
import { initialServices } from '../data/services';
import { Category, Product, ServiceItem, ShopSettings, StoredOrder, OrderStatus } from '../types';
import { Security } from './security';

const STORAGE_KEYS = {
  PRODUCTS: 'modern_aquarium_products_v1',
  CATEGORIES: 'modern_aquarium_categories_v1',
  SERVICES: 'modern_aquarium_services_v1',
  SETTINGS: 'modern_aquarium_settings_v1',
  CART: 'modern_aquarium_cart_v1',
  RECENTLY_VIEWED: 'modern_aquarium_recent_v1',
  ORDER_HISTORY: 'modern_aquarium_orders_v1'
};

export const defaultShopSettings: ShopSettings = {
  shopName: 'Modern Aquarium',
  // Sane default Indian WhatsApp contact format (can be edited instantly in admin)
  whatsappNumber: '919840012345',
  phoneDisplay: '+91 98400 12345',
  email: 'care@modernaquarium.store',
  address: 'No. 42 Aqua Marine Boulevard, Coral Bay District, Chennai, TN 600028',
  storeTiming: 'Mon - Sun: 9:30 AM – 9:00 PM',
  currency: 'INR',
  currencySymbol: '₹',
  enableMarineCategory: true,
  announcementText: '🌊 Free Water Parameter Testing on All In-Store Visits | 📦 Express Local Fish Delivery Available',
  allowCashOnPickup: true,
  minimumOrderValue: 200
};

const memStore: Record<string, string> = {};

const safeStorage = {
  getItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return memStore[key] ?? null;
      }
    }
    return memStore[key] ?? null;
  },
  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch {
        memStore[key] = value;
      }
    }
    memStore[key] = value;
  },
  removeItem(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch {
        delete memStore[key];
      }
    }
    delete memStore[key];
  }
};

// Safe JSON parser
function safeParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.error('Failed to parse localStorage data:', e);
    return fallback;
  }
}

export const Storage = {
  getProducts(): Product[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
      return initialProducts;
    }
    const stored = safeParse<Product[]>(raw, initialProducts);
    if (stored.length < initialProducts.length) {
      const storedIds = new Set(stored.map((p) => p.id));
      const missing = initialProducts.filter((p) => !storedIds.has(p.id));
      if (missing.length > 0) {
        const merged = [...stored, ...missing];
        safeStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(merged));
        return merged;
      }
    }
    return stored;
  },

  saveProducts(products: Product[]): void {
    safeStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  },

  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug);
  },

  upsertProduct(product: Product): void {
    const list = this.getProducts();
    const index = list.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      list[index] = { ...product, updatedAt: new Date().toISOString() };
    } else {
      list.unshift({ ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.saveProducts(list);
  },

  deleteProduct(id: string): boolean {
    const list = this.getProducts();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length !== list.length) {
      this.saveProducts(filtered);
      return true;
    }
    return false;
  },

  getCategories(): Category[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
      return initialCategories;
    }
    return safeParse<Category[]>(raw, initialCategories);
  },

  saveCategories(categories: Category[]): void {
    safeStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },

  getServices(): ServiceItem[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServices));
      return initialServices;
    }
    return safeParse<ServiceItem[]>(raw, initialServices);
  },

  saveServices(services: ServiceItem[]): void {
    safeStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  },

  getSettings(): ShopSettings {
    const raw = safeStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultShopSettings));
      return defaultShopSettings;
    }
    return { ...defaultShopSettings, ...safeParse<ShopSettings>(raw, defaultShopSettings) };
  },

  saveSettings(settings: ShopSettings): void {
    safeStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  resetToDefaultData(): void {
    safeStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts));
    safeStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
    safeStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServices));
    safeStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultShopSettings));
  },

  getOrderHistory(): StoredOrder[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.ORDER_HISTORY);
    return safeParse<StoredOrder[]>(raw, []);
  },

  saveOrder(order: StoredOrder): void {
    const list = this.getOrderHistory();
    // Prepend new order
    list.unshift(order);
    safeStorage.setItem(STORAGE_KEYS.ORDER_HISTORY, JSON.stringify(list));
  },

  updateOrderStatus(orderId: string, status: OrderStatus, note?: string): boolean {
    const list = this.getOrderHistory();
    const idx = list.findIndex((o) => o.id === orderId || o.orderRef === orderId);
    if (idx >= 0) {
      list[idx] = {
        ...list[idx],
        status,
        statusUpdatedAt: new Date().toISOString(),
        ...(note !== undefined ? { statusNote: note } : {})
      };
      safeStorage.setItem(STORAGE_KEYS.ORDER_HISTORY, JSON.stringify(list));
      return true;
    }
    return false;
  },

  deleteOrder(orderId: string): boolean {
    const list = this.getOrderHistory();
    const filtered = list.filter((o) => o.id !== orderId && o.orderRef !== orderId);
    if (filtered.length !== list.length) {
      safeStorage.setItem(STORAGE_KEYS.ORDER_HISTORY, JSON.stringify(filtered));
      return true;
    }
    return false;
  },

  clearOrderHistory(): void {
    safeStorage.removeItem(STORAGE_KEYS.ORDER_HISTORY);
  },

  // Export products to CSV
  exportProductsToCSV(products: Product[]): string {
    const headers = [
      'id',
      'name',
      'slug',
      'sku',
      'categoryId',
      'subcategoryId',
      'scientificName',
      'variety',
      'price',
      'compareAtPrice',
      'stockQuantity',
      'availabilityStatus',
      'productType',
      'deliveryPolicy',
      'featured',
      'active',
      'shortDescription'
    ];

    const rows = products.map((p) => [
      Security.sanitizeCsvCell(p.id),
      Security.sanitizeCsvCell(p.name || ''),
      Security.sanitizeCsvCell(p.slug),
      Security.sanitizeCsvCell(p.sku),
      Security.sanitizeCsvCell(p.categoryId),
      Security.sanitizeCsvCell(p.subcategoryId || ''),
      Security.sanitizeCsvCell(p.scientificName || ''),
      Security.sanitizeCsvCell(p.variety || ''),
      p.price,
      p.compareAtPrice !== undefined ? p.compareAtPrice : '',
      p.stockQuantity,
      Security.sanitizeCsvCell(p.availabilityStatus),
      Security.sanitizeCsvCell(p.productType),
      Security.sanitizeCsvCell(p.deliveryPolicy),
      p.featured ? 'true' : 'false',
      p.active ? 'true' : 'false',
      Security.sanitizeCsvCell(p.shortDescription || '')
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  // Parse and validate CSV data
  parseProductsFromCSV(csvText: string): {
    validProducts: Product[];
    errors: string[];
    warnings: string[];
  } {
    const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);
    const errors: string[] = [];
    const warnings: string[] = [];
    const validProducts: Product[] = [];

    if (lines.length < 2) {
      errors.push('CSV file must have a header row and at least one data row.');
      return { validProducts, errors, warnings };
    }

    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    const skuSet = new Set<string>();

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Basic CSV field parser handling quoted commas
      const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
      const values: string[] = [];
      let match;
      while ((match = regex.exec(line)) !== null) {
        let val = match[1] || '';
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1).replace(/""/g, '"');
        }
        values.push(val.trim());
        if (regex.lastIndex >= line.length) break;
      }

      const rowObj: Record<string, string> = {};
      headers.forEach((header, idx) => {
        rowObj[header] = values[idx] || '';
      });

      const rowNum = i + 1;
      const sku = rowObj.sku || `SKU-${Date.now()}-${i}`;
      const name = rowObj.name;
      const price = parseFloat(rowObj.price);
      const stock = parseInt(rowObj.stockQuantity, 10);

      if (!name) {
        errors.push(`Row ${rowNum}: Missing mandatory 'name' column.`);
        continue;
      }
      if (isNaN(price) || price < 0) {
        errors.push(`Row ${rowNum} (${name}): Invalid price value "${rowObj.price}".`);
        continue;
      }
      if (skuSet.has(sku)) {
        warnings.push(`Row ${rowNum}: Duplicate SKU "${sku}" detected. A new suffix was assigned.`);
      }
      skuSet.add(sku);

      const isBird = rowObj.productType === 'live-bird' || rowObj.categoryId === 'birds';

      const product: Product = {
        id: rowObj.id || `prod-csv-${Date.now()}-${i}`,
        name,
        slug: rowObj.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        sku,
        categoryId: rowObj.categoryId || 'freshwater-fish',
        subcategoryId: rowObj.subcategoryId || undefined,
        scientificName: rowObj.scientificName || undefined,
        variety: rowObj.variety || undefined,
        shortDescription: rowObj.shortDescription || `${name} available at Modern Aquarium.`,
        fullDescription: rowObj.shortDescription || `${name} available at Modern Aquarium.`,
        images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'],
        price,
        compareAtPrice: rowObj.compareAtPrice ? parseFloat(rowObj.compareAtPrice) : undefined,
        currency: 'INR',
        stockQuantity: isNaN(stock) ? 10 : stock,
        availabilityStatus: (rowObj.availabilityStatus as any) || 'in_stock',
        productType: (rowObj.productType as any) || 'live-fish',
        deliveryPolicy: isBird ? 'store_pickup_only' : ((rowObj.deliveryPolicy as any) || 'standard_delivery'),
        featured: rowObj.featured === 'true',
        active: rowObj.active !== 'false',
        variants: [
          {
            id: `v-${Date.now()}-${i}`,
            name: 'Standard',
            sku,
            price,
            stockQuantity: isNaN(stock) ? 10 : stock,
            isAvailable: true
          }
        ],
        tags: [rowObj.categoryId || 'general'],
        specifications: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      validProducts.push(product);
    }

    return { validProducts, errors, warnings };
  }
};
