'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // First, update the formData state type to include an array of images
  // Update the formData state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: [''],
    category: '',
    stock: '',
    storage: '',
    ram: '',
    camera: '',
    display: '',
    battery: '',
    processor: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create product');
      }

      router.refresh();
      router.push('/products');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="block text-sm font-medium">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full p-2 border rounded-md"
        />
      </div>

  
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Image URLs
        </label>
        {formData.images.map((url, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              name={`image-${index}`}
              value={url}
              onChange={(e) => {
                const newImages = [...formData.images];
                newImages[index] = e.target.value;
                setFormData(prev => ({ ...prev, images: newImages }));
              }}
              required
              className="flex-1 p-2 border rounded-md"
              placeholder="Enter image URL"
            />
            <button
              type="button"
              onClick={() => {
                const newImages = formData.images.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, images: newImages.length ? newImages : [''] }));
              }}
              className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
          }}
          className="mt-2 text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-md"
        >
          Add Another Image
        </button>
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-medium">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a category</option>
          <option value="phones">Phones</option>
          <option value="laptops">Laptops</option>
          <option value="accessories">Accessories</option>
          <option value="tablets">Tablets</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="stock" className="block text-sm font-medium">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="storage" className="block text-sm font-medium">
          Storage
        </label>
        <input
          type="text"
          id="storage"
          name="storage"
          value={formData.storage}
          onChange={handleChange}
          placeholder="e.g., 128GB"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="ram" className="block text-sm font-medium">
          RAM
        </label>
        <input
          type="text"
          id="ram"
          name="ram"
          value={formData.ram}
          onChange={handleChange}
          placeholder="e.g., 6GB"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="camera" className="block text-sm font-medium">
          Camera
        </label>
        <input
          type="text"
          id="camera"
          name="camera"
          value={formData.camera}
          onChange={handleChange}
          placeholder="e.g., 48MP Main + 12MP Ultra Wide"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="display" className="block text-sm font-medium">
          Display
        </label>
        <input
          type="text"
          id="display"
          name="display"
          value={formData.display}
          onChange={handleChange}
          placeholder="e.g., 6.1-inch Super Retina XDR"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="battery" className="block text-sm font-medium">
          Battery
        </label>
        <input
          type="text"
          id="battery"
          name="battery"
          value={formData.battery}
          onChange={handleChange}
          placeholder="e.g., 4000mAh"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="processor" className="block text-sm font-medium">
          Processor
        </label>
        <input
          type="text"
          id="processor"
          name="processor"
          value={formData.processor}
          onChange={handleChange}
          placeholder="e.g., A15 Bionic chip"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
      >
        {loading ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
}