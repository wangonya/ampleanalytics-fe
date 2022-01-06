import { Row, Col, Card } from "antd";

import "./App.css";
import Landing from "./components/Landing";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div>
      <TopBar />
      <Landing />

      <Row>
        <Col>
          <Card>bottom left card</Card>
        </Col>
        <Col>
          <Card>bottom right card</Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
