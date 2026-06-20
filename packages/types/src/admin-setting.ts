export interface AdminSettings {
  general: {
    storeName: string;
    storeUrl: string;
    contactEmail: string;
    logo?: string;
  };
  store: {
    currency: string;
    taxEnabled: boolean;
    taxRate: number;
  };
  payment: {
    stripeEnabled: boolean;
    paypalEnabled: boolean;
    codEnabled: boolean;
  };
  shipping: {
    flatRateEnabled: boolean;
    freeShippingEnabled: boolean;
    rates: ShippingRate[];
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    templates: NotificationTemplate[];
  };
}

export interface ShippingRate {
  method: string;
  cost: number;
  minOrderAmount?: number;
}

export interface NotificationTemplate {
  type: string;
  subject: string;
  body: string;
}

export interface SettingsFormData {
  general: {
    storeName: string;
    storeUrl: string;
    contactEmail: string;
    logo?: File | string; // File for upload, string for existing URL
  };
  store: {
    currency: string;
    taxEnabled: boolean;
    taxRate: number;
  };
  payment: {
    stripeEnabled: boolean;
    paypalEnabled: boolean;
    codEnabled: boolean;
  };
  shipping: {
    flatRateEnabled: boolean;
    freeShippingEnabled: boolean;
    rates: ShippingRate[];
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    templates: NotificationTemplate[];
  };
}
