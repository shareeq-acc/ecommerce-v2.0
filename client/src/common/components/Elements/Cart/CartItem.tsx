import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import image from "../../../../assets/images/razer-viper-mini.jpg";

const CartItem = () => {
  return (
    <div className="cart-item">
      <div className="cart__img-wrap">
        <img src={image} alt="cart-img" className="cart-item__img" />
      </div>
      <div className="cart-item__info-wrap">
        <h3 className="card-item__title">
          Razer Viper Mini Ultra Light Gaming Mouse
        </h3>

        <span className="card-item__price">Price: $10</span>
        <span className="card-item__quantity">Quantity x 2</span>
        <span className="card-item__shipping-price">Shipping: $6</span>
        <div className="card-item__total">
          {/* <span>Total</span>
            <span>26$</span> */}
          Total: $26
        </div>
      </div>
      <FontAwesomeIcon icon={faTrashCan} className="card-item__delete-icon" />
    </div>
  );
};

export default CartItem;
