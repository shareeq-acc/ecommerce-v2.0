import { useState } from "react";
import ProductDetails from "./ProductDetails";
import ReviewsContainer from "./ReviewsContainer";
import { ProductRatingsType } from "../../types/productTypes";
import ProductDescription from "./ProductDescription";

const ProductPage = () => {
  const [activeSection, setActiveAction] = useState<number>(1);
  const [productDescription, setProductDescription] = useState<string>("");
  const [productRatings, setProductRatings] = useState<ProductRatingsType>({
    total: 0,
    value: 0,
  });
  return (
    <div className="product-page container--padding section--margin">
      <ProductDetails
        setRatings={setProductRatings}
        setDescription={setProductDescription}
      />
      <div className="tab--wrapper section--margin">
        <button
          className={`tab btn ${activeSection === 1 && "active"}`}
          onClick={() => setActiveAction(1)}
        >
          Description
        </button>
        <button
          className={`tab btn ${activeSection === 2 && "active"}`}
          onClick={() => setActiveAction(2)}
        >
          Reviews
        </button>
      </div>
      {activeSection === 1 && (
        <div>
          <ProductDescription description={productDescription} />
        </div>
      )}
      {activeSection === 2 && (
        <div>
          <ReviewsContainer/>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
