import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import iniviteService from "../services/invite.service";

const initialState = {
  inviteUrl: null,
  boardId: null,
  inviteStatus: "done",
};

export const getInviteUrl = createAsyncThunk("invite/get", async (id) => {
  try {
    const data = await iniviteService.generateInvite(id);
    return { url: data.data.data };
  } catch (error) {
    console.log(error);
  }
});

export const uzeInviteUrl = createAsyncThunk("invite/use", async (token) => {
  try {
    const data = await iniviteService.uzeInviteUrl(token);
    return { id: data.data.id };
  } catch (error) {
    console.log(error);
  }
});

const inviteSlice = createSlice({
  name: "url",
  initialState,
  extraReducers: {
    [getInviteUrl.fulfilled]: (state, action) => {
      const href = window.location.href;
      const fullUrl = href.substr(0, 22) + "invite/" + action.payload.url;
      state.inviteUrl = fullUrl;
    },
    [uzeInviteUrl.fulfilled]: (state, action) => {
      state.boardId = action.payload.id;
    },
  },
});

const { reducer } = inviteSlice;
export default reducer;
