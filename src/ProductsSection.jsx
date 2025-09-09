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
  <section id="products" className="py-20 px-6 bg-gray-50 text-center">
    <h3 className="text-3xl font-bold mb-8">Our Products</h3>
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
        hidden: {},
      }}
    >
      {products.map((item, idx) => (
        <motion.div
          key={idx}
          className="p-4 bg-white rounded-lg shadow-lg cursor-pointer"
          whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        >
          <Link
            to={`/product/${encodeURIComponent(
              item.name.toLowerCase().replace(/ /g, "-")
            )}`}
          >
            <img
              src={item.img}
              alt={`${item.name} by LUMENZA`}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h4 className="font-semibold text-lg">{item.name}</h4>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default ProductsSection;