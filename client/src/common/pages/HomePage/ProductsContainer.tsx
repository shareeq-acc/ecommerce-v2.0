import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "../../components/Elements/ProductCard/ProductCard";
import { capitalize } from "../../utils/string";
import { ProductContainerType } from "../../types/productTypes";

export type ProductsContainerProps = {
  data: ProductContainerType;
};

const ProductsContainer = ({ data }: ProductsContainerProps) => {
  return (
    <div className="products-container section--margin">
      <h2 className="products-container__title">{capitalize(data.title)}</h2>
      <div className="products-wrap">
        <Swiper
          className="product--swiper"
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            500: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 4,
            },
            1500: {
              slidesPerView: 5,
            },
            1900: {
              slidesPerView: 6,
            },
          }}
        >
          {data.products.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsContainer;
