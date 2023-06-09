import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE
};

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAsyncProducts.pending, (state, action) => {
      state.productsStatus = STATUS.LOADING;
    })
    .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.productsStatus = STATUS.SUCCESS;
    })
    .addCase(fetchAsyncProducts.rejected, (state, action) => {
      state.productsStatus = STATUS.FAILED;
    })
    .addCase(fetchAsyncProductSingle.pending, (state, action) => {
      state.productSingleStatus = STATUS.LOADING;
    })
    .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
      state.productSingle = action.payload
      state.productSingleStatus = STATUS.SUCCESS;
    })
    .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
      state.productSingleStatus = STATUS.FAILED;
    })
  }
});

//getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk('products/fetch', async(limit) => {
  const response = await fetch(`${BASE_URL}products?limit=${limit}`);
  const data = await response.json();
  return data.products;
});

//getting single product data
export const fetchAsyncProductSingle = createAsyncThunk('product-single/fetch', async(id) => {
  const response = await fetch(`${BASE_URL}products/${id}`);
  const data = await response.json();
  return data;
});

export default productsSlice.reducer;