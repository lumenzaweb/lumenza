import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Security Solution",
    img: "https://i.pinimg.com/736x/8a/11/80/8a118042d769d824337062254afb1dc5.jpg",
  },
  {
    name: "Door Controls",
    img: "https://i.pinimg.com/736x/e1/46/aa/e146aa101dcb45b59fd1ab772f0e070b.jpg",
  },
  {
    name: "Kitchen Accessories",
    img: "https://i.pinimg.com/736x/49/8b/27/498b27a8bfa3affb06fb31a6ec060546.jpg",
  },
  {
    name: "Cabinet Fittings",
    img: "https://i.pinimg.com/736x/3b/1b/c1/3b1bc1ad75a6f5fa5d7ebc49f6aa9171.jpg",
  },
  {
    name: "Sealants And Adhesives",
    img: "https://i.pinimg.com/736x/87/f4/92/87f49227a0c3fd69502837ad63de622c.jpg",
  },
];

const ProductsSection = () => (
  <section id="products" className="py-16 px-4 sm:px-6 lg:px-10 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center tracking-widest uppercase mb-12">
        Product Catalogue
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
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 uppercase tracking-wide text-center group-hover:text-red-600 transition">
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
