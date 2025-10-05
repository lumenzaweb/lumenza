import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Security Solution",
    img: "https://i.pinimg.com/736x/21/47/b7/2147b788c548cf210d59b792a2133209.jpg",
  },
  {
    name: "Door Controls",
    img: "https://i.pinimg.com/736x/0c/2e/ec/0c2eec5c7726a153435749cc87705283.jpg",
  },
  {
    name: "Kitchen Accessories",
    img: "https://i.pinimg.com/736x/b3/1a/34/b31a34dac39a5c6655cc4547c23609fd.jpg",
  },
  {
    name: "Sealants And Adhesives",
    img: "https://i.pinimg.com/736x/59/cd/f7/59cdf7db5d3f53706935203f059ce9b6.jpg",
  },
  {
    name: "Furniture Fittings",
    img: "https://i.pinimg.com/736x/58/2e/fe/582efe311f863f94da14d7c7601f4fb7.jpg",
  },
];

const ProductsSection = () => (
  <section id="products" className="py-16 px-4 sm:px-6 lg:px-10 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-black text-center tracking-widest uppercase mb-12">
        OUR PRODUCTS
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {products.map((item, idx) => (
          <Link
            key={idx}
            to={`/product/${encodeURIComponent(
              item.name.toLowerCase().replace(/ /g, "-")
            )}`}
            className="group flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="h-56 sm:h-64 md:h-72 overflow-hidden rounded-t-xl">
              <img
                src={item.img}
                alt={`${item.name} by LUMENZA`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title */}
            <div className="flex-1 flex items-center justify-center px-4 py-5 border-t border-gray-200">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black uppercase tracking-wide text-center group-hover:text-red-700 transition">
                {item.name}
              </h3>
            </div>
          </Link> 
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
