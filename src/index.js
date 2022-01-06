import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { RecoilRoot } from "recoil";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Auth0Provider
        domain="dev-wsb8jitr.auth0.com"
        clientId="pJVGNhbdFuCxVJFcborRH8ihB3V694gM"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
