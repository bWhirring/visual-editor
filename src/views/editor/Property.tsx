import React from "react";
import CSSModules from "react-css-modules";
import { useSelector } from "react-redux";
import style from "./index.less";
import { Tabs } from "antd";
import Params from "./Params";

const { TabPane } = Tabs;

function Property() {
  let { currentLayerData } = useSelector((data) => data);
  return (
    <div styleName="property">
      <Tabs defaultActiveKey="1">
        <TabPane tab="属性" key="1">
          <Params />
        </TabPane>
        <TabPane tab="动画" key="2">
          这里是动画
        </TabPane>
        <TabPane tab="事件" key="3">
          这里是事件
        </TabPane>
      </Tabs>
    </div>
  );
}

export default CSSModules(style)(Property);
