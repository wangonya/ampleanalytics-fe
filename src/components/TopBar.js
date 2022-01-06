import { useAuth0 } from "@auth0/auth0-react";
import { Button, Row, Col } from "antd";

const TopBar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Row style={{ padding: "0 0 40px" }}>
      <Col flex={2}>Logo</Col>
      <Col flex={3}>
        <Row justify="end" gutter="8">
          <Col>
            <Button type="primary" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TopBar;
