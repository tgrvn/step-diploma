import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import store from "redux/store";
import "./index.scss";
import "./styles/css/fonts.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);
