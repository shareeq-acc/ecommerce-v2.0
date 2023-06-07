import { Link } from "react-router-dom";
import StarRatings from "../StarRatings/StarRatings";
import image from "../../../../assets/images/iphone-14-pro-max.png";
import { ProductType } from "../../../types/productTypes";
import { capitalize } from "../../../utils/string";

type ProductCardProps = {
  className?: string;
  product: ProductType;
};

const ProductCard = ({ className, product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className={`product-card ${className ? className : ""}`}
    >
      <div className="product-card__img--wrap">
        <img
          src={product.images[0].url}
          alt={product.images[0].name}
          className="product-card__img"
        />
      </div>
      <div className="product-card__info">
        <h4 className="product-card__title">{capitalize(product.name)}</h4>
        {product.brand && (
          <span className="product-brand">{capitalize(product.brand)}</span>
        )}
        <div className="product-card__rating">
          <StarRatings rating={product.rating.value} />
          <span className="card-rating__count">{`(${product.rating.total})`}</span>
        </div>
        <span className="product-card__price">${product.price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
