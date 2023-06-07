import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRatings from "../../components/Elements/StarRatings/StarRatings";
import Button from "../../components/Elements/Button/Button";
import { ProductRatingsType } from "../../types/productTypes";
import { capitalize } from "../../utils/string";
import { useGetSingleProductQuery } from "../../../features/api/productsApi";

type ProductDetailsProps = {
  setRatings: (ratings: ProductRatingsType) => void;
  setDescription: (description: string) => void;
};

const ProductDetails = ({
  setRatings,
  setDescription,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  let { id } = useParams() || "";
  if (id == undefined) {
    id = "";
  }
  const { data, error, isLoading } = useGetSingleProductQuery(id);
  
  if (data?.product) {
    setDescription(data.product.description);
    setRatings(data.product.rating);
  }

  const handleQuantity = (action: string) => {
    if (action === "inc") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    }
  };
  const calcDiscount = (
    previousPrice: number,
    currentPrice: number
  ): number => {
    return Math.round(((previousPrice - currentPrice) / currentPrice) * 100);
  };
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && (
        <div>{data?.message ? data.message : "Something Went Wrong!"}</div>
      )}
      {data && (
        <div className="product-details--wrap">
          <div className="product-details__img-wrap product-details__div">
            <div className="main-product__img--wrap">
              <img
                src={data.product.images[0].url}
                alt="img-main"
                className="main-product__img"
              />
            </div>
            <div className="product-images--container">
              {data.product.images.map((image) => (
                <img
                  src={image.url}
                  alt={image.name}
                  className="product-img--array"
                />
              ))}
            </div>
          </div>
          <div className="product-details__info product-details__div">
            <h1 className="product-details__title">{data.product.name}</h1>
            <div className="ratings--wrapper">
              <StarRatings rating={data.product.rating.value} />
              <span className="rating__count">{`(${data.product.rating.total})`}</span>
            </div>
            <div className="product-details__brand">
              <p>
                Brand :{" "}
                {data.product.brand
                  ? capitalize(data.product.brand)
                  : "Unbranded"}
              </p>
              {data.product.brand && (
                <Link
                  to={`./brand/${data.product.brand}`}
                  className="brand-link"
                >
                  {capitalize(data.product.brand)}
                </Link>
              )}
            </div>
            <div className="product-details__availablity product-details__available">
              <span className="availablity-text">
                {data.product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="product-details__pricing--wrap">
              {data.product?.previousPrice && (
                <span className="previous-price">
                  ${data.product.previousPrice}
                </span>
              )}
              <span className="current-price">${data.product.price}</span>
              {data.product.previousPrice && (
                <span className="discount-percent">
                  {calcDiscount(data.product.previousPrice, data.product.price)}
                  % Discount
                </span>
              )}
            </div>
            <div className="product-details__shipping-price--wrap">
              <p className="shipping-price">+ $12 Shipping Fee</p>
            </div>
            <div className="product-details__quantity-selection--wrap">
              <div className="quantity-selection">
                <button
                  className="quantity-action decrement-quantity"
                  onClick={() => handleQuantity("dec")}
                >
                  -
                </button>
                {quantity}
                <button
                  className="quantity-action increment-quantity"
                  onClick={() => handleQuantity("inc")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="product-details__btn-container">
              <Button className={"cart-btn product-action-btn"}>
                Add To Cart
              </Button>
              <Button className={"buy-btn product-action-btn"}>Buy Now</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
