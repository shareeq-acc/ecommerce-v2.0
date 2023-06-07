import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Sidebar from "../Sidebar/Sidebar";
import SidebarCloseButton from "../Sidebar/SidebarCloseButton";
import CartItem from "./CartItem";

import "swiper/css";
import "swiper/css/scrollbar";

type CartProps = {
  setCartState: (value: Boolean) => void;
  cartState: Boolean;
};

const NewCart = ({ setCartState, cartState }: CartProps) => {
  return (
    <Sidebar
      showSidebar={cartState}
      sidebarResponsiveClass="cart-sidebar"
      className="cart--wrapper"
    >
      {cartState && <SidebarCloseButton setShowButton={setCartState} />}
      <div className="cart__content-wrap">
        <div className="cart-items-container">
          <Swiper
            direction="vertical"
            className="cart_items_slider"
            // navigation
            spaceBetween={70}
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              350: {
                slidesPerView: 4,
              },
              576: {
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 6,
              },
            }}
          >
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
            <SwiperSlide className="cart__slide">
              <CartItem />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="cart__summary">
          <span className="cart-total">Total: $109</span>
          <Button className="checkout-btn cart__summary-btn">
            <Link
              to={"/checkout"}
              onClick={() => setCartState(cartState ? false : true)}
            >
              Proceed
            </Link>
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default NewCart;
