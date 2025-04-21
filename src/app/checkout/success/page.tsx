'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '../../hooks/useCart';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#FCFDFF] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <div className="space-y-4">
              <Link 
                href="/products" 
                className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Continue Shopping
              </Link>
              <Link 
                href="/orders" 
                className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-semibold hover:bg-gray-50 transition"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}