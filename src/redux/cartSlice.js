import { createSlice } from '@reduxjs/toolkit';

const setinLocalStorage = (data) => {
   localStorage.setItem('cart', JSON.stringify(data));
};
const getFromLocalStorage = () => {
   const data = localStorage.getItem('cart');
   if (data) {
      return JSON.parse(localStorage.getItem('cart'));
   } else {
      return [];
   }
};

const initialState = {
   carts: getFromLocalStorage(),
   itemsCount: 0,
   totalAmount: 0,
   isCartMessageOn: false,
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const isItemInCart = state.carts.find(
            (item) => item.id === action.payload.id
         );

         if (isItemInCart) {
            const tempCart = state.carts.map((item) => {
               if (item.id === action.payload.id) {
                  let tempQty = item.quantity + action.payload.quantity;
                  let tempTotalPrice = tempQty * item.price;
                  return {
                     ...item,
                     quantity: tempQty,
                     totalPrice: tempTotalPrice,
                  };
               } else {
                  return item;
               }
            });
            state.carts = tempCart;
            setinLocalStorage(state.carts);
         } else {
            state.carts.push(action.payload);
            setinLocalStorage(state.carts);
         }
      },
      removeFromCart: (state, action) => {
         const tempCart = state.carts.filter(
            (item) => item.id !== action.payload.id
         );
         state.carts = tempCart;
         setinLocalStorage(state.carts);
      },
      clearCart: (state) => {
         state.carts = [];
         setinLocalStorage(state.carts);
      },
      getCartTotal: (state) => {
         state.totalAmount = state.carts.reduce((total, item) => total + item.totalPrice, 0);
         state.itemsCount = state.carts.length;
       },
       toggleCartQty: (state, action) => {
         const { id, type } = action.payload;
         const tempCart = state.carts.map(item => {
           if (item.id !== id) {
             return item;
           }
           let tempQty = item.quantity;
           if (type === 'INC') {
             tempQty = Math.min(item.stock, tempQty + 1);
           } else if (type === 'DEC') {
             tempQty = Math.max(1, tempQty - 1);
           }
           const totalPrice = tempQty * item.discountPrice;
           return { ...item, quantity: tempQty, totalPrice };
         });
         state.carts = tempCart;
         setinLocalStorage(tempCart);
       },
      // toggleCartQty: (state, action) => {
      //    const tempCart = state.carts.map((item) => {
      //       if (item.id === action.payload.id) {
      //          let tempQty = item.quantity;
      //          let temptotalPrice = item.totalPrice;

      //          if (action.payload.type === 'INC') {
      //             tempQty++;
      //             if (tempQty === item.stock) tempQty = item.stock;
      //             temptotalPrice = tempQty * item.discountPrice;
      //          }
      //          if (action.payload.type === 'DEC') {
      //             tempQty--;
      //             if (tempQty < 1) tempQty = 1;
      //             temptotalPrice = tempQty * item.discountPrice;
      //          }

      //          return {
      //             ...item,
      //             quantity: tempQty,
      //             totalPrice: temptotalPrice,
      //          };
      //       } else {
      //          return item;
      //       }
      //    });
      //    state.carts = tempCart;
      //    setinLocalStorage(state.carts);
      // },
      setCartMessageOn: (state) => {
         state.isCartMessageOn = true;
      },
      setCartMessageOff: (state) => {
         state.isCartMessageOn = false;
      },
   },
});

export const {
   addToCart,
   setCartMessageOn,
   setCartMessageOff,
   removeFromCart,
   clearCart,
   getCartTotal,
   toggleCartQty,
} = cartSlice.actions;
export default cartSlice.reducer;
