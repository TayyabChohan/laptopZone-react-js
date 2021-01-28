import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Layout from "./App";
import store from "./store/store.js";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { initSocket } from "./ModulesByTahir/action/getRequestsAction";
store.dispatch(initSocket());

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <Layout />{" "}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
