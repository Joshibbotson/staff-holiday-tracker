import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import CurrentUserProvider from "./context/CurrentUserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <CurrentUserProvider>
                {" "}
                {/* to be removed via rtk query */}
                <App />
            </CurrentUserProvider>
        </Provider>
    </React.StrictMode>
);
