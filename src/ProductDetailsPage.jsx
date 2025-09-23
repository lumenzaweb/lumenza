import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "./components/SEO";

const allProducts = {
  "security-solution": [
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
      img: "https://i.pinimg.com/736x/1a/7d/0f/1a7d0f38200ea3cfe3853a979086abc1.jpg",
    },
  ],
  "cabinet-fittings": [
    {
      slug: "Cabinet handle",
      name: "Cabinet handle",
      img: "https://i.pinimg.com/736x/58/02/35/5802351522470e7e97abe26b7e43010a.jpg",
    },
    {
      slug: "Wardrobe Lock",
      name: "Wardrobe Lock",
      img: "https://i.pinimg.com/736x/1f/b9/83/1fb983f1b894c1714751c60d47f49c82.jpg",
    },
    {
      slug: "Knob",
      name: "Knob",
      img: "https://i.pinimg.com/736x/ba/dc/7a/badc7aa979675cebb55a042663f3dd55.jpg",
    },
  ],
  "sealants-and-adhesives": [
    {
      slug: "Silicone",
      name: "Silicone",
      img: "https://i.pinimg.com/736x/87/f4/92/87f49227a0c3fd69502837ad63de622c.jpg",
    },
  ],
  "furniture-fittings": [
    {
      slug: "Bed Fittings",
      name: "bed fittings",
      img: "https://i.pinimg.com/736x/58/2e/fe/582efe311f863f94da14d7c7601f4fb7.jpg",
    },
    {
      slug: "Table Bracket",
      name: "table bracket", 
      img: "https://i.pinimg.com/736x/b4/2e/7b/b42e7b357e34a729b27614ace2443d99.jpg",
    },
  ],
};

const gridConfig = {
  "security-solution": "sm:grid-cols-2 md:grid-cols-3",
  "door-controls": "sm:grid-cols-2",
  default: "sm:grid-cols-2 md:grid-cols-3",
};

const ProductDetailsPage = () => {
  const { productName } = useParams();
  const navigate = useNavigate();

  const products = allProducts[productName] || [];
  const gridColsClass = gridConfig[productName] || gridConfig.default;

  return (
    <section className="py-40 sm:py-40 px-8 sm:px-14 bg-gray-50 text-center max-w-6xl mx-auto">
    
    <SEO 
      title="Our Products"
      description="Explore the full range of LUMENZA's premium hardware solutions, including safes, door handles, kitchen accessories, and more." 
    />

    <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="mb-8 w-12 h-12 flex items-center justify-center bg-white text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-md"
      >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>

      <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-10 capitalize">
        {productName.replace(/-/g, " ")}
      </h2>
      {products.length === 0 ? (
        <p className="text-black">No product details found.</p>
      ) : (
        <motion.div
          className={`grid grid-cols-2 ${gridColsClass} gap-6 sm:gap-10 mt-8 mx-auto max-w-5xl justify-center`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
        >
          {products.map(({ name, description, img, slug }) => (
            <Link
              key={slug}
              to={`/product/${productName}/${slug}`}
              className="block max-w-xs mx-auto"
            >
              <motion.div
                className="p-3 sm:p-4 bg-white rounded-lg shadow-lg cursor-pointer h-full flex flex-col"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              >
                <img
                  src={img}
                  alt={name}
                  className="h-48 sm:h-64 w-full object-cover rounded mb-3"
                />
                <h3 className="font-bold text-lg sm:text-xl mb-2">{name}</h3>
                <p className="text-black text-sm sm:text-base flex-grow">
                  {description}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default ProductDetailsPage;
