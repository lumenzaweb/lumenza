import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const products = [
  {
    name: "Security Solution",
    img: "https://i.pinimg.com/736x/c6/96/9e/c6969e8a5ad1a8c358e333a7242cc30a.jpg",
  },
  {
    name: "Door Controls",
    img: "https://i.pinimg.com/1200x/96/e2/17/96e2179247234868837e6df7527e78c6.jpg",
  },
  {
    name: "Kitchen Accessories",
    img: "https://i.pinimg.com/736x/49/8b/27/498b27a8bfa3affb06fb31a6ec060546.jpg",
  },
  {
    name: "Cabinet Fittings",
    img: "https://i.pinimg.com/736x/9b/f1/30/9bf1302d7cdad79a819482c7819e4f38.jpg",
  },
   {
    name: "Sealants And Adhesives",
    img: "https://i.pinimg.com/736x/8d/d8/92/8dd89271f30a3c925ae72e0265450503.jpg",
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