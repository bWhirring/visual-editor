import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./index.less";
import Main from "./HOC";
import Zoom from "./Zoom";

function Container(props) {
  return (
    <div className={style.main}>
      <div id="target" className={style.editor}>
        {props.node.map((v) => v)}
        <Zoom />
      </div>
    </div>
  );
}

export default Main(Container);
