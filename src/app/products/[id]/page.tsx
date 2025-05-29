'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/app/hooks/useCart';

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
  storage: string;
  ram: string;
  camera: string;
  display: string;
  battery: string;
  processor: string;
}

export default function ProductDetails() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFDFF] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FCFDFF] flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error || 'Product not found'}</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFDFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-full overflow-hidden rounded-lg bg-white ${selectedImage === index ? 'ring-2 ring-blue-600' : ''}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div className="text-3xl font-bold">${product.price}</div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {/* <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                Buy Now
              </button> */}
              <button onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            quantity: 1
                          });
                        }}  className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition">
                Add to Cart
              </button>
            </div>

            {/* Specifications */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Storage</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.storage}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">RAM</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.ram}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Camera</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.camera}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Display</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.display}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Battery</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.battery}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Processor</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.processor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}