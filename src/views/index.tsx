import React from "react";
import { Layout, Button } from "antd";
import CSSModule from "react-css-modules";
const styles = require("./index.less");

const { Header, Footer, Sider, Content } = Layout;

@CSSModule(styles, { allowMultiple: true })
export default class Index extends React.PureComponent {
  render() {
    return (
      <>
        <Button>11</Button>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>

        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>

        <Layout>
          <Header>Header</Header>
          <Layout>
            <Content>Content</Content>
            <Sider>Sider</Sider>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>

        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
