import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./checkoutSlice";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Checkout() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8 mb-6 mr-4 rounded-md">
          {/* First and last name on the same line */}
          <p class="text-xl font-medium">Personal Details</p>
          <p class="text-gray-400 mb-">
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
              name="fullName"
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
              name="email"
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
              name="streetAddress"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="123 Main St"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="United States"
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
                name="city"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="New York"
              />
            </div>
            <div className="w-1/4">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="NY"
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
                name="zip"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="10001"
              />
            </div>
          </div>

          {/* Reset and Save Address buttons */}
          <div className="mb-4 flex space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md"
            >
              Reset
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md"
            >
              Save Address
            </button>
          </div>

          {/* Choose from existing addresses */}
          <div className="mb-4 mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Choose from existing addresses:
            </label>
            <div className="mt-2 space-y-2">
              <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                <div class="flex w-full flex-col px-4 py-4">
                  <label className="flex items-center font-semibold">
                    <input
                      type="radio"
                      name="existingAddress"
                      className="mr-2"
                    />
                    Address 1
                  </label>
                  <p class="float-right text-gray-400">Street/ District</p>
                  <p class="float-right text-gray-400">Phone</p>
                </div>
              </div>

              <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                <div class="flex w-full flex-col px-4 py-4">
                  <label className="flex items-center font-semibold">
                    <input
                      type="radio"
                      name="existingAddress"
                      className="mr-2"
                    />
                    Address 2
                  </label>
                  <p class="float-right text-gray-400">Street/ District</p>
                  <p class="float-right text-gray-400">Phone</p>
                </div>
              </div>

              {/* Add more existing addresses here */}
            </div>
          </div>

          {/* Payment options (cash or card) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment options:
            </label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input type="radio" name="paymentOption" className="mr-2" />
                Cash
              </label>
              <label className="flex items-center">
                <input type="radio" name="paymentOption" className="mr-2" />
                Card
              </label>
            </div>
          </div>
        </div>
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">Check your items.</p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span class="float-right text-gray-400">42EU - 8.5US</span>
                <p class="text-lg font-bold">$138.99</p>
              </div>
            </div>
            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
              <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span class="float-right text-gray-400">42EU - 8.5US</span>
                <p class="mt-auto text-lg font-bold">$238.99</p>
              </div>
            </div>

            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">$399.00</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">$408.00</p>
            </div>
          </div>
          <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Pay & Order
          </button>
          <p class="text-center text-sm text-gray-500">
            or{" "}
            <Link
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              to="/signup"
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
