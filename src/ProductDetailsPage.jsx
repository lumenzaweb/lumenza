import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const allProducts = {
  "Security Solution": [
    {
      slug: "Secure Lite",
      name: "Secure Lite",
      img: "https://i.pinimg.com/736x/8a/11/80/8a118042d769d824337062254afb1dc5.jpg",
    },
    {
      slug: "Secure X",
      name: "Secure X",
      img: "https://i.pinimg.com/736x/97/06/52/970652e99fc7b6f1802451016ed78511.jpg",
    },
    {
      slug: "Secure ECO",
      name: "Secure ECO",
      img: "https://i.pinimg.com/736x/a8/cb/55/a8cb550207666bf46490a4e56938e895.jpg",
    },
  ],
  "door-controls": [
    {
      slug: "Mortise",
      name: "Mortise",
      img: "https://i.pinimg.com/736x/19/79/94/1979943f69cb01aebd0964e932aec1dd.jpg",
    },
    {
      slug: "Door Closer",
      name: "Door Closer",
      img: "https://i.pinimg.com/736x/2a/8b/78/2a8b787210cb5f27fc5eba008538ab60.jpg",
    },
  ],
  "kitchen-accessories": [
    {
      slug: "Wire basket",
      name: "Wire basket",
      img: "https://i.pinimg.com/736x/a5/7f/7d/a57f7dd914d11a58cc317d845426fb68.jpg",
    },
    {
      slug: "Sheet basket",
      name: "Sheet basket",
      img: "https://i.pinimg.com/736x/2a/e9/e8/2ae9e866d0bf834b6c4d0623267d9f13.jpg",
    },
    {
      slug: "Profile handle",
      name: "Profile handle",
      img: "https://i.pinimg.com/736x/a7/7e/52/a77e52b4b892f38092ba5f7954e1d2c6.jpg",
    },
  ],
  "cabinet-fittings": [
    {
      slug: "Cabinet handle",
      name: "Cabinet handle",
      img: "https://i.pinimg.com/736x/7b/8b/8a/7b8b8a3aae3becd96e032b9fe651b1bb.jpg",
    },
    {
      slug: "Wardrobe Lock",
      name: "Wardrobe Lock",
      img: "https://i.pinimg.com/736x/1f/b9/83/1fb983f1b894c1714751c60d47f49c82.jpg",
    },
    {
      slug: "Knob",
      name: "Knob",
      img: "https://i.pinimg.com/1200x/ac/b7/81/acb7811d09d259daa26b5e77470395ba.jpg",
    },
  ],
   "sealants-and-adhesives": [
    {
      slug: "Silicone",
      name: "Silicone",
      img: "https://i.pinimg.com/736x/87/f4/92/87f49227a0c3fd69502837ad63de622c.jpg",
    },
    {
      slug: "Rubber adhesive",
      name: "Rubber adhesive",
      img: "https://i.pinimg.com/736x/38/7f/9c/387f9cb14f449a93f98a389d7f45cc50.jpg",
    },
    {
      slug: "Wood adhesive",
      name: "Wood adhesive",
      img: "https://i.pinimg.com/736x/38/7f/9c/387f9cb14f449a93f98a389d7f45cc50.jpg",
    },
  ],
  "ply": [
    {
      slug: "Ply",
      name: "Ply",
      img: "https://i.pinimg.com/736x/38/7f/9c/387f9cb14f449a93f98a389d7f45cc50.jpg",
    },
  ],
  // Add more categories if needed
};

const gridConfig = {
  "security-solution": "grid-cols-3 justify-center",
  "door-controls": "grid-cols-2 justify-center",
  default: "grid-cols-3 justify-center",
};

const ProductDetailsPage = () => {
  const { productName } = useParams();
  const navigate = useNavigate();

  const products = allProducts[productName] || [];
  const gridColsClass = gridConfig[productName] || gridConfig.default;

  return (
    <section className="py-40 px-12 bg-gray-50 text-center max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-3 py-2 bg-red-500 text-white rounded hover:bg-black transition"
      >
        ← back
      </button>
      <h2 className="text-4xl font-bold mb-10 capitalize">
        {productName.replace(/-/g, " ")}
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No product details found.</p>
      ) : (
        <motion.div
          className={`grid gap-10 mt-8 ${gridColsClass} mx-auto max-w-5xl`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
        >
          {products.map(({ name, description, img, slug }, idx) => (
            <Link key={slug} to={`/product/${productName}/${slug}`} className="block">
              <motion.div
                className="p-2 bg-white rounded-lg shadow-lg cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              >
                <img src={img} alt={name} className="h-90 w-full object-cover rounded mb-2" />
                <h3 className="font-bold text-xl mb-2">{name}</h3>
                <p className="text-gray-700 text-base">{description}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default ProductDetailsPage;
