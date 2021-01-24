import Navigation from "./components/navigation";
import ListContact from "./components/listContact";
import Calendar from "./components/calendar";
import { Layout } from "antd";
import {  Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

const { Header, Content } = Layout;

export default function App() {
  return (
    <BrowserRouter>
      <Layout style={{ backgroundColor: "white" }}>
        <Header style={{ marginTop: 20, backgroundColor: "white" }}>
          <Navigation />
        </Header>
        <Content style={{ marginTop: 20 }}>
          <Switch>
            <Route exact path="/" component={ListContact} />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
