import React, { useState, useCallback, useMemo, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./index.less";
import Main from "./HOC";

function Container(props) {
  const { currentLayerData, configData } = useSelector((data) => data);

  let { width, height, left, top, zIndex, text } = currentLayerData;

  const renderZoom = useCallback(() => {
    return (
      <div
        id="zoom"
        style={{
          position: "absolute",
          border: "1px dashed #f00",
          zIndex: 10000,
          width: `${width / 75}rem`,
          height: `${height / 75}rem`,
          top: `${top / 75}rem`,
          left: `${left / 75}rem`,
        }}
      ></div>
    );
  }, [width]);

  return (
    <div className={style.main}>
      <div className={style.editor}>
        {props.node.map((v) => v)}
        {renderZoom()}
      </div>
    </div>
  );
}

export default Main(Container);
