import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  addToCartAsync,
  deleteFromCartAsync,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  const handleQty = (product, type) => {
    if (type === "inc") {
      const newProd = { ...product, quantity: +product.quantity + 1 };
      dispatch(updateCartAsync(newProd));
    } else {
      if (product.quantity !== 1) {
        const newProd = { ...product, quantity: +product.quantity - 1 };
        dispatch(updateCartAsync(newProd));
      }
    }
  };

  const totalPrice = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleRemove = (e, id) => {
    dispatch(deleteFromCartAsync(id));
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10 justify-center">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              {items.length} {items.length > 1 ? " Products" : " Product"}
            </h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-3/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
          </div>
          {items.length > 0 &&
            items.map((product, index) => (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-3/5">
                  {/* product */}
                  <div className="w-20">
                    <img
                      className="h-24"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{product.title}</span>
                    <span className="text-red-500 text-xs">
                      {product.brand}
                    </span>
                    <p
                      className="font-semibold text-indigo-500 text-xs cursor-pointer "
                      onClick={(e) => handleRemove(e, product.id)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                    onClick={(e) => {
                      handleQty(product, "dec");
                    }}
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                  <input
                    className="mx-2 border text-center w-12"
                    type="text"
                    value={product.quantity}
                  />
                  <svg
                    className="fill-current text-gray-600 w-3"
                    viewBox="0 0 448 512"
                    onClick={(e) => {
                      handleQty(product, "inc");
                    }}
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {product.price * product.quantity}$
                </span>
              </div>
            ))}
          <div className="flex mt-10 border-t-2 border-black">
            <h3 className="font-bold text-gray-600 text-s w-3/5 text-left">
              Subtotal
            </h3>
            <span className=" w-1/5"></span>
            <h3 className="font-bold text-gray-700 text-s w-1/5 text-center">
              {totalPrice}$
            </h3>
          </div>
          <div className="flex mb-5">
            <h3 className="font-bold text-gray-600 text-s w-3/5 text-left">
              Items in Cart
            </h3>
            <span className=" w-1/5"></span>
            <h3 className="font-bold text-gray-700 text-s w-1/5 text-center">
              {totalItems} items
            </h3>
          </div>
          <Link to="/checkout">
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </Link>
          <Link
            to="/"
            className="flex font-semibold text-indigo-600 justify-center text-sm mt-3"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
