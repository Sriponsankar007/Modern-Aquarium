export type ProductType =
  | 'live-fish'
  | 'live-plant'
  | 'live-bird'
  | 'aquarium'
  | 'equipment'
  | 'food'
  | 'decoration'
  | 'substrate'
  | 'lighting'
  | 'filter'
  | 'water-care'
  | 'cleaning'
  | 'accessory'
  | 'shrimp-snail'
  | 'service';

export type AvailabilityStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'contact_for_price';

export type DeliveryPolicy = 'standard_delivery' | 'store_pickup_only' | 'local_express';

export interface CareRequirements {
  adultSize?: string;
  recommendedTankSize?: string;
  waterTemperature?: string;
  phRange?: string;
  temperament?: 'Peaceful' | 'Semi-Aggressive' | 'Aggressive' | 'Community Safe';
  diet?: 'Omnivore' | 'Carnivore' | 'Herbivore' | 'Algae Grazer' | 'Specialized';
  careDifficulty?: 'Easy / Beginner' | 'Moderate' | 'Advanced' | 'Expert Only';
  waterType?: 'Freshwater' | 'Marine' | 'Brackish';
  compatibilityNotes?: string;
  lightingRequirement?: 'Low' | 'Medium' | 'High';
  growthRate?: 'Slow' | 'Moderate' | 'Fast';
  co2Requirement?: 'Not Required' | 'Recommended' | 'High CO2 Mandatory';
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  subcategoryId?: string;
  scientificName?: string;
  variety?: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  stockQuantity: number;
  availabilityStatus: AvailabilityStatus;
  productType: ProductType;
  variants: ProductVariant[];
  tags: string[];
  specifications: Record<string, string>;
  careRequirements?: CareRequirements;
  deliveryPolicy: DeliveryPolicy;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description: string;
  image: string;
  displayOrder: number;
  active: boolean;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  startingPrice: number;
  durationEstimate: string;
  includes: string[];
  idealFor: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ShopSettings {
  shopName: string;
  whatsappNumber: string; // e.g. "919876543210"
  phoneDisplay: string;
  email: string;
  address: string;
  storeTiming: string;
  currency: string;
  currencySymbol: string;
  enableMarineCategory: boolean;
  announcementText: string;
  allowCashOnPickup: boolean;
  minimumOrderValue: number;
}

export type FulfilmentMethod = 'store_pickup' | 'delivery_enquiry';

export interface CustomerDetails {
  name: string;
  phone?: string;
  fulfilmentMethod: FulfilmentMethod;
  deliveryArea?: string;
  preferredPickupTime?: string;
  notes?: string;
}

export type OrderStatus =
  | 'whatsapp_opened'
  | 'confirmed_by_shop'
  | 'out_for_delivery_or_ready'
  | 'completed'
  | 'cancelled';

export interface StoredOrderItem {
  productId: string;
  name: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  image: string;
  isPickupOnly: boolean;
}

export interface StoredOrder {
  id: string;
  orderRef: string;
  createdAt: string;
  customerName: string;
  customerPhone?: string;
  fulfilmentMethod: FulfilmentMethod;
  deliveryArea?: string;
  preferredPickupTime?: string;
  notes?: string;
  items: StoredOrderItem[];
  subtotal: number;
  whatsappUrl: string;
  status: OrderStatus;
  statusUpdatedAt: string;
  statusNote?: string;
}

export interface CustomerSetupGalleryItem {
  id: string;
  title: string;
  tankStyle: 'Nature Aquarium' | 'Iwagumi Scape' | 'Dutch Planted' | 'Biotope' | 'Reef Marine' | 'Bespoke Showroom' | 'Koi Pond';
  clientName: string;
  clientLocation: string;
  image: string;
  dimensions: string;
  volumeLiters: number;
  equipmentSummary: string;
  plantsUsed: string[];
  fishStocked: string[];
  clientReview: string;
  rating: number;
  dateCompleted: string;
}

