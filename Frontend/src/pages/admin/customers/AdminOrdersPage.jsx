import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header"

function AdminOrdersPage({ type = "Pending" }) {
  const [orders, setOrders] = useState([]);

  const endpointMap = {
    Pending: "all",
    Shipped: "shipped",
    Delivered: "delivered",
  };

  useEffect(() => {
    axios
      .get(`https://bookstore-app-backend-tzhy.onrender.com/orders/admin/orders/${endpointMap[type]}`)
      .then((res) => setOrders(res.data))
      .catch((err) => toast.error("Failed to load orders"));
  }, [type]);

  const markShipped = async (id) => {
    await axios.put(`https://bookstore-app-backend-tzhy.onrender.com/orders/admin/orders/${id}/mark-shipped`);
    toast.success("Marked as Shipped");
    setOrders(orders.filter(order => order._id !== id));
  };

  const markDelivered = async (id) => {
    await axios.put(`https://bookstore-app-backend-tzhy.onrender.com/orders/admin/orders/${id}/mark-delivered`);
    toast.success("Marked as Delivered");
    setOrders(orders.filter(order => order._id !== id));
  };

  return (
    <div className="flex pt-8">
      <Sidebar />
      <div className="ml-2 lg:ml-64 w-full px-6 py-4 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-[20%_80%] sm:grid-cols-[10%_90%] lg:grid-cols-1 justify-center items-center mb-10 ">
          <Header />
          <h1 className="text-lg sm:text-xl lg:text-xl font-bold text-pink-600 text-center ">{type} Orders</h1>
        </div>

        {orders.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No {type.toLowerCase()} orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={order._id} className="bg-white p-6 rounded-xl shadow border">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold">Order #{index + 1}</h2>
                    <p className="text-xs md:text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  {type === "Pending" && (
                    <button
                      onClick={() => markShipped(order._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 text-sm md:text-lg"
                    >
                      Mark as Shipped
                    </button>
                  )}

                  {type === "Shipped" && (
                    <button
                      onClick={() => markDelivered(order._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 text-sm md:text-lg"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-gray-700 mb-4 text-xs sm:text-sm md:text-base">
                  <p><strong>Name:</strong> {order.customer?.name}</p>
                  <p><strong>Phone:</strong> {order.customer?.phone}</p>
                  <p><strong>Address:</strong> {order.customer?.address}</p>
                </div>

                <ul className="divide-y divide-gray-100 mb-4 text-sm sm:text-base md:text-lg">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between py-1">
                      <span>{item.bookId?.name || "Unknown"} × {item.quantity}</span>
                      <span>₹{item.bookId?.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-right font-bold text-pink-600 text-sm sm:text-base md:text-lg">
                  Total: ₹{order.total}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrdersPage;
