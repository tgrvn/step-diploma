import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import dashReducer from "../slices/dashboard";
import boardReducer from "../slices/board";
import cardReducer from "../slices/card";
import urlReducer from "../slices/invite";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    dash: dashReducer,
    board: boardReducer,
    card: cardReducer,
    url: urlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
