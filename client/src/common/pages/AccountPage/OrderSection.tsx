import { formatDate } from "../../utils/date";
import { limitCharacters } from "../../utils/string";
import { data } from "./data";

const OrderSection = () => {
  return (
    <div className="order-section">
      <div className="orders__details-wrap">
        <div className="orders-table--wrap">
          <table className="orders-table table">
            <tr className="orders-table__row table-row orders-table__top-row">
              <th className="orders-table__head table-head">Date</th>
              <th className="orders-table__head table-head">Order Id</th>
              <th className="orders-table__head table-head">Payment</th>
              <th className="orders-table__head table-head">Shipping</th>
              <th className="orders-table__head table-head">Amount</th>
              <th className="orders-table__head table-head">Status</th>
            </tr>
            {data?.length > 0 &&
              data.map((order, index) => (
                <tr
                  className={`orders-table__row table-row ${
                    index % 2 === 0 ? "white-bg" : ""
                  }`}
                  key={index}
                >
                  <td
                    className="orders-table__data table-data"
                    data-label="Date"
                  >
                    {formatDate(order.createdAt)}
                  </td>
                  <td
                    className="orders-table__data table-data"
                    data-label="Order Id"
                  >
                    {limitCharacters(order._id, 12)}
                  </td>
                  <td
                    className="orders-table__data table-data"
                    data-label="Payment"
                  >
                    {order.paymentMethod.toUpperCase()}
                  </td>
                  <td
                    className="orders-table__data table-data"
                    data-label="Shipping"
                  >
                    {`$${order.shippingPrice}`}
                  </td>
                  <td
                    className="orders-table__data table-data"
                    data-label="Amount"
                  >
                    {`$${order.total}`}
                  </td>
                  <td
                    className="orders-table__data table-data"
                    data-label="Status"
                  >
                    {order.status.toUpperCase()}
                  </td>
                </tr>
              ))}
          </table>
          {data.length === 0 && (
            <div className="page__error-message order-page__error-message">
              No Orders
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
