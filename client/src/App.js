import React, { Component } from "react";
import { Layout, Breadcrumb, Menu } from "antd";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import Launches from "./components/Launches";
import Launch from "./components/Launch";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Layout className="layout">
              <Header>
                <div className="logo" />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["2"]}
                  style={{ lineHeight: "64px" }}
                />
                <h1 style={{ color: "white" }}>SpaceX</h1>
              </Header>
              <Content style={{ padding: "0 50px", marginTop: "50px" }}>
                <div
                  style={{ background: "#fff", padding: 24, minHeight: 280 }}
                >
                  <Route exact path="/" component={Launches} />
                  <Route
                    exact
                    path="/launch/:flight_number"
                    component={Launch}
                  />
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                React, Apollo, Graphql SpaceX ©2019 By{" "}
                <a href="https://www.youtube.com/watch?v=-XwkFm5a9lw">TMedia</a>
              </Footer>
            </Layout>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
