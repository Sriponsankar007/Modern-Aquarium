import { CartItem, CustomerDetails, Product, ServiceItem, ShopSettings } from '../types';

/**
 * Clean phone number to digits only, e.g. 919876543210
 */
export function formatWhatsAppNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Validates if the configured WhatsApp phone number is set and valid
 */
export function isValidWhatsAppConfig(settings: ShopSettings): boolean {
  const cleaned = formatWhatsAppNumber(settings.whatsappNumber || '');
  return cleaned.length >= 10;
}

/**
 * Generates unique human-readable order reference like MA-2610-8472
 */
export function generateOrderReference(prefix = 'MA'): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${dateStr}-${randomSuffix}`;
}

export interface WhatsAppResult {
  url: string | null;
  error?: string;
  isConfigured: boolean;
  orderRef?: string;
}

/**
 * Format currency amount with Indian rupee format or configured symbol
 */
export function formatMoney(amount: number, currencySymbol = '₹'): string {
  return `${currencySymbol}${amount.toLocaleString('en-IN')}`;
}

/**
 * Generates WhatsApp URL for single product "Order Now"
 */
export function generateProductOrderUrl(
  product: Product,
  variantId: string | undefined,
  quantity: number,
  settings: ShopSettings,
  customer?: Partial<CustomerDetails>
): WhatsAppResult {
  if (!isValidWhatsAppConfig(settings)) {
    return {
      url: null,
      error: 'WhatsApp number is not configured in shop settings. Please set it in Admin Settings.',
      isConfigured: false
    };
  }

  const cleanPhone = formatWhatsAppNumber(settings.whatsappNumber);
  const selectedVariant = product.variants.find((v) => v.id === variantId);
  const unitPrice = selectedVariant ? selectedVariant.price : product.price;
  const lineTotal = unitPrice * quantity;
  const isBird = product.productType === 'live-bird' || product.deliveryPolicy === 'store_pickup_only';
  const orderRef = generateOrderReference('DIR');

  let text = `👋 Hello ${settings.shopName} Team,\n`;
  text += `I would like to order the following item:\n\n`;
  text += `📦 *Order Ref:* ${orderRef}\n`;
  text += `🐟 *Product:* ${product.name}\n`;
  if (selectedVariant) {
    text += `🔹 *Variant:* ${selectedVariant.name}\n`;
  }
  text += `🔢 *Quantity:* ${quantity}\n`;
  text += `💵 *Price:* ${formatMoney(unitPrice, settings.currencySymbol)} each\n`;
  text += `💰 *Item Total:* ${formatMoney(lineTotal, settings.currencySymbol)}\n\n`;

  if (isBird) {
    text += `⚠️ *FULFILMENT: STORE PICKUP ONLY*\n`;
    text += `(I understand live birds cannot be delivered and will collect in store)\n\n`;
  } else {
    const methodText = customer?.fulfilmentMethod === 'store_pickup' ? 'Store Pickup' : 'Delivery Enquiry';
    text += `🚚 *Fulfilment Preference:* ${methodText}\n`;
    if (customer?.deliveryArea) {
      text += `📍 *Delivery Area / Pin:* ${customer.deliveryArea}\n`;
    }
  }

  if (customer?.name) {
    text += `👤 *Customer Name:* ${customer.name}\n`;
  }
  if (customer?.phone) {
    text += `📞 *Customer Phone:* ${customer.phone}\n`;
  }
  if (customer?.notes) {
    text += `📝 *Notes:* ${customer.notes}\n`;
  }

  text += `\n❓ Please confirm live stock availability, health check, and final charges. Thank you!`;

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  return { url, isConfigured: true, orderRef };
}

/**
 * Generates WhatsApp URL for full Cart Checkout
 */
export function generateCartCheckoutUrl(
  items: CartItem[],
  customer: CustomerDetails,
  settings: ShopSettings
): WhatsAppResult {
  if (!isValidWhatsAppConfig(settings)) {
    return {
      url: null,
      error: 'WhatsApp number is not configured in shop settings. Please set it in Admin Settings.',
      isConfigured: false
    };
  }

  if (items.length === 0) {
    return {
      url: null,
      error: 'Your cart is empty.',
      isConfigured: true
    };
  }

  const cleanPhone = formatWhatsAppNumber(settings.whatsappNumber);
  const orderRef = generateOrderReference('ORD');
  const subtotal = items.reduce((acc, item) => acc + item.lineTotal, 0);

  // Check if any item has store pickup only policy (like live birds)
  const hasStorePickupOnly = items.some(
    (item) => item.product.productType === 'live-bird' || item.product.deliveryPolicy === 'store_pickup_only'
  );

  let text = `👋 Hello ${settings.shopName} Team,\n`;
  text += `I would like to place an order from your website.\n\n`;
  text += `📋 *Order Ref:* ${orderRef}\n`;
  if (customer.name) {
    text += `👤 *Customer Name:* ${customer.name}\n`;
  }
  if (customer.phone) {
    text += `📞 *Contact:* ${customer.phone}\n`;
  }

  text += `\n🛒 *ITEMS ORDERED (${items.length}):*\n`;
  text += `--------------------------\n`;

  items.forEach((item, index) => {
    const isPickupOnly = item.product.productType === 'live-bird' || item.product.deliveryPolicy === 'store_pickup_only';
    text += `${index + 1}. *${item.product.name}*\n`;
    if (item.variantName) {
      text += `   Option: ${item.variantName}\n`;
    }
    text += `   Qty: ${item.quantity} × ${formatMoney(item.unitPrice, settings.currencySymbol)} = ${formatMoney(item.lineTotal, settings.currencySymbol)}\n`;
    if (isPickupOnly) {
      text += `   ⚠️ [STORE PICKUP ONLY]\n`;
    }
  });

  text += `--------------------------\n`;
  text += `💰 *Subtotal:* ${formatMoney(subtotal, settings.currencySymbol)}\n\n`;

  if (hasStorePickupOnly) {
    text += `🏬 *Fulfilment:* STORE PICKUP ONLY (Contains live animals/restricted items)\n`;
    if (customer.preferredPickupTime) {
      text += `🕒 *Target Pickup Time:* ${customer.preferredPickupTime}\n`;
    }
  } else {
    const method = customer.fulfilmentMethod === 'store_pickup' ? 'Store Pickup' : 'Delivery Enquiry';
    text += `🚚 *Fulfilment Preference:* ${method}\n`;
    if (customer.deliveryArea) {
      text += `📍 *Delivery Area / Address:* ${customer.deliveryArea}\n`;
    }
  }

  if (customer.notes && customer.notes.trim()) {
    text += `📝 *Customer Notes:* ${customer.notes.trim()}\n`;
  }

  text += `\n*Note:* Please review item availability, live livestock health, and confirm final delivery/tax charges so I can finalize this order. Thank you!`;

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  return { url, isConfigured: true, orderRef };
}

/**
 * Generates WhatsApp URL for Service Booking Enquiry
 */
export function generateServiceEnquiryUrl(
  service: ServiceItem,
  details: {
    customerName: string;
    phone: string;
    tankDetails?: string;
    preferredDate?: string;
    addressOrArea?: string;
    serviceNotes?: string;
  },
  settings: ShopSettings
): WhatsAppResult {
  if (!isValidWhatsAppConfig(settings)) {
    return {
      url: null,
      error: 'WhatsApp number is not configured in shop settings. Please set it in Admin Settings.',
      isConfigured: false
    };
  }

  const cleanPhone = formatWhatsAppNumber(settings.whatsappNumber);
  const enquiryRef = generateOrderReference('SRV');

  let text = `👋 Hello ${settings.shopName} Team,\n`;
  text += `I would like to book or inquire about your *${service.name}*.\n\n`;
  text += `🔖 *Enquiry Ref:* ${enquiryRef}\n`;
  text += `🔧 *Service:* ${service.name}\n`;
  text += `💰 *Starting From:* ${formatMoney(service.startingPrice, settings.currencySymbol)}\n`;
  text += `⏱️ *Est. Duration:* ${service.durationEstimate}\n\n`;

  if (details.customerName) {
    text += `👤 *Client Name:* ${details.customerName}\n`;
  }
  if (details.phone) {
    text += `📞 *Phone:* ${details.phone}\n`;
  }
  if (details.tankDetails) {
    text += `🐠 *Aquarium Details:* ${details.tankDetails}\n`;
  }
  if (details.preferredDate) {
    text += `📅 *Preferred Date/Time:* ${details.preferredDate}\n`;
  }
  if (details.addressOrArea) {
    text += `📍 *Location / Area:* ${details.addressOrArea}\n`;
  }
  if (details.serviceNotes) {
    text += `📝 *Notes/Issues:* ${details.serviceNotes}\n`;
  }

  text += `\nCould you please check technician availability and provide a tailored quotation? Thank you!`;

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  return { url, isConfigured: true, orderRef: enquiryRef };
}

/**
 * Generates WhatsApp URL for general store question or advice
 */
export function generateStoreChatUrl(
  settings: ShopSettings,
  message = 'Hello Modern Aquarium! I have a question regarding your aquarium showroom and stock.'
): WhatsAppResult {
  if (!isValidWhatsAppConfig(settings)) {
    return {
      url: null,
      error: 'WhatsApp number is not configured in shop settings.',
      isConfigured: false
    };
  }

  const cleanPhone = formatWhatsAppNumber(settings.whatsappNumber);
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  return { url, isConfigured: true };
}
