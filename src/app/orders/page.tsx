"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: string;
  createdAt: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  total: number;
  items: OrderItem[];
}

const statusColors: Record<"Delivered" | "Shipped" | "Processing" | "Cancelled", string> = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
            No orders found.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <div className="text-lg font-semibold">Order <span className="text-blue-600">{order.id}</span></div>
                  <div className="text-sm text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 bg-gray-50 rounded p-2">
                    {item.product?.images?.[0] ? (
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400">No img</span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{item.product?.name || 'Unnamed Product'}</div>
                      <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-700 font-semibold">
                  Total: <span className="text-black">${order.total.toFixed(2)}</span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;