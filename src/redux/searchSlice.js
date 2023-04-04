import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  searchProducts: [],
  searchProductStatus: STATUS.IDLE
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAsyncSearchProduct.pending, (state, action) => {
      state.searchproductStatus = STATUS.LOADING
    })
    .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
      state.searchproductStatus = STATUS.SUCCESS;
      state.searchProducts = action.payload
    })
    .addCase(fetchAsyncSearchProduct.rejected, (state, action) => {
      state.searchproductStatus = STATUS.FAILED
    })

  }
})

export const fetchAsyncSearchProduct = createAsyncThunk('product-search/fetch', async(searchTerm) => {
  const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
  const data = await response.json();
  return data.products;
});

export default searchSlice.reducer;