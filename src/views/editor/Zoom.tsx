import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import produce from "immer";
import { setConfig } from "@actions/configAction";
import { setLayerData } from "@actions/layerAction";

let offsetLeft;
let offsetTop;

function Zoom() {
  let dispatch = useDispatch();
  const { currentLayerData, configData } = useSelector((data) => data);
  let { width, height, left, top, zIndex, text, id } = currentLayerData;

  let [drag, setDrag] = useState(false);

  useEffect(() => {
    mouseMove(id);
  }, [id]);

  const mouseMove = useCallback(() => {
    const zoo = document.querySelector("#zoom");

    const target = document.querySelector("#target");
    zoo.onmousedown = function (event) {
      let shiftX = event.clientX - zoo.getBoundingClientRect().left;
      let shiftY = event.clientY - zoo.getBoundingClientRect().top;
      target.append(zoo);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        let left = pageX - shiftY;
        offsetLeft = pageX - shiftX - target.offsetLeft;
        offsetTop = pageY - shiftY - target.offsetTop;
        zoo.style.left = offsetLeft + "px";
        zoo.style.top = offsetTop + "px";
      }
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      zoo.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        zoo.onmouseup = null;
        let idx = "";
        configData.forEach((v, i) => {
          if (v.id === id) idx = i;
        });
        let newConfigData = produce(configData, (draft) => {
          draft[idx].left = offsetLeft * 2;
          draft[idx].top = offsetTop * 2;
        });

        dispatch(setLayerData(newConfigData[idx]));

        dispatch(setConfig(newConfigData));
      };

      zoo.onmouseover = function () {
        document.removeEventListener("mousemove", onMouseMove);
      };
    };
    zoo.ondragstart = function () {
      return false;
    };
  }, [id]);
  return (
    <div
      id="zoom"
      style={{
        cursor: "move",
        position: "absolute",
        border: "2px dashed #f00",
        zIndex: 101,
        width: `${width / 75}rem`,
        height: `${height / 75}rem`,
        top: `${top / 75}rem`,
        left: `${left / 75}rem`,
      }}
    ></div>
  );
}

export default Zoom;
