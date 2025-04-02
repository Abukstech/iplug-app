'use client';

import { useState } from 'react';
import Image from 'next/image';
import iphone from "../../../../public/image 3 (1).svg"

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  mainImage: string;
  images: string[];
  specs: {
    storage: string;
    ram: string;
    camera: string;
    display: string;
    battery: string;
    processor: string;
  };
  colors: string[];
}

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  // Mock data - replace with actual data fetching
  const product: ProductDetails = {
    id: '1',
    name: 'iPhone Smart 13',
    description: 'Experience the next generation of mobile technology with the iPhone Smart 13. Featuring advanced camera capabilities, stunning display, and powerful performance.',
    price: 999,
    rating: 4.8,
    mainImage: '/placeholder-phone.jpg',
    images: [
     iphone,
     iphone,
     iphone,
     iphone,
     iphone
    ],
    specs: {
      storage: '128GB',
      ram: '6GB',
      camera: '48MP Main + 12MP Ultra Wide',
      display: '6.1-inch Super Retina XDR',
      battery: '4000mAh',
      processor: 'A15 Bionic chip'
    },
    colors: ['Space Gray', 'Silver', 'Gold', 'Pacific Blue']
  };

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
              <span className="text-sm text-gray-600">{product.rating} (245 reviews)</span>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div className="text-3xl font-bold">${product.price}</div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="flex space-x-3 mt-2">
                {product.colors.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(index)}
                    className={`relative p-0.5 rounded-full flex items-center justify-center ${selectedColor === index ? 'ring-2 ring-blue-600' : ''}`}
                  >
                    <span className="sr-only">{color}</span>
                    <span className="h-8 w-8 rounded-full border border-gray-200 bg-gray-100"></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                Buy Now
              </button>
              <button className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition">
                Add to Cart
              </button>
            </div>

            {/* Specifications */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Storage</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.specs.storage}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">RAM</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.specs.ram}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Camera</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.specs.camera}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Display</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.specs.display}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Battery</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.specs.battery}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Processor</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.specs.processor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}