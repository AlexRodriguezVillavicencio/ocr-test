import React from "react";
import ReactDOM from "react-dom";
import QrReader from "./App/QrReader";
import ReduxProvider from "./utils/ReduxProvider";

ReactDOM.render(
  <ReduxProvider>
      <QrReader/>
  </ReduxProvider>,
  document.getElementById("root")
);
