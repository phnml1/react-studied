import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      return "john" + state;
    },
    changeAge(state, a) {
      state.age += a.payload; //파라미터 뚫는법 payload
    },
  },
});

export let { changeName, changeAge } = user.actions;
export default user;
