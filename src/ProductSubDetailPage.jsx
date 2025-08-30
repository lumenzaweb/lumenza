import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ==================== Product Data ====================
const productData = {
  "Secure Lite": {
    name: "Secure Lite",
    description: "Our Secure Lite safes provide reliable protection in a compact size.",
    images: [
      "https://i.pinimg.com/736x/4e/2d/0f/4e2d0f7d12e5d41c2901d7ecf8ed8a38.jpg",
      "https://i.pinimg.com/736x/33/21/67/33216729b65c1dcaf149048393ca5c7c.jpg",
    ],
    features: ["Compact design", "Solid steel construction", "Secure lock"],
    finishes: ["Matte Black", "Silver"],
  },
  "Secure X": {
    name: "Secure X",
    description: "Advanced security safes with biometric locking system.",
    images: [
      "https://i.pinimg.com/736x/1d/13/bd/1d13bd28930b9f869d39f4da394c60d3.jpg",
      "https://i.pinimg.com/736x/70/c8/fd/70c8fdf3103f46c1b25a05ab8e9f91e4.jpg",
    ],
    features: ["Biometric lock", "Tamper-proof design", "Fire resistant"],
    finishes: ["Matte Black", "Stainless Steel"],
  },
  "Secure ECO": {
    name: "Secure ECO",
    description: "Affordable safes with dependable protection.",
    images: [
      "https://i.pinimg.com/736x/26/73/21/2673212580c4414e53f5c2a9ee16d2c7.jpg",
      "https://i.pinimg.com/736x/f6/6d/2d/f66d2d4a5d8729791c7c1f7a96405fae.jpg",
    ],
    features: ["Cost-effective", "Durable steel body", "Easy installation"],
    finishes: ["Gray", "White"],
  },

  Mortise: {
    name: "Mortise Locks",
    description: "High-quality mortise locks with multiple finishes.",
    details: [
      {
        img: "https://i.pinimg.com/736x/bf/5c/f4/bf5cf4a2c0e69e87f836c4e04ff0ed5a.jpg",
        description: (
          <>
            <h3 className="font-semibold text-center text-2xl">LM - 3101</h3>
            <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
              <li>Satin + CP Finish</li>
              <li>Rose Gold + Black Finish</li>
              <li>PVD Gold + Black Finish</li>
            </ul>
          </>
        ),
      },
      {
        img: "https://i.pinimg.com/736x/9c/7b/1c/9c7b1cbd2b85f66a1e89b7f12357d260.jpg",
        description: (
          <>
            <h3 className="font-semibold text-center text-2xl">LM - 3102</h3>
            <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
              <li>Satin + CP Finish</li>
              <li>BL Satin + BL Nickel Finish</li>
              <li>PVD Gold + Z.Black Finish</li>
            </ul>
          </>
        ),
      },
      {
        img: "https://i.pinimg.com/736x/18/39/e2/1839e2df7ebbb6e0a57b6ac7ce5e671c.jpg",
        description: (
          <>
            <h3 className="font-semibold text-center text-2xl">LM - 3103</h3>
            <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
              <li>Satin + CP Finish</li>
              <li>Rose Gold + Black Finish</li>
              <li>PVD Gold + Black Finish</li>
            </ul>
          </>
        ),
      },
      {
        img: "https://i.pinimg.com/736x/28/23/5a/28235a6f218f0f5052436e0c6f4371ab.jpg",
        description: (
          <>
            <h3 className="font-semibold text-center text-2xl">LM - 3104</h3>
            <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
              <li>Satin + CP Finish</li>
              <li>Rose Gold + Black Finish</li>
              <li>PVD Gold + Black Finish</li>
            </ul>
          </>
        ),
      },
      {
        img: "https://i.pinimg.com/736x/63/72/2f/63722f36b414c7111e2cb410b0706c85.jpg",
        description: (
          <>
            <h3 className="font-semibold text-center text-2xl">LM - 3105</h3>
            <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
              <li>Satin + CP Finish</li>
              <li>Rose Gold + Black Finish</li>
              <li>PVD Gold + Black Finish</li>
            </ul>
          </>
        ),
      },
      {
        img: "https://i.pinimg.com/736x/06/8b/f0/068bf063d2d0b5b8b281f2b21ac6a1d5.jpg",
        description: (
          <>
            <h3 className="font-semibold text-center text-2xl">LOCKBODY</h3>
            <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
              <li>55mm</li>
              <li>60mm</li>
              <li>70mm</li>
            </ul>
          </>
        ),
      },
      {
        img: "https://i.pinimg.com/736x/a8/d7/a5/a8d7a517f73b18aec13c16b48b3f78f6.jpg",
        description: (
          <>
            <h3 className="font-semibold text-center text-2xl">CYLINDER</h3>
            <ul className="list-disc list-inside text-gray-800 ml-2 mt-1">
              <li>S.S. MATT Finish</li>
              <li>B. ANTIK Finish</li>
              <li>Z BLACK Finish</li>
            </ul>
          </>
        ),
      },
    ],
  },
};

// ==================== Component ====================
const ProductSubDetailPage = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const product = productData[productName];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-700 bg-gray-100 p-8">
        <p className="text-2xl mb-6">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // If product has images (gallery layout)
  if (product.images) {
    return (
      <main className="py-20 px-10 min-h-screen bg-gray-50 flex flex-col">
        <button
          onClick={() => navigate(-1)}
          className="self-center mt-28 mb-8 px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition shadow-md"
        >
          ← Back
        </button>
        <section className="flex flex-col md:flex-row flex-1 gap-8 max-w-full overflow-hidden px-4">
          {/* Image Gallery Section */}
          <div className="flex flex-col items-center w-full md:w-1/3 max-w-md mx-auto">
            <div className="w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg mb-4 border border-gray-300">
              <img
                src={product.images[currentImageIdx]}
                alt={`${product.name} variant ${currentImageIdx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 w-full">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-4 ${
                    idx === currentImageIdx
                      ? "border-white-700"
                      : "border-transparent hover:border-green-400"
                  } transition-colors duration-300 focus:outline-none`}
                  aria-label={`View variant ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex-1 max-w-3xl flex flex-col overflow-auto">
            <h1 className="text-2xl md:text-5xl font-extrabold mb-6 text-gray-900">
              {product.name}
            </h1>
            <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Features
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-600 list-disc list-inside">
              {product.features.map((feature, idx) => (
                <li key={idx} className="text-base">
                  {feature}
                </li>
              ))}
            </ul>

            {product.finishes && product.finishes.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Finishes
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-gray-600 list-disc list-inside">
                  {product.finishes.map((finish, idx) => (
                    <li key={idx} className="text-base">
                      {finish}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {product.productDetails && product.productDetails.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mt-5 mb-3 text-gray-800">
                  Available Variants & Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {product.productDetails.map((productDetail, idx) => (
                    <div
                      key={idx}
                      className="p-1 bg-white rounded-lg shadow-md border border-gray-200 flex items-center space-x-2"
                      tabIndex={0}
                    >
                      <img
                        src={productDetail.image}
                        alt={productDetail.title}
                        className="w-25 h-24 object-cover rounded-lg flex-shrink-1"
                      />
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {productDetail.title}
                        </h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {productDetail.specs.map((spec, sIdx) => (
                            <li key={sIdx} className="text-sm">
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* PDF Download Box for ALL products */}
        <section className="mt-16 max-w-4xl mx-auto p-6 bg-red-100 border-2 border-red-700 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 text-red-900">
            Download Our Product Catalog
          </h2>
          <p className="mb-6 text-red-800">
            Get all product details and specifications in one handy PDF file.
          </p>
          <a
            href="https://1drv.ms/b/c/787E0745D45C1EC6/EfjLRCDiQsFHo_i176e9iTcBKRdVrpzUGYTxI4GdsSqnvQ?e=24JQyW"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full md:inline-block md:w-auto px-6 py-3 bg-red-700 text-white font-bold rounded hover:bg-red-800 transition">
            Download PDF
          </a>
        </section>
      </main>
    );
  }

  // If product has details (grid layout)
  if (product && product.details && product.details.length > 0) {
    return (
      <main className="py-45 px-15 min-h-screen bg-gray-50 flex flex-col">
        <button
          onClick={() => navigate(-1)}
          className="self-center mt-28 mb-8 px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition shadow-md"
        >
          ← Back
        </button>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-10xl mx-auto">
          {product.details.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[247px]"
            >
              <img
                src={item.img}
                alt={`${product.name} detail ${idx + 1}`}
                className="w-80 h-60 object-cover min-h-full"
              />
              <div className="flex-1 flex items-center justify-center px-1 py-1 bg-gray-50 min-h-full">
                <p className="text-gray-800 text-lg">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* PDF Download Box */}
        <section className="mt-16 max-w-4xl mx-auto p-6 bg-red-100 border-2 border-red-700 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 text-red-900">
            Download Our Product Catalog
          </h2>
          <p className="mb-6 text-red-800">
            Get all product details and specifications in one handy PDF file.
          </p>
          <a
            href="https://1drv.ms/b/c/787E0745D45C1EC6/EfjLRCDiQsFHo_i176e9iTcBKRdVrpzUGYTxI4GdsSqnvQ?e=24JQyW"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-red-700 text-white font-bold rounded hover:bg-red-800 transition"
          >
            Download PDF
          </a>
        </section>
      </main>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-gray-700 bg-gray-100 p-8">
      <p className="text-2xl mb-6">Product not found.</p>
      <button
        onClick={() => navigate(-1)}
        className="px-5 py-3 bg-red-800 text-white rounded-lg hover:bg-black transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default ProductSubDetailPage;