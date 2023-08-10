import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchAllCategories,
  fetchAllBrands,
  fetchProductById,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  brands: [],
  categories: [],
  totalItems: 0,
  selectedProduct: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  "Brand/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  "Categories/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductsByFiltersAsync = createAsyncThunk(
  "product/fetchAllProductsByFilters",
  async ({ filterArr, sortArr, pageArr }) => {
    const response = await fetchProductsByFilters(filterArr, sortArr, pageArr);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
