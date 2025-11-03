import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>
);
