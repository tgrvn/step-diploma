import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import "./index.scss";
import "./styles/css/fonts.css";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <ScrollToTop />
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  // </React.StrictMode>
);
