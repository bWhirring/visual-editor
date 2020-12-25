import React, { useState } from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import "./App.less";

import App from "./App";
import reducer from "./reducers";

const store = createStore(reducer, applyMiddleware(thunk, logger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

if (module["hot"]) {
  // 可以解决热更新失败的问题
  module["hot"].accept();
}
