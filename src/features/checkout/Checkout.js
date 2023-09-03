import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { selectItems, deleteFromCartAsync } from "../cart/cartSlice";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectLoggedInUserInfo, updateUserAsync } from "../user/userSlice";
import { addOrderAsync, selectCurrentOrder } from "../order/orderSlice";

export default function Checkout() {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  const discountedPrice = (prod) => {
    return (
      Math.round(prod.price * (1 - prod.discountPercentage / 100) * 100) / 100
    );
  };

  const totalPrice =
    Math.round(
      items.reduce(
        (amount, item) =>
          discountedPrice(item.product) * item.quantity + amount,
        0
      ) * 100
    ) / 100;
  console.log(totalPrice);

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleRemove = (e, id) => {
    dispatch(deleteFromCartAsync(id));
  };

  const { register, handleSubmit, reset } = useForm();

  const user = useSelector(selectLoggedInUserInfo);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleAddress = (e) => {
    console.log(e.target.value, user.addresses[e.target.value]);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePaymentMethod = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalItems,
        totalPrice,
        user: user.id,
        selectedAddress,
        paymentMethod,
        status: "pending", // Other status can be 'delivered' or 'received'
      };
      dispatch(addOrderAsync(order));
      //TODO: 1. Direct to order success page
      //2. Clear cart after order
      //3. On server, change the stock number of items
    } else {
      alert("Kindly Select Address & Payment Method");
    }
  };

  const currentOrder = useSelector(selectCurrentOrder);

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8 mb-6 mr-4 rounded-md">
          <form
            onSubmit={handleSubmit((data) => {
              if (user.addresses) {
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
              } else {
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [data],
                  })
                );
              }
              reset();
            })}
          >
            {/* First and last name on the same line */}
            <p className="text-xl font-medium">Personal Details</p>
            <p className="text-gray-400 mb-">
              Please select a permenant address where you can recieve mail.
            </p>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                {...register("name", {
                  required: "Full name is required",
                })}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="John Doe"
              />
            </div>

            {/* Email address, street address, country on different lines */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email address is required",
                })}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="john@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                {...register("street", {
                  required: "Street address is required",
                })}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="123 Main St"
              />
            </div>
            {/* City, state, and zip on the same line */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", {
                    required: "City is required",
                  })}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Karachi"
                />
              </div>
              <div className="w-1/4">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State/ Province
                </label>
                <input
                  type="text"
                  id="state"
                  {...register("state", {
                    required: "State/ Province is required",
                  })}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Sindh"
                />
              </div>
              <div className="w-1/4">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  {...register("zip", {
                    required: "ZIP code is required",
                  })}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="12345"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone", {
                  required: "Phone no is required",
                })}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="03xxxxxxxxx"
              />
            </div>
            {/* Reset and Save Address buttons */}
            <div className="mb-4 flex space-x-4">
              <button
                type="button"
                onClick={() => reset()}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md"
              >
                Save Address
              </button>
            </div>
          </form>

          {/* Choose from existing addresses */}
          <div className="mb-4 mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Choose from existing addresses:
            </label>
            <div className="mt-2 space-y-2">
              {user.addresses &&
                user.addresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <div className="flex w-full flex-col px-4 py-4">
                      <label className="flex items-center font-semibold">
                        <input
                          type="radio"
                          name="existingAddress"
                          className="mr-2"
                          value={index}
                          onChange={(e) => handleAddress(e)}
                        />
                        {address.name}
                      </label>
                      <p className="float-right text-gray-400">
                        {address.street}, {address.city} {address.state}
                      </p>
                      <p className="float-right text-gray-400">
                        {address.phone}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Payment options (cash or card) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment options:
            </label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentOption"
                  className="mr-2"
                  value="cash"
                  onChange={(e) => handlePaymentMethod(e)}
                />
                Cash
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentOption"
                  className="mr-2"
                  value="card"
                  onChange={(e) => handlePaymentMethod(e)}
                />
                Card
              </label>
            </div>
          </div>
        </div>
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {items.length > 0 &&
              items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <img
                    className="m-2 h-30 w-28 rounded-md border object-cover object-center"
                    src={item.product.thumbnail}
                    alt={item.product.title}
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.product.title}</span>
                    <span
                      className="font-semibold text-indigo-500 text-xs cursor-pointer text-right"
                      onClick={(e) => handleRemove(e, item.id)}
                    >
                      Remove
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

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Total Items in Cart
                </p>
                <p className="font-semibold text-gray-900">{totalItems}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">${totalPrice}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalPrice + 8}$
              </p>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Pay & Order
          </button>
          <p className="text-center text-sm text-gray-500">
            or{" "}
            <Link
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to="/"
            >
              Continue Shopping
              <ArrowRightIcon className="h-6 w-6 inline" aria-hidden="true" />
            </Link>
          </p>
          ;
        </div>
      </div>
    </>
  );
}
