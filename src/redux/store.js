import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice';
import categorySlice from './categorySlice';
import productSlice from './productSlice';
import searchSlice from './searchSlice';
import sidebarSlice from './sidebarSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    category: categorySlice,
    product: productSlice,
    cart: cartSlice,
    search: searchSlice
  }
});

export default store;