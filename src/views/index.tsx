import React from "react";
import { Layout, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux'
import CSSModule from "react-css-modules";
import { petData } from '../actions/test'
// const styles = require("./index.less");

const { Header, Footer, Sider, Content } = Layout;

export default function Index() {
  let data = useSelector(data => data)
  console.log(data,'aa');
  let dispatch = useDispatch()

  return (
      <>
      <Layout>
        <Button onClick={dispatch(petData('111'))}>aa</Button>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </>
}

// // @CSSModule(styles, { allowMultiple: true })
// export default class Index extends React.PureComponent {
//   render() {
//     return (
//       <>
//         <Layout>
//           <Header>Header</Header>
//           <Content>Content</Content>
//           <Footer>Footer</Footer>
//         </Layout>
//       </>
//     );
//   }
// }
