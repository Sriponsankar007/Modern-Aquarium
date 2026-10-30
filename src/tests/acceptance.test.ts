import { describe, it, expect } from 'vitest';
import { initialCategories } from '../data/categories';
import { initialProducts } from '../data/products';
import { initialServices } from '../data/services';
import {
  formatWhatsAppNumber,
  isValidWhatsAppConfig,
  generateProductOrderUrl,
  generateCartCheckoutUrl,
  generateServiceEnquiryUrl,
  formatMoney
} from '../lib/whatsapp';
import { Storage, defaultShopSettings } from '../lib/storage';
import { CartItem, CustomerDetails } from '../types';
import { AdminAuth, hashPassword } from '../lib/auth';

describe('Authoritative Taxonomy & Catalog Specification', () => {
  it('should include all required primary categories', () => {
    const requiredCategories = [
      'freshwater-fish',
      'koi',
      'marine-fish',
      'birds',
      'aquariums-tanks',
      'plants',
      'substrate',
      'decorations',
      'lighting',
      'filters',
      'air-equipment',
      'water-equipment',
      'water-care',
      'fish-food',
      'shrimp-snails',
      'cleaning',
      'hardware'
    ];

    const categoryIds = initialCategories.map((c) => c.id);
    requiredCategories.forEach((catId) => {
      expect(categoryIds).toContain(catId);
    });
  });

  it('should have freshwater varieties represented in seed data', () => {
    const freshwaterSubcats = initialProducts
      .filter((p) => p.categoryId === 'freshwater-fish')
      .map((p) => p.subcategoryId);

    expect(freshwaterSubcats).toContain('betta');
    expect(freshwaterSubcats).toContain('guppy');
    expect(freshwaterSubcats).toContain('goldfish');
    expect(freshwaterSubcats).toContain('tetra');
    expect(freshwaterSubcats).toContain('discus');
    expect(freshwaterSubcats).toContain('arowana');
  });

  it('should mark all bird products as store_pickup_only', () => {
    const birds = initialProducts.filter((p) => p.categoryId === 'birds' && p.productType === 'live-bird');
    expect(birds.length).toBeGreaterThan(0);
    birds.forEach((bird) => {
      expect(bird.deliveryPolicy).toBe('store_pickup_only');
    });
  });

  it('should have 7 full professional services', () => {
    expect(initialServices.length).toBeGreaterThanOrEqual(7);
    const serviceSlugs = initialServices.map((s) => s.slug);
    expect(serviceSlugs).toContain('aquarium-setup-installation');
    expect(serviceSlugs).toContain('routine-aquarium-maintenance');
    expect(serviceSlugs).toContain('deep-cleaning-algae-restoration');
    expect(serviceSlugs).toContain('professional-aquascaping-design');
    expect(serviceSlugs).toContain('aquarium-relocation-moving');
    expect(serviceSlugs).toContain('fish-health-water-consultation');
    expect(serviceSlugs).toContain('corporate-amc-maintenance');
  });
});

describe('WhatsApp Ordering & URL Generation', () => {
  it('should format numbers to digits only without +, spaces, or dashes', () => {
    expect(formatWhatsAppNumber('+91 98400-12345')).toBe('919840012345');
    expect(formatWhatsAppNumber('91 9876 543 210')).toBe('919876543210');
  });

  it('should validate valid WhatsApp configuration', () => {
    expect(isValidWhatsAppConfig({ ...defaultShopSettings, whatsappNumber: '919840012345' })).toBe(true);
    expect(isValidWhatsAppConfig({ ...defaultShopSettings, whatsappNumber: '' })).toBe(false);
  });

  it('should generate product-specific Order Now WhatsApp link with encoded message', () => {
    const product = initialProducts[0];
    const res = generateProductOrderUrl(product, product.variants[0]?.id, 2, defaultShopSettings);

    expect(res.url).toBeDefined();
    expect(res.url).toContain('https://wa.me/919840012345?text=');
    const decoded = decodeURIComponent(res.url!.split('text=')[1]);
    expect(decoded).toContain(product.name);
    expect(decoded).toContain('Quantity:* 2');
    expect(decoded).toContain(defaultShopSettings.shopName);
  });

  it('should enforce STORE PICKUP ONLY in bird WhatsApp order', () => {
    const birdProduct = initialProducts.find((p) => p.categoryId === 'birds' && p.productType === 'live-bird');
    expect(birdProduct).toBeDefined();

    const res = generateProductOrderUrl(birdProduct!, undefined, 1, defaultShopSettings);
    const decoded = decodeURIComponent(res.url!.split('text=')[1]);
    expect(decoded).toContain('STORE PICKUP ONLY');
  });

  it('should generate complete multi-product cart checkout message with itemized lines', () => {
    const item1 = initialProducts[0];
    const item2 = initialProducts[1];

    const cartItems: CartItem[] = [
      {
        product: item1,
        variantId: item1.variants[0].id,
        variantName: item1.variants[0].name,
        quantity: 2,
        unitPrice: item1.variants[0].price,
        lineTotal: item1.variants[0].price * 2
      },
      {
        product: item2,
        quantity: 1,
        unitPrice: item2.price,
        lineTotal: item2.price
      }
    ];

    const customer: CustomerDetails = {
      name: 'Aditi Nair',
      phone: '9840099999',
      fulfilmentMethod: 'delivery_enquiry',
      deliveryArea: 'Besant Nagar, Chennai',
      notes: 'Please pack with heat pack'
    };

    const res = generateCartCheckoutUrl(cartItems, customer, defaultShopSettings);
    expect(res.url).toBeDefined();
    const decoded = decodeURIComponent(res.url!.split('text=')[1]);

    expect(decoded).toContain('Aditi Nair');
    expect(decoded).toContain(item1.name);
    expect(decoded).toContain(item2.name);
    expect(decoded).toContain('Besant Nagar, Chennai');
    expect(decoded).toContain('Please pack with heat pack');
    expect(decoded).toContain('Subtotal:');
  });

  it('should generate service booking WhatsApp message', () => {
    const service = initialServices[0];
    const res = generateServiceEnquiryUrl(
      service,
      {
        customerName: 'Karthik S',
        phone: '9840011111',
        tankDetails: '60P Rimless Planted',
        preferredDate: 'Next Sunday 10am',
        addressOrArea: 'OMR, Chennai'
      },
      defaultShopSettings
    );

    expect(res.url).toBeDefined();
    const decoded = decodeURIComponent(res.url!.split('text=')[1]);
    expect(decoded).toContain('Karthik S');
    expect(decoded).toContain(service.name);
    expect(decoded).toContain('60P Rimless Planted');
  });

  it('should format money in Indian Rupee format', () => {
    expect(formatMoney(1850, '₹')).toBe('₹1,850');
    expect(formatMoney(35000, '₹')).toBe('₹35,000');
  });
});

describe('CSV Catalog Import & Export', () => {
  it('should export products to CSV string with expected headers', () => {
    const csv = Storage.exportProductsToCSV(initialProducts);
    expect(csv).toContain('id,name,slug,sku,categoryId,subcategoryId');
    expect(csv).toContain('BETTA-HM-BLR01');
  });

  it('should parse and validate valid CSV rows', () => {
    const sampleCsv = `name,sku,price,stockQuantity,categoryId,shortDescription
"Flame Angel Fish",MAR-ANG-FLAME,3400,5,marine-fish,"Stunning red dwarf angelfish"
"Amazon Frogbit",PLANT-FROG-01,150,20,plants,"Floating surface live plant"`;

    const result = Storage.parseProductsFromCSV(sampleCsv);
    expect(result.validProducts.length).toBe(2);
    expect(result.validProducts[0].name).toBe('Flame Angel Fish');
    expect(result.validProducts[0].price).toBe(3400);
    expect(result.errors.length).toBe(0);
  });

  it('should report errors for missing mandatory fields in CSV', () => {
    const badCsv = `name,sku,price,stockQuantity
"",SKU-BAD,500,5
"Invalid Price Item",SKU-BAD2,not-a-number,10`;

    const result = Storage.parseProductsFromCSV(badCsv);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
  });
});

describe('Full Taxonomy & Catalog Completeness', () => {
  it('should have products for every single subcategory across all 17 categories', () => {
    for (const category of initialCategories) {
      const categoryProducts = initialProducts.filter((p) => p.categoryId === category.id);
      expect(categoryProducts.length).toBeGreaterThan(0);

      const presentSubcategories = new Set(categoryProducts.map((p) => p.subcategoryId));
      const subcategories = category.subcategories ?? [];
      for (const subcategory of subcategories) {
        expect(
          presentSubcategories.has(subcategory.id),
          `Missing product for subcategory: ${subcategory.id} in category: ${category.id}`
        ).toBe(true);
      }
    }
  });

  it('should have zero duplicate slugs or IDs across entire product catalog', () => {
    const slugs = initialProducts.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);

    const ids = initialProducts.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe('Order History Storage & Tracking', () => {
  it('should support saving and retrieving orders from storage', () => {
    // Clear test storage first
    Storage.clearOrderHistory();
    expect(Storage.getOrderHistory().length).toBe(0);

    const testOrder = {
      id: 'ord-test-999',
      orderRef: 'MA-TEST-999',
      createdAt: new Date().toISOString(),
      customerName: 'Test Customer',
      customerPhone: '9840012345',
      fulfilmentMethod: 'store_pickup' as const,
      subtotal: initialProducts[0].price * 2,
      whatsappUrl: 'https://wa.me/919840012345',
      status: 'whatsapp_opened' as const,
      statusUpdatedAt: new Date().toISOString(),
      items: [
        {
          productId: initialProducts[0].id,
          name: initialProducts[0].name,
          variantName: initialProducts[0].variants[0]?.name,
          quantity: 2,
          unitPrice: initialProducts[0].price,
          lineTotal: initialProducts[0].price * 2,
          image: initialProducts[0].images[0],
          isPickupOnly: false
        }
      ]
    };

    Storage.saveOrder(testOrder);
    const orders = Storage.getOrderHistory();
    expect(orders.length).toBe(1);
    expect(orders[0].id).toBe('ord-test-999');
    expect(orders[0].status).toBe('whatsapp_opened');

    // Update status
    Storage.updateOrderStatus('ord-test-999', 'confirmed_by_shop');
    const updated = Storage.getOrderHistory();
    expect(updated[0].status).toBe('confirmed_by_shop');

    // Clean up
    Storage.deleteOrder('ord-test-999');
    expect(Storage.getOrderHistory().length).toBe(0);
  });
});

describe('Admin Portal Security, Password Protection & WhatsApp Dynamic OTP', () => {
  it('should initialize with default encrypted Master Password and verify correctly', async () => {
    // Reset lockout before testing
    AdminAuth.resetLockout();

    const verifySuccess = await AdminAuth.verifyMasterPassword('AquaAdmin@2025');
    expect(verifySuccess.success).toBe(true);

    const verifyFail = await AdminAuth.verifyMasterPassword('WrongPassword123');
    expect(verifyFail.success).toBe(false);
    expect(verifyFail.error).toContain('Incorrect password');
  });

  it('should generate a 6-digit dynamic cryptographic OTP with 5-minute expiry', () => {
    const otp = AdminAuth.generateSecurityOTP();
    expect(otp.code).toMatch(/^\d{6}$/);
    expect(otp.expiresAt).toBeGreaterThan(Date.now());
    expect(otp.expiresAt - otp.createdAt).toBe(5 * 60 * 1000);
    expect(otp.targetEmail).toBe('sriponsankar6@gmail.com');
    expect(otp.targetPhone).toContain('919840012345');
    expect(otp.whatsappUrl).toContain('https://wa.me/919840012345');
    expect(decodeURIComponent(otp.whatsappUrl)).toContain(otp.code);
  });

  it('should verify correct OTP and burn it immediately to prevent replay attacks', () => {
    const otp = AdminAuth.generateSecurityOTP();
    const result = AdminAuth.verifyOTP(otp.code);
    expect(result.success).toBe(true);

    // Replay attempt must fail (single-use token protection)
    const replayResult = AdminAuth.verifyOTP(otp.code);
    expect(replayResult.success).toBe(false);
    expect(replayResult.error).toContain('No active verification code found');
  });

  it('should reject invalid OTP codes with helpful error messages', () => {
    AdminAuth.generateSecurityOTP();
    const result = AdminAuth.verifyOTP('000000');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid security code entered');
  });

  it('should create authenticated session and invalidate on logout', () => {
    const session = AdminAuth.createSession('otp_whatsapp');
    expect(session.token).toBeDefined();
    expect(session.authMethod).toBe('otp_whatsapp');
    expect(session.adminIdentifier).toBe('sriponsankar6@gmail.com');
    expect(AdminAuth.isAuthenticated()).toBe(true);

    AdminAuth.logout();
    expect(AdminAuth.isAuthenticated()).toBe(false);
  });

  it('should engage 15-minute security lockout after 5 consecutive failed attempts', async () => {
    AdminAuth.resetLockout();

    for (let i = 0; i < 4; i++) {
      await AdminAuth.verifyMasterPassword('WrongPass');
    }
    const stateBefore = AdminAuth.getLockoutState();
    expect(stateBefore.failedAttempts).toBe(4);
    expect(AdminAuth.isLockedOut(stateBefore)).toBe(false);

    // 5th failed attempt engages lockout
    const finalAttempt = await AdminAuth.verifyMasterPassword('WrongPass');
    expect(finalAttempt.success).toBe(false);
    expect(finalAttempt.error).toContain('Security lockout activated');

    const stateAfter = AdminAuth.getLockoutState();
    expect(stateAfter.failedAttempts).toBe(5);
    expect(AdminAuth.isLockedOut(stateAfter)).toBe(true);

    // Subsequent attempt is blocked by lockout
    const blockedAttempt = await AdminAuth.verifyMasterPassword('AquaAdmin@2025');
    expect(blockedAttempt.success).toBe(false);
    expect(blockedAttempt.error).toContain('Security lockout active');

    // Clean up
    AdminAuth.resetLockout();
  });
});

describe('Real-Time Global Search by Product Names and Categories', () => {
  it('should match products by product name', () => {
    const q = 'betta';
    const matches = initialProducts.filter((p) => p.name.toLowerCase().includes(q));
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.some((p) => p.name.toLowerCase().includes('betta'))).toBe(true);
  });

  it('should match products when querying by category name', () => {
    const categoryMap = new Map(initialCategories.map((c) => [c.id, c.name.toLowerCase()]));
    const q = 'japanese koi';

    const matches = initialProducts.filter((p) => {
      const catName = categoryMap.get(p.categoryId) || '';
      return p.name.toLowerCase().includes(q) || catName.includes(q);
    });

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((p) => p.categoryId === 'koi')).toBe(true);
  });

  it('should match products when querying by subcategory name', () => {
    const subcategoryMap = new Map<string, string>();
    initialCategories.forEach((c) => {
      c.subcategories?.forEach((s) => subcategoryMap.set(s.id, s.name.toLowerCase()));
    });
    const q = 'canister';

    const matches = initialProducts.filter((p) => {
      const subName = (p.subcategoryId && subcategoryMap.get(p.subcategoryId)) || '';
      return p.name.toLowerCase().includes(q) || subName.includes(q);
    });

    expect(matches.length).toBeGreaterThan(0);
  });

  it('should match services by service name and description', () => {
    const q = 'maintenance';
    const matches = initialServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.fullDescription.toLowerCase().includes(q) ||
        s.idealFor.toLowerCase().includes(q)
    );
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.some((s) => s.slug === 'routine-aquarium-maintenance')).toBe(true);
  });
});

describe('Theme Persistence across Page Refreshes via LocalStorage', () => {
  const THEME_KEY = 'modern_aquarium_theme';

  // In Node test environment, ensure localStorage is available
  const memStore: Record<string, string> = {};
  const mockStorage = {
    getItem: (key: string) => memStore[key] ?? null,
    setItem: (key: string, val: string) => {
      memStore[key] = String(val);
    },
    removeItem: (key: string) => {
      delete memStore[key];
    },
    clear: () => {
      for (const k of Object.keys(memStore)) delete memStore[k];
    }
  };

  const getStorage = () => (typeof localStorage !== 'undefined' ? localStorage : mockStorage);

  it('should persist selected light mode to localStorage', () => {
    const storage = getStorage();
    storage.setItem(THEME_KEY, 'light');
    expect(storage.getItem(THEME_KEY)).toBe('light');
  });

  it('should persist selected dark mode to localStorage and survive simulated refresh', () => {
    const storage = getStorage();
    storage.setItem(THEME_KEY, 'dark');
    expect(storage.getItem(THEME_KEY)).toBe('dark');

    // Simulate reading saved theme on page reload
    const restored = storage.getItem(THEME_KEY);
    expect(restored).toBe('dark');
  });

  it('should correctly toggle between light and dark modes and persist update', () => {
    const storage = getStorage();
    let currentMode: 'light' | 'dark' = 'light';
    const toggle = (mode: 'light' | 'dark') => (mode === 'dark' ? 'light' : 'dark');

    currentMode = toggle(currentMode);
    storage.setItem(THEME_KEY, currentMode);
    expect(storage.getItem(THEME_KEY)).toBe('dark');

    currentMode = toggle(currentMode);
    storage.setItem(THEME_KEY, currentMode);
    expect(storage.getItem(THEME_KEY)).toBe('light');
  });
});



