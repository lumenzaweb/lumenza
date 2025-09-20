import React from "react";
import ProductsSection from "../ProductsSection";
import SEO from "./components/SEO";

const ProductsPage = () => {
  return (
    <div className="font-bold pt-20">
      <SEO 
      title="Our Products"
      description="Explore the full range of LUMENZA's premium hardware solutions, including safes, door handles, kitchen accessories, and more." 
    />
      <ProductsSection />
    </div>
  );
};

export default ProductsPage;
