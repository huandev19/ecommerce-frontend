'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Button } from '@v8n/ui';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';

const checkoutSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  zipCode: z.string().min(4, { message: "Zip code is required" }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { cartTotal, items, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
  });

  const onSubmit = async () => {
    if (step < 4) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await trigger();
      if (isValid) setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-8 max-w-md">Thank you for your purchase. We have received your order and will email you the tracking details shortly.</p>
        <Button onClick={() => window.location.href = '/'}>Continue Shopping</Button>
      </div>
    );
  }

  const shippingCost = shippingMethod === 'express' ? 15 : 0;
  const tax = cartTotal() * 0.1;
  const total = cartTotal() + shippingCost + tax;
  const steps = ['Address', 'Shipping', 'Payment', 'Review'];

  return (
    <div className="relative grid gap-8 md:grid-cols-3 lg:gap-12">
      <div className="md:col-span-3">
        <div className="grid grid-cols-4 overflow-hidden rounded-xl border bg-white shadow-sm">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const active = step >= stepNumber;

            return (
              <div key={label} className={`border-r p-3 text-center text-xs last:border-r-0 md:p-4 md:text-sm ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-400'}`}>
                <span className={`mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {stepNumber}
                </span>
                {label}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Left Column: Form */}
      <div className="md:col-span-2 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Step 1: Address */}
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div 
              className={`p-4 md:p-6 flex justify-between items-center cursor-pointer ${step === 1 ? 'bg-gray-50 border-b' : ''}`}
              onClick={() => step > 1 && setStep(1)}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</span>
                Shipping Address
              </h3>
              {step > 1 && <span className="text-sm text-primary font-medium">Edit</span>}
            </div>
            
            {step === 1 && (
              <div className="p-4 md:p-6 space-y-4">
                <div>
                  <Input {...register("email")} placeholder="Email Address" type="email" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input {...register("firstName")} placeholder="First Name" />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Input {...register("lastName")} placeholder="Last Name" />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <Input {...register("address")} placeholder="Address" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input {...register("city")} placeholder="City" />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Input {...register("zipCode")} placeholder="Zip Code" />
                    {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>}
                  </div>
                </div>
                <Button type="button" onClick={handleNextStep} className="mt-4">Continue to Shipping</Button>
              </div>
            )}
          </div>

          {/* Step 2: Shipping Method */}
          <div className={`overflow-hidden rounded-xl border bg-white shadow-sm ${step < 2 ? 'opacity-60' : ''}`}>
            <div 
              className={`p-4 md:p-6 flex justify-between items-center cursor-pointer ${step === 2 ? 'bg-gray-50 border-b' : ''}`}
              onClick={() => step > 2 && setStep(2)}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</span>
                Shipping Method
              </h3>
              {step > 2 && <span className="text-sm text-primary font-medium">Edit</span>}
            </div>
            
            {step === 2 && (
              <div className="p-4 md:p-6 space-y-4">
                <div className="flex flex-col gap-3">
                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="standard" 
                        checked={shippingMethod === 'standard'} 
                        onChange={() => setShippingMethod('standard')}
                        className="w-4 h-4 text-primary"
                      />
                      <span>Standard Shipping (3-5 days)</span>
                    </div>
                    <span className="font-medium">Free</span>
                  </label>
                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="express" 
                        checked={shippingMethod === 'express'} 
                        onChange={() => setShippingMethod('express')}
                        className="w-4 h-4 text-primary"
                      />
                      <span>Express Shipping (1-2 days)</span>
                    </div>
                    <span className="font-medium">$15.00</span>
                  </label>
                </div>
                <Button type="button" onClick={handleNextStep} className="mt-4">Continue to Payment</Button>
              </div>
            )}
          </div>

          {/* Step 3: Payment */}
          <div className={`overflow-hidden rounded-xl border bg-white shadow-sm ${step < 3 ? 'opacity-60' : ''}`}>
            <div 
              className={`p-4 md:p-6 flex justify-between items-center cursor-pointer ${step === 3 ? 'bg-gray-50 border-b' : ''}`}
              onClick={() => step > 3 && setStep(3)}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${step === 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</span>
                Payment
              </h3>
              {step > 3 && <span className="text-sm text-primary font-medium">Edit</span>}
            </div>
            
            {step === 3 && (
              <div className="p-4 md:p-6 space-y-4">
                <div className="flex flex-col gap-3">
                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        className="w-4 h-4 text-primary"
                      />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                  </label>
                  <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="card" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-primary"
                      />
                      <span>Credit Card</span>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-gray-50 border rounded-lg mt-4 space-y-4">
                    <p className="text-sm text-gray-500 mb-2">Mock payment gateway integration. Do not enter real card details.</p>
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVC" />
                    </div>
                  </div>
                )}
                <Button type="button" onClick={handleNextStep} className="mt-4">Review Order</Button>
              </div>
            )}
          </div>

          {/* Step 4: Submit */}
          {step === 4 && (
            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full px-12 md:w-auto">
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          )}

        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="md:col-span-1 rounded-xl border bg-white p-4 shadow-sm md:sticky md:top-24 md:p-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-4">Order Summary</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto mb-4 border-b pb-4">
          {items.map((item) => {
            const variant = item.variantId ? item.product.variants?.find(v => v.id === item.variantId) : null;
            const price = variant?.price ?? item.product.price;
            
            return (
              <div key={`${item.product.id}-${item.variantId}`} className="flex gap-3">
                <div className="relative w-16 h-16 bg-white border rounded overflow-hidden shrink-0">
                  <Image src={item.product.image} alt={item.product.name} fill unoptimized className="object-cover" />
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium line-clamp-1">{item.product.name}</p>
                  {variant && <p className="text-gray-500 text-xs">{variant.color} / {variant.size}</p>}
                </div>
                <p className="text-sm font-medium">${(price * item.quantity).toFixed(2)}</p>
              </div>
            )
          })}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">${cartTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span className="font-medium">{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax (10%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {step === 4 && (
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="mt-6 h-12 w-full md:hidden">
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        )}
      </div>

    </div>
  );
}
