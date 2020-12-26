import React, { useEffect } from "react";
import CSSModules from "react-css-modules";
import { Layout, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setLayerData } from "@actions/layerAction";
const styles = require("./index.less");

import Headers from "./Headers";
import SiderBar from "./SiderBar";
import Main from "./Main";
import Property from "./Property";

const { Header, Footer, Sider, Content } = Layout;

const Index = (): React.FC => {
  let dispatch = useDispatch();
  let { currentLayerData } = useSelector((data) => data);
  // useEffect(() => {
  //   document.addEventListener(
  //     "click",
  //     () => {
  //       // console.log(currentLayerData, "currentLayerDatacurrentLayerData");
  //       if (currentLayerData.id) {
  //         dispatch(setLayerData({}));
  //       }
  //     },
  //     false
  //   );
  // }, [currentLayerData]);

  return (
    <>
      <Layout>
        <Header>
          <Headers />
        </Header>
        <Content styleName="content">
          <SiderBar />
          <Main />
          <Property />
        </Content>
        <Footer styleName="footer"> ©2020 Created by HUHU</Footer>
      </Layout>
    </>
  );
};

export default CSSModules(styles)(Index);
