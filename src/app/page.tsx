import Image from "next/image";
import heroImage from "../../public/iplug-hero.svg";
import infinix from "../../public/infinix.svg";
import satisfaction from "../../public/satisfaction.svg";
import airplane from "../../public/air plane.svg";
import delivery from "../../public/delivery.svg";
import original from '../../public/check-circle.svg'
import oppo from "../../public/iphone.svg";
import itel from "../../public/itel.svg";
import tecno from "../../public/tecno.svg";
import iphone from "../../public/iphone.svg";
import trending1 from "../../public/Frame 1000007411.svg"
import trending2 from "../../public/image.svg"
import phone1 from "../../public/image 1.svg"
import phone2 from "../../public/image 3.svg"
import phone3 from "../../public/image 3 (1).svg"
import phone4 from "../../public/image 4.svg"
import category1 from "../../public/category1.svg"
import category2 from "../../public/category2.svg"
import category3 from "../../public/category3.svg"
import category4 from "../../public/category4.svg"
import Link from 'next/link';



const PhoneData = [
  {
    imageUrl: infinix,
    description: "infinix",
  },

  {
    imageUrl: oppo,
    description: "oppo",
  },

  {
    imageUrl: itel,
    description: "itel",
  },
  {
    imageUrl: tecno,
    description: "tecn",
  },
  {
    imageUrl: iphone,
    description: "2- Bedroom Apartments",
  },
];

import Navbar from './components/Navbar';
import prisma from "../../lib/prisma";

export default async  function  Home() {

  const trendingDevices = await prisma.product.findMany({
      take: 4,
      orderBy: {
        createdAt: 'desc'  // Get the most recently added products
      },
    
    });
  const trendingPhones = [
    { name: "iPhone Smart 13", price: "$ 999", image: phone1, rating: 4.5 },
    { name: "iPhone Smart 12", price: "$ 799", image: phone2, rating: 4.5 },
    { name: "iPhone Smart 11", price: "$ 699", image: phone3, rating: 4.5 },
    { name: "iPhone Smart 10", price: "$ 599", image: phone4, rating: 4.5 }
  ];

  const accessories = [
    { name: "Wireless Earbuds", image: category1 },
    { name: "Premium Headphones", image: category2 },
    { name: "Phone Cases", image: category3 },
    { name: "Chargers", image: category4 }
  ];

  return (
    <div className="min-h-screen bg-[#FCFDFF]">
    
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Hero Section */}
        <div className="relative rounded-lg h-[400px] overflow-hidden my-8">
          <Image
            src={heroImage}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0"></div>
          <div className="relative z-10 p-8 sm:p-12 mt-15 text-white space-y-4 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-semibold animate-slide-up">Welcome to iPlug</h2>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-slide-up delay-150">Up to 50% off on all <br/> items after your <br/>first order</h1>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition animate-slide-up delay-300">Shop Now</button>
          </div>
        </div>

        {/* Brands Section */}
        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-6">Brands</h2>
          <div className="grid grid-cols-5 gap-8 items-center">
            {PhoneData.map((phone, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image src={phone.imageUrl} alt={phone.description} className="h-12 object-contain" />
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="my-20">
          <h2 className="text-2xl font-semibold mb-2">We deliver unparalleled customer experiences.</h2>
          <Features />
        </section>

        {/* Featured Collections */}

        <h2 className="text-2xl  mt-4 font-semibold mb-6">Featured Collections</h2>
        <section className="my-12 grid md:grid-cols-2 gap-6">
          <Link href="/products" className="rounded-lg p-6 flex items-center justify-between hover:opacity-90 transition-opacity">
            <Image src={trending1} alt="iPhone" className="" />
          </Link>
          <Link href="/products" className="rounded-lg p-6 flex items-center justify-between hover:opacity-90 transition-opacity">
            <Image src={trending2} alt="iPhone" className="" />
          </Link>
        </section>

        {/* Trending Section */}
        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-6">Trending</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDevices.map((phone, index) => (
              // Replace the div with Link
              <Link 
                href={`/products/${phone.id}`} 
                key={index} 
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              >
                <div className="relative h-48 mb-4">
                  <Image
                    src={phone.images[0]}
                    alt={phone.name}
                    fill
                    className="object-contain"
                  />
                  <button className="absolute top-2 right-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-2">{phone.name}</h3>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < 4.5 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{phone.price}</span>
                  <div className="space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Buy Now</button>
                    <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50">Add to cart</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Accessories Section */}
        <section className="my-12 ">
          <div className="flex flex-col md:flex-row space-y-6 md:space-x-8">
            {accessories.map((item, index) => (
              <Link href="/products" key={index} className="rounded-lg shadow-md overflow-hidden hover:opacity-90 transition-opacity">
                <div className=" ">
                  <Image src={item.image} alt={item.name} className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}


const Features = () => {
  const features = [
    { title: "Original Products", img: original, desc: "Authenticity guaranteed. Shop only genuine products you can trust." },
    { title: "Product Satisfaction",img: satisfaction, desc: "Your satisfaction, our priority. Quality products guaranteed every time!" },
    { title: "Latest Phones", img: airplane, desc: "We bring the future to you with the latest smartphones." },
    { title: "Fast Delivery",  img: delivery, desc: "Fast delivery of your favorite gadgets, right at your doorstep!" }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-[#ECF4FF] p-6 shadow-md rounded-md text-left">
          <div className="rounded-full p-4">
          <Image src={feature.img} alt={feature.title}  />
          </div>
          <h3 className="font-bold text-lg">{feature.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
        </div>
      ))}
    </section>
  );
};
