import React, { useState } from "react";
import { render } from "react-dom";
// import "./App.less";

import App from "./App";
render(<App />, document.getElementById("root"));

if (module["hot"]) {
  // 可以解决热更新失败的问题
  module["hot"].accept();
}
