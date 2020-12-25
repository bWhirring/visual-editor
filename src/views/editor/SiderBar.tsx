import React from "react";
import CSSModules from "react-css-modules";
import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, Tree } from "antd";
import { isNotNullObject, layerNameToPinyin, toTree } from "@utils/index";
import { setConfig } from "@actions/configAction";

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
  let { configData } = useSelector((data) => data);
  let nodes = toTree(JSON.parse(JSON.stringify(configData)));

  let selectTree = (e) => {
    let layer = configData.filter((v) => v.id === e[0]);
    dispatch(setLayerData(layer[0]));
  };

  return (
    <div styleName="sider-bar">
      <Tree
        onSelect={selectTree}
        showLine
        showIcon
        className="draggable-tree"
        treeData={nodes}
      />
    </div>
  );
}

export default CSSModules(style)(SiderBar);
