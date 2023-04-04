import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOn: false
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarOn(state){
      state.isSidebarOn = true
    },
    setSidebarOff(state){
      state.isSidebarOn = false
    }
  }
});

export const {setSidebarOn, setSidebarOff} = sidebarSlice.actions;
export default sidebarSlice.reducer;