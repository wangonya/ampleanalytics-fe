import { useAuth0 } from "@auth0/auth0-react";
import { Button, Row, Col } from "antd";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      type="primary"
      onClick={() => loginWithRedirect({ audience: "ampleanalyticsapi" })}
    >
      Log In
    </Button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      type="primary"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};

const TopBar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Row style={{ padding: "0 0 40px" }} align="middle">
      <Col flex={2}>
        <h1 className="logo">AmpleAnalytics</h1>
      </Col>
      <Col flex={3}>
        <Row justify="end" gutter="8">
          <Col>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TopBar;
