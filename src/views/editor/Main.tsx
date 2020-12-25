import React, { useState, useCallback, useMemo, memo } from "react";
import style from "./index.less";
import Main from "./HOC";

function Container(props) {
  return (
    <div className={style.main}>
      <div className={style.editor}>{props.node.map((v) => v)}</div>
    </div>
  );
}

export default Main(Container);
