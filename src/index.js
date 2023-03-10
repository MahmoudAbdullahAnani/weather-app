import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import CopyRight from "./layout/Footer/CopyRight";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <CopyRight/>
    </RecoilRoot>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

reportWebVitals();
