'use client';
import React, { useState } from 'react';

interface ProductTabsProps {
  description: string;
}

export function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'shipping' | 'returns'>('description');

  return (
    <div className="mt-16 border-t pt-10">
      <div className="flex border-b mb-8">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'shipping' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
        >
          Shipping & Returns
        </button>
        <button
          onClick={() => setActiveTab('returns')}
          className={`pb-4 px-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'returns' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
        >
          Reviews (0)
        </button>
      </div>

      <div className="prose max-w-none text-gray-600 text-sm md:text-base">
        {activeTab === 'description' && (
          <div>
            <p>{description}</p>
            <ul className="mt-4 list-disc pl-5">
              <li>Premium quality materials</li>
              <li>Designed for everyday comfort</li>
              <li>Ethically sourced and manufactured</li>
            </ul>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div>
            <h4 className="font-medium text-gray-900">Free Standard Shipping</h4>
            <p className="mt-2">We offer free standard shipping on all orders over $50. Standard shipping usually takes 3-5 business days.</p>

            <h4 className="font-medium text-gray-900 mt-6">Return Policy</h4>
            <p className="mt-2">You can return any unworn, unwashed item within 30 days of purchase for a full refund or exchange. Custom or personalized items are final sale.</p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="text-center py-8">
            <p className="mb-4">No reviews yet for this product.</p>
            <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">Write a Review</button>
          </div>
        )}
      </div>
    </div>
  );
}
