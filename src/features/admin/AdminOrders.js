import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllOrders,
  selectTotalOrdersNo,
  fetchAllOrdersAsync,
} from "../order/orderSlice";
import { useEffect } from "react";
import { updateOrderAsync } from "../order/orderSlice";
import Pagination from "../pagination/Pagination";

export default function AdminOrders() {
  const [pageArr, setPageArr] = useState([{ _page: 1 }, { _limit: 2 }]);
  const orders = useSelector(selectAllOrders);
  const totalOrders = useSelector(selectTotalOrdersNo);
  const dispatch = useDispatch();

  const handlePagination = (pageNo, limit) => {
    if (limit !== 0 && pageNo !== 0) {
      const newPageArr = [{ _page: pageNo }, { _limit: limit }];
      setPageArr(newPageArr);
    }
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync(pageArr));
  }, [dispatch, pageArr]);

  const [editOrder, setEditOrder] = useState(false);

  const handleView = (orderId) => {
    console.log("view");
  };
  const handleOrder = (e, order) => {
    const status = e.target.value;
    setEditOrder(false);
    const newOrder = { ...order, status };
    dispatch(updateOrderAsync(newOrder));
  };

  const chooseColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-200 text-black-400";
      case "approved":
        return "bg-blue-200 text-black-400";
      case "cancelled":
        return "bg-red-200 text-black-400";
      case "pending":
        return "bg-yellow-200 text-black-400";
      case "dispatched":
        return "bg-gray-300 text-black-500";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-centerfont-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="md:table-auto w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
                    <th className="py-3 px-6 text-left">Order#</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Subtotal</th>
                    <th className="py-3 px-6 text-left">Customer Details</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.length > 0 &&
                    orders.map((order) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex flex-col">
                            {order.items.map((item) => (
                              <div className="flex felx-row">
                                <img
                                  className="w-6 h-6 mr-2 rounded-full"
                                  src={item.thumbnail}
                                  alt={item.title}
                                />
                                <span>{item.title}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            ${order.totalPrice}
                          </div>
                        </td>

                        <td className="py-3 px-6">
                          <div className="flex flex-col">
                            <p>{order.selectedAddress.name}</p>
                            <p>{order.selectedAddress.email}</p>
                            <p>
                              {order.selectedAddress.street},{" "}
                              {order.selectedAddress.city}
                            </p>
                            <p>
                              {order.selectedAddress.state},{" "}
                              {order.selectedAddress.zip}
                            </p>
                            <p>{order.selectedAddress.phone}</p>
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            {(!editOrder && (
                              <span
                                className={
                                  chooseColor(order.status) +
                                  "py-1 px-3 rounded-full text-xs"
                                }
                              >
                                {order.status}
                              </span>
                            )) || (
                              <select
                                className="rounded-full text-xs"
                                onChange={(e) => handleOrder(e, order)}
                                defaultValue={order.status}
                              >
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="approved">Approved</option>
                              </select>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              className="w-5 mr-2 transform cursor-pointer hover:text-purple-500 hover:scale-110"
                              onClick={(e) => handleView(order.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>
                            <div
                              className="w-5 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110"
                              onClick={(e) => setEditOrder(true)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {totalOrders > pageArr[1]._limit && (
        <Pagination
          handlePagination={handlePagination}
          totalItems={totalOrders}
          pageArr={pageArr}
        ></Pagination>
      )}
    </>
  );
}
