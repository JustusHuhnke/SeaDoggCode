import reducers from "_reducers";
import { applyMiddleware, compose, createStore} from "redux";
import { createEpicMiddleware } from "redux-observable";

import rootEpic from "./epics";
import {history as rHistory} from "./reducers/routing";

export let store: any;

if (process.env.BROWSER) {
    const epicMiddleware = createEpicMiddleware(rootEpic);
    const composeEnhancers = (process.env.NODE_ENV !== "production" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    if (module.hot) {
        module.hot.accept("./epics", () => {
            epicMiddleware.replaceEpic(require("./epics").default);
        });
    }
    const middleArr = [epicMiddleware];

    store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(...middleArr),
        ),
    );
} else {
    const moize = require("moize");
    const initStore = (initialState: any = {}) => createStore(reducers, initialState);
    store = (moize as any)(initStore);
}

export default store;
export const history = rHistory;
