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

const Cart = ({ setCartState, cartState }: CartProps) => {
  return (
    <Sidebar
      showSidebar={cartState}
      sidebarResponsiveClass="cart-sidebar"
      className="cart--wrapper"
    >
      {cartState && <SidebarCloseButton setShowButton={setCartState} />}
      <div className="cart__content-wrap">
        <div className="cart-items-container cart__content-padding">
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
          <CartItem/>
        </div>
        <div className="cart__summary cart__content-padding">
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

export default Cart;
