const Reciept = () => {
  return (
    <div className="order-reciept">
      <h2 className="order-reciept__title">Order Summary</h2>
      <div className="order-reciept__summary order-reciept__details">
        <p className="order-reciept__field">
          Shipping
          <span className="order-reciept__charges">$7</span>
        </p>
        <p className="order-reciept__field">
          Charges
          <span className="order-reciept__charges">$0</span>
        </p>
        <p className="order-reciept__field">
          Subtotal
          <span className="order-reciept__charges">$80</span>
        </p>
      </div>
      <div className="order-reciept__total order-reciept__details">
        <p className="order-reciept__field">
          Total
          <span className="order-reciept__charges">$87</span>
        </p>
      </div>
    </div>
  );
};

export default Reciept;
