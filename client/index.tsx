import App from "_route";
import store, {history} from "_store";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";

import {changeRoute} from "_actions";
import "./socket";

if (process.env.NODE_ENV === "production") {
    OfflinePluginRuntime.install({
        onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
        onUpdated: () => location.reload(),
    });
}

const renderApplication = (Component: any) => {
    render(
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
    link.href = "/" + ((window as any).ASSETS["font.css"] || "style/font.css");
    link.media = "all";
    head.appendChild(link);
});
