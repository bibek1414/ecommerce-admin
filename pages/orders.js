import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {!isLoading && orders.length > 0 && orders.map(order => order.line_items.map((item, index) => (
            <tr key={order._id + '-' + index}>
              {index === 0 && (
                <>
                  <td rowSpan={order.line_items.length}>{(new Date(order.createdAt)).toLocaleString()}</td>
                  <td rowSpan={order.line_items.length}>
                    {order.name} {order.email}<br />
                    {order.city} {order.postalCode} {order.country}<br />
                    {order.streetAddress}
                  </td>
                </>
              )}
              <td>
                {item.price_data?.product_data.name}
              </td>
              <td>
                {item.quantity}
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </Layout>
  );
}
