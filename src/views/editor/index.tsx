import React from "react";
import CSSModules from "react-css-modules";
import { Layout, Button } from "antd";
const styles = require("./index.less");

import Headers from "./Headers";
import SiderBar from "./SiderBar";
import Main from "./Main";
import Property from "./Property";

const { Header, Footer, Sider, Content } = Layout;

@CSSModules(styles)
export default class Index extends React.PureComponent {
  render() {
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
  }
}
