import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

test("renders without crashing", () => {
    const div = document.createElement("div");
    const store = configureStore();
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
