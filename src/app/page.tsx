import Image from "next/image";
import heroImage from "../../public/iplug-hero.svg";
import infinix from "../../public/infinix.svg";
import oppo from "../../public/iphone.svg";
import itel from "../../public/itel.svg";
import tecno from "../../public/tecno.svg";
import iphone from "../../public/iphone.svg";

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

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <main className="flex flex-col gap-8 items-center sm:items-start bg-[#FCFDFF] px-8">
        <div className="relative">
          <Image src={heroImage} alt="hero-section" />
        </div>

        <div>
          <h3 className="sm:text-2xl lg:text-3xl">Brands</h3>
          <div className="flex flex-row gap-6">
            {PhoneData.map((phone, index) => (
              <div>
                <Image src={phone.imageUrl} alt={phone.description} />
              </div>
            ))}
          </div>

          <div>
            <h3>We deliver unparalleled customer experiences.</h3>

            <Features/>
          </div>
        </div>
      </main>
    </div>
  );
}


const Features = () => {
  const features = [
    { title: "Original Products", desc: "Authenticity guaranteed. Shop only genuine products you can trust." },
    { title: "Product Satisfaction", desc: "Your satisfaction, our priority. Quality products guaranteed every time!" },
    { title: "Latest Phones", desc: "We bring the future to you with the latest smartphones." },
    { title: "Fast Delivery", desc: "Fast delivery of your favorite gadgets, right at your doorstep!" }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded-md text-center">
          <h3 className="font-bold text-lg">{feature.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
        </div>
      ))}
    </section>
  );
};
