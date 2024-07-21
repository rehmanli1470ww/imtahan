import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./featurs/CarSlice";
import selectBoxReducer from './featurs/SelectBoxSlice'; 

const store = configureStore({
  reducer: {
    cars: carsReducer,
    selectBox: selectBoxReducer,
  },
});

export default store;
