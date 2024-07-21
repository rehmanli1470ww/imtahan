import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchAllCars = createAsyncThunk("cars/fetchAllCars", async () => {
  const response = await api.get("/cars");
  return response.data;
});

export const getFilteredCars = createAsyncThunk(
  "cars/getFilteredCars",
  async (params) => {
    const response = await api.get("/cars");
    params.params.forEach((filter) => {

      if (filter.value != null) {

        const minPrice = isNaN(parseFloat(filter.value?.minPrice))? 0:parseFloat(filter.value?.minPrice);
        const maxPrice = isNaN(parseFloat(filter.value?.maxPrice))? 500000:parseFloat(filter.value?.maxPrice);
        const minYear = isNaN(parseFloat(filter.value?.minYear))? 0:parseFloat(filter.value?.minYear);
        const maxYear = isNaN(parseFloat(filter.value?.maxYear))? 500000:parseFloat(filter.value?.maxYear);
        console.log(minPrice, maxPrice);
        console.log(minYear, maxYear);

        //yeni yazdigim
        if (filter.key === 'year') {
          response.data = response.data.filter((car) =>
            car[Object.keys(car).find((key) => key === filter.key)] > minYear
            && car[Object.keys(car).find((key) => key === filter.key)] < maxYear);

        }

        //yeni yazdigim 
        else if (filter.key === 'price') {

          response.data = response.data.filter((car) =>
            car[Object.keys(car).find((key) => key === filter.key)] > minPrice
            && car[Object.keys(car).find((key) => key === filter.key)] < maxPrice);

        }
        else
          response.data = response.data.filter((car) =>
            car[Object.keys(car).find((key) => key === filter.key)] === filter.value
          );
      }
    });

    return response.data;
  }

);

export const getSingleObjectOfCars = createAsyncThunk(
  "cars/getSingleObjectOfCars",
  async (params) => {
    const response = await api.get("/cars");
    const key = params.key;
 
    const filteredData = [...new Set(response.data.map((car) => car[key]))];
    return { key, data: filteredData };
  }
);


export const addCar = createAsyncThunk("cars/addCar", async (car) => {
  const response = await api.post("/cars", car);
  return response.data;
});

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    singleObjectOfCars: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchAllCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })
      .addCase(getFilteredCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilteredCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(getFilteredCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleObjectOfCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleObjectOfCars.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        state.loading = false;
        state.singleObjectOfCars[key] = data;
      })
      .addCase(getSingleObjectOfCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default carsSlice.reducer;
