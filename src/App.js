import "./App.css";

import { Layout } from "antd";

import Landing from "./components/Landing";
import TopBar from "./components/TopBar";

function App() {
  return (
    <Layout
      className="layout"
      style={{ minHeight: "100vh", backgroundColor: "#fff" }}
    >
      <Layout.Content className="container">
        <TopBar />
        <Landing />
      </Layout.Content>
    </Layout>
  );
}

export default App;
