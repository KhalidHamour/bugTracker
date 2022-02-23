import React from "react";
import ReactDOM from "react-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import App from "./app/App";

import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <Provider store={store}>
        <App />
      </Provider>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById("root")
);
