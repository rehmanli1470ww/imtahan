import { createSlice } from '@reduxjs/toolkit';

const selectBoxSlice = createSlice({
  name: 'selectBox',
  initialState: {},
  reducers: {
    setSelectedValue: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { setSelectedValue } = selectBoxSlice.actions;
export default selectBoxSlice.reducer;
