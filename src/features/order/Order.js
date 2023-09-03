import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrdersByUserIdAsync,
  selectUserOrders,
} from "../order/orderSlice";
import { selectLoggedInUserInfo } from "../user/userSlice";

export default function Order() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserInfo);

  useEffect(() => {
    if (user) dispatch(fetchOrdersByUserIdAsync(user.id));
  }, [user, dispatch]);

  const discountedPrice = (prod) => {
    return (
      Math.round(prod.price * (1 - prod.discountPercentage / 100) * 100) / 100
    );
  };

  const orders = useSelector(selectUserOrders);
  console.log(orders);

  return (
    <div>
      <p className="text-xl font-medium">My Orders</p>
      <div className=" mt-2 space-y-3 rounded-lg border mx-auto w-full bg-white px-2 py-4 sm:px-6">
        {orders &&
          orders.map((order, index) => (
            <div
              key={index}
              className="border-2 border-black flex flex-col rounded-lg bg-white"
            >
              <p className="p-4 text-xl text-bold">Order# {order.id}</p>
              <p className="px-4 text-xxl text-bold text-red-600">
                Order status: {order.status}
              </p>
              <div className=" flex flex-row flex-wrap gap-5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex flex-row border">
                    <img
                      className="m-2 h-30 w-28 rounded-md border object-cover object-center"
                      src={item.product.thumbnail}
                      alt={item.product.title}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {item.product.title}
                      </span>
                      <span className="float-right text-gray-400 text-xs">
                        Brand: {item.product.brand}
                      </span>
                      <span className="float-right text-gray-400 text-xs">
                        Quantity: {item.quantity}
                      </span>
                      <p className="text-lg font-bold">
                        ${discountedPrice(item.product) * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Total Items
                  </p>
                  <p className="font-semibold text-gray-900">
                    {order.totalItems}
                  </p>
                </div>

                <div className=" flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Total Price
                  </p>
                  <p className="font-semibold text-gray-900">
                    ${order.totalPrice}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">$8.00</p>
                </div>
              </div>
              <div className="px-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${order.totalPrice + 8}
                </p>
              </div>
              <p className="px-4 pt-2 border-t text-sm font-medium text-gray-900">
                Shipping Address:
              </p>
              <div className="flex w-full mb-4 flex-col px-4">
                <p className="float-right text-gray-400">
                  {order.selectedAddress[0].street},{" "}
                  {order.selectedAddress[0].city}{" "}
                  {order.selectedAddress[0].state}
                </p>
                <p className="float-right text-gray-400">
                  {order.selectedAddress[0].phone}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
