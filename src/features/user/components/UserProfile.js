import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Order() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [addAddress, setAddAddress] = useState(false);

  const user = useSelector(selectLoggedInUserInfo);
  const [checkEdit, setCheckEdit] = useState(
    new Array(user.addresses.length).fill(false)
  );

  const handleRemove = (index) => {
    let newUser = {
      ...user,
      addresses: [...user.addresses],
    };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEdit = (index, data) => {
    let newUser = { ...user, addresses: [...user.addresses] }; //To prevent shallow copies
    newUser.addresses = [...newUser.addresses.with(index, data)];
    console.log(newUser);
    dispatch(updateUserAsync(newUser));
  };

  return (
    <div>
      <h1 className="px-4 font-bold text-xl mb-4">My Profile</h1>
      <h2 className="px-4 font-semibold text-gray-600">
        Name: {user.name ? user.name : "New User"}
      </h2>
      <h3 className="px-4 font-semibold text-gray-600">Email: {user.email}</h3>
      {user.role === "admin" && (
        <h3 className="px-4 font-semibold text-red-600">Role: {user.role}</h3>
      )}
      <h3 className="px-4 mb-1 font-semibold text-gray-600">
        Your Addresses: {user.addresses.length > 0 ? "" : "None"}
      </h3>
      {user.addresses.map((address, index) => (
        <div key={index}>
          {(checkEdit[index] && (
            <form
              className="py-4"
              onSubmit={handleSubmit((data) => {
                handleEdit(index, data);
                reset();
                setCheckEdit([...checkEdit].with(index, false));
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
                  {...setValue("name", address.name)}
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
                  {...setValue("email", address.email)}
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
                  {...setValue("street", address.street)}
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
                    {...setValue("city", address.city)}
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
                    {...setValue("state", address.state)}
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
                    {...setValue("zip", address.zip)}
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
                  {...setValue("phone", address.phone)}
                  {...register("phone", {
                    required: "Phone no is required",
                  })}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              {/* Reset and Save Address buttons */}
              <div className="mb-4 flex space-x-4">
                <button
                  className="px-4 py-2 text-sm font-medium border-2 border-black rounded-md"
                  onClick={() =>
                    setCheckEdit([...checkEdit].with(index, false))
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md"
                >
                  Save Address
                </button>
              </div>
            </form>
          )) || (
            <div className="flex w-full border-2 border-black mb-2 flex-row px-4">
              <div className="flex w-1/3 flex-col">
                <p className="float-right text-gray-600 mb-2">{address.name}</p>
                <p className="float-right text-gray-600">
                  {address.street}, {address.city}
                </p>
              </div>
              <div className="flex w-2/3 flex-col">
                <p className="float-right text-gray-600 mb-2">
                  Phone: {address.phone}
                </p>
                <p className="float-right text-gray-600">{address.state}</p>
              </div>
              <div className="flex w-3/3 flex-col">
                <p
                  className="text-center font-semibold cursor-pointer  text-indigo-600 mb-2 text-sm"
                  onClick={() => setCheckEdit([...checkEdit].with(index, true))}
                >
                  Edit
                </p>
                <p
                  className="text-center font-semibold text-indigo-600 cursor-pointer text-sm"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </p>
              </div>
            </div>
          )}{" "}
        </div>
      ))}
      <button
        className=" bg-green-600 px-4 ml-4 mt-2 border-2 border-black text-white"
        onClick={() => setAddAddress(true)}
      >
        Add Address
      </button>
      {addAddress && (
        <form
          className="py-4"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            dispatch(
              updateUserAsync({
                ...user,
                addresses: [...user.addresses, data],
              })
            );
            reset();
            setAddAddress(false);
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
              className="px-4 py-2 text-sm font-medium border-2 border-black rounded-md"
              onClick={() => setAddAddress(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md"
            >
              Save Address
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

<h3 class="font-semibold text-gray-600 text-xs uppercase w-3/5">
  Product Details
</h3>;
