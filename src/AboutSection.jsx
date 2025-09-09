import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => (
  <section
    id="about"
    className="py-20 px-4 bg-red-50 flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-7xl mx-auto"
  >
    {/* Left: Text Content */}
    <motion.div
      className="md:w-2/3 flex flex-col"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, type: "spring", stiffness: 120 }}
    >
      <h3 className="flex items-center gap-6 mb-4 text-3xl font-bold text-red-600">
        Welcome to LUMENZA – Where Innovation Meets Elegance
      </h3>

      <p className="text-gray-800 text-lg mb-4">
        LUMENZA is a leading name in premium home hardware, known for delivering a wide range of high-quality products Supply to elevate every home. From functional kitchen accessories to sophisticated door handles, handles, stylish bathroom accessories, and advanced safe locks, LUMENZA offers a variety of hardware solutions that bring both style and security to your space.
      </p>

      <h3 className="text-3xl font-bold text-red-600 mb-6">Who We Are !</h3>
      <p className="text-gray-800 text-lg mb-4">
        At LUMENZA - " The art of smooth living " we curate and supply premium architectural hardware that transforms everyday spaces into expressions of elegance and strength. We partner with trusted manufacturers to bring you a carefully selected range of  "door handles, Safes/Lockers, kitchen accessories, and bathroom accessories" — all chosen for their style, durability, and performance.
      </p>

      <p className="text-gray-800 text-lg mb-4">
        Our goal is simple: to deliver high-quality products that meet modern design standards and real-world functionality. Whether you're designing a home, upgrading a workspace, or building from the ground up, Lumenza is your reliable source for hardware that blends aesthetics with assurance .
      </p>

      <p className="text-gray-800 text-lg mb-4">
        We're not just suppliers — we're collaborators in your design journey. Backed by deep industry knowledge and a passion for excellence, Lumenza ensures you get the right products, the right finish, and the right experience — every time.
      </p>

      <h3 className="text-3xl font-bold text-red-600 mb-6">Our Philosophy :</h3>
      <p className="text-gray-800 text-lg mb-4">
        At LUMENZA, we believe that hardware should do more than serve a purpose — it should inspire, perform, and enhance. Every product we supply is chosen with a commitment to three core principles:
      </p>

      <ul className="list-disc list-outside pl-6 text-gray-800 text-lg mb-4 space-y-4 leading-relaxed">
        <li><strong>Innovation:</strong> We stay ahead of trends and technology to bring you smart, forward-thinking hardware solutions that meet the needs of modern living and design.</li>
        <li><strong>Functionality :</strong>  Our products are built to work — smoothly, silently, and reliably. Every hinge, handle, or lock we offer is engineered for real-life performance and lasting comfort.</li>
        <li><strong>Aesthetic Excellence :</strong> Beauty is never an afterthought. From sleek minimalist handles to refined bathroom accessories, we select designs that elevate the feel of every room.</li>
      </ul>

      <h3 className="text-3xl font-bold text-red-600 mb-6">Our Product Range :</h3>
      <p className="text-gray-800 text-lg mb-4">
        At LUMENZA, we offer a thoughtfully curated selection of premium hardware and accessories designed to enhance both form and function in modern interiors. Our range includes :
      </p>

      <ul className="list-disc list-inside text-gray-800 text-lg mb-4">
        <li>Kitchen Trolleys Maximize space and efficiency with smart, durable pull-out trolleys — crafted for convenience, smooth operation, and stylish integration into modular kitchens.</li>
        <li>Door Handles/Handles From sleek cabinet handles to bold main door handles, our collection combines ergonomic design with striking finishes for a flawless grip and a lasting impression.</li>
        <li>Bathroom Accessories Refined fixtures like towel racks, robe hooks, and soap trays — made from rust-resistant materials and designed to bring elegance and order to your daily routines.</li>
        <li>Safes / Locker Secure your valuables in style. Our safes and lockers are compact, robust, and thoughtfully designed for both home and commercial use.</li>
      </ul>

      <h3 className="text-3xl font-bold text-red-600 mb-6">Our Commitment to Quality :</h3>
      <p className="text-gray-800 text-lg mb-4">
        At LUMENZA, quality isn't a feature — it's a promise. Every product we supply is carefully selected to meet the highest standards of "durability, functionality, and design excellence".
      </p>

      <p className="text-gray-800 text-lg mb-4">
        We collaborate only with trusted manufacturers who share our vision for " precision engineering and premium craftsmanship". From the strength of our door and cabinet handles to the smooth performance of our kitchen trolleys, each item undergoes rigorous quality checks to ensure long-lasting reliability.
      </p>

      <p className="text-gray-800 text-lg mb-4">
        What sets Lumenza apart is our attention to the details others overlook — rust resistance, smooth finishes, silent operation, and aesthetic harmony. Whether for homes, offices, or commercial projects, our products are built to perform beautifully, every day.
      </p>

      <p className="text-gray-800 text-lg mb-4">
        Because at LUMENZA, " quality isn't optional — it's the foundation of everything we offer."
      </p>

      <h3 className="text-3xl font-bold text-red-600 mb-6">Why LUMENZA !</h3>
      <p className="text-gray-800 text-lg mb-4">
        At LUMENZA, we go beyond just supplying hardware — we deliver confidence, style, and performance you can trust. Here's why customers, architects, and interior designers choose us:
      </p>

      <ul className="list-disc list-inside text-gray-800 text-lg mb-4">
        <li>Curated Quality We handpick every product from reliable manufacturers, ensuring it meets our standards for durability, precision, and design excellence.</li>
        <li>Modern Aesthetics From minimalist to bold finishes, our hardware is designed to complement contemporary interiors and elevate every space.</li>
        <li>Function Meets Style Our range blends smart functionality with visual appeal — smooth slides, strong locks, ergonomic handles, and elegant fittings.</li>
        <li>Wide Product Range One destination for all your hardware needs — including kitchen trolleys, door handles, bathroom accessories, and lockers.</li>
        <li>Trusted by Professionals Preferred by architects, designers, and contractors who rely on Lumenza for dependable products and consistent service.</li>
        <li>Customer-Centric Support We're committed to guiding you from selection to installation, with expert advice and responsive after-sales support.</li>
      </ul>

      <p className="text-gray-800 text-lg mb-4">
        "LUMENZA — where every detail is built with purpose, and designed to impress."
      </p>
    </motion.div>

    {/* Right: Modern Images Grid */}
    <motion.div
      className="md:w-1/3 flex flex-col"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, type: "spring", stiffness: 120 }}
    >
      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <img
          src="https://i.pinimg.com/736x/97/06/52/970652e99fc7b6f1802451016ed78511.jpg"
          alt="locker"
          className="rounded-xl shadow-lg object-cover w-full h-52"
          loading="lazy"
        />
        <img
          src="https://i.pinimg.com/736x/5f/53/e0/5f53e07e9ec563358c7a444670af04a7.jpg"
          alt="Door closer satin"
          className="rounded-xl shadow-lg object-cover w-full h-52"
          loading="lazy"
        />
        <img
          src="https://i.pinimg.com/736x/32/40/b6/3240b6dc2aaaff124a746c207fa75796.jpg"
          alt="Premium door mortise"
          className="rounded-xl shadow-lg object-cover w-full h-52"
          loading="lazy"
        />
        <img
          src="https://i.pinimg.com/736x/fc/7a/42/fc7a4246426601ed91fffd1fd4813931.jpg"
          alt="lockbody"
          className="rounded-xl shadow-lg object-cover w-full h-52"
          loading="lazy"
        />
        <img
          src="https://i.pinimg.com/736x/8b/28/c0/8b28c0f5f6edd45fc7c4b29a99cb03f3.jpg"
          alt="Kitchen baskets"
          className="rounded-xl shadow-lg object-cover w-full h-52"
          loading="lazy"
        />
        <img
          src="https://i.pinimg.com/736x/43/0f/19/430f199700551bdfc39c4ec1a0771016.jpg"
          alt="designer knob"
          className="rounded-xl shadow-lg object-cover w-full h-52"
          loading="lazy"
        />
      </div>

      {/* Join the Family block */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold text-red-600 mb-4">Join LUMENZA Family</h4>
        <p className="text-gray-800 text-lg mb-4">
          At LUMENZA, we don't just supply products — we build lasting relationships. Whether you're a homeowner transforming your space, an interior designer chasing perfection, or a builder in search of reliability, there's a place for you in the Lumenza family.
        </p>
        <p className="text-gray-800 text-lg mb-4">
          When you choose us, you're choosing more than quality hardware — you're choosing a partner committed to "style, trust, and long-term value."
        </p>
        <ul className="list-disc list-inside text-gray-800 text-lg mb-4">
          <li>Stay inspired with new designs</li>
          <li>Get personalized support and recommendations</li>
          <li>Be part of a community that values craftsmanship and innovation</li>
        </ul>
        <p className="text-gray-800 text-lg mb-4">
          "Join LUMENZA Family — and let's create beautiful, secure, and functional spaces together."
        </p>
      </div>

      {/* The Promise block */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-2xl font-bold text-red-600 mb-4">LUMENZA Promise</h4>
        <p className="text-gray-700 text-lg mb-2">
          Our commitment is reflected in every detail. Whether it's the smooth finish of a luxury handle or the silent precision of our kitchen fittings, we deliver products that set the standard for craftsmanship.
        </p>
        <p className="text-gray-700 text-lg mb-2">
          Every image above shows our real products in use—refined, robust, and ready to elevate your next project. From Stunning Door Hardware, Security Solution to Modern Bathroom Accessories, our catalogue is curated for those who want spaces that impress.
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-2">
          <li>Each piece is rigorously tested for durability and safety</li>
          <li>Stylish finishes to match every interior concept</li>
          <li>Delivered with expert guidance and customer care</li>
        </ul>
        <p className="text-gray-700 text-[17px]">
          With LUMENZA, you don't just get hardware—you join a family dedicated to beauty, strength and trust.
        </p>
      </div>
    </motion.div>
  </section>
);

export default AboutSection;
