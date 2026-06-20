import { AdminSettings, SettingsFormData } from '@v8n/types';
import { settingsSchema } from './zod-schemas';

// Mock data managed locally for admin settings
let mockAdminSettings: AdminSettings = {
  general: {
    storeName: 'V8N E-commerce',
    storeUrl: 'https://v8n-ecomm.example.com',
    contactEmail: 'admin@v8n-ecomm.example.com',
    logo: 'https://placehold.co/200x80/1E293B/FFFFFF.png?text=V8N+Store',
  },
  store: {
    currency: 'USD',
    taxEnabled: true,
    taxRate: 10,
  },
  payment: {
    stripeEnabled: true,
    paypalEnabled: false,
    codEnabled: true,
  },
  shipping: {
    flatRateEnabled: true,
    freeShippingEnabled: true,
    rates: [
      { method: 'Standard Shipping', cost: 10 },
      { method: 'Express Shipping', cost: 25 },
      { method: 'Free Shipping', cost: 0, minOrderAmount: 100 },
    ],
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    templates: [
      { type: 'Order Confirmation', subject: 'Your Order {orderNumber} is Confirmed', body: 'Thank you for your purchase...' },
      { type: 'Order Shipped', subject: 'Your Order {orderNumber} has Shipped', body: 'Your order is on the way...' },
    ],
  },
};

export const fetchAdminSettings = async (): Promise<AdminSettings> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(mockAdminSettings)));
    }, 500);
  });
};

export const updateAdminSettings = async (data: SettingsFormData): Promise<AdminSettings> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Validate with Zod before saving (even in mock)
        const validatedData = settingsSchema.parse(data);
        
        // Update mock data
        mockAdminSettings = {
          ...mockAdminSettings,
          ...validatedData,
          general: {
            ...mockAdminSettings.general,
            ...validatedData.general,
            logo: validatedData.general.logo instanceof File ? URL.createObjectURL(validatedData.general.logo) : validatedData.general.logo,
          }
        };
        
        resolve(JSON.parse(JSON.stringify(mockAdminSettings)));
      } catch (error) {
        reject(error);
      }
    }, 800);
  });
};
