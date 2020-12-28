import React, { useState, useCallback, useMemo, memo } from "react";
import CSSModules from "react-css-modules";
import { useSelector, useDispatch } from "react-redux";
import { useImmer } from "use-immer";
import { setLayerData } from "@actions/layerAction";
import { setConfig } from "@actions/configAction";
import style from "./index.less";
import { isNotNullObject, layerNameToPinyin, toTree } from "@utils";

export default function Main(WrappedComponent) {
  return function () {
    let f = 75;
    const dispatch = useDispatch();
    let { configData } = useSelector((data) => data);
    let [currentLayer, setCurrentLayer] = useState({});
    let nodes = toTree(JSON.parse(JSON.stringify(configData)));

    const selectChild = (e: React.SyntheticEvent<HTMLElement>, id) => {
      e.stopPropagation();
      let idx = 0;
      configData.forEach((config, i) => {
        if (config.id === id) {
          dispatch(setLayerData(config));
        }
      });
    };

    const render = (children, name = "") => {
      if (name) {
        return (
          <div key={name} id={name} className={name}>
            {render(children)}
          </div>
        );
      } else {
        return children.map((child) => {
          let { name, type, text } = child;

          if (child.children && Array.isArray(child.children)) {
            return render(child.children, child.id);
          }

          return (
            <div onClick={(e) => selectChild(e, child.id)} key={child.id}>
              {renderContainer(child)}
            </div>
          );
        });
      }
    };

    const buildCSS = (child) => {
      let cssContent = {};
      let { left, top, width, height, name, type, text, zIndex = 100 } = child;
      if (name === "bgm") zIndex = 1;
      if (type === "group" || name === "Backgro") return "";
      name = layerNameToPinyin(name);
      cssContent = {
        width: `${width / 2}px`,
        height: `${height / 2}px`,
        top: `${top / 2}px`,
        left: `${left / 2}px`,
        position: `absolute`,
        zIndex: `${zIndex}`,
      };
      if (isNotNullObject(text)) {
        let {
          value,
          font: { sizes, color },
        } = text;
        cssContent.fontSize = `${Math.ceil(sizes / 2)}px`;
      }
      return cssContent;
    };

    const renderContainer = (child) => {
      let { name, type, text, id } = child;
      if (!name) return;

      let css = buildCSS(child);

      if (isNotNullObject(text)) {
        let {
          value,
          font: { sizes, color },
        } = text;
        return (
          <div id={id} style={{ ...css }}>
            {value}
          </div>
        );
      } else {
        return (
          <img
            id={id}
            style={{ ...css }}
            src={`https://yun.dui88.com/taobaomini/psd/test/${name}.png`}
          />
        );
      }
    };

    const getProperty = useCallback(
      (name) => {
        configData.forEach((v) => {
          if (v.id === name) {
            // dispatch(setLayerData(v));
          }
        });
      },
      [name]
    );

    const event = useCallback((e: React.SyntheticEvent) => {
      let { name } = e.target.dataset;
      getProperty(name);
    }, []);

    let node = render(nodes);

    return <WrappedComponent node={node} />;
  };
}
