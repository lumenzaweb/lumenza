import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  <section id="products" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
    <h3 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-wide">
      Our Products
    </h3>

    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
        hidden: {},
      }}
    >
      {products.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
          whileHover={{ scale: 1.05, y: -5 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        >
          <Link
            to={`/product/${encodeURIComponent(
              item.name.toLowerCase().replace(/ /g, "-")
            )}`}
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={item.img}
                alt={`${item.name} by LUMENZA`}
                className="h-56 w-full object-cover transform group-hover:scale-110 transition duration-700"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Title */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <h4 className="text-white text-lg font-semibold bg-black/50 px-4 py-1 rounded-lg group-hover:bg-red-600 transition">
                {item.name}
              </h4>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default ProductsSection;
