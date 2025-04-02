'use client';

import { useState } from 'react';
import Image from 'next/image';
import iphone from "../../../public/image 3 (1).svg"
import infinix from "../../../public/infinix.svg"
import tecno from "../../../public/tecno.svg"
import itel from "../../../public/itel.svg"

interface Product {
  id: string;
  name: string;
  specs: string;
  price: number;
  rating: number;
  image: string;
  brand: string;
}

export default function ProductCatalogue() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Infinix Smart 10',
      specs: '128GB Storage | 6GB RAM | 5MP',
      price: 90,
      rating: 4.5,
      image: iphone,
      brand: 'Infinix'
    },

    {
        id: '1',
        name: 'Infinix Smart 10',
        specs: '128GB Storage | 6GB RAM | 5MP',
        price: 90,
        rating: 4.5,
        image: iphone,
        brand: "Infinix"
      },


      {
        id: '1',
        name: 'Infinix Smart 10',
        specs: '128GB Storage | 6GB RAM | 5MP',
        price: 90,
        rating: 4.5,
        image: iphone,
        brand: "Infinix"
      },

      {
        id: '1',
        name: 'Infinix Smart 10',
        specs: '128GB Storage | 6GB RAM | 5MP',
        price: 90,
        rating: 4.5,
        image: iphone,
        brand:"Tecno"
      },



      {
        id: '1',
        name: 'Infinix Smart 10',
        specs: '128GB Storage | 6GB RAM | 5MP',
        price: 90,
        rating: 4.5,
        image: iphone,
            brand:"Infinix"
      },


      {
        id: '1',
        name: 'Infinix Smart 10',
        specs: '128GB Storage | 6GB RAM | 5MP',
        price: 90,
        rating: 4.5,
        image: iphone,
        brand:"itel"
      },
    // Add more products as needed
  ]);

  const categories = [
    'Mobile Phones',
    'Laptops',
    'Speaker',
    'Smart TV'
  ];

  const brands = [
    { name: 'Infinix', logo: infinix },
    { name: 'Tecno', logo: tecno },
    { name: 'Itel', logo: itel }
  ];

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesRating = !selectedRating || product.rating >= selectedRating;
    const matchesPrice = priceRange === 'all' ||
      (priceRange === '0-100' && product.price <= 100) ||
      (priceRange === '100-500' && product.price > 100 && product.price <= 500) ||
      (priceRange === '500+' && product.price > 500);
    return matchesBrand && matchesRating && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#FCFDFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0  bg-white border rounded-md h-fit p-7">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-100 rounded cursor-pointer">
                  <span>{category}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <div className="relative">
                  <button
                    className="border rounded-md px-3 py-2 flex items-center gap-2"
                    onClick={() => document.getElementById('brandDropdown')?.classList.toggle('hidden')}
                  >
                    <span>Brands</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id="brandDropdown" className="absolute z-10 mt-1 w-48 bg-white border rounded-md shadow-lg hidden">
                    {brands.map((brand) => (
                      <label key={brand.name} className="flex items-center gap-2 p-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => handleBrandChange(brand.name)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Image src={brand.logo} alt={brand.name} width={20} height={20} className="object-contain" />
                        <span>{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <button
                    className="border rounded-md px-3 py-2 flex items-center gap-2"
                    onClick={() => document.getElementById('ratingDropdown')?.classList.toggle('hidden')}
                  >
                    <span>Ratings</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id="ratingDropdown" className="absolute z-10 mt-1 w-48 bg-white border rounded-md shadow-lg hidden">
                    {[5, 4, 3, 0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => {
                          setSelectedRating(rating || null);
                          document.getElementById('ratingDropdown')?.classList.add('hidden');
                        }}
                        className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span>{rating > 0 ? `${rating}+ Stars` : 'All Ratings'}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <button
                    className="border rounded-md px-3 py-2 flex items-center gap-2"
                    onClick={() => document.getElementById('priceDropdown')?.classList.toggle('hidden')}
                  >
                    <span>Price Range</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id="priceDropdown" className="absolute z-10 mt-1 w-48 bg-white border rounded-md shadow-lg hidden">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: '0-100', label: '$0 - $100' },
                      { value: '100-500', label: '$100 - $500' },
                      { value: '500+', label: '$500+' }
                    ].map((range) => (
                      <button
                        key={range.value}
                        onClick={() => {
                          setPriceRange(range.value);
                          document.getElementById('priceDropdown')?.classList.add('hidden');
                        }}
                        className="w-full text-left p-3 hover:bg-gray-50 cursor-pointer"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Showing 1-15 of 200 results
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={() => window.location.href = `/products/${product.id}`}>
                  <div className="relative h-48 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                    <button className="absolute top-2 right-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.specs}</p>
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price}</span>
                    <div className="space-x-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Buy Now</button>
                      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50">Add to cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-8 gap-2">
              <button className="px-3 py-1 border rounded-md hover:bg-gray-100">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-100">2</button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-100">3</button>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}