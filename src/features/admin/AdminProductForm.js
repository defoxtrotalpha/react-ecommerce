import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCategories,
  selectAllBrands,
  addProductAsync,
  selectProductById,
  setSelectedProduct,
  updateProductAsync,
} from "../product/productSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function AdminProductForm() {
  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectProductById);
  const [openForm, setOpenForm] = useState(true);

  const handleProduct = (data) => {
    const images = [
      data.thumbnail,
      data.image1,
      data.image2,
      data.image3,
      data.image4,
    ];

    let rating, isDeleted, id;
    if (selectedProduct) {
      rating = selectedProduct.rating;
      isDeleted = selectedProduct.isDeleted;
      id = selectedProduct.id;
    } else {
      rating = 5;
      isDeleted = false; //id will be created by server automatically
    }

    const newProd = { ...data, images, isDeleted, rating, id };
    delete newProd.image1;
    delete newProd.image2;
    delete newProd.image3;
    delete newProd.image4;

    if (selectedProduct) {
      dispatch(updateProductAsync(newProd));
      dispatch(setSelectedProduct());
    } else dispatch(addProductAsync(newProd));

    setOpenForm(false);
  };

  useEffect(() => {
    if (selectedProduct) {
      setValue("title", selectedProduct.title);
      setValue("price", selectedProduct.price);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("description", selectedProduct.description);
      setValue("stock", selectedProduct.stock);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("image4", selectedProduct.images[3]);
    }
  });

  const handleCancel = () => {
    if (selectedProduct) {
      dispatch(setSelectedProduct());
    }
  };

  return (
    <div className="bg-white p-4">
      {!openForm && <Navigate to="/admin/homepage" replace={true}></Navigate>}
      <form
        onSubmit={handleSubmit((data) => {
          handleProduct(data);
          reset();
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-bold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  for="title"
                  className="block text-sm font-medium text-gray-900"
                >
                  Product Title
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      type="text"
                      {...register("title", {
                        required: "Product Title is required",
                      })}
                      id="title"
                      className=" block w-full border-0 bg-transparent pl-1 text-gray-900 
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  for="category"
                  className="block text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 "
                  >
                    <select
                      {...register("category", {
                        required: "Product category is required",
                      })}
                      id="category"
                      className="block flex-1 text-center border-0 bg-transparent pl-1 text-gray-900
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    >
                      <option value="">--choose category--</option>
                      {categories.map((category, index) => (
                        <option key={index}>{category.label}</option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  for="brand"
                  className="block text-sm font-medium text-gray-900"
                >
                  Brand{" "}
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <select
                      {...register("brand", {
                        required: "Product brand is required",
                      })}
                      id="brand"
                      className="block flex-1 border-0 text-center bg-transparent text-gray-900
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    >
                      <option value="">--choose brand--</option>
                      {brands.map((brand, index) => (
                        <option key={index}>{brand.label}</option>
                      ))}
                    </select>
                  </div>
                  {errors.brand && (
                    <p className="text-red-500">{errors.brand.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="price"
                  className="block text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  >
                    <input
                      {...register("price", {
                        required: "Product price is required",
                      })}
                      id="price"
                      min={0}
                      max={10000}
                      className="block flex-1 border-0 bg-transparent pl-1 text-gray-900
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="stock"
                  className="block text-sm font-medium text-gray-900"
                >
                  Stock
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  >
                    <input
                      {...register("stock", {
                        required: "Product stock is required",
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent pl-1 text-gray-900
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                  {errors.stock && (
                    <p className="text-red-500">{errors.stock.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="discountPercentage"
                  className="block text-sm font-medium text-gray-900"
                >
                  Discount Percentage
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  >
                    <input
                      {...register("discountPercentage", {
                        required: "Product discount percentage is required",
                      })}
                      id="discountPercentage"
                      min={0}
                      max={100}
                      className="block flex-1 border-0 bg-transparent pl-1 text-gray-900
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                  {errors.discountPercentage && (
                    <p className="text-red-500">
                      {errors.discountPercentage.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  for="description"
                  className="block text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <div>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Product description is required",
                    })}
                    rows="3"
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1
                     ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                     focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  for="thumbnail"
                  className="block text-sm font-medium text-gray-900"
                >
                  Thumbnail
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "Product thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block w-full border-0 bg-transparent pl-1 text-gray-900 
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.thumbnail && (
                    <p className="text-red-500">{errors.thumbnail.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  for="image1"
                  className="block text-sm font-medium text-gray-900"
                >
                  Image1
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      type="text"
                      {...register("image1", {
                        required: "Product image1 is required",
                      })}
                      id="image1"
                      className="block w-full border-0 bg-transparent pl-1 text-gray-900 
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.image1 && (
                    <p className="text-red-500">{errors.image1.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="image2"
                  className="block text-sm font-medium text-gray-900"
                >
                  Image2
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  >
                    <input
                      type="text"
                      {...register("image2", {
                        required: "Product image2 is required",
                      })}
                      id="image2"
                      className="block w-full border-0 bg-transparent pl-1 text-gray-900 
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.image2 && (
                    <p className="text-red-500">{errors.image2.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="image3"
                  className="block text-sm font-medium text-gray-900"
                >
                  Image3
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      type="text"
                      {...register("image3", {
                        required: "Product image#3 is required",
                      })}
                      id="image3"
                      className="block border-0 w-full bg-transparent pl-1 text-gray-900 
                       placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  for="image4"
                  className="block text-sm font-medium text-gray-900"
                >
                  Image 4
                </label>
                <div>
                  <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
                   focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <input
                      type="text"
                      {...register("image4", {
                        required: "Product image#4 is required",
                      })}
                      id="image4"
                      className="block w-full border-0 bg-transparent pl-1 text-gray-900 
                       placeholder:text-gray-400 focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-end gap-x-6">
            <Link to="/admin/homepage">
              <button
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
               text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        for="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        for="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label for="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      for="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
