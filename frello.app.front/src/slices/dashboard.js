import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashService from "../services/dashboard.service";

const initialState = {
  dashboardData: null,
  isLoad: false,
};

export const boards = createAsyncThunk("dashboard", async (_, thunkAPI) => {
  try {
    const data = await dashService.getDash();
    return { dash: data };
  } catch (error) {
    console.log(error);
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: {
    [boards.pending]: (state, action) => {
      state.isLoad = true;
    },
    [boards.fulfilled]: (state, action) => {
      state.isLoad = false;
      state.dashboardData = action.payload.dash.data;
    },
  },
});

const { reducer } = dashboardSlice;
export default reducer;
