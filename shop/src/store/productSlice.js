import { createSlice } from "@reduxjs/toolkit";

let product = createSlice({
  name: "product",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCount(state, a) {
      let index = state.findIndex((obj) => obj.id == a.payload);
      state[index].count += 1;
    },
    addproduct(state, a) {
      let index = state.findIndex((obj) => obj.id == a.payload.id);
      if (index !== -1) {
        state[index].count += 1;
      } else {
        state.push({ id: a.payload.id, name: a.payload.title, count: 1 });
      }
    },
    deleteproduct(state, a) {
      let index = state.findIndex((obj) => obj.id == a.payload.id);
      state.splice(index, 1);
    },
  },
});

export let { increaseCount, addproduct, deleteproduct } = product.actions;

export default product;
