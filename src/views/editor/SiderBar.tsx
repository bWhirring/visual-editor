import React from "react";
import CSSModules from "react-css-modules";
import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, Tree } from "antd";
import { isNotNullObject, layerNameToPinyin, toTree } from "@utils/index";
import { setConfig } from "@actions/configAction";
import { setLayerData } from "@actions/layerAction";

import {
  EditOutlined,
  FileImageOutlined,
  CodeSandboxOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import style from "./index.less";

const treeData = [
  {
    title: "HOME",
    key: "home",
    icon: <HomeOutlined />,
    children: [],
  },
];

function SiderBar() {
  let dispatch = useDispatch();
  let { configData, currentLayerData } = useSelector((data) => data);
  let nodes = toTree(JSON.parse(JSON.stringify(configData)));

  let selectTree = ([id]) => {
    let element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth",
      });
      if (id !== currentLayerData.id) {
        let layer = configData.filter((v) => v.id === id);
        dispatch(setLayerData(layer[0]));
      }
    }
  };

  return (
    <div styleName="sider-bar">
      <Tree
        onSelect={selectTree}
        showIcon
        className="draggable-tree"
        treeData={nodes}
      />
    </div>
  );
}

export default CSSModules(style)(SiderBar);
