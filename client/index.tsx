import App from "_route";
import store, {history} from "_store";
// import * as runtime from "offline-plugin/runtime";
import * as React from "react";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import * as injectTapEventPlugin from "react-tap-event-plugin";

const ReactDOM = require("react-dom");

import {changeRoute} from "_actions";
import "./socket";

injectTapEventPlugin();

/*if (process.env.NODE_ENV === "production") {
    runtime.install({
        onUpdating: () => {  (console as any).info("SW Event:", "onUpdating"); },
        onUpdateReady: () => runtime.applyUpdate(),
        onUpdated: () => window.location.reload(),
        onUpdateFailed: () => { (console as any).error("SW Event:", "onUpdateFailed"); },
    });
}*/

const renderApplication = (Component: any) => {
    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={store}>
                <Component history={history} {...history}/>
            </Provider>
        </AppContainer>,
        document.getElementById("application"),
    );
};
renderApplication(App);

history.listen(({pathname}: any) => changeRoute({location: pathname}));

document.addEventListener("DOMContentLoaded", () => {
    const head  = document.getElementsByTagName("head")[0];
    const link  = document.createElement("link");
    link.rel  = "stylesheet";
    link.type = "text/css";
    link.href = "/" + (process.env.NODE_ENV === "production" ? (window as any).ASSETS["font.css"] : "style/font.css");
    link.media = "all";
    head.appendChild(link);
});
