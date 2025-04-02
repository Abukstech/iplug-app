'use client';

export default function Footer() {
  return (
    <footer className="bg-[#ECF4FF] mt-12 border-t">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">iPlug</h2>
            <div className="text-gray-600">
              <p className="font-semibold">Address</p>
              <p className="text-sm">123 Limassol Avenue, Apt 4B,</p>
              <p className="text-sm">Nicosia 2025, Cyprus</p>
            </div>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Categories Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Categories</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Mobile</a></li>
              <li><a href="#" className="hover:text-blue-600">Infinix</a></li>
              <li><a href="#" className="hover:text-blue-600">Tecno</a></li>
              <li><a href="#" className="hover:text-blue-600">iphones</a></li>
              <li><a href="#" className="hover:text-blue-600">Samsung</a></li>
              <li><a href="#" className="hover:text-blue-600">Oppo</a></li>
            </ul>
          </div>

          {/* Categories Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Categories</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Laptops</a></li>
              <li><a href="#" className="hover:text-blue-600">Charger</a></li>
              <li><a href="#" className="hover:text-blue-600">Printer</a></li>
              <li><a href="#" className="hover:text-blue-600">Speaker</a></li>
              <li><a href="#" className="hover:text-blue-600">Earpod</a></li>
              <li><a href="#" className="hover:text-blue-600">Headset</a></li>
              <li><a href="#" className="hover:text-blue-600">Track Order</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <div className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-blue-600">Terms of Service</a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">Privacy Policy</a>
            </div>
            <p className="text-gray-600 text-sm">© 2023 Rayna. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}