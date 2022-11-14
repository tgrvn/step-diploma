import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ user, password }, thunkAPI) => {
    try {
      const data = await authService.login(user, password);
      return { user: data };
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const singup = createAsyncThunk(
  "auth/singup",
  async ({ email, username, password, password_confirmation }, thunkAPI) => {
    try {
      const data = await authService.singup(
        email,
        username,
        password,
        password_confirmation
      );
      return { user: data };
    } catch (error) {
      const message = error.response.data.errors;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user, isAuthLoad: false }
  : { isLoggedIn: false, user: null, isAuthLoad: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [singup.fulfilled]: (state, action) => {
      state.isAuthLoad = false;
      state.isLoggedIn = true;
    },
    [singup.pending]: (state, action) => {
      state.isAuthLoad = true;
    },
    [singup.rejected]: (state, action) => {
      state.isAuthLoad = false;
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isAuthLoad = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.pending]: (state, action) => {
      state.isAuthLoad = true;
    },
    [login.rejected]: (state, action) => {
      state.isAuthLoad = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isAuthLoad = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.pending]: (state, action) => {
      state.isAuthLoad = true;
    },
    // [logout.rejected]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
  },
});

const { reducer } = authSlice;
export default reducer;
