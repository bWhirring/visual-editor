import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import produce from "immer";
import Draggable from "react-draggable";
import { setConfig } from "@actions/configAction";
import { setLayerData } from "@actions/layerAction";
import { useImmer } from "use-immer";

let zoom: HTMLElement | null;

function Zoom() {
  let dispatch = useDispatch();
  let [client, setClient] = useImmer({ x: null, y: null });
  const { currentLayerData, configData } = useSelector((data) => data);
  let { width, height, left, top, zIndex, text, id } = currentLayerData;

  useEffect(() => {
    zoom = document.getElementById("zoom");
    return () => {
      zoom = null;
    };
  }, [currentLayerData]);

  const handleStop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      const target = document.querySelector("#target");
      let offsetLeft = e.pageX - client.x - target.offsetLeft;
      let offsetTop = e.pageY - client.y - target.offsetTop;

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
    },
    [client]
  );

  const dragStart = useCallback((e: React.DragEvent<HTMLElement>) => {
    setClient((draft) => {
      draft.x = e.clientX - zoom.getBoundingClientRect().left;
      draft.y = e.clientY - zoom.getBoundingClientRect().top;
    });
  }, []);

  // const mouseMove = useCallback(() => {
  //   const zoo = document.querySelector("#zoom");

  //   const target = document.querySelector("#target");
  //   zoo.onmousedown = function (event) {
  //     let shiftX = event.clientX - zoo.getBoundingClientRect().left;
  //     let shiftY = event.clientY - zoo.getBoundingClientRect().top;
  //     target.append(zoo);

  //     moveAt(event.pageX, event.pageY);

  //     function moveAt(pageX, pageY) {
  //       let left = pageX - shiftY;
  //       offsetLeft = pageX - shiftX - target.offsetLeft;
  //       offsetTop = pageY - shiftY - target.offsetTop;
  //       zoo.style.left = offsetLeft + "px";
  //       zoo.style.top = offsetTop + "px";
  //     }
  //     function onMouseMove(event) {
  //       moveAt(event.pageX, event.pageY);
  //     }

  //     document.addEventListener("mousemove", onMouseMove);

  //     zoo.onmouseup = function () {
  //       document.removeEventListener("mousemove", onMouseMove);
  //       zoo.onmouseup = null;
  //       let idx = "";
  //       configData.forEach((v, i) => {
  //         if (v.id === id) idx = i;
  //       });
  //       let newConfigData = produce(configData, (draft) => {
  //         draft[idx].left = offsetLeft * 2;
  //         draft[idx].top = offsetTop * 2;
  //       });

  //       dispatch(setLayerData(newConfigData[idx]));

  //       dispatch(setConfig(newConfigData));
  //     };

  //     zoo.onmouseover = function () {
  //       document.removeEventListener("mousemove", onMouseMove);
  //     };
  //   };
  //   zoo.ondragstart = function () {
  //     return false;
  //   };
  // }, [id]);
  let style = {
    cursor: "move",
    position: "absolute",
    border: "2px dashed #f00",
    zIndex: 101,
    width: `${width / 2}px`,
    height: `${height / 2}px`,
    left: 0,
    top: 0,
  };

  return (
    <Draggable
      handle="#zoom"
      position={{ x: left / 2, y: top / 2 }}
      scale={1}
      onStart={dragStart}
      onStop={handleStop}
    >
      <div
        id="zoom"
        style={{
          ...style,
          display: currentLayerData.id ? "block" : "none",
        }}
      />
    </Draggable>
  );
}

export default Zoom;
